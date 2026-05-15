const SOAP_PALETTE = [
  { r: 255, g: 140, b: 200 },
  { r: 200, g: 120, b: 255 },
  { r: 255, g: 180, b: 220 },
  { r: 180, g: 160, b: 255 },
  { r: 255, g: 200, b: 240 },
  { r: 220, g: 140, b: 255 },
  { r: 255, g: 160, b: 210 },
  { r: 190, g: 180, b: 255 },
  { r: 255, g: 220, b: 250 },
  { r: 240, g: 160, b: 230 },
];

let applied = false;

export default {
  id: 'soap-bubbles',
  keepTrails: true,
  draw(manager, frame) {
    // Apply pink soap palette on first frame
    if (!applied || !manager._palette) {
      manager.setPalette(SOAP_PALETTE);
      applied = true;
    }
    manager.drawRgbMagicBubbles(frame.width, frame.height, frame.bands.bass, frame.bands.treble, frame.response);
  },
};

