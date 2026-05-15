export default {
  id: 'pulsing-ring',
  keepTrails: false,
  draw(manager, frame) {
    manager.drawPulsingRing(frame.width, frame.height, frame.bands.bass, frame.response);
  },
};

