const NOTE_SYMBOLS = ['♪', '♫', '♬', '♩'];
const MAX_NOTES = 40;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const createNote = (width, height) => ({
  x: Math.random() * width,
  y: height + Math.random() * 120,
  size: 10 + Math.random() * 25,
  velocity: 1 + Math.random() * 3,
  symbol: NOTE_SYMBOLS[Math.floor(Math.random() * NOTE_SYMBOLS.length)],
  hue: Math.random() * 360,
});

export default {
  id: 'musical-symphony',
  keepTrails: true,
  draw(manager, frame) {
    const { ctx } = manager;
    const { width, height } = frame;
    const bass = frame.bands.bass;
    const treble = frame.bands.treble;
    const energy = frame.bands.energy;
    const mood = frame.mood || {};
    const intensity = clamp(mood.intensity ?? energy, 0, 2.5);
    const hueShift = Number.isFinite(mood.hueShift) ? mood.hueShift : 0;
    const smoothedE = mood.smoothedExcitement ?? energy;
    const rawE = mood.rawExcitement ?? energy;

    if (!Array.isArray(manager.noteSprites) || !manager.noteSprites.length) {
      manager.noteSprites = Array.from({ length: MAX_NOTES }, () => createNote(width, height));
    }

    ctx.save();
    ctx.fillStyle = 'rgba(4, 8, 20, 0.22)';
    ctx.fillRect(0, 0, width, height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    manager.noteSprites.forEach((note) => {
      note.y -= note.velocity * (1 + intensity);
      note.x += Math.sin((note.y + note.hue) * 0.01) * (0.25 + intensity * 0.6);
      if (note.y < -50) {
        note.y = height + 50;
        note.x = Math.random() * width;
      }

      const size = note.size * (1 + smoothedE * 0.5 + intensity * 0.15);
      const hue = ((note.hue + hueShift) % 360 + 360) % 360;
      ctx.font = `${Math.round(size)}px "Inter", -Chromic-system, sans-serif`;
      ctx.globalAlpha = clamp(0.25 + rawE * 0.65, 0.15, 0.88);
      ctx.fillStyle = `hsl(${Math.round(hue)}, 82%, 62%)`;
      ctx.fillText(note.symbol, note.x, note.y);
    });

    ctx.globalAlpha = 1;
    ctx.restore();
  },
};

