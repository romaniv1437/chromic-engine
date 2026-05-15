export default {
  id: 'milkdrop-nebula',
  keepTrails: false,
  draw(manager, frame) {
    manager.drawMilkdropNebula(frame.width, frame.height, frame.bands.bass, frame.response);
  },
};

