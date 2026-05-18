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
const fs = require('fs');
const glob = require('path');

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

  let identity = process.env.CODESIGN_IDENTITY || '-';
  if (!identity || identity.trim() === '') {
    identity = '-';
  }

  const isAdHoc = identity === '-';
  const identityLabel = isAdHoc ? 'ad-hoc' :
    (identity.length === 40 ? `SHA1:${identity.substring(0, 8)}...` : identity);

  console.log(`[afterSign] 🔏 Signing app: ${appPath}`);
  console.log(`[afterSign] 🔑 Identity: ${identityLabel}`);

  try {
    // Remove ALL existing signatures first (app + nested)
    try {
      execSync(`codesign --remove-signature "${appPath}" 2>/dev/null`, { stdio: 'pipe' });
      console.log('[afterSign] Removed existing app signature');
    } catch (e) { /* ignore */ }

    // ── Sign inside-out: frameworks and helpers first, then app ──
    // This ensures all nested code shares the same signing identity.
    // --deep is unreliable on macOS 13+ and doesn't guarantee consistent Team IDs.
    const frameworksDir = path.join(appPath, 'Contents', 'Frameworks');
    const contentsDir = path.join(appPath, 'Contents');

    // Ad-hoc: no --options runtime (causes issues without a real identity)
    const runtimeFlag = isAdHoc ? '' : '--options runtime';

    // 1. Sign all .framework bundles inside Frameworks/
    if (fs.existsSync(frameworksDir)) {
      const items = fs.readdirSync(frameworksDir);
      for (const item of items) {
        const fullPath = path.join(frameworksDir, item);
        if (item.endsWith('.framework') || item.endsWith('.app')) {
          try {
            execSync(`codesign --remove-signature "${fullPath}" 2>/dev/null`, { stdio: 'pipe' });
          } catch (e) { /* ignore */ }
          const cmd = `codesign --force --sign "${identity}" ${runtimeFlag} "${fullPath}"`;
          console.log(`[afterSign] Signing: ${item}`);
          execSync(cmd, { stdio: 'pipe' });
        }
      }
      // Also sign any .dylib in Frameworks/
      for (const item of items) {
        const fullPath = path.join(frameworksDir, item);
        if (item.endsWith('.dylib')) {
          const cmd = `codesign --force --sign "${identity}" ${runtimeFlag} "${fullPath}"`;
          execSync(cmd, { stdio: 'pipe' });
        }
      }
    }

    // 2. Sign helper apps inside Frameworks/
    if (fs.existsSync(frameworksDir)) {
      const items = fs.readdirSync(frameworksDir);
      for (const item of items) {
        const fullPath = path.join(frameworksDir, item);
        if (item.includes('Helper') && item.endsWith('.app')) {
          try {
            execSync(`codesign --remove-signature "${fullPath}" 2>/dev/null`, { stdio: 'pipe' });
          } catch (e) { /* ignore */ }
          const cmd = `codesign --force --sign "${identity}" ${runtimeFlag} "${fullPath}"`;
          console.log(`[afterSign] Signing helper: ${item}`);
          execSync(cmd, { stdio: 'pipe' });
        }
      }
    }

    // 3. Sign the main app bundle last
    const signCmd = `codesign --force --sign "${identity}" ${runtimeFlag} "${appPath}"`;
    console.log(`[afterSign] Signing main app bundle...`);
    execSync(signCmd, { stdio: 'inherit' });

    console.log(`[afterSign] ✅ Signature applied successfully (${identityLabel})`);

    // Verify
    try {
      const result = execSync(`codesign --verify --deep --strict "${appPath}" 2>&1`, { encoding: 'utf8' });
      console.log('[afterSign] ✅ Verification passed');
    } catch (e) {
      const errMsg = (e.stderr || e.stdout || e.message || '').toString();
      console.log('[afterSign] ⚠️ Verification warning:', errMsg.split('\n')[0]);
    }

    // Display signature info
    try {
      const result = execSync(`codesign -dvv "${appPath}" 2>&1`, { encoding: 'utf8' });
      const lines = result.split('\n').filter(l =>
        l.includes('Authority=') || l.includes('Identifier=') || l.includes('TeamIdentifier=') || l.includes('Signature=')
      );
      if (lines.length) {
        console.log('[afterSign] Signature details:');
        lines.forEach(l => console.log('  ' + l));
      }
    } catch (e) {
      if (e.stderr) console.log('[afterSign] Info:', e.stderr.toString().split('\n').slice(0, 4).join('\n'));
    }
  } catch (error) {
    console.error('[afterSign] ⚠️ Signing failed:', error.message);
    // Fallback: just force ad-hoc deep sign (better than nothing)
    try {
      execSync(`codesign --force --deep --sign - "${appPath}"`, { stdio: 'inherit' });
      console.log('[afterSign] ✅ Deep ad-hoc fallback applied');
    } catch (fallbackError) {
      console.error('[afterSign] ⚠️ Fallback also failed:', fallbackError.message);
    }
  }
};
