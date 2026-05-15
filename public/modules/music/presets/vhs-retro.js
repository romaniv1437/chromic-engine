export default {
  id: 'vhs-retro',
  keepTrails: false,
  draw(manager, frame) {
    const { ctx } = manager;
    const { width, height } = frame;
    const bass = frame.bands.bass;
    const energy = frame.bands.energy;
    const mood = frame.mood || { jitter: 0, bloomAlpha: 0.16 };

    manager.drawOscilloscope(width, height, Math.max(0.75, frame.response * 0.95));

    const jitter = Math.sin(Date.now() * 0.012) * (2 + bass * 10 + mood.jitter);
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.14 + bass * 0.22 + mood.bloomAlpha * 0.3;
    ctx.fillStyle = 'rgba(255, 40, 80, 0.18)';
    ctx.fillRect(jitter, 0, width, height);
    ctx.fillStyle = 'rgba(40, 180, 255, 0.16)';
    ctx.fillRect(jitter * -1.2, 0, width, height);
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = `rgba(255,255,255,${0.05 + energy * 0.08})`;
    for (let index = 0; index < 240; index += 1) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const alpha = Math.random() * (0.1 + bass * 0.14);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fillRect(x, y, 1, 1);
    }

    ctx.fillStyle = `rgba(0,0,0,${0.14 + bass * 0.08})`;
    for (let y = 0; y < height; y += 4) {
      ctx.fillRect(0, y, width, 1);
    }

    if (Math.random() > 0.92 - bass * 0.08) {
      ctx.fillStyle = `rgba(255,255,255,${0.08 + bass * 0.1})`;
      ctx.fillRect(0, Math.random() * height, width, 2 + bass * 3);
    }
    ctx.restore();
  },
};

