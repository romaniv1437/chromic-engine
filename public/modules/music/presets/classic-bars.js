export default {
  id: 'classic-bars',
  keepTrails: false,
  draw(manager, frame) {
    manager.drawClassicBars(frame.width, frame.height, frame.response);
  },
};

