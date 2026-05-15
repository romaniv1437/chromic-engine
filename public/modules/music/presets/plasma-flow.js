export default {
  id: 'plasma-flow',
  keepTrails: false,
  draw(manager, frame) {
    manager.drawPlasmaFlow(frame.width, frame.height, frame.response);
  },
};

