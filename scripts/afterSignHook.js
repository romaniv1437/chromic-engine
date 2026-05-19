/**
 * afterSignHook.js — Code signing for macOS builds
 *
 * This script runs after electron-builder packages the app but before
 * creating the DMG. It applies a signature using either:
 * - A self-signed certificate (if CODESIGN_IDENTITY env var is set to SHA-1 hash)
 * - Ad-hoc signature (fallback, using `codesign --sign -`)
 *
 * Benefits:
 * - App shows as "signed" in Finder and system preferences
 * - Self-signed shows developer name (e.g., "romaniv1437")
 * - Users still need to run `xattr -cr` on first launch (not Apple-notarized)
 */

const { execSync } = require('child_process');
const path = require('path');

module.exports = async function (context) {
  // Only run on macOS
  if (process.platform !== 'darwin') {
    console.log('[afterSign] Skipping: not macOS');
    return;
  }

  const appPath = path.join(
    context.appOutDir,
    `${context.packager.appInfo.productFilename}.app`
  );

  // Use SHA-1 identity from env, or fall back to ad-hoc
  // CODESIGN_IDENTITY can be:
  //   - 40-char SHA-1 hash (from CI)
  //   - Certificate name (e.g., "romaniv1437")
  //   - "-" or empty for ad-hoc
  let identity = process.env.CODESIGN_IDENTITY || '-';
  
  // Normalize: empty string → ad-hoc
  if (!identity || identity.trim() === '') {
    identity = '-';
  }
  
  const identityLabel = identity === '-' ? 'ad-hoc' : 
    (identity.length === 40 ? `SHA1:${identity.substring(0, 8)}...` : identity);

  console.log(`[afterSign] 🔏 Signing app: ${appPath}`);
  console.log(`[afterSign] 🔑 Identity: ${identityLabel}`);

  try {
    // Remove any existing signature first
    try {
      execSync(`codesign --remove-signature "${appPath}" 2>/dev/null`, { stdio: 'pipe' });
      console.log('[afterSign] Removed existing signature');
    } catch (e) {
      // Ignore - may not have had a signature
    }

    // Apply signature
    // --force: replace any existing signature
    // --deep: sign nested code (frameworks, helpers)
    // --sign: identity to use (SHA-1 hash, name, or "-" for ad-hoc)
    // --timestamp: disabled for self-signed certs (would fail validation)
    const signCmd = `codesign --force --deep --sign "${identity}" "${appPath}"`;
    console.log(`[afterSign] Running: codesign --force --deep --sign "${identityLabel}" ...`);

    execSync(signCmd, { stdio: 'inherit' });

    console.log(`[afterSign] ✅ Signature applied successfully (${identityLabel})`);

    // Verify and display signature info
    try {
      const result = execSync(`codesign -dvv "${appPath}" 2>&1`, {
        encoding: 'utf8',
      });
      const lines = result.split('\n').filter(l =>
        l.includes('Authority=') || l.includes('Identifier=') || l.includes('TeamIdentifier=') || l.includes('Signature=')
      );
      if (lines.length) {
        console.log('[afterSign] Signature details:');
        lines.forEach(l => console.log('  ' + l));
      }
    } catch (e) {
      // codesign -dv outputs to stderr
      if (e.stdout) {
        console.log('[afterSign] Signature info:', e.stdout.toString().split('\n').slice(0, 6).join('\n'));
      } else if (e.stderr) {
        console.log('[afterSign] Signature info:', e.stderr.toString().split('\n').slice(0, 6).join('\n'));
      }
    }
  } catch (error) {
    console.error('[afterSign] ⚠️ Signing failed:', error.message);
    
    // Try ad-hoc fallback if custom identity failed
    if (identity !== '-') {
      console.log('[afterSign] 🔄 Falling back to ad-hoc signing...');
      try {
        execSync(`codesign --force --deep --sign - "${appPath}"`, { stdio: 'inherit' });
        console.log('[afterSign] ✅ Ad-hoc signature applied as fallback');
      } catch (fallbackError) {
        console.error('[afterSign] ⚠️ Ad-hoc fallback also failed:', fallbackError.message);
      }
    }
    // Don't fail the build - unsigned app still works with xattr -cr
  }
};


