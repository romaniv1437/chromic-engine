export default {
  id: 'spectrum-fire',
  keepTrails: false,
  draw(manager, frame) {
    manager.drawSpectrumFire(frame.width, frame.height, frame.response);
  },
};

