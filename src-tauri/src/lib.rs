use serde::Serialize;
use std::fs;
use std::fs::File;
use std::io::{BufReader, Read, Seek, SeekFrom};
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicU16, Ordering};
use std::thread;
use tauri::Manager;
use walkdir::WalkDir;

/// Port for the embedded audio streaming server (set at startup)
static AUDIO_SERVER_PORT: AtomicU16 = AtomicU16::new(0);

/// Start a tiny HTTP server that streams audio files with Range request support.
/// WebKit in Tauri handles HTTP audio much better than asset:// protocol —
/// proper buffering, seeking, and no pipeline stalls.
fn start_audio_server() -> u16 {
    let server = tiny_http::Server::http("127.0.0.1:0")
        .expect("Failed to start audio streaming server");
    let port = server.server_addr().to_ip().unwrap().port();
    log::info!("Audio streaming server started on http://127.0.0.1:{}", port);

    let server = std::sync::Arc::new(server);

    // Spawn a pool of worker threads so concurrent Range requests don't block each other.
    // WebKit fires multiple Range requests during seek/buffer and a single-threaded
    // server causes audio pipeline stalls.
    for i in 0..4 {
        let srv = server.clone();
        thread::Builder::new()
            .name(format!("audio-http-{}", i))
            .spawn(move || {
                loop {
                    match srv.recv() {
                        Ok(request) => handle_audio_request(request),
                        Err(_) => break,
                    }
                }
            })
            .expect("Failed to spawn audio server thread");
    }

    port
}

fn handle_audio_request(request: tiny_http::Request) {
    // URL decode the path
    let raw_path = request.url().trim_start_matches('/');
    let decoded_path = urldecode(raw_path);

    let file_path = Path::new(&decoded_path);
    if !file_path.exists() || !file_path.is_file() {
        let _ = request.respond(
            tiny_http::Response::from_string("Not Found")
                .with_status_code(404),
        );
        return;
    }

    let file_size = match fs::metadata(file_path) {
        Ok(m) => m.len(),
        Err(_) => {
            let _ = request.respond(
                tiny_http::Response::from_string("Error")
                    .with_status_code(500),
            );
            return;
        }
    };

    // Determine MIME type
    let mime = match file_path.extension().and_then(|e| e.to_str()) {
        Some("mp3") => "audio/mpeg",
        Some("flac") => "audio/flac",
        Some("wav") => "audio/wav",
        Some("m4a") | Some("aac") => "audio/mp4",
        Some("ogg") => "audio/ogg",
        Some("aiff") | Some("aif") => "audio/aiff",
        Some("opus") => "audio/opus",
        _ => "application/octet-stream",
    };

    // Parse Range header
    let range_header = request
        .headers()
        .iter()
        .find(|h| h.field.as_str() == "Range" || h.field.as_str() == "range")
        .map(|h| h.value.as_str().to_string());

    if let Some(range_str) = range_header {
        // Parse "bytes=START-END" or "bytes=START-"
        if let Some(range) = parse_range(&range_str, file_size) {
            let (start, end) = range;
            let length = end - start + 1;

            let mut file = match File::open(file_path) {
                Ok(f) => f,
                Err(_) => {
                    let _ = request.respond(
                        tiny_http::Response::from_string("Error")
                            .with_status_code(500),
                    );
                    return;
                }
            };
            let _ = file.seek(SeekFrom::Start(start));

            let reader = file.take(length);
            let response = tiny_http::Response::new(
                tiny_http::StatusCode(206),
                vec![
                    tiny_http::Header::from_bytes(b"Content-Type", mime.as_bytes()).unwrap(),
                    tiny_http::Header::from_bytes(
                        b"Content-Range",
                        format!("bytes {}-{}/{}", start, end, file_size).as_bytes(),
                    )
                    .unwrap(),
                    tiny_http::Header::from_bytes(b"Accept-Ranges", b"bytes").unwrap(),
                    tiny_http::Header::from_bytes(
                        b"Content-Length",
                        length.to_string().as_bytes(),
                    )
                    .unwrap(),
                    tiny_http::Header::from_bytes(
                        b"Access-Control-Allow-Origin",
                        b"*",
                    )
                    .unwrap(),
                    tiny_http::Header::from_bytes(b"Connection", b"keep-alive").unwrap(),
                    tiny_http::Header::from_bytes(
                        b"Cache-Control",
                        b"public, max-age=31536000, immutable",
                    )
                    .unwrap(),
                ],
                reader,
                Some(length as usize),
                None,
            );
            let _ = request.respond(response);
        } else {
            let _ = request.respond(
                tiny_http::Response::from_string("Range Not Satisfiable")
                    .with_status_code(416)
                    .with_header(
                        tiny_http::Header::from_bytes(
                            b"Content-Range",
                            format!("bytes */{}", file_size).as_bytes(),
                        )
                        .unwrap(),
                    ),
            );
        }
    } else {
        // No Range header — serve full file
        let file = match File::open(file_path) {
            Ok(f) => f,
            Err(_) => {
                let _ = request.respond(
                    tiny_http::Response::from_string("Error")
                        .with_status_code(500),
                );
                return;
            }
        };
        let response = tiny_http::Response::from_file(file)
            .with_header(
                tiny_http::Header::from_bytes(b"Content-Type", mime.as_bytes()).unwrap(),
            )
            .with_header(
                tiny_http::Header::from_bytes(b"Accept-Ranges", b"bytes").unwrap(),
            )
            .with_header(
                tiny_http::Header::from_bytes(b"Access-Control-Allow-Origin", b"*").unwrap(),
            )
            .with_header(
                tiny_http::Header::from_bytes(b"Connection", b"keep-alive").unwrap(),
            )
            .with_header(
                tiny_http::Header::from_bytes(
                    b"Cache-Control",
                    b"public, max-age=31536000, immutable",
                )
                .unwrap(),
            );
        let _ = request.respond(response);
    }
}

