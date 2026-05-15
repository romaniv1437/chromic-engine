export default {
  id: 'rgb-glitch',
  keepTrails: false,
  draw(manager, frame) {
    manager.drawRgbGlitch(frame.width, frame.height, frame.bands.bass, frame.response);
  },
};

