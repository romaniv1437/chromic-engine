export default {
  id: 'oscilloscope',
  keepTrails: false,
  draw(manager, frame) {
    manager.drawOscilloscope(frame.width, frame.height, frame.response);
  },
};