fn parse_range(header: &str, file_size: u64) -> Option<(u64, u64)> {
    let prefix = "bytes=";
    if !header.starts_with(prefix) {
        return None;
    }
    let range_spec = &header[prefix.len()..];
    let parts: Vec<&str> = range_spec.splitn(2, '-').collect();
    if parts.len() != 2 {
        return None;
    }

    let start: u64 = if parts[0].is_empty() {
        // Suffix range: "-500" means last 500 bytes
        let suffix: u64 = parts[1].parse().ok()?;
        file_size.saturating_sub(suffix)
    } else {
        parts[0].parse().ok()?
    };

    let end: u64 = if parts[1].is_empty() {
        file_size - 1
    } else {
        parts[1].parse().ok()?
    };

    if start > end || start >= file_size {
        return None;
    }

    Some((start, end.min(file_size - 1)))
}

fn urldecode(s: &str) -> String {
    let mut result = Vec::new();
    let bytes = s.as_bytes();
    let mut i = 0;
    while i < bytes.len() {
        if bytes[i] == b'%' && i + 2 < bytes.len() {
            if let Ok(byte) = u8::from_str_radix(
                std::str::from_utf8(&bytes[i + 1..i + 3]).unwrap_or(""),
                16,
            ) {
                result.push(byte);
                i += 3;
                continue;
            }
        }
        result.push(bytes[i]);
        i += 1;
    }
    String::from_utf8_lossy(&result).to_string()
}

/// Get the port of the embedded audio streaming server
#[tauri::command]
fn get_audio_server_port() -> u16 {
    AUDIO_SERVER_PORT.load(Ordering::Relaxed)
}

/// Represents a scanned music file
#[derive(Debug, Serialize, Clone)]
pub struct MusicFile {
    pub path: String,
    pub name: String,
    pub album: String,
    pub size: u64,
}

/// Scan a directory for music files, returning structured data for the frontend.
#[tauri::command]
fn scan_library(music_dir: String) -> Result<Vec<MusicFile>, String> {
    let root = Path::new(&music_dir);
    if !root.exists() {
        return Err(format!("Directory not found: {}", music_dir));
    }

    let audio_extensions = ["mp3", "flac", "wav", "m4a", "ogg", "aac", "aiff", "opus", "wma"];
    let mut files: Vec<MusicFile> = Vec::new();

    for entry in WalkDir::new(root).min_depth(1).into_iter().filter_map(|e| e.ok()) {
        let path = entry.path();
        if !path.is_file() {
            continue;
        }
        let ext = path
            .extension()
            .and_then(|e| e.to_str())
            .unwrap_or("")
            .to_lowercase();
        if !audio_extensions.contains(&ext.as_str()) {
            continue;
        }

        let name = path
            .file_name()
            .and_then(|n| n.to_str())
            .unwrap_or("Unknown")
            .to_string();

        // Derive album from parent folder name
        let album = path
            .parent()
            .and_then(|p| p.file_name())
            .and_then(|n| n.to_str())
            .unwrap_or("Unknown Album")
            .to_string();

        let size = fs::metadata(path).map(|m| m.len()).unwrap_or(0);

        files.push(MusicFile {
            path: path.to_string_lossy().to_string(),
            name,
            album,
            size,
        });
    }

    Ok(files)
}

