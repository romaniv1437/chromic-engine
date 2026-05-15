export default {
  id: 'digital-rain',
  keepTrails: false,
  draw(manager, frame) {
    manager.drawDigitalRain(frame.width, frame.height, frame.response);
  },
};

