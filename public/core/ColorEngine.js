const DEFAULT_ACCENT = { r: 125, g: 214, b: 255 };

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const toRgbString = ({ r, g, b }) => `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

export const relativeLuminance = ({ r, g, b }) => {
  const normalize = (channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };

  const linearR = normalize(r);
  const linearG = normalize(g);
  const linearB = normalize(b);
  return linearR * 0.2126 + linearG * 0.7152 + linearB * 0.0722;
};

export const normalizeAccent = (color) => {
  const next = {
    r: clamp(Number(color?.r) || DEFAULT_ACCENT.r, 0, 255),
    g: clamp(Number(color?.g) || DEFAULT_ACCENT.g, 0, 255),
    b: clamp(Number(color?.b) || DEFAULT_ACCENT.b, 0, 255),
  };

  const luminance = relativeLuminance(next);
  const targetMin = 0.18;
  const targetMax = 0.72;

  if (luminance < targetMin) {
    const factor = targetMin / Math.max(luminance, 0.001);
    return {
      r: clamp(next.r * factor, 0, 255),
      g: clamp(next.g * factor, 0, 255),
      b: clamp(next.b * factor, 0, 255),
    };
  }

  if (luminance > targetMax) {
    const factor = targetMax / luminance;
    return {
      r: clamp(next.r * factor, 0, 255),
      g: clamp(next.g * factor, 0, 255),
      b: clamp(next.b * factor, 0, 255),
    };
  }

  return next;
};

export const extractDominantAccent = (pixelData) => {
  if (!pixelData || pixelData.length < 4) {
    return DEFAULT_ACCENT;
  }

  let weightedR = 0;
  let weightedG = 0;
  let weightedB = 0;
  let totalWeight = 0;

  for (let index = 0; index < pixelData.length; index += 4) {
    const r = pixelData[index];
    const g = pixelData[index + 1];
    const b = pixelData[index + 2];
    const alpha = pixelData[index + 3] / 255;

    if (alpha <= 0.04) {
      continue;
    }

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max === 0 ? 0 : (max - min) / max;
    const brightness = (r + g + b) / (255 * 3);
    const weight = alpha * (0.35 + saturation * 1.15 + brightness * 0.2);

    weightedR += r * weight;
    weightedG += g * weight;
    weightedB += b * weight;
    totalWeight += weight;
  }

  if (totalWeight <= 0) {
    return DEFAULT_ACCENT;
  }

  return normalizeAccent({
    r: weightedR / totalWeight,
    g: weightedG / totalWeight,
    b: weightedB / totalWeight,
  });
};

export const extractPalette = (pixelData, colorCount = 10) => {
  if (!pixelData || pixelData.length < 4) {
    return [DEFAULT_ACCENT];
  }

  // Collect saturated pixels into buckets by hue
  const HUE_BUCKETS = 36;
  const buckets = Array.from({ length: HUE_BUCKETS }, () => ({ r: 0, g: 0, b: 0, count: 0, satSum: 0 }));

  for (let i = 0; i < pixelData.length; i += 4) {
    const r = pixelData[i];
    const g = pixelData[i + 1];
    const b = pixelData[i + 2];
    const a = pixelData[i + 3] / 255;
    if (a < 0.1) continue;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    const saturation = max === 0 ? 0 : delta / max;
    const brightness = (r + g + b) / (255 * 3);

    // Skip very dark or very desaturated pixels
    if (brightness < 0.05 || (saturation < 0.1 && brightness < 0.3)) continue;

    let hue = 0;
    if (delta > 0) {
      if (max === r) hue = ((g - b) / delta) % 6;
      else if (max === g) hue = (b - r) / delta + 2;
      else hue = (r - g) / delta + 4;
      hue = ((hue * 60) + 360) % 360;
    }

    const bucketIndex = Math.floor(hue / (360 / HUE_BUCKETS)) % HUE_BUCKETS;
    const weight = a * (0.3 + saturation * 0.7);
    buckets[bucketIndex].r += r * weight;
    buckets[bucketIndex].g += g * weight;
    buckets[bucketIndex].b += b * weight;
    buckets[bucketIndex].count += weight;
    buckets[bucketIndex].satSum += saturation * weight;
  }

  // Sort buckets by weight (saturation * count), take top N
  const sorted = buckets
    .filter((b) => b.count > 0)
    .map((b) => ({
      r: Math.round(b.r / b.count),
      g: Math.round(b.g / b.count),
      b: Math.round(b.b / b.count),
      weight: b.satSum,
    }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, colorCount)
    .map(({ r, g, b }) => normalizeAccent({ r, g, b }));

  // Detect if palette is too desaturated (all colors are gray-ish)
  // If so, boost saturation of top colors to create visible lava color variation
  if (sorted.length >= 3) {
    const avgSat = sorted.slice(0, 3).reduce((sum, c) => {
      const mx = Math.max(c.r, c.g, c.b);
      const mn = Math.min(c.r, c.g, c.b);
      return sum + (mx === 0 ? 0 : (mx - mn) / mx);
    }, 0) / 3;

    if (avgSat < 0.15) {
      // Colors are too gray — boost saturation by pushing channels apart
      for (let i = 0; i < Math.min(sorted.length, 3); i++) {
        const c = sorted[i];
        const avg = (c.r + c.g + c.b) / 3;
        const boostFactor = 2.5; // how much to amplify channel differences
        c.r = clamp(Math.round(avg + (c.r - avg) * boostFactor), 0, 255);
        c.g = clamp(Math.round(avg + (c.g - avg) * boostFactor), 0, 255);
        c.b = clamp(Math.round(avg + (c.b - avg) * boostFactor), 0, 255);

        // If STILL gray after boost (truly achromatic), tint based on luminance
        const mx2 = Math.max(c.r, c.g, c.b);
        const mn2 = Math.min(c.r, c.g, c.b);
        if (mx2 - mn2 < 30) {
          // Create distinct tints: cool blue for dark, warm amber for mid, rose for bright
          const tints = [
            { r: 0.7, g: 0.85, b: 1.0 },   // cool steel blue
            { r: 1.0, g: 0.88, b: 0.7 },    // warm amber
            { r: 1.0, g: 0.75, b: 0.85 },   // dusty rose
          ];
          const t = tints[i % tints.length];
          c.r = clamp(Math.round(c.r * t.r), 0, 255);
          c.g = clamp(Math.round(c.g * t.g), 0, 255);
          c.b = clamp(Math.round(c.b * t.b), 0, 255);
        }
        sorted[i] = normalizeAccent(c);
      }
    }
  }

  // Pad with variations if not enough colors
  while (sorted.length < colorCount) {
    const base = sorted[sorted.length % Math.max(1, sorted.length - 1)] || DEFAULT_ACCENT;
    sorted.push({
      r: clamp(base.r + (Math.random() - 0.5) * 40, 0, 255),
      g: clamp(base.g + (Math.random() - 0.5) * 40, 0, 255),
      b: clamp(base.b + (Math.random() - 0.5) * 40, 0, 255),
    });
  }

  return sorted;
};

export class ColorEngine {
  constructor({ rootElement = typeof document === 'undefined' ? null : document.documentElement, sampleSize = 50 } = {}) {
    this.rootElement = rootElement;
    this.sampleSize = sampleSize;
  }

  extractFromCover(imageElement) {
    if (!imageElement || !imageElement.naturalWidth || typeof document === 'undefined') {
      return DEFAULT_ACCENT;
    }

    const canvas = document.createElement('canvas');
    const size = this.sampleSize;
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) {
      return DEFAULT_ACCENT;
    }

    context.drawImage(imageElement, 0, 0, size, size);
    const { data } = context.getImageData(0, 0, size, size);
    return extractDominantAccent(data);
  }

  applyAccent(color) {
    const normalized = normalizeAccent(color);
    const { r, g, b } = normalized;
    const rgb = toRgbString(normalized);
    const light = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.34)`;
    const glow = `0 0 22px rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.56)`;

    if (this.rootElement) {
      this.rootElement.style.setProperty('--cover-accent-color', rgb);
      this.rootElement.style.setProperty('--cover-accent-color-light', light);
      this.rootElement.style.setProperty('--cover-accent-glow', glow);
    }

    return rgb;
  }

  updateThemeFromCover(imageElement) {
    const accent = this.extractFromCover(imageElement);
    return this.applyAccent(accent);
  }
}

export const updateThemeFromCover = (imageElement, options = {}) => {
  const engine = new ColorEngine(options);
  return engine.updateThemeFromCover(imageElement);
};