/// Generate a thumbnail cache for album art (200px WebP).
/// Returns the path to the generated thumbnail.
#[tauri::command]
fn generate_thumbnail(source_path: String, cache_dir: String) -> Result<String, String> {
    let src = Path::new(&source_path);
    if !src.exists() {
        return Err("Source image not found".into());
    }

    let cache = PathBuf::from(&cache_dir);
    fs::create_dir_all(&cache).map_err(|e| e.to_string())?;

    // Generate deterministic filename from source path
    let hash = format!("{:x}", md5_hash(source_path.as_bytes()));
    let out_path = cache.join(format!("{}.webp", hash));

    // Skip if already cached
    if out_path.exists() {
        return Ok(out_path.to_string_lossy().to_string());
    }

    let img = image::open(src).map_err(|e| format!("Failed to open image: {}", e))?;
    let thumb = img.thumbnail(200, 200);

    // Save as WebP via PNG fallback (image crate WebP encoding)
    thumb
        .save(&out_path)
        .map_err(|e| format!("Failed to save thumbnail: {}", e))?;

    Ok(out_path.to_string_lossy().to_string())
}

/// Simple hash for deterministic cache filenames
fn md5_hash(data: &[u8]) -> u64 {
    let mut hash: u64 = 0xcbf29ce484222325;
    for &byte in data {
        hash ^= byte as u64;
        hash = hash.wrapping_mul(0x100000001b3);
    }
    hash
}

/// Check if the app has access to a given path
#[tauri::command]
fn check_path_exists(path: String) -> bool {
    Path::new(&path).exists()
}

/// Stream audio file with buffered reading for stutter-free playback.
/// Returns bytes from the given offset (for Range-request support from the frontend).
#[tauri::command]
fn stream_audio_chunk(file_path: String, offset: u64, length: u64) -> Result<Vec<u8>, String> {
    let path = Path::new(&file_path);
    if !path.exists() {
        return Err("File not found".into());
    }

    let file = File::open(path).map_err(|e| e.to_string())?;
    let file_size = file.metadata().map_err(|e| e.to_string())?.len();
    let actual_offset = offset.min(file_size);
    // Cap chunk at 512KB for smooth IPC transfer without blocking
    let max_chunk: u64 = 512 * 1024;
    let actual_length = length.min(max_chunk).min(file_size - actual_offset);

    let mut reader = BufReader::with_capacity(256 * 1024, file);
    reader.seek(SeekFrom::Start(actual_offset)).map_err(|e| e.to_string())?;

    let mut buffer = vec![0u8; actual_length as usize];
    reader.read_exact(&mut buffer).map_err(|e| e.to_string())?;

    Ok(buffer)
}

/// Get audio file size (for Range header calculations on the frontend)
#[tauri::command]
fn get_file_size(file_path: String) -> Result<u64, String> {
    let path = Path::new(&file_path);
    if !path.exists() {
        return Err("File not found".into());
    }
    fs::metadata(path).map(|m| m.len()).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Start embedded audio HTTP server before Tauri initializes
    let port = start_audio_server();
    AUDIO_SERVER_PORT.store(port, Ordering::Relaxed);

    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            // Create app data directories
            if let Some(app_data) = app.path().app_data_dir().ok() {
                let _ = fs::create_dir_all(app_data.join("thumbnails"));
                let _ = fs::create_dir_all(app_data.join("metadata"));
            }

            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            scan_library,
            generate_thumbnail,
            check_path_exists,
            stream_audio_chunk,
            get_file_size,
            get_audio_server_port,
        ])
        .run(tauri::generate_context!())
        .expect("error while running Chromic Engine");
}
