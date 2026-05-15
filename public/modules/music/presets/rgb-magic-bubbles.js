export default {
  id: 'rgb-magic-bubbles',
  keepTrails: true,
  draw(manager, frame) {
    manager.drawRgbMagicBubbles(frame.width, frame.height, frame.bands.bass, frame.bands.treble, frame.response);
  },
};

