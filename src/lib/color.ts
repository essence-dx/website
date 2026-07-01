const HEX_REGEX = /^#[0-9a-fA-F]{3,8}$/;
const OKLCH_REGEX = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/;

export function isHexColor(value: string): boolean {
  return HEX_REGEX.test(value);
}

export function isOklch(value: string): boolean {
  return OKLCH_REGEX.test(value);
}

export function hexToHsl(hex: string): string {
  let h = hex.replace("#", "");

  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }

  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;

  return rgbToHsl(r, g, b);
}

export function oklchToHsl(oklch: string): string {
  const match = OKLCH_REGEX.exec(oklch);
  if (!match) return "";

  const L = parseFloat(match[1]);
  const C = parseFloat(match[2]);
  const H = parseFloat(match[3]);

  const Hrad = H * (Math.PI / 180);
  const a = C * Math.cos(Hrad);
  const b = C * Math.sin(Hrad);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const lC = l_ * l_ * l_;
  const mC = m_ * m_ * m_;
  const sC = s_ * s_ * s_;

  let rLin = 4.0767416621 * lC - 3.3077115913 * mC + 0.2309699292 * sC;
  let gLin = -1.2684380046 * lC + 2.6097574011 * mC - 0.3413193965 * sC;
  let bLin = -0.0041960863 * lC - 0.7034186147 * mC + 1.7076147010 * sC;

  const gamma = (c: number): number => {
    const clamped = Math.max(0, Math.min(1, c));
    if (clamped <= 0.0031308) return 12.92 * clamped;
    return 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  };

  return rgbToHsl(gamma(rLin), gamma(gLin), gamma(bLin));
}

function rgbToHsl(r: number, g: number, b: number): string {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let hue = 0;
  let saturation = 0;
  const lightness = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        hue = ((b - r) / d + 2) / 6;
        break;
      case b:
        hue = ((r - g) / d + 4) / 6;
        break;
    }
  }

  const hDeg = Math.round(hue * 360);
  const sPct = Math.round(saturation * 100);
  const lPct = Math.round(lightness * 100);

  return `${hDeg}, ${sPct}%, ${lPct}%`;
}
