const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { once } = require('events');

const {
  app,
  getCategoryFromExt,
  listCategoryFiles,
  findSidecarPreview,
  isSidecarPreviewFile,
  isMovieExtension,
  needsMovieTranscoding,
  buildDisplayName,
  buildDisplayTitle,
  buildUniqueUploadFilename,
  isHiddenSystemEntry,
  resolveMediaPath,
  TRANSCODE_MOVFLAGS,
  parseRangeHeader,
  estimateSeekSecondsFromRange,
  buildMovieTranscodeArgs,
} = require('../index');

const makeTempLibrary = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'mymedia-test-'));
  const categories = {
    movies: path.join(root, 'movies'),
    music: path.join(root, 'music'),
    books: path.join(root, 'books'),
  };

  for (const dir of Object.values(categories)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return { root, categories };
};

test('getCategoryFromExt groups common extensions', () => {
  assert.equal(getCategoryFromExt('.m4v'), 'movies');
  assert.equal(getCategoryFromExt('.mkv'), 'movies');
  assert.equal(getCategoryFromExt('.aiff'), 'music');
  assert.equal(getCategoryFromExt('.svg'), 'books');
  assert.equal(getCategoryFromExt('.txt'), 'books');
});

test('isMovieExtension allows mkv and rejects non-movie formats', () => {
  assert.equal(isMovieExtension('.mkv'), true);
  assert.equal(isMovieExtension('clip.MOV'), true);
  assert.equal(isMovieExtension('notes.txt'), false);
});

test('needsMovieTranscoding flags mkv files for fragmented MP4 streaming', () => {
  assert.equal(needsMovieTranscoding('.mkv'), true);
  assert.equal(needsMovieTranscoding('Cinema Cut.MKV'), true);
  assert.equal(needsMovieTranscoding('.mp4'), false);
});

test('movie display helpers strip technical prefixes and preserve readable titles', () => {
  assert.equal(buildDisplayTitle('1777488700716-upload-probe.mkv'), 'upload-probe');
  assert.equal(buildDisplayName('1777488700716-upload-probe.mkv'), 'upload-probe.mkv');
  assert.equal(buildDisplayTitle('Cinema_Cut_Final.mp4'), 'Cinema Cut Final');
});

test('buildUniqueUploadFilename keeps original-style names without timestamp prefixes', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mymedia-upload-'));
  fs.writeFileSync(path.join(tempDir, 'My Movie.mkv'), 'existing');

  const first = buildUniqueUploadFilename(tempDir, 'My Movie.mkv');
  const second = buildUniqueUploadFilename(tempDir, 'Another: Movie!.mp4');

  assert.equal(first, 'My Movie-2.mkv');
  assert.equal(second, 'Another Movie.mp4');

  fs.rmSync(tempDir, { recursive: true, force: true });
});

test('isHiddenSystemEntry detects mac/windows metadata and dot-files', () => {
  assert.equal(isHiddenSystemEntry('.DS_Store'), true);
  assert.equal(isHiddenSystemEntry('Thumbs.db'), true);
  assert.equal(isHiddenSystemEntry('._track.mp3'), true);
  assert.equal(isHiddenSystemEntry('.hidden.mp3'), true);
  assert.equal(isHiddenSystemEntry('movie.mkv'), false);
});

test('transcode movflags include default_base_moof for Safari-compatible fragmented mp4 streaming', () => {
  assert.match(TRANSCODE_MOVFLAGS, /default_base_moof/);
});

test('range parsing and seek estimation clamp movie resume offsets into a valid FFmpeg input seek', () => {
  const range = parseRangeHeader('bytes=500-1500', 2_000);
  assert.deepEqual(range, { start: 500, end: 1500 });

  const seekSeconds = estimateSeekSecondsFromRange(range, 2_000, 120);
  assert.equal(seekSeconds, 30);
});

test('movie transcode args place -ss before -i for fast input-side seeking', () => {
  const args = buildMovieTranscodeArgs({
    filePath: '/tmp/demo.mkv',
    seekSeconds: 42.5,
    audioTrackIndex: 3,
  });

  const seekIndex = args.indexOf('-ss');
  const inputIndex = args.indexOf('-i');
  assert.ok(seekIndex >= 0);
  assert.ok(inputIndex > seekIndex);
  assert.equal(args[seekIndex + 1], '42.500');
  assert.equal(args[inputIndex + 1], '/tmp/demo.mkv');
  assert.ok(args.includes('0:a:3') || args.includes('0:3'));
});

test('sidecar preview files are detected and excluded from listing', () => {
  const { root, categories } = makeTempLibrary();
  fs.writeFileSync(path.join(categories.movies, 'demo.mp4'), 'video-data');
  fs.writeFileSync(path.join(categories.movies, 'demo.svg'), '<svg></svg>');
  fs.writeFileSync(path.join(categories.movies, 'standalone.svg'), '<svg></svg>');

  const names = ['demo.mp4', 'demo.svg', 'standalone.svg'];
  assert.equal(isSidecarPreviewFile('demo.svg', names), true);
  assert.equal(isSidecarPreviewFile('standalone.svg', names), false);

  const items = listCategoryFiles('movies', categories);
  assert.equal(items.some((item) => item.name === 'demo.svg'), false);
  assert.equal(items.some((item) => item.name === 'demo.mp4'), true);
  assert.equal(items.some((item) => item.name === 'standalone.svg'), true);

  fs.rmSync(root, { recursive: true, force: true });
});

