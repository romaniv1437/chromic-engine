export default {
  id: 'vaporwave-grid',
  keepTrails: false,
  draw(manager, frame) {
    manager.drawVaporwaveGrid(frame.width, frame.height, frame.response);
  },
};

