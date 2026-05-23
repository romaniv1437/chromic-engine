import * as THREE from 'three';
import { Text } from 'troika-three-text';
const FONT_FALLBACK = '/chromic-lyrics/vendor/NotoSans-Bold.ttf';
const FONT_PRIMARY = '/chromic-lyrics/vendor/SFNS-ExtraBold.ttf';
let FONT = FONT_FALLBACK;
try {
    fetch(FONT_PRIMARY, { method: 'HEAD' }).then(r => { if (r.ok)
        FONT = FONT_PRIMARY; });
}
catch (_) { }
const UNICODE_FONTS_URL = 'https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data';
/**
 * GpuTypography — track title + artist display using Troika Text SDF.
 * Styles match chromic-gpu-panel.js: no outlineWidth (causes border artifacts),
 * sdfGlyphSize=64, gpuAccelerateSDF=true, white text.
 * Rendered on layer 1 (after blur pass, stays sharp).
 */
export class GpuTypography {
    constructor(_camera) {
        this.opacity = 0;
        this.targetOpacity = 0;
        this._centered = false;
        this.group = new THREE.Group();
        this.group.layers.set(1);
        // Title text — matches gpu-panel artist mesh style
        this.titleText = new Text();
        this.titleText.font = FONT;
        this.titleText.fontSize = 0.09;
        this.titleText.unicodeFontsURL = UNICODE_FONTS_URL;
        this.titleText.fontWeight = 800;
        this.titleText.color = 0xffffff;
        this.titleText.anchorX = 'left';
        this.titleText.anchorY = 'middle';
        this.titleText.position.set(-0.85, -0.65, -1);
        this.titleText.fillOpacity = 0;
        this.titleText.sdfGlyphSize = 64;
        this.titleText.gpuAccelerateSDF = true;
        // BANNED: outlineWidth causes visible border artifacts on Troika Text
        this.titleText.text = '';
        this.titleText.layers.set(1);
        this.titleText.sync();
        this.group.add(this.titleText);
        // Artist text — soft blue tint like gpu-panel ALBUM_GLOW_COLOR
        this.artistText = new Text();
        this.artistText.font = FONT;
        this.artistText.fontSize = 0.055;
        this.artistText.unicodeFontsURL = UNICODE_FONTS_URL;
        this.artistText.fontWeight = 800;
        this.artistText.color = 0x7eb8ff;
        this.artistText.anchorX = 'left';
        this.artistText.anchorY = 'middle';
        this.artistText.position.set(-0.85, -0.78, -1);
        this.artistText.fillOpacity = 0;
        this.artistText.sdfGlyphSize = 64;
        this.artistText.gpuAccelerateSDF = true;
        this.artistText.text = '';
        this.artistText.layers.set(1);
        this.artistText.sync();
        this.group.add(this.artistText);
    }
    setTrack(title, artist) {
        this.titleText.text = title;
        this.artistText.text = artist;
        this.titleText.sync();
        this.artistText.sync();
    }
    /** When centered=true, text moves to center (visual/zen mode).
     *  When centered=false, text stays bottom-left (idle/info mode). */
    setCentered(centered) {
        if (centered === this._centered)
            return;
        this._centered = centered;
        console.log(`[GpuTypography] setCentered(${centered}) — moving text to ${centered ? 'CENTER' : 'BOTTOM-LEFT'}`);
        console.trace('[GpuTypography] setCentered caller');
        if (centered) {
            this.titleText.anchorX = 'left';
            this.artistText.anchorX = 'left';
            this.titleText.position.set(-0.45, 0.06, -1);
            this.artistText.position.set(-0.45, -0.05, -1);
        }
        else {
            this.titleText.anchorX = 'left';
            this.artistText.anchorX = 'left';
            this.titleText.position.set(-0.85, -0.65, -1);
            this.artistText.position.set(-0.85, -0.78, -1);
        }
        this.titleText.sync();
        this.artistText.sync();
    }
    setVisible(visible) {
        console.log(`[GpuTypography] setVisible(${visible})`);
        this.targetOpacity = visible ? 1 : 0;
    }
    update(rms) {
        this.opacity += (this.targetOpacity - this.opacity) * 0.04;
        this.titleText.fillOpacity = this.opacity;
        this.artistText.fillOpacity = this.opacity * 0.85;
    }
    addToScene(scene) {
        scene.add(this.group);
    }
    removeFromScene(scene) {
        scene.remove(this.group);
    }
    dispose() {
        this.titleText.dispose();
        this.artistText.dispose();
    }
}