test('bulk movie progress endpoint returns a progress map object', async () => {
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/progress/movies`);
    assert.equal(response.status, 200);
    const payload = await response.json();
    assert.ok(payload.progress && typeof payload.progress === 'object');
  } finally {
    server.close();
  }
});

test('movie progress routes round-trip nested filenames and never fall through to html', async () => {
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address();
  const filename = 'Shows/Season 1/Episode 01.mkv';
  const encoded = encodeURIComponent(filename);

  try {
    const saveResponse = await fetch(`http://127.0.0.1:${port}/api/progress/movies/${encoded}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        time: 93,
        duration: 1800,
      }),
    });

    assert.equal(saveResponse.status, 200);
    assert.match(saveResponse.headers.get('content-type') || '', /application\/json/i);
    const saved = await saveResponse.json();
    assert.equal(saved.progress.time, 93);

    const loadResponse = await fetch(`http://127.0.0.1:${port}/api/progress/movies/${encoded}`);
    assert.equal(loadResponse.status, 200);
    const loaded = await loadResponse.json();
    assert.equal(loaded.progress.time, 93);
    assert.equal(loaded.progress.duration, 1800);
  } finally {
    server.close();
  }
});

test('unknown api routes return json 404 payloads instead of the html app shell', async () => {
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/does-not-exist`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ok: false }),
    });

    assert.equal(response.status, 404);
    assert.match(response.headers.get('content-type') || '', /application\/json/i);
    const payload = await response.json();
    assert.equal(payload.error, 'API route not found');
  } finally {
    server.close();
  }
});

test('listCategoryFiles returns previewUrl when sidecar image exists', () => {
  const { root, categories } = makeTempLibrary();
  fs.writeFileSync(path.join(categories.books, 'notes.txt'), 'hello world');
  fs.writeFileSync(path.join(categories.books, 'notes.png'), 'png-content');

  const items = listCategoryFiles('books', categories);
  assert.equal(items.length, 1);
  assert.equal(items[0].name, 'notes.txt');
  assert.equal(items[0].previewUrl, '/media/books/notes.png');
  assert.equal(findSidecarPreview('notes.txt', ['notes.txt', 'notes.png'], 'books'), '/media/books/notes.png');

  fs.rmSync(root, { recursive: true, force: true });
});

test('findSidecarPreview matches sidecar filenames case-insensitively', () => {
  const preview = findSidecarPreview('Be Above It.flac', ['Be Above It.flac', 'Be Above It.PNG'], 'music', 'Lonerism');
  assert.equal(preview, '/media/music/Lonerism%2FBe%20Above%20It.PNG');
});

test('music listing is recursive and exposes album metadata with song/album artwork fallbacks', () => {
  const { root, categories } = makeTempLibrary();
  const albumDir = path.join(categories.music, 'Daft Punk - Discovery');
  const hiddenAlbumDir = path.join(categories.music, '.hidden-folder');
  fs.mkdirSync(albumDir, { recursive: true });
  fs.mkdirSync(hiddenAlbumDir, { recursive: true });

  fs.writeFileSync(path.join(albumDir, 'One More Time.mp3'), 'track-1');
  fs.writeFileSync(path.join(albumDir, 'cover.jpg'), 'cover-image');
  fs.writeFileSync(path.join(albumDir, 'Harder Better.mp3'), 'track-2');
  fs.writeFileSync(path.join(albumDir, 'Harder Better.png'), 'song-image');
  fs.writeFileSync(path.join(albumDir, '.DS_Store'), 'metadata');
  fs.writeFileSync(path.join(albumDir, '._Hidden.mp3'), 'resource-fork');
  fs.writeFileSync(path.join(categories.music, 'single.wav'), 'single-track');
  fs.writeFileSync(path.join(hiddenAlbumDir, 'secret.mp3'), 'hidden-track');

  const items = listCategoryFiles('music', categories);
  assert.equal(items.length, 3);
  assert.equal(items.some((item) => item.name.includes('.DS_Store')), false);
  assert.equal(items.some((item) => item.name.includes('._Hidden.mp3')), false);
  assert.equal(items.some((item) => item.name.includes('secret.mp3')), false);

  const albumTrack = items.find((item) => item.name.endsWith('/One More Time.mp3'));
  assert.ok(albumTrack);
  assert.equal(albumTrack.album, 'Daft Punk - Discovery');
  assert.equal(albumTrack.albumPath, 'Daft Punk - Discovery');
  assert.equal(albumTrack.folder, 'Daft Punk - Discovery');
  assert.equal(albumTrack.previewUrl, '/media/music/Daft%20Punk%20-%20Discovery%2Fcover.jpg');

  const sidecarTrack = items.find((item) => item.name.endsWith('/Harder Better.mp3'));
  assert.ok(sidecarTrack);
  assert.equal(sidecarTrack.previewUrl, '/media/music/Daft%20Punk%20-%20Discovery%2FHarder%20Better.png');

  const single = items.find((item) => item.name === 'single.wav');
  assert.ok(single);
  assert.equal(single.album, 'Singles');

  fs.rmSync(root, { recursive: true, force: true });
});

test('music listing prefers uppercase track sidecar image over album cover fallback', () => {
  const { root, categories } = makeTempLibrary();
  const albumDir = path.join(categories.music, 'Tame Impala - Lonerism');
  fs.mkdirSync(albumDir, { recursive: true });

  fs.writeFileSync(path.join(albumDir, 'Be Above It.flac'), 'track-1');
  fs.writeFileSync(path.join(albumDir, 'cover.jpg'), 'cover-image');
  fs.writeFileSync(path.join(albumDir, 'Be Above It.PNG'), 'song-image');

  const items = listCategoryFiles('music', categories);
  assert.equal(items.length, 1);
  assert.equal(items[0].previewUrl, '/media/music/Tame%20Impala%20-%20Lonerism%2FBe%20Above%20It.PNG');
  assert.equal(items[0].previewSource, 'track-sidecar');

  fs.rmSync(root, { recursive: true, force: true });
});

test('music album preview falls back to the first image in a folder when no cover.* file exists', () => {
  const { root, categories } = makeTempLibrary();
  const albumDir = path.join(categories.music, 'Boards of Canada - Geogaddi');
  fs.mkdirSync(albumDir, { recursive: true });

  fs.writeFileSync(path.join(albumDir, '01 Ready Lets Go.mp3'), 'track-1');
  fs.writeFileSync(path.join(albumDir, 'artwork-random.png'), 'cover-image');
  fs.writeFileSync(path.join(albumDir, 'notes.txt'), 'not-art');

  const items = listCategoryFiles('music', categories);
  assert.equal(items.length, 1);
  assert.equal(items[0].previewUrl, '/media/music/Boards%20of%20Canada%20-%20Geogaddi%2Fartwork-random.png');

  fs.rmSync(root, { recursive: true, force: true });
});

test('resolveMediaPath accepts nested encoded file paths and rejects traversal', () => {
  const { root, categories } = makeTempLibrary();
  const nested = 'Daft Punk - Discovery/One More Time.mp3';
  const encodedNested = encodeURIComponent(nested);

  const resolved = resolveMediaPath('music', encodedNested, categories);
  assert.equal(resolved, path.resolve(categories.music, nested));

  const traversal = resolveMediaPath('music', encodeURIComponent('../movies/hack.mp4'), categories);
  assert.equal(traversal, null);

  fs.rmSync(root, { recursive: true, force: true });
});

test('movie listing excludes hidden/system artifacts while preserving mkv files', () => {
  const { root, categories } = makeTempLibrary();
  fs.writeFileSync(path.join(categories.movies, '.DS_Store'), 'metadata');
  fs.writeFileSync(path.join(categories.movies, 'Thumbs.db'), 'metadata');
  fs.writeFileSync(path.join(categories.movies, '.private.mkv'), 'hidden-video');
  fs.writeFileSync(path.join(categories.movies, 'Cinema Cut.MKV'), 'movie-data');
  fs.writeFileSync(path.join(categories.movies, 'Browser Ready.mp4'), 'movie-data');

  const items = listCategoryFiles('movies', categories);
  assert.equal(items.length, 2);
  const mkvItem = items.find((item) => item.name === 'Cinema Cut.MKV');
  const mp4Item = items.find((item) => item.name === 'Browser Ready.mp4');
  assert.ok(mkvItem);
  assert.ok(mp4Item);
  assert.equal(mkvItem.detectedType, 'movies');
  assert.equal(mkvItem.displayName, 'Cinema Cut.MKV');
  assert.equal(mp4Item.title, 'Browser Ready');
  assert.equal(mkvItem.needsTranscoding, true);
  assert.equal(mp4Item.needsTranscoding, false);

  fs.rmSync(root, { recursive: true, force: true });
});

test('movie listing groups folder items as shows even for a single episode file', () => {
  const { root, categories } = makeTempLibrary();
  const showDir = path.join(categories.movies, 'Severance');
  fs.mkdirSync(showDir, { recursive: true });
  fs.writeFileSync(path.join(showDir, 'Episode 01.mkv'), 'episode-data');
  fs.writeFileSync(path.join(showDir, '.DS_Store'), 'hidden-metadata');

  const items = listCategoryFiles('movies', categories);
  assert.equal(items.length, 1);
  assert.equal(items[0].name, 'Severance/Episode 01.mkv');
  assert.equal(items[0].isShowEpisode, true);
  assert.equal(items[0].showTitle, 'Severance');
  assert.equal(items[0].seasonNumber, 1);
  assert.equal(items[0].folder, 'Severance');

  fs.rmSync(root, { recursive: true, force: true });
});

