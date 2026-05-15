export default {
  id: 'starfield-warp',
  keepTrails: true,
  draw(manager, frame) {
    manager.drawStarfieldWarp(frame.width, frame.height, frame.bands.bass, frame.response);
  },
};

