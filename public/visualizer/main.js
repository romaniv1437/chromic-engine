/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const Zs = "162";
const Pn = "", un = "srgb", Un = "srgb-linear", Js = "display-p3", jr = "display-p3-linear", Xr = "linear", lt = "srgb", qr = "rec709", Yr = "p3";
const ga = "300 es";
class Ai {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const r = this._listeners;
    r[e] === void 0 && (r[e] = []), r[e].indexOf(t) === -1 && r[e].push(t);
  }
  hasEventListener(e, t) {
    if (this._listeners === void 0) return !1;
    const r = this._listeners;
    return r[e] !== void 0 && r[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    if (this._listeners === void 0) return;
    const n = this._listeners[e];
    if (n !== void 0) {
      const i = n.indexOf(t);
      i !== -1 && n.splice(i, 1);
    }
  }
  dispatchEvent(e) {
    if (this._listeners === void 0) return;
    const r = this._listeners[e.type];
    if (r !== void 0) {
      e.target = this;
      const n = r.slice(0);
      for (let i = 0, o = n.length; i < o; i++)
        n[i].call(this, e);
      e.target = null;
    }
  }
}
const At = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], us = Math.PI / 180, Gs = 180 / Math.PI;
function er() {
  const s = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0;
  return (At[s & 255] + At[s >> 8 & 255] + At[s >> 16 & 255] + At[s >> 24 & 255] + "-" + At[e & 255] + At[e >> 8 & 255] + "-" + At[e >> 16 & 15 | 64] + At[e >> 24 & 255] + "-" + At[t & 63 | 128] + At[t >> 8 & 255] + "-" + At[t >> 16 & 255] + At[t >> 24 & 255] + At[r & 255] + At[r >> 8 & 255] + At[r >> 16 & 255] + At[r >> 24 & 255]).toLowerCase();
}
function zt(s, e, t) {
  return Math.max(e, Math.min(t, s));
}
function xl(s, e) {
  return (s % e + e) % e;
}
function fs(s, e, t) {
  return (1 - t) * s + t * e;
}
function xa(s) {
  return (s & s - 1) === 0 && s !== 0;
}
function ks(s) {
  return Math.pow(2, Math.floor(Math.log(s) / Math.LN2));
}
function Gi(s, e) {
  switch (e.constructor) {
    case Float32Array:
      return s;
    case Uint32Array:
      return s / 4294967295;
    case Uint16Array:
      return s / 65535;
    case Uint8Array:
      return s / 255;
    case Int32Array:
      return Math.max(s / 2147483647, -1);
    case Int16Array:
      return Math.max(s / 32767, -1);
    case Int8Array:
      return Math.max(s / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Bt(s, e) {
  switch (e.constructor) {
    case Float32Array:
      return s;
    case Uint32Array:
      return Math.round(s * 4294967295);
    case Uint16Array:
      return Math.round(s * 65535);
    case Uint8Array:
      return Math.round(s * 255);
    case Int32Array:
      return Math.round(s * 2147483647);
    case Int16Array:
      return Math.round(s * 32767);
    case Int8Array:
      return Math.round(s * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
class De {
  constructor(e = 0, t = 0) {
    De.prototype.isVector2 = !0, this.x = e, this.y = t;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x, r = this.y, n = e.elements;
    return this.x = n[0] * t + n[3] * r + n[6], this.y = n[1] * t + n[4] * r + n[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this;
  }
  clampLength(e, t) {
    const r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Math.max(e, Math.min(t, r)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const r = this.dot(e) / t;
    return Math.acos(zt(r, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, r = this.y - e.y;
    return t * t + r * r;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  lerpVectors(e, t, r) {
    return this.x = e.x + (t.x - e.x) * r, this.y = e.y + (t.y - e.y) * r, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  rotateAround(e, t) {
    const r = Math.cos(t), n = Math.sin(t), i = this.x - e.x, o = this.y - e.y;
    return this.x = i * r - o * n + e.x, this.y = i * n + o * r + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class $e {
  constructor(e, t, r, n, i, o, a, l, c) {
    $e.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, r, n, i, o, a, l, c);
  }
  set(e, t, r, n, i, o, a, l, c) {
    const u = this.elements;
    return u[0] = e, u[1] = n, u[2] = a, u[3] = t, u[4] = i, u[5] = l, u[6] = r, u[7] = o, u[8] = c, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(e) {
    const t = this.elements, r = e.elements;
    return t[0] = r[0], t[1] = r[1], t[2] = r[2], t[3] = r[3], t[4] = r[4], t[5] = r[5], t[6] = r[6], t[7] = r[7], t[8] = r[8], this;
  }
  extractBasis(e, t, r) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), r.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const r = e.elements, n = t.elements, i = this.elements, o = r[0], a = r[3], l = r[6], c = r[1], u = r[4], f = r[7], h = r[2], d = r[5], _ = r[8], v = n[0], p = n[3], m = n[6], y = n[1], g = n[4], A = n[7], w = n[2], T = n[5], S = n[8];
    return i[0] = o * v + a * y + l * w, i[3] = o * p + a * g + l * T, i[6] = o * m + a * A + l * S, i[1] = c * v + u * y + f * w, i[4] = c * p + u * g + f * T, i[7] = c * m + u * A + f * S, i[2] = h * v + d * y + _ * w, i[5] = h * p + d * g + _ * T, i[8] = h * m + d * A + _ * S, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], r = e[1], n = e[2], i = e[3], o = e[4], a = e[5], l = e[6], c = e[7], u = e[8];
    return t * o * u - t * a * c - r * i * u + r * a * l + n * i * c - n * o * l;
  }
  invert() {
    const e = this.elements, t = e[0], r = e[1], n = e[2], i = e[3], o = e[4], a = e[5], l = e[6], c = e[7], u = e[8], f = u * o - a * c, h = a * l - u * i, d = c * i - o * l, _ = t * f + r * h + n * d;
    if (_ === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const v = 1 / _;
    return e[0] = f * v, e[1] = (n * c - u * r) * v, e[2] = (a * r - n * o) * v, e[3] = h * v, e[4] = (u * t - n * l) * v, e[5] = (n * i - a * t) * v, e[6] = d * v, e[7] = (r * l - c * t) * v, e[8] = (o * t - r * i) * v, this;
  }
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  setUvTransform(e, t, r, n, i, o, a) {
    const l = Math.cos(i), c = Math.sin(i);
    return this.set(
      r * l,
      r * c,
      -r * (l * o + c * a) + o + e,
      -n * c,
      n * l,
      -n * (-c * o + l * a) + a + t,
      0,
      0,
      1
    ), this;
  }
  //
  scale(e, t) {
    return this.premultiply(hs.makeScale(e, t)), this;
  }
  rotate(e) {
    return this.premultiply(hs.makeRotation(-e)), this;
  }
  translate(e, t) {
    return this.premultiply(hs.makeTranslation(e, t)), this;
  }
  // for 2D Transforms
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  makeRotation(e) {
    const t = Math.cos(e), r = Math.sin(e);
    return this.set(
      t,
      -r,
      0,
      r,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(e) {
    const t = this.elements, r = e.elements;
    for (let n = 0; n < 9; n++)
      if (t[n] !== r[n]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let r = 0; r < 9; r++)
      this.elements[r] = e[r + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const r = this.elements;
    return e[t] = r[0], e[t + 1] = r[1], e[t + 2] = r[2], e[t + 3] = r[3], e[t + 4] = r[4], e[t + 5] = r[5], e[t + 6] = r[6], e[t + 7] = r[7], e[t + 8] = r[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const hs = /* @__PURE__ */ new $e();
function Io(s) {
  for (let e = s.length - 1; e >= 0; --e)
    if (s[e] >= 65535) return !0;
  return !1;
}
function Qi(s) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", s);
}
function yl() {
  const s = Qi("canvas");
  return s.style.display = "block", s;
}
const ya = {};
function bl(s) {
  s in ya || (ya[s] = !0, console.warn(s));
}
const ba = /* @__PURE__ */ new $e().set(
  0.8224621,
  0.177538,
  0,
  0.0331941,
  0.9668058,
  0,
  0.0170827,
  0.0723974,
  0.9105199
), Sa = /* @__PURE__ */ new $e().set(
  1.2249401,
  -0.2249404,
  0,
  -0.0420569,
  1.0420571,
  0,
  -0.0196376,
  -0.0786361,
  1.0982735
), dr = {
  [Un]: {
    transfer: Xr,
    primaries: qr,
    toReference: (s) => s,
    fromReference: (s) => s
  },
  [un]: {
    transfer: lt,
    primaries: qr,
    toReference: (s) => s.convertSRGBToLinear(),
    fromReference: (s) => s.convertLinearToSRGB()
  },
  [jr]: {
    transfer: Xr,
    primaries: Yr,
    toReference: (s) => s.applyMatrix3(Sa),
    fromReference: (s) => s.applyMatrix3(ba)
  },
  [Js]: {
    transfer: lt,
    primaries: Yr,
    toReference: (s) => s.convertSRGBToLinear().applyMatrix3(Sa),
    fromReference: (s) => s.applyMatrix3(ba).convertLinearToSRGB()
  }
}, Sl = /* @__PURE__ */ new Set([Un, jr]), st = {
  enabled: !0,
  _workingColorSpace: Un,
  get workingColorSpace() {
    return this._workingColorSpace;
  },
  set workingColorSpace(s) {
    if (!Sl.has(s))
      throw new Error(`Unsupported working color space, "${s}".`);
    this._workingColorSpace = s;
  },
  convert: function(s, e, t) {
    if (this.enabled === !1 || e === t || !e || !t)
      return s;
    const r = dr[e].toReference, n = dr[t].fromReference;
    return n(r(s));
  },
  fromWorkingColorSpace: function(s, e) {
    return this.convert(s, this._workingColorSpace, e);
  },
  toWorkingColorSpace: function(s, e) {
    return this.convert(s, e, this._workingColorSpace);
  },
  getPrimaries: function(s) {
    return dr[s].primaries;
  },
  getTransfer: function(s) {
    return s === Pn ? Xr : dr[s].transfer;
  }
};
function Ti(s) {
  return s < 0.04045 ? s * 0.0773993808 : Math.pow(s * 0.9478672986 + 0.0521327014, 2.4);
}
function ds(s) {
  return s < 31308e-7 ? s * 12.92 : 1.055 * Math.pow(s, 0.41666) - 0.055;
}
let ti;
class No {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let t;
    if (e instanceof HTMLCanvasElement)
      t = e;
    else {
      ti === void 0 && (ti = Qi("canvas")), ti.width = e.width, ti.height = e.height;
      const r = ti.getContext("2d");
      e instanceof ImageData ? r.putImageData(e, 0, 0) : r.drawImage(e, 0, 0, e.width, e.height), t = ti;
    }
    return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), t.toDataURL("image/jpeg", 0.6)) : t.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = Qi("canvas");
      t.width = e.width, t.height = e.height;
      const r = t.getContext("2d");
      r.drawImage(e, 0, 0, e.width, e.height);
      const n = r.getImageData(0, 0, e.width, e.height), i = n.data;
      for (let o = 0; o < i.length; o++)
        i[o] = Ti(i[o] / 255) * 255;
      return r.putImageData(n, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let r = 0; r < t.length; r++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[r] = Math.floor(Ti(t[r] / 255) * 255) : t[r] = Ti(t[r]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let Ml = 0;
class Oo {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Ml++ }), this.uuid = er(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const r = {
      uuid: this.uuid,
      url: ""
    }, n = this.data;
    if (n !== null) {
      let i;
      if (Array.isArray(n)) {
        i = [];
        for (let o = 0, a = n.length; o < a; o++)
          n[o].isDataTexture ? i.push(ps(n[o].image)) : i.push(ps(n[o]));
      } else
        i = ps(n);
      r.url = i;
    }
    return t || (e.images[this.uuid] = r), r;
  }
}
function ps(s) {
  return typeof HTMLImageElement < "u" && s instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && s instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && s instanceof ImageBitmap ? No.getDataURL(s) : s.data ? {
    data: Array.from(s.data),
    width: s.width,
    height: s.height,
    type: s.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Tl = 0;
class Tt extends Ai {
  constructor(e = Tt.DEFAULT_IMAGE, t = Tt.DEFAULT_MAPPING, r = 1001, n = 1001, i = 1006, o = 1008, a = 1023, l = 1009, c = Tt.DEFAULT_ANISOTROPY, u = Pn) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Tl++ }), this.uuid = er(), this.name = "", this.source = new Oo(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = r, this.wrapT = n, this.magFilter = i, this.minFilter = o, this.anisotropy = c, this.format = a, this.internalFormat = null, this.type = l, this.offset = new De(0, 0), this.repeat = new De(1, 1), this.center = new De(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new $e(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = u, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.needsPMREMUpdate = !1;
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const r = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (r.userData = this.userData), t || (e.textures[this.uuid] = r), r;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== 300) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case 1e3:
          e.x = e.x - Math.floor(e.x);
          break;
        case 1001:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case 1e3:
          e.y = e.y - Math.floor(e.y);
          break;
        case 1001:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
}
Tt.DEFAULT_IMAGE = null;
Tt.DEFAULT_MAPPING = 300;
Tt.DEFAULT_ANISOTROPY = 1;
class vt {
  constructor(e = 0, t = 0, r = 0, n = 1) {
    vt.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = r, this.w = n;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, r, n) {
    return this.x = e, this.y = t, this.z = r, this.w = n, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    const t = this.x, r = this.y, n = this.z, i = this.w, o = e.elements;
    return this.x = o[0] * t + o[4] * r + o[8] * n + o[12] * i, this.y = o[1] * t + o[5] * r + o[9] * n + o[13] * i, this.z = o[2] * t + o[6] * r + o[10] * n + o[14] * i, this.w = o[3] * t + o[7] * r + o[11] * n + o[15] * i, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, r, n, i;
    const l = e.elements, c = l[0], u = l[4], f = l[8], h = l[1], d = l[5], _ = l[9], v = l[2], p = l[6], m = l[10];
    if (Math.abs(u - h) < 0.01 && Math.abs(f - v) < 0.01 && Math.abs(_ - p) < 0.01) {
      if (Math.abs(u + h) < 0.1 && Math.abs(f + v) < 0.1 && Math.abs(_ + p) < 0.1 && Math.abs(c + d + m - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const g = (c + 1) / 2, A = (d + 1) / 2, w = (m + 1) / 2, T = (u + h) / 4, S = (f + v) / 4, C = (_ + p) / 4;
      return g > A && g > w ? g < 0.01 ? (r = 0, n = 0.707106781, i = 0.707106781) : (r = Math.sqrt(g), n = T / r, i = S / r) : A > w ? A < 0.01 ? (r = 0.707106781, n = 0, i = 0.707106781) : (n = Math.sqrt(A), r = T / n, i = C / n) : w < 0.01 ? (r = 0.707106781, n = 0.707106781, i = 0) : (i = Math.sqrt(w), r = S / i, n = C / i), this.set(r, n, i, t), this;
    }
    let y = Math.sqrt((p - _) * (p - _) + (f - v) * (f - v) + (h - u) * (h - u));
    return Math.abs(y) < 1e-3 && (y = 1), this.x = (p - _) / y, this.y = (f - v) / y, this.z = (h - u) / y, this.w = Math.acos((c + d + m - 1) / 2), this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this;
  }
  clampLength(e, t) {
    const r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Math.max(e, Math.min(t, r)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  lerpVectors(e, t, r) {
    return this.x = e.x + (t.x - e.x) * r, this.y = e.y + (t.y - e.y) * r, this.z = e.z + (t.z - e.z) * r, this.w = e.w + (t.w - e.w) * r, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class El extends Ai {
  constructor(e = 1, t = 1, r = {}) {
    super(), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = 1, this.scissor = new vt(0, 0, e, t), this.scissorTest = !1, this.viewport = new vt(0, 0, e, t);
    const n = { width: e, height: t, depth: 1 };
    r = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: 1006,
      depthBuffer: !0,
      stencilBuffer: !1,
      depthTexture: null,
      samples: 0,
      count: 1
    }, r);
    const i = new Tt(n, r.mapping, r.wrapS, r.wrapT, r.magFilter, r.minFilter, r.format, r.type, r.anisotropy, r.colorSpace);
    i.flipY = !1, i.generateMipmaps = r.generateMipmaps, i.internalFormat = r.internalFormat, this.textures = [];
    const o = r.count;
    for (let a = 0; a < o; a++)
      this.textures[a] = i.clone(), this.textures[a].isRenderTargetTexture = !0;
    this.depthBuffer = r.depthBuffer, this.stencilBuffer = r.stencilBuffer, this.depthTexture = r.depthTexture, this.samples = r.samples;
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  setSize(e, t, r = 1) {
    if (this.width !== e || this.height !== t || this.depth !== r) {
      this.width = e, this.height = t, this.depth = r;
      for (let n = 0, i = this.textures.length; n < i; n++)
        this.textures[n].image.width = e, this.textures[n].image.height = t, this.textures[n].image.depth = r;
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let r = 0, n = e.textures.length; r < n; r++)
      this.textures[r] = e.textures[r].clone(), this.textures[r].isRenderTargetTexture = !0;
    const t = Object.assign({}, e.texture.image);
    return this.texture.source = new Oo(t), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class gt extends El {
  constructor(e = 1, t = 1, r = {}) {
    super(e, t, r), this.isWebGLRenderTarget = !0;
  }
}
class Bo extends Tt {
  constructor(e = null, t = 1, r = 1, n = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: r, depth: n }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class wl extends Tt {
  constructor(e = null, t = 1, r = 1, n = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: r, depth: n }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class tr {
  constructor(e = 0, t = 0, r = 0, n = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = r, this._w = n;
  }
  static slerpFlat(e, t, r, n, i, o, a) {
    let l = r[n + 0], c = r[n + 1], u = r[n + 2], f = r[n + 3];
    const h = i[o + 0], d = i[o + 1], _ = i[o + 2], v = i[o + 3];
    if (a === 0) {
      e[t + 0] = l, e[t + 1] = c, e[t + 2] = u, e[t + 3] = f;
      return;
    }
    if (a === 1) {
      e[t + 0] = h, e[t + 1] = d, e[t + 2] = _, e[t + 3] = v;
      return;
    }
    if (f !== v || l !== h || c !== d || u !== _) {
      let p = 1 - a;
      const m = l * h + c * d + u * _ + f * v, y = m >= 0 ? 1 : -1, g = 1 - m * m;
      if (g > Number.EPSILON) {
        const w = Math.sqrt(g), T = Math.atan2(w, m * y);
        p = Math.sin(p * T) / w, a = Math.sin(a * T) / w;
      }
      const A = a * y;
      if (l = l * p + h * A, c = c * p + d * A, u = u * p + _ * A, f = f * p + v * A, p === 1 - a) {
        const w = 1 / Math.sqrt(l * l + c * c + u * u + f * f);
        l *= w, c *= w, u *= w, f *= w;
      }
    }
    e[t] = l, e[t + 1] = c, e[t + 2] = u, e[t + 3] = f;
  }
  static multiplyQuaternionsFlat(e, t, r, n, i, o) {
    const a = r[n], l = r[n + 1], c = r[n + 2], u = r[n + 3], f = i[o], h = i[o + 1], d = i[o + 2], _ = i[o + 3];
    return e[t] = a * _ + u * f + l * d - c * h, e[t + 1] = l * _ + u * h + c * f - a * d, e[t + 2] = c * _ + u * d + a * h - l * f, e[t + 3] = u * _ - a * f - l * h - c * d, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, r, n) {
    return this._x = e, this._y = t, this._z = r, this._w = n, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t = !0) {
    const r = e._x, n = e._y, i = e._z, o = e._order, a = Math.cos, l = Math.sin, c = a(r / 2), u = a(n / 2), f = a(i / 2), h = l(r / 2), d = l(n / 2), _ = l(i / 2);
    switch (o) {
      case "XYZ":
        this._x = h * u * f + c * d * _, this._y = c * d * f - h * u * _, this._z = c * u * _ + h * d * f, this._w = c * u * f - h * d * _;
        break;
      case "YXZ":
        this._x = h * u * f + c * d * _, this._y = c * d * f - h * u * _, this._z = c * u * _ - h * d * f, this._w = c * u * f + h * d * _;
        break;
      case "ZXY":
        this._x = h * u * f - c * d * _, this._y = c * d * f + h * u * _, this._z = c * u * _ + h * d * f, this._w = c * u * f - h * d * _;
        break;
      case "ZYX":
        this._x = h * u * f - c * d * _, this._y = c * d * f + h * u * _, this._z = c * u * _ - h * d * f, this._w = c * u * f + h * d * _;
        break;
      case "YZX":
        this._x = h * u * f + c * d * _, this._y = c * d * f + h * u * _, this._z = c * u * _ - h * d * f, this._w = c * u * f - h * d * _;
        break;
      case "XZY":
        this._x = h * u * f - c * d * _, this._y = c * d * f - h * u * _, this._z = c * u * _ + h * d * f, this._w = c * u * f + h * d * _;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + o);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const r = t / 2, n = Math.sin(r);
    return this._x = e.x * n, this._y = e.y * n, this._z = e.z * n, this._w = Math.cos(r), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, r = t[0], n = t[4], i = t[8], o = t[1], a = t[5], l = t[9], c = t[2], u = t[6], f = t[10], h = r + a + f;
    if (h > 0) {
      const d = 0.5 / Math.sqrt(h + 1);
      this._w = 0.25 / d, this._x = (u - l) * d, this._y = (i - c) * d, this._z = (o - n) * d;
    } else if (r > a && r > f) {
      const d = 2 * Math.sqrt(1 + r - a - f);
      this._w = (u - l) / d, this._x = 0.25 * d, this._y = (n + o) / d, this._z = (i + c) / d;
    } else if (a > f) {
      const d = 2 * Math.sqrt(1 + a - r - f);
      this._w = (i - c) / d, this._x = (n + o) / d, this._y = 0.25 * d, this._z = (l + u) / d;
    } else {
      const d = 2 * Math.sqrt(1 + f - r - a);
      this._w = (o - n) / d, this._x = (i + c) / d, this._y = (l + u) / d, this._z = 0.25 * d;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let r = e.dot(t) + 1;
    return r < Number.EPSILON ? (r = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = r) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = r)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = r), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(zt(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const r = this.angleTo(e);
    if (r === 0) return this;
    const n = Math.min(1, t / r);
    return this.slerp(e, n), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const r = e._x, n = e._y, i = e._z, o = e._w, a = t._x, l = t._y, c = t._z, u = t._w;
    return this._x = r * u + o * a + n * c - i * l, this._y = n * u + o * l + i * a - r * c, this._z = i * u + o * c + r * l - n * a, this._w = o * u - r * a - n * l - i * c, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(e);
    const r = this._x, n = this._y, i = this._z, o = this._w;
    let a = o * e._w + r * e._x + n * e._y + i * e._z;
    if (a < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, a = -a) : this.copy(e), a >= 1)
      return this._w = o, this._x = r, this._y = n, this._z = i, this;
    const l = 1 - a * a;
    if (l <= Number.EPSILON) {
      const d = 1 - t;
      return this._w = d * o + t * this._w, this._x = d * r + t * this._x, this._y = d * n + t * this._y, this._z = d * i + t * this._z, this.normalize(), this;
    }
    const c = Math.sqrt(l), u = Math.atan2(c, a), f = Math.sin((1 - t) * u) / c, h = Math.sin(t * u) / c;
    return this._w = o * f + this._w * h, this._x = r * f + this._x * h, this._y = n * f + this._y * h, this._z = i * f + this._z * h, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, t, r) {
    return this.copy(e).slerp(t, r);
  }
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), r = Math.random(), n = Math.sqrt(1 - r), i = Math.sqrt(r);
    return this.set(
      n * Math.sin(e),
      n * Math.cos(e),
      i * Math.sin(t),
      i * Math.cos(t)
    );
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class ne {
  constructor(e = 0, t = 0, r = 0) {
    ne.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = r;
  }
  set(e, t, r) {
    return r === void 0 && (r = this.z), this.x = e, this.y = t, this.z = r, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(Ma.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(Ma.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x, r = this.y, n = this.z, i = e.elements;
    return this.x = i[0] * t + i[3] * r + i[6] * n, this.y = i[1] * t + i[4] * r + i[7] * n, this.z = i[2] * t + i[5] * r + i[8] * n, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x, r = this.y, n = this.z, i = e.elements, o = 1 / (i[3] * t + i[7] * r + i[11] * n + i[15]);
    return this.x = (i[0] * t + i[4] * r + i[8] * n + i[12]) * o, this.y = (i[1] * t + i[5] * r + i[9] * n + i[13]) * o, this.z = (i[2] * t + i[6] * r + i[10] * n + i[14]) * o, this;
  }
  applyQuaternion(e) {
    const t = this.x, r = this.y, n = this.z, i = e.x, o = e.y, a = e.z, l = e.w, c = 2 * (o * n - a * r), u = 2 * (a * t - i * n), f = 2 * (i * r - o * t);
    return this.x = t + l * c + o * f - a * u, this.y = r + l * u + a * c - i * f, this.z = n + l * f + i * u - o * c, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const t = this.x, r = this.y, n = this.z, i = e.elements;
    return this.x = i[0] * t + i[4] * r + i[8] * n, this.y = i[1] * t + i[5] * r + i[9] * n, this.z = i[2] * t + i[6] * r + i[10] * n, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this;
  }
  clampLength(e, t) {
    const r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Math.max(e, Math.min(t, r)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  lerpVectors(e, t, r) {
    return this.x = e.x + (t.x - e.x) * r, this.y = e.y + (t.y - e.y) * r, this.z = e.z + (t.z - e.z) * r, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const r = e.x, n = e.y, i = e.z, o = t.x, a = t.y, l = t.z;
    return this.x = n * l - i * a, this.y = i * o - r * l, this.z = r * a - n * o, this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const r = e.dot(this) / t;
    return this.copy(e).multiplyScalar(r);
  }
  projectOnPlane(e) {
    return ms.copy(this).projectOnVector(e), this.sub(ms);
  }
  reflect(e) {
    return this.sub(ms.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const r = this.dot(e) / t;
    return Math.acos(zt(r, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, r = this.y - e.y, n = this.z - e.z;
    return t * t + r * r + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, r) {
    const n = Math.sin(t) * e;
    return this.x = n * Math.sin(r), this.y = Math.cos(t) * e, this.z = n * Math.cos(r), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, r) {
    return this.x = e * Math.sin(t), this.y = r, this.z = e * Math.cos(t), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), r = this.setFromMatrixColumn(e, 1).length(), n = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = r, this.z = n, this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, r = Math.sqrt(1 - t * t);
    return this.x = r * Math.cos(e), this.y = t, this.z = r * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const ms = /* @__PURE__ */ new ne(), Ma = /* @__PURE__ */ new tr();
class yn {
  constructor(e = new ne(1 / 0, 1 / 0, 1 / 0), t = new ne(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, r = e.length; t < r; t += 3)
      this.expandByPoint(nn.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, r = e.count; t < r; t++)
      this.expandByPoint(nn.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, r = e.length; t < r; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const r = nn.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(r), this.max.copy(e).add(r), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const r = e.geometry;
    if (r !== void 0) {
      const i = r.getAttribute("position");
      if (t === !0 && i !== void 0 && e.isInstancedMesh !== !0)
        for (let o = 0, a = i.count; o < a; o++)
          e.isMesh === !0 ? e.getVertexPosition(o, nn) : nn.fromBufferAttribute(i, o), nn.applyMatrix4(e.matrixWorld), this.expandByPoint(nn);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), pr.copy(e.boundingBox)) : (r.boundingBox === null && r.computeBoundingBox(), pr.copy(r.boundingBox)), pr.applyMatrix4(e.matrixWorld), this.union(pr);
    }
    const n = e.children;
    for (let i = 0, o = n.length; i < o; i++)
      this.expandByObject(n[i], t);
    return this;
  }
  containsPoint(e) {
    return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z);
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(e) {
    return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z);
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, nn), nn.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, r;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, r = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, r = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, r += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, r += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, r += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, r += e.normal.z * this.min.z), t <= -e.constant && r >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(ki), mr.subVectors(this.max, ki), ni.subVectors(e.a, ki), ii.subVectors(e.b, ki), ri.subVectors(e.c, ki), Tn.subVectors(ii, ni), En.subVectors(ri, ii), Nn.subVectors(ni, ri);
    let t = [
      0,
      -Tn.z,
      Tn.y,
      0,
      -En.z,
      En.y,
      0,
      -Nn.z,
      Nn.y,
      Tn.z,
      0,
      -Tn.x,
      En.z,
      0,
      -En.x,
      Nn.z,
      0,
      -Nn.x,
      -Tn.y,
      Tn.x,
      0,
      -En.y,
      En.x,
      0,
      -Nn.y,
      Nn.x,
      0
    ];
    return !_s(t, ni, ii, ri, mr) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !_s(t, ni, ii, ri, mr)) ? !1 : (_r.crossVectors(Tn, En), t = [_r.x, _r.y, _r.z], _s(t, ni, ii, ri, mr));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, nn).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(nn).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (pn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), pn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), pn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), pn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), pn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), pn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), pn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), pn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(pn), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const pn = [
  /* @__PURE__ */ new ne(),
  /* @__PURE__ */ new ne(),
  /* @__PURE__ */ new ne(),
  /* @__PURE__ */ new ne(),
  /* @__PURE__ */ new ne(),
  /* @__PURE__ */ new ne(),
  /* @__PURE__ */ new ne(),
  /* @__PURE__ */ new ne()
], nn = /* @__PURE__ */ new ne(), pr = /* @__PURE__ */ new yn(), ni = /* @__PURE__ */ new ne(), ii = /* @__PURE__ */ new ne(), ri = /* @__PURE__ */ new ne(), Tn = /* @__PURE__ */ new ne(), En = /* @__PURE__ */ new ne(), Nn = /* @__PURE__ */ new ne(), ki = /* @__PURE__ */ new ne(), mr = /* @__PURE__ */ new ne(), _r = /* @__PURE__ */ new ne(), On = /* @__PURE__ */ new ne();
function _s(s, e, t, r, n) {
  for (let i = 0, o = s.length - 3; i <= o; i += 3) {
    On.fromArray(s, i);
    const a = n.x * Math.abs(On.x) + n.y * Math.abs(On.y) + n.z * Math.abs(On.z), l = e.dot(On), c = t.dot(On), u = r.dot(On);
    if (Math.max(-Math.max(l, c, u), Math.min(l, c, u)) > a)
      return !1;
  }
  return !0;
}
const Al = /* @__PURE__ */ new yn(), Hi = /* @__PURE__ */ new ne(), vs = /* @__PURE__ */ new ne();
class Qn {
  constructor(e = new ne(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const r = this.center;
    t !== void 0 ? r.copy(t) : Al.setFromPoints(e).getCenter(r);
    let n = 0;
    for (let i = 0, o = e.length; i < o; i++)
      n = Math.max(n, r.distanceToSquared(e[i]));
    return this.radius = Math.sqrt(n), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const r = this.center.distanceToSquared(e);
    return t.copy(e), r > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    Hi.subVectors(e, this.center);
    const t = Hi.lengthSq();
    if (t > this.radius * this.radius) {
      const r = Math.sqrt(t), n = (r - this.radius) * 0.5;
      this.center.addScaledVector(Hi, n / r), this.radius += n;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (vs.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Hi.copy(e.center).add(vs)), this.expandByPoint(Hi.copy(e.center).sub(vs))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const mn = /* @__PURE__ */ new ne(), gs = /* @__PURE__ */ new ne(), vr = /* @__PURE__ */ new ne(), wn = /* @__PURE__ */ new ne(), xs = /* @__PURE__ */ new ne(), gr = /* @__PURE__ */ new ne(), ys = /* @__PURE__ */ new ne();
class zo {
  constructor(e = new ne(), t = new ne(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, mn)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const r = t.dot(this.direction);
    return r < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, r);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = mn.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (mn.copy(this.origin).addScaledVector(this.direction, t), mn.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, r, n) {
    gs.copy(e).add(t).multiplyScalar(0.5), vr.copy(t).sub(e).normalize(), wn.copy(this.origin).sub(gs);
    const i = e.distanceTo(t) * 0.5, o = -this.direction.dot(vr), a = wn.dot(this.direction), l = -wn.dot(vr), c = wn.lengthSq(), u = Math.abs(1 - o * o);
    let f, h, d, _;
    if (u > 0)
      if (f = o * l - a, h = o * a - l, _ = i * u, f >= 0)
        if (h >= -_)
          if (h <= _) {
            const v = 1 / u;
            f *= v, h *= v, d = f * (f + o * h + 2 * a) + h * (o * f + h + 2 * l) + c;
          } else
            h = i, f = Math.max(0, -(o * h + a)), d = -f * f + h * (h + 2 * l) + c;
        else
          h = -i, f = Math.max(0, -(o * h + a)), d = -f * f + h * (h + 2 * l) + c;
      else
        h <= -_ ? (f = Math.max(0, -(-o * i + a)), h = f > 0 ? -i : Math.min(Math.max(-i, -l), i), d = -f * f + h * (h + 2 * l) + c) : h <= _ ? (f = 0, h = Math.min(Math.max(-i, -l), i), d = h * (h + 2 * l) + c) : (f = Math.max(0, -(o * i + a)), h = f > 0 ? i : Math.min(Math.max(-i, -l), i), d = -f * f + h * (h + 2 * l) + c);
    else
      h = o > 0 ? -i : i, f = Math.max(0, -(o * h + a)), d = -f * f + h * (h + 2 * l) + c;
    return r && r.copy(this.origin).addScaledVector(this.direction, f), n && n.copy(gs).addScaledVector(vr, h), d;
  }
  intersectSphere(e, t) {
    mn.subVectors(e.center, this.origin);
    const r = mn.dot(this.direction), n = mn.dot(mn) - r * r, i = e.radius * e.radius;
    if (n > i) return null;
    const o = Math.sqrt(i - n), a = r - o, l = r + o;
    return l < 0 ? null : a < 0 ? this.at(l, t) : this.at(a, t);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const r = -(this.origin.dot(e.normal) + e.constant) / t;
    return r >= 0 ? r : null;
  }
  intersectPlane(e, t) {
    const r = this.distanceToPlane(e);
    return r === null ? null : this.at(r, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let r, n, i, o, a, l;
    const c = 1 / this.direction.x, u = 1 / this.direction.y, f = 1 / this.direction.z, h = this.origin;
    return c >= 0 ? (r = (e.min.x - h.x) * c, n = (e.max.x - h.x) * c) : (r = (e.max.x - h.x) * c, n = (e.min.x - h.x) * c), u >= 0 ? (i = (e.min.y - h.y) * u, o = (e.max.y - h.y) * u) : (i = (e.max.y - h.y) * u, o = (e.min.y - h.y) * u), r > o || i > n || ((i > r || isNaN(r)) && (r = i), (o < n || isNaN(n)) && (n = o), f >= 0 ? (a = (e.min.z - h.z) * f, l = (e.max.z - h.z) * f) : (a = (e.max.z - h.z) * f, l = (e.min.z - h.z) * f), r > l || a > n) || ((a > r || r !== r) && (r = a), (l < n || n !== n) && (n = l), n < 0) ? null : this.at(r >= 0 ? r : n, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, mn) !== null;
  }
  intersectTriangle(e, t, r, n, i) {
    xs.subVectors(t, e), gr.subVectors(r, e), ys.crossVectors(xs, gr);
    let o = this.direction.dot(ys), a;
    if (o > 0) {
      if (n) return null;
      a = 1;
    } else if (o < 0)
      a = -1, o = -o;
    else
      return null;
    wn.subVectors(this.origin, e);
    const l = a * this.direction.dot(gr.crossVectors(wn, gr));
    if (l < 0)
      return null;
    const c = a * this.direction.dot(xs.cross(wn));
    if (c < 0 || l + c > o)
      return null;
    const u = -a * wn.dot(ys);
    return u < 0 ? null : this.at(u / o, i);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class ft {
  constructor(e, t, r, n, i, o, a, l, c, u, f, h, d, _, v, p) {
    ft.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, r, n, i, o, a, l, c, u, f, h, d, _, v, p);
  }
  set(e, t, r, n, i, o, a, l, c, u, f, h, d, _, v, p) {
    const m = this.elements;
    return m[0] = e, m[4] = t, m[8] = r, m[12] = n, m[1] = i, m[5] = o, m[9] = a, m[13] = l, m[2] = c, m[6] = u, m[10] = f, m[14] = h, m[3] = d, m[7] = _, m[11] = v, m[15] = p, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new ft().fromArray(this.elements);
  }
  copy(e) {
    const t = this.elements, r = e.elements;
    return t[0] = r[0], t[1] = r[1], t[2] = r[2], t[3] = r[3], t[4] = r[4], t[5] = r[5], t[6] = r[6], t[7] = r[7], t[8] = r[8], t[9] = r[9], t[10] = r[10], t[11] = r[11], t[12] = r[12], t[13] = r[13], t[14] = r[14], t[15] = r[15], this;
  }
  copyPosition(e) {
    const t = this.elements, r = e.elements;
    return t[12] = r[12], t[13] = r[13], t[14] = r[14], this;
  }
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(e, t, r) {
    return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), r.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(e, t, r) {
    return this.set(
      e.x,
      t.x,
      r.x,
      0,
      e.y,
      t.y,
      r.y,
      0,
      e.z,
      t.z,
      r.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(e) {
    const t = this.elements, r = e.elements, n = 1 / si.setFromMatrixColumn(e, 0).length(), i = 1 / si.setFromMatrixColumn(e, 1).length(), o = 1 / si.setFromMatrixColumn(e, 2).length();
    return t[0] = r[0] * n, t[1] = r[1] * n, t[2] = r[2] * n, t[3] = 0, t[4] = r[4] * i, t[5] = r[5] * i, t[6] = r[6] * i, t[7] = 0, t[8] = r[8] * o, t[9] = r[9] * o, t[10] = r[10] * o, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const t = this.elements, r = e.x, n = e.y, i = e.z, o = Math.cos(r), a = Math.sin(r), l = Math.cos(n), c = Math.sin(n), u = Math.cos(i), f = Math.sin(i);
    if (e.order === "XYZ") {
      const h = o * u, d = o * f, _ = a * u, v = a * f;
      t[0] = l * u, t[4] = -l * f, t[8] = c, t[1] = d + _ * c, t[5] = h - v * c, t[9] = -a * l, t[2] = v - h * c, t[6] = _ + d * c, t[10] = o * l;
    } else if (e.order === "YXZ") {
      const h = l * u, d = l * f, _ = c * u, v = c * f;
      t[0] = h + v * a, t[4] = _ * a - d, t[8] = o * c, t[1] = o * f, t[5] = o * u, t[9] = -a, t[2] = d * a - _, t[6] = v + h * a, t[10] = o * l;
    } else if (e.order === "ZXY") {
      const h = l * u, d = l * f, _ = c * u, v = c * f;
      t[0] = h - v * a, t[4] = -o * f, t[8] = _ + d * a, t[1] = d + _ * a, t[5] = o * u, t[9] = v - h * a, t[2] = -o * c, t[6] = a, t[10] = o * l;
    } else if (e.order === "ZYX") {
      const h = o * u, d = o * f, _ = a * u, v = a * f;
      t[0] = l * u, t[4] = _ * c - d, t[8] = h * c + v, t[1] = l * f, t[5] = v * c + h, t[9] = d * c - _, t[2] = -c, t[6] = a * l, t[10] = o * l;
    } else if (e.order === "YZX") {
      const h = o * l, d = o * c, _ = a * l, v = a * c;
      t[0] = l * u, t[4] = v - h * f, t[8] = _ * f + d, t[1] = f, t[5] = o * u, t[9] = -a * u, t[2] = -c * u, t[6] = d * f + _, t[10] = h - v * f;
    } else if (e.order === "XZY") {
      const h = o * l, d = o * c, _ = a * l, v = a * c;
      t[0] = l * u, t[4] = -f, t[8] = c * u, t[1] = h * f + v, t[5] = o * u, t[9] = d * f - _, t[2] = _ * f - d, t[6] = a * u, t[10] = v * f + h;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(Cl, e, Rl);
  }
  lookAt(e, t, r) {
    const n = this.elements;
    return Ht.subVectors(e, t), Ht.lengthSq() === 0 && (Ht.z = 1), Ht.normalize(), An.crossVectors(r, Ht), An.lengthSq() === 0 && (Math.abs(r.z) === 1 ? Ht.x += 1e-4 : Ht.z += 1e-4, Ht.normalize(), An.crossVectors(r, Ht)), An.normalize(), xr.crossVectors(Ht, An), n[0] = An.x, n[4] = xr.x, n[8] = Ht.x, n[1] = An.y, n[5] = xr.y, n[9] = Ht.y, n[2] = An.z, n[6] = xr.z, n[10] = Ht.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const r = e.elements, n = t.elements, i = this.elements, o = r[0], a = r[4], l = r[8], c = r[12], u = r[1], f = r[5], h = r[9], d = r[13], _ = r[2], v = r[6], p = r[10], m = r[14], y = r[3], g = r[7], A = r[11], w = r[15], T = n[0], S = n[4], C = n[8], z = n[12], x = n[1], R = n[5], L = n[9], k = n[13], P = n[2], W = n[6], O = n[10], Y = n[14], b = n[3], G = n[7], X = n[11], U = n[15];
    return i[0] = o * T + a * x + l * P + c * b, i[4] = o * S + a * R + l * W + c * G, i[8] = o * C + a * L + l * O + c * X, i[12] = o * z + a * k + l * Y + c * U, i[1] = u * T + f * x + h * P + d * b, i[5] = u * S + f * R + h * W + d * G, i[9] = u * C + f * L + h * O + d * X, i[13] = u * z + f * k + h * Y + d * U, i[2] = _ * T + v * x + p * P + m * b, i[6] = _ * S + v * R + p * W + m * G, i[10] = _ * C + v * L + p * O + m * X, i[14] = _ * z + v * k + p * Y + m * U, i[3] = y * T + g * x + A * P + w * b, i[7] = y * S + g * R + A * W + w * G, i[11] = y * C + g * L + A * O + w * X, i[15] = y * z + g * k + A * Y + w * U, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], r = e[4], n = e[8], i = e[12], o = e[1], a = e[5], l = e[9], c = e[13], u = e[2], f = e[6], h = e[10], d = e[14], _ = e[3], v = e[7], p = e[11], m = e[15];
    return _ * (+i * l * f - n * c * f - i * a * h + r * c * h + n * a * d - r * l * d) + v * (+t * l * d - t * c * h + i * o * h - n * o * d + n * c * u - i * l * u) + p * (+t * c * f - t * a * d - i * o * f + r * o * d + i * a * u - r * c * u) + m * (-n * a * u - t * l * f + t * a * h + n * o * f - r * o * h + r * l * u);
  }
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  setPosition(e, t, r) {
    const n = this.elements;
    return e.isVector3 ? (n[12] = e.x, n[13] = e.y, n[14] = e.z) : (n[12] = e, n[13] = t, n[14] = r), this;
  }
  invert() {
    const e = this.elements, t = e[0], r = e[1], n = e[2], i = e[3], o = e[4], a = e[5], l = e[6], c = e[7], u = e[8], f = e[9], h = e[10], d = e[11], _ = e[12], v = e[13], p = e[14], m = e[15], y = f * p * c - v * h * c + v * l * d - a * p * d - f * l * m + a * h * m, g = _ * h * c - u * p * c - _ * l * d + o * p * d + u * l * m - o * h * m, A = u * v * c - _ * f * c + _ * a * d - o * v * d - u * a * m + o * f * m, w = _ * f * l - u * v * l - _ * a * h + o * v * h + u * a * p - o * f * p, T = t * y + r * g + n * A + i * w;
    if (T === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const S = 1 / T;
    return e[0] = y * S, e[1] = (v * h * i - f * p * i - v * n * d + r * p * d + f * n * m - r * h * m) * S, e[2] = (a * p * i - v * l * i + v * n * c - r * p * c - a * n * m + r * l * m) * S, e[3] = (f * l * i - a * h * i - f * n * c + r * h * c + a * n * d - r * l * d) * S, e[4] = g * S, e[5] = (u * p * i - _ * h * i + _ * n * d - t * p * d - u * n * m + t * h * m) * S, e[6] = (_ * l * i - o * p * i - _ * n * c + t * p * c + o * n * m - t * l * m) * S, e[7] = (o * h * i - u * l * i + u * n * c - t * h * c - o * n * d + t * l * d) * S, e[8] = A * S, e[9] = (_ * f * i - u * v * i - _ * r * d + t * v * d + u * r * m - t * f * m) * S, e[10] = (o * v * i - _ * a * i + _ * r * c - t * v * c - o * r * m + t * a * m) * S, e[11] = (u * a * i - o * f * i - u * r * c + t * f * c + o * r * d - t * a * d) * S, e[12] = w * S, e[13] = (u * v * n - _ * f * n + _ * r * h - t * v * h - u * r * p + t * f * p) * S, e[14] = (_ * a * n - o * v * n - _ * r * l + t * v * l + o * r * p - t * a * p) * S, e[15] = (o * f * n - u * a * n + u * r * l - t * f * l - o * r * h + t * a * h) * S, this;
  }
  scale(e) {
    const t = this.elements, r = e.x, n = e.y, i = e.z;
    return t[0] *= r, t[4] *= n, t[8] *= i, t[1] *= r, t[5] *= n, t[9] *= i, t[2] *= r, t[6] *= n, t[10] *= i, t[3] *= r, t[7] *= n, t[11] *= i, this;
  }
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], r = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], n = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, r, n));
  }
  makeTranslation(e, t, r) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
      0,
      0,
      1,
      r,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(e) {
    const t = Math.cos(e), r = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -r,
      0,
      0,
      r,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(e) {
    const t = Math.cos(e), r = Math.sin(e);
    return this.set(
      t,
      0,
      r,
      0,
      0,
      1,
      0,
      0,
      -r,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(e) {
    const t = Math.cos(e), r = Math.sin(e);
    return this.set(
      t,
      -r,
      0,
      0,
      r,
      t,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(e, t) {
    const r = Math.cos(t), n = Math.sin(t), i = 1 - r, o = e.x, a = e.y, l = e.z, c = i * o, u = i * a;
    return this.set(
      c * o + r,
      c * a - n * l,
      c * l + n * a,
      0,
      c * a + n * l,
      u * a + r,
      u * l - n * o,
      0,
      c * l - n * a,
      u * l + n * o,
      i * l * l + r,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t, r) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      r,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(e, t, r, n, i, o) {
    return this.set(
      1,
      r,
      i,
      0,
      e,
      1,
      o,
      0,
      t,
      n,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(e, t, r) {
    const n = this.elements, i = t._x, o = t._y, a = t._z, l = t._w, c = i + i, u = o + o, f = a + a, h = i * c, d = i * u, _ = i * f, v = o * u, p = o * f, m = a * f, y = l * c, g = l * u, A = l * f, w = r.x, T = r.y, S = r.z;
    return n[0] = (1 - (v + m)) * w, n[1] = (d + A) * w, n[2] = (_ - g) * w, n[3] = 0, n[4] = (d - A) * T, n[5] = (1 - (h + m)) * T, n[6] = (p + y) * T, n[7] = 0, n[8] = (_ + g) * S, n[9] = (p - y) * S, n[10] = (1 - (h + v)) * S, n[11] = 0, n[12] = e.x, n[13] = e.y, n[14] = e.z, n[15] = 1, this;
  }
  decompose(e, t, r) {
    const n = this.elements;
    let i = si.set(n[0], n[1], n[2]).length();
    const o = si.set(n[4], n[5], n[6]).length(), a = si.set(n[8], n[9], n[10]).length();
    this.determinant() < 0 && (i = -i), e.x = n[12], e.y = n[13], e.z = n[14], rn.copy(this);
    const c = 1 / i, u = 1 / o, f = 1 / a;
    return rn.elements[0] *= c, rn.elements[1] *= c, rn.elements[2] *= c, rn.elements[4] *= u, rn.elements[5] *= u, rn.elements[6] *= u, rn.elements[8] *= f, rn.elements[9] *= f, rn.elements[10] *= f, t.setFromRotationMatrix(rn), r.x = i, r.y = o, r.z = a, this;
  }
  makePerspective(e, t, r, n, i, o, a = 2e3) {
    const l = this.elements, c = 2 * i / (t - e), u = 2 * i / (r - n), f = (t + e) / (t - e), h = (r + n) / (r - n);
    let d, _;
    if (a === 2e3)
      d = -(o + i) / (o - i), _ = -2 * o * i / (o - i);
    else if (a === 2001)
      d = -o / (o - i), _ = -o * i / (o - i);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return l[0] = c, l[4] = 0, l[8] = f, l[12] = 0, l[1] = 0, l[5] = u, l[9] = h, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = d, l[14] = _, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(e, t, r, n, i, o, a = 2e3) {
    const l = this.elements, c = 1 / (t - e), u = 1 / (r - n), f = 1 / (o - i), h = (t + e) * c, d = (r + n) * u;
    let _, v;
    if (a === 2e3)
      _ = (o + i) * f, v = -2 * f;
    else if (a === 2001)
      _ = i * f, v = -1 * f;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
    return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -h, l[1] = 0, l[5] = 2 * u, l[9] = 0, l[13] = -d, l[2] = 0, l[6] = 0, l[10] = v, l[14] = -_, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  equals(e) {
    const t = this.elements, r = e.elements;
    for (let n = 0; n < 16; n++)
      if (t[n] !== r[n]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let r = 0; r < 16; r++)
      this.elements[r] = e[r + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const r = this.elements;
    return e[t] = r[0], e[t + 1] = r[1], e[t + 2] = r[2], e[t + 3] = r[3], e[t + 4] = r[4], e[t + 5] = r[5], e[t + 6] = r[6], e[t + 7] = r[7], e[t + 8] = r[8], e[t + 9] = r[9], e[t + 10] = r[10], e[t + 11] = r[11], e[t + 12] = r[12], e[t + 13] = r[13], e[t + 14] = r[14], e[t + 15] = r[15], e;
  }
}
const si = /* @__PURE__ */ new ne(), rn = /* @__PURE__ */ new ft(), Cl = /* @__PURE__ */ new ne(0, 0, 0), Rl = /* @__PURE__ */ new ne(1, 1, 1), An = /* @__PURE__ */ new ne(), xr = /* @__PURE__ */ new ne(), Ht = /* @__PURE__ */ new ne(), Ta = /* @__PURE__ */ new ft(), Ea = /* @__PURE__ */ new tr();
class xn {
  constructor(e = 0, t = 0, r = 0, n = xn.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = r, this._order = n;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  set(e, t, r, n = this._order) {
    return this._x = e, this._y = t, this._z = r, this._order = n, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, t = this._order, r = !0) {
    const n = e.elements, i = n[0], o = n[4], a = n[8], l = n[1], c = n[5], u = n[9], f = n[2], h = n[6], d = n[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(zt(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-u, d), this._z = Math.atan2(-o, i)) : (this._x = Math.atan2(h, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-zt(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(a, d), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-f, i), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(zt(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(-f, d), this._z = Math.atan2(-o, c)) : (this._y = 0, this._z = Math.atan2(l, i));
        break;
      case "ZYX":
        this._y = Math.asin(-zt(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._x = Math.atan2(h, d), this._z = Math.atan2(l, i)) : (this._x = 0, this._z = Math.atan2(-o, c));
        break;
      case "YZX":
        this._z = Math.asin(zt(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-u, c), this._y = Math.atan2(-f, i)) : (this._x = 0, this._y = Math.atan2(a, d));
        break;
      case "XZY":
        this._z = Math.asin(-zt(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(h, c), this._y = Math.atan2(a, i)) : (this._x = Math.atan2(-u, d), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, r === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, r) {
    return Ta.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Ta, t, r);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return Ea.setFromEuler(this), this.setFromQuaternion(Ea, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
xn.DEFAULT_ORDER = "XYZ";
class Go {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let Pl = 0;
const wa = /* @__PURE__ */ new ne(), ai = /* @__PURE__ */ new tr(), _n = /* @__PURE__ */ new ft(), yr = /* @__PURE__ */ new ne(), Vi = /* @__PURE__ */ new ne(), Dl = /* @__PURE__ */ new ne(), Ul = /* @__PURE__ */ new tr(), Aa = /* @__PURE__ */ new ne(1, 0, 0), Ca = /* @__PURE__ */ new ne(0, 1, 0), Ra = /* @__PURE__ */ new ne(0, 0, 1), Ll = { type: "added" }, Fl = { type: "removed" }, bs = { type: "childadded", child: null }, Ss = { type: "childremoved", child: null };
class Pt extends Ai {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Pl++ }), this.uuid = er(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Pt.DEFAULT_UP.clone();
    const e = new ne(), t = new xn(), r = new tr(), n = new ne(1, 1, 1);
    function i() {
      r.setFromEuler(t, !1);
    }
    function o() {
      t.setFromQuaternion(r, void 0, !1);
    }
    t._onChange(i), r._onChange(o), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      modelViewMatrix: {
        value: new ft()
      },
      normalMatrix: {
        value: new $e()
      }
    }), this.matrix = new ft(), this.matrixWorld = new ft(), this.matrixAutoUpdate = Pt.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Go(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return ai.setFromAxisAngle(e, t), this.quaternion.multiply(ai), this;
  }
  rotateOnWorldAxis(e, t) {
    return ai.setFromAxisAngle(e, t), this.quaternion.premultiply(ai), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(Aa, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(Ca, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(Ra, e);
  }
  translateOnAxis(e, t) {
    return wa.copy(e).applyQuaternion(this.quaternion), this.position.add(wa.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(Aa, e);
  }
  translateY(e) {
    return this.translateOnAxis(Ca, e);
  }
  translateZ(e) {
    return this.translateOnAxis(Ra, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(_n.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, r) {
    e.isVector3 ? yr.copy(e) : yr.set(e, t, r);
    const n = this.parent;
    this.updateWorldMatrix(!0, !1), Vi.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? _n.lookAt(Vi, yr, this.up) : _n.lookAt(yr, Vi, this.up), this.quaternion.setFromRotationMatrix(_n), n && (_n.extractRotation(n.matrixWorld), ai.setFromRotationMatrix(_n), this.quaternion.premultiply(ai.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.parent !== null && e.parent.remove(e), e.parent = this, this.children.push(e), e.dispatchEvent(Ll), bs.child = e, this.dispatchEvent(bs), bs.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let r = 0; r < arguments.length; r++)
        this.remove(arguments[r]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Fl), Ss.child = e, this.dispatchEvent(Ss), Ss.child = null), this;
  }
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), _n.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), _n.multiply(e.parent.matrixWorld)), e.applyMatrix4(_n), this.add(e), e.updateWorldMatrix(!1, !0), this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let r = 0, n = this.children.length; r < n; r++) {
      const o = this.children[r].getObjectByProperty(e, t);
      if (o !== void 0)
        return o;
    }
  }
  getObjectsByProperty(e, t, r = []) {
    this[e] === t && r.push(this);
    const n = this.children;
    for (let i = 0, o = n.length; i < o; i++)
      n[i].getObjectsByProperty(e, t, r);
    return r;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Vi, e, Dl), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Vi, Ul, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {
  }
  traverse(e) {
    e(this);
    const t = this.children;
    for (let r = 0, n = t.length; r < n; r++)
      t[r].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let r = 0, n = t.length; r < n; r++)
      t[r].traverseVisible(e);
  }
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let r = 0, n = t.length; r < n; r++) {
      const i = t[r];
      (i.matrixWorldAutoUpdate === !0 || e === !0) && i.updateMatrixWorld(e);
    }
  }
  updateWorldMatrix(e, t) {
    const r = this.parent;
    if (e === !0 && r !== null && r.matrixWorldAutoUpdate === !0 && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), t === !0) {
      const n = this.children;
      for (let i = 0, o = n.length; i < o; i++) {
        const a = n[i];
        a.matrixWorldAutoUpdate === !0 && a.updateWorldMatrix(!1, !0);
      }
    }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", r = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, r.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const n = {};
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.castShadow === !0 && (n.castShadow = !0), this.receiveShadow === !0 && (n.receiveShadow = !0), this.visible === !1 && (n.visible = !1), this.frustumCulled === !1 && (n.frustumCulled = !1), this.renderOrder !== 0 && (n.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (n.userData = this.userData), n.layers = this.layers.mask, n.matrix = this.matrix.toArray(), n.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (n.matrixAutoUpdate = !1), this.isInstancedMesh && (n.type = "InstancedMesh", n.count = this.count, n.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (n.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (n.type = "BatchedMesh", n.perObjectFrustumCulled = this.perObjectFrustumCulled, n.sortObjects = this.sortObjects, n.drawRanges = this._drawRanges, n.reservedRanges = this._reservedRanges, n.visibility = this._visibility, n.active = this._active, n.bounds = this._bounds.map((a) => ({
      boxInitialized: a.boxInitialized,
      boxMin: a.box.min.toArray(),
      boxMax: a.box.max.toArray(),
      sphereInitialized: a.sphereInitialized,
      sphereRadius: a.sphere.radius,
      sphereCenter: a.sphere.center.toArray()
    })), n.maxGeometryCount = this._maxGeometryCount, n.maxVertexCount = this._maxVertexCount, n.maxIndexCount = this._maxIndexCount, n.geometryInitialized = this._geometryInitialized, n.geometryCount = this._geometryCount, n.matricesTexture = this._matricesTexture.toJSON(e), this.boundingSphere !== null && (n.boundingSphere = {
      center: n.boundingSphere.center.toArray(),
      radius: n.boundingSphere.radius
    }), this.boundingBox !== null && (n.boundingBox = {
      min: n.boundingBox.min.toArray(),
      max: n.boundingBox.max.toArray()
    }));
    function i(a, l) {
      return a[l.uuid] === void 0 && (a[l.uuid] = l.toJSON(e)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? n.background = this.background.toJSON() : this.background.isTexture && (n.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (n.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      n.geometry = i(e.geometries, this.geometry);
      const a = this.geometry.parameters;
      if (a !== void 0 && a.shapes !== void 0) {
        const l = a.shapes;
        if (Array.isArray(l))
          for (let c = 0, u = l.length; c < u; c++) {
            const f = l[c];
            i(e.shapes, f);
          }
        else
          i(e.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (n.bindMode = this.bindMode, n.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (i(e.skeletons, this.skeleton), n.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const a = [];
        for (let l = 0, c = this.material.length; l < c; l++)
          a.push(i(e.materials, this.material[l]));
        n.material = a;
      } else
        n.material = i(e.materials, this.material);
    if (this.children.length > 0) {
      n.children = [];
      for (let a = 0; a < this.children.length; a++)
        n.children.push(this.children[a].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      n.animations = [];
      for (let a = 0; a < this.animations.length; a++) {
        const l = this.animations[a];
        n.animations.push(i(e.animations, l));
      }
    }
    if (t) {
      const a = o(e.geometries), l = o(e.materials), c = o(e.textures), u = o(e.images), f = o(e.shapes), h = o(e.skeletons), d = o(e.animations), _ = o(e.nodes);
      a.length > 0 && (r.geometries = a), l.length > 0 && (r.materials = l), c.length > 0 && (r.textures = c), u.length > 0 && (r.images = u), f.length > 0 && (r.shapes = f), h.length > 0 && (r.skeletons = h), d.length > 0 && (r.animations = d), _.length > 0 && (r.nodes = _);
    }
    return r.object = n, r;
    function o(a) {
      const l = [];
      for (const c in a) {
        const u = a[c];
        delete u.metadata, l.push(u);
      }
      return l;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let r = 0; r < e.children.length; r++) {
        const n = e.children[r];
        this.add(n.clone());
      }
    return this;
  }
}
Pt.DEFAULT_UP = /* @__PURE__ */ new ne(0, 1, 0);
Pt.DEFAULT_MATRIX_AUTO_UPDATE = !0;
Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const sn = /* @__PURE__ */ new ne(), vn = /* @__PURE__ */ new ne(), Ms = /* @__PURE__ */ new ne(), gn = /* @__PURE__ */ new ne(), oi = /* @__PURE__ */ new ne(), li = /* @__PURE__ */ new ne(), Pa = /* @__PURE__ */ new ne(), Ts = /* @__PURE__ */ new ne(), Es = /* @__PURE__ */ new ne(), ws = /* @__PURE__ */ new ne();
class dn {
  constructor(e = new ne(), t = new ne(), r = new ne()) {
    this.a = e, this.b = t, this.c = r;
  }
  static getNormal(e, t, r, n) {
    n.subVectors(r, t), sn.subVectors(e, t), n.cross(sn);
    const i = n.lengthSq();
    return i > 0 ? n.multiplyScalar(1 / Math.sqrt(i)) : n.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(e, t, r, n, i) {
    sn.subVectors(n, t), vn.subVectors(r, t), Ms.subVectors(e, t);
    const o = sn.dot(sn), a = sn.dot(vn), l = sn.dot(Ms), c = vn.dot(vn), u = vn.dot(Ms), f = o * c - a * a;
    if (f === 0)
      return i.set(0, 0, 0), null;
    const h = 1 / f, d = (c * l - a * u) * h, _ = (o * u - a * l) * h;
    return i.set(1 - d - _, _, d);
  }
  static containsPoint(e, t, r, n) {
    return this.getBarycoord(e, t, r, n, gn) === null ? !1 : gn.x >= 0 && gn.y >= 0 && gn.x + gn.y <= 1;
  }
  static getInterpolation(e, t, r, n, i, o, a, l) {
    return this.getBarycoord(e, t, r, n, gn) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(i, gn.x), l.addScaledVector(o, gn.y), l.addScaledVector(a, gn.z), l);
  }
  static isFrontFacing(e, t, r, n) {
    return sn.subVectors(r, t), vn.subVectors(e, t), sn.cross(vn).dot(n) < 0;
  }
  set(e, t, r) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(r), this;
  }
  setFromPointsAndIndices(e, t, r, n) {
    return this.a.copy(e[t]), this.b.copy(e[r]), this.c.copy(e[n]), this;
  }
  setFromAttributeAndIndices(e, t, r, n) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, r), this.c.fromBufferAttribute(e, n), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return sn.subVectors(this.c, this.b), vn.subVectors(this.a, this.b), sn.cross(vn).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return dn.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return dn.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getInterpolation(e, t, r, n, i) {
    return dn.getInterpolation(e, this.a, this.b, this.c, t, r, n, i);
  }
  containsPoint(e) {
    return dn.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return dn.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const r = this.a, n = this.b, i = this.c;
    let o, a;
    oi.subVectors(n, r), li.subVectors(i, r), Ts.subVectors(e, r);
    const l = oi.dot(Ts), c = li.dot(Ts);
    if (l <= 0 && c <= 0)
      return t.copy(r);
    Es.subVectors(e, n);
    const u = oi.dot(Es), f = li.dot(Es);
    if (u >= 0 && f <= u)
      return t.copy(n);
    const h = l * f - u * c;
    if (h <= 0 && l >= 0 && u <= 0)
      return o = l / (l - u), t.copy(r).addScaledVector(oi, o);
    ws.subVectors(e, i);
    const d = oi.dot(ws), _ = li.dot(ws);
    if (_ >= 0 && d <= _)
      return t.copy(i);
    const v = d * c - l * _;
    if (v <= 0 && c >= 0 && _ <= 0)
      return a = c / (c - _), t.copy(r).addScaledVector(li, a);
    const p = u * _ - d * f;
    if (p <= 0 && f - u >= 0 && d - _ >= 0)
      return Pa.subVectors(i, n), a = (f - u) / (f - u + (d - _)), t.copy(n).addScaledVector(Pa, a);
    const m = 1 / (p + v + h);
    return o = v * m, a = h * m, t.copy(r).addScaledVector(oi, o).addScaledVector(li, a);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const ko = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, Cn = { h: 0, s: 0, l: 0 }, br = { h: 0, s: 0, l: 0 };
function As(s, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? s + (e - s) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? s + (e - s) * 6 * (2 / 3 - t) : s;
}
class me {
  constructor(e, t, r) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, r);
  }
  set(e, t, r) {
    if (t === void 0 && r === void 0) {
      const n = e;
      n && n.isColor ? this.copy(n) : typeof n == "number" ? this.setHex(n) : typeof n == "string" && this.setStyle(n);
    } else
      this.setRGB(e, t, r);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = un) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, st.toWorkingColorSpace(this, t), this;
  }
  setRGB(e, t, r, n = st.workingColorSpace) {
    return this.r = e, this.g = t, this.b = r, st.toWorkingColorSpace(this, n), this;
  }
  setHSL(e, t, r, n = st.workingColorSpace) {
    if (e = xl(e, 1), t = zt(t, 0, 1), r = zt(r, 0, 1), t === 0)
      this.r = this.g = this.b = r;
    else {
      const i = r <= 0.5 ? r * (1 + t) : r + t - r * t, o = 2 * r - i;
      this.r = As(o, i, e + 1 / 3), this.g = As(o, i, e), this.b = As(o, i, e - 1 / 3);
    }
    return st.toWorkingColorSpace(this, n), this;
  }
  setStyle(e, t = un) {
    function r(i) {
      i !== void 0 && parseFloat(i) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let n;
    if (n = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let i;
      const o = n[1], a = n[2];
      switch (o) {
        case "rgb":
        case "rgba":
          if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return r(i[4]), this.setRGB(
              Math.min(255, parseInt(i[1], 10)) / 255,
              Math.min(255, parseInt(i[2], 10)) / 255,
              Math.min(255, parseInt(i[3], 10)) / 255,
              t
            );
          if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return r(i[4]), this.setRGB(
              Math.min(100, parseInt(i[1], 10)) / 100,
              Math.min(100, parseInt(i[2], 10)) / 100,
              Math.min(100, parseInt(i[3], 10)) / 100,
              t
            );
          break;
        case "hsl":
        case "hsla":
          if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return r(i[4]), this.setHSL(
              parseFloat(i[1]) / 360,
              parseFloat(i[2]) / 100,
              parseFloat(i[3]) / 100,
              t
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + e);
      }
    } else if (n = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const i = n[1], o = i.length;
      if (o === 3)
        return this.setRGB(
          parseInt(i.charAt(0), 16) / 15,
          parseInt(i.charAt(1), 16) / 15,
          parseInt(i.charAt(2), 16) / 15,
          t
        );
      if (o === 6)
        return this.setHex(parseInt(i, 16), t);
      console.warn("THREE.Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = un) {
    const r = ko[e.toLowerCase()];
    return r !== void 0 ? this.setHex(r, t) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = Ti(e.r), this.g = Ti(e.g), this.b = Ti(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = ds(e.r), this.g = ds(e.g), this.b = ds(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = un) {
    return st.fromWorkingColorSpace(Ct.copy(this), e), Math.round(zt(Ct.r * 255, 0, 255)) * 65536 + Math.round(zt(Ct.g * 255, 0, 255)) * 256 + Math.round(zt(Ct.b * 255, 0, 255));
  }
  getHexString(e = un) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = st.workingColorSpace) {
    st.fromWorkingColorSpace(Ct.copy(this), t);
    const r = Ct.r, n = Ct.g, i = Ct.b, o = Math.max(r, n, i), a = Math.min(r, n, i);
    let l, c;
    const u = (a + o) / 2;
    if (a === o)
      l = 0, c = 0;
    else {
      const f = o - a;
      switch (c = u <= 0.5 ? f / (o + a) : f / (2 - o - a), o) {
        case r:
          l = (n - i) / f + (n < i ? 6 : 0);
          break;
        case n:
          l = (i - r) / f + 2;
          break;
        case i:
          l = (r - n) / f + 4;
          break;
      }
      l /= 6;
    }
    return e.h = l, e.s = c, e.l = u, e;
  }
  getRGB(e, t = st.workingColorSpace) {
    return st.fromWorkingColorSpace(Ct.copy(this), t), e.r = Ct.r, e.g = Ct.g, e.b = Ct.b, e;
  }
  getStyle(e = un) {
    st.fromWorkingColorSpace(Ct.copy(this), e);
    const t = Ct.r, r = Ct.g, n = Ct.b;
    return e !== un ? `color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${n.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(r * 255)},${Math.round(n * 255)})`;
  }
  offsetHSL(e, t, r) {
    return this.getHSL(Cn), this.setHSL(Cn.h + e, Cn.s + t, Cn.l + r);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, r) {
    return this.r = e.r + (t.r - e.r) * r, this.g = e.g + (t.g - e.g) * r, this.b = e.b + (t.b - e.b) * r, this;
  }
  lerpHSL(e, t) {
    this.getHSL(Cn), e.getHSL(br);
    const r = fs(Cn.h, br.h, t), n = fs(Cn.s, br.s, t), i = fs(Cn.l, br.l, t);
    return this.setHSL(r, n, i), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const t = this.r, r = this.g, n = this.b, i = e.elements;
    return this.r = i[0] * t + i[3] * r + i[6] * n, this.g = i[1] * t + i[4] * r + i[7] * n, this.b = i[2] * t + i[5] * r + i[8] * n, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const Ct = /* @__PURE__ */ new me();
me.NAMES = ko;
let Il = 0;
class nr extends Ai {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Il++ }), this.uuid = er(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new me(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  onBuild() {
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const r = e[t];
        if (r === void 0) {
          console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const n = this[t];
        if (n === void 0) {
          console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        n && n.isColor ? n.set(r) : n && n.isVector3 && r && r.isVector3 ? n.copy(r) : this[t] = r;
      }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const r = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.color && this.color.isColor && (r.color = this.color.getHex()), this.roughness !== void 0 && (r.roughness = this.roughness), this.metalness !== void 0 && (r.metalness = this.metalness), this.sheen !== void 0 && (r.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (r.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (r.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (r.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (r.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (r.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (r.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (r.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (r.shininess = this.shininess), this.clearcoat !== void 0 && (r.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (r.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (r.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (r.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (r.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, r.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.iridescence !== void 0 && (r.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (r.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (r.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (r.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (r.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (r.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (r.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (r.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (r.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (r.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (r.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (r.lightMap = this.lightMap.toJSON(e).uuid, r.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (r.aoMap = this.aoMap.toJSON(e).uuid, r.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (r.bumpMap = this.bumpMap.toJSON(e).uuid, r.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (r.normalMap = this.normalMap.toJSON(e).uuid, r.normalMapType = this.normalMapType, r.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (r.displacementMap = this.displacementMap.toJSON(e).uuid, r.displacementScale = this.displacementScale, r.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (r.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (r.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (r.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (r.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (r.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (r.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (r.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (r.combine = this.combine)), this.envMapRotation !== void 0 && (r.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (r.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (r.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (r.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (r.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (r.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (r.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (r.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (r.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (r.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (r.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (r.size = this.size), this.shadowSide !== null && (r.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (r.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (r.blending = this.blending), this.side !== 0 && (r.side = this.side), this.vertexColors === !0 && (r.vertexColors = !0), this.opacity < 1 && (r.opacity = this.opacity), this.transparent === !0 && (r.transparent = !0), this.blendSrc !== 204 && (r.blendSrc = this.blendSrc), this.blendDst !== 205 && (r.blendDst = this.blendDst), this.blendEquation !== 100 && (r.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (r.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (r.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (r.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (r.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (r.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (r.depthFunc = this.depthFunc), this.depthTest === !1 && (r.depthTest = this.depthTest), this.depthWrite === !1 && (r.depthWrite = this.depthWrite), this.colorWrite === !1 && (r.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (r.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (r.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (r.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (r.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (r.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (r.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (r.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (r.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (r.rotation = this.rotation), this.polygonOffset === !0 && (r.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (r.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (r.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (r.linewidth = this.linewidth), this.dashSize !== void 0 && (r.dashSize = this.dashSize), this.gapSize !== void 0 && (r.gapSize = this.gapSize), this.scale !== void 0 && (r.scale = this.scale), this.dithering === !0 && (r.dithering = !0), this.alphaTest > 0 && (r.alphaTest = this.alphaTest), this.alphaHash === !0 && (r.alphaHash = !0), this.alphaToCoverage === !0 && (r.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (r.premultipliedAlpha = !0), this.forceSinglePass === !0 && (r.forceSinglePass = !0), this.wireframe === !0 && (r.wireframe = !0), this.wireframeLinewidth > 1 && (r.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (r.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (r.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (r.flatShading = !0), this.visible === !1 && (r.visible = !1), this.toneMapped === !1 && (r.toneMapped = !1), this.fog === !1 && (r.fog = !1), Object.keys(this.userData).length > 0 && (r.userData = this.userData);
    function n(i) {
      const o = [];
      for (const a in i) {
        const l = i[a];
        delete l.metadata, o.push(l);
      }
      return o;
    }
    if (t) {
      const i = n(e.textures), o = n(e.images);
      i.length > 0 && (r.textures = i), o.length > 0 && (r.images = o);
    }
    return r;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let r = null;
    if (t !== null) {
      const n = t.length;
      r = new Array(n);
      for (let i = 0; i !== n; ++i)
        r[i] = t[i].clone();
    }
    return this.clippingPlanes = r, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}
class Jn extends nr {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new me(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new xn(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const _t = /* @__PURE__ */ new ne(), Sr = /* @__PURE__ */ new De();
class Xt {
  constructor(e, t, r = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = r, this.usage = 35044, this._updateRange = { offset: 0, count: -1 }, this.updateRanges = [], this.gpuType = 1015, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  get updateRange() {
    return bl("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."), this._updateRange;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, t, r) {
    e *= this.itemSize, r *= t.itemSize;
    for (let n = 0, i = this.itemSize; n < i; n++)
      this.array[e + n] = t.array[r + n];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, r = this.count; t < r; t++)
        Sr.fromBufferAttribute(this, t), Sr.applyMatrix3(e), this.setXY(t, Sr.x, Sr.y);
    else if (this.itemSize === 3)
      for (let t = 0, r = this.count; t < r; t++)
        _t.fromBufferAttribute(this, t), _t.applyMatrix3(e), this.setXYZ(t, _t.x, _t.y, _t.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, r = this.count; t < r; t++)
      _t.fromBufferAttribute(this, t), _t.applyMatrix4(e), this.setXYZ(t, _t.x, _t.y, _t.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, r = this.count; t < r; t++)
      _t.fromBufferAttribute(this, t), _t.applyNormalMatrix(e), this.setXYZ(t, _t.x, _t.y, _t.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, r = this.count; t < r; t++)
      _t.fromBufferAttribute(this, t), _t.transformDirection(e), this.setXYZ(t, _t.x, _t.y, _t.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let r = this.array[e * this.itemSize + t];
    return this.normalized && (r = Gi(r, this.array)), r;
  }
  setComponent(e, t, r) {
    return this.normalized && (r = Bt(r, this.array)), this.array[e * this.itemSize + t] = r, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = Gi(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = Bt(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = Gi(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = Bt(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = Gi(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = Bt(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = Gi(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = Bt(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, r) {
    return e *= this.itemSize, this.normalized && (t = Bt(t, this.array), r = Bt(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = r, this;
  }
  setXYZ(e, t, r, n) {
    return e *= this.itemSize, this.normalized && (t = Bt(t, this.array), r = Bt(r, this.array), n = Bt(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = r, this.array[e + 2] = n, this;
  }
  setXYZW(e, t, r, n, i) {
    return e *= this.itemSize, this.normalized && (t = Bt(t, this.array), r = Bt(r, this.array), n = Bt(n, this.array), i = Bt(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = r, this.array[e + 2] = n, this.array[e + 3] = i, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== 35044 && (e.usage = this.usage), e;
  }
}
class Ho extends Xt {
  constructor(e, t, r) {
    super(new Uint16Array(e), t, r);
  }
}
class Vo extends Xt {
  constructor(e, t, r) {
    super(new Uint32Array(e), t, r);
  }
}
class Ut extends Xt {
  constructor(e, t, r) {
    super(new Float32Array(e), t, r);
  }
}
let Nl = 0;
const Yt = /* @__PURE__ */ new ft(), Cs = /* @__PURE__ */ new Pt(), ci = /* @__PURE__ */ new ne(), Vt = /* @__PURE__ */ new yn(), Wi = /* @__PURE__ */ new yn(), St = /* @__PURE__ */ new ne();
class qt extends Ai {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Nl++ }), this.uuid = er(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (Io(e) ? Vo : Ho)(e, 1) : this.index = e, this;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, t, r = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: r
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const r = this.attributes.normal;
    if (r !== void 0) {
      const i = new $e().getNormalMatrix(e);
      r.applyNormalMatrix(i), r.needsUpdate = !0;
    }
    const n = this.attributes.tangent;
    return n !== void 0 && (n.transformDirection(e), n.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(e) {
    return Yt.makeRotationFromQuaternion(e), this.applyMatrix4(Yt), this;
  }
  rotateX(e) {
    return Yt.makeRotationX(e), this.applyMatrix4(Yt), this;
  }
  rotateY(e) {
    return Yt.makeRotationY(e), this.applyMatrix4(Yt), this;
  }
  rotateZ(e) {
    return Yt.makeRotationZ(e), this.applyMatrix4(Yt), this;
  }
  translate(e, t, r) {
    return Yt.makeTranslation(e, t, r), this.applyMatrix4(Yt), this;
  }
  scale(e, t, r) {
    return Yt.makeScale(e, t, r), this.applyMatrix4(Yt), this;
  }
  lookAt(e) {
    return Cs.lookAt(e), Cs.updateMatrix(), this.applyMatrix4(Cs.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(ci).negate(), this.translate(ci.x, ci.y, ci.z), this;
  }
  setFromPoints(e) {
    const t = [];
    for (let r = 0, n = e.length; r < n; r++) {
      const i = e[r];
      t.push(i.x, i.y, i.z || 0);
    }
    return this.setAttribute("position", new Ut(t, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new yn());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new ne(-1 / 0, -1 / 0, -1 / 0),
        new ne(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let r = 0, n = t.length; r < n; r++) {
          const i = t[r];
          Vt.setFromBufferAttribute(i), this.morphTargetsRelative ? (St.addVectors(this.boundingBox.min, Vt.min), this.boundingBox.expandByPoint(St), St.addVectors(this.boundingBox.max, Vt.max), this.boundingBox.expandByPoint(St)) : (this.boundingBox.expandByPoint(Vt.min), this.boundingBox.expandByPoint(Vt.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Qn());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new ne(), 1 / 0);
      return;
    }
    if (e) {
      const r = this.boundingSphere.center;
      if (Vt.setFromBufferAttribute(e), t)
        for (let i = 0, o = t.length; i < o; i++) {
          const a = t[i];
          Wi.setFromBufferAttribute(a), this.morphTargetsRelative ? (St.addVectors(Vt.min, Wi.min), Vt.expandByPoint(St), St.addVectors(Vt.max, Wi.max), Vt.expandByPoint(St)) : (Vt.expandByPoint(Wi.min), Vt.expandByPoint(Wi.max));
        }
      Vt.getCenter(r);
      let n = 0;
      for (let i = 0, o = e.count; i < o; i++)
        St.fromBufferAttribute(e, i), n = Math.max(n, r.distanceToSquared(St));
      if (t)
        for (let i = 0, o = t.length; i < o; i++) {
          const a = t[i], l = this.morphTargetsRelative;
          for (let c = 0, u = a.count; c < u; c++)
            St.fromBufferAttribute(a, c), l && (ci.fromBufferAttribute(e, c), St.add(ci)), n = Math.max(n, r.distanceToSquared(St));
        }
      this.boundingSphere.radius = Math.sqrt(n), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const r = t.position, n = t.normal, i = t.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Xt(new Float32Array(4 * r.count), 4));
    const o = this.getAttribute("tangent"), a = [], l = [];
    for (let C = 0; C < r.count; C++)
      a[C] = new ne(), l[C] = new ne();
    const c = new ne(), u = new ne(), f = new ne(), h = new De(), d = new De(), _ = new De(), v = new ne(), p = new ne();
    function m(C, z, x) {
      c.fromBufferAttribute(r, C), u.fromBufferAttribute(r, z), f.fromBufferAttribute(r, x), h.fromBufferAttribute(i, C), d.fromBufferAttribute(i, z), _.fromBufferAttribute(i, x), u.sub(c), f.sub(c), d.sub(h), _.sub(h);
      const R = 1 / (d.x * _.y - _.x * d.y);
      isFinite(R) && (v.copy(u).multiplyScalar(_.y).addScaledVector(f, -d.y).multiplyScalar(R), p.copy(f).multiplyScalar(d.x).addScaledVector(u, -_.x).multiplyScalar(R), a[C].add(v), a[z].add(v), a[x].add(v), l[C].add(p), l[z].add(p), l[x].add(p));
    }
    let y = this.groups;
    y.length === 0 && (y = [{
      start: 0,
      count: e.count
    }]);
    for (let C = 0, z = y.length; C < z; ++C) {
      const x = y[C], R = x.start, L = x.count;
      for (let k = R, P = R + L; k < P; k += 3)
        m(
          e.getX(k + 0),
          e.getX(k + 1),
          e.getX(k + 2)
        );
    }
    const g = new ne(), A = new ne(), w = new ne(), T = new ne();
    function S(C) {
      w.fromBufferAttribute(n, C), T.copy(w);
      const z = a[C];
      g.copy(z), g.sub(w.multiplyScalar(w.dot(z))).normalize(), A.crossVectors(T, z);
      const R = A.dot(l[C]) < 0 ? -1 : 1;
      o.setXYZW(C, g.x, g.y, g.z, R);
    }
    for (let C = 0, z = y.length; C < z; ++C) {
      const x = y[C], R = x.start, L = x.count;
      for (let k = R, P = R + L; k < P; k += 3)
        S(e.getX(k + 0)), S(e.getX(k + 1)), S(e.getX(k + 2));
    }
  }
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let r = this.getAttribute("normal");
      if (r === void 0)
        r = new Xt(new Float32Array(t.count * 3), 3), this.setAttribute("normal", r);
      else
        for (let h = 0, d = r.count; h < d; h++)
          r.setXYZ(h, 0, 0, 0);
      const n = new ne(), i = new ne(), o = new ne(), a = new ne(), l = new ne(), c = new ne(), u = new ne(), f = new ne();
      if (e)
        for (let h = 0, d = e.count; h < d; h += 3) {
          const _ = e.getX(h + 0), v = e.getX(h + 1), p = e.getX(h + 2);
          n.fromBufferAttribute(t, _), i.fromBufferAttribute(t, v), o.fromBufferAttribute(t, p), u.subVectors(o, i), f.subVectors(n, i), u.cross(f), a.fromBufferAttribute(r, _), l.fromBufferAttribute(r, v), c.fromBufferAttribute(r, p), a.add(u), l.add(u), c.add(u), r.setXYZ(_, a.x, a.y, a.z), r.setXYZ(v, l.x, l.y, l.z), r.setXYZ(p, c.x, c.y, c.z);
        }
      else
        for (let h = 0, d = t.count; h < d; h += 3)
          n.fromBufferAttribute(t, h + 0), i.fromBufferAttribute(t, h + 1), o.fromBufferAttribute(t, h + 2), u.subVectors(o, i), f.subVectors(n, i), u.cross(f), r.setXYZ(h + 0, u.x, u.y, u.z), r.setXYZ(h + 1, u.x, u.y, u.z), r.setXYZ(h + 2, u.x, u.y, u.z);
      this.normalizeNormals(), r.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, r = e.count; t < r; t++)
      St.fromBufferAttribute(e, t), St.normalize(), e.setXYZ(t, St.x, St.y, St.z);
  }
  toNonIndexed() {
    function e(a, l) {
      const c = a.array, u = a.itemSize, f = a.normalized, h = new c.constructor(l.length * u);
      let d = 0, _ = 0;
      for (let v = 0, p = l.length; v < p; v++) {
        a.isInterleavedBufferAttribute ? d = l[v] * a.data.stride + a.offset : d = l[v] * u;
        for (let m = 0; m < u; m++)
          h[_++] = c[d++];
      }
      return new Xt(h, u, f);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new qt(), r = this.index.array, n = this.attributes;
    for (const a in n) {
      const l = n[a], c = e(l, r);
      t.setAttribute(a, c);
    }
    const i = this.morphAttributes;
    for (const a in i) {
      const l = [], c = i[a];
      for (let u = 0, f = c.length; u < f; u++) {
        const h = c[u], d = e(h, r);
        l.push(d);
      }
      t.morphAttributes[a] = l;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const o = this.groups;
    for (let a = 0, l = o.length; a < l; a++) {
      const c = o[a];
      t.addGroup(c.start, c.count, c.materialIndex);
    }
    return t;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const c in l)
        l[c] !== void 0 && (e[c] = l[c]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const r = this.attributes;
    for (const l in r) {
      const c = r[l];
      e.data.attributes[l] = c.toJSON(e.data);
    }
    const n = {};
    let i = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], u = [];
      for (let f = 0, h = c.length; f < h; f++) {
        const d = c[f];
        u.push(d.toJSON(e.data));
      }
      u.length > 0 && (n[l] = u, i = !0);
    }
    i && (e.data.morphAttributes = n, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const o = this.groups;
    o.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(o)));
    const a = this.boundingSphere;
    return a !== null && (e.data.boundingSphere = {
      center: a.center.toArray(),
      radius: a.radius
    }), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const r = e.index;
    r !== null && this.setIndex(r.clone(t));
    const n = e.attributes;
    for (const c in n) {
      const u = n[c];
      this.setAttribute(c, u.clone(t));
    }
    const i = e.morphAttributes;
    for (const c in i) {
      const u = [], f = i[c];
      for (let h = 0, d = f.length; h < d; h++)
        u.push(f[h].clone(t));
      this.morphAttributes[c] = u;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const o = e.groups;
    for (let c = 0, u = o.length; c < u; c++) {
      const f = o[c];
      this.addGroup(f.start, f.count, f.materialIndex);
    }
    const a = e.boundingBox;
    a !== null && (this.boundingBox = a.clone());
    const l = e.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const Da = /* @__PURE__ */ new ft(), Bn = /* @__PURE__ */ new zo(), Mr = /* @__PURE__ */ new Qn(), Ua = /* @__PURE__ */ new ne(), ui = /* @__PURE__ */ new ne(), fi = /* @__PURE__ */ new ne(), hi = /* @__PURE__ */ new ne(), Rs = /* @__PURE__ */ new ne(), Tr = /* @__PURE__ */ new ne(), Er = /* @__PURE__ */ new De(), wr = /* @__PURE__ */ new De(), Ar = /* @__PURE__ */ new De(), La = /* @__PURE__ */ new ne(), Fa = /* @__PURE__ */ new ne(), Ia = /* @__PURE__ */ new ne(), Cr = /* @__PURE__ */ new ne(), Rr = /* @__PURE__ */ new ne();
class qe extends Pt {
  constructor(e = new qt(), t = new Jn()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, r = Object.keys(t);
    if (r.length > 0) {
      const n = t[r[0]];
      if (n !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, o = n.length; i < o; i++) {
          const a = n[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = i;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const r = this.geometry, n = r.attributes.position, i = r.morphAttributes.position, o = r.morphTargetsRelative;
    t.fromBufferAttribute(n, e);
    const a = this.morphTargetInfluences;
    if (i && a) {
      Tr.set(0, 0, 0);
      for (let l = 0, c = i.length; l < c; l++) {
        const u = a[l], f = i[l];
        u !== 0 && (Rs.fromBufferAttribute(f, e), o ? Tr.addScaledVector(Rs, u) : Tr.addScaledVector(Rs.sub(t), u));
      }
      t.add(Tr);
    }
    return t;
  }
  raycast(e, t) {
    const r = this.geometry, n = this.material, i = this.matrixWorld;
    n !== void 0 && (r.boundingSphere === null && r.computeBoundingSphere(), Mr.copy(r.boundingSphere), Mr.applyMatrix4(i), Bn.copy(e.ray).recast(e.near), !(Mr.containsPoint(Bn.origin) === !1 && (Bn.intersectSphere(Mr, Ua) === null || Bn.origin.distanceToSquared(Ua) > (e.far - e.near) ** 2)) && (Da.copy(i).invert(), Bn.copy(e.ray).applyMatrix4(Da), !(r.boundingBox !== null && Bn.intersectsBox(r.boundingBox) === !1) && this._computeIntersections(e, t, Bn)));
  }
  _computeIntersections(e, t, r) {
    let n;
    const i = this.geometry, o = this.material, a = i.index, l = i.attributes.position, c = i.attributes.uv, u = i.attributes.uv1, f = i.attributes.normal, h = i.groups, d = i.drawRange;
    if (a !== null)
      if (Array.isArray(o))
        for (let _ = 0, v = h.length; _ < v; _++) {
          const p = h[_], m = o[p.materialIndex], y = Math.max(p.start, d.start), g = Math.min(a.count, Math.min(p.start + p.count, d.start + d.count));
          for (let A = y, w = g; A < w; A += 3) {
            const T = a.getX(A), S = a.getX(A + 1), C = a.getX(A + 2);
            n = Pr(this, m, e, r, c, u, f, T, S, C), n && (n.faceIndex = Math.floor(A / 3), n.face.materialIndex = p.materialIndex, t.push(n));
          }
        }
      else {
        const _ = Math.max(0, d.start), v = Math.min(a.count, d.start + d.count);
        for (let p = _, m = v; p < m; p += 3) {
          const y = a.getX(p), g = a.getX(p + 1), A = a.getX(p + 2);
          n = Pr(this, o, e, r, c, u, f, y, g, A), n && (n.faceIndex = Math.floor(p / 3), t.push(n));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(o))
        for (let _ = 0, v = h.length; _ < v; _++) {
          const p = h[_], m = o[p.materialIndex], y = Math.max(p.start, d.start), g = Math.min(l.count, Math.min(p.start + p.count, d.start + d.count));
          for (let A = y, w = g; A < w; A += 3) {
            const T = A, S = A + 1, C = A + 2;
            n = Pr(this, m, e, r, c, u, f, T, S, C), n && (n.faceIndex = Math.floor(A / 3), n.face.materialIndex = p.materialIndex, t.push(n));
          }
        }
      else {
        const _ = Math.max(0, d.start), v = Math.min(l.count, d.start + d.count);
        for (let p = _, m = v; p < m; p += 3) {
          const y = p, g = p + 1, A = p + 2;
          n = Pr(this, o, e, r, c, u, f, y, g, A), n && (n.faceIndex = Math.floor(p / 3), t.push(n));
        }
      }
  }
}
function Ol(s, e, t, r, n, i, o, a) {
  let l;
  if (e.side === 1 ? l = r.intersectTriangle(o, i, n, !0, a) : l = r.intersectTriangle(n, i, o, e.side === 0, a), l === null) return null;
  Rr.copy(a), Rr.applyMatrix4(s.matrixWorld);
  const c = t.ray.origin.distanceTo(Rr);
  return c < t.near || c > t.far ? null : {
    distance: c,
    point: Rr.clone(),
    object: s
  };
}
function Pr(s, e, t, r, n, i, o, a, l, c) {
  s.getVertexPosition(a, ui), s.getVertexPosition(l, fi), s.getVertexPosition(c, hi);
  const u = Ol(s, e, t, r, ui, fi, hi, Cr);
  if (u) {
    n && (Er.fromBufferAttribute(n, a), wr.fromBufferAttribute(n, l), Ar.fromBufferAttribute(n, c), u.uv = dn.getInterpolation(Cr, ui, fi, hi, Er, wr, Ar, new De())), i && (Er.fromBufferAttribute(i, a), wr.fromBufferAttribute(i, l), Ar.fromBufferAttribute(i, c), u.uv1 = dn.getInterpolation(Cr, ui, fi, hi, Er, wr, Ar, new De())), o && (La.fromBufferAttribute(o, a), Fa.fromBufferAttribute(o, l), Ia.fromBufferAttribute(o, c), u.normal = dn.getInterpolation(Cr, ui, fi, hi, La, Fa, Ia, new ne()), u.normal.dot(r.direction) > 0 && u.normal.multiplyScalar(-1));
    const f = {
      a,
      b: l,
      c,
      normal: new ne(),
      materialIndex: 0
    };
    dn.getNormal(ui, fi, hi, f.normal), u.face = f;
  }
  return u;
}
class ir extends qt {
  constructor(e = 1, t = 1, r = 1, n = 1, i = 1, o = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: r,
      widthSegments: n,
      heightSegments: i,
      depthSegments: o
    };
    const a = this;
    n = Math.floor(n), i = Math.floor(i), o = Math.floor(o);
    const l = [], c = [], u = [], f = [];
    let h = 0, d = 0;
    _("z", "y", "x", -1, -1, r, t, e, o, i, 0), _("z", "y", "x", 1, -1, r, t, -e, o, i, 1), _("x", "z", "y", 1, 1, e, r, t, n, o, 2), _("x", "z", "y", 1, -1, e, r, -t, n, o, 3), _("x", "y", "z", 1, -1, e, t, r, n, i, 4), _("x", "y", "z", -1, -1, e, t, -r, n, i, 5), this.setIndex(l), this.setAttribute("position", new Ut(c, 3)), this.setAttribute("normal", new Ut(u, 3)), this.setAttribute("uv", new Ut(f, 2));
    function _(v, p, m, y, g, A, w, T, S, C, z) {
      const x = A / S, R = w / C, L = A / 2, k = w / 2, P = T / 2, W = S + 1, O = C + 1;
      let Y = 0, b = 0;
      const G = new ne();
      for (let X = 0; X < O; X++) {
        const U = X * R - k;
        for (let V = 0; V < W; V++) {
          const K = V * x - L;
          G[v] = K * y, G[p] = U * g, G[m] = P, c.push(G.x, G.y, G.z), G[v] = 0, G[p] = 0, G[m] = T > 0 ? 1 : -1, u.push(G.x, G.y, G.z), f.push(V / S), f.push(1 - X / C), Y += 1;
        }
      }
      for (let X = 0; X < C; X++)
        for (let U = 0; U < S; U++) {
          const V = h + U + W * X, K = h + U + W * (X + 1), I = h + (U + 1) + W * (X + 1), B = h + (U + 1) + W * X;
          l.push(V, K, B), l.push(K, I, B), b += 6;
        }
      a.addGroup(d, b, z), d += b, h += Y;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new ir(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function Ei(s) {
  const e = {};
  for (const t in s) {
    e[t] = {};
    for (const r in s[t]) {
      const n = s[t][r];
      n && (n.isColor || n.isMatrix3 || n.isMatrix4 || n.isVector2 || n.isVector3 || n.isVector4 || n.isTexture || n.isQuaternion) ? n.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][r] = null) : e[t][r] = n.clone() : Array.isArray(n) ? e[t][r] = n.slice() : e[t][r] = n;
    }
  }
  return e;
}
function Dt(s) {
  const e = {};
  for (let t = 0; t < s.length; t++) {
    const r = Ei(s[t]);
    for (const n in r)
      e[n] = r[n];
  }
  return e;
}
function Bl(s) {
  const e = [];
  for (let t = 0; t < s.length; t++)
    e.push(s[t].clone());
  return e;
}
function Wo(s) {
  return s.getRenderTarget() === null ? s.outputColorSpace : st.workingColorSpace;
}
const $i = { clone: Ei, merge: Dt };
var zl = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Gl = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Je extends nr {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = zl, this.fragmentShader = Gl, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      derivatives: !1,
      // set to use derivatives
      fragDepth: !1,
      // set to use fragment depth values
      drawBuffers: !1,
      // set to use draw buffers
      shaderTextureLOD: !1,
      // set to use shader texture LOD
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Ei(e.uniforms), this.uniformsGroups = Bl(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const n in this.uniforms) {
      const o = this.uniforms[n].value;
      o && o.isTexture ? t.uniforms[n] = {
        type: "t",
        value: o.toJSON(e).uuid
      } : o && o.isColor ? t.uniforms[n] = {
        type: "c",
        value: o.getHex()
      } : o && o.isVector2 ? t.uniforms[n] = {
        type: "v2",
        value: o.toArray()
      } : o && o.isVector3 ? t.uniforms[n] = {
        type: "v3",
        value: o.toArray()
      } : o && o.isVector4 ? t.uniforms[n] = {
        type: "v4",
        value: o.toArray()
      } : o && o.isMatrix3 ? t.uniforms[n] = {
        type: "m3",
        value: o.toArray()
      } : o && o.isMatrix4 ? t.uniforms[n] = {
        type: "m4",
        value: o.toArray()
      } : t.uniforms[n] = {
        value: o
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const r = {};
    for (const n in this.extensions)
      this.extensions[n] === !0 && (r[n] = !0);
    return Object.keys(r).length > 0 && (t.extensions = r), t;
  }
}
class Xo extends Pt {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ft(), this.projectionMatrix = new ft(), this.projectionMatrixInverse = new ft(), this.coordinateSystem = 2e3;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Rn = /* @__PURE__ */ new ne(), Na = /* @__PURE__ */ new De(), Oa = /* @__PURE__ */ new De();
class Wt extends Xo {
  constructor(e = 50, t = 1, r = 0.1, n = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = r, this.far = n, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = Gs * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const e = Math.tan(us * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return Gs * 2 * Math.atan(
      Math.tan(us * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets minTarget and maxTarget to the coordinates of the lower-left and upper-right corners of the view rectangle.
   */
  getViewBounds(e, t, r) {
    Rn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(Rn.x, Rn.y).multiplyScalar(-e / Rn.z), Rn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), r.set(Rn.x, Rn.y).multiplyScalar(-e / Rn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   * Copies the result into the target Vector2, where x is width and y is height.
   */
  getViewSize(e, t) {
    return this.getViewBounds(e, Na, Oa), t.subVectors(Oa, Na);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset(e, t, r, n, i, o) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = r, this.view.offsetY = n, this.view.width = i, this.view.height = o, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(us * 0.5 * this.fov) / this.zoom, r = 2 * t, n = this.aspect * r, i = -0.5 * n;
    const o = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = o.fullWidth, c = o.fullHeight;
      i += o.offsetX * n / l, t -= o.offsetY * r / c, n *= o.width / l, r *= o.height / c;
    }
    const a = this.filmOffset;
    a !== 0 && (i += e * a / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + n, t, t - r, e, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
const di = -90, pi = 1;
class kl extends Pt {
  constructor(e, t, r) {
    super(), this.type = "CubeCamera", this.renderTarget = r, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const n = new Wt(di, pi, e, t);
    n.layers = this.layers, this.add(n);
    const i = new Wt(di, pi, e, t);
    i.layers = this.layers, this.add(i);
    const o = new Wt(di, pi, e, t);
    o.layers = this.layers, this.add(o);
    const a = new Wt(di, pi, e, t);
    a.layers = this.layers, this.add(a);
    const l = new Wt(di, pi, e, t);
    l.layers = this.layers, this.add(l);
    const c = new Wt(di, pi, e, t);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [r, n, i, o, a, l] = t;
    for (const c of t) this.remove(c);
    if (e === 2e3)
      r.up.set(0, 1, 0), r.lookAt(1, 0, 0), n.up.set(0, 1, 0), n.lookAt(-1, 0, 0), i.up.set(0, 0, -1), i.lookAt(0, 1, 0), o.up.set(0, 0, 1), o.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (e === 2001)
      r.up.set(0, -1, 0), r.lookAt(-1, 0, 0), n.up.set(0, -1, 0), n.lookAt(1, 0, 0), i.up.set(0, 0, 1), i.lookAt(0, 1, 0), o.up.set(0, 0, -1), o.lookAt(0, -1, 0), a.up.set(0, -1, 0), a.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const c of t)
      this.add(c), c.updateMatrixWorld();
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: r, activeMipmapLevel: n } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [i, o, a, l, c, u] = this.children, f = e.getRenderTarget(), h = e.getActiveCubeFace(), d = e.getActiveMipmapLevel(), _ = e.xr.enabled;
    e.xr.enabled = !1;
    const v = r.texture.generateMipmaps;
    r.texture.generateMipmaps = !1, e.setRenderTarget(r, 0, n), e.render(t, i), e.setRenderTarget(r, 1, n), e.render(t, o), e.setRenderTarget(r, 2, n), e.render(t, a), e.setRenderTarget(r, 3, n), e.render(t, l), e.setRenderTarget(r, 4, n), e.render(t, c), r.texture.generateMipmaps = v, e.setRenderTarget(r, 5, n), e.render(t, u), e.setRenderTarget(f, h, d), e.xr.enabled = _, r.texture.needsPMREMUpdate = !0;
  }
}
class qo extends Tt {
  constructor(e, t, r, n, i, o, a, l, c, u) {
    e = e !== void 0 ? e : [], t = t !== void 0 ? t : 301, super(e, t, r, n, i, o, a, l, c, u), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class Hl extends gt {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const r = { width: e, height: e, depth: 1 }, n = [r, r, r, r, r, r];
    this.texture = new qo(n, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1, this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : 1006;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const r = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, n = new ir(5, 5, 5), i = new Je({
      name: "CubemapFromEquirect",
      uniforms: Ei(r.uniforms),
      vertexShader: r.vertexShader,
      fragmentShader: r.fragmentShader,
      side: 1,
      blending: 0
    });
    i.uniforms.tEquirect.value = t;
    const o = new qe(n, i), a = t.minFilter;
    return t.minFilter === 1008 && (t.minFilter = 1006), new kl(1, 10, this).update(e, o), t.minFilter = a, o.geometry.dispose(), o.material.dispose(), this;
  }
  clear(e, t, r, n) {
    const i = e.getRenderTarget();
    for (let o = 0; o < 6; o++)
      e.setRenderTarget(this, o), e.clear(t, r, n);
    e.setRenderTarget(i);
  }
}
const Ps = /* @__PURE__ */ new ne(), Vl = /* @__PURE__ */ new ne(), Wl = /* @__PURE__ */ new $e();
class qn {
  constructor(e = new ne(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  setComponents(e, t, r, n) {
    return this.normal.set(e, t, r), this.constant = n, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, r) {
    const n = Ps.subVectors(r, t).cross(Vl.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(n, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t) {
    const r = e.delta(Ps), n = this.normal.dot(r);
    if (n === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const i = -(e.start.dot(this.normal) + this.constant) / n;
    return i < 0 || i > 1 ? null : t.copy(e.start).addScaledVector(r, i);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), r = this.distanceToPoint(e.end);
    return t < 0 && r > 0 || r < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const r = t || Wl.getNormalMatrix(e), n = this.coplanarPoint(Ps).applyMatrix4(e), i = this.normal.applyMatrix3(r).normalize();
    return this.constant = -n.dot(i), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const zn = /* @__PURE__ */ new Qn(), Dr = /* @__PURE__ */ new ne();
class Yo {
  constructor(e = new qn(), t = new qn(), r = new qn(), n = new qn(), i = new qn(), o = new qn()) {
    this.planes = [e, t, r, n, i, o];
  }
  set(e, t, r, n, i, o) {
    const a = this.planes;
    return a[0].copy(e), a[1].copy(t), a[2].copy(r), a[3].copy(n), a[4].copy(i), a[5].copy(o), this;
  }
  copy(e) {
    const t = this.planes;
    for (let r = 0; r < 6; r++)
      t[r].copy(e.planes[r]);
    return this;
  }
  setFromProjectionMatrix(e, t = 2e3) {
    const r = this.planes, n = e.elements, i = n[0], o = n[1], a = n[2], l = n[3], c = n[4], u = n[5], f = n[6], h = n[7], d = n[8], _ = n[9], v = n[10], p = n[11], m = n[12], y = n[13], g = n[14], A = n[15];
    if (r[0].setComponents(l - i, h - c, p - d, A - m).normalize(), r[1].setComponents(l + i, h + c, p + d, A + m).normalize(), r[2].setComponents(l + o, h + u, p + _, A + y).normalize(), r[3].setComponents(l - o, h - u, p - _, A - y).normalize(), r[4].setComponents(l - a, h - f, p - v, A - g).normalize(), t === 2e3)
      r[5].setComponents(l + a, h + f, p + v, A + g).normalize();
    else if (t === 2001)
      r[5].setComponents(a, f, v, g).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), zn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), zn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(zn);
  }
  intersectsSprite(e) {
    return zn.center.set(0, 0, 0), zn.radius = 0.7071067811865476, zn.applyMatrix4(e.matrixWorld), this.intersectsSphere(zn);
  }
  intersectsSphere(e) {
    const t = this.planes, r = e.center, n = -e.radius;
    for (let i = 0; i < 6; i++)
      if (t[i].distanceToPoint(r) < n)
        return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let r = 0; r < 6; r++) {
      const n = t[r];
      if (Dr.x = n.normal.x > 0 ? e.max.x : e.min.x, Dr.y = n.normal.y > 0 ? e.max.y : e.min.y, Dr.z = n.normal.z > 0 ? e.max.z : e.min.z, n.distanceToPoint(Dr) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let r = 0; r < 6; r++)
      if (t[r].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function jo() {
  let s = null, e = !1, t = null, r = null;
  function n(i, o) {
    t(i, o), r = s.requestAnimationFrame(n);
  }
  return {
    start: function() {
      e !== !0 && t !== null && (r = s.requestAnimationFrame(n), e = !0);
    },
    stop: function() {
      s.cancelAnimationFrame(r), e = !1;
    },
    setAnimationLoop: function(i) {
      t = i;
    },
    setContext: function(i) {
      s = i;
    }
  };
}
function Xl(s, e) {
  const t = e.isWebGL2, r = /* @__PURE__ */ new WeakMap();
  function n(c, u) {
    const f = c.array, h = c.usage, d = f.byteLength, _ = s.createBuffer();
    s.bindBuffer(u, _), s.bufferData(u, f, h), c.onUploadCallback();
    let v;
    if (f instanceof Float32Array)
      v = s.FLOAT;
    else if (f instanceof Uint16Array)
      if (c.isFloat16BufferAttribute)
        if (t)
          v = s.HALF_FLOAT;
        else
          throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
      else
        v = s.UNSIGNED_SHORT;
    else if (f instanceof Int16Array)
      v = s.SHORT;
    else if (f instanceof Uint32Array)
      v = s.UNSIGNED_INT;
    else if (f instanceof Int32Array)
      v = s.INT;
    else if (f instanceof Int8Array)
      v = s.BYTE;
    else if (f instanceof Uint8Array)
      v = s.UNSIGNED_BYTE;
    else if (f instanceof Uint8ClampedArray)
      v = s.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + f);
    return {
      buffer: _,
      type: v,
      bytesPerElement: f.BYTES_PER_ELEMENT,
      version: c.version,
      size: d
    };
  }
  function i(c, u, f) {
    const h = u.array, d = u._updateRange, _ = u.updateRanges;
    if (s.bindBuffer(f, c), d.count === -1 && _.length === 0 && s.bufferSubData(f, 0, h), _.length !== 0) {
      for (let v = 0, p = _.length; v < p; v++) {
        const m = _[v];
        t ? s.bufferSubData(
          f,
          m.start * h.BYTES_PER_ELEMENT,
          h,
          m.start,
          m.count
        ) : s.bufferSubData(
          f,
          m.start * h.BYTES_PER_ELEMENT,
          h.subarray(m.start, m.start + m.count)
        );
      }
      u.clearUpdateRanges();
    }
    d.count !== -1 && (t ? s.bufferSubData(
      f,
      d.offset * h.BYTES_PER_ELEMENT,
      h,
      d.offset,
      d.count
    ) : s.bufferSubData(
      f,
      d.offset * h.BYTES_PER_ELEMENT,
      h.subarray(d.offset, d.offset + d.count)
    ), d.count = -1), u.onUploadCallback();
  }
  function o(c) {
    return c.isInterleavedBufferAttribute && (c = c.data), r.get(c);
  }
  function a(c) {
    c.isInterleavedBufferAttribute && (c = c.data);
    const u = r.get(c);
    u && (s.deleteBuffer(u.buffer), r.delete(c));
  }
  function l(c, u) {
    if (c.isGLBufferAttribute) {
      const h = r.get(c);
      (!h || h.version < c.version) && r.set(c, {
        buffer: c.buffer,
        type: c.type,
        bytesPerElement: c.elementSize,
        version: c.version
      });
      return;
    }
    c.isInterleavedBufferAttribute && (c = c.data);
    const f = r.get(c);
    if (f === void 0)
      r.set(c, n(c, u));
    else if (f.version < c.version) {
      if (f.size !== c.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      i(f.buffer, c, u), f.version = c.version;
    }
  }
  return {
    get: o,
    remove: a,
    update: l
  };
}
class tt extends qt {
  constructor(e = 1, t = 1, r = 1, n = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: r,
      heightSegments: n
    };
    const i = e / 2, o = t / 2, a = Math.floor(r), l = Math.floor(n), c = a + 1, u = l + 1, f = e / a, h = t / l, d = [], _ = [], v = [], p = [];
    for (let m = 0; m < u; m++) {
      const y = m * h - o;
      for (let g = 0; g < c; g++) {
        const A = g * f - i;
        _.push(A, -y, 0), v.push(0, 0, 1), p.push(g / a), p.push(1 - m / l);
      }
    }
    for (let m = 0; m < l; m++)
      for (let y = 0; y < a; y++) {
        const g = y + c * m, A = y + c * (m + 1), w = y + 1 + c * (m + 1), T = y + 1 + c * m;
        d.push(g, A, T), d.push(A, w, T);
      }
    this.setIndex(d), this.setAttribute("position", new Ut(_, 3)), this.setAttribute("normal", new Ut(v, 3)), this.setAttribute("uv", new Ut(p, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new tt(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var ql = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Yl = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, jl = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, Kl = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Zl = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, Jl = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Ql = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, $l = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, ec = `#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, tc = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`, nc = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, ic = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, rc = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, sc = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, ac = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, oc = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, lc = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, cc = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, uc = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, fc = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, hc = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, dc = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`, pc = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`, mc = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, _c = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, vc = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, gc = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, xc = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, yc = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, bc = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Sc = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Mc = `
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`, Tc = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, Ec = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, wc = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, Ac = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Cc = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Rc = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Pc = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Dc = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Uc = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Lc = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, Fc = `#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`, Ic = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Nc = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Oc = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Bc = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, zc = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, Gc = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, kc = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Hc = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Vc = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Wc = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, Xc = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, qc = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, Yc = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, jc = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, Kc = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, Zc = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Jc = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`, Qc = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`, $c = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, eu = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, tu = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, nu = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, iu = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, ru = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, su = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, au = `#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, ou = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`, lu = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`, cu = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`, uu = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, fu = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, hu = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, du = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, pu = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, mu = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, _u = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, vu = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, gu = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, xu = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, yu = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, bu = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, Su = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Mu = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Tu = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Eu = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, wu = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Au = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Cu = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`, Ru = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Pu = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Du = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Uu = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Lu = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, Fu = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, Iu = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, Nu = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Ou = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Bu = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, zu = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, Gu = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, ku = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, Hu = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Vu = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Wu = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, Xu = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const qu = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, Yu = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, ju = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Ku = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Zu = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Ju = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Qu = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, $u = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`, ef = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, tf = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, nf = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, rf = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, sf = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, af = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, of = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, lf = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, cf = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, uf = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, ff = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, hf = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, df = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, pf = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, mf = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, _f = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, vf = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, gf = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, xf = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, yf = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, bf = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Sf = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Mf = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Tf = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Ef = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, wf = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Qe = {
  alphahash_fragment: ql,
  alphahash_pars_fragment: Yl,
  alphamap_fragment: jl,
  alphamap_pars_fragment: Kl,
  alphatest_fragment: Zl,
  alphatest_pars_fragment: Jl,
  aomap_fragment: Ql,
  aomap_pars_fragment: $l,
  batching_pars_vertex: ec,
  batching_vertex: tc,
  begin_vertex: nc,
  beginnormal_vertex: ic,
  bsdfs: rc,
  iridescence_fragment: sc,
  bumpmap_pars_fragment: ac,
  clipping_planes_fragment: oc,
  clipping_planes_pars_fragment: lc,
  clipping_planes_pars_vertex: cc,
  clipping_planes_vertex: uc,
  color_fragment: fc,
  color_pars_fragment: hc,
  color_pars_vertex: dc,
  color_vertex: pc,
  common: mc,
  cube_uv_reflection_fragment: _c,
  defaultnormal_vertex: vc,
  displacementmap_pars_vertex: gc,
  displacementmap_vertex: xc,
  emissivemap_fragment: yc,
  emissivemap_pars_fragment: bc,
  colorspace_fragment: Sc,
  colorspace_pars_fragment: Mc,
  envmap_fragment: Tc,
  envmap_common_pars_fragment: Ec,
  envmap_pars_fragment: wc,
  envmap_pars_vertex: Ac,
  envmap_physical_pars_fragment: zc,
  envmap_vertex: Cc,
  fog_vertex: Rc,
  fog_pars_vertex: Pc,
  fog_fragment: Dc,
  fog_pars_fragment: Uc,
  gradientmap_pars_fragment: Lc,
  lightmap_fragment: Fc,
  lightmap_pars_fragment: Ic,
  lights_lambert_fragment: Nc,
  lights_lambert_pars_fragment: Oc,
  lights_pars_begin: Bc,
  lights_toon_fragment: Gc,
  lights_toon_pars_fragment: kc,
  lights_phong_fragment: Hc,
  lights_phong_pars_fragment: Vc,
  lights_physical_fragment: Wc,
  lights_physical_pars_fragment: Xc,
  lights_fragment_begin: qc,
  lights_fragment_maps: Yc,
  lights_fragment_end: jc,
  logdepthbuf_fragment: Kc,
  logdepthbuf_pars_fragment: Zc,
  logdepthbuf_pars_vertex: Jc,
  logdepthbuf_vertex: Qc,
  map_fragment: $c,
  map_pars_fragment: eu,
  map_particle_fragment: tu,
  map_particle_pars_fragment: nu,
  metalnessmap_fragment: iu,
  metalnessmap_pars_fragment: ru,
  morphinstance_vertex: su,
  morphcolor_vertex: au,
  morphnormal_vertex: ou,
  morphtarget_pars_vertex: lu,
  morphtarget_vertex: cu,
  normal_fragment_begin: uu,
  normal_fragment_maps: fu,
  normal_pars_fragment: hu,
  normal_pars_vertex: du,
  normal_vertex: pu,
  normalmap_pars_fragment: mu,
  clearcoat_normal_fragment_begin: _u,
  clearcoat_normal_fragment_maps: vu,
  clearcoat_pars_fragment: gu,
  iridescence_pars_fragment: xu,
  opaque_fragment: yu,
  packing: bu,
  premultiplied_alpha_fragment: Su,
  project_vertex: Mu,
  dithering_fragment: Tu,
  dithering_pars_fragment: Eu,
  roughnessmap_fragment: wu,
  roughnessmap_pars_fragment: Au,
  shadowmap_pars_fragment: Cu,
  shadowmap_pars_vertex: Ru,
  shadowmap_vertex: Pu,
  shadowmask_pars_fragment: Du,
  skinbase_vertex: Uu,
  skinning_pars_vertex: Lu,
  skinning_vertex: Fu,
  skinnormal_vertex: Iu,
  specularmap_fragment: Nu,
  specularmap_pars_fragment: Ou,
  tonemapping_fragment: Bu,
  tonemapping_pars_fragment: zu,
  transmission_fragment: Gu,
  transmission_pars_fragment: ku,
  uv_pars_fragment: Hu,
  uv_pars_vertex: Vu,
  uv_vertex: Wu,
  worldpos_vertex: Xu,
  background_vert: qu,
  background_frag: Yu,
  backgroundCube_vert: ju,
  backgroundCube_frag: Ku,
  cube_vert: Zu,
  cube_frag: Ju,
  depth_vert: Qu,
  depth_frag: $u,
  distanceRGBA_vert: ef,
  distanceRGBA_frag: tf,
  equirect_vert: nf,
  equirect_frag: rf,
  linedashed_vert: sf,
  linedashed_frag: af,
  meshbasic_vert: of,
  meshbasic_frag: lf,
  meshlambert_vert: cf,
  meshlambert_frag: uf,
  meshmatcap_vert: ff,
  meshmatcap_frag: hf,
  meshnormal_vert: df,
  meshnormal_frag: pf,
  meshphong_vert: mf,
  meshphong_frag: _f,
  meshphysical_vert: vf,
  meshphysical_frag: gf,
  meshtoon_vert: xf,
  meshtoon_frag: yf,
  points_vert: bf,
  points_frag: Sf,
  shadow_vert: Mf,
  shadow_frag: Tf,
  sprite_vert: Ef,
  sprite_frag: wf
}, Re = {
  common: {
    diffuse: { value: /* @__PURE__ */ new me(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new $e() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new $e() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new $e() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new $e() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new $e() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new $e() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new $e() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new $e() },
    normalScale: { value: /* @__PURE__ */ new De(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new $e() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new $e() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new $e() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new $e() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new me(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new me(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new $e() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new $e() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new me(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new De(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new $e() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new $e() },
    alphaTest: { value: 0 }
  }
}, hn = {
  basic: {
    uniforms: /* @__PURE__ */ Dt([
      Re.common,
      Re.specularmap,
      Re.envmap,
      Re.aomap,
      Re.lightmap,
      Re.fog
    ]),
    vertexShader: Qe.meshbasic_vert,
    fragmentShader: Qe.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ Dt([
      Re.common,
      Re.specularmap,
      Re.envmap,
      Re.aomap,
      Re.lightmap,
      Re.emissivemap,
      Re.bumpmap,
      Re.normalmap,
      Re.displacementmap,
      Re.fog,
      Re.lights,
      {
        emissive: { value: /* @__PURE__ */ new me(0) }
      }
    ]),
    vertexShader: Qe.meshlambert_vert,
    fragmentShader: Qe.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ Dt([
      Re.common,
      Re.specularmap,
      Re.envmap,
      Re.aomap,
      Re.lightmap,
      Re.emissivemap,
      Re.bumpmap,
      Re.normalmap,
      Re.displacementmap,
      Re.fog,
      Re.lights,
      {
        emissive: { value: /* @__PURE__ */ new me(0) },
        specular: { value: /* @__PURE__ */ new me(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: Qe.meshphong_vert,
    fragmentShader: Qe.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ Dt([
      Re.common,
      Re.envmap,
      Re.aomap,
      Re.lightmap,
      Re.emissivemap,
      Re.bumpmap,
      Re.normalmap,
      Re.displacementmap,
      Re.roughnessmap,
      Re.metalnessmap,
      Re.fog,
      Re.lights,
      {
        emissive: { value: /* @__PURE__ */ new me(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
        // temporary
      }
    ]),
    vertexShader: Qe.meshphysical_vert,
    fragmentShader: Qe.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ Dt([
      Re.common,
      Re.aomap,
      Re.lightmap,
      Re.emissivemap,
      Re.bumpmap,
      Re.normalmap,
      Re.displacementmap,
      Re.gradientmap,
      Re.fog,
      Re.lights,
      {
        emissive: { value: /* @__PURE__ */ new me(0) }
      }
    ]),
    vertexShader: Qe.meshtoon_vert,
    fragmentShader: Qe.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ Dt([
      Re.common,
      Re.bumpmap,
      Re.normalmap,
      Re.displacementmap,
      Re.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Qe.meshmatcap_vert,
    fragmentShader: Qe.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ Dt([
      Re.points,
      Re.fog
    ]),
    vertexShader: Qe.points_vert,
    fragmentShader: Qe.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ Dt([
      Re.common,
      Re.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Qe.linedashed_vert,
    fragmentShader: Qe.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ Dt([
      Re.common,
      Re.displacementmap
    ]),
    vertexShader: Qe.depth_vert,
    fragmentShader: Qe.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ Dt([
      Re.common,
      Re.bumpmap,
      Re.normalmap,
      Re.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Qe.meshnormal_vert,
    fragmentShader: Qe.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ Dt([
      Re.sprite,
      Re.fog
    ]),
    vertexShader: Qe.sprite_vert,
    fragmentShader: Qe.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new $e() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Qe.background_vert,
    fragmentShader: Qe.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new $e() }
    },
    vertexShader: Qe.backgroundCube_vert,
    fragmentShader: Qe.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Qe.cube_vert,
    fragmentShader: Qe.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Qe.equirect_vert,
    fragmentShader: Qe.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ Dt([
      Re.common,
      Re.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new ne() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Qe.distanceRGBA_vert,
    fragmentShader: Qe.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ Dt([
      Re.lights,
      Re.fog,
      {
        color: { value: /* @__PURE__ */ new me(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Qe.shadow_vert,
    fragmentShader: Qe.shadow_frag
  }
};
hn.physical = {
  uniforms: /* @__PURE__ */ Dt([
    hn.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new $e() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new $e() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new De(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new $e() },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new $e() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new $e() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new me(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new $e() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new $e() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new $e() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new De() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new $e() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new me(0) },
      specularColor: { value: /* @__PURE__ */ new me(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new $e() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new $e() },
      anisotropyVector: { value: /* @__PURE__ */ new De() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new $e() }
    }
  ]),
  vertexShader: Qe.meshphysical_vert,
  fragmentShader: Qe.meshphysical_frag
};
const Ur = { r: 0, b: 0, g: 0 }, Gn = /* @__PURE__ */ new xn(), Af = /* @__PURE__ */ new ft();
function Cf(s, e, t, r, n, i, o) {
  const a = new me(0);
  let l = i === !0 ? 0 : 1, c, u, f = null, h = 0, d = null;
  function _(p, m) {
    let y = !1, g = m.isScene === !0 ? m.background : null;
    g && g.isTexture && (g = (m.backgroundBlurriness > 0 ? t : e).get(g)), g === null ? v(a, l) : g && g.isColor && (v(g, 1), y = !0);
    const A = s.xr.getEnvironmentBlendMode();
    A === "additive" ? r.buffers.color.setClear(0, 0, 0, 1, o) : A === "alpha-blend" && r.buffers.color.setClear(0, 0, 0, 0, o), (s.autoClear || y) && s.clear(s.autoClearColor, s.autoClearDepth, s.autoClearStencil), g && (g.isCubeTexture || g.mapping === 306) ? (u === void 0 && (u = new qe(
      new ir(1, 1, 1),
      new Je({
        name: "BackgroundCubeMaterial",
        uniforms: Ei(hn.backgroundCube.uniforms),
        vertexShader: hn.backgroundCube.vertexShader,
        fragmentShader: hn.backgroundCube.fragmentShader,
        side: 1,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), u.geometry.deleteAttribute("normal"), u.geometry.deleteAttribute("uv"), u.onBeforeRender = function(w, T, S) {
      this.matrixWorld.copyPosition(S.matrixWorld);
    }, Object.defineProperty(u.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), n.update(u)), Gn.copy(m.backgroundRotation), Gn.x *= -1, Gn.y *= -1, Gn.z *= -1, g.isCubeTexture && g.isRenderTargetTexture === !1 && (Gn.y *= -1, Gn.z *= -1), u.material.uniforms.envMap.value = g, u.material.uniforms.flipEnvMap.value = g.isCubeTexture && g.isRenderTargetTexture === !1 ? -1 : 1, u.material.uniforms.backgroundBlurriness.value = m.backgroundBlurriness, u.material.uniforms.backgroundIntensity.value = m.backgroundIntensity, u.material.uniforms.backgroundRotation.value.setFromMatrix4(Af.makeRotationFromEuler(Gn)), u.material.toneMapped = st.getTransfer(g.colorSpace) !== lt, (f !== g || h !== g.version || d !== s.toneMapping) && (u.material.needsUpdate = !0, f = g, h = g.version, d = s.toneMapping), u.layers.enableAll(), p.unshift(u, u.geometry, u.material, 0, 0, null)) : g && g.isTexture && (c === void 0 && (c = new qe(
      new tt(2, 2),
      new Je({
        name: "BackgroundMaterial",
        uniforms: Ei(hn.background.uniforms),
        vertexShader: hn.background.vertexShader,
        fragmentShader: hn.background.fragmentShader,
        side: 0,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), n.update(c)), c.material.uniforms.t2D.value = g, c.material.uniforms.backgroundIntensity.value = m.backgroundIntensity, c.material.toneMapped = st.getTransfer(g.colorSpace) !== lt, g.matrixAutoUpdate === !0 && g.updateMatrix(), c.material.uniforms.uvTransform.value.copy(g.matrix), (f !== g || h !== g.version || d !== s.toneMapping) && (c.material.needsUpdate = !0, f = g, h = g.version, d = s.toneMapping), c.layers.enableAll(), p.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function v(p, m) {
    p.getRGB(Ur, Wo(s)), r.buffers.color.setClear(Ur.r, Ur.g, Ur.b, m, o);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(p, m = 1) {
      a.set(p), l = m, v(a, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(p) {
      l = p, v(a, l);
    },
    render: _
  };
}
function Rf(s, e, t, r) {
  const n = s.getParameter(s.MAX_VERTEX_ATTRIBS), i = r.isWebGL2 ? null : e.get("OES_vertex_array_object"), o = r.isWebGL2 || i !== null, a = {}, l = p(null);
  let c = l, u = !1;
  function f(P, W, O, Y, b) {
    let G = !1;
    if (o) {
      const X = v(Y, O, W);
      c !== X && (c = X, d(c.object)), G = m(P, Y, O, b), G && y(P, Y, O, b);
    } else {
      const X = W.wireframe === !0;
      (c.geometry !== Y.id || c.program !== O.id || c.wireframe !== X) && (c.geometry = Y.id, c.program = O.id, c.wireframe = X, G = !0);
    }
    b !== null && t.update(b, s.ELEMENT_ARRAY_BUFFER), (G || u) && (u = !1, C(P, W, O, Y), b !== null && s.bindBuffer(s.ELEMENT_ARRAY_BUFFER, t.get(b).buffer));
  }
  function h() {
    return r.isWebGL2 ? s.createVertexArray() : i.createVertexArrayOES();
  }
  function d(P) {
    return r.isWebGL2 ? s.bindVertexArray(P) : i.bindVertexArrayOES(P);
  }
  function _(P) {
    return r.isWebGL2 ? s.deleteVertexArray(P) : i.deleteVertexArrayOES(P);
  }
  function v(P, W, O) {
    const Y = O.wireframe === !0;
    let b = a[P.id];
    b === void 0 && (b = {}, a[P.id] = b);
    let G = b[W.id];
    G === void 0 && (G = {}, b[W.id] = G);
    let X = G[Y];
    return X === void 0 && (X = p(h()), G[Y] = X), X;
  }
  function p(P) {
    const W = [], O = [], Y = [];
    for (let b = 0; b < n; b++)
      W[b] = 0, O[b] = 0, Y[b] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: W,
      enabledAttributes: O,
      attributeDivisors: Y,
      object: P,
      attributes: {},
      index: null
    };
  }
  function m(P, W, O, Y) {
    const b = c.attributes, G = W.attributes;
    let X = 0;
    const U = O.getAttributes();
    for (const V in U)
      if (U[V].location >= 0) {
        const I = b[V];
        let B = G[V];
        if (B === void 0 && (V === "instanceMatrix" && P.instanceMatrix && (B = P.instanceMatrix), V === "instanceColor" && P.instanceColor && (B = P.instanceColor)), I === void 0 || I.attribute !== B || B && I.data !== B.data) return !0;
        X++;
      }
    return c.attributesNum !== X || c.index !== Y;
  }
  function y(P, W, O, Y) {
    const b = {}, G = W.attributes;
    let X = 0;
    const U = O.getAttributes();
    for (const V in U)
      if (U[V].location >= 0) {
        let I = G[V];
        I === void 0 && (V === "instanceMatrix" && P.instanceMatrix && (I = P.instanceMatrix), V === "instanceColor" && P.instanceColor && (I = P.instanceColor));
        const B = {};
        B.attribute = I, I && I.data && (B.data = I.data), b[V] = B, X++;
      }
    c.attributes = b, c.attributesNum = X, c.index = Y;
  }
  function g() {
    const P = c.newAttributes;
    for (let W = 0, O = P.length; W < O; W++)
      P[W] = 0;
  }
  function A(P) {
    w(P, 0);
  }
  function w(P, W) {
    const O = c.newAttributes, Y = c.enabledAttributes, b = c.attributeDivisors;
    O[P] = 1, Y[P] === 0 && (s.enableVertexAttribArray(P), Y[P] = 1), b[P] !== W && ((r.isWebGL2 ? s : e.get("ANGLE_instanced_arrays"))[r.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](P, W), b[P] = W);
  }
  function T() {
    const P = c.newAttributes, W = c.enabledAttributes;
    for (let O = 0, Y = W.length; O < Y; O++)
      W[O] !== P[O] && (s.disableVertexAttribArray(O), W[O] = 0);
  }
  function S(P, W, O, Y, b, G, X) {
    X === !0 ? s.vertexAttribIPointer(P, W, O, b, G) : s.vertexAttribPointer(P, W, O, Y, b, G);
  }
  function C(P, W, O, Y) {
    if (r.isWebGL2 === !1 && (P.isInstancedMesh || Y.isInstancedBufferGeometry) && e.get("ANGLE_instanced_arrays") === null)
      return;
    g();
    const b = Y.attributes, G = O.getAttributes(), X = W.defaultAttributeValues;
    for (const U in G) {
      const V = G[U];
      if (V.location >= 0) {
        let K = b[U];
        if (K === void 0 && (U === "instanceMatrix" && P.instanceMatrix && (K = P.instanceMatrix), U === "instanceColor" && P.instanceColor && (K = P.instanceColor)), K !== void 0) {
          const I = K.normalized, B = K.itemSize, Q = t.get(K);
          if (Q === void 0) continue;
          const ee = Q.buffer, q = Q.type, te = Q.bytesPerElement, de = r.isWebGL2 === !0 && (q === s.INT || q === s.UNSIGNED_INT || K.gpuType === 1013);
          if (K.isInterleavedBufferAttribute) {
            const le = K.data, F = le.stride, Ue = K.offset;
            if (le.isInstancedInterleavedBuffer) {
              for (let _e = 0; _e < V.locationSize; _e++)
                w(V.location + _e, le.meshPerAttribute);
              P.isInstancedMesh !== !0 && Y._maxInstanceCount === void 0 && (Y._maxInstanceCount = le.meshPerAttribute * le.count);
            } else
              for (let _e = 0; _e < V.locationSize; _e++)
                A(V.location + _e);
            s.bindBuffer(s.ARRAY_BUFFER, ee);
            for (let _e = 0; _e < V.locationSize; _e++)
              S(
                V.location + _e,
                B / V.locationSize,
                q,
                I,
                F * te,
                (Ue + B / V.locationSize * _e) * te,
                de
              );
          } else {
            if (K.isInstancedBufferAttribute) {
              for (let le = 0; le < V.locationSize; le++)
                w(V.location + le, K.meshPerAttribute);
              P.isInstancedMesh !== !0 && Y._maxInstanceCount === void 0 && (Y._maxInstanceCount = K.meshPerAttribute * K.count);
            } else
              for (let le = 0; le < V.locationSize; le++)
                A(V.location + le);
            s.bindBuffer(s.ARRAY_BUFFER, ee);
            for (let le = 0; le < V.locationSize; le++)
              S(
                V.location + le,
                B / V.locationSize,
                q,
                I,
                B * te,
                B / V.locationSize * le * te,
                de
              );
          }
        } else if (X !== void 0) {
          const I = X[U];
          if (I !== void 0)
            switch (I.length) {
              case 2:
                s.vertexAttrib2fv(V.location, I);
                break;
              case 3:
                s.vertexAttrib3fv(V.location, I);
                break;
              case 4:
                s.vertexAttrib4fv(V.location, I);
                break;
              default:
                s.vertexAttrib1fv(V.location, I);
            }
        }
      }
    }
    T();
  }
  function z() {
    L();
    for (const P in a) {
      const W = a[P];
      for (const O in W) {
        const Y = W[O];
        for (const b in Y)
          _(Y[b].object), delete Y[b];
        delete W[O];
      }
      delete a[P];
    }
  }
  function x(P) {
    if (a[P.id] === void 0) return;
    const W = a[P.id];
    for (const O in W) {
      const Y = W[O];
      for (const b in Y)
        _(Y[b].object), delete Y[b];
      delete W[O];
    }
    delete a[P.id];
  }
  function R(P) {
    for (const W in a) {
      const O = a[W];
      if (O[P.id] === void 0) continue;
      const Y = O[P.id];
      for (const b in Y)
        _(Y[b].object), delete Y[b];
      delete O[P.id];
    }
  }
  function L() {
    k(), u = !0, c !== l && (c = l, d(c.object));
  }
  function k() {
    l.geometry = null, l.program = null, l.wireframe = !1;
  }
  return {
    setup: f,
    reset: L,
    resetDefaultState: k,
    dispose: z,
    releaseStatesOfGeometry: x,
    releaseStatesOfProgram: R,
    initAttributes: g,
    enableAttribute: A,
    disableUnusedAttributes: T
  };
}
function Pf(s, e, t, r) {
  const n = r.isWebGL2;
  let i;
  function o(u) {
    i = u;
  }
  function a(u, f) {
    s.drawArrays(i, u, f), t.update(f, i, 1);
  }
  function l(u, f, h) {
    if (h === 0) return;
    let d, _;
    if (n)
      d = s, _ = "drawArraysInstanced";
    else if (d = e.get("ANGLE_instanced_arrays"), _ = "drawArraysInstancedANGLE", d === null) {
      console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    d[_](i, u, f, h), t.update(f, i, h);
  }
  function c(u, f, h) {
    if (h === 0) return;
    const d = e.get("WEBGL_multi_draw");
    if (d === null)
      for (let _ = 0; _ < h; _++)
        this.render(u[_], f[_]);
    else {
      d.multiDrawArraysWEBGL(i, u, 0, f, 0, h);
      let _ = 0;
      for (let v = 0; v < h; v++)
        _ += f[v];
      t.update(_, i, 1);
    }
  }
  this.setMode = o, this.render = a, this.renderInstances = l, this.renderMultiDraw = c;
}
function Df(s, e, t) {
  let r;
  function n() {
    if (r !== void 0) return r;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const S = e.get("EXT_texture_filter_anisotropic");
      r = s.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      r = 0;
    return r;
  }
  function i(S) {
    if (S === "highp") {
      if (s.getShaderPrecisionFormat(s.VERTEX_SHADER, s.HIGH_FLOAT).precision > 0 && s.getShaderPrecisionFormat(s.FRAGMENT_SHADER, s.HIGH_FLOAT).precision > 0)
        return "highp";
      S = "mediump";
    }
    return S === "mediump" && s.getShaderPrecisionFormat(s.VERTEX_SHADER, s.MEDIUM_FLOAT).precision > 0 && s.getShaderPrecisionFormat(s.FRAGMENT_SHADER, s.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  const o = typeof WebGL2RenderingContext < "u" && s.constructor.name === "WebGL2RenderingContext";
  let a = t.precision !== void 0 ? t.precision : "highp";
  const l = i(a);
  l !== a && (console.warn("THREE.WebGLRenderer:", a, "not supported, using", l, "instead."), a = l);
  const c = o || e.has("WEBGL_draw_buffers"), u = t.logarithmicDepthBuffer === !0, f = s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS), h = s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS), d = s.getParameter(s.MAX_TEXTURE_SIZE), _ = s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE), v = s.getParameter(s.MAX_VERTEX_ATTRIBS), p = s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS), m = s.getParameter(s.MAX_VARYING_VECTORS), y = s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS), g = h > 0, A = o || e.has("OES_texture_float"), w = g && A, T = o ? s.getParameter(s.MAX_SAMPLES) : 0;
  return {
    isWebGL2: o,
    drawBuffers: c,
    getMaxAnisotropy: n,
    getMaxPrecision: i,
    precision: a,
    logarithmicDepthBuffer: u,
    maxTextures: f,
    maxVertexTextures: h,
    maxTextureSize: d,
    maxCubemapSize: _,
    maxAttributes: v,
    maxVertexUniforms: p,
    maxVaryings: m,
    maxFragmentUniforms: y,
    vertexTextures: g,
    floatFragmentTextures: A,
    floatVertexTextures: w,
    maxSamples: T
  };
}
function Uf(s) {
  const e = this;
  let t = null, r = 0, n = !1, i = !1;
  const o = new qn(), a = new $e(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(f, h) {
    const d = f.length !== 0 || h || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    r !== 0 || n;
    return n = h, r = f.length, d;
  }, this.beginShadows = function() {
    i = !0, u(null);
  }, this.endShadows = function() {
    i = !1;
  }, this.setGlobalState = function(f, h) {
    t = u(f, h, 0);
  }, this.setState = function(f, h, d) {
    const _ = f.clippingPlanes, v = f.clipIntersection, p = f.clipShadows, m = s.get(f);
    if (!n || _ === null || _.length === 0 || i && !p)
      i ? u(null) : c();
    else {
      const y = i ? 0 : r, g = y * 4;
      let A = m.clippingState || null;
      l.value = A, A = u(_, h, g, d);
      for (let w = 0; w !== g; ++w)
        A[w] = t[w];
      m.clippingState = A, this.numIntersection = v ? this.numPlanes : 0, this.numPlanes += y;
    }
  };
  function c() {
    l.value !== t && (l.value = t, l.needsUpdate = r > 0), e.numPlanes = r, e.numIntersection = 0;
  }
  function u(f, h, d, _) {
    const v = f !== null ? f.length : 0;
    let p = null;
    if (v !== 0) {
      if (p = l.value, _ !== !0 || p === null) {
        const m = d + v * 4, y = h.matrixWorldInverse;
        a.getNormalMatrix(y), (p === null || p.length < m) && (p = new Float32Array(m));
        for (let g = 0, A = d; g !== v; ++g, A += 4)
          o.copy(f[g]).applyMatrix4(y, a), o.normal.toArray(p, A), p[A + 3] = o.constant;
      }
      l.value = p, l.needsUpdate = !0;
    }
    return e.numPlanes = v, e.numIntersection = 0, p;
  }
}
function Lf(s) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(o, a) {
    return a === 303 ? o.mapping = 301 : a === 304 && (o.mapping = 302), o;
  }
  function r(o) {
    if (o && o.isTexture) {
      const a = o.mapping;
      if (a === 303 || a === 304)
        if (e.has(o)) {
          const l = e.get(o).texture;
          return t(l, o.mapping);
        } else {
          const l = o.image;
          if (l && l.height > 0) {
            const c = new Hl(l.height);
            return c.fromEquirectangularTexture(s, o), e.set(o, c), o.addEventListener("dispose", n), t(c.texture, o.mapping);
          } else
            return null;
        }
    }
    return o;
  }
  function n(o) {
    const a = o.target;
    a.removeEventListener("dispose", n);
    const l = e.get(a);
    l !== void 0 && (e.delete(a), l.dispose());
  }
  function i() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: r,
    dispose: i
  };
}
class nt extends Xo {
  constructor(e = -1, t = 1, r = 1, n = -1, i = 0.1, o = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = r, this.bottom = n, this.near = i, this.far = o, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, r, n, i, o) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = r, this.view.offsetY = n, this.view.width = i, this.view.height = o, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), r = (this.right + this.left) / 2, n = (this.top + this.bottom) / 2;
    let i = r - e, o = r + e, a = n + t, l = n - t;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, u = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      i += c * this.view.offsetX, o = i + c * this.view.width, a -= u * this.view.offsetY, l = a - u * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(i, o, a, l, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
const Si = 4, Ba = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], jn = 20, Ds = /* @__PURE__ */ new nt(), za = /* @__PURE__ */ new me();
let Us = null, Ls = 0, Fs = 0;
const Yn = (1 + Math.sqrt(5)) / 2, mi = 1 / Yn, Ga = [
  /* @__PURE__ */ new ne(1, 1, 1),
  /* @__PURE__ */ new ne(-1, 1, 1),
  /* @__PURE__ */ new ne(1, 1, -1),
  /* @__PURE__ */ new ne(-1, 1, -1),
  /* @__PURE__ */ new ne(0, Yn, mi),
  /* @__PURE__ */ new ne(0, Yn, -mi),
  /* @__PURE__ */ new ne(mi, 0, Yn),
  /* @__PURE__ */ new ne(-mi, 0, Yn),
  /* @__PURE__ */ new ne(Yn, mi, 0),
  /* @__PURE__ */ new ne(-Yn, mi, 0)
];
class ka {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(e, t = 0, r = 0.1, n = 100) {
    Us = this._renderer.getRenderTarget(), Ls = this._renderer.getActiveCubeFace(), Fs = this._renderer.getActiveMipmapLevel(), this._setSize(256);
    const i = this._allocateTargets();
    return i.depthBuffer = !0, this._sceneToCubeUV(e, r, n, i), t > 0 && this._blur(i, 0, 0, t), this._applyPMREM(i), this._cleanup(i), i;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported equirectangular image size is 64 x 32.
   */
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported cube size is 16 x 16.
   */
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = Wa(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = Va(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++)
      this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(Us, Ls, Fs), e.scissorTest = !1, Lr(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), Us = this._renderer.getRenderTarget(), Ls = this._renderer.getActiveCubeFace(), Fs = this._renderer.getActiveMipmapLevel();
    const r = t || this._allocateTargets();
    return this._textureToCubeUV(e, r), this._applyPMREM(r), this._cleanup(r), r;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, r = {
      magFilter: 1006,
      minFilter: 1006,
      generateMipmaps: !1,
      type: 1016,
      format: 1023,
      colorSpace: Un,
      depthBuffer: !1
    }, n = Ha(e, t, r);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Ha(e, t, r);
      const { _lodMax: i } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = Ff(i)), this._blurMaterial = If(i, e, t);
    }
    return n;
  }
  _compileMaterial(e) {
    const t = new qe(this._lodPlanes[0], e);
    this._renderer.compile(t, Ds);
  }
  _sceneToCubeUV(e, t, r, n) {
    const a = new Wt(90, 1, t, r), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], u = this._renderer, f = u.autoClear, h = u.toneMapping;
    u.getClearColor(za), u.toneMapping = 0, u.autoClear = !1;
    const d = new Jn({
      name: "PMREM.Background",
      side: 1,
      depthWrite: !1,
      depthTest: !1
    }), _ = new qe(new ir(), d);
    let v = !1;
    const p = e.background;
    p ? p.isColor && (d.color.copy(p), e.background = null, v = !0) : (d.color.copy(za), v = !0);
    for (let m = 0; m < 6; m++) {
      const y = m % 3;
      y === 0 ? (a.up.set(0, l[m], 0), a.lookAt(c[m], 0, 0)) : y === 1 ? (a.up.set(0, 0, l[m]), a.lookAt(0, c[m], 0)) : (a.up.set(0, l[m], 0), a.lookAt(0, 0, c[m]));
      const g = this._cubeSize;
      Lr(n, y * g, m > 2 ? g : 0, g, g), u.setRenderTarget(n), v && u.render(_, a), u.render(e, a);
    }
    _.geometry.dispose(), _.material.dispose(), u.toneMapping = h, u.autoClear = f, e.background = p;
  }
  _textureToCubeUV(e, t) {
    const r = this._renderer, n = e.mapping === 301 || e.mapping === 302;
    n ? (this._cubemapMaterial === null && (this._cubemapMaterial = Wa()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Va());
    const i = n ? this._cubemapMaterial : this._equirectMaterial, o = new qe(this._lodPlanes[0], i), a = i.uniforms;
    a.envMap.value = e;
    const l = this._cubeSize;
    Lr(t, 0, 0, 3 * l, 2 * l), r.setRenderTarget(t), r.render(o, Ds);
  }
  _applyPMREM(e) {
    const t = this._renderer, r = t.autoClear;
    t.autoClear = !1;
    for (let n = 1; n < this._lodPlanes.length; n++) {
      const i = Math.sqrt(this._sigmas[n] * this._sigmas[n] - this._sigmas[n - 1] * this._sigmas[n - 1]), o = Ga[(n - 1) % Ga.length];
      this._blur(e, n - 1, n, i, o);
    }
    t.autoClear = r;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(e, t, r, n, i) {
    const o = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      o,
      t,
      r,
      n,
      "latitudinal",
      i
    ), this._halfBlur(
      o,
      e,
      r,
      r,
      n,
      "longitudinal",
      i
    );
  }
  _halfBlur(e, t, r, n, i, o, a) {
    const l = this._renderer, c = this._blurMaterial;
    o !== "latitudinal" && o !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const u = 3, f = new qe(this._lodPlanes[n], c), h = c.uniforms, d = this._sizeLods[r] - 1, _ = isFinite(i) ? Math.PI / (2 * d) : 2 * Math.PI / (2 * jn - 1), v = i / _, p = isFinite(i) ? 1 + Math.floor(u * v) : jn;
    p > jn && console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${jn}`);
    const m = [];
    let y = 0;
    for (let S = 0; S < jn; ++S) {
      const C = S / v, z = Math.exp(-C * C / 2);
      m.push(z), S === 0 ? y += z : S < p && (y += 2 * z);
    }
    for (let S = 0; S < m.length; S++)
      m[S] = m[S] / y;
    h.envMap.value = e.texture, h.samples.value = p, h.weights.value = m, h.latitudinal.value = o === "latitudinal", a && (h.poleAxis.value = a);
    const { _lodMax: g } = this;
    h.dTheta.value = _, h.mipInt.value = g - r;
    const A = this._sizeLods[n], w = 3 * A * (n > g - Si ? n - g + Si : 0), T = 4 * (this._cubeSize - A);
    Lr(t, w, T, 3 * A, 2 * A), l.setRenderTarget(t), l.render(f, Ds);
  }
}
function Ff(s) {
  const e = [], t = [], r = [];
  let n = s;
  const i = s - Si + 1 + Ba.length;
  for (let o = 0; o < i; o++) {
    const a = Math.pow(2, n);
    t.push(a);
    let l = 1 / a;
    o > s - Si ? l = Ba[o - s + Si - 1] : o === 0 && (l = 0), r.push(l);
    const c = 1 / (a - 2), u = -c, f = 1 + c, h = [u, u, f, u, f, f, u, u, f, f, u, f], d = 6, _ = 6, v = 3, p = 2, m = 1, y = new Float32Array(v * _ * d), g = new Float32Array(p * _ * d), A = new Float32Array(m * _ * d);
    for (let T = 0; T < d; T++) {
      const S = T % 3 * 2 / 3 - 1, C = T > 2 ? 0 : -1, z = [
        S,
        C,
        0,
        S + 2 / 3,
        C,
        0,
        S + 2 / 3,
        C + 1,
        0,
        S,
        C,
        0,
        S + 2 / 3,
        C + 1,
        0,
        S,
        C + 1,
        0
      ];
      y.set(z, v * _ * T), g.set(h, p * _ * T);
      const x = [T, T, T, T, T, T];
      A.set(x, m * _ * T);
    }
    const w = new qt();
    w.setAttribute("position", new Xt(y, v)), w.setAttribute("uv", new Xt(g, p)), w.setAttribute("faceIndex", new Xt(A, m)), e.push(w), n > Si && n--;
  }
  return { lodPlanes: e, sizeLods: t, sigmas: r };
}
function Ha(s, e, t) {
  const r = new gt(s, e, t);
  return r.texture.mapping = 306, r.texture.name = "PMREM.cubeUv", r.scissorTest = !0, r;
}
function Lr(s, e, t, r, n) {
  s.viewport.set(e, t, r, n), s.scissor.set(e, t, r, n);
}
function If(s, e, t) {
  const r = new Float32Array(jn), n = new ne(0, 1, 0);
  return new Je({
    name: "SphericalGaussianBlur",
    defines: {
      n: jn,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${s}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: r },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: n }
    },
    vertexShader: Qs(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Va() {
  return new Je({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: Qs(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Wa() {
  return new Je({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Qs(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Qs() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function Nf(s) {
  let e = /* @__PURE__ */ new WeakMap(), t = null;
  function r(a) {
    if (a && a.isTexture) {
      const l = a.mapping, c = l === 303 || l === 304, u = l === 301 || l === 302;
      if (c || u)
        if (a.isRenderTargetTexture && a.needsPMREMUpdate === !0) {
          a.needsPMREMUpdate = !1;
          let f = e.get(a);
          return t === null && (t = new ka(s)), f = c ? t.fromEquirectangular(a, f) : t.fromCubemap(a, f), e.set(a, f), f.texture;
        } else {
          if (e.has(a))
            return e.get(a).texture;
          {
            const f = a.image;
            if (c && f && f.height > 0 || u && f && n(f)) {
              t === null && (t = new ka(s));
              const h = c ? t.fromEquirectangular(a) : t.fromCubemap(a);
              return e.set(a, h), a.addEventListener("dispose", i), h.texture;
            } else
              return null;
          }
        }
    }
    return a;
  }
  function n(a) {
    let l = 0;
    const c = 6;
    for (let u = 0; u < c; u++)
      a[u] !== void 0 && l++;
    return l === c;
  }
  function i(a) {
    const l = a.target;
    l.removeEventListener("dispose", i);
    const c = e.get(l);
    c !== void 0 && (e.delete(l), c.dispose());
  }
  function o() {
    e = /* @__PURE__ */ new WeakMap(), t !== null && (t.dispose(), t = null);
  }
  return {
    get: r,
    dispose: o
  };
}
function Of(s) {
  const e = {};
  function t(r) {
    if (e[r] !== void 0)
      return e[r];
    let n;
    switch (r) {
      case "WEBGL_depth_texture":
        n = s.getExtension("WEBGL_depth_texture") || s.getExtension("MOZ_WEBGL_depth_texture") || s.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        n = s.getExtension("EXT_texture_filter_anisotropic") || s.getExtension("MOZ_EXT_texture_filter_anisotropic") || s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        n = s.getExtension("WEBGL_compressed_texture_s3tc") || s.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        n = s.getExtension("WEBGL_compressed_texture_pvrtc") || s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        n = s.getExtension(r);
    }
    return e[r] = n, n;
  }
  return {
    has: function(r) {
      return t(r) !== null;
    },
    init: function(r) {
      r.isWebGL2 ? (t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance")) : (t("WEBGL_depth_texture"), t("OES_texture_float"), t("OES_texture_half_float"), t("OES_texture_half_float_linear"), t("OES_standard_derivatives"), t("OES_element_index_uint"), t("OES_vertex_array_object"), t("ANGLE_instanced_arrays")), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture");
    },
    get: function(r) {
      const n = t(r);
      return n === null && console.warn("THREE.WebGLRenderer: " + r + " extension not supported."), n;
    }
  };
}
function Bf(s, e, t, r) {
  const n = {}, i = /* @__PURE__ */ new WeakMap();
  function o(f) {
    const h = f.target;
    h.index !== null && e.remove(h.index);
    for (const _ in h.attributes)
      e.remove(h.attributes[_]);
    for (const _ in h.morphAttributes) {
      const v = h.morphAttributes[_];
      for (let p = 0, m = v.length; p < m; p++)
        e.remove(v[p]);
    }
    h.removeEventListener("dispose", o), delete n[h.id];
    const d = i.get(h);
    d && (e.remove(d), i.delete(h)), r.releaseStatesOfGeometry(h), h.isInstancedBufferGeometry === !0 && delete h._maxInstanceCount, t.memory.geometries--;
  }
  function a(f, h) {
    return n[h.id] === !0 || (h.addEventListener("dispose", o), n[h.id] = !0, t.memory.geometries++), h;
  }
  function l(f) {
    const h = f.attributes;
    for (const _ in h)
      e.update(h[_], s.ARRAY_BUFFER);
    const d = f.morphAttributes;
    for (const _ in d) {
      const v = d[_];
      for (let p = 0, m = v.length; p < m; p++)
        e.update(v[p], s.ARRAY_BUFFER);
    }
  }
  function c(f) {
    const h = [], d = f.index, _ = f.attributes.position;
    let v = 0;
    if (d !== null) {
      const y = d.array;
      v = d.version;
      for (let g = 0, A = y.length; g < A; g += 3) {
        const w = y[g + 0], T = y[g + 1], S = y[g + 2];
        h.push(w, T, T, S, S, w);
      }
    } else if (_ !== void 0) {
      const y = _.array;
      v = _.version;
      for (let g = 0, A = y.length / 3 - 1; g < A; g += 3) {
        const w = g + 0, T = g + 1, S = g + 2;
        h.push(w, T, T, S, S, w);
      }
    } else
      return;
    const p = new (Io(h) ? Vo : Ho)(h, 1);
    p.version = v;
    const m = i.get(f);
    m && e.remove(m), i.set(f, p);
  }
  function u(f) {
    const h = i.get(f);
    if (h) {
      const d = f.index;
      d !== null && h.version < d.version && c(f);
    } else
      c(f);
    return i.get(f);
  }
  return {
    get: a,
    update: l,
    getWireframeAttribute: u
  };
}
function zf(s, e, t, r) {
  const n = r.isWebGL2;
  let i;
  function o(d) {
    i = d;
  }
  let a, l;
  function c(d) {
    a = d.type, l = d.bytesPerElement;
  }
  function u(d, _) {
    s.drawElements(i, _, a, d * l), t.update(_, i, 1);
  }
  function f(d, _, v) {
    if (v === 0) return;
    let p, m;
    if (n)
      p = s, m = "drawElementsInstanced";
    else if (p = e.get("ANGLE_instanced_arrays"), m = "drawElementsInstancedANGLE", p === null) {
      console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    p[m](i, _, a, d * l, v), t.update(_, i, v);
  }
  function h(d, _, v) {
    if (v === 0) return;
    const p = e.get("WEBGL_multi_draw");
    if (p === null)
      for (let m = 0; m < v; m++)
        this.render(d[m] / l, _[m]);
    else {
      p.multiDrawElementsWEBGL(i, _, 0, a, d, 0, v);
      let m = 0;
      for (let y = 0; y < v; y++)
        m += _[y];
      t.update(m, i, 1);
    }
  }
  this.setMode = o, this.setIndex = c, this.render = u, this.renderInstances = f, this.renderMultiDraw = h;
}
function Gf(s) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function r(i, o, a) {
    switch (t.calls++, o) {
      case s.TRIANGLES:
        t.triangles += a * (i / 3);
        break;
      case s.LINES:
        t.lines += a * (i / 2);
        break;
      case s.LINE_STRIP:
        t.lines += a * (i - 1);
        break;
      case s.LINE_LOOP:
        t.lines += a * i;
        break;
      case s.POINTS:
        t.points += a * i;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", o);
        break;
    }
  }
  function n() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: n,
    update: r
  };
}
function kf(s, e) {
  return s[0] - e[0];
}
function Hf(s, e) {
  return Math.abs(e[1]) - Math.abs(s[1]);
}
function Vf(s, e, t) {
  const r = {}, n = new Float32Array(8), i = /* @__PURE__ */ new WeakMap(), o = new vt(), a = [];
  for (let c = 0; c < 8; c++)
    a[c] = [c, 0];
  function l(c, u, f) {
    const h = c.morphTargetInfluences;
    if (e.isWebGL2 === !0) {
      const d = u.morphAttributes.position || u.morphAttributes.normal || u.morphAttributes.color, _ = d !== void 0 ? d.length : 0;
      let v = i.get(u);
      if (v === void 0 || v.count !== _) {
        let L = function() {
          x.dispose(), i.delete(u), u.removeEventListener("dispose", L);
        };
        v !== void 0 && v.texture.dispose();
        const p = u.morphAttributes.position !== void 0, m = u.morphAttributes.normal !== void 0, y = u.morphAttributes.color !== void 0, g = u.morphAttributes.position || [], A = u.morphAttributes.normal || [], w = u.morphAttributes.color || [];
        let T = 0;
        p === !0 && (T = 1), m === !0 && (T = 2), y === !0 && (T = 3);
        let S = u.attributes.position.count * T, C = 1;
        S > e.maxTextureSize && (C = Math.ceil(S / e.maxTextureSize), S = e.maxTextureSize);
        const z = new Float32Array(S * C * 4 * _), x = new Bo(z, S, C, _);
        x.type = 1015, x.needsUpdate = !0;
        const R = T * 4;
        for (let k = 0; k < _; k++) {
          const P = g[k], W = A[k], O = w[k], Y = S * C * 4 * k;
          for (let b = 0; b < P.count; b++) {
            const G = b * R;
            p === !0 && (o.fromBufferAttribute(P, b), z[Y + G + 0] = o.x, z[Y + G + 1] = o.y, z[Y + G + 2] = o.z, z[Y + G + 3] = 0), m === !0 && (o.fromBufferAttribute(W, b), z[Y + G + 4] = o.x, z[Y + G + 5] = o.y, z[Y + G + 6] = o.z, z[Y + G + 7] = 0), y === !0 && (o.fromBufferAttribute(O, b), z[Y + G + 8] = o.x, z[Y + G + 9] = o.y, z[Y + G + 10] = o.z, z[Y + G + 11] = O.itemSize === 4 ? o.w : 1);
          }
        }
        v = {
          count: _,
          texture: x,
          size: new De(S, C)
        }, i.set(u, v), u.addEventListener("dispose", L);
      }
      if (c.isInstancedMesh === !0 && c.morphTexture !== null)
        f.getUniforms().setValue(s, "morphTexture", c.morphTexture, t);
      else {
        let p = 0;
        for (let y = 0; y < h.length; y++)
          p += h[y];
        const m = u.morphTargetsRelative ? 1 : 1 - p;
        f.getUniforms().setValue(s, "morphTargetBaseInfluence", m), f.getUniforms().setValue(s, "morphTargetInfluences", h);
      }
      f.getUniforms().setValue(s, "morphTargetsTexture", v.texture, t), f.getUniforms().setValue(s, "morphTargetsTextureSize", v.size);
    } else {
      const d = h === void 0 ? 0 : h.length;
      let _ = r[u.id];
      if (_ === void 0 || _.length !== d) {
        _ = [];
        for (let g = 0; g < d; g++)
          _[g] = [g, 0];
        r[u.id] = _;
      }
      for (let g = 0; g < d; g++) {
        const A = _[g];
        A[0] = g, A[1] = h[g];
      }
      _.sort(Hf);
      for (let g = 0; g < 8; g++)
        g < d && _[g][1] ? (a[g][0] = _[g][0], a[g][1] = _[g][1]) : (a[g][0] = Number.MAX_SAFE_INTEGER, a[g][1] = 0);
      a.sort(kf);
      const v = u.morphAttributes.position, p = u.morphAttributes.normal;
      let m = 0;
      for (let g = 0; g < 8; g++) {
        const A = a[g], w = A[0], T = A[1];
        w !== Number.MAX_SAFE_INTEGER && T ? (v && u.getAttribute("morphTarget" + g) !== v[w] && u.setAttribute("morphTarget" + g, v[w]), p && u.getAttribute("morphNormal" + g) !== p[w] && u.setAttribute("morphNormal" + g, p[w]), n[g] = T, m += T) : (v && u.hasAttribute("morphTarget" + g) === !0 && u.deleteAttribute("morphTarget" + g), p && u.hasAttribute("morphNormal" + g) === !0 && u.deleteAttribute("morphNormal" + g), n[g] = 0);
      }
      const y = u.morphTargetsRelative ? 1 : 1 - m;
      f.getUniforms().setValue(s, "morphTargetBaseInfluence", y), f.getUniforms().setValue(s, "morphTargetInfluences", n);
    }
  }
  return {
    update: l
  };
}
function Wf(s, e, t, r) {
  let n = /* @__PURE__ */ new WeakMap();
  function i(l) {
    const c = r.render.frame, u = l.geometry, f = e.get(l, u);
    if (n.get(f) !== c && (e.update(f), n.set(f, c)), l.isInstancedMesh && (l.hasEventListener("dispose", a) === !1 && l.addEventListener("dispose", a), n.get(l) !== c && (t.update(l.instanceMatrix, s.ARRAY_BUFFER), l.instanceColor !== null && t.update(l.instanceColor, s.ARRAY_BUFFER), n.set(l, c))), l.isSkinnedMesh) {
      const h = l.skeleton;
      n.get(h) !== c && (h.update(), n.set(h, c));
    }
    return f;
  }
  function o() {
    n = /* @__PURE__ */ new WeakMap();
  }
  function a(l) {
    const c = l.target;
    c.removeEventListener("dispose", a), t.remove(c.instanceMatrix), c.instanceColor !== null && t.remove(c.instanceColor);
  }
  return {
    update: i,
    dispose: o
  };
}
class Ko extends Tt {
  constructor(e, t, r, n, i, o, a, l, c, u) {
    if (u = u !== void 0 ? u : 1026, u !== 1026 && u !== 1027)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    r === void 0 && u === 1026 && (r = 1014), r === void 0 && u === 1027 && (r = 1020), super(null, n, i, o, a, l, u, r, c), this.isDepthTexture = !0, this.image = { width: e, height: t }, this.magFilter = a !== void 0 ? a : 1003, this.minFilter = l !== void 0 ? l : 1003, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
const Zo = /* @__PURE__ */ new Tt(), Jo = /* @__PURE__ */ new Ko(1, 1);
Jo.compareFunction = 515;
const Qo = /* @__PURE__ */ new Bo(), $o = /* @__PURE__ */ new wl(), el = /* @__PURE__ */ new qo(), Xa = [], qa = [], Ya = new Float32Array(16), ja = new Float32Array(9), Ka = new Float32Array(4);
function Ci(s, e, t) {
  const r = s[0];
  if (r <= 0 || r > 0) return s;
  const n = e * t;
  let i = Xa[n];
  if (i === void 0 && (i = new Float32Array(n), Xa[n] = i), e !== 0) {
    r.toArray(i, 0);
    for (let o = 1, a = 0; o !== e; ++o)
      a += t, s[o].toArray(i, a);
  }
  return i;
}
function xt(s, e) {
  if (s.length !== e.length) return !1;
  for (let t = 0, r = s.length; t < r; t++)
    if (s[t] !== e[t]) return !1;
  return !0;
}
function yt(s, e) {
  for (let t = 0, r = e.length; t < r; t++)
    s[t] = e[t];
}
function Kr(s, e) {
  let t = qa[e];
  t === void 0 && (t = new Int32Array(e), qa[e] = t);
  for (let r = 0; r !== e; ++r)
    t[r] = s.allocateTextureUnit();
  return t;
}
function Xf(s, e) {
  const t = this.cache;
  t[0] !== e && (s.uniform1f(this.addr, e), t[0] = e);
}
function qf(s, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (s.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (xt(t, e)) return;
    s.uniform2fv(this.addr, e), yt(t, e);
  }
}
function Yf(s, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (s.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (s.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (xt(t, e)) return;
    s.uniform3fv(this.addr, e), yt(t, e);
  }
}
function jf(s, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (s.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (xt(t, e)) return;
    s.uniform4fv(this.addr, e), yt(t, e);
  }
}
function Kf(s, e) {
  const t = this.cache, r = e.elements;
  if (r === void 0) {
    if (xt(t, e)) return;
    s.uniformMatrix2fv(this.addr, !1, e), yt(t, e);
  } else {
    if (xt(t, r)) return;
    Ka.set(r), s.uniformMatrix2fv(this.addr, !1, Ka), yt(t, r);
  }
}
function Zf(s, e) {
  const t = this.cache, r = e.elements;
  if (r === void 0) {
    if (xt(t, e)) return;
    s.uniformMatrix3fv(this.addr, !1, e), yt(t, e);
  } else {
    if (xt(t, r)) return;
    ja.set(r), s.uniformMatrix3fv(this.addr, !1, ja), yt(t, r);
  }
}
function Jf(s, e) {
  const t = this.cache, r = e.elements;
  if (r === void 0) {
    if (xt(t, e)) return;
    s.uniformMatrix4fv(this.addr, !1, e), yt(t, e);
  } else {
    if (xt(t, r)) return;
    Ya.set(r), s.uniformMatrix4fv(this.addr, !1, Ya), yt(t, r);
  }
}
function Qf(s, e) {
  const t = this.cache;
  t[0] !== e && (s.uniform1i(this.addr, e), t[0] = e);
}
function $f(s, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (s.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (xt(t, e)) return;
    s.uniform2iv(this.addr, e), yt(t, e);
  }
}
function eh(s, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (s.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (xt(t, e)) return;
    s.uniform3iv(this.addr, e), yt(t, e);
  }
}
function th(s, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (s.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (xt(t, e)) return;
    s.uniform4iv(this.addr, e), yt(t, e);
  }
}
function nh(s, e) {
  const t = this.cache;
  t[0] !== e && (s.uniform1ui(this.addr, e), t[0] = e);
}
function ih(s, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (s.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (xt(t, e)) return;
    s.uniform2uiv(this.addr, e), yt(t, e);
  }
}
function rh(s, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (s.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (xt(t, e)) return;
    s.uniform3uiv(this.addr, e), yt(t, e);
  }
}
function sh(s, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (s.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (xt(t, e)) return;
    s.uniform4uiv(this.addr, e), yt(t, e);
  }
}
function ah(s, e, t) {
  const r = this.cache, n = t.allocateTextureUnit();
  r[0] !== n && (s.uniform1i(this.addr, n), r[0] = n);
  const i = this.type === s.SAMPLER_2D_SHADOW ? Jo : Zo;
  t.setTexture2D(e || i, n);
}
function oh(s, e, t) {
  const r = this.cache, n = t.allocateTextureUnit();
  r[0] !== n && (s.uniform1i(this.addr, n), r[0] = n), t.setTexture3D(e || $o, n);
}
function lh(s, e, t) {
  const r = this.cache, n = t.allocateTextureUnit();
  r[0] !== n && (s.uniform1i(this.addr, n), r[0] = n), t.setTextureCube(e || el, n);
}
function ch(s, e, t) {
  const r = this.cache, n = t.allocateTextureUnit();
  r[0] !== n && (s.uniform1i(this.addr, n), r[0] = n), t.setTexture2DArray(e || Qo, n);
}
function uh(s) {
  switch (s) {
    case 5126:
      return Xf;
    case 35664:
      return qf;
    case 35665:
      return Yf;
    case 35666:
      return jf;
    case 35674:
      return Kf;
    case 35675:
      return Zf;
    case 35676:
      return Jf;
    case 5124:
    case 35670:
      return Qf;
    case 35667:
    case 35671:
      return $f;
    case 35668:
    case 35672:
      return eh;
    case 35669:
    case 35673:
      return th;
    case 5125:
      return nh;
    case 36294:
      return ih;
    case 36295:
      return rh;
    case 36296:
      return sh;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return ah;
    case 35679:
    case 36299:
    case 36307:
      return oh;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return lh;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return ch;
  }
}
function fh(s, e) {
  s.uniform1fv(this.addr, e);
}
function hh(s, e) {
  const t = Ci(e, this.size, 2);
  s.uniform2fv(this.addr, t);
}
function dh(s, e) {
  const t = Ci(e, this.size, 3);
  s.uniform3fv(this.addr, t);
}
function ph(s, e) {
  const t = Ci(e, this.size, 4);
  s.uniform4fv(this.addr, t);
}
function mh(s, e) {
  const t = Ci(e, this.size, 4);
  s.uniformMatrix2fv(this.addr, !1, t);
}
function _h(s, e) {
  const t = Ci(e, this.size, 9);
  s.uniformMatrix3fv(this.addr, !1, t);
}
function vh(s, e) {
  const t = Ci(e, this.size, 16);
  s.uniformMatrix4fv(this.addr, !1, t);
}
function gh(s, e) {
  s.uniform1iv(this.addr, e);
}
function xh(s, e) {
  s.uniform2iv(this.addr, e);
}
function yh(s, e) {
  s.uniform3iv(this.addr, e);
}
function bh(s, e) {
  s.uniform4iv(this.addr, e);
}
function Sh(s, e) {
  s.uniform1uiv(this.addr, e);
}
function Mh(s, e) {
  s.uniform2uiv(this.addr, e);
}
function Th(s, e) {
  s.uniform3uiv(this.addr, e);
}
function Eh(s, e) {
  s.uniform4uiv(this.addr, e);
}
function wh(s, e, t) {
  const r = this.cache, n = e.length, i = Kr(t, n);
  xt(r, i) || (s.uniform1iv(this.addr, i), yt(r, i));
  for (let o = 0; o !== n; ++o)
    t.setTexture2D(e[o] || Zo, i[o]);
}
function Ah(s, e, t) {
  const r = this.cache, n = e.length, i = Kr(t, n);
  xt(r, i) || (s.uniform1iv(this.addr, i), yt(r, i));
  for (let o = 0; o !== n; ++o)
    t.setTexture3D(e[o] || $o, i[o]);
}
function Ch(s, e, t) {
  const r = this.cache, n = e.length, i = Kr(t, n);
  xt(r, i) || (s.uniform1iv(this.addr, i), yt(r, i));
  for (let o = 0; o !== n; ++o)
    t.setTextureCube(e[o] || el, i[o]);
}
function Rh(s, e, t) {
  const r = this.cache, n = e.length, i = Kr(t, n);
  xt(r, i) || (s.uniform1iv(this.addr, i), yt(r, i));
  for (let o = 0; o !== n; ++o)
    t.setTexture2DArray(e[o] || Qo, i[o]);
}
function Ph(s) {
  switch (s) {
    case 5126:
      return fh;
    case 35664:
      return hh;
    case 35665:
      return dh;
    case 35666:
      return ph;
    case 35674:
      return mh;
    case 35675:
      return _h;
    case 35676:
      return vh;
    case 5124:
    case 35670:
      return gh;
    case 35667:
    case 35671:
      return xh;
    case 35668:
    case 35672:
      return yh;
    case 35669:
    case 35673:
      return bh;
    case 5125:
      return Sh;
    case 36294:
      return Mh;
    case 36295:
      return Th;
    case 36296:
      return Eh;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return wh;
    case 35679:
    case 36299:
    case 36307:
      return Ah;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Ch;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Rh;
  }
}
class Dh {
  constructor(e, t, r) {
    this.id = e, this.addr = r, this.cache = [], this.type = t.type, this.setValue = uh(t.type);
  }
}
class Uh {
  constructor(e, t, r) {
    this.id = e, this.addr = r, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = Ph(t.type);
  }
}
class Lh {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, r) {
    const n = this.seq;
    for (let i = 0, o = n.length; i !== o; ++i) {
      const a = n[i];
      a.setValue(e, t[a.id], r);
    }
  }
}
const Is = /(\w+)(\])?(\[|\.)?/g;
function Za(s, e) {
  s.seq.push(e), s.map[e.id] = e;
}
function Fh(s, e, t) {
  const r = s.name, n = r.length;
  for (Is.lastIndex = 0; ; ) {
    const i = Is.exec(r), o = Is.lastIndex;
    let a = i[1];
    const l = i[2] === "]", c = i[3];
    if (l && (a = a | 0), c === void 0 || c === "[" && o + 2 === n) {
      Za(t, c === void 0 ? new Dh(a, s, e) : new Uh(a, s, e));
      break;
    } else {
      let f = t.map[a];
      f === void 0 && (f = new Lh(a), Za(t, f)), t = f;
    }
  }
}
class kr {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const r = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let n = 0; n < r; ++n) {
      const i = e.getActiveUniform(t, n), o = e.getUniformLocation(t, i.name);
      Fh(i, o, this);
    }
  }
  setValue(e, t, r, n) {
    const i = this.map[t];
    i !== void 0 && i.setValue(e, r, n);
  }
  setOptional(e, t, r) {
    const n = t[r];
    n !== void 0 && this.setValue(e, r, n);
  }
  static upload(e, t, r, n) {
    for (let i = 0, o = t.length; i !== o; ++i) {
      const a = t[i], l = r[a.id];
      l.needsUpdate !== !1 && a.setValue(e, l.value, n);
    }
  }
  static seqWithValue(e, t) {
    const r = [];
    for (let n = 0, i = e.length; n !== i; ++n) {
      const o = e[n];
      o.id in t && r.push(o);
    }
    return r;
  }
}
function Ja(s, e, t) {
  const r = s.createShader(e);
  return s.shaderSource(r, t), s.compileShader(r), r;
}
const Ih = 37297;
let Nh = 0;
function Oh(s, e) {
  const t = s.split(`
`), r = [], n = Math.max(e - 6, 0), i = Math.min(e + 6, t.length);
  for (let o = n; o < i; o++) {
    const a = o + 1;
    r.push(`${a === e ? ">" : " "} ${a}: ${t[o]}`);
  }
  return r.join(`
`);
}
function Bh(s) {
  const e = st.getPrimaries(st.workingColorSpace), t = st.getPrimaries(s);
  let r;
  switch (e === t ? r = "" : e === Yr && t === qr ? r = "LinearDisplayP3ToLinearSRGB" : e === qr && t === Yr && (r = "LinearSRGBToLinearDisplayP3"), s) {
    case Un:
    case jr:
      return [r, "LinearTransferOETF"];
    case un:
    case Js:
      return [r, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space:", s), [r, "LinearTransferOETF"];
  }
}
function Qa(s, e, t) {
  const r = s.getShaderParameter(e, s.COMPILE_STATUS), n = s.getShaderInfoLog(e).trim();
  if (r && n === "") return "";
  const i = /ERROR: 0:(\d+)/.exec(n);
  if (i) {
    const o = parseInt(i[1]);
    return t.toUpperCase() + `

` + n + `

` + Oh(s.getShaderSource(e), o);
  } else
    return n;
}
function zh(s, e) {
  const t = Bh(e);
  return `vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`;
}
function Gh(s, e) {
  let t;
  switch (e) {
    case 1:
      t = "Linear";
      break;
    case 2:
      t = "Reinhard";
      break;
    case 3:
      t = "OptimizedCineon";
      break;
    case 4:
      t = "ACESFilmic";
      break;
    case 6:
      t = "AgX";
      break;
    case 7:
      t = "Neutral";
      break;
    case 5:
      t = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), t = "Linear";
  }
  return "vec3 " + s + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
function kh(s) {
  return [
    s.extensionDerivatives || s.envMapCubeUVHeight || s.bumpMap || s.normalMapTangentSpace || s.clearcoatNormalMap || s.flatShading || s.alphaToCoverage || s.shaderID === "physical" ? "#extension GL_OES_standard_derivatives : enable" : "",
    (s.extensionFragDepth || s.logarithmicDepthBuffer) && s.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "",
    s.extensionDrawBuffers && s.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "",
    (s.extensionShaderTextureLOD || s.envMap || s.transmission) && s.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""
  ].filter(Mi).join(`
`);
}
function Hh(s) {
  return [
    s.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    s.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(Mi).join(`
`);
}
function Vh(s) {
  const e = [];
  for (const t in s) {
    const r = s[t];
    r !== !1 && e.push("#define " + t + " " + r);
  }
  return e.join(`
`);
}
function Wh(s, e) {
  const t = {}, r = s.getProgramParameter(e, s.ACTIVE_ATTRIBUTES);
  for (let n = 0; n < r; n++) {
    const i = s.getActiveAttrib(e, n), o = i.name;
    let a = 1;
    i.type === s.FLOAT_MAT2 && (a = 2), i.type === s.FLOAT_MAT3 && (a = 3), i.type === s.FLOAT_MAT4 && (a = 4), t[o] = {
      type: i.type,
      location: s.getAttribLocation(e, o),
      locationSize: a
    };
  }
  return t;
}
function Mi(s) {
  return s !== "";
}
function $a(s, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return s.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function eo(s, e) {
  return s.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const Xh = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Hs(s) {
  return s.replace(Xh, Yh);
}
const qh = /* @__PURE__ */ new Map([
  ["encodings_fragment", "colorspace_fragment"],
  // @deprecated, r154
  ["encodings_pars_fragment", "colorspace_pars_fragment"],
  // @deprecated, r154
  ["output_fragment", "opaque_fragment"]
  // @deprecated, r154
]);
function Yh(s, e) {
  let t = Qe[e];
  if (t === void 0) {
    const r = qh.get(e);
    if (r !== void 0)
      t = Qe[r], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, r);
    else
      throw new Error("Can not resolve #include <" + e + ">");
  }
  return Hs(t);
}
const jh = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function to(s) {
  return s.replace(jh, Kh);
}
function Kh(s, e, t, r) {
  let n = "";
  for (let i = parseInt(e); i < parseInt(t); i++)
    n += r.replace(/\[\s*i\s*\]/g, "[ " + i + " ]").replace(/UNROLLED_LOOP_INDEX/g, i);
  return n;
}
function no(s) {
  let e = `precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	`;
  return s.isWebGL2 && (e += `precision ${s.precision} sampler3D;
		precision ${s.precision} sampler2DArray;
		precision ${s.precision} sampler2DShadow;
		precision ${s.precision} samplerCubeShadow;
		precision ${s.precision} sampler2DArrayShadow;
		precision ${s.precision} isampler2D;
		precision ${s.precision} isampler3D;
		precision ${s.precision} isamplerCube;
		precision ${s.precision} isampler2DArray;
		precision ${s.precision} usampler2D;
		precision ${s.precision} usampler3D;
		precision ${s.precision} usamplerCube;
		precision ${s.precision} usampler2DArray;
		`), s.precision === "highp" ? e += `
#define HIGH_PRECISION` : s.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : s.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
function Zh(s) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return s.shadowMapType === 1 ? e = "SHADOWMAP_TYPE_PCF" : s.shadowMapType === 2 ? e = "SHADOWMAP_TYPE_PCF_SOFT" : s.shadowMapType === 3 && (e = "SHADOWMAP_TYPE_VSM"), e;
}
function Jh(s) {
  let e = "ENVMAP_TYPE_CUBE";
  if (s.envMap)
    switch (s.envMapMode) {
      case 301:
      case 302:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case 306:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function Qh(s) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (s.envMap)
    switch (s.envMapMode) {
      case 302:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return e;
}
function $h(s) {
  let e = "ENVMAP_BLENDING_NONE";
  if (s.envMap)
    switch (s.combine) {
      case 0:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case 1:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case 2:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function ed(s) {
  const e = s.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, r = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 7 * 16)), texelHeight: r, maxMip: t };
}
function td(s, e, t, r) {
  const n = s.getContext(), i = t.defines;
  let o = t.vertexShader, a = t.fragmentShader;
  const l = Zh(t), c = Jh(t), u = Qh(t), f = $h(t), h = ed(t), d = t.isWebGL2 ? "" : kh(t), _ = Hh(t), v = Vh(i), p = n.createProgram();
  let m, y, g = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (m = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    v
  ].filter(Mi).join(`
`), m.length > 0 && (m += `
`), y = [
    d,
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    v
  ].filter(Mi).join(`
`), y.length > 0 && (y += `
`)) : (m = [
    no(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    v,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + u : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    //
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors && t.isWebGL2 ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "",
    t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.logarithmicDepthBuffer && t.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )",
    "	attribute vec3 morphTarget0;",
    "	attribute vec3 morphTarget1;",
    "	attribute vec3 morphTarget2;",
    "	attribute vec3 morphTarget3;",
    "	#ifdef USE_MORPHNORMALS",
    "		attribute vec3 morphNormal0;",
    "		attribute vec3 morphNormal1;",
    "		attribute vec3 morphNormal2;",
    "		attribute vec3 morphNormal3;",
    "	#else",
    "		attribute vec3 morphTarget4;",
    "		attribute vec3 morphTarget5;",
    "		attribute vec3 morphTarget6;",
    "		attribute vec3 morphTarget7;",
    "	#endif",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(Mi).join(`
`), y = [
    d,
    no(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    v,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + c : "",
    t.envMap ? "#define " + u : "",
    t.envMap ? "#define " + f : "",
    h ? "#define CUBEUV_TEXEL_WIDTH " + h.texelWidth : "",
    h ? "#define CUBEUV_TEXEL_HEIGHT " + h.texelHeight : "",
    h ? "#define CUBEUV_MAX_MIP " + h.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.logarithmicDepthBuffer && t.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
    t.toneMapping !== 0 ? Qe.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== 0 ? Gh("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    Qe.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    zh("linearToOutputTexel", t.outputColorSpace),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(Mi).join(`
`)), o = Hs(o), o = $a(o, t), o = eo(o, t), a = Hs(a), a = $a(a, t), a = eo(a, t), o = to(o), a = to(a), t.isWebGL2 && t.isRawShaderMaterial !== !0 && (g = `#version 300 es
`, m = [
    _,
    "precision mediump sampler2DArray;",
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + m, y = [
    "precision mediump sampler2DArray;",
    "#define varying in",
    t.glslVersion === ga ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === ga ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + y);
  const A = g + m + o, w = g + y + a, T = Ja(n, n.VERTEX_SHADER, A), S = Ja(n, n.FRAGMENT_SHADER, w);
  n.attachShader(p, T), n.attachShader(p, S), t.index0AttributeName !== void 0 ? n.bindAttribLocation(p, 0, t.index0AttributeName) : t.morphTargets === !0 && n.bindAttribLocation(p, 0, "position"), n.linkProgram(p);
  function C(L) {
    if (s.debug.checkShaderErrors) {
      const k = n.getProgramInfoLog(p).trim(), P = n.getShaderInfoLog(T).trim(), W = n.getShaderInfoLog(S).trim();
      let O = !0, Y = !0;
      if (n.getProgramParameter(p, n.LINK_STATUS) === !1)
        if (O = !1, typeof s.debug.onShaderError == "function")
          s.debug.onShaderError(n, p, T, S);
        else {
          const b = Qa(n, T, "vertex"), G = Qa(n, S, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + n.getError() + " - VALIDATE_STATUS " + n.getProgramParameter(p, n.VALIDATE_STATUS) + `

Material Name: ` + L.name + `
Material Type: ` + L.type + `

Program Info Log: ` + k + `
` + b + `
` + G
          );
        }
      else k !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", k) : (P === "" || W === "") && (Y = !1);
      Y && (L.diagnostics = {
        runnable: O,
        programLog: k,
        vertexShader: {
          log: P,
          prefix: m
        },
        fragmentShader: {
          log: W,
          prefix: y
        }
      });
    }
    n.deleteShader(T), n.deleteShader(S), z = new kr(n, p), x = Wh(n, p);
  }
  let z;
  this.getUniforms = function() {
    return z === void 0 && C(this), z;
  };
  let x;
  this.getAttributes = function() {
    return x === void 0 && C(this), x;
  };
  let R = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return R === !1 && (R = n.getProgramParameter(p, Ih)), R;
  }, this.destroy = function() {
    r.releaseStatesOfProgram(this), n.deleteProgram(p), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = Nh++, this.cacheKey = e, this.usedTimes = 1, this.program = p, this.vertexShader = T, this.fragmentShader = S, this;
}
let nd = 0;
class id {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const t = e.vertexShader, r = e.fragmentShader, n = this._getShaderStage(t), i = this._getShaderStage(r), o = this._getShaderCacheForMaterial(e);
    return o.has(n) === !1 && (o.add(n), n.usedTimes++), o.has(i) === !1 && (o.add(i), i.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const r of t)
      r.usedTimes--, r.usedTimes === 0 && this.shaderCache.delete(r.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let r = t.get(e);
    return r === void 0 && (r = /* @__PURE__ */ new Set(), t.set(e, r)), r;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let r = t.get(e);
    return r === void 0 && (r = new rd(e), t.set(e, r)), r;
  }
}
class rd {
  constructor(e) {
    this.id = nd++, this.code = e, this.usedTimes = 0;
  }
}
function sd(s, e, t, r, n, i, o) {
  const a = new Go(), l = new id(), c = /* @__PURE__ */ new Set(), u = [], f = n.isWebGL2, h = n.logarithmicDepthBuffer, d = n.vertexTextures;
  let _ = n.precision;
  const v = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function p(x) {
    return c.add(x), x === 0 ? "uv" : `uv${x}`;
  }
  function m(x, R, L, k, P) {
    const W = k.fog, O = P.geometry, Y = x.isMeshStandardMaterial ? k.environment : null, b = (x.isMeshStandardMaterial ? t : e).get(x.envMap || Y), G = b && b.mapping === 306 ? b.image.height : null, X = v[x.type];
    x.precision !== null && (_ = n.getMaxPrecision(x.precision), _ !== x.precision && console.warn("THREE.WebGLProgram.getParameters:", x.precision, "not supported, using", _, "instead."));
    const U = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, V = U !== void 0 ? U.length : 0;
    let K = 0;
    O.morphAttributes.position !== void 0 && (K = 1), O.morphAttributes.normal !== void 0 && (K = 2), O.morphAttributes.color !== void 0 && (K = 3);
    let I, B, Q, ee;
    if (X) {
      const Oe = hn[X];
      I = Oe.vertexShader, B = Oe.fragmentShader;
    } else
      I = x.vertexShader, B = x.fragmentShader, l.update(x), Q = l.getVertexShaderID(x), ee = l.getFragmentShaderID(x);
    const q = s.getRenderTarget(), te = P.isInstancedMesh === !0, de = P.isBatchedMesh === !0, le = !!x.map, F = !!x.matcap, Ue = !!b, _e = !!x.aoMap, pe = !!x.lightMap, ue = !!x.bumpMap, Me = !!x.normalMap, ce = !!x.displacementMap, ve = !!x.emissiveMap, we = !!x.metalnessMap, E = !!x.roughnessMap, M = x.anisotropy > 0, N = x.clearcoat > 0, Z = x.iridescence > 0, $ = x.sheen > 0, oe = x.transmission > 0, Se = M && !!x.anisotropyMap, ye = N && !!x.clearcoatMap, se = N && !!x.clearcoatNormalMap, he = N && !!x.clearcoatRoughnessMap, Ne = Z && !!x.iridescenceMap, ge = Z && !!x.iridescenceThicknessMap, Be = $ && !!x.sheenColorMap, Pe = $ && !!x.sheenRoughnessMap, xe = !!x.specularMap, Ae = !!x.specularColorMap, Ce = !!x.specularIntensityMap, ke = oe && !!x.transmissionMap, Ie = oe && !!x.thicknessMap, Le = !!x.gradientMap, H = !!x.alphaMap, Ee = x.alphaTest > 0, j = !!x.alphaHash, fe = !!x.extensions;
    let Te = 0;
    x.toneMapped && (q === null || q.isXRRenderTarget === !0) && (Te = s.toneMapping);
    const ze = {
      isWebGL2: f,
      shaderID: X,
      shaderType: x.type,
      shaderName: x.name,
      vertexShader: I,
      fragmentShader: B,
      defines: x.defines,
      customVertexShaderID: Q,
      customFragmentShaderID: ee,
      isRawShaderMaterial: x.isRawShaderMaterial === !0,
      glslVersion: x.glslVersion,
      precision: _,
      batching: de,
      instancing: te,
      instancingColor: te && P.instanceColor !== null,
      instancingMorph: te && P.morphTexture !== null,
      supportsVertexTextures: d,
      outputColorSpace: q === null ? s.outputColorSpace : q.isXRRenderTarget === !0 ? q.texture.colorSpace : Un,
      alphaToCoverage: !!x.alphaToCoverage,
      map: le,
      matcap: F,
      envMap: Ue,
      envMapMode: Ue && b.mapping,
      envMapCubeUVHeight: G,
      aoMap: _e,
      lightMap: pe,
      bumpMap: ue,
      normalMap: Me,
      displacementMap: d && ce,
      emissiveMap: ve,
      normalMapObjectSpace: Me && x.normalMapType === 1,
      normalMapTangentSpace: Me && x.normalMapType === 0,
      metalnessMap: we,
      roughnessMap: E,
      anisotropy: M,
      anisotropyMap: Se,
      clearcoat: N,
      clearcoatMap: ye,
      clearcoatNormalMap: se,
      clearcoatRoughnessMap: he,
      iridescence: Z,
      iridescenceMap: Ne,
      iridescenceThicknessMap: ge,
      sheen: $,
      sheenColorMap: Be,
      sheenRoughnessMap: Pe,
      specularMap: xe,
      specularColorMap: Ae,
      specularIntensityMap: Ce,
      transmission: oe,
      transmissionMap: ke,
      thicknessMap: Ie,
      gradientMap: Le,
      opaque: x.transparent === !1 && x.blending === 1 && x.alphaToCoverage === !1,
      alphaMap: H,
      alphaTest: Ee,
      alphaHash: j,
      combine: x.combine,
      //
      mapUv: le && p(x.map.channel),
      aoMapUv: _e && p(x.aoMap.channel),
      lightMapUv: pe && p(x.lightMap.channel),
      bumpMapUv: ue && p(x.bumpMap.channel),
      normalMapUv: Me && p(x.normalMap.channel),
      displacementMapUv: ce && p(x.displacementMap.channel),
      emissiveMapUv: ve && p(x.emissiveMap.channel),
      metalnessMapUv: we && p(x.metalnessMap.channel),
      roughnessMapUv: E && p(x.roughnessMap.channel),
      anisotropyMapUv: Se && p(x.anisotropyMap.channel),
      clearcoatMapUv: ye && p(x.clearcoatMap.channel),
      clearcoatNormalMapUv: se && p(x.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: he && p(x.clearcoatRoughnessMap.channel),
      iridescenceMapUv: Ne && p(x.iridescenceMap.channel),
      iridescenceThicknessMapUv: ge && p(x.iridescenceThicknessMap.channel),
      sheenColorMapUv: Be && p(x.sheenColorMap.channel),
      sheenRoughnessMapUv: Pe && p(x.sheenRoughnessMap.channel),
      specularMapUv: xe && p(x.specularMap.channel),
      specularColorMapUv: Ae && p(x.specularColorMap.channel),
      specularIntensityMapUv: Ce && p(x.specularIntensityMap.channel),
      transmissionMapUv: ke && p(x.transmissionMap.channel),
      thicknessMapUv: Ie && p(x.thicknessMap.channel),
      alphaMapUv: H && p(x.alphaMap.channel),
      //
      vertexTangents: !!O.attributes.tangent && (Me || M),
      vertexColors: x.vertexColors,
      vertexAlphas: x.vertexColors === !0 && !!O.attributes.color && O.attributes.color.itemSize === 4,
      pointsUvs: P.isPoints === !0 && !!O.attributes.uv && (le || H),
      fog: !!W,
      useFog: x.fog === !0,
      fogExp2: !!W && W.isFogExp2,
      flatShading: x.flatShading === !0,
      sizeAttenuation: x.sizeAttenuation === !0,
      logarithmicDepthBuffer: h,
      skinning: P.isSkinnedMesh === !0,
      morphTargets: O.morphAttributes.position !== void 0,
      morphNormals: O.morphAttributes.normal !== void 0,
      morphColors: O.morphAttributes.color !== void 0,
      morphTargetsCount: V,
      morphTextureStride: K,
      numDirLights: R.directional.length,
      numPointLights: R.point.length,
      numSpotLights: R.spot.length,
      numSpotLightMaps: R.spotLightMap.length,
      numRectAreaLights: R.rectArea.length,
      numHemiLights: R.hemi.length,
      numDirLightShadows: R.directionalShadowMap.length,
      numPointLightShadows: R.pointShadowMap.length,
      numSpotLightShadows: R.spotShadowMap.length,
      numSpotLightShadowsWithMaps: R.numSpotLightShadowsWithMaps,
      numLightProbes: R.numLightProbes,
      numClippingPlanes: o.numPlanes,
      numClipIntersection: o.numIntersection,
      dithering: x.dithering,
      shadowMapEnabled: s.shadowMap.enabled && L.length > 0,
      shadowMapType: s.shadowMap.type,
      toneMapping: Te,
      useLegacyLights: s._useLegacyLights,
      decodeVideoTexture: le && x.map.isVideoTexture === !0 && st.getTransfer(x.map.colorSpace) === lt,
      premultipliedAlpha: x.premultipliedAlpha,
      doubleSided: x.side === 2,
      flipSided: x.side === 1,
      useDepthPacking: x.depthPacking >= 0,
      depthPacking: x.depthPacking || 0,
      index0AttributeName: x.index0AttributeName,
      extensionDerivatives: fe && x.extensions.derivatives === !0,
      extensionFragDepth: fe && x.extensions.fragDepth === !0,
      extensionDrawBuffers: fe && x.extensions.drawBuffers === !0,
      extensionShaderTextureLOD: fe && x.extensions.shaderTextureLOD === !0,
      extensionClipCullDistance: fe && x.extensions.clipCullDistance === !0 && r.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: fe && x.extensions.multiDraw === !0 && r.has("WEBGL_multi_draw"),
      rendererExtensionFragDepth: f || r.has("EXT_frag_depth"),
      rendererExtensionDrawBuffers: f || r.has("WEBGL_draw_buffers"),
      rendererExtensionShaderTextureLod: f || r.has("EXT_shader_texture_lod"),
      rendererExtensionParallelShaderCompile: r.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: x.customProgramCacheKey()
    };
    return ze.vertexUv1s = c.has(1), ze.vertexUv2s = c.has(2), ze.vertexUv3s = c.has(3), c.clear(), ze;
  }
  function y(x) {
    const R = [];
    if (x.shaderID ? R.push(x.shaderID) : (R.push(x.customVertexShaderID), R.push(x.customFragmentShaderID)), x.defines !== void 0)
      for (const L in x.defines)
        R.push(L), R.push(x.defines[L]);
    return x.isRawShaderMaterial === !1 && (g(R, x), A(R, x), R.push(s.outputColorSpace)), R.push(x.customProgramCacheKey), R.join();
  }
  function g(x, R) {
    x.push(R.precision), x.push(R.outputColorSpace), x.push(R.envMapMode), x.push(R.envMapCubeUVHeight), x.push(R.mapUv), x.push(R.alphaMapUv), x.push(R.lightMapUv), x.push(R.aoMapUv), x.push(R.bumpMapUv), x.push(R.normalMapUv), x.push(R.displacementMapUv), x.push(R.emissiveMapUv), x.push(R.metalnessMapUv), x.push(R.roughnessMapUv), x.push(R.anisotropyMapUv), x.push(R.clearcoatMapUv), x.push(R.clearcoatNormalMapUv), x.push(R.clearcoatRoughnessMapUv), x.push(R.iridescenceMapUv), x.push(R.iridescenceThicknessMapUv), x.push(R.sheenColorMapUv), x.push(R.sheenRoughnessMapUv), x.push(R.specularMapUv), x.push(R.specularColorMapUv), x.push(R.specularIntensityMapUv), x.push(R.transmissionMapUv), x.push(R.thicknessMapUv), x.push(R.combine), x.push(R.fogExp2), x.push(R.sizeAttenuation), x.push(R.morphTargetsCount), x.push(R.morphAttributeCount), x.push(R.numDirLights), x.push(R.numPointLights), x.push(R.numSpotLights), x.push(R.numSpotLightMaps), x.push(R.numHemiLights), x.push(R.numRectAreaLights), x.push(R.numDirLightShadows), x.push(R.numPointLightShadows), x.push(R.numSpotLightShadows), x.push(R.numSpotLightShadowsWithMaps), x.push(R.numLightProbes), x.push(R.shadowMapType), x.push(R.toneMapping), x.push(R.numClippingPlanes), x.push(R.numClipIntersection), x.push(R.depthPacking);
  }
  function A(x, R) {
    a.disableAll(), R.isWebGL2 && a.enable(0), R.supportsVertexTextures && a.enable(1), R.instancing && a.enable(2), R.instancingColor && a.enable(3), R.instancingMorph && a.enable(4), R.matcap && a.enable(5), R.envMap && a.enable(6), R.normalMapObjectSpace && a.enable(7), R.normalMapTangentSpace && a.enable(8), R.clearcoat && a.enable(9), R.iridescence && a.enable(10), R.alphaTest && a.enable(11), R.vertexColors && a.enable(12), R.vertexAlphas && a.enable(13), R.vertexUv1s && a.enable(14), R.vertexUv2s && a.enable(15), R.vertexUv3s && a.enable(16), R.vertexTangents && a.enable(17), R.anisotropy && a.enable(18), R.alphaHash && a.enable(19), R.batching && a.enable(20), x.push(a.mask), a.disableAll(), R.fog && a.enable(0), R.useFog && a.enable(1), R.flatShading && a.enable(2), R.logarithmicDepthBuffer && a.enable(3), R.skinning && a.enable(4), R.morphTargets && a.enable(5), R.morphNormals && a.enable(6), R.morphColors && a.enable(7), R.premultipliedAlpha && a.enable(8), R.shadowMapEnabled && a.enable(9), R.useLegacyLights && a.enable(10), R.doubleSided && a.enable(11), R.flipSided && a.enable(12), R.useDepthPacking && a.enable(13), R.dithering && a.enable(14), R.transmission && a.enable(15), R.sheen && a.enable(16), R.opaque && a.enable(17), R.pointsUvs && a.enable(18), R.decodeVideoTexture && a.enable(19), R.alphaToCoverage && a.enable(20), x.push(a.mask);
  }
  function w(x) {
    const R = v[x.type];
    let L;
    if (R) {
      const k = hn[R];
      L = $i.clone(k.uniforms);
    } else
      L = x.uniforms;
    return L;
  }
  function T(x, R) {
    let L;
    for (let k = 0, P = u.length; k < P; k++) {
      const W = u[k];
      if (W.cacheKey === R) {
        L = W, ++L.usedTimes;
        break;
      }
    }
    return L === void 0 && (L = new td(s, R, x, i), u.push(L)), L;
  }
  function S(x) {
    if (--x.usedTimes === 0) {
      const R = u.indexOf(x);
      u[R] = u[u.length - 1], u.pop(), x.destroy();
    }
  }
  function C(x) {
    l.remove(x);
  }
  function z() {
    l.dispose();
  }
  return {
    getParameters: m,
    getProgramCacheKey: y,
    getUniforms: w,
    acquireProgram: T,
    releaseProgram: S,
    releaseShaderCache: C,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: u,
    dispose: z
  };
}
function ad() {
  let s = /* @__PURE__ */ new WeakMap();
  function e(i) {
    let o = s.get(i);
    return o === void 0 && (o = {}, s.set(i, o)), o;
  }
  function t(i) {
    s.delete(i);
  }
  function r(i, o, a) {
    s.get(i)[o] = a;
  }
  function n() {
    s = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    remove: t,
    update: r,
    dispose: n
  };
}
function od(s, e) {
  return s.groupOrder !== e.groupOrder ? s.groupOrder - e.groupOrder : s.renderOrder !== e.renderOrder ? s.renderOrder - e.renderOrder : s.material.id !== e.material.id ? s.material.id - e.material.id : s.z !== e.z ? s.z - e.z : s.id - e.id;
}
function io(s, e) {
  return s.groupOrder !== e.groupOrder ? s.groupOrder - e.groupOrder : s.renderOrder !== e.renderOrder ? s.renderOrder - e.renderOrder : s.z !== e.z ? e.z - s.z : s.id - e.id;
}
function ro() {
  const s = [];
  let e = 0;
  const t = [], r = [], n = [];
  function i() {
    e = 0, t.length = 0, r.length = 0, n.length = 0;
  }
  function o(f, h, d, _, v, p) {
    let m = s[e];
    return m === void 0 ? (m = {
      id: f.id,
      object: f,
      geometry: h,
      material: d,
      groupOrder: _,
      renderOrder: f.renderOrder,
      z: v,
      group: p
    }, s[e] = m) : (m.id = f.id, m.object = f, m.geometry = h, m.material = d, m.groupOrder = _, m.renderOrder = f.renderOrder, m.z = v, m.group = p), e++, m;
  }
  function a(f, h, d, _, v, p) {
    const m = o(f, h, d, _, v, p);
    d.transmission > 0 ? r.push(m) : d.transparent === !0 ? n.push(m) : t.push(m);
  }
  function l(f, h, d, _, v, p) {
    const m = o(f, h, d, _, v, p);
    d.transmission > 0 ? r.unshift(m) : d.transparent === !0 ? n.unshift(m) : t.unshift(m);
  }
  function c(f, h) {
    t.length > 1 && t.sort(f || od), r.length > 1 && r.sort(h || io), n.length > 1 && n.sort(h || io);
  }
  function u() {
    for (let f = e, h = s.length; f < h; f++) {
      const d = s[f];
      if (d.id === null) break;
      d.id = null, d.object = null, d.geometry = null, d.material = null, d.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: r,
    transparent: n,
    init: i,
    push: a,
    unshift: l,
    finish: u,
    sort: c
  };
}
function ld() {
  let s = /* @__PURE__ */ new WeakMap();
  function e(r, n) {
    const i = s.get(r);
    let o;
    return i === void 0 ? (o = new ro(), s.set(r, [o])) : n >= i.length ? (o = new ro(), i.push(o)) : o = i[n], o;
  }
  function t() {
    s = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function cd() {
  const s = {};
  return {
    get: function(e) {
      if (s[e.id] !== void 0)
        return s[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new ne(),
            color: new me()
          };
          break;
        case "SpotLight":
          t = {
            position: new ne(),
            direction: new ne(),
            color: new me(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new ne(),
            color: new me(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new ne(),
            skyColor: new me(),
            groundColor: new me()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new me(),
            position: new ne(),
            halfWidth: new ne(),
            halfHeight: new ne()
          };
          break;
      }
      return s[e.id] = t, t;
    }
  };
}
function ud() {
  const s = {};
  return {
    get: function(e) {
      if (s[e.id] !== void 0)
        return s[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new De()
          };
          break;
        case "SpotLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new De()
          };
          break;
        case "PointLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new De(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return s[e.id] = t, t;
    }
  };
}
let fd = 0;
function hd(s, e) {
  return (e.castShadow ? 2 : 0) - (s.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (s.map ? 1 : 0);
}
function dd(s, e) {
  const t = new cd(), r = ud(), n = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let u = 0; u < 9; u++) n.probe.push(new ne());
  const i = new ne(), o = new ft(), a = new ft();
  function l(u, f) {
    let h = 0, d = 0, _ = 0;
    for (let L = 0; L < 9; L++) n.probe[L].set(0, 0, 0);
    let v = 0, p = 0, m = 0, y = 0, g = 0, A = 0, w = 0, T = 0, S = 0, C = 0, z = 0;
    u.sort(hd);
    const x = f === !0 ? Math.PI : 1;
    for (let L = 0, k = u.length; L < k; L++) {
      const P = u[L], W = P.color, O = P.intensity, Y = P.distance, b = P.shadow && P.shadow.map ? P.shadow.map.texture : null;
      if (P.isAmbientLight)
        h += W.r * O * x, d += W.g * O * x, _ += W.b * O * x;
      else if (P.isLightProbe) {
        for (let G = 0; G < 9; G++)
          n.probe[G].addScaledVector(P.sh.coefficients[G], O);
        z++;
      } else if (P.isDirectionalLight) {
        const G = t.get(P);
        if (G.color.copy(P.color).multiplyScalar(P.intensity * x), P.castShadow) {
          const X = P.shadow, U = r.get(P);
          U.shadowBias = X.bias, U.shadowNormalBias = X.normalBias, U.shadowRadius = X.radius, U.shadowMapSize = X.mapSize, n.directionalShadow[v] = U, n.directionalShadowMap[v] = b, n.directionalShadowMatrix[v] = P.shadow.matrix, A++;
        }
        n.directional[v] = G, v++;
      } else if (P.isSpotLight) {
        const G = t.get(P);
        G.position.setFromMatrixPosition(P.matrixWorld), G.color.copy(W).multiplyScalar(O * x), G.distance = Y, G.coneCos = Math.cos(P.angle), G.penumbraCos = Math.cos(P.angle * (1 - P.penumbra)), G.decay = P.decay, n.spot[m] = G;
        const X = P.shadow;
        if (P.map && (n.spotLightMap[S] = P.map, S++, X.updateMatrices(P), P.castShadow && C++), n.spotLightMatrix[m] = X.matrix, P.castShadow) {
          const U = r.get(P);
          U.shadowBias = X.bias, U.shadowNormalBias = X.normalBias, U.shadowRadius = X.radius, U.shadowMapSize = X.mapSize, n.spotShadow[m] = U, n.spotShadowMap[m] = b, T++;
        }
        m++;
      } else if (P.isRectAreaLight) {
        const G = t.get(P);
        G.color.copy(W).multiplyScalar(O), G.halfWidth.set(P.width * 0.5, 0, 0), G.halfHeight.set(0, P.height * 0.5, 0), n.rectArea[y] = G, y++;
      } else if (P.isPointLight) {
        const G = t.get(P);
        if (G.color.copy(P.color).multiplyScalar(P.intensity * x), G.distance = P.distance, G.decay = P.decay, P.castShadow) {
          const X = P.shadow, U = r.get(P);
          U.shadowBias = X.bias, U.shadowNormalBias = X.normalBias, U.shadowRadius = X.radius, U.shadowMapSize = X.mapSize, U.shadowCameraNear = X.camera.near, U.shadowCameraFar = X.camera.far, n.pointShadow[p] = U, n.pointShadowMap[p] = b, n.pointShadowMatrix[p] = P.shadow.matrix, w++;
        }
        n.point[p] = G, p++;
      } else if (P.isHemisphereLight) {
        const G = t.get(P);
        G.skyColor.copy(P.color).multiplyScalar(O * x), G.groundColor.copy(P.groundColor).multiplyScalar(O * x), n.hemi[g] = G, g++;
      }
    }
    y > 0 && (e.isWebGL2 ? s.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = Re.LTC_FLOAT_1, n.rectAreaLTC2 = Re.LTC_FLOAT_2) : (n.rectAreaLTC1 = Re.LTC_HALF_1, n.rectAreaLTC2 = Re.LTC_HALF_2) : s.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = Re.LTC_FLOAT_1, n.rectAreaLTC2 = Re.LTC_FLOAT_2) : s.has("OES_texture_half_float_linear") === !0 ? (n.rectAreaLTC1 = Re.LTC_HALF_1, n.rectAreaLTC2 = Re.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")), n.ambient[0] = h, n.ambient[1] = d, n.ambient[2] = _;
    const R = n.hash;
    (R.directionalLength !== v || R.pointLength !== p || R.spotLength !== m || R.rectAreaLength !== y || R.hemiLength !== g || R.numDirectionalShadows !== A || R.numPointShadows !== w || R.numSpotShadows !== T || R.numSpotMaps !== S || R.numLightProbes !== z) && (n.directional.length = v, n.spot.length = m, n.rectArea.length = y, n.point.length = p, n.hemi.length = g, n.directionalShadow.length = A, n.directionalShadowMap.length = A, n.pointShadow.length = w, n.pointShadowMap.length = w, n.spotShadow.length = T, n.spotShadowMap.length = T, n.directionalShadowMatrix.length = A, n.pointShadowMatrix.length = w, n.spotLightMatrix.length = T + S - C, n.spotLightMap.length = S, n.numSpotLightShadowsWithMaps = C, n.numLightProbes = z, R.directionalLength = v, R.pointLength = p, R.spotLength = m, R.rectAreaLength = y, R.hemiLength = g, R.numDirectionalShadows = A, R.numPointShadows = w, R.numSpotShadows = T, R.numSpotMaps = S, R.numLightProbes = z, n.version = fd++);
  }
  function c(u, f) {
    let h = 0, d = 0, _ = 0, v = 0, p = 0;
    const m = f.matrixWorldInverse;
    for (let y = 0, g = u.length; y < g; y++) {
      const A = u[y];
      if (A.isDirectionalLight) {
        const w = n.directional[h];
        w.direction.setFromMatrixPosition(A.matrixWorld), i.setFromMatrixPosition(A.target.matrixWorld), w.direction.sub(i), w.direction.transformDirection(m), h++;
      } else if (A.isSpotLight) {
        const w = n.spot[_];
        w.position.setFromMatrixPosition(A.matrixWorld), w.position.applyMatrix4(m), w.direction.setFromMatrixPosition(A.matrixWorld), i.setFromMatrixPosition(A.target.matrixWorld), w.direction.sub(i), w.direction.transformDirection(m), _++;
      } else if (A.isRectAreaLight) {
        const w = n.rectArea[v];
        w.position.setFromMatrixPosition(A.matrixWorld), w.position.applyMatrix4(m), a.identity(), o.copy(A.matrixWorld), o.premultiply(m), a.extractRotation(o), w.halfWidth.set(A.width * 0.5, 0, 0), w.halfHeight.set(0, A.height * 0.5, 0), w.halfWidth.applyMatrix4(a), w.halfHeight.applyMatrix4(a), v++;
      } else if (A.isPointLight) {
        const w = n.point[d];
        w.position.setFromMatrixPosition(A.matrixWorld), w.position.applyMatrix4(m), d++;
      } else if (A.isHemisphereLight) {
        const w = n.hemi[p];
        w.direction.setFromMatrixPosition(A.matrixWorld), w.direction.transformDirection(m), p++;
      }
    }
  }
  return {
    setup: l,
    setupView: c,
    state: n
  };
}
function so(s, e) {
  const t = new dd(s, e), r = [], n = [];
  function i() {
    r.length = 0, n.length = 0;
  }
  function o(f) {
    r.push(f);
  }
  function a(f) {
    n.push(f);
  }
  function l(f) {
    t.setup(r, f);
  }
  function c(f) {
    t.setupView(r, f);
  }
  return {
    init: i,
    state: {
      lightsArray: r,
      shadowsArray: n,
      lights: t
    },
    setupLights: l,
    setupLightsView: c,
    pushLight: o,
    pushShadow: a
  };
}
function pd(s, e) {
  let t = /* @__PURE__ */ new WeakMap();
  function r(i, o = 0) {
    const a = t.get(i);
    let l;
    return a === void 0 ? (l = new so(s, e), t.set(i, [l])) : o >= a.length ? (l = new so(s, e), a.push(l)) : l = a[o], l;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: r,
    dispose: n
  };
}
class tl extends nr {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class nl extends nr {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const md = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, _d = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function vd(s, e, t) {
  let r = new Yo();
  const n = new De(), i = new De(), o = new vt(), a = new tl({ depthPacking: 3201 }), l = new nl(), c = {}, u = t.maxTextureSize, f = { 0: 1, 1: 0, 2: 2 }, h = new Je({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new De() },
      radius: { value: 4 }
    },
    vertexShader: md,
    fragmentShader: _d
  }), d = h.clone();
  d.defines.HORIZONTAL_PASS = 1;
  const _ = new qt();
  _.setAttribute(
    "position",
    new Xt(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const v = new qe(_, h), p = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let m = this.type;
  this.render = function(T, S, C) {
    if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || T.length === 0) return;
    const z = s.getRenderTarget(), x = s.getActiveCubeFace(), R = s.getActiveMipmapLevel(), L = s.state;
    L.setBlending(0), L.buffers.color.setClear(1, 1, 1, 1), L.buffers.depth.setTest(!0), L.setScissorTest(!1);
    const k = m !== 3 && this.type === 3, P = m === 3 && this.type !== 3;
    for (let W = 0, O = T.length; W < O; W++) {
      const Y = T[W], b = Y.shadow;
      if (b === void 0) {
        console.warn("THREE.WebGLShadowMap:", Y, "has no shadow.");
        continue;
      }
      if (b.autoUpdate === !1 && b.needsUpdate === !1) continue;
      n.copy(b.mapSize);
      const G = b.getFrameExtents();
      if (n.multiply(G), i.copy(b.mapSize), (n.x > u || n.y > u) && (n.x > u && (i.x = Math.floor(u / G.x), n.x = i.x * G.x, b.mapSize.x = i.x), n.y > u && (i.y = Math.floor(u / G.y), n.y = i.y * G.y, b.mapSize.y = i.y)), b.map === null || k === !0 || P === !0) {
        const U = this.type !== 3 ? { minFilter: 1003, magFilter: 1003 } : {};
        b.map !== null && b.map.dispose(), b.map = new gt(n.x, n.y, U), b.map.texture.name = Y.name + ".shadowMap", b.camera.updateProjectionMatrix();
      }
      s.setRenderTarget(b.map), s.clear();
      const X = b.getViewportCount();
      for (let U = 0; U < X; U++) {
        const V = b.getViewport(U);
        o.set(
          i.x * V.x,
          i.y * V.y,
          i.x * V.z,
          i.y * V.w
        ), L.viewport(o), b.updateMatrices(Y, U), r = b.getFrustum(), A(S, C, b.camera, Y, this.type);
      }
      b.isPointLightShadow !== !0 && this.type === 3 && y(b, C), b.needsUpdate = !1;
    }
    m = this.type, p.needsUpdate = !1, s.setRenderTarget(z, x, R);
  };
  function y(T, S) {
    const C = e.update(v);
    h.defines.VSM_SAMPLES !== T.blurSamples && (h.defines.VSM_SAMPLES = T.blurSamples, d.defines.VSM_SAMPLES = T.blurSamples, h.needsUpdate = !0, d.needsUpdate = !0), T.mapPass === null && (T.mapPass = new gt(n.x, n.y)), h.uniforms.shadow_pass.value = T.map.texture, h.uniforms.resolution.value = T.mapSize, h.uniforms.radius.value = T.radius, s.setRenderTarget(T.mapPass), s.clear(), s.renderBufferDirect(S, null, C, h, v, null), d.uniforms.shadow_pass.value = T.mapPass.texture, d.uniforms.resolution.value = T.mapSize, d.uniforms.radius.value = T.radius, s.setRenderTarget(T.map), s.clear(), s.renderBufferDirect(S, null, C, d, v, null);
  }
  function g(T, S, C, z) {
    let x = null;
    const R = C.isPointLight === !0 ? T.customDistanceMaterial : T.customDepthMaterial;
    if (R !== void 0)
      x = R;
    else if (x = C.isPointLight === !0 ? l : a, s.localClippingEnabled && S.clipShadows === !0 && Array.isArray(S.clippingPlanes) && S.clippingPlanes.length !== 0 || S.displacementMap && S.displacementScale !== 0 || S.alphaMap && S.alphaTest > 0 || S.map && S.alphaTest > 0) {
      const L = x.uuid, k = S.uuid;
      let P = c[L];
      P === void 0 && (P = {}, c[L] = P);
      let W = P[k];
      W === void 0 && (W = x.clone(), P[k] = W, S.addEventListener("dispose", w)), x = W;
    }
    if (x.visible = S.visible, x.wireframe = S.wireframe, z === 3 ? x.side = S.shadowSide !== null ? S.shadowSide : S.side : x.side = S.shadowSide !== null ? S.shadowSide : f[S.side], x.alphaMap = S.alphaMap, x.alphaTest = S.alphaTest, x.map = S.map, x.clipShadows = S.clipShadows, x.clippingPlanes = S.clippingPlanes, x.clipIntersection = S.clipIntersection, x.displacementMap = S.displacementMap, x.displacementScale = S.displacementScale, x.displacementBias = S.displacementBias, x.wireframeLinewidth = S.wireframeLinewidth, x.linewidth = S.linewidth, C.isPointLight === !0 && x.isMeshDistanceMaterial === !0) {
      const L = s.properties.get(x);
      L.light = C;
    }
    return x;
  }
  function A(T, S, C, z, x) {
    if (T.visible === !1) return;
    if (T.layers.test(S.layers) && (T.isMesh || T.isLine || T.isPoints) && (T.castShadow || T.receiveShadow && x === 3) && (!T.frustumCulled || r.intersectsObject(T))) {
      T.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse, T.matrixWorld);
      const k = e.update(T), P = T.material;
      if (Array.isArray(P)) {
        const W = k.groups;
        for (let O = 0, Y = W.length; O < Y; O++) {
          const b = W[O], G = P[b.materialIndex];
          if (G && G.visible) {
            const X = g(T, G, z, x);
            T.onBeforeShadow(s, T, S, C, k, X, b), s.renderBufferDirect(C, null, k, X, T, b), T.onAfterShadow(s, T, S, C, k, X, b);
          }
        }
      } else if (P.visible) {
        const W = g(T, P, z, x);
        T.onBeforeShadow(s, T, S, C, k, W, null), s.renderBufferDirect(C, null, k, W, T, null), T.onAfterShadow(s, T, S, C, k, W, null);
      }
    }
    const L = T.children;
    for (let k = 0, P = L.length; k < P; k++)
      A(L[k], S, C, z, x);
  }
  function w(T) {
    T.target.removeEventListener("dispose", w);
    for (const C in c) {
      const z = c[C], x = T.target.uuid;
      x in z && (z[x].dispose(), delete z[x]);
    }
  }
}
function gd(s, e, t) {
  const r = t.isWebGL2;
  function n() {
    let H = !1;
    const Ee = new vt();
    let j = null;
    const fe = new vt(0, 0, 0, 0);
    return {
      setMask: function(Te) {
        j !== Te && !H && (s.colorMask(Te, Te, Te, Te), j = Te);
      },
      setLocked: function(Te) {
        H = Te;
      },
      setClear: function(Te, ze, Oe, Ke, it) {
        it === !0 && (Te *= Ke, ze *= Ke, Oe *= Ke), Ee.set(Te, ze, Oe, Ke), fe.equals(Ee) === !1 && (s.clearColor(Te, ze, Oe, Ke), fe.copy(Ee));
      },
      reset: function() {
        H = !1, j = null, fe.set(-1, 0, 0, 0);
      }
    };
  }
  function i() {
    let H = !1, Ee = null, j = null, fe = null;
    return {
      setTest: function(Te) {
        Te ? te(s.DEPTH_TEST) : de(s.DEPTH_TEST);
      },
      setMask: function(Te) {
        Ee !== Te && !H && (s.depthMask(Te), Ee = Te);
      },
      setFunc: function(Te) {
        if (j !== Te) {
          switch (Te) {
            case 0:
              s.depthFunc(s.NEVER);
              break;
            case 1:
              s.depthFunc(s.ALWAYS);
              break;
            case 2:
              s.depthFunc(s.LESS);
              break;
            case 3:
              s.depthFunc(s.LEQUAL);
              break;
            case 4:
              s.depthFunc(s.EQUAL);
              break;
            case 5:
              s.depthFunc(s.GEQUAL);
              break;
            case 6:
              s.depthFunc(s.GREATER);
              break;
            case 7:
              s.depthFunc(s.NOTEQUAL);
              break;
            default:
              s.depthFunc(s.LEQUAL);
          }
          j = Te;
        }
      },
      setLocked: function(Te) {
        H = Te;
      },
      setClear: function(Te) {
        fe !== Te && (s.clearDepth(Te), fe = Te);
      },
      reset: function() {
        H = !1, Ee = null, j = null, fe = null;
      }
    };
  }
  function o() {
    let H = !1, Ee = null, j = null, fe = null, Te = null, ze = null, Oe = null, Ke = null, it = null;
    return {
      setTest: function(Ye) {
        H || (Ye ? te(s.STENCIL_TEST) : de(s.STENCIL_TEST));
      },
      setMask: function(Ye) {
        Ee !== Ye && !H && (s.stencilMask(Ye), Ee = Ye);
      },
      setFunc: function(Ye, et, dt) {
        (j !== Ye || fe !== et || Te !== dt) && (s.stencilFunc(Ye, et, dt), j = Ye, fe = et, Te = dt);
      },
      setOp: function(Ye, et, dt) {
        (ze !== Ye || Oe !== et || Ke !== dt) && (s.stencilOp(Ye, et, dt), ze = Ye, Oe = et, Ke = dt);
      },
      setLocked: function(Ye) {
        H = Ye;
      },
      setClear: function(Ye) {
        it !== Ye && (s.clearStencil(Ye), it = Ye);
      },
      reset: function() {
        H = !1, Ee = null, j = null, fe = null, Te = null, ze = null, Oe = null, Ke = null, it = null;
      }
    };
  }
  const a = new n(), l = new i(), c = new o(), u = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap();
  let h = {}, d = {}, _ = /* @__PURE__ */ new WeakMap(), v = [], p = null, m = !1, y = null, g = null, A = null, w = null, T = null, S = null, C = null, z = new me(0, 0, 0), x = 0, R = !1, L = null, k = null, P = null, W = null, O = null;
  const Y = s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let b = !1, G = 0;
  const X = s.getParameter(s.VERSION);
  X.indexOf("WebGL") !== -1 ? (G = parseFloat(/^WebGL (\d)/.exec(X)[1]), b = G >= 1) : X.indexOf("OpenGL ES") !== -1 && (G = parseFloat(/^OpenGL ES (\d)/.exec(X)[1]), b = G >= 2);
  let U = null, V = {};
  const K = s.getParameter(s.SCISSOR_BOX), I = s.getParameter(s.VIEWPORT), B = new vt().fromArray(K), Q = new vt().fromArray(I);
  function ee(H, Ee, j, fe) {
    const Te = new Uint8Array(4), ze = s.createTexture();
    s.bindTexture(H, ze), s.texParameteri(H, s.TEXTURE_MIN_FILTER, s.NEAREST), s.texParameteri(H, s.TEXTURE_MAG_FILTER, s.NEAREST);
    for (let Oe = 0; Oe < j; Oe++)
      r && (H === s.TEXTURE_3D || H === s.TEXTURE_2D_ARRAY) ? s.texImage3D(Ee, 0, s.RGBA, 1, 1, fe, 0, s.RGBA, s.UNSIGNED_BYTE, Te) : s.texImage2D(Ee + Oe, 0, s.RGBA, 1, 1, 0, s.RGBA, s.UNSIGNED_BYTE, Te);
    return ze;
  }
  const q = {};
  q[s.TEXTURE_2D] = ee(s.TEXTURE_2D, s.TEXTURE_2D, 1), q[s.TEXTURE_CUBE_MAP] = ee(s.TEXTURE_CUBE_MAP, s.TEXTURE_CUBE_MAP_POSITIVE_X, 6), r && (q[s.TEXTURE_2D_ARRAY] = ee(s.TEXTURE_2D_ARRAY, s.TEXTURE_2D_ARRAY, 1, 1), q[s.TEXTURE_3D] = ee(s.TEXTURE_3D, s.TEXTURE_3D, 1, 1)), a.setClear(0, 0, 0, 1), l.setClear(1), c.setClear(0), te(s.DEPTH_TEST), l.setFunc(3), ce(!1), ve(1), te(s.CULL_FACE), ue(0);
  function te(H) {
    h[H] !== !0 && (s.enable(H), h[H] = !0);
  }
  function de(H) {
    h[H] !== !1 && (s.disable(H), h[H] = !1);
  }
  function le(H, Ee) {
    return d[H] !== Ee ? (s.bindFramebuffer(H, Ee), d[H] = Ee, r && (H === s.DRAW_FRAMEBUFFER && (d[s.FRAMEBUFFER] = Ee), H === s.FRAMEBUFFER && (d[s.DRAW_FRAMEBUFFER] = Ee)), !0) : !1;
  }
  function F(H, Ee) {
    let j = v, fe = !1;
    if (H) {
      j = _.get(Ee), j === void 0 && (j = [], _.set(Ee, j));
      const Te = H.textures;
      if (j.length !== Te.length || j[0] !== s.COLOR_ATTACHMENT0) {
        for (let ze = 0, Oe = Te.length; ze < Oe; ze++)
          j[ze] = s.COLOR_ATTACHMENT0 + ze;
        j.length = Te.length, fe = !0;
      }
    } else
      j[0] !== s.BACK && (j[0] = s.BACK, fe = !0);
    if (fe)
      if (t.isWebGL2)
        s.drawBuffers(j);
      else if (e.has("WEBGL_draw_buffers") === !0)
        e.get("WEBGL_draw_buffers").drawBuffersWEBGL(j);
      else
        throw new Error("THREE.WebGLState: Usage of gl.drawBuffers() require WebGL2 or WEBGL_draw_buffers extension");
  }
  function Ue(H) {
    return p !== H ? (s.useProgram(H), p = H, !0) : !1;
  }
  const _e = {
    100: s.FUNC_ADD,
    101: s.FUNC_SUBTRACT,
    102: s.FUNC_REVERSE_SUBTRACT
  };
  if (r)
    _e[103] = s.MIN, _e[104] = s.MAX;
  else {
    const H = e.get("EXT_blend_minmax");
    H !== null && (_e[103] = H.MIN_EXT, _e[104] = H.MAX_EXT);
  }
  const pe = {
    200: s.ZERO,
    201: s.ONE,
    202: s.SRC_COLOR,
    204: s.SRC_ALPHA,
    210: s.SRC_ALPHA_SATURATE,
    208: s.DST_COLOR,
    206: s.DST_ALPHA,
    203: s.ONE_MINUS_SRC_COLOR,
    205: s.ONE_MINUS_SRC_ALPHA,
    209: s.ONE_MINUS_DST_COLOR,
    207: s.ONE_MINUS_DST_ALPHA,
    211: s.CONSTANT_COLOR,
    212: s.ONE_MINUS_CONSTANT_COLOR,
    213: s.CONSTANT_ALPHA,
    214: s.ONE_MINUS_CONSTANT_ALPHA
  };
  function ue(H, Ee, j, fe, Te, ze, Oe, Ke, it, Ye) {
    if (H === 0) {
      m === !0 && (de(s.BLEND), m = !1);
      return;
    }
    if (m === !1 && (te(s.BLEND), m = !0), H !== 5) {
      if (H !== y || Ye !== R) {
        if ((g !== 100 || T !== 100) && (s.blendEquation(s.FUNC_ADD), g = 100, T = 100), Ye)
          switch (H) {
            case 1:
              s.blendFuncSeparate(s.ONE, s.ONE_MINUS_SRC_ALPHA, s.ONE, s.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              s.blendFunc(s.ONE, s.ONE);
              break;
            case 3:
              s.blendFuncSeparate(s.ZERO, s.ONE_MINUS_SRC_COLOR, s.ZERO, s.ONE);
              break;
            case 4:
              s.blendFuncSeparate(s.ZERO, s.SRC_COLOR, s.ZERO, s.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", H);
              break;
          }
        else
          switch (H) {
            case 1:
              s.blendFuncSeparate(s.SRC_ALPHA, s.ONE_MINUS_SRC_ALPHA, s.ONE, s.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              s.blendFunc(s.SRC_ALPHA, s.ONE);
              break;
            case 3:
              s.blendFuncSeparate(s.ZERO, s.ONE_MINUS_SRC_COLOR, s.ZERO, s.ONE);
              break;
            case 4:
              s.blendFunc(s.ZERO, s.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", H);
              break;
          }
        A = null, w = null, S = null, C = null, z.set(0, 0, 0), x = 0, y = H, R = Ye;
      }
      return;
    }
    Te = Te || Ee, ze = ze || j, Oe = Oe || fe, (Ee !== g || Te !== T) && (s.blendEquationSeparate(_e[Ee], _e[Te]), g = Ee, T = Te), (j !== A || fe !== w || ze !== S || Oe !== C) && (s.blendFuncSeparate(pe[j], pe[fe], pe[ze], pe[Oe]), A = j, w = fe, S = ze, C = Oe), (Ke.equals(z) === !1 || it !== x) && (s.blendColor(Ke.r, Ke.g, Ke.b, it), z.copy(Ke), x = it), y = H, R = !1;
  }
  function Me(H, Ee) {
    H.side === 2 ? de(s.CULL_FACE) : te(s.CULL_FACE);
    let j = H.side === 1;
    Ee && (j = !j), ce(j), H.blending === 1 && H.transparent === !1 ? ue(0) : ue(H.blending, H.blendEquation, H.blendSrc, H.blendDst, H.blendEquationAlpha, H.blendSrcAlpha, H.blendDstAlpha, H.blendColor, H.blendAlpha, H.premultipliedAlpha), l.setFunc(H.depthFunc), l.setTest(H.depthTest), l.setMask(H.depthWrite), a.setMask(H.colorWrite);
    const fe = H.stencilWrite;
    c.setTest(fe), fe && (c.setMask(H.stencilWriteMask), c.setFunc(H.stencilFunc, H.stencilRef, H.stencilFuncMask), c.setOp(H.stencilFail, H.stencilZFail, H.stencilZPass)), E(H.polygonOffset, H.polygonOffsetFactor, H.polygonOffsetUnits), H.alphaToCoverage === !0 ? te(s.SAMPLE_ALPHA_TO_COVERAGE) : de(s.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function ce(H) {
    L !== H && (H ? s.frontFace(s.CW) : s.frontFace(s.CCW), L = H);
  }
  function ve(H) {
    H !== 0 ? (te(s.CULL_FACE), H !== k && (H === 1 ? s.cullFace(s.BACK) : H === 2 ? s.cullFace(s.FRONT) : s.cullFace(s.FRONT_AND_BACK))) : de(s.CULL_FACE), k = H;
  }
  function we(H) {
    H !== P && (b && s.lineWidth(H), P = H);
  }
  function E(H, Ee, j) {
    H ? (te(s.POLYGON_OFFSET_FILL), (W !== Ee || O !== j) && (s.polygonOffset(Ee, j), W = Ee, O = j)) : de(s.POLYGON_OFFSET_FILL);
  }
  function M(H) {
    H ? te(s.SCISSOR_TEST) : de(s.SCISSOR_TEST);
  }
  function N(H) {
    H === void 0 && (H = s.TEXTURE0 + Y - 1), U !== H && (s.activeTexture(H), U = H);
  }
  function Z(H, Ee, j) {
    j === void 0 && (U === null ? j = s.TEXTURE0 + Y - 1 : j = U);
    let fe = V[j];
    fe === void 0 && (fe = { type: void 0, texture: void 0 }, V[j] = fe), (fe.type !== H || fe.texture !== Ee) && (U !== j && (s.activeTexture(j), U = j), s.bindTexture(H, Ee || q[H]), fe.type = H, fe.texture = Ee);
  }
  function $() {
    const H = V[U];
    H !== void 0 && H.type !== void 0 && (s.bindTexture(H.type, null), H.type = void 0, H.texture = void 0);
  }
  function oe() {
    try {
      s.compressedTexImage2D.apply(s, arguments);
    } catch (H) {
      console.error("THREE.WebGLState:", H);
    }
  }
  function Se() {
    try {
      s.compressedTexImage3D.apply(s, arguments);
    } catch (H) {
      console.error("THREE.WebGLState:", H);
    }
  }
  function ye() {
    try {
      s.texSubImage2D.apply(s, arguments);
    } catch (H) {
      console.error("THREE.WebGLState:", H);
    }
  }
  function se() {
    try {
      s.texSubImage3D.apply(s, arguments);
    } catch (H) {
      console.error("THREE.WebGLState:", H);
    }
  }
  function he() {
    try {
      s.compressedTexSubImage2D.apply(s, arguments);
    } catch (H) {
      console.error("THREE.WebGLState:", H);
    }
  }
  function Ne() {
    try {
      s.compressedTexSubImage3D.apply(s, arguments);
    } catch (H) {
      console.error("THREE.WebGLState:", H);
    }
  }
  function ge() {
    try {
      s.texStorage2D.apply(s, arguments);
    } catch (H) {
      console.error("THREE.WebGLState:", H);
    }
  }
  function Be() {
    try {
      s.texStorage3D.apply(s, arguments);
    } catch (H) {
      console.error("THREE.WebGLState:", H);
    }
  }
  function Pe() {
    try {
      s.texImage2D.apply(s, arguments);
    } catch (H) {
      console.error("THREE.WebGLState:", H);
    }
  }
  function xe() {
    try {
      s.texImage3D.apply(s, arguments);
    } catch (H) {
      console.error("THREE.WebGLState:", H);
    }
  }
  function Ae(H) {
    B.equals(H) === !1 && (s.scissor(H.x, H.y, H.z, H.w), B.copy(H));
  }
  function Ce(H) {
    Q.equals(H) === !1 && (s.viewport(H.x, H.y, H.z, H.w), Q.copy(H));
  }
  function ke(H, Ee) {
    let j = f.get(Ee);
    j === void 0 && (j = /* @__PURE__ */ new WeakMap(), f.set(Ee, j));
    let fe = j.get(H);
    fe === void 0 && (fe = s.getUniformBlockIndex(Ee, H.name), j.set(H, fe));
  }
  function Ie(H, Ee) {
    const fe = f.get(Ee).get(H);
    u.get(Ee) !== fe && (s.uniformBlockBinding(Ee, fe, H.__bindingPointIndex), u.set(Ee, fe));
  }
  function Le() {
    s.disable(s.BLEND), s.disable(s.CULL_FACE), s.disable(s.DEPTH_TEST), s.disable(s.POLYGON_OFFSET_FILL), s.disable(s.SCISSOR_TEST), s.disable(s.STENCIL_TEST), s.disable(s.SAMPLE_ALPHA_TO_COVERAGE), s.blendEquation(s.FUNC_ADD), s.blendFunc(s.ONE, s.ZERO), s.blendFuncSeparate(s.ONE, s.ZERO, s.ONE, s.ZERO), s.blendColor(0, 0, 0, 0), s.colorMask(!0, !0, !0, !0), s.clearColor(0, 0, 0, 0), s.depthMask(!0), s.depthFunc(s.LESS), s.clearDepth(1), s.stencilMask(4294967295), s.stencilFunc(s.ALWAYS, 0, 4294967295), s.stencilOp(s.KEEP, s.KEEP, s.KEEP), s.clearStencil(0), s.cullFace(s.BACK), s.frontFace(s.CCW), s.polygonOffset(0, 0), s.activeTexture(s.TEXTURE0), s.bindFramebuffer(s.FRAMEBUFFER, null), r === !0 && (s.bindFramebuffer(s.DRAW_FRAMEBUFFER, null), s.bindFramebuffer(s.READ_FRAMEBUFFER, null)), s.useProgram(null), s.lineWidth(1), s.scissor(0, 0, s.canvas.width, s.canvas.height), s.viewport(0, 0, s.canvas.width, s.canvas.height), h = {}, U = null, V = {}, d = {}, _ = /* @__PURE__ */ new WeakMap(), v = [], p = null, m = !1, y = null, g = null, A = null, w = null, T = null, S = null, C = null, z = new me(0, 0, 0), x = 0, R = !1, L = null, k = null, P = null, W = null, O = null, B.set(0, 0, s.canvas.width, s.canvas.height), Q.set(0, 0, s.canvas.width, s.canvas.height), a.reset(), l.reset(), c.reset();
  }
  return {
    buffers: {
      color: a,
      depth: l,
      stencil: c
    },
    enable: te,
    disable: de,
    bindFramebuffer: le,
    drawBuffers: F,
    useProgram: Ue,
    setBlending: ue,
    setMaterial: Me,
    setFlipSided: ce,
    setCullFace: ve,
    setLineWidth: we,
    setPolygonOffset: E,
    setScissorTest: M,
    activeTexture: N,
    bindTexture: Z,
    unbindTexture: $,
    compressedTexImage2D: oe,
    compressedTexImage3D: Se,
    texImage2D: Pe,
    texImage3D: xe,
    updateUBOMapping: ke,
    uniformBlockBinding: Ie,
    texStorage2D: ge,
    texStorage3D: Be,
    texSubImage2D: ye,
    texSubImage3D: se,
    compressedTexSubImage2D: he,
    compressedTexSubImage3D: Ne,
    scissor: Ae,
    viewport: Ce,
    reset: Le
  };
}
function xd(s, e, t, r, n, i, o) {
  const a = n.isWebGL2, l = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), u = new De(), f = /* @__PURE__ */ new WeakMap();
  let h;
  const d = /* @__PURE__ */ new WeakMap();
  let _ = !1;
  try {
    _ = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function v(E, M) {
    return _ ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(E, M)
    ) : Qi("canvas");
  }
  function p(E, M, N, Z) {
    let $ = 1;
    const oe = we(E);
    if ((oe.width > Z || oe.height > Z) && ($ = Z / Math.max(oe.width, oe.height)), $ < 1 || M === !0)
      if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap || typeof VideoFrame < "u" && E instanceof VideoFrame) {
        const Se = M ? ks : Math.floor, ye = Se($ * oe.width), se = Se($ * oe.height);
        h === void 0 && (h = v(ye, se));
        const he = N ? v(ye, se) : h;
        return he.width = ye, he.height = se, he.getContext("2d").drawImage(E, 0, 0, ye, se), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + oe.width + "x" + oe.height + ") to (" + ye + "x" + se + ")."), he;
      } else
        return "data" in E && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + oe.width + "x" + oe.height + ")."), E;
    return E;
  }
  function m(E) {
    const M = we(E);
    return xa(M.width) && xa(M.height);
  }
  function y(E) {
    return a ? !1 : E.wrapS !== 1001 || E.wrapT !== 1001 || E.minFilter !== 1003 && E.minFilter !== 1006;
  }
  function g(E, M) {
    return E.generateMipmaps && M && E.minFilter !== 1003 && E.minFilter !== 1006;
  }
  function A(E) {
    s.generateMipmap(E);
  }
  function w(E, M, N, Z, $ = !1) {
    if (a === !1) return M;
    if (E !== null) {
      if (s[E] !== void 0) return s[E];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'");
    }
    let oe = M;
    if (M === s.RED && (N === s.FLOAT && (oe = s.R32F), N === s.HALF_FLOAT && (oe = s.R16F), N === s.UNSIGNED_BYTE && (oe = s.R8)), M === s.RED_INTEGER && (N === s.UNSIGNED_BYTE && (oe = s.R8UI), N === s.UNSIGNED_SHORT && (oe = s.R16UI), N === s.UNSIGNED_INT && (oe = s.R32UI), N === s.BYTE && (oe = s.R8I), N === s.SHORT && (oe = s.R16I), N === s.INT && (oe = s.R32I)), M === s.RG && (N === s.FLOAT && (oe = s.RG32F), N === s.HALF_FLOAT && (oe = s.RG16F), N === s.UNSIGNED_BYTE && (oe = s.RG8)), M === s.RG_INTEGER && (N === s.UNSIGNED_BYTE && (oe = s.RG8UI), N === s.UNSIGNED_SHORT && (oe = s.RG16UI), N === s.UNSIGNED_INT && (oe = s.RG32UI), N === s.BYTE && (oe = s.RG8I), N === s.SHORT && (oe = s.RG16I), N === s.INT && (oe = s.RG32I)), M === s.RGBA) {
      const Se = $ ? Xr : st.getTransfer(Z);
      N === s.FLOAT && (oe = s.RGBA32F), N === s.HALF_FLOAT && (oe = s.RGBA16F), N === s.UNSIGNED_BYTE && (oe = Se === lt ? s.SRGB8_ALPHA8 : s.RGBA8), N === s.UNSIGNED_SHORT_4_4_4_4 && (oe = s.RGBA4), N === s.UNSIGNED_SHORT_5_5_5_1 && (oe = s.RGB5_A1);
    }
    return (oe === s.R16F || oe === s.R32F || oe === s.RG16F || oe === s.RG32F || oe === s.RGBA16F || oe === s.RGBA32F) && e.get("EXT_color_buffer_float"), oe;
  }
  function T(E, M, N) {
    return g(E, N) === !0 || E.isFramebufferTexture && E.minFilter !== 1003 && E.minFilter !== 1006 ? Math.log2(Math.max(M.width, M.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? M.mipmaps.length : 1;
  }
  function S(E) {
    return E === 1003 || E === 1004 || E === 1005 ? s.NEAREST : s.LINEAR;
  }
  function C(E) {
    const M = E.target;
    M.removeEventListener("dispose", C), x(M), M.isVideoTexture && f.delete(M);
  }
  function z(E) {
    const M = E.target;
    M.removeEventListener("dispose", z), L(M);
  }
  function x(E) {
    const M = r.get(E);
    if (M.__webglInit === void 0) return;
    const N = E.source, Z = d.get(N);
    if (Z) {
      const $ = Z[M.__cacheKey];
      $.usedTimes--, $.usedTimes === 0 && R(E), Object.keys(Z).length === 0 && d.delete(N);
    }
    r.remove(E);
  }
  function R(E) {
    const M = r.get(E);
    s.deleteTexture(M.__webglTexture);
    const N = E.source, Z = d.get(N);
    delete Z[M.__cacheKey], o.memory.textures--;
  }
  function L(E) {
    const M = r.get(E);
    if (E.depthTexture && E.depthTexture.dispose(), E.isWebGLCubeRenderTarget)
      for (let Z = 0; Z < 6; Z++) {
        if (Array.isArray(M.__webglFramebuffer[Z]))
          for (let $ = 0; $ < M.__webglFramebuffer[Z].length; $++) s.deleteFramebuffer(M.__webglFramebuffer[Z][$]);
        else
          s.deleteFramebuffer(M.__webglFramebuffer[Z]);
        M.__webglDepthbuffer && s.deleteRenderbuffer(M.__webglDepthbuffer[Z]);
      }
    else {
      if (Array.isArray(M.__webglFramebuffer))
        for (let Z = 0; Z < M.__webglFramebuffer.length; Z++) s.deleteFramebuffer(M.__webglFramebuffer[Z]);
      else
        s.deleteFramebuffer(M.__webglFramebuffer);
      if (M.__webglDepthbuffer && s.deleteRenderbuffer(M.__webglDepthbuffer), M.__webglMultisampledFramebuffer && s.deleteFramebuffer(M.__webglMultisampledFramebuffer), M.__webglColorRenderbuffer)
        for (let Z = 0; Z < M.__webglColorRenderbuffer.length; Z++)
          M.__webglColorRenderbuffer[Z] && s.deleteRenderbuffer(M.__webglColorRenderbuffer[Z]);
      M.__webglDepthRenderbuffer && s.deleteRenderbuffer(M.__webglDepthRenderbuffer);
    }
    const N = E.textures;
    for (let Z = 0, $ = N.length; Z < $; Z++) {
      const oe = r.get(N[Z]);
      oe.__webglTexture && (s.deleteTexture(oe.__webglTexture), o.memory.textures--), r.remove(N[Z]);
    }
    r.remove(E);
  }
  let k = 0;
  function P() {
    k = 0;
  }
  function W() {
    const E = k;
    return E >= n.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + n.maxTextures), k += 1, E;
  }
  function O(E) {
    const M = [];
    return M.push(E.wrapS), M.push(E.wrapT), M.push(E.wrapR || 0), M.push(E.magFilter), M.push(E.minFilter), M.push(E.anisotropy), M.push(E.internalFormat), M.push(E.format), M.push(E.type), M.push(E.generateMipmaps), M.push(E.premultiplyAlpha), M.push(E.flipY), M.push(E.unpackAlignment), M.push(E.colorSpace), M.join();
  }
  function Y(E, M) {
    const N = r.get(E);
    if (E.isVideoTexture && ce(E), E.isRenderTargetTexture === !1 && E.version > 0 && N.__version !== E.version) {
      const Z = E.image;
      if (Z === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (Z.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Q(N, E, M);
        return;
      }
    }
    t.bindTexture(s.TEXTURE_2D, N.__webglTexture, s.TEXTURE0 + M);
  }
  function b(E, M) {
    const N = r.get(E);
    if (E.version > 0 && N.__version !== E.version) {
      Q(N, E, M);
      return;
    }
    t.bindTexture(s.TEXTURE_2D_ARRAY, N.__webglTexture, s.TEXTURE0 + M);
  }
  function G(E, M) {
    const N = r.get(E);
    if (E.version > 0 && N.__version !== E.version) {
      Q(N, E, M);
      return;
    }
    t.bindTexture(s.TEXTURE_3D, N.__webglTexture, s.TEXTURE0 + M);
  }
  function X(E, M) {
    const N = r.get(E);
    if (E.version > 0 && N.__version !== E.version) {
      ee(N, E, M);
      return;
    }
    t.bindTexture(s.TEXTURE_CUBE_MAP, N.__webglTexture, s.TEXTURE0 + M);
  }
  const U = {
    1e3: s.REPEAT,
    1001: s.CLAMP_TO_EDGE,
    1002: s.MIRRORED_REPEAT
  }, V = {
    1003: s.NEAREST,
    1004: s.NEAREST_MIPMAP_NEAREST,
    1005: s.NEAREST_MIPMAP_LINEAR,
    1006: s.LINEAR,
    1007: s.LINEAR_MIPMAP_NEAREST,
    1008: s.LINEAR_MIPMAP_LINEAR
  }, K = {
    512: s.NEVER,
    519: s.ALWAYS,
    513: s.LESS,
    515: s.LEQUAL,
    514: s.EQUAL,
    518: s.GEQUAL,
    516: s.GREATER,
    517: s.NOTEQUAL
  };
  function I(E, M, N) {
    if (M.type === 1015 && e.has("OES_texture_float_linear") === !1 && (M.magFilter === 1006 || M.magFilter === 1007 || M.magFilter === 1005 || M.magFilter === 1008 || M.minFilter === 1006 || M.minFilter === 1007 || M.minFilter === 1005 || M.minFilter === 1008) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), N ? (s.texParameteri(E, s.TEXTURE_WRAP_S, U[M.wrapS]), s.texParameteri(E, s.TEXTURE_WRAP_T, U[M.wrapT]), (E === s.TEXTURE_3D || E === s.TEXTURE_2D_ARRAY) && s.texParameteri(E, s.TEXTURE_WRAP_R, U[M.wrapR]), s.texParameteri(E, s.TEXTURE_MAG_FILTER, V[M.magFilter]), s.texParameteri(E, s.TEXTURE_MIN_FILTER, V[M.minFilter])) : (s.texParameteri(E, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE), s.texParameteri(E, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE), (E === s.TEXTURE_3D || E === s.TEXTURE_2D_ARRAY) && s.texParameteri(E, s.TEXTURE_WRAP_R, s.CLAMP_TO_EDGE), (M.wrapS !== 1001 || M.wrapT !== 1001) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), s.texParameteri(E, s.TEXTURE_MAG_FILTER, S(M.magFilter)), s.texParameteri(E, s.TEXTURE_MIN_FILTER, S(M.minFilter)), M.minFilter !== 1003 && M.minFilter !== 1006 && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), M.compareFunction && (s.texParameteri(E, s.TEXTURE_COMPARE_MODE, s.COMPARE_REF_TO_TEXTURE), s.texParameteri(E, s.TEXTURE_COMPARE_FUNC, K[M.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (M.magFilter === 1003 || M.minFilter !== 1005 && M.minFilter !== 1008 || M.type === 1015 && e.has("OES_texture_float_linear") === !1 || a === !1 && M.type === 1016 && e.has("OES_texture_half_float_linear") === !1) return;
      if (M.anisotropy > 1 || r.get(M).__currentAnisotropy) {
        const Z = e.get("EXT_texture_filter_anisotropic");
        s.texParameterf(E, Z.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(M.anisotropy, n.getMaxAnisotropy())), r.get(M).__currentAnisotropy = M.anisotropy;
      }
    }
  }
  function B(E, M) {
    let N = !1;
    E.__webglInit === void 0 && (E.__webglInit = !0, M.addEventListener("dispose", C));
    const Z = M.source;
    let $ = d.get(Z);
    $ === void 0 && ($ = {}, d.set(Z, $));
    const oe = O(M);
    if (oe !== E.__cacheKey) {
      $[oe] === void 0 && ($[oe] = {
        texture: s.createTexture(),
        usedTimes: 0
      }, o.memory.textures++, N = !0), $[oe].usedTimes++;
      const Se = $[E.__cacheKey];
      Se !== void 0 && ($[E.__cacheKey].usedTimes--, Se.usedTimes === 0 && R(M)), E.__cacheKey = oe, E.__webglTexture = $[oe].texture;
    }
    return N;
  }
  function Q(E, M, N) {
    let Z = s.TEXTURE_2D;
    (M.isDataArrayTexture || M.isCompressedArrayTexture) && (Z = s.TEXTURE_2D_ARRAY), M.isData3DTexture && (Z = s.TEXTURE_3D);
    const $ = B(E, M), oe = M.source;
    t.bindTexture(Z, E.__webglTexture, s.TEXTURE0 + N);
    const Se = r.get(oe);
    if (oe.version !== Se.__version || $ === !0) {
      t.activeTexture(s.TEXTURE0 + N);
      const ye = st.getPrimaries(st.workingColorSpace), se = M.colorSpace === Pn ? null : st.getPrimaries(M.colorSpace), he = M.colorSpace === Pn || ye === se ? s.NONE : s.BROWSER_DEFAULT_WEBGL;
      s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, M.flipY), s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, M.premultiplyAlpha), s.pixelStorei(s.UNPACK_ALIGNMENT, M.unpackAlignment), s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL, he);
      const Ne = y(M) && m(M.image) === !1;
      let ge = p(M.image, Ne, !1, n.maxTextureSize);
      ge = ve(M, ge);
      const Be = m(ge) || a, Pe = i.convert(M.format, M.colorSpace);
      let xe = i.convert(M.type), Ae = w(M.internalFormat, Pe, xe, M.colorSpace, M.isVideoTexture);
      I(Z, M, Be);
      let Ce;
      const ke = M.mipmaps, Ie = a && M.isVideoTexture !== !0 && Ae !== 36196, Le = Se.__version === void 0 || $ === !0, H = oe.dataReady, Ee = T(M, ge, Be);
      if (M.isDepthTexture)
        Ae = s.DEPTH_COMPONENT, a ? M.type === 1015 ? Ae = s.DEPTH_COMPONENT32F : M.type === 1014 ? Ae = s.DEPTH_COMPONENT24 : M.type === 1020 ? Ae = s.DEPTH24_STENCIL8 : Ae = s.DEPTH_COMPONENT16 : M.type === 1015 && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), M.format === 1026 && Ae === s.DEPTH_COMPONENT && M.type !== 1012 && M.type !== 1014 && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), M.type = 1014, xe = i.convert(M.type)), M.format === 1027 && Ae === s.DEPTH_COMPONENT && (Ae = s.DEPTH_STENCIL, M.type !== 1020 && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), M.type = 1020, xe = i.convert(M.type))), Le && (Ie ? t.texStorage2D(s.TEXTURE_2D, 1, Ae, ge.width, ge.height) : t.texImage2D(s.TEXTURE_2D, 0, Ae, ge.width, ge.height, 0, Pe, xe, null));
      else if (M.isDataTexture)
        if (ke.length > 0 && Be) {
          Ie && Le && t.texStorage2D(s.TEXTURE_2D, Ee, Ae, ke[0].width, ke[0].height);
          for (let j = 0, fe = ke.length; j < fe; j++)
            Ce = ke[j], Ie ? H && t.texSubImage2D(s.TEXTURE_2D, j, 0, 0, Ce.width, Ce.height, Pe, xe, Ce.data) : t.texImage2D(s.TEXTURE_2D, j, Ae, Ce.width, Ce.height, 0, Pe, xe, Ce.data);
          M.generateMipmaps = !1;
        } else
          Ie ? (Le && t.texStorage2D(s.TEXTURE_2D, Ee, Ae, ge.width, ge.height), H && t.texSubImage2D(s.TEXTURE_2D, 0, 0, 0, ge.width, ge.height, Pe, xe, ge.data)) : t.texImage2D(s.TEXTURE_2D, 0, Ae, ge.width, ge.height, 0, Pe, xe, ge.data);
      else if (M.isCompressedTexture)
        if (M.isCompressedArrayTexture) {
          Ie && Le && t.texStorage3D(s.TEXTURE_2D_ARRAY, Ee, Ae, ke[0].width, ke[0].height, ge.depth);
          for (let j = 0, fe = ke.length; j < fe; j++)
            Ce = ke[j], M.format !== 1023 ? Pe !== null ? Ie ? H && t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY, j, 0, 0, 0, Ce.width, Ce.height, ge.depth, Pe, Ce.data, 0, 0) : t.compressedTexImage3D(s.TEXTURE_2D_ARRAY, j, Ae, Ce.width, Ce.height, ge.depth, 0, Ce.data, 0, 0) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Ie ? H && t.texSubImage3D(s.TEXTURE_2D_ARRAY, j, 0, 0, 0, Ce.width, Ce.height, ge.depth, Pe, xe, Ce.data) : t.texImage3D(s.TEXTURE_2D_ARRAY, j, Ae, Ce.width, Ce.height, ge.depth, 0, Pe, xe, Ce.data);
        } else {
          Ie && Le && t.texStorage2D(s.TEXTURE_2D, Ee, Ae, ke[0].width, ke[0].height);
          for (let j = 0, fe = ke.length; j < fe; j++)
            Ce = ke[j], M.format !== 1023 ? Pe !== null ? Ie ? H && t.compressedTexSubImage2D(s.TEXTURE_2D, j, 0, 0, Ce.width, Ce.height, Pe, Ce.data) : t.compressedTexImage2D(s.TEXTURE_2D, j, Ae, Ce.width, Ce.height, 0, Ce.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Ie ? H && t.texSubImage2D(s.TEXTURE_2D, j, 0, 0, Ce.width, Ce.height, Pe, xe, Ce.data) : t.texImage2D(s.TEXTURE_2D, j, Ae, Ce.width, Ce.height, 0, Pe, xe, Ce.data);
        }
      else if (M.isDataArrayTexture)
        Ie ? (Le && t.texStorage3D(s.TEXTURE_2D_ARRAY, Ee, Ae, ge.width, ge.height, ge.depth), H && t.texSubImage3D(s.TEXTURE_2D_ARRAY, 0, 0, 0, 0, ge.width, ge.height, ge.depth, Pe, xe, ge.data)) : t.texImage3D(s.TEXTURE_2D_ARRAY, 0, Ae, ge.width, ge.height, ge.depth, 0, Pe, xe, ge.data);
      else if (M.isData3DTexture)
        Ie ? (Le && t.texStorage3D(s.TEXTURE_3D, Ee, Ae, ge.width, ge.height, ge.depth), H && t.texSubImage3D(s.TEXTURE_3D, 0, 0, 0, 0, ge.width, ge.height, ge.depth, Pe, xe, ge.data)) : t.texImage3D(s.TEXTURE_3D, 0, Ae, ge.width, ge.height, ge.depth, 0, Pe, xe, ge.data);
      else if (M.isFramebufferTexture) {
        if (Le)
          if (Ie)
            t.texStorage2D(s.TEXTURE_2D, Ee, Ae, ge.width, ge.height);
          else {
            let j = ge.width, fe = ge.height;
            for (let Te = 0; Te < Ee; Te++)
              t.texImage2D(s.TEXTURE_2D, Te, Ae, j, fe, 0, Pe, xe, null), j >>= 1, fe >>= 1;
          }
      } else if (ke.length > 0 && Be) {
        if (Ie && Le) {
          const j = we(ke[0]);
          t.texStorage2D(s.TEXTURE_2D, Ee, Ae, j.width, j.height);
        }
        for (let j = 0, fe = ke.length; j < fe; j++)
          Ce = ke[j], Ie ? H && t.texSubImage2D(s.TEXTURE_2D, j, 0, 0, Pe, xe, Ce) : t.texImage2D(s.TEXTURE_2D, j, Ae, Pe, xe, Ce);
        M.generateMipmaps = !1;
      } else if (Ie) {
        if (Le) {
          const j = we(ge);
          t.texStorage2D(s.TEXTURE_2D, Ee, Ae, j.width, j.height);
        }
        H && t.texSubImage2D(s.TEXTURE_2D, 0, 0, 0, Pe, xe, ge);
      } else
        t.texImage2D(s.TEXTURE_2D, 0, Ae, Pe, xe, ge);
      g(M, Be) && A(Z), Se.__version = oe.version, M.onUpdate && M.onUpdate(M);
    }
    E.__version = M.version;
  }
  function ee(E, M, N) {
    if (M.image.length !== 6) return;
    const Z = B(E, M), $ = M.source;
    t.bindTexture(s.TEXTURE_CUBE_MAP, E.__webglTexture, s.TEXTURE0 + N);
    const oe = r.get($);
    if ($.version !== oe.__version || Z === !0) {
      t.activeTexture(s.TEXTURE0 + N);
      const Se = st.getPrimaries(st.workingColorSpace), ye = M.colorSpace === Pn ? null : st.getPrimaries(M.colorSpace), se = M.colorSpace === Pn || Se === ye ? s.NONE : s.BROWSER_DEFAULT_WEBGL;
      s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, M.flipY), s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, M.premultiplyAlpha), s.pixelStorei(s.UNPACK_ALIGNMENT, M.unpackAlignment), s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL, se);
      const he = M.isCompressedTexture || M.image[0].isCompressedTexture, Ne = M.image[0] && M.image[0].isDataTexture, ge = [];
      for (let j = 0; j < 6; j++)
        !he && !Ne ? ge[j] = p(M.image[j], !1, !0, n.maxCubemapSize) : ge[j] = Ne ? M.image[j].image : M.image[j], ge[j] = ve(M, ge[j]);
      const Be = ge[0], Pe = m(Be) || a, xe = i.convert(M.format, M.colorSpace), Ae = i.convert(M.type), Ce = w(M.internalFormat, xe, Ae, M.colorSpace), ke = a && M.isVideoTexture !== !0, Ie = oe.__version === void 0 || Z === !0, Le = $.dataReady;
      let H = T(M, Be, Pe);
      I(s.TEXTURE_CUBE_MAP, M, Pe);
      let Ee;
      if (he) {
        ke && Ie && t.texStorage2D(s.TEXTURE_CUBE_MAP, H, Ce, Be.width, Be.height);
        for (let j = 0; j < 6; j++) {
          Ee = ge[j].mipmaps;
          for (let fe = 0; fe < Ee.length; fe++) {
            const Te = Ee[fe];
            M.format !== 1023 ? xe !== null ? ke ? Le && t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + j, fe, 0, 0, Te.width, Te.height, xe, Te.data) : t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + j, fe, Ce, Te.width, Te.height, 0, Te.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : ke ? Le && t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + j, fe, 0, 0, Te.width, Te.height, xe, Ae, Te.data) : t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + j, fe, Ce, Te.width, Te.height, 0, xe, Ae, Te.data);
          }
        }
      } else {
        if (Ee = M.mipmaps, ke && Ie) {
          Ee.length > 0 && H++;
          const j = we(ge[0]);
          t.texStorage2D(s.TEXTURE_CUBE_MAP, H, Ce, j.width, j.height);
        }
        for (let j = 0; j < 6; j++)
          if (Ne) {
            ke ? Le && t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, ge[j].width, ge[j].height, xe, Ae, ge[j].data) : t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, Ce, ge[j].width, ge[j].height, 0, xe, Ae, ge[j].data);
            for (let fe = 0; fe < Ee.length; fe++) {
              const ze = Ee[fe].image[j].image;
              ke ? Le && t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + j, fe + 1, 0, 0, ze.width, ze.height, xe, Ae, ze.data) : t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + j, fe + 1, Ce, ze.width, ze.height, 0, xe, Ae, ze.data);
            }
          } else {
            ke ? Le && t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, xe, Ae, ge[j]) : t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, Ce, xe, Ae, ge[j]);
            for (let fe = 0; fe < Ee.length; fe++) {
              const Te = Ee[fe];
              ke ? Le && t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + j, fe + 1, 0, 0, xe, Ae, Te.image[j]) : t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + j, fe + 1, Ce, xe, Ae, Te.image[j]);
            }
          }
      }
      g(M, Pe) && A(s.TEXTURE_CUBE_MAP), oe.__version = $.version, M.onUpdate && M.onUpdate(M);
    }
    E.__version = M.version;
  }
  function q(E, M, N, Z, $, oe) {
    const Se = i.convert(N.format, N.colorSpace), ye = i.convert(N.type), se = w(N.internalFormat, Se, ye, N.colorSpace);
    if (!r.get(M).__hasExternalTextures) {
      const Ne = Math.max(1, M.width >> oe), ge = Math.max(1, M.height >> oe);
      $ === s.TEXTURE_3D || $ === s.TEXTURE_2D_ARRAY ? t.texImage3D($, oe, se, Ne, ge, M.depth, 0, Se, ye, null) : t.texImage2D($, oe, se, Ne, ge, 0, Se, ye, null);
    }
    t.bindFramebuffer(s.FRAMEBUFFER, E), Me(M) ? l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER, Z, $, r.get(N).__webglTexture, 0, ue(M)) : ($ === s.TEXTURE_2D || $ >= s.TEXTURE_CUBE_MAP_POSITIVE_X && $ <= s.TEXTURE_CUBE_MAP_NEGATIVE_Z) && s.framebufferTexture2D(s.FRAMEBUFFER, Z, $, r.get(N).__webglTexture, oe), t.bindFramebuffer(s.FRAMEBUFFER, null);
  }
  function te(E, M, N) {
    if (s.bindRenderbuffer(s.RENDERBUFFER, E), M.depthBuffer && !M.stencilBuffer) {
      let Z = a === !0 ? s.DEPTH_COMPONENT24 : s.DEPTH_COMPONENT16;
      if (N || Me(M)) {
        const $ = M.depthTexture;
        $ && $.isDepthTexture && ($.type === 1015 ? Z = s.DEPTH_COMPONENT32F : $.type === 1014 && (Z = s.DEPTH_COMPONENT24));
        const oe = ue(M);
        Me(M) ? l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER, oe, Z, M.width, M.height) : s.renderbufferStorageMultisample(s.RENDERBUFFER, oe, Z, M.width, M.height);
      } else
        s.renderbufferStorage(s.RENDERBUFFER, Z, M.width, M.height);
      s.framebufferRenderbuffer(s.FRAMEBUFFER, s.DEPTH_ATTACHMENT, s.RENDERBUFFER, E);
    } else if (M.depthBuffer && M.stencilBuffer) {
      const Z = ue(M);
      N && Me(M) === !1 ? s.renderbufferStorageMultisample(s.RENDERBUFFER, Z, s.DEPTH24_STENCIL8, M.width, M.height) : Me(M) ? l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER, Z, s.DEPTH24_STENCIL8, M.width, M.height) : s.renderbufferStorage(s.RENDERBUFFER, s.DEPTH_STENCIL, M.width, M.height), s.framebufferRenderbuffer(s.FRAMEBUFFER, s.DEPTH_STENCIL_ATTACHMENT, s.RENDERBUFFER, E);
    } else {
      const Z = M.textures;
      for (let $ = 0; $ < Z.length; $++) {
        const oe = Z[$], Se = i.convert(oe.format, oe.colorSpace), ye = i.convert(oe.type), se = w(oe.internalFormat, Se, ye, oe.colorSpace), he = ue(M);
        N && Me(M) === !1 ? s.renderbufferStorageMultisample(s.RENDERBUFFER, he, se, M.width, M.height) : Me(M) ? l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER, he, se, M.width, M.height) : s.renderbufferStorage(s.RENDERBUFFER, se, M.width, M.height);
      }
    }
    s.bindRenderbuffer(s.RENDERBUFFER, null);
  }
  function de(E, M) {
    if (M && M.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (t.bindFramebuffer(s.FRAMEBUFFER, E), !(M.depthTexture && M.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!r.get(M.depthTexture).__webglTexture || M.depthTexture.image.width !== M.width || M.depthTexture.image.height !== M.height) && (M.depthTexture.image.width = M.width, M.depthTexture.image.height = M.height, M.depthTexture.needsUpdate = !0), Y(M.depthTexture, 0);
    const Z = r.get(M.depthTexture).__webglTexture, $ = ue(M);
    if (M.depthTexture.format === 1026)
      Me(M) ? l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER, s.DEPTH_ATTACHMENT, s.TEXTURE_2D, Z, 0, $) : s.framebufferTexture2D(s.FRAMEBUFFER, s.DEPTH_ATTACHMENT, s.TEXTURE_2D, Z, 0);
    else if (M.depthTexture.format === 1027)
      Me(M) ? l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER, s.DEPTH_STENCIL_ATTACHMENT, s.TEXTURE_2D, Z, 0, $) : s.framebufferTexture2D(s.FRAMEBUFFER, s.DEPTH_STENCIL_ATTACHMENT, s.TEXTURE_2D, Z, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function le(E) {
    const M = r.get(E), N = E.isWebGLCubeRenderTarget === !0;
    if (E.depthTexture && !M.__autoAllocateDepthBuffer) {
      if (N) throw new Error("target.depthTexture not supported in Cube render targets");
      de(M.__webglFramebuffer, E);
    } else if (N) {
      M.__webglDepthbuffer = [];
      for (let Z = 0; Z < 6; Z++)
        t.bindFramebuffer(s.FRAMEBUFFER, M.__webglFramebuffer[Z]), M.__webglDepthbuffer[Z] = s.createRenderbuffer(), te(M.__webglDepthbuffer[Z], E, !1);
    } else
      t.bindFramebuffer(s.FRAMEBUFFER, M.__webglFramebuffer), M.__webglDepthbuffer = s.createRenderbuffer(), te(M.__webglDepthbuffer, E, !1);
    t.bindFramebuffer(s.FRAMEBUFFER, null);
  }
  function F(E, M, N) {
    const Z = r.get(E);
    M !== void 0 && q(Z.__webglFramebuffer, E, E.texture, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, 0), N !== void 0 && le(E);
  }
  function Ue(E) {
    const M = E.texture, N = r.get(E), Z = r.get(M);
    E.addEventListener("dispose", z);
    const $ = E.textures, oe = E.isWebGLCubeRenderTarget === !0, Se = $.length > 1, ye = m(E) || a;
    if (Se || (Z.__webglTexture === void 0 && (Z.__webglTexture = s.createTexture()), Z.__version = M.version, o.memory.textures++), oe) {
      N.__webglFramebuffer = [];
      for (let se = 0; se < 6; se++)
        if (a && M.mipmaps && M.mipmaps.length > 0) {
          N.__webglFramebuffer[se] = [];
          for (let he = 0; he < M.mipmaps.length; he++)
            N.__webglFramebuffer[se][he] = s.createFramebuffer();
        } else
          N.__webglFramebuffer[se] = s.createFramebuffer();
    } else {
      if (a && M.mipmaps && M.mipmaps.length > 0) {
        N.__webglFramebuffer = [];
        for (let se = 0; se < M.mipmaps.length; se++)
          N.__webglFramebuffer[se] = s.createFramebuffer();
      } else
        N.__webglFramebuffer = s.createFramebuffer();
      if (Se)
        if (n.drawBuffers)
          for (let se = 0, he = $.length; se < he; se++) {
            const Ne = r.get($[se]);
            Ne.__webglTexture === void 0 && (Ne.__webglTexture = s.createTexture(), o.memory.textures++);
          }
        else
          console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
      if (a && E.samples > 0 && Me(E) === !1) {
        N.__webglMultisampledFramebuffer = s.createFramebuffer(), N.__webglColorRenderbuffer = [], t.bindFramebuffer(s.FRAMEBUFFER, N.__webglMultisampledFramebuffer);
        for (let se = 0; se < $.length; se++) {
          const he = $[se];
          N.__webglColorRenderbuffer[se] = s.createRenderbuffer(), s.bindRenderbuffer(s.RENDERBUFFER, N.__webglColorRenderbuffer[se]);
          const Ne = i.convert(he.format, he.colorSpace), ge = i.convert(he.type), Be = w(he.internalFormat, Ne, ge, he.colorSpace, E.isXRRenderTarget === !0), Pe = ue(E);
          s.renderbufferStorageMultisample(s.RENDERBUFFER, Pe, Be, E.width, E.height), s.framebufferRenderbuffer(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0 + se, s.RENDERBUFFER, N.__webglColorRenderbuffer[se]);
        }
        s.bindRenderbuffer(s.RENDERBUFFER, null), E.depthBuffer && (N.__webglDepthRenderbuffer = s.createRenderbuffer(), te(N.__webglDepthRenderbuffer, E, !0)), t.bindFramebuffer(s.FRAMEBUFFER, null);
      }
    }
    if (oe) {
      t.bindTexture(s.TEXTURE_CUBE_MAP, Z.__webglTexture), I(s.TEXTURE_CUBE_MAP, M, ye);
      for (let se = 0; se < 6; se++)
        if (a && M.mipmaps && M.mipmaps.length > 0)
          for (let he = 0; he < M.mipmaps.length; he++)
            q(N.__webglFramebuffer[se][he], E, M, s.COLOR_ATTACHMENT0, s.TEXTURE_CUBE_MAP_POSITIVE_X + se, he);
        else
          q(N.__webglFramebuffer[se], E, M, s.COLOR_ATTACHMENT0, s.TEXTURE_CUBE_MAP_POSITIVE_X + se, 0);
      g(M, ye) && A(s.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (Se) {
      for (let se = 0, he = $.length; se < he; se++) {
        const Ne = $[se], ge = r.get(Ne);
        t.bindTexture(s.TEXTURE_2D, ge.__webglTexture), I(s.TEXTURE_2D, Ne, ye), q(N.__webglFramebuffer, E, Ne, s.COLOR_ATTACHMENT0 + se, s.TEXTURE_2D, 0), g(Ne, ye) && A(s.TEXTURE_2D);
      }
      t.unbindTexture();
    } else {
      let se = s.TEXTURE_2D;
      if ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (a ? se = E.isWebGL3DRenderTarget ? s.TEXTURE_3D : s.TEXTURE_2D_ARRAY : console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")), t.bindTexture(se, Z.__webglTexture), I(se, M, ye), a && M.mipmaps && M.mipmaps.length > 0)
        for (let he = 0; he < M.mipmaps.length; he++)
          q(N.__webglFramebuffer[he], E, M, s.COLOR_ATTACHMENT0, se, he);
      else
        q(N.__webglFramebuffer, E, M, s.COLOR_ATTACHMENT0, se, 0);
      g(M, ye) && A(se), t.unbindTexture();
    }
    E.depthBuffer && le(E);
  }
  function _e(E) {
    const M = m(E) || a, N = E.textures;
    for (let Z = 0, $ = N.length; Z < $; Z++) {
      const oe = N[Z];
      if (g(oe, M)) {
        const Se = E.isWebGLCubeRenderTarget ? s.TEXTURE_CUBE_MAP : s.TEXTURE_2D, ye = r.get(oe).__webglTexture;
        t.bindTexture(Se, ye), A(Se), t.unbindTexture();
      }
    }
  }
  function pe(E) {
    if (a && E.samples > 0 && Me(E) === !1) {
      const M = E.textures, N = E.width, Z = E.height;
      let $ = s.COLOR_BUFFER_BIT;
      const oe = [], Se = E.stencilBuffer ? s.DEPTH_STENCIL_ATTACHMENT : s.DEPTH_ATTACHMENT, ye = r.get(E), se = M.length > 1;
      if (se)
        for (let he = 0; he < M.length; he++)
          t.bindFramebuffer(s.FRAMEBUFFER, ye.__webglMultisampledFramebuffer), s.framebufferRenderbuffer(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0 + he, s.RENDERBUFFER, null), t.bindFramebuffer(s.FRAMEBUFFER, ye.__webglFramebuffer), s.framebufferTexture2D(s.DRAW_FRAMEBUFFER, s.COLOR_ATTACHMENT0 + he, s.TEXTURE_2D, null, 0);
      t.bindFramebuffer(s.READ_FRAMEBUFFER, ye.__webglMultisampledFramebuffer), t.bindFramebuffer(s.DRAW_FRAMEBUFFER, ye.__webglFramebuffer);
      for (let he = 0; he < M.length; he++) {
        oe.push(s.COLOR_ATTACHMENT0 + he), E.depthBuffer && oe.push(Se);
        const Ne = ye.__ignoreDepthValues !== void 0 ? ye.__ignoreDepthValues : !1;
        if (Ne === !1 && (E.depthBuffer && ($ |= s.DEPTH_BUFFER_BIT), E.stencilBuffer && ($ |= s.STENCIL_BUFFER_BIT)), se && s.framebufferRenderbuffer(s.READ_FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.RENDERBUFFER, ye.__webglColorRenderbuffer[he]), Ne === !0 && (s.invalidateFramebuffer(s.READ_FRAMEBUFFER, [Se]), s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER, [Se])), se) {
          const ge = r.get(M[he]).__webglTexture;
          s.framebufferTexture2D(s.DRAW_FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, ge, 0);
        }
        s.blitFramebuffer(0, 0, N, Z, 0, 0, N, Z, $, s.NEAREST), c && s.invalidateFramebuffer(s.READ_FRAMEBUFFER, oe);
      }
      if (t.bindFramebuffer(s.READ_FRAMEBUFFER, null), t.bindFramebuffer(s.DRAW_FRAMEBUFFER, null), se)
        for (let he = 0; he < M.length; he++) {
          t.bindFramebuffer(s.FRAMEBUFFER, ye.__webglMultisampledFramebuffer), s.framebufferRenderbuffer(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0 + he, s.RENDERBUFFER, ye.__webglColorRenderbuffer[he]);
          const Ne = r.get(M[he]).__webglTexture;
          t.bindFramebuffer(s.FRAMEBUFFER, ye.__webglFramebuffer), s.framebufferTexture2D(s.DRAW_FRAMEBUFFER, s.COLOR_ATTACHMENT0 + he, s.TEXTURE_2D, Ne, 0);
        }
      t.bindFramebuffer(s.DRAW_FRAMEBUFFER, ye.__webglMultisampledFramebuffer);
    }
  }
  function ue(E) {
    return Math.min(n.maxSamples, E.samples);
  }
  function Me(E) {
    const M = r.get(E);
    return a && E.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && M.__useRenderToTexture !== !1;
  }
  function ce(E) {
    const M = o.render.frame;
    f.get(E) !== M && (f.set(E, M), E.update());
  }
  function ve(E, M) {
    const N = E.colorSpace, Z = E.format, $ = E.type;
    return E.isCompressedTexture === !0 || E.isVideoTexture === !0 || E.format === 1035 || N !== Un && N !== Pn && (st.getTransfer(N) === lt ? a === !1 ? e.has("EXT_sRGB") === !0 && Z === 1023 ? (E.format = 1035, E.minFilter = 1006, E.generateMipmaps = !1) : M = No.sRGBToLinear(M) : (Z !== 1023 || $ !== 1009) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", N)), M;
  }
  function we(E) {
    return typeof HTMLImageElement < "u" && E instanceof HTMLImageElement ? (u.width = E.naturalWidth || E.width, u.height = E.naturalHeight || E.height) : typeof VideoFrame < "u" && E instanceof VideoFrame ? (u.width = E.displayWidth, u.height = E.displayHeight) : (u.width = E.width, u.height = E.height), u;
  }
  this.allocateTextureUnit = W, this.resetTextureUnits = P, this.setTexture2D = Y, this.setTexture2DArray = b, this.setTexture3D = G, this.setTextureCube = X, this.rebindTextures = F, this.setupRenderTarget = Ue, this.updateRenderTargetMipmap = _e, this.updateMultisampleRenderTarget = pe, this.setupDepthRenderbuffer = le, this.setupFrameBufferTexture = q, this.useMultisampledRTT = Me;
}
function yd(s, e, t) {
  const r = t.isWebGL2;
  function n(i, o = Pn) {
    let a;
    const l = st.getTransfer(o);
    if (i === 1009) return s.UNSIGNED_BYTE;
    if (i === 1017) return s.UNSIGNED_SHORT_4_4_4_4;
    if (i === 1018) return s.UNSIGNED_SHORT_5_5_5_1;
    if (i === 1010) return s.BYTE;
    if (i === 1011) return s.SHORT;
    if (i === 1012) return s.UNSIGNED_SHORT;
    if (i === 1013) return s.INT;
    if (i === 1014) return s.UNSIGNED_INT;
    if (i === 1015) return s.FLOAT;
    if (i === 1016)
      return r ? s.HALF_FLOAT : (a = e.get("OES_texture_half_float"), a !== null ? a.HALF_FLOAT_OES : null);
    if (i === 1021) return s.ALPHA;
    if (i === 1023) return s.RGBA;
    if (i === 1024) return s.LUMINANCE;
    if (i === 1025) return s.LUMINANCE_ALPHA;
    if (i === 1026) return s.DEPTH_COMPONENT;
    if (i === 1027) return s.DEPTH_STENCIL;
    if (i === 1035)
      return a = e.get("EXT_sRGB"), a !== null ? a.SRGB_ALPHA_EXT : null;
    if (i === 1028) return s.RED;
    if (i === 1029) return s.RED_INTEGER;
    if (i === 1030) return s.RG;
    if (i === 1031) return s.RG_INTEGER;
    if (i === 1033) return s.RGBA_INTEGER;
    if (i === 33776 || i === 33777 || i === 33778 || i === 33779)
      if (l === lt)
        if (a = e.get("WEBGL_compressed_texture_s3tc_srgb"), a !== null) {
          if (i === 33776) return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (i === 33777) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (i === 33778) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (i === 33779) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (a = e.get("WEBGL_compressed_texture_s3tc"), a !== null) {
        if (i === 33776) return a.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (i === 33777) return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (i === 33778) return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (i === 33779) return a.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (i === 35840 || i === 35841 || i === 35842 || i === 35843)
      if (a = e.get("WEBGL_compressed_texture_pvrtc"), a !== null) {
        if (i === 35840) return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (i === 35841) return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (i === 35842) return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (i === 35843) return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (i === 36196)
      return a = e.get("WEBGL_compressed_texture_etc1"), a !== null ? a.COMPRESSED_RGB_ETC1_WEBGL : null;
    if (i === 37492 || i === 37496)
      if (a = e.get("WEBGL_compressed_texture_etc"), a !== null) {
        if (i === 37492) return l === lt ? a.COMPRESSED_SRGB8_ETC2 : a.COMPRESSED_RGB8_ETC2;
        if (i === 37496) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : a.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (i === 37808 || i === 37809 || i === 37810 || i === 37811 || i === 37812 || i === 37813 || i === 37814 || i === 37815 || i === 37816 || i === 37817 || i === 37818 || i === 37819 || i === 37820 || i === 37821)
      if (a = e.get("WEBGL_compressed_texture_astc"), a !== null) {
        if (i === 37808) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : a.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (i === 37809) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : a.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (i === 37810) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : a.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (i === 37811) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : a.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (i === 37812) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : a.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (i === 37813) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : a.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (i === 37814) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : a.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (i === 37815) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : a.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (i === 37816) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : a.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (i === 37817) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : a.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (i === 37818) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : a.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (i === 37819) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : a.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (i === 37820) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : a.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (i === 37821) return l === lt ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : a.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (i === 36492 || i === 36494 || i === 36495)
      if (a = e.get("EXT_texture_compression_bptc"), a !== null) {
        if (i === 36492) return l === lt ? a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : a.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (i === 36494) return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (i === 36495) return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (i === 36283 || i === 36284 || i === 36285 || i === 36286)
      if (a = e.get("EXT_texture_compression_rgtc"), a !== null) {
        if (i === 36492) return a.COMPRESSED_RED_RGTC1_EXT;
        if (i === 36284) return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (i === 36285) return a.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (i === 36286) return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return i === 1020 ? r ? s.UNSIGNED_INT_24_8 : (a = e.get("WEBGL_depth_texture"), a !== null ? a.UNSIGNED_INT_24_8_WEBGL : null) : s[i] !== void 0 ? s[i] : null;
  }
  return { convert: n };
}
class bd extends Wt {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.cameras = e;
  }
}
class Dn extends Pt {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const Sd = { type: "move" };
class Ns {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new Dn(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new Dn(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new ne(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new ne()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new Dn(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new ne(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new ne()), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const r of e.hand.values())
          this._getHandJoint(t, r);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, t, r) {
    let n = null, i = null, o = null;
    const a = this._targetRay, l = this._grip, c = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (c && e.hand) {
        o = !0;
        for (const v of e.hand.values()) {
          const p = t.getJointPose(v, r), m = this._getHandJoint(c, v);
          p !== null && (m.matrix.fromArray(p.transform.matrix), m.matrix.decompose(m.position, m.rotation, m.scale), m.matrixWorldNeedsUpdate = !0, m.jointRadius = p.radius), m.visible = p !== null;
        }
        const u = c.joints["index-finger-tip"], f = c.joints["thumb-tip"], h = u.position.distanceTo(f.position), d = 0.02, _ = 5e-3;
        c.inputState.pinching && h > d + _ ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && h <= d - _ && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        l !== null && e.gripSpace && (i = t.getPose(e.gripSpace, r), i !== null && (l.matrix.fromArray(i.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(i.linearVelocity)) : l.hasLinearVelocity = !1, i.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(i.angularVelocity)) : l.hasAngularVelocity = !1));
      a !== null && (n = t.getPose(e.targetRaySpace, r), n === null && i !== null && (n = i), n !== null && (a.matrix.fromArray(n.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, n.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(n.linearVelocity)) : a.hasLinearVelocity = !1, n.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(n.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(Sd)));
    }
    return a !== null && (a.visible = n !== null), l !== null && (l.visible = i !== null), c !== null && (c.visible = o !== null), this;
  }
  // private method
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const r = new Dn();
      r.matrixAutoUpdate = !1, r.visible = !1, e.joints[t.jointName] = r, e.add(r);
    }
    return e.joints[t.jointName];
  }
}
const Md = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, Td = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class Ed {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, t, r) {
    if (this.texture === null) {
      const n = new Tt(), i = e.properties.get(n);
      i.__webglTexture = t.texture, (t.depthNear != r.depthNear || t.depthFar != r.depthFar) && (this.depthNear = t.depthNear, this.depthFar = t.depthFar), this.texture = n;
    }
  }
  render(e, t) {
    if (this.texture !== null) {
      if (this.mesh === null) {
        const r = t.cameras[0].viewport, n = new Je({
          extensions: { fragDepth: !0 },
          vertexShader: Md,
          fragmentShader: Td,
          uniforms: {
            depthColor: { value: this.texture },
            depthWidth: { value: r.z },
            depthHeight: { value: r.w }
          }
        });
        this.mesh = new qe(new tt(20, 20), n);
      }
      e.render(this.mesh, t);
    }
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
}
class wd extends Ai {
  constructor(e, t) {
    super();
    const r = this;
    let n = null, i = 1, o = null, a = "local-floor", l = 1, c = null, u = null, f = null, h = null, d = null, _ = null;
    const v = new Ed(), p = t.getContextAttributes();
    let m = null, y = null;
    const g = [], A = [], w = new De();
    let T = null;
    const S = new Wt();
    S.layers.enable(1), S.viewport = new vt();
    const C = new Wt();
    C.layers.enable(2), C.viewport = new vt();
    const z = [S, C], x = new bd();
    x.layers.enable(1), x.layers.enable(2);
    let R = null, L = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(I) {
      let B = g[I];
      return B === void 0 && (B = new Ns(), g[I] = B), B.getTargetRaySpace();
    }, this.getControllerGrip = function(I) {
      let B = g[I];
      return B === void 0 && (B = new Ns(), g[I] = B), B.getGripSpace();
    }, this.getHand = function(I) {
      let B = g[I];
      return B === void 0 && (B = new Ns(), g[I] = B), B.getHandSpace();
    };
    function k(I) {
      const B = A.indexOf(I.inputSource);
      if (B === -1)
        return;
      const Q = g[B];
      Q !== void 0 && (Q.update(I.inputSource, I.frame, c || o), Q.dispatchEvent({ type: I.type, data: I.inputSource }));
    }
    function P() {
      n.removeEventListener("select", k), n.removeEventListener("selectstart", k), n.removeEventListener("selectend", k), n.removeEventListener("squeeze", k), n.removeEventListener("squeezestart", k), n.removeEventListener("squeezeend", k), n.removeEventListener("end", P), n.removeEventListener("inputsourceschange", W);
      for (let I = 0; I < g.length; I++) {
        const B = A[I];
        B !== null && (A[I] = null, g[I].disconnect(B));
      }
      R = null, L = null, v.reset(), e.setRenderTarget(m), d = null, h = null, f = null, n = null, y = null, K.stop(), r.isPresenting = !1, e.setPixelRatio(T), e.setSize(w.width, w.height, !1), r.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(I) {
      i = I, r.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(I) {
      a = I, r.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || o;
    }, this.setReferenceSpace = function(I) {
      c = I;
    }, this.getBaseLayer = function() {
      return h !== null ? h : d;
    }, this.getBinding = function() {
      return f;
    }, this.getFrame = function() {
      return _;
    }, this.getSession = function() {
      return n;
    }, this.setSession = async function(I) {
      if (n = I, n !== null) {
        if (m = e.getRenderTarget(), n.addEventListener("select", k), n.addEventListener("selectstart", k), n.addEventListener("selectend", k), n.addEventListener("squeeze", k), n.addEventListener("squeezestart", k), n.addEventListener("squeezeend", k), n.addEventListener("end", P), n.addEventListener("inputsourceschange", W), p.xrCompatible !== !0 && await t.makeXRCompatible(), T = e.getPixelRatio(), e.getSize(w), n.renderState.layers === void 0 || e.capabilities.isWebGL2 === !1) {
          const B = {
            antialias: n.renderState.layers === void 0 ? p.antialias : !0,
            alpha: !0,
            depth: p.depth,
            stencil: p.stencil,
            framebufferScaleFactor: i
          };
          d = new XRWebGLLayer(n, t, B), n.updateRenderState({ baseLayer: d }), e.setPixelRatio(1), e.setSize(d.framebufferWidth, d.framebufferHeight, !1), y = new gt(
            d.framebufferWidth,
            d.framebufferHeight,
            {
              format: 1023,
              type: 1009,
              colorSpace: e.outputColorSpace,
              stencilBuffer: p.stencil
            }
          );
        } else {
          let B = null, Q = null, ee = null;
          p.depth && (ee = p.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, B = p.stencil ? 1027 : 1026, Q = p.stencil ? 1020 : 1014);
          const q = {
            colorFormat: t.RGBA8,
            depthFormat: ee,
            scaleFactor: i
          };
          f = new XRWebGLBinding(n, t), h = f.createProjectionLayer(q), n.updateRenderState({ layers: [h] }), e.setPixelRatio(1), e.setSize(h.textureWidth, h.textureHeight, !1), y = new gt(
            h.textureWidth,
            h.textureHeight,
            {
              format: 1023,
              type: 1009,
              depthTexture: new Ko(h.textureWidth, h.textureHeight, Q, void 0, void 0, void 0, void 0, void 0, void 0, B),
              stencilBuffer: p.stencil,
              colorSpace: e.outputColorSpace,
              samples: p.antialias ? 4 : 0
            }
          );
          const te = e.properties.get(y);
          te.__ignoreDepthValues = h.ignoreDepthValues;
        }
        y.isXRRenderTarget = !0, this.setFoveation(l), c = null, o = await n.requestReferenceSpace(a), K.setContext(n), K.start(), r.isPresenting = !0, r.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (n !== null)
        return n.environmentBlendMode;
    };
    function W(I) {
      for (let B = 0; B < I.removed.length; B++) {
        const Q = I.removed[B], ee = A.indexOf(Q);
        ee >= 0 && (A[ee] = null, g[ee].disconnect(Q));
      }
      for (let B = 0; B < I.added.length; B++) {
        const Q = I.added[B];
        let ee = A.indexOf(Q);
        if (ee === -1) {
          for (let te = 0; te < g.length; te++)
            if (te >= A.length) {
              A.push(Q), ee = te;
              break;
            } else if (A[te] === null) {
              A[te] = Q, ee = te;
              break;
            }
          if (ee === -1) break;
        }
        const q = g[ee];
        q && q.connect(Q);
      }
    }
    const O = new ne(), Y = new ne();
    function b(I, B, Q) {
      O.setFromMatrixPosition(B.matrixWorld), Y.setFromMatrixPosition(Q.matrixWorld);
      const ee = O.distanceTo(Y), q = B.projectionMatrix.elements, te = Q.projectionMatrix.elements, de = q[14] / (q[10] - 1), le = q[14] / (q[10] + 1), F = (q[9] + 1) / q[5], Ue = (q[9] - 1) / q[5], _e = (q[8] - 1) / q[0], pe = (te[8] + 1) / te[0], ue = de * _e, Me = de * pe, ce = ee / (-_e + pe), ve = ce * -_e;
      B.matrixWorld.decompose(I.position, I.quaternion, I.scale), I.translateX(ve), I.translateZ(ce), I.matrixWorld.compose(I.position, I.quaternion, I.scale), I.matrixWorldInverse.copy(I.matrixWorld).invert();
      const we = de + ce, E = le + ce, M = ue - ve, N = Me + (ee - ve), Z = F * le / E * we, $ = Ue * le / E * we;
      I.projectionMatrix.makePerspective(M, N, Z, $, we, E), I.projectionMatrixInverse.copy(I.projectionMatrix).invert();
    }
    function G(I, B) {
      B === null ? I.matrixWorld.copy(I.matrix) : I.matrixWorld.multiplyMatrices(B.matrixWorld, I.matrix), I.matrixWorldInverse.copy(I.matrixWorld).invert();
    }
    this.updateCamera = function(I) {
      if (n === null) return;
      v.texture !== null && (I.near = v.depthNear, I.far = v.depthFar), x.near = C.near = S.near = I.near, x.far = C.far = S.far = I.far, (R !== x.near || L !== x.far) && (n.updateRenderState({
        depthNear: x.near,
        depthFar: x.far
      }), R = x.near, L = x.far, S.near = R, S.far = L, C.near = R, C.far = L, S.updateProjectionMatrix(), C.updateProjectionMatrix(), I.updateProjectionMatrix());
      const B = I.parent, Q = x.cameras;
      G(x, B);
      for (let ee = 0; ee < Q.length; ee++)
        G(Q[ee], B);
      Q.length === 2 ? b(x, S, C) : x.projectionMatrix.copy(S.projectionMatrix), X(I, x, B);
    };
    function X(I, B, Q) {
      Q === null ? I.matrix.copy(B.matrixWorld) : (I.matrix.copy(Q.matrixWorld), I.matrix.invert(), I.matrix.multiply(B.matrixWorld)), I.matrix.decompose(I.position, I.quaternion, I.scale), I.updateMatrixWorld(!0), I.projectionMatrix.copy(B.projectionMatrix), I.projectionMatrixInverse.copy(B.projectionMatrixInverse), I.isPerspectiveCamera && (I.fov = Gs * 2 * Math.atan(1 / I.projectionMatrix.elements[5]), I.zoom = 1);
    }
    this.getCamera = function() {
      return x;
    }, this.getFoveation = function() {
      if (!(h === null && d === null))
        return l;
    }, this.setFoveation = function(I) {
      l = I, h !== null && (h.fixedFoveation = I), d !== null && d.fixedFoveation !== void 0 && (d.fixedFoveation = I);
    }, this.hasDepthSensing = function() {
      return v.texture !== null;
    };
    let U = null;
    function V(I, B) {
      if (u = B.getViewerPose(c || o), _ = B, u !== null) {
        const Q = u.views;
        d !== null && (e.setRenderTargetFramebuffer(y, d.framebuffer), e.setRenderTarget(y));
        let ee = !1;
        Q.length !== x.cameras.length && (x.cameras.length = 0, ee = !0);
        for (let te = 0; te < Q.length; te++) {
          const de = Q[te];
          let le = null;
          if (d !== null)
            le = d.getViewport(de);
          else {
            const Ue = f.getViewSubImage(h, de);
            le = Ue.viewport, te === 0 && (e.setRenderTargetTextures(
              y,
              Ue.colorTexture,
              h.ignoreDepthValues ? void 0 : Ue.depthStencilTexture
            ), e.setRenderTarget(y));
          }
          let F = z[te];
          F === void 0 && (F = new Wt(), F.layers.enable(te), F.viewport = new vt(), z[te] = F), F.matrix.fromArray(de.transform.matrix), F.matrix.decompose(F.position, F.quaternion, F.scale), F.projectionMatrix.fromArray(de.projectionMatrix), F.projectionMatrixInverse.copy(F.projectionMatrix).invert(), F.viewport.set(le.x, le.y, le.width, le.height), te === 0 && (x.matrix.copy(F.matrix), x.matrix.decompose(x.position, x.quaternion, x.scale)), ee === !0 && x.cameras.push(F);
        }
        const q = n.enabledFeatures;
        if (q && q.includes("depth-sensing")) {
          const te = f.getDepthInformation(Q[0]);
          te && te.isValid && te.texture && v.init(e, te, n.renderState);
        }
      }
      for (let Q = 0; Q < g.length; Q++) {
        const ee = A[Q], q = g[Q];
        ee !== null && q !== void 0 && q.update(ee, B, c || o);
      }
      v.render(e, x), U && U(I, B), B.detectedPlanes && r.dispatchEvent({ type: "planesdetected", data: B }), _ = null;
    }
    const K = new jo();
    K.setAnimationLoop(V), this.setAnimationLoop = function(I) {
      U = I;
    }, this.dispose = function() {
    };
  }
}
const kn = /* @__PURE__ */ new xn(), Ad = /* @__PURE__ */ new ft();
function Cd(s, e) {
  function t(p, m) {
    p.matrixAutoUpdate === !0 && p.updateMatrix(), m.value.copy(p.matrix);
  }
  function r(p, m) {
    m.color.getRGB(p.fogColor.value, Wo(s)), m.isFog ? (p.fogNear.value = m.near, p.fogFar.value = m.far) : m.isFogExp2 && (p.fogDensity.value = m.density);
  }
  function n(p, m, y, g, A) {
    m.isMeshBasicMaterial || m.isMeshLambertMaterial ? i(p, m) : m.isMeshToonMaterial ? (i(p, m), f(p, m)) : m.isMeshPhongMaterial ? (i(p, m), u(p, m)) : m.isMeshStandardMaterial ? (i(p, m), h(p, m), m.isMeshPhysicalMaterial && d(p, m, A)) : m.isMeshMatcapMaterial ? (i(p, m), _(p, m)) : m.isMeshDepthMaterial ? i(p, m) : m.isMeshDistanceMaterial ? (i(p, m), v(p, m)) : m.isMeshNormalMaterial ? i(p, m) : m.isLineBasicMaterial ? (o(p, m), m.isLineDashedMaterial && a(p, m)) : m.isPointsMaterial ? l(p, m, y, g) : m.isSpriteMaterial ? c(p, m) : m.isShadowMaterial ? (p.color.value.copy(m.color), p.opacity.value = m.opacity) : m.isShaderMaterial && (m.uniformsNeedUpdate = !1);
  }
  function i(p, m) {
    p.opacity.value = m.opacity, m.color && p.diffuse.value.copy(m.color), m.emissive && p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity), m.map && (p.map.value = m.map, t(m.map, p.mapTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, t(m.alphaMap, p.alphaMapTransform)), m.bumpMap && (p.bumpMap.value = m.bumpMap, t(m.bumpMap, p.bumpMapTransform), p.bumpScale.value = m.bumpScale, m.side === 1 && (p.bumpScale.value *= -1)), m.normalMap && (p.normalMap.value = m.normalMap, t(m.normalMap, p.normalMapTransform), p.normalScale.value.copy(m.normalScale), m.side === 1 && p.normalScale.value.negate()), m.displacementMap && (p.displacementMap.value = m.displacementMap, t(m.displacementMap, p.displacementMapTransform), p.displacementScale.value = m.displacementScale, p.displacementBias.value = m.displacementBias), m.emissiveMap && (p.emissiveMap.value = m.emissiveMap, t(m.emissiveMap, p.emissiveMapTransform)), m.specularMap && (p.specularMap.value = m.specularMap, t(m.specularMap, p.specularMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest);
    const y = e.get(m), g = y.envMap, A = y.envMapRotation;
    if (g && (p.envMap.value = g, kn.copy(A), kn.x *= -1, kn.y *= -1, kn.z *= -1, g.isCubeTexture && g.isRenderTargetTexture === !1 && (kn.y *= -1, kn.z *= -1), p.envMapRotation.value.setFromMatrix4(Ad.makeRotationFromEuler(kn)), p.flipEnvMap.value = g.isCubeTexture && g.isRenderTargetTexture === !1 ? -1 : 1, p.reflectivity.value = m.reflectivity, p.ior.value = m.ior, p.refractionRatio.value = m.refractionRatio), m.lightMap) {
      p.lightMap.value = m.lightMap;
      const w = s._useLegacyLights === !0 ? Math.PI : 1;
      p.lightMapIntensity.value = m.lightMapIntensity * w, t(m.lightMap, p.lightMapTransform);
    }
    m.aoMap && (p.aoMap.value = m.aoMap, p.aoMapIntensity.value = m.aoMapIntensity, t(m.aoMap, p.aoMapTransform));
  }
  function o(p, m) {
    p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, m.map && (p.map.value = m.map, t(m.map, p.mapTransform));
  }
  function a(p, m) {
    p.dashSize.value = m.dashSize, p.totalSize.value = m.dashSize + m.gapSize, p.scale.value = m.scale;
  }
  function l(p, m, y, g) {
    p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, p.size.value = m.size * y, p.scale.value = g * 0.5, m.map && (p.map.value = m.map, t(m.map, p.uvTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, t(m.alphaMap, p.alphaMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest);
  }
  function c(p, m) {
    p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, p.rotation.value = m.rotation, m.map && (p.map.value = m.map, t(m.map, p.mapTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, t(m.alphaMap, p.alphaMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest);
  }
  function u(p, m) {
    p.specular.value.copy(m.specular), p.shininess.value = Math.max(m.shininess, 1e-4);
  }
  function f(p, m) {
    m.gradientMap && (p.gradientMap.value = m.gradientMap);
  }
  function h(p, m) {
    p.metalness.value = m.metalness, m.metalnessMap && (p.metalnessMap.value = m.metalnessMap, t(m.metalnessMap, p.metalnessMapTransform)), p.roughness.value = m.roughness, m.roughnessMap && (p.roughnessMap.value = m.roughnessMap, t(m.roughnessMap, p.roughnessMapTransform)), e.get(m).envMap && (p.envMapIntensity.value = m.envMapIntensity);
  }
  function d(p, m, y) {
    p.ior.value = m.ior, m.sheen > 0 && (p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen), p.sheenRoughness.value = m.sheenRoughness, m.sheenColorMap && (p.sheenColorMap.value = m.sheenColorMap, t(m.sheenColorMap, p.sheenColorMapTransform)), m.sheenRoughnessMap && (p.sheenRoughnessMap.value = m.sheenRoughnessMap, t(m.sheenRoughnessMap, p.sheenRoughnessMapTransform))), m.clearcoat > 0 && (p.clearcoat.value = m.clearcoat, p.clearcoatRoughness.value = m.clearcoatRoughness, m.clearcoatMap && (p.clearcoatMap.value = m.clearcoatMap, t(m.clearcoatMap, p.clearcoatMapTransform)), m.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = m.clearcoatRoughnessMap, t(m.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), m.clearcoatNormalMap && (p.clearcoatNormalMap.value = m.clearcoatNormalMap, t(m.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale), m.side === 1 && p.clearcoatNormalScale.value.negate())), m.iridescence > 0 && (p.iridescence.value = m.iridescence, p.iridescenceIOR.value = m.iridescenceIOR, p.iridescenceThicknessMinimum.value = m.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = m.iridescenceThicknessRange[1], m.iridescenceMap && (p.iridescenceMap.value = m.iridescenceMap, t(m.iridescenceMap, p.iridescenceMapTransform)), m.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = m.iridescenceThicknessMap, t(m.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), m.transmission > 0 && (p.transmission.value = m.transmission, p.transmissionSamplerMap.value = y.texture, p.transmissionSamplerSize.value.set(y.width, y.height), m.transmissionMap && (p.transmissionMap.value = m.transmissionMap, t(m.transmissionMap, p.transmissionMapTransform)), p.thickness.value = m.thickness, m.thicknessMap && (p.thicknessMap.value = m.thicknessMap, t(m.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = m.attenuationDistance, p.attenuationColor.value.copy(m.attenuationColor)), m.anisotropy > 0 && (p.anisotropyVector.value.set(m.anisotropy * Math.cos(m.anisotropyRotation), m.anisotropy * Math.sin(m.anisotropyRotation)), m.anisotropyMap && (p.anisotropyMap.value = m.anisotropyMap, t(m.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = m.specularIntensity, p.specularColor.value.copy(m.specularColor), m.specularColorMap && (p.specularColorMap.value = m.specularColorMap, t(m.specularColorMap, p.specularColorMapTransform)), m.specularIntensityMap && (p.specularIntensityMap.value = m.specularIntensityMap, t(m.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function _(p, m) {
    m.matcap && (p.matcap.value = m.matcap);
  }
  function v(p, m) {
    const y = e.get(m).light;
    p.referencePosition.value.setFromMatrixPosition(y.matrixWorld), p.nearDistance.value = y.shadow.camera.near, p.farDistance.value = y.shadow.camera.far;
  }
  return {
    refreshFogUniforms: r,
    refreshMaterialUniforms: n
  };
}
function Rd(s, e, t, r) {
  let n = {}, i = {}, o = [];
  const a = t.isWebGL2 ? s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
  function l(y, g) {
    const A = g.program;
    r.uniformBlockBinding(y, A);
  }
  function c(y, g) {
    let A = n[y.id];
    A === void 0 && (_(y), A = u(y), n[y.id] = A, y.addEventListener("dispose", p));
    const w = g.program;
    r.updateUBOMapping(y, w);
    const T = e.render.frame;
    i[y.id] !== T && (h(y), i[y.id] = T);
  }
  function u(y) {
    const g = f();
    y.__bindingPointIndex = g;
    const A = s.createBuffer(), w = y.__size, T = y.usage;
    return s.bindBuffer(s.UNIFORM_BUFFER, A), s.bufferData(s.UNIFORM_BUFFER, w, T), s.bindBuffer(s.UNIFORM_BUFFER, null), s.bindBufferBase(s.UNIFORM_BUFFER, g, A), A;
  }
  function f() {
    for (let y = 0; y < a; y++)
      if (o.indexOf(y) === -1)
        return o.push(y), y;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function h(y) {
    const g = n[y.id], A = y.uniforms, w = y.__cache;
    s.bindBuffer(s.UNIFORM_BUFFER, g);
    for (let T = 0, S = A.length; T < S; T++) {
      const C = Array.isArray(A[T]) ? A[T] : [A[T]];
      for (let z = 0, x = C.length; z < x; z++) {
        const R = C[z];
        if (d(R, T, z, w) === !0) {
          const L = R.__offset, k = Array.isArray(R.value) ? R.value : [R.value];
          let P = 0;
          for (let W = 0; W < k.length; W++) {
            const O = k[W], Y = v(O);
            typeof O == "number" || typeof O == "boolean" ? (R.__data[0] = O, s.bufferSubData(s.UNIFORM_BUFFER, L + P, R.__data)) : O.isMatrix3 ? (R.__data[0] = O.elements[0], R.__data[1] = O.elements[1], R.__data[2] = O.elements[2], R.__data[3] = 0, R.__data[4] = O.elements[3], R.__data[5] = O.elements[4], R.__data[6] = O.elements[5], R.__data[7] = 0, R.__data[8] = O.elements[6], R.__data[9] = O.elements[7], R.__data[10] = O.elements[8], R.__data[11] = 0) : (O.toArray(R.__data, P), P += Y.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          s.bufferSubData(s.UNIFORM_BUFFER, L, R.__data);
        }
      }
    }
    s.bindBuffer(s.UNIFORM_BUFFER, null);
  }
  function d(y, g, A, w) {
    const T = y.value, S = g + "_" + A;
    if (w[S] === void 0)
      return typeof T == "number" || typeof T == "boolean" ? w[S] = T : w[S] = T.clone(), !0;
    {
      const C = w[S];
      if (typeof T == "number" || typeof T == "boolean") {
        if (C !== T)
          return w[S] = T, !0;
      } else if (C.equals(T) === !1)
        return C.copy(T), !0;
    }
    return !1;
  }
  function _(y) {
    const g = y.uniforms;
    let A = 0;
    const w = 16;
    for (let S = 0, C = g.length; S < C; S++) {
      const z = Array.isArray(g[S]) ? g[S] : [g[S]];
      for (let x = 0, R = z.length; x < R; x++) {
        const L = z[x], k = Array.isArray(L.value) ? L.value : [L.value];
        for (let P = 0, W = k.length; P < W; P++) {
          const O = k[P], Y = v(O), b = A % w;
          b !== 0 && w - b < Y.boundary && (A += w - b), L.__data = new Float32Array(Y.storage / Float32Array.BYTES_PER_ELEMENT), L.__offset = A, A += Y.storage;
        }
      }
    }
    const T = A % w;
    return T > 0 && (A += w - T), y.__size = A, y.__cache = {}, this;
  }
  function v(y) {
    const g = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof y == "number" || typeof y == "boolean" ? (g.boundary = 4, g.storage = 4) : y.isVector2 ? (g.boundary = 8, g.storage = 8) : y.isVector3 || y.isColor ? (g.boundary = 16, g.storage = 12) : y.isVector4 ? (g.boundary = 16, g.storage = 16) : y.isMatrix3 ? (g.boundary = 48, g.storage = 48) : y.isMatrix4 ? (g.boundary = 64, g.storage = 64) : y.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", y), g;
  }
  function p(y) {
    const g = y.target;
    g.removeEventListener("dispose", p);
    const A = o.indexOf(g.__bindingPointIndex);
    o.splice(A, 1), s.deleteBuffer(n[g.id]), delete n[g.id], delete i[g.id];
  }
  function m() {
    for (const y in n)
      s.deleteBuffer(n[y]);
    o = [], n = {}, i = {};
  }
  return {
    bind: l,
    update: c,
    dispose: m
  };
}
class il {
  constructor(e = {}) {
    const {
      canvas: t = yl(),
      context: r = null,
      depth: n = !0,
      stencil: i = !0,
      alpha: o = !1,
      antialias: a = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: u = "default",
      failIfMajorPerformanceCaveat: f = !1
    } = e;
    this.isWebGLRenderer = !0;
    let h;
    r !== null ? h = r.getContextAttributes().alpha : h = o;
    const d = new Uint32Array(4), _ = new Int32Array(4);
    let v = null, p = null;
    const m = [], y = [];
    this.domElement = t, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = un, this._useLegacyLights = !1, this.toneMapping = 0, this.toneMappingExposure = 1;
    const g = this;
    let A = !1, w = 0, T = 0, S = null, C = -1, z = null;
    const x = new vt(), R = new vt();
    let L = null;
    const k = new me(0);
    let P = 0, W = t.width, O = t.height, Y = 1, b = null, G = null;
    const X = new vt(0, 0, W, O), U = new vt(0, 0, W, O);
    let V = !1;
    const K = new Yo();
    let I = !1, B = !1, Q = null;
    const ee = new ft(), q = new De(), te = new ne(), de = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    function le() {
      return S === null ? Y : 1;
    }
    let F = r;
    function Ue(D, J) {
      for (let re = 0; re < D.length; re++) {
        const ae = D[re], ie = t.getContext(ae, J);
        if (ie !== null) return ie;
      }
      return null;
    }
    try {
      const D = {
        alpha: !0,
        depth: n,
        stencil: i,
        antialias: a,
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: u,
        failIfMajorPerformanceCaveat: f
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${Zs}`), t.addEventListener("webglcontextlost", Le, !1), t.addEventListener("webglcontextrestored", H, !1), t.addEventListener("webglcontextcreationerror", Ee, !1), F === null) {
        const J = ["webgl2", "webgl", "experimental-webgl"];
        if (g.isWebGL1Renderer === !0 && J.shift(), F = Ue(J, D), F === null)
          throw Ue(J) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
      typeof WebGLRenderingContext < "u" && F instanceof WebGLRenderingContext && console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."), F.getShaderPrecisionFormat === void 0 && (F.getShaderPrecisionFormat = function() {
        return { rangeMin: 1, rangeMax: 1, precision: 1 };
      });
    } catch (D) {
      throw console.error("THREE.WebGLRenderer: " + D.message), D;
    }
    let _e, pe, ue, Me, ce, ve, we, E, M, N, Z, $, oe, Se, ye, se, he, Ne, ge, Be, Pe, xe, Ae, Ce;
    function ke() {
      _e = new Of(F), pe = new Df(F, _e, e), _e.init(pe), xe = new yd(F, _e, pe), ue = new gd(F, _e, pe), Me = new Gf(F), ce = new ad(), ve = new xd(F, _e, ue, ce, pe, xe, Me), we = new Lf(g), E = new Nf(g), M = new Xl(F, pe), Ae = new Rf(F, _e, M, pe), N = new Bf(F, M, Me, Ae), Z = new Wf(F, N, M, Me), ge = new Vf(F, pe, ve), se = new Uf(ce), $ = new sd(g, we, E, _e, pe, Ae, se), oe = new Cd(g, ce), Se = new ld(), ye = new pd(_e, pe), Ne = new Cf(g, we, E, ue, Z, h, l), he = new vd(g, Z, pe), Ce = new Rd(F, Me, pe, ue), Be = new Pf(F, _e, Me, pe), Pe = new zf(F, _e, Me, pe), Me.programs = $.programs, g.capabilities = pe, g.extensions = _e, g.properties = ce, g.renderLists = Se, g.shadowMap = he, g.state = ue, g.info = Me;
    }
    ke();
    const Ie = new wd(g, F);
    this.xr = Ie, this.getContext = function() {
      return F;
    }, this.getContextAttributes = function() {
      return F.getContextAttributes();
    }, this.forceContextLoss = function() {
      const D = _e.get("WEBGL_lose_context");
      D && D.loseContext();
    }, this.forceContextRestore = function() {
      const D = _e.get("WEBGL_lose_context");
      D && D.restoreContext();
    }, this.getPixelRatio = function() {
      return Y;
    }, this.setPixelRatio = function(D) {
      D !== void 0 && (Y = D, this.setSize(W, O, !1));
    }, this.getSize = function(D) {
      return D.set(W, O);
    }, this.setSize = function(D, J, re = !0) {
      if (Ie.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      W = D, O = J, t.width = Math.floor(D * Y), t.height = Math.floor(J * Y), re === !0 && (t.style.width = D + "px", t.style.height = J + "px"), this.setViewport(0, 0, D, J);
    }, this.getDrawingBufferSize = function(D) {
      return D.set(W * Y, O * Y).floor();
    }, this.setDrawingBufferSize = function(D, J, re) {
      W = D, O = J, Y = re, t.width = Math.floor(D * re), t.height = Math.floor(J * re), this.setViewport(0, 0, D, J);
    }, this.getCurrentViewport = function(D) {
      return D.copy(x);
    }, this.getViewport = function(D) {
      return D.copy(X);
    }, this.setViewport = function(D, J, re, ae) {
      D.isVector4 ? X.set(D.x, D.y, D.z, D.w) : X.set(D, J, re, ae), ue.viewport(x.copy(X).multiplyScalar(Y).round());
    }, this.getScissor = function(D) {
      return D.copy(U);
    }, this.setScissor = function(D, J, re, ae) {
      D.isVector4 ? U.set(D.x, D.y, D.z, D.w) : U.set(D, J, re, ae), ue.scissor(R.copy(U).multiplyScalar(Y).round());
    }, this.getScissorTest = function() {
      return V;
    }, this.setScissorTest = function(D) {
      ue.setScissorTest(V = D);
    }, this.setOpaqueSort = function(D) {
      b = D;
    }, this.setTransparentSort = function(D) {
      G = D;
    }, this.getClearColor = function(D) {
      return D.copy(Ne.getClearColor());
    }, this.setClearColor = function() {
      Ne.setClearColor.apply(Ne, arguments);
    }, this.getClearAlpha = function() {
      return Ne.getClearAlpha();
    }, this.setClearAlpha = function() {
      Ne.setClearAlpha.apply(Ne, arguments);
    }, this.clear = function(D = !0, J = !0, re = !0) {
      let ae = 0;
      if (D) {
        let ie = !1;
        if (S !== null) {
          const Fe = S.texture.format;
          ie = Fe === 1033 || Fe === 1031 || Fe === 1029;
        }
        if (ie) {
          const Fe = S.texture.type, Ge = Fe === 1009 || Fe === 1014 || Fe === 1012 || Fe === 1020 || Fe === 1017 || Fe === 1018, He = Ne.getClearColor(), be = Ne.getClearAlpha(), We = He.r, Xe = He.g, Ve = He.b;
          Ge ? (d[0] = We, d[1] = Xe, d[2] = Ve, d[3] = be, F.clearBufferuiv(F.COLOR, 0, d)) : (_[0] = We, _[1] = Xe, _[2] = Ve, _[3] = be, F.clearBufferiv(F.COLOR, 0, _));
        } else
          ae |= F.COLOR_BUFFER_BIT;
      }
      J && (ae |= F.DEPTH_BUFFER_BIT), re && (ae |= F.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), F.clear(ae);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", Le, !1), t.removeEventListener("webglcontextrestored", H, !1), t.removeEventListener("webglcontextcreationerror", Ee, !1), Se.dispose(), ye.dispose(), ce.dispose(), we.dispose(), E.dispose(), Z.dispose(), Ae.dispose(), Ce.dispose(), $.dispose(), Ie.dispose(), Ie.removeEventListener("sessionstart", it), Ie.removeEventListener("sessionend", Ye), Q && (Q.dispose(), Q = null), et.stop();
    };
    function Le(D) {
      D.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), A = !0;
    }
    function H() {
      console.log("THREE.WebGLRenderer: Context Restored."), A = !1;
      const D = Me.autoReset, J = he.enabled, re = he.autoUpdate, ae = he.needsUpdate, ie = he.type;
      ke(), Me.autoReset = D, he.enabled = J, he.autoUpdate = re, he.needsUpdate = ae, he.type = ie;
    }
    function Ee(D) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", D.statusMessage);
    }
    function j(D) {
      const J = D.target;
      J.removeEventListener("dispose", j), fe(J);
    }
    function fe(D) {
      Te(D), ce.remove(D);
    }
    function Te(D) {
      const J = ce.get(D).programs;
      J !== void 0 && (J.forEach(function(re) {
        $.releaseProgram(re);
      }), D.isShaderMaterial && $.releaseShaderCache(D));
    }
    this.renderBufferDirect = function(D, J, re, ae, ie, Fe) {
      J === null && (J = de);
      const Ge = ie.isMesh && ie.matrixWorld.determinant() < 0, He = ar(D, J, re, ae, ie);
      ue.setMaterial(ae, Ge);
      let be = re.index, We = 1;
      if (ae.wireframe === !0) {
        if (be = N.getWireframeAttribute(re), be === void 0) return;
        We = 2;
      }
      const Xe = re.drawRange, Ve = re.attributes.position;
      let ot = Xe.start * We, Et = (Xe.start + Xe.count) * We;
      Fe !== null && (ot = Math.max(ot, Fe.start * We), Et = Math.min(Et, (Fe.start + Fe.count) * We)), be !== null ? (ot = Math.max(ot, 0), Et = Math.min(Et, be.count)) : Ve != null && (ot = Math.max(ot, 0), Et = Math.min(Et, Ve.count));
      const pt = Et - ot;
      if (pt < 0 || pt === 1 / 0) return;
      Ae.setup(ie, ae, He, re, be);
      let Ft, rt = Be;
      if (be !== null && (Ft = M.get(be), rt = Pe, rt.setIndex(Ft)), ie.isMesh)
        ae.wireframe === !0 ? (ue.setLineWidth(ae.wireframeLinewidth * le()), rt.setMode(F.LINES)) : rt.setMode(F.TRIANGLES);
      else if (ie.isLine) {
        let je = ae.linewidth;
        je === void 0 && (je = 1), ue.setLineWidth(je * le()), ie.isLineSegments ? rt.setMode(F.LINES) : ie.isLineLoop ? rt.setMode(F.LINE_LOOP) : rt.setMode(F.LINE_STRIP);
      } else ie.isPoints ? rt.setMode(F.POINTS) : ie.isSprite && rt.setMode(F.TRIANGLES);
      if (ie.isBatchedMesh)
        rt.renderMultiDraw(ie._multiDrawStarts, ie._multiDrawCounts, ie._multiDrawCount);
      else if (ie.isInstancedMesh)
        rt.renderInstances(ot, pt, ie.count);
      else if (re.isInstancedBufferGeometry) {
        const je = re._maxInstanceCount !== void 0 ? re._maxInstanceCount : 1 / 0, bn = Math.min(re.instanceCount, je);
        rt.renderInstances(ot, pt, bn);
      } else
        rt.render(ot, pt);
    };
    function ze(D, J, re) {
      D.transparent === !0 && D.side === 2 && D.forceSinglePass === !1 ? (D.side = 1, D.needsUpdate = !0, Lt(D, J, re), D.side = 0, D.needsUpdate = !0, Lt(D, J, re), D.side = 2) : Lt(D, J, re);
    }
    this.compile = function(D, J, re = null) {
      re === null && (re = D), p = ye.get(re), p.init(), y.push(p), re.traverseVisible(function(ie) {
        ie.isLight && ie.layers.test(J.layers) && (p.pushLight(ie), ie.castShadow && p.pushShadow(ie));
      }), D !== re && D.traverseVisible(function(ie) {
        ie.isLight && ie.layers.test(J.layers) && (p.pushLight(ie), ie.castShadow && p.pushShadow(ie));
      }), p.setupLights(g._useLegacyLights);
      const ae = /* @__PURE__ */ new Set();
      return D.traverse(function(ie) {
        const Fe = ie.material;
        if (Fe)
          if (Array.isArray(Fe))
            for (let Ge = 0; Ge < Fe.length; Ge++) {
              const He = Fe[Ge];
              ze(He, re, ie), ae.add(He);
            }
          else
            ze(Fe, re, ie), ae.add(Fe);
      }), y.pop(), p = null, ae;
    }, this.compileAsync = function(D, J, re = null) {
      const ae = this.compile(D, J, re);
      return new Promise((ie) => {
        function Fe() {
          if (ae.forEach(function(Ge) {
            ce.get(Ge).currentProgram.isReady() && ae.delete(Ge);
          }), ae.size === 0) {
            ie(D);
            return;
          }
          setTimeout(Fe, 10);
        }
        _e.get("KHR_parallel_shader_compile") !== null ? Fe() : setTimeout(Fe, 10);
      });
    };
    let Oe = null;
    function Ke(D) {
      Oe && Oe(D);
    }
    function it() {
      et.stop();
    }
    function Ye() {
      et.start();
    }
    const et = new jo();
    et.setAnimationLoop(Ke), typeof self < "u" && et.setContext(self), this.setAnimationLoop = function(D) {
      Oe = D, Ie.setAnimationLoop(D), D === null ? et.stop() : et.start();
    }, Ie.addEventListener("sessionstart", it), Ie.addEventListener("sessionend", Ye), this.render = function(D, J) {
      if (J !== void 0 && J.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (A === !0) return;
      D.matrixWorldAutoUpdate === !0 && D.updateMatrixWorld(), J.parent === null && J.matrixWorldAutoUpdate === !0 && J.updateMatrixWorld(), Ie.enabled === !0 && Ie.isPresenting === !0 && (Ie.cameraAutoUpdate === !0 && Ie.updateCamera(J), J = Ie.getCamera()), D.isScene === !0 && D.onBeforeRender(g, D, J, S), p = ye.get(D, y.length), p.init(), y.push(p), ee.multiplyMatrices(J.projectionMatrix, J.matrixWorldInverse), K.setFromProjectionMatrix(ee), B = this.localClippingEnabled, I = se.init(this.clippingPlanes, B), v = Se.get(D, m.length), v.init(), m.push(v), dt(D, J, 0, g.sortObjects), v.finish(), g.sortObjects === !0 && v.sort(b, G), this.info.render.frame++, I === !0 && se.beginShadows();
      const re = p.state.shadowsArray;
      if (he.render(re, D, J), I === !0 && se.endShadows(), this.info.autoReset === !0 && this.info.reset(), (Ie.enabled === !1 || Ie.isPresenting === !1 || Ie.hasDepthSensing() === !1) && Ne.render(v, D), p.setupLights(g._useLegacyLights), J.isArrayCamera) {
        const ae = J.cameras;
        for (let ie = 0, Fe = ae.length; ie < Fe; ie++) {
          const Ge = ae[ie];
          Kt(v, D, Ge, Ge.viewport);
        }
      } else
        Kt(v, D, J);
      S !== null && (ve.updateMultisampleRenderTarget(S), ve.updateRenderTargetMipmap(S)), D.isScene === !0 && D.onAfterRender(g, D, J), Ae.resetDefaultState(), C = -1, z = null, y.pop(), y.length > 0 ? p = y[y.length - 1] : p = null, m.pop(), m.length > 0 ? v = m[m.length - 1] : v = null;
    };
    function dt(D, J, re, ae) {
      if (D.visible === !1) return;
      if (D.layers.test(J.layers)) {
        if (D.isGroup)
          re = D.renderOrder;
        else if (D.isLOD)
          D.autoUpdate === !0 && D.update(J);
        else if (D.isLight)
          p.pushLight(D), D.castShadow && p.pushShadow(D);
        else if (D.isSprite) {
          if (!D.frustumCulled || K.intersectsSprite(D)) {
            ae && te.setFromMatrixPosition(D.matrixWorld).applyMatrix4(ee);
            const Ge = Z.update(D), He = D.material;
            He.visible && v.push(D, Ge, He, re, te.z, null);
          }
        } else if ((D.isMesh || D.isLine || D.isPoints) && (!D.frustumCulled || K.intersectsObject(D))) {
          const Ge = Z.update(D), He = D.material;
          if (ae && (D.boundingSphere !== void 0 ? (D.boundingSphere === null && D.computeBoundingSphere(), te.copy(D.boundingSphere.center)) : (Ge.boundingSphere === null && Ge.computeBoundingSphere(), te.copy(Ge.boundingSphere.center)), te.applyMatrix4(D.matrixWorld).applyMatrix4(ee)), Array.isArray(He)) {
            const be = Ge.groups;
            for (let We = 0, Xe = be.length; We < Xe; We++) {
              const Ve = be[We], ot = He[Ve.materialIndex];
              ot && ot.visible && v.push(D, Ge, ot, re, te.z, Ve);
            }
          } else He.visible && v.push(D, Ge, He, re, te.z, null);
        }
      }
      const Fe = D.children;
      for (let Ge = 0, He = Fe.length; Ge < He; Ge++)
        dt(Fe[Ge], J, re, ae);
    }
    function Kt(D, J, re, ae) {
      const ie = D.opaque, Fe = D.transmissive, Ge = D.transparent;
      p.setupLightsView(re), I === !0 && se.setGlobalState(g.clippingPlanes, re), Fe.length > 0 && Zt(ie, Fe, J, re), ae && ue.viewport(x.copy(ae)), ie.length > 0 && Gt(ie, J, re), Fe.length > 0 && Gt(Fe, J, re), Ge.length > 0 && Gt(Ge, J, re), ue.buffers.depth.setTest(!0), ue.buffers.depth.setMask(!0), ue.buffers.color.setMask(!0), ue.setPolygonOffset(!1);
    }
    function Zt(D, J, re, ae) {
      if ((re.isScene === !0 ? re.overrideMaterial : null) !== null)
        return;
      const Fe = pe.isWebGL2;
      Q === null && (Q = new gt(1, 1, {
        generateMipmaps: !0,
        type: _e.has("EXT_color_buffer_half_float") ? 1016 : 1009,
        minFilter: 1008,
        samples: Fe ? 4 : 0
      })), g.getDrawingBufferSize(q), Fe ? Q.setSize(q.x, q.y) : Q.setSize(ks(q.x), ks(q.y));
      const Ge = g.getRenderTarget();
      g.setRenderTarget(Q), g.getClearColor(k), P = g.getClearAlpha(), P < 1 && g.setClearColor(16777215, 0.5), g.clear();
      const He = g.toneMapping;
      g.toneMapping = 0, Gt(D, re, ae), ve.updateMultisampleRenderTarget(Q), ve.updateRenderTargetMipmap(Q);
      let be = !1;
      for (let We = 0, Xe = J.length; We < Xe; We++) {
        const Ve = J[We], ot = Ve.object, Et = Ve.geometry, pt = Ve.material, Ft = Ve.group;
        if (pt.side === 2 && ot.layers.test(ae.layers)) {
          const rt = pt.side;
          pt.side = 1, pt.needsUpdate = !0, ln(ot, re, ae, Et, pt, Ft), pt.side = rt, pt.needsUpdate = !0, be = !0;
        }
      }
      be === !0 && (ve.updateMultisampleRenderTarget(Q), ve.updateRenderTargetMipmap(Q)), g.setRenderTarget(Ge), g.setClearColor(k, P), g.toneMapping = He;
    }
    function Gt(D, J, re) {
      const ae = J.isScene === !0 ? J.overrideMaterial : null;
      for (let ie = 0, Fe = D.length; ie < Fe; ie++) {
        const Ge = D[ie], He = Ge.object, be = Ge.geometry, We = ae === null ? Ge.material : ae, Xe = Ge.group;
        He.layers.test(re.layers) && ln(He, J, re, be, We, Xe);
      }
    }
    function ln(D, J, re, ae, ie, Fe) {
      D.onBeforeRender(g, J, re, ae, ie, Fe), D.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse, D.matrixWorld), D.normalMatrix.getNormalMatrix(D.modelViewMatrix), ie.onBeforeRender(g, J, re, ae, D, Fe), ie.transparent === !0 && ie.side === 2 && ie.forceSinglePass === !1 ? (ie.side = 1, ie.needsUpdate = !0, g.renderBufferDirect(re, J, ae, ie, D, Fe), ie.side = 0, ie.needsUpdate = !0, g.renderBufferDirect(re, J, ae, ie, D, Fe), ie.side = 2) : g.renderBufferDirect(re, J, ae, ie, D, Fe), D.onAfterRender(g, J, re, ae, ie, Fe);
    }
    function Lt(D, J, re) {
      J.isScene !== !0 && (J = de);
      const ae = ce.get(D), ie = p.state.lights, Fe = p.state.shadowsArray, Ge = ie.state.version, He = $.getParameters(D, ie.state, Fe, J, re), be = $.getProgramCacheKey(He);
      let We = ae.programs;
      ae.environment = D.isMeshStandardMaterial ? J.environment : null, ae.fog = J.fog, ae.envMap = (D.isMeshStandardMaterial ? E : we).get(D.envMap || ae.environment), ae.envMapRotation = ae.environment !== null && D.envMap === null ? J.environmentRotation : D.envMapRotation, We === void 0 && (D.addEventListener("dispose", j), We = /* @__PURE__ */ new Map(), ae.programs = We);
      let Xe = We.get(be);
      if (Xe !== void 0) {
        if (ae.currentProgram === Xe && ae.lightsStateVersion === Ge)
          return cn(D, He), Xe;
      } else
        He.uniforms = $.getUniforms(D), D.onBuild(re, He, g), D.onBeforeCompile(He, g), Xe = $.acquireProgram(He, be), We.set(be, Xe), ae.uniforms = He.uniforms;
      const Ve = ae.uniforms;
      return (!D.isShaderMaterial && !D.isRawShaderMaterial || D.clipping === !0) && (Ve.clippingPlanes = se.uniform), cn(D, He), ae.needsLights = Qr(D), ae.lightsStateVersion = Ge, ae.needsLights && (Ve.ambientLightColor.value = ie.state.ambient, Ve.lightProbe.value = ie.state.probe, Ve.directionalLights.value = ie.state.directional, Ve.directionalLightShadows.value = ie.state.directionalShadow, Ve.spotLights.value = ie.state.spot, Ve.spotLightShadows.value = ie.state.spotShadow, Ve.rectAreaLights.value = ie.state.rectArea, Ve.ltc_1.value = ie.state.rectAreaLTC1, Ve.ltc_2.value = ie.state.rectAreaLTC2, Ve.pointLights.value = ie.state.point, Ve.pointLightShadows.value = ie.state.pointShadow, Ve.hemisphereLights.value = ie.state.hemi, Ve.directionalShadowMap.value = ie.state.directionalShadowMap, Ve.directionalShadowMatrix.value = ie.state.directionalShadowMatrix, Ve.spotShadowMap.value = ie.state.spotShadowMap, Ve.spotLightMatrix.value = ie.state.spotLightMatrix, Ve.spotLightMap.value = ie.state.spotLightMap, Ve.pointShadowMap.value = ie.state.pointShadowMap, Ve.pointShadowMatrix.value = ie.state.pointShadowMatrix), ae.currentProgram = Xe, ae.uniformsList = null, Xe;
    }
    function bt(D) {
      if (D.uniformsList === null) {
        const J = D.currentProgram.getUniforms();
        D.uniformsList = kr.seqWithValue(J.seq, D.uniforms);
      }
      return D.uniformsList;
    }
    function cn(D, J) {
      const re = ce.get(D);
      re.outputColorSpace = J.outputColorSpace, re.batching = J.batching, re.instancing = J.instancing, re.instancingColor = J.instancingColor, re.instancingMorph = J.instancingMorph, re.skinning = J.skinning, re.morphTargets = J.morphTargets, re.morphNormals = J.morphNormals, re.morphColors = J.morphColors, re.morphTargetsCount = J.morphTargetsCount, re.numClippingPlanes = J.numClippingPlanes, re.numIntersection = J.numClipIntersection, re.vertexAlphas = J.vertexAlphas, re.vertexTangents = J.vertexTangents, re.toneMapping = J.toneMapping;
    }
    function ar(D, J, re, ae, ie) {
      J.isScene !== !0 && (J = de), ve.resetTextureUnits();
      const Fe = J.fog, Ge = ae.isMeshStandardMaterial ? J.environment : null, He = S === null ? g.outputColorSpace : S.isXRRenderTarget === !0 ? S.texture.colorSpace : Un, be = (ae.isMeshStandardMaterial ? E : we).get(ae.envMap || Ge), We = ae.vertexColors === !0 && !!re.attributes.color && re.attributes.color.itemSize === 4, Xe = !!re.attributes.tangent && (!!ae.normalMap || ae.anisotropy > 0), Ve = !!re.morphAttributes.position, ot = !!re.morphAttributes.normal, Et = !!re.morphAttributes.color;
      let pt = 0;
      ae.toneMapped && (S === null || S.isXRRenderTarget === !0) && (pt = g.toneMapping);
      const Ft = re.morphAttributes.position || re.morphAttributes.normal || re.morphAttributes.color, rt = Ft !== void 0 ? Ft.length : 0, je = ce.get(ae), bn = p.state.lights;
      if (I === !0 && (B === !0 || D !== z)) {
        const wt = D === z && ae.id === C;
        se.setState(ae, D, wt);
      }
      let at = !1;
      ae.version === je.__version ? (je.needsLights && je.lightsStateVersion !== bn.state.version || je.outputColorSpace !== He || ie.isBatchedMesh && je.batching === !1 || !ie.isBatchedMesh && je.batching === !0 || ie.isInstancedMesh && je.instancing === !1 || !ie.isInstancedMesh && je.instancing === !0 || ie.isSkinnedMesh && je.skinning === !1 || !ie.isSkinnedMesh && je.skinning === !0 || ie.isInstancedMesh && je.instancingColor === !0 && ie.instanceColor === null || ie.isInstancedMesh && je.instancingColor === !1 && ie.instanceColor !== null || ie.isInstancedMesh && je.instancingMorph === !0 && ie.morphTexture === null || ie.isInstancedMesh && je.instancingMorph === !1 && ie.morphTexture !== null || je.envMap !== be || ae.fog === !0 && je.fog !== Fe || je.numClippingPlanes !== void 0 && (je.numClippingPlanes !== se.numPlanes || je.numIntersection !== se.numIntersection) || je.vertexAlphas !== We || je.vertexTangents !== Xe || je.morphTargets !== Ve || je.morphNormals !== ot || je.morphColors !== Et || je.toneMapping !== pt || pe.isWebGL2 === !0 && je.morphTargetsCount !== rt) && (at = !0) : (at = !0, je.__version = ae.version);
      let Jt = je.currentProgram;
      at === !0 && (Jt = Lt(ae, J, ie));
      let Di = !1, Qt = !1, Ln = !1;
      const ht = Jt.getUniforms(), $t = je.uniforms;
      if (ue.useProgram(Jt.program) && (Di = !0, Qt = !0, Ln = !0), ae.id !== C && (C = ae.id, Qt = !0), Di || z !== D) {
        ht.setValue(F, "projectionMatrix", D.projectionMatrix), ht.setValue(F, "viewMatrix", D.matrixWorldInverse);
        const wt = ht.map.cameraPosition;
        wt !== void 0 && wt.setValue(F, te.setFromMatrixPosition(D.matrixWorld)), pe.logarithmicDepthBuffer && ht.setValue(
          F,
          "logDepthBufFC",
          2 / (Math.log(D.far + 1) / Math.LN2)
        ), (ae.isMeshPhongMaterial || ae.isMeshToonMaterial || ae.isMeshLambertMaterial || ae.isMeshBasicMaterial || ae.isMeshStandardMaterial || ae.isShaderMaterial) && ht.setValue(F, "isOrthographic", D.isOrthographicCamera === !0), z !== D && (z = D, Qt = !0, Ln = !0);
      }
      if (ie.isSkinnedMesh) {
        ht.setOptional(F, ie, "bindMatrix"), ht.setOptional(F, ie, "bindMatrixInverse");
        const wt = ie.skeleton;
        wt && (pe.floatVertexTextures ? (wt.boneTexture === null && wt.computeBoneTexture(), ht.setValue(F, "boneTexture", wt.boneTexture, ve)) : console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."));
      }
      ie.isBatchedMesh && (ht.setOptional(F, ie, "batchingTexture"), ht.setValue(F, "batchingTexture", ie._matricesTexture, ve));
      const Fn = re.morphAttributes;
      if ((Fn.position !== void 0 || Fn.normal !== void 0 || Fn.color !== void 0 && pe.isWebGL2 === !0) && ge.update(ie, re, Jt), (Qt || je.receiveShadow !== ie.receiveShadow) && (je.receiveShadow = ie.receiveShadow, ht.setValue(F, "receiveShadow", ie.receiveShadow)), ae.isMeshGouraudMaterial && ae.envMap !== null && ($t.envMap.value = be, $t.flipEnvMap.value = be.isCubeTexture && be.isRenderTargetTexture === !1 ? -1 : 1), Qt && (ht.setValue(F, "toneMappingExposure", g.toneMappingExposure), je.needsLights && Pi($t, Ln), Fe && ae.fog === !0 && oe.refreshFogUniforms($t, Fe), oe.refreshMaterialUniforms($t, ae, Y, O, Q), kr.upload(F, bt(je), $t, ve)), ae.isShaderMaterial && ae.uniformsNeedUpdate === !0 && (kr.upload(F, bt(je), $t, ve), ae.uniformsNeedUpdate = !1), ae.isSpriteMaterial && ht.setValue(F, "center", ie.center), ht.setValue(F, "modelViewMatrix", ie.modelViewMatrix), ht.setValue(F, "normalMatrix", ie.normalMatrix), ht.setValue(F, "modelMatrix", ie.matrixWorld), ae.isShaderMaterial || ae.isRawShaderMaterial) {
        const wt = ae.uniformsGroups;
        for (let It = 0, $r = wt.length; It < $r; It++)
          if (pe.isWebGL2) {
            const In = wt[It];
            Ce.update(In, Jt), Ce.bind(In, Jt);
          } else
            console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.");
      }
      return Jt;
    }
    function Pi(D, J) {
      D.ambientLightColor.needsUpdate = J, D.lightProbe.needsUpdate = J, D.directionalLights.needsUpdate = J, D.directionalLightShadows.needsUpdate = J, D.pointLights.needsUpdate = J, D.pointLightShadows.needsUpdate = J, D.spotLights.needsUpdate = J, D.spotLightShadows.needsUpdate = J, D.rectAreaLights.needsUpdate = J, D.hemisphereLights.needsUpdate = J;
    }
    function Qr(D) {
      return D.isMeshLambertMaterial || D.isMeshToonMaterial || D.isMeshPhongMaterial || D.isMeshStandardMaterial || D.isShadowMaterial || D.isShaderMaterial && D.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return w;
    }, this.getActiveMipmapLevel = function() {
      return T;
    }, this.getRenderTarget = function() {
      return S;
    }, this.setRenderTargetTextures = function(D, J, re) {
      ce.get(D.texture).__webglTexture = J, ce.get(D.depthTexture).__webglTexture = re;
      const ae = ce.get(D);
      ae.__hasExternalTextures = !0, ae.__autoAllocateDepthBuffer = re === void 0, ae.__autoAllocateDepthBuffer || _e.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), ae.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(D, J) {
      const re = ce.get(D);
      re.__webglFramebuffer = J, re.__useDefaultFramebuffer = J === void 0;
    }, this.setRenderTarget = function(D, J = 0, re = 0) {
      S = D, w = J, T = re;
      let ae = !0, ie = null, Fe = !1, Ge = !1;
      if (D) {
        const be = ce.get(D);
        be.__useDefaultFramebuffer !== void 0 ? (ue.bindFramebuffer(F.FRAMEBUFFER, null), ae = !1) : be.__webglFramebuffer === void 0 ? ve.setupRenderTarget(D) : be.__hasExternalTextures && ve.rebindTextures(D, ce.get(D.texture).__webglTexture, ce.get(D.depthTexture).__webglTexture);
        const We = D.texture;
        (We.isData3DTexture || We.isDataArrayTexture || We.isCompressedArrayTexture) && (Ge = !0);
        const Xe = ce.get(D).__webglFramebuffer;
        D.isWebGLCubeRenderTarget ? (Array.isArray(Xe[J]) ? ie = Xe[J][re] : ie = Xe[J], Fe = !0) : pe.isWebGL2 && D.samples > 0 && ve.useMultisampledRTT(D) === !1 ? ie = ce.get(D).__webglMultisampledFramebuffer : Array.isArray(Xe) ? ie = Xe[re] : ie = Xe, x.copy(D.viewport), R.copy(D.scissor), L = D.scissorTest;
      } else
        x.copy(X).multiplyScalar(Y).floor(), R.copy(U).multiplyScalar(Y).floor(), L = V;
      if (ue.bindFramebuffer(F.FRAMEBUFFER, ie) && pe.drawBuffers && ae && ue.drawBuffers(D, ie), ue.viewport(x), ue.scissor(R), ue.setScissorTest(L), Fe) {
        const be = ce.get(D.texture);
        F.framebufferTexture2D(F.FRAMEBUFFER, F.COLOR_ATTACHMENT0, F.TEXTURE_CUBE_MAP_POSITIVE_X + J, be.__webglTexture, re);
      } else if (Ge) {
        const be = ce.get(D.texture), We = J || 0;
        F.framebufferTextureLayer(F.FRAMEBUFFER, F.COLOR_ATTACHMENT0, be.__webglTexture, re || 0, We);
      }
      C = -1;
    }, this.readRenderTargetPixels = function(D, J, re, ae, ie, Fe, Ge) {
      if (!(D && D.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let He = ce.get(D).__webglFramebuffer;
      if (D.isWebGLCubeRenderTarget && Ge !== void 0 && (He = He[Ge]), He) {
        ue.bindFramebuffer(F.FRAMEBUFFER, He);
        try {
          const be = D.texture, We = be.format, Xe = be.type;
          if (We !== 1023 && xe.convert(We) !== F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          const Ve = Xe === 1016 && (_e.has("EXT_color_buffer_half_float") || pe.isWebGL2 && _e.has("EXT_color_buffer_float"));
          if (Xe !== 1009 && xe.convert(Xe) !== F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
          !(Xe === 1015 && (pe.isWebGL2 || _e.has("OES_texture_float") || _e.has("WEBGL_color_buffer_float"))) && // Chrome Mac >= 52 and Firefox
          !Ve) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          J >= 0 && J <= D.width - ae && re >= 0 && re <= D.height - ie && F.readPixels(J, re, ae, ie, xe.convert(We), xe.convert(Xe), Fe);
        } finally {
          const be = S !== null ? ce.get(S).__webglFramebuffer : null;
          ue.bindFramebuffer(F.FRAMEBUFFER, be);
        }
      }
    }, this.copyFramebufferToTexture = function(D, J, re = 0) {
      const ae = Math.pow(2, -re), ie = Math.floor(J.image.width * ae), Fe = Math.floor(J.image.height * ae);
      ve.setTexture2D(J, 0), F.copyTexSubImage2D(F.TEXTURE_2D, re, 0, 0, D.x, D.y, ie, Fe), ue.unbindTexture();
    }, this.copyTextureToTexture = function(D, J, re, ae = 0) {
      const ie = J.image.width, Fe = J.image.height, Ge = xe.convert(re.format), He = xe.convert(re.type);
      ve.setTexture2D(re, 0), F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL, re.flipY), F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL, re.premultiplyAlpha), F.pixelStorei(F.UNPACK_ALIGNMENT, re.unpackAlignment), J.isDataTexture ? F.texSubImage2D(F.TEXTURE_2D, ae, D.x, D.y, ie, Fe, Ge, He, J.image.data) : J.isCompressedTexture ? F.compressedTexSubImage2D(F.TEXTURE_2D, ae, D.x, D.y, J.mipmaps[0].width, J.mipmaps[0].height, Ge, J.mipmaps[0].data) : F.texSubImage2D(F.TEXTURE_2D, ae, D.x, D.y, Ge, He, J.image), ae === 0 && re.generateMipmaps && F.generateMipmap(F.TEXTURE_2D), ue.unbindTexture();
    }, this.copyTextureToTexture3D = function(D, J, re, ae, ie = 0) {
      if (g.isWebGL1Renderer) {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
        return;
      }
      const Fe = Math.round(D.max.x - D.min.x), Ge = Math.round(D.max.y - D.min.y), He = D.max.z - D.min.z + 1, be = xe.convert(ae.format), We = xe.convert(ae.type);
      let Xe;
      if (ae.isData3DTexture)
        ve.setTexture3D(ae, 0), Xe = F.TEXTURE_3D;
      else if (ae.isDataArrayTexture || ae.isCompressedArrayTexture)
        ve.setTexture2DArray(ae, 0), Xe = F.TEXTURE_2D_ARRAY;
      else {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
        return;
      }
      F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL, ae.flipY), F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL, ae.premultiplyAlpha), F.pixelStorei(F.UNPACK_ALIGNMENT, ae.unpackAlignment);
      const Ve = F.getParameter(F.UNPACK_ROW_LENGTH), ot = F.getParameter(F.UNPACK_IMAGE_HEIGHT), Et = F.getParameter(F.UNPACK_SKIP_PIXELS), pt = F.getParameter(F.UNPACK_SKIP_ROWS), Ft = F.getParameter(F.UNPACK_SKIP_IMAGES), rt = re.isCompressedTexture ? re.mipmaps[ie] : re.image;
      F.pixelStorei(F.UNPACK_ROW_LENGTH, rt.width), F.pixelStorei(F.UNPACK_IMAGE_HEIGHT, rt.height), F.pixelStorei(F.UNPACK_SKIP_PIXELS, D.min.x), F.pixelStorei(F.UNPACK_SKIP_ROWS, D.min.y), F.pixelStorei(F.UNPACK_SKIP_IMAGES, D.min.z), re.isDataTexture || re.isData3DTexture ? F.texSubImage3D(Xe, ie, J.x, J.y, J.z, Fe, Ge, He, be, We, rt.data) : ae.isCompressedArrayTexture ? F.compressedTexSubImage3D(Xe, ie, J.x, J.y, J.z, Fe, Ge, He, be, rt.data) : F.texSubImage3D(Xe, ie, J.x, J.y, J.z, Fe, Ge, He, be, We, rt), F.pixelStorei(F.UNPACK_ROW_LENGTH, Ve), F.pixelStorei(F.UNPACK_IMAGE_HEIGHT, ot), F.pixelStorei(F.UNPACK_SKIP_PIXELS, Et), F.pixelStorei(F.UNPACK_SKIP_ROWS, pt), F.pixelStorei(F.UNPACK_SKIP_IMAGES, Ft), ie === 0 && ae.generateMipmaps && F.generateMipmap(Xe), ue.unbindTexture();
    }, this.initTexture = function(D) {
      D.isCubeTexture ? ve.setTextureCube(D, 0) : D.isData3DTexture ? ve.setTexture3D(D, 0) : D.isDataArrayTexture || D.isCompressedArrayTexture ? ve.setTexture2DArray(D, 0) : ve.setTexture2D(D, 0), ue.unbindTexture();
    }, this.resetState = function() {
      w = 0, T = 0, S = null, ue.reset(), Ae.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return 2e3;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = e === Js ? "display-p3" : "srgb", t.unpackColorSpace = st.workingColorSpace === jr ? "display-p3" : "srgb";
  }
  get useLegacyLights() {
    return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights;
  }
  set useLegacyLights(e) {
    console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights = e;
  }
}
class Pd extends il {
}
Pd.prototype.isWebGL1Renderer = !0;
class Zr extends Pt {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new xn(), this.environmentRotation = new xn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
class rr extends Tt {
  constructor(e = null, t = 1, r = 1, n, i, o, a, l, c = 1003, u = 1003, f, h) {
    super(null, o, a, l, c, u, n, i, f, h), this.isDataTexture = !0, this.image = { data: e, width: t, height: r }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class Kn extends Xt {
  constructor(e, t, r, n = 1) {
    super(e, t, r), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = n;
  }
  copy(e) {
    return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e;
  }
}
const _i = /* @__PURE__ */ new ft(), ao = /* @__PURE__ */ new ft(), Fr = [], oo = /* @__PURE__ */ new yn(), Dd = /* @__PURE__ */ new ft(), Xi = /* @__PURE__ */ new qe(), qi = /* @__PURE__ */ new Qn();
class Ud extends qe {
  constructor(e, t, r) {
    super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new Kn(new Float32Array(r * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = r, this.boundingBox = null, this.boundingSphere = null;
    for (let n = 0; n < r; n++)
      this.setMatrixAt(n, Dd);
  }
  computeBoundingBox() {
    const e = this.geometry, t = this.count;
    this.boundingBox === null && (this.boundingBox = new yn()), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let r = 0; r < t; r++)
      this.getMatrixAt(r, _i), oo.copy(e.boundingBox).applyMatrix4(_i), this.boundingBox.union(oo);
  }
  computeBoundingSphere() {
    const e = this.geometry, t = this.count;
    this.boundingSphere === null && (this.boundingSphere = new Qn()), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let r = 0; r < t; r++)
      this.getMatrixAt(r, _i), qi.copy(e.boundingSphere).applyMatrix4(_i), this.boundingSphere.union(qi);
  }
  copy(e, t) {
    return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this;
  }
  getColorAt(e, t) {
    t.fromArray(this.instanceColor.array, e * 3);
  }
  getMatrixAt(e, t) {
    t.fromArray(this.instanceMatrix.array, e * 16);
  }
  getMorphAt(e, t) {
    const r = t.morphTargetInfluences, n = this.morphTexture.source.data.data, i = r.length + 1, o = e * i + 1;
    for (let a = 0; a < r.length; a++)
      r[a] = n[o + a];
  }
  raycast(e, t) {
    const r = this.matrixWorld, n = this.count;
    if (Xi.geometry = this.geometry, Xi.material = this.material, Xi.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), qi.copy(this.boundingSphere), qi.applyMatrix4(r), e.ray.intersectsSphere(qi) !== !1))
      for (let i = 0; i < n; i++) {
        this.getMatrixAt(i, _i), ao.multiplyMatrices(r, _i), Xi.matrixWorld = ao, Xi.raycast(e, Fr);
        for (let o = 0, a = Fr.length; o < a; o++) {
          const l = Fr[o];
          l.instanceId = i, l.object = this, t.push(l);
        }
        Fr.length = 0;
      }
  }
  setColorAt(e, t) {
    this.instanceColor === null && (this.instanceColor = new Kn(new Float32Array(this.instanceMatrix.count * 3), 3)), t.toArray(this.instanceColor.array, e * 3);
  }
  setMatrixAt(e, t) {
    t.toArray(this.instanceMatrix.array, e * 16);
  }
  setMorphAt(e, t) {
    const r = t.morphTargetInfluences, n = r.length + 1;
    this.morphTexture === null && (this.morphTexture = new rr(new Float32Array(n * this.count), n, this.count, 1028, 1015));
    const i = this.morphTexture.source.data.data;
    let o = 0;
    for (let c = 0; c < r.length; c++)
      o += r[c];
    const a = this.geometry.morphTargetsRelative ? 1 : 1 - o, l = n * e;
    i[l] = a, i.set(r, l + 1);
  }
  updateMorphTargets() {
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class Ld extends nr {
  constructor(e) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new me(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
  }
}
const lo = /* @__PURE__ */ new ft(), Vs = /* @__PURE__ */ new zo(), Ir = /* @__PURE__ */ new Qn(), Nr = /* @__PURE__ */ new ne();
class Fd extends Pt {
  constructor(e = new qt(), t = new Ld()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  raycast(e, t) {
    const r = this.geometry, n = this.matrixWorld, i = e.params.Points.threshold, o = r.drawRange;
    if (r.boundingSphere === null && r.computeBoundingSphere(), Ir.copy(r.boundingSphere), Ir.applyMatrix4(n), Ir.radius += i, e.ray.intersectsSphere(Ir) === !1) return;
    lo.copy(n).invert(), Vs.copy(e.ray).applyMatrix4(lo);
    const a = i / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = a * a, c = r.index, f = r.attributes.position;
    if (c !== null) {
      const h = Math.max(0, o.start), d = Math.min(c.count, o.start + o.count);
      for (let _ = h, v = d; _ < v; _++) {
        const p = c.getX(_);
        Nr.fromBufferAttribute(f, p), co(Nr, p, l, n, e, t, this);
      }
    } else {
      const h = Math.max(0, o.start), d = Math.min(f.count, o.start + o.count);
      for (let _ = h, v = d; _ < v; _++)
        Nr.fromBufferAttribute(f, _), co(Nr, _, l, n, e, t, this);
    }
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, r = Object.keys(t);
    if (r.length > 0) {
      const n = t[r[0]];
      if (n !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, o = n.length; i < o; i++) {
          const a = n[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = i;
        }
      }
    }
  }
}
function co(s, e, t, r, n, i, o) {
  const a = Vs.distanceSqToPoint(s);
  if (a < t) {
    const l = new ne();
    Vs.closestPointToPoint(s, l), l.applyMatrix4(r);
    const c = n.ray.origin.distanceTo(l);
    if (c < n.near || c > n.far) return;
    i.push({
      distance: c,
      distanceToRay: Math.sqrt(a),
      point: l,
      index: e,
      face: null,
      object: o
    });
  }
}
class $s extends qt {
  constructor(e = 1, t = 32, r = 0, n = Math.PI * 2) {
    super(), this.type = "CircleGeometry", this.parameters = {
      radius: e,
      segments: t,
      thetaStart: r,
      thetaLength: n
    }, t = Math.max(3, t);
    const i = [], o = [], a = [], l = [], c = new ne(), u = new De();
    o.push(0, 0, 0), a.push(0, 0, 1), l.push(0.5, 0.5);
    for (let f = 0, h = 3; f <= t; f++, h += 3) {
      const d = r + f / t * n;
      c.x = e * Math.cos(d), c.y = e * Math.sin(d), o.push(c.x, c.y, c.z), a.push(0, 0, 1), u.x = (o[h] / e + 1) / 2, u.y = (o[h + 1] / e + 1) / 2, l.push(u.x, u.y);
    }
    for (let f = 1; f <= t; f++)
      i.push(f, f + 1, 0);
    this.setIndex(i), this.setAttribute("position", new Ut(o, 3)), this.setAttribute("normal", new Ut(a, 3)), this.setAttribute("uv", new Ut(l, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new $s(e.radius, e.segments, e.thetaStart, e.thetaLength);
  }
}
class ea extends qt {
  constructor(e = 1, t = 32, r = 16, n = 0, i = Math.PI * 2, o = 0, a = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: e,
      widthSegments: t,
      heightSegments: r,
      phiStart: n,
      phiLength: i,
      thetaStart: o,
      thetaLength: a
    }, t = Math.max(3, Math.floor(t)), r = Math.max(2, Math.floor(r));
    const l = Math.min(o + a, Math.PI);
    let c = 0;
    const u = [], f = new ne(), h = new ne(), d = [], _ = [], v = [], p = [];
    for (let m = 0; m <= r; m++) {
      const y = [], g = m / r;
      let A = 0;
      m === 0 && o === 0 ? A = 0.5 / t : m === r && l === Math.PI && (A = -0.5 / t);
      for (let w = 0; w <= t; w++) {
        const T = w / t;
        f.x = -e * Math.cos(n + T * i) * Math.sin(o + g * a), f.y = e * Math.cos(o + g * a), f.z = e * Math.sin(n + T * i) * Math.sin(o + g * a), _.push(f.x, f.y, f.z), h.copy(f).normalize(), v.push(h.x, h.y, h.z), p.push(T + A, 1 - g), y.push(c++);
      }
      u.push(y);
    }
    for (let m = 0; m < r; m++)
      for (let y = 0; y < t; y++) {
        const g = u[m][y + 1], A = u[m][y], w = u[m + 1][y], T = u[m + 1][y + 1];
        (m !== 0 || o > 0) && d.push(g, A, T), (m !== r - 1 || l < Math.PI) && d.push(A, w, T);
      }
    this.setIndex(d), this.setAttribute("position", new Ut(_, 3)), this.setAttribute("normal", new Ut(v, 3)), this.setAttribute("uv", new Ut(p, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new ea(e.radius, e.widthSegments, e.heightSegments, e.phiStart, e.phiLength, e.thetaStart, e.thetaLength);
  }
}
const uo = {
  enabled: !1,
  files: {},
  add: function(s, e) {
    this.enabled !== !1 && (this.files[s] = e);
  },
  get: function(s) {
    if (this.enabled !== !1)
      return this.files[s];
  },
  remove: function(s) {
    delete this.files[s];
  },
  clear: function() {
    this.files = {};
  }
};
class Id {
  constructor(e, t, r) {
    const n = this;
    let i = !1, o = 0, a = 0, l;
    const c = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = r, this.itemStart = function(u) {
      a++, i === !1 && n.onStart !== void 0 && n.onStart(u, o, a), i = !0;
    }, this.itemEnd = function(u) {
      o++, n.onProgress !== void 0 && n.onProgress(u, o, a), o === a && (i = !1, n.onLoad !== void 0 && n.onLoad());
    }, this.itemError = function(u) {
      n.onError !== void 0 && n.onError(u);
    }, this.resolveURL = function(u) {
      return l ? l(u) : u;
    }, this.setURLModifier = function(u) {
      return l = u, this;
    }, this.addHandler = function(u, f) {
      return c.push(u, f), this;
    }, this.removeHandler = function(u) {
      const f = c.indexOf(u);
      return f !== -1 && c.splice(f, 2), this;
    }, this.getHandler = function(u) {
      for (let f = 0, h = c.length; f < h; f += 2) {
        const d = c[f], _ = c[f + 1];
        if (d.global && (d.lastIndex = 0), d.test(u))
          return _;
      }
      return null;
    };
  }
}
const Nd = /* @__PURE__ */ new Id();
class ta {
  constructor(e) {
    this.manager = e !== void 0 ? e : Nd, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  load() {
  }
  loadAsync(e, t) {
    const r = this;
    return new Promise(function(n, i) {
      r.load(e, n, t, i);
    });
  }
  parse() {
  }
  setCrossOrigin(e) {
    return this.crossOrigin = e, this;
  }
  setWithCredentials(e) {
    return this.withCredentials = e, this;
  }
  setPath(e) {
    return this.path = e, this;
  }
  setResourcePath(e) {
    return this.resourcePath = e, this;
  }
  setRequestHeader(e) {
    return this.requestHeader = e, this;
  }
}
ta.DEFAULT_MATERIAL_NAME = "__DEFAULT";
class Od extends ta {
  constructor(e) {
    super(e);
  }
  load(e, t, r, n) {
    this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const i = this, o = uo.get(e);
    if (o !== void 0)
      return i.manager.itemStart(e), setTimeout(function() {
        t && t(o), i.manager.itemEnd(e);
      }, 0), o;
    const a = Qi("img");
    function l() {
      u(), uo.add(e, this), t && t(this), i.manager.itemEnd(e);
    }
    function c(f) {
      u(), n && n(f), i.manager.itemError(e), i.manager.itemEnd(e);
    }
    function u() {
      a.removeEventListener("load", l, !1), a.removeEventListener("error", c, !1);
    }
    return a.addEventListener("load", l, !1), a.addEventListener("error", c, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (a.crossOrigin = this.crossOrigin), i.manager.itemStart(e), a.src = e, a;
  }
}
class Bd extends ta {
  constructor(e) {
    super(e);
  }
  load(e, t, r, n) {
    const i = new Tt(), o = new Od(this.manager);
    return o.setCrossOrigin(this.crossOrigin), o.setPath(this.path), o.load(e, function(a) {
      i.image = a, i.needsUpdate = !0, t !== void 0 && t(i);
    }, r, n), i;
  }
}
class zd extends Pt {
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new me(e), this.intensity = t;
  }
  dispose() {
  }
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, this.groundColor !== void 0 && (t.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (t.object.distance = this.distance), this.angle !== void 0 && (t.object.angle = this.angle), this.decay !== void 0 && (t.object.decay = this.decay), this.penumbra !== void 0 && (t.object.penumbra = this.penumbra), this.shadow !== void 0 && (t.object.shadow = this.shadow.toJSON()), t;
  }
}
class Gd extends zd {
  constructor(e, t) {
    super(e, t), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}
class kd extends qt {
  constructor() {
    super(), this.isInstancedBufferGeometry = !0, this.type = "InstancedBufferGeometry", this.instanceCount = 1 / 0;
  }
  copy(e) {
    return super.copy(e), this.instanceCount = e.instanceCount, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.instanceCount = this.instanceCount, e.isInstancedBufferGeometry = !0, e;
  }
}
class Hd {
  constructor(e = !0) {
    this.autoStart = e, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1;
  }
  start() {
    this.startTime = fo(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0;
  }
  stop() {
    this.getElapsedTime(), this.running = !1, this.autoStart = !1;
  }
  getElapsedTime() {
    return this.getDelta(), this.elapsedTime;
  }
  getDelta() {
    let e = 0;
    if (this.autoStart && !this.running)
      return this.start(), 0;
    if (this.running) {
      const t = fo();
      e = (t - this.oldTime) / 1e3, this.oldTime = t, this.elapsedTime += e;
    }
    return e;
  }
}
function fo() {
  return (typeof performance > "u" ? Date : performance).now();
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: Zs
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = Zs);
class Vd {
  constructor(e) {
    this.smoothed = { bass: 0, mid: 0, treble: 0, rms: 0 }, this.smoothing = 0.82, this.analyser = e, this.freqData = new Uint8Array(this.analyser.frequencyBinCount), this.timeData = new Uint8Array(this.analyser.frequencyBinCount);
  }
  update() {
    this.analyser.getByteFrequencyData(this.freqData), this.analyser.getByteTimeDomainData(this.timeData);
    const e = this.freqData.length, t = Math.floor(e / 3);
    let r = 0, n = 0, i = 0;
    for (let l = 0; l < t; l++) r += this.freqData[l];
    for (let l = t; l < t * 2; l++) n += this.freqData[l];
    for (let l = t * 2; l < e; l++) i += this.freqData[l];
    r = r / t / 255, n = n / t / 255, i = i / (e - t * 2) / 255;
    let o = 0;
    for (let l = 0; l < this.timeData.length; l++) {
      const c = (this.timeData[l] - 128) / 128;
      o += c * c;
    }
    o = Math.sqrt(o / this.timeData.length);
    const a = this.smoothing;
    return this.smoothed.bass = this.smoothed.bass * a + r * (1 - a), this.smoothed.mid = this.smoothed.mid * a + n * (1 - a), this.smoothed.treble = this.smoothed.treble * a + i * (1 - a), this.smoothed.rms = this.smoothed.rms * a + o * (1 - a), this.smoothed;
  }
}
const rl = {
  name: "CopyShader",
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`
  )
};
class sr {
  constructor() {
    this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
  }
  setSize() {
  }
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  dispose() {
  }
}
const Wd = new nt(-1, 1, 1, -1, 0, 1);
class Xd extends qt {
  constructor() {
    super(), this.setAttribute("position", new Ut([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new Ut([0, 2, 0, 0, 2, 0], 2));
  }
}
const qd = new Xd();
class sl {
  constructor(e) {
    this._mesh = new qe(qd, e);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(e) {
    e.render(this._mesh, Wd);
  }
  get material() {
    return this._mesh.material;
  }
  set material(e) {
    this._mesh.material = e;
  }
}
class al extends sr {
  constructor(e, t) {
    super(), this.textureID = t !== void 0 ? t : "tDiffuse", e instanceof Je ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = $i.clone(e.uniforms), this.material = new Je({
      name: e.name !== void 0 ? e.name : "unspecified",
      defines: Object.assign({}, e.defines),
      uniforms: this.uniforms,
      vertexShader: e.vertexShader,
      fragmentShader: e.fragmentShader
    })), this.fsQuad = new sl(this.material);
  }
  render(e, t, r) {
    this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = r.texture), this.fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this.fsQuad.render(e));
  }
  dispose() {
    this.material.dispose(), this.fsQuad.dispose();
  }
}
class ho extends sr {
  constructor(e, t) {
    super(), this.scene = e, this.camera = t, this.clear = !0, this.needsSwap = !1, this.inverse = !1;
  }
  render(e, t, r) {
    const n = e.getContext(), i = e.state;
    i.buffers.color.setMask(!1), i.buffers.depth.setMask(!1), i.buffers.color.setLocked(!0), i.buffers.depth.setLocked(!0);
    let o, a;
    this.inverse ? (o = 0, a = 1) : (o = 1, a = 0), i.buffers.stencil.setTest(!0), i.buffers.stencil.setOp(n.REPLACE, n.REPLACE, n.REPLACE), i.buffers.stencil.setFunc(n.ALWAYS, o, 4294967295), i.buffers.stencil.setClear(a), i.buffers.stencil.setLocked(!0), e.setRenderTarget(r), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(t), this.clear && e.clear(), e.render(this.scene, this.camera), i.buffers.color.setLocked(!1), i.buffers.depth.setLocked(!1), i.buffers.color.setMask(!0), i.buffers.depth.setMask(!0), i.buffers.stencil.setLocked(!1), i.buffers.stencil.setFunc(n.EQUAL, 1, 4294967295), i.buffers.stencil.setOp(n.KEEP, n.KEEP, n.KEEP), i.buffers.stencil.setLocked(!0);
  }
}
class Yd extends sr {
  constructor() {
    super(), this.needsSwap = !1;
  }
  render(e) {
    e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
  }
}
class jd {
  constructor(e, t) {
    if (this.renderer = e, this._pixelRatio = e.getPixelRatio(), t === void 0) {
      const r = e.getSize(new De());
      this._width = r.width, this._height = r.height, t = new gt(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: 1016 }), t.texture.name = "EffectComposer.rt1";
    } else
      this._width = t.width, this._height = t.height;
    this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new al(rl), this.copyPass.material.blending = 0, this.clock = new Hd();
  }
  swapBuffers() {
    const e = this.readBuffer;
    this.readBuffer = this.writeBuffer, this.writeBuffer = e;
  }
  addPass(e) {
    this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  insertPass(e, t) {
    this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  removePass(e) {
    const t = this.passes.indexOf(e);
    t !== -1 && this.passes.splice(t, 1);
  }
  isLastEnabledPass(e) {
    for (let t = e + 1; t < this.passes.length; t++)
      if (this.passes[t].enabled)
        return !1;
    return !0;
  }
  render(e) {
    e === void 0 && (e = this.clock.getDelta());
    const t = this.renderer.getRenderTarget();
    let r = !1;
    for (let n = 0, i = this.passes.length; n < i; n++) {
      const o = this.passes[n];
      if (o.enabled !== !1) {
        if (o.renderToScreen = this.renderToScreen && this.isLastEnabledPass(n), o.render(this.renderer, this.writeBuffer, this.readBuffer, e, r), o.needsSwap) {
          if (r) {
            const a = this.renderer.getContext(), l = this.renderer.state.buffers.stencil;
            l.setFunc(a.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), l.setFunc(a.EQUAL, 1, 4294967295);
          }
          this.swapBuffers();
        }
        ho !== void 0 && (o instanceof ho ? r = !0 : o instanceof Yd && (r = !1));
      }
    }
    this.renderer.setRenderTarget(t);
  }
  reset(e) {
    if (e === void 0) {
      const t = this.renderer.getSize(new De());
      this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, e = this.renderTarget1.clone(), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
  }
  setSize(e, t) {
    this._width = e, this._height = t;
    const r = this._width * this._pixelRatio, n = this._height * this._pixelRatio;
    this.renderTarget1.setSize(r, n), this.renderTarget2.setSize(r, n);
    for (let i = 0; i < this.passes.length; i++)
      this.passes[i].setSize(r, n);
  }
  setPixelRatio(e) {
    this._pixelRatio = e, this.setSize(this._width, this._height);
  }
  dispose() {
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
  }
}
class po extends sr {
  constructor(e, t, r = null, n = null, i = null) {
    super(), this.scene = e, this.camera = t, this.overrideMaterial = r, this.clearColor = n, this.clearAlpha = i, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this._oldClearColor = new me();
  }
  render(e, t, r) {
    const n = e.autoClear;
    e.autoClear = !1;
    let i, o;
    this.overrideMaterial !== null && (o = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor !== null && (e.getClearColor(this._oldClearColor), e.setClearColor(this.clearColor)), this.clearAlpha !== null && (i = e.getClearAlpha(), e.setClearAlpha(this.clearAlpha)), this.clearDepth == !0 && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : r), this.clear === !0 && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), this.clearColor !== null && e.setClearColor(this._oldClearColor), this.clearAlpha !== null && e.setClearAlpha(i), this.overrideMaterial !== null && (this.scene.overrideMaterial = o), e.autoClear = n;
  }
}
const Kd = {
  uniforms: {
    tDiffuse: { value: null },
    luminosityThreshold: { value: 1 },
    smoothWidth: { value: 1 },
    defaultColor: { value: new me(0) },
    defaultOpacity: { value: 0 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`
  )
};
class wi extends sr {
  constructor(e, t, r, n) {
    super(), this.strength = t !== void 0 ? t : 1, this.radius = r, this.threshold = n, this.resolution = e !== void 0 ? new De(e.x, e.y) : new De(256, 256), this.clearColor = new me(0, 0, 0), this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5;
    let i = Math.round(this.resolution.x / 2), o = Math.round(this.resolution.y / 2);
    this.renderTargetBright = new gt(i, o, { type: 1016 }), this.renderTargetBright.texture.name = "UnrealBloomPass.bright", this.renderTargetBright.texture.generateMipmaps = !1;
    for (let f = 0; f < this.nMips; f++) {
      const h = new gt(i, o, { type: 1016 });
      h.texture.name = "UnrealBloomPass.h" + f, h.texture.generateMipmaps = !1, this.renderTargetsHorizontal.push(h);
      const d = new gt(i, o, { type: 1016 });
      d.texture.name = "UnrealBloomPass.v" + f, d.texture.generateMipmaps = !1, this.renderTargetsVertical.push(d), i = Math.round(i / 2), o = Math.round(o / 2);
    }
    const a = Kd;
    this.highPassUniforms = $i.clone(a.uniforms), this.highPassUniforms.luminosityThreshold.value = n, this.highPassUniforms.smoothWidth.value = 0.01, this.materialHighPassFilter = new Je({
      uniforms: this.highPassUniforms,
      vertexShader: a.vertexShader,
      fragmentShader: a.fragmentShader
    }), this.separableBlurMaterials = [];
    const l = [3, 5, 7, 9, 11];
    i = Math.round(this.resolution.x / 2), o = Math.round(this.resolution.y / 2);
    for (let f = 0; f < this.nMips; f++)
      this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[f])), this.separableBlurMaterials[f].uniforms.invSize.value = new De(1 / i, 1 / o), i = Math.round(i / 2), o = Math.round(o / 2);
    this.compositeMaterial = this.getCompositeMaterial(this.nMips), this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture, this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture, this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture, this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture, this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture, this.compositeMaterial.uniforms.bloomStrength.value = t, this.compositeMaterial.uniforms.bloomRadius.value = 0.1;
    const c = [1, 0.8, 0.6, 0.4, 0.2];
    this.compositeMaterial.uniforms.bloomFactors.value = c, this.bloomTintColors = [new ne(1, 1, 1), new ne(1, 1, 1), new ne(1, 1, 1), new ne(1, 1, 1), new ne(1, 1, 1)], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors;
    const u = rl;
    this.copyUniforms = $i.clone(u.uniforms), this.blendMaterial = new Je({
      uniforms: this.copyUniforms,
      vertexShader: u.vertexShader,
      fragmentShader: u.fragmentShader,
      blending: 2,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0
    }), this.enabled = !0, this.needsSwap = !1, this._oldClearColor = new me(), this.oldClearAlpha = 1, this.basic = new Jn(), this.fsQuad = new sl(null);
  }
  dispose() {
    for (let e = 0; e < this.renderTargetsHorizontal.length; e++)
      this.renderTargetsHorizontal[e].dispose();
    for (let e = 0; e < this.renderTargetsVertical.length; e++)
      this.renderTargetsVertical[e].dispose();
    this.renderTargetBright.dispose();
    for (let e = 0; e < this.separableBlurMaterials.length; e++)
      this.separableBlurMaterials[e].dispose();
    this.compositeMaterial.dispose(), this.blendMaterial.dispose(), this.basic.dispose(), this.fsQuad.dispose();
  }
  setSize(e, t) {
    let r = Math.round(e / 2), n = Math.round(t / 2);
    this.renderTargetBright.setSize(r, n);
    for (let i = 0; i < this.nMips; i++)
      this.renderTargetsHorizontal[i].setSize(r, n), this.renderTargetsVertical[i].setSize(r, n), this.separableBlurMaterials[i].uniforms.invSize.value = new De(1 / r, 1 / n), r = Math.round(r / 2), n = Math.round(n / 2);
  }
  render(e, t, r, n, i) {
    e.getClearColor(this._oldClearColor), this.oldClearAlpha = e.getClearAlpha();
    const o = e.autoClear;
    e.autoClear = !1, e.setClearColor(this.clearColor, 0), i && e.state.buffers.stencil.setTest(!1), this.renderToScreen && (this.fsQuad.material = this.basic, this.basic.map = r.texture, e.setRenderTarget(null), e.clear(), this.fsQuad.render(e)), this.highPassUniforms.tDiffuse.value = r.texture, this.highPassUniforms.luminosityThreshold.value = this.threshold, this.fsQuad.material = this.materialHighPassFilter, e.setRenderTarget(this.renderTargetBright), e.clear(), this.fsQuad.render(e);
    let a = this.renderTargetBright;
    for (let l = 0; l < this.nMips; l++)
      this.fsQuad.material = this.separableBlurMaterials[l], this.separableBlurMaterials[l].uniforms.colorTexture.value = a.texture, this.separableBlurMaterials[l].uniforms.direction.value = wi.BlurDirectionX, e.setRenderTarget(this.renderTargetsHorizontal[l]), e.clear(), this.fsQuad.render(e), this.separableBlurMaterials[l].uniforms.colorTexture.value = this.renderTargetsHorizontal[l].texture, this.separableBlurMaterials[l].uniforms.direction.value = wi.BlurDirectionY, e.setRenderTarget(this.renderTargetsVertical[l]), e.clear(), this.fsQuad.render(e), a = this.renderTargetsVertical[l];
    this.fsQuad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, e.setRenderTarget(this.renderTargetsHorizontal[0]), e.clear(), this.fsQuad.render(e), this.fsQuad.material = this.blendMaterial, this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture, i && e.state.buffers.stencil.setTest(!0), this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(r), this.fsQuad.render(e)), e.setClearColor(this._oldClearColor, this.oldClearAlpha), e.autoClear = o;
  }
  getSeperableBlurMaterial(e) {
    const t = [];
    for (let r = 0; r < e; r++)
      t.push(0.39894 * Math.exp(-0.5 * r * r / (e * e)) / e);
    return new Je({
      defines: {
        KERNEL_RADIUS: e
      },
      uniforms: {
        colorTexture: { value: null },
        invSize: { value: new De(0.5, 0.5) },
        // inverse texture size
        direction: { value: new De(0.5, 0.5) },
        gaussianCoefficients: { value: t }
        // precomputed Gaussian coefficients
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`
    });
  }
  getCompositeMaterial(e) {
    return new Je({
      defines: {
        NUM_MIPS: e
      },
      uniforms: {
        blurTexture1: { value: null },
        blurTexture2: { value: null },
        blurTexture3: { value: null },
        blurTexture4: { value: null },
        blurTexture5: { value: null },
        bloomStrength: { value: 1 },
        bloomFactors: { value: null },
        bloomTintColors: { value: null },
        bloomRadius: { value: 0 }
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`
    });
  }
}
wi.BlurDirectionX = new De(1, 0);
wi.BlurDirectionY = new De(0, 1);
const Zd = {
  uniforms: {
    tDiffuse: { value: null },
    u_intensity: { value: 0 },
    u_resolution: { value: new De(1, 1) }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float u_intensity;
    uniform vec2 u_resolution;
    varying vec2 vUv;
    void main() {
      if (u_intensity < 0.001) {
        gl_FragColor = texture2D(tDiffuse, vUv);
        return;
      }
      vec2 dir = (vUv - 0.5) * u_intensity * 0.02;
      float r = texture2D(tDiffuse, vUv + dir).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - dir).b;
      float a = texture2D(tDiffuse, vUv).a;
      gl_FragColor = vec4(r, g, b, a);
    }
  `
};
new De(1, 1), new De(1, 0);
class Jd {
  constructor(e, t, r) {
    this.uiVisibility = 0, this.uiVisibilityTarget = 0, this.chromaBeat = 0, this._textRenderer = null, this._textDbgCount = 0, this.renderer = e, this.scene = t, this.camera = r, this.composer = new jd(e);
    const n = new po(t, r);
    n.clear = !0, this.composer.addPass(n);
    const i = n.render.bind(n);
    n.render = (c, u, f, h, d) => {
      const _ = n.camera, v = _.layers.mask;
      _.layers.set(0), i(c, u, f, h, d), _.layers.mask = v;
    };
    const o = new po(t, r);
    o.clear = !1, o.clearDepth = !0, this.composer.addPass(o);
    const a = o.render.bind(o);
    o.render = (c, u, f, h, d) => {
      const _ = o.camera, v = _.layers.mask;
      _.layers.set(1), a(c, u, f, h, d), _.layers.mask = v;
    };
    const l = e.getPixelRatio();
    this.bloom = new wi(
      new De(window.innerWidth, window.innerHeight),
      0.4,
      0.4,
      1
    ), this.composer.addPass(this.bloom), this.chromaPass = new al(Zd), this.chromaPass.uniforms.u_resolution.value.set(window.innerWidth * l, window.innerHeight * l), this.composer.addPass(this.chromaPass);
  }
  /** Set a dedicated full-DPI renderer for crisp text overlay */
  setTextRenderer(e) {
    this._textRenderer = e;
  }
  /**
   * Text is now rendered inside the composer pipeline (textPass before bloom).
   * This method is kept as no-op for API compatibility.
   */
  renderText() {
  }
  setUiVisibility(e) {
    this.uiVisibilityTarget = e ? 1 : 0;
  }
  setBlur(e) {
  }
  setDim(e, t) {
  }
  update(e) {
    this.chromaPass.uniforms.u_intensity.value = 0;
  }
  setSize(e, t) {
    const r = this.renderer.getPixelRatio(), n = e * r, i = t * r;
    this.composer.setSize(n, i), this.bloom.resolution.set(n, i), this.chromaPass.uniforms.u_resolution.value.set(n, i), this._textRenderer && this._textRenderer.setSize(e, t, !1);
  }
  updateScene(e, t) {
    this.scene = e, this.camera = t;
    const r = this.composer.passes[0];
    r.scene = e, r.camera = t;
    const n = this.composer.passes[1];
    n.scene = e, n.camera = t;
  }
}
function Qd() {
  var s = /* @__PURE__ */ Object.create(null);
  function e(n, i) {
    var o = n.id, a = n.name, l = n.dependencies;
    l === void 0 && (l = []);
    var c = n.init;
    c === void 0 && (c = function() {
    });
    var u = n.getTransferables;
    if (u === void 0 && (u = null), !s[o])
      try {
        l = l.map(function(h) {
          return h && h.isWorkerModule && (e(h, function(d) {
            if (d instanceof Error)
              throw d;
          }), h = s[h.id].value), h;
        }), c = r("<" + a + ">.init", c), u && (u = r("<" + a + ">.getTransferables", u));
        var f = null;
        typeof c == "function" ? f = c.apply(void 0, l) : console.error("worker module init function failed to rehydrate"), s[o] = {
          id: o,
          value: f,
          getTransferables: u
        }, i(f);
      } catch (h) {
        h && h.noLog || console.error(h), i(h);
      }
  }
  function t(n, i) {
    var o, a = n.id, l = n.args;
    (!s[a] || typeof s[a].value != "function") && i(new Error("Worker module " + a + ": not found or its 'init' did not return a function"));
    try {
      var c = (o = s[a]).value.apply(o, l);
      c && typeof c.then == "function" ? c.then(u, function(f) {
        return i(f instanceof Error ? f : new Error("" + f));
      }) : u(c);
    } catch (f) {
      i(f);
    }
    function u(f) {
      try {
        var h = s[a].getTransferables && s[a].getTransferables(f);
        (!h || !Array.isArray(h) || !h.length) && (h = void 0), i(f, h);
      } catch (d) {
        console.error(d), i(d);
      }
    }
  }
  function r(n, i) {
    var o = void 0;
    self.troikaDefine = function(l) {
      return o = l;
    };
    var a = URL.createObjectURL(
      new Blob(
        ["/** " + n.replace(/\*/g, "") + ` **/

troikaDefine(
` + i + `
)`],
        { type: "application/javascript" }
      )
    );
    try {
      importScripts(a);
    } catch (l) {
      console.error(l);
    }
    return URL.revokeObjectURL(a), delete self.troikaDefine, o;
  }
  self.addEventListener("message", function(n) {
    var i = n.data, o = i.messageId, a = i.action, l = i.data;
    try {
      a === "registerModule" && e(l, function(c) {
        c instanceof Error ? postMessage({
          messageId: o,
          success: !1,
          error: c.message
        }) : postMessage({
          messageId: o,
          success: !0,
          result: { isCallable: typeof c == "function" }
        });
      }), a === "callModule" && t(l, function(c, u) {
        c instanceof Error ? postMessage({
          messageId: o,
          success: !1,
          error: c.message
        }) : postMessage({
          messageId: o,
          success: !0,
          result: c
        }, u || void 0);
      });
    } catch (c) {
      postMessage({
        messageId: o,
        success: !1,
        error: c.stack
      });
    }
  });
}
function $d(s) {
  var e = function() {
    for (var t = [], r = arguments.length; r--; ) t[r] = arguments[r];
    return e._getInitResult().then(function(n) {
      if (typeof n == "function")
        return n.apply(void 0, t);
      throw new Error("Worker module function was called but `init` did not return a callable function");
    });
  };
  return e._getInitResult = function() {
    var t = s.dependencies, r = s.init;
    t = Array.isArray(t) ? t.map(function(i) {
      return i && (i = i.onMainThread || i, i._getInitResult && (i = i._getInitResult())), i;
    }) : [];
    var n = Promise.all(t).then(function(i) {
      return r.apply(null, i);
    });
    return e._getInitResult = function() {
      return n;
    }, n;
  }, e;
}
var ol = function() {
  var s = !1;
  if (typeof window < "u" && typeof window.document < "u")
    try {
      var e = new Worker(
        URL.createObjectURL(new Blob([""], { type: "application/javascript" }))
      );
      e.terminate(), s = !0;
    } catch (t) {
      typeof process < "u" && process.env.NODE_ENV === "test" || console.log(
        "Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: [" + t.message + "]"
      );
    }
  return ol = function() {
    return s;
  }, s;
}, ep = 0, tp = 0, Os = !1, Ki = /* @__PURE__ */ Object.create(null), Zi = /* @__PURE__ */ Object.create(null), Ws = /* @__PURE__ */ Object.create(null);
function Ri(s) {
  if ((!s || typeof s.init != "function") && !Os)
    throw new Error("requires `options.init` function");
  var e = s.dependencies, t = s.init, r = s.getTransferables, n = s.workerId, i = $d(s);
  n == null && (n = "#default");
  var o = "workerModule" + ++ep, a = s.name || o, l = null;
  e = e && e.map(function(u) {
    return typeof u == "function" && !u.workerModuleData && (Os = !0, u = Ri({
      workerId: n,
      name: "<" + a + "> function dependency: " + u.name,
      init: `function(){return (
` + Hr(u) + `
)}`
    }), Os = !1), u && u.workerModuleData && (u = u.workerModuleData), u;
  });
  function c() {
    for (var u = [], f = arguments.length; f--; ) u[f] = arguments[f];
    if (!ol())
      return i.apply(void 0, u);
    if (!l) {
      l = mo(n, "registerModule", c.workerModuleData);
      var h = function() {
        l = null, Zi[n].delete(h);
      };
      (Zi[n] || (Zi[n] = /* @__PURE__ */ new Set())).add(h);
    }
    return l.then(function(d) {
      var _ = d.isCallable;
      if (_)
        return mo(n, "callModule", { id: o, args: u });
      throw new Error("Worker module function was called but `init` did not return a callable function");
    });
  }
  return c.workerModuleData = {
    isWorkerModule: !0,
    id: o,
    name: a,
    dependencies: e,
    init: Hr(t),
    getTransferables: r && Hr(r)
  }, c.onMainThread = i, c;
}
function np(s) {
  Zi[s] && Zi[s].forEach(function(e) {
    e();
  }), Ki[s] && (Ki[s].terminate(), delete Ki[s]);
}
function Hr(s) {
  var e = s.toString();
  return !/^function/.test(e) && /^\w+\s*\(/.test(e) && (e = "function " + e), e;
}
function ip(s) {
  var e = Ki[s];
  if (!e) {
    var t = Hr(Qd);
    e = Ki[s] = new Worker(
      URL.createObjectURL(
        new Blob(
          ["/** Worker Module Bootstrap: " + s.replace(/\*/g, "") + ` **/

;(` + t + ")()"],
          { type: "application/javascript" }
        )
      )
    ), e.onmessage = function(r) {
      var n = r.data, i = n.messageId, o = Ws[i];
      if (!o)
        throw new Error("WorkerModule response with empty or unknown messageId");
      delete Ws[i], o(n);
    };
  }
  return e;
}
function mo(s, e, t) {
  return new Promise(function(r, n) {
    var i = ++tp;
    Ws[i] = function(o) {
      o.success ? r(o.result) : n(new Error("Error in worker " + e + " call: " + o.error));
    }, ip(s).postMessage({
      messageId: i,
      action: e,
      data: t
    });
  });
}
function ll() {
  var s = function(e) {
    function t(G, X, U, V, K, I, B, Q) {
      var ee = 1 - B;
      Q.x = ee * ee * G + 2 * ee * B * U + B * B * K, Q.y = ee * ee * X + 2 * ee * B * V + B * B * I;
    }
    function r(G, X, U, V, K, I, B, Q, ee, q) {
      var te = 1 - ee;
      q.x = te * te * te * G + 3 * te * te * ee * U + 3 * te * ee * ee * K + ee * ee * ee * B, q.y = te * te * te * X + 3 * te * te * ee * V + 3 * te * ee * ee * I + ee * ee * ee * Q;
    }
    function n(G, X) {
      for (var U = /([MLQCZ])([^MLQCZ]*)/g, V, K, I, B, Q; V = U.exec(G); ) {
        var ee = V[2].replace(/^\s*|\s*$/g, "").split(/[,\s]+/).map(function(q) {
          return parseFloat(q);
        });
        switch (V[1]) {
          case "M":
            B = K = ee[0], Q = I = ee[1];
            break;
          case "L":
            (ee[0] !== B || ee[1] !== Q) && X("L", B, Q, B = ee[0], Q = ee[1]);
            break;
          case "Q": {
            X("Q", B, Q, B = ee[2], Q = ee[3], ee[0], ee[1]);
            break;
          }
          case "C": {
            X("C", B, Q, B = ee[4], Q = ee[5], ee[0], ee[1], ee[2], ee[3]);
            break;
          }
          case "Z":
            (B !== K || Q !== I) && X("L", B, Q, K, I);
            break;
        }
      }
    }
    function i(G, X, U) {
      U === void 0 && (U = 16);
      var V = { x: 0, y: 0 };
      n(G, function(K, I, B, Q, ee, q, te, de, le) {
        switch (K) {
          case "L":
            X(I, B, Q, ee);
            break;
          case "Q": {
            for (var F = I, Ue = B, _e = 1; _e < U; _e++)
              t(
                I,
                B,
                q,
                te,
                Q,
                ee,
                _e / (U - 1),
                V
              ), X(F, Ue, V.x, V.y), F = V.x, Ue = V.y;
            break;
          }
          case "C": {
            for (var pe = I, ue = B, Me = 1; Me < U; Me++)
              r(
                I,
                B,
                q,
                te,
                de,
                le,
                Q,
                ee,
                Me / (U - 1),
                V
              ), X(pe, ue, V.x, V.y), pe = V.x, ue = V.y;
            break;
          }
        }
      });
    }
    var o = "precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}", a = "precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}", l = /* @__PURE__ */ new WeakMap(), c = {
      premultipliedAlpha: !1,
      preserveDrawingBuffer: !0,
      antialias: !1,
      depth: !1
    };
    function u(G, X) {
      var U = G.getContext ? G.getContext("webgl", c) : G, V = l.get(U);
      if (!V) {
        let te = function(pe) {
          var ue = I[pe];
          if (!ue && (ue = I[pe] = U.getExtension(pe), !ue))
            throw new Error(pe + " not supported");
          return ue;
        }, de = function(pe, ue) {
          var Me = U.createShader(ue);
          return U.shaderSource(Me, pe), U.compileShader(Me), Me;
        }, le = function(pe, ue, Me, ce) {
          if (!B[pe]) {
            var ve = {}, we = {}, E = U.createProgram();
            U.attachShader(E, de(ue, U.VERTEX_SHADER)), U.attachShader(E, de(Me, U.FRAGMENT_SHADER)), U.linkProgram(E), B[pe] = {
              program: E,
              transaction: function(N) {
                U.useProgram(E), N({
                  setUniform: function($, oe) {
                    for (var Se = [], ye = arguments.length - 2; ye-- > 0; ) Se[ye] = arguments[ye + 2];
                    var se = we[oe] || (we[oe] = U.getUniformLocation(E, oe));
                    U["uniform" + $].apply(U, [se].concat(Se));
                  },
                  setAttribute: function($, oe, Se, ye, se) {
                    var he = ve[$];
                    he || (he = ve[$] = {
                      buf: U.createBuffer(),
                      // TODO should we destroy our buffers?
                      loc: U.getAttribLocation(E, $),
                      data: null
                    }), U.bindBuffer(U.ARRAY_BUFFER, he.buf), U.vertexAttribPointer(he.loc, oe, U.FLOAT, !1, 0, 0), U.enableVertexAttribArray(he.loc), K ? U.vertexAttribDivisor(he.loc, ye) : te("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(he.loc, ye), se !== he.data && (U.bufferData(U.ARRAY_BUFFER, se, Se), he.data = se);
                  }
                });
              }
            };
          }
          B[pe].transaction(ce);
        }, F = function(pe, ue) {
          ee++;
          try {
            U.activeTexture(U.TEXTURE0 + ee);
            var Me = Q[pe];
            Me || (Me = Q[pe] = U.createTexture(), U.bindTexture(U.TEXTURE_2D, Me), U.texParameteri(U.TEXTURE_2D, U.TEXTURE_MIN_FILTER, U.NEAREST), U.texParameteri(U.TEXTURE_2D, U.TEXTURE_MAG_FILTER, U.NEAREST)), U.bindTexture(U.TEXTURE_2D, Me), ue(Me, ee);
          } finally {
            ee--;
          }
        }, Ue = function(pe, ue, Me) {
          var ce = U.createFramebuffer();
          q.push(ce), U.bindFramebuffer(U.FRAMEBUFFER, ce), U.activeTexture(U.TEXTURE0 + ue), U.bindTexture(U.TEXTURE_2D, pe), U.framebufferTexture2D(U.FRAMEBUFFER, U.COLOR_ATTACHMENT0, U.TEXTURE_2D, pe, 0);
          try {
            Me(ce);
          } finally {
            U.deleteFramebuffer(ce), U.bindFramebuffer(U.FRAMEBUFFER, q[--q.length - 1] || null);
          }
        }, _e = function() {
          I = {}, B = {}, Q = {}, ee = -1, q.length = 0;
        };
        var K = typeof WebGL2RenderingContext < "u" && U instanceof WebGL2RenderingContext, I = {}, B = {}, Q = {}, ee = -1, q = [];
        U.canvas.addEventListener("webglcontextlost", function(pe) {
          _e(), pe.preventDefault();
        }, !1), l.set(U, V = {
          gl: U,
          isWebGL2: K,
          getExtension: te,
          withProgram: le,
          withTexture: F,
          withTextureFramebuffer: Ue,
          handleContextLoss: _e
        });
      }
      X(V);
    }
    function f(G, X, U, V, K, I, B, Q) {
      B === void 0 && (B = 15), Q === void 0 && (Q = null), u(G, function(ee) {
        var q = ee.gl, te = ee.withProgram, de = ee.withTexture;
        de("copy", function(le, F) {
          q.texImage2D(q.TEXTURE_2D, 0, q.RGBA, K, I, 0, q.RGBA, q.UNSIGNED_BYTE, X), te("copy", o, a, function(Ue) {
            var _e = Ue.setUniform, pe = Ue.setAttribute;
            pe("aUV", 2, q.STATIC_DRAW, 0, new Float32Array([0, 0, 2, 0, 0, 2])), _e("1i", "image", F), q.bindFramebuffer(q.FRAMEBUFFER, Q || null), q.disable(q.BLEND), q.colorMask(B & 8, B & 4, B & 2, B & 1), q.viewport(U, V, K, I), q.scissor(U, V, K, I), q.drawArrays(q.TRIANGLES, 0, 3);
          });
        });
      });
    }
    function h(G, X, U) {
      var V = G.width, K = G.height;
      u(G, function(I) {
        var B = I.gl, Q = new Uint8Array(V * K * 4);
        B.readPixels(0, 0, V, K, B.RGBA, B.UNSIGNED_BYTE, Q), G.width = X, G.height = U, f(B, Q, 0, 0, V, K);
      });
    }
    var d = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      withWebGLContext: u,
      renderImageData: f,
      resizeWebGLCanvasWithoutClearing: h
    });
    function _(G, X, U, V, K, I) {
      I === void 0 && (I = 1);
      var B = new Uint8Array(G * X), Q = V[2] - V[0], ee = V[3] - V[1], q = [];
      i(U, function(pe, ue, Me, ce) {
        q.push({
          x1: pe,
          y1: ue,
          x2: Me,
          y2: ce,
          minX: Math.min(pe, Me),
          minY: Math.min(ue, ce),
          maxX: Math.max(pe, Me),
          maxY: Math.max(ue, ce)
        });
      }), q.sort(function(pe, ue) {
        return pe.maxX - ue.maxX;
      });
      for (var te = 0; te < G; te++)
        for (var de = 0; de < X; de++) {
          var le = Ue(
            V[0] + Q * (te + 0.5) / G,
            V[1] + ee * (de + 0.5) / X
          ), F = Math.pow(1 - Math.abs(le) / K, I) / 2;
          le < 0 && (F = 1 - F), F = Math.max(0, Math.min(255, Math.round(F * 255))), B[de * G + te] = F;
        }
      return B;
      function Ue(pe, ue) {
        for (var Me = 1 / 0, ce = 1 / 0, ve = q.length; ve--; ) {
          var we = q[ve];
          if (we.maxX + ce <= pe)
            break;
          if (pe + ce > we.minX && ue - ce < we.maxY && ue + ce > we.minY) {
            var E = m(pe, ue, we.x1, we.y1, we.x2, we.y2);
            E < Me && (Me = E, ce = Math.sqrt(Me));
          }
        }
        return _e(pe, ue) && (ce = -ce), ce;
      }
      function _e(pe, ue) {
        for (var Me = 0, ce = q.length; ce--; ) {
          var ve = q[ce];
          if (ve.maxX <= pe)
            break;
          var we = ve.y1 > ue != ve.y2 > ue && pe < (ve.x2 - ve.x1) * (ue - ve.y1) / (ve.y2 - ve.y1) + ve.x1;
          we && (Me += ve.y1 < ve.y2 ? 1 : -1);
        }
        return Me !== 0;
      }
    }
    function v(G, X, U, V, K, I, B, Q, ee, q) {
      I === void 0 && (I = 1), Q === void 0 && (Q = 0), ee === void 0 && (ee = 0), q === void 0 && (q = 0), p(G, X, U, V, K, I, B, null, Q, ee, q);
    }
    function p(G, X, U, V, K, I, B, Q, ee, q, te) {
      I === void 0 && (I = 1), ee === void 0 && (ee = 0), q === void 0 && (q = 0), te === void 0 && (te = 0);
      for (var de = _(G, X, U, V, K, I), le = new Uint8Array(de.length * 4), F = 0; F < de.length; F++)
        le[F * 4 + te] = de[F];
      f(B, le, ee, q, G, X, 1 << 3 - te, Q);
    }
    function m(G, X, U, V, K, I) {
      var B = K - U, Q = I - V, ee = B * B + Q * Q, q = ee ? Math.max(0, Math.min(1, ((G - U) * B + (X - V) * Q) / ee)) : 0, te = G - (U + q * B), de = X - (V + q * Q);
      return te * te + de * de;
    }
    var y = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      generate: _,
      generateIntoCanvas: v,
      generateIntoFramebuffer: p
    }), g = "precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}", A = "precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}", w = "precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}", T = new Float32Array([0, 0, 2, 0, 0, 2]), S = null, C = !1, z = {}, x = /* @__PURE__ */ new WeakMap();
    function R(G) {
      if (!C && !W(G))
        throw new Error("WebGL generation not supported");
    }
    function L(G, X, U, V, K, I, B) {
      if (I === void 0 && (I = 1), B === void 0 && (B = null), !B && (B = S, !B)) {
        var Q = typeof OffscreenCanvas == "function" ? new OffscreenCanvas(1, 1) : typeof document < "u" ? document.createElement("canvas") : null;
        if (!Q)
          throw new Error("OffscreenCanvas or DOM canvas not supported");
        B = S = Q.getContext("webgl", { depth: !1 });
      }
      R(B);
      var ee = new Uint8Array(G * X * 4);
      u(B, function(le) {
        var F = le.gl, Ue = le.withTexture, _e = le.withTextureFramebuffer;
        Ue("readable", function(pe, ue) {
          F.texImage2D(F.TEXTURE_2D, 0, F.RGBA, G, X, 0, F.RGBA, F.UNSIGNED_BYTE, null), _e(pe, ue, function(Me) {
            P(
              G,
              X,
              U,
              V,
              K,
              I,
              F,
              Me,
              0,
              0,
              0
              // red channel
            ), F.readPixels(0, 0, G, X, F.RGBA, F.UNSIGNED_BYTE, ee);
          });
        });
      });
      for (var q = new Uint8Array(G * X), te = 0, de = 0; te < ee.length; te += 4)
        q[de++] = ee[te];
      return q;
    }
    function k(G, X, U, V, K, I, B, Q, ee, q) {
      I === void 0 && (I = 1), Q === void 0 && (Q = 0), ee === void 0 && (ee = 0), q === void 0 && (q = 0), P(G, X, U, V, K, I, B, null, Q, ee, q);
    }
    function P(G, X, U, V, K, I, B, Q, ee, q, te) {
      I === void 0 && (I = 1), ee === void 0 && (ee = 0), q === void 0 && (q = 0), te === void 0 && (te = 0), R(B);
      var de = [];
      i(U, function(le, F, Ue, _e) {
        de.push(le, F, Ue, _e);
      }), de = new Float32Array(de), u(B, function(le) {
        var F = le.gl, Ue = le.isWebGL2, _e = le.getExtension, pe = le.withProgram, ue = le.withTexture, Me = le.withTextureFramebuffer, ce = le.handleContextLoss;
        if (ue("rawDistances", function(ve, we) {
          (G !== ve._lastWidth || X !== ve._lastHeight) && F.texImage2D(
            F.TEXTURE_2D,
            0,
            F.RGBA,
            ve._lastWidth = G,
            ve._lastHeight = X,
            0,
            F.RGBA,
            F.UNSIGNED_BYTE,
            null
          ), pe("main", g, A, function(E) {
            var M = E.setAttribute, N = E.setUniform, Z = !Ue && _e("ANGLE_instanced_arrays"), $ = !Ue && _e("EXT_blend_minmax");
            M("aUV", 2, F.STATIC_DRAW, 0, T), M("aLineSegment", 4, F.DYNAMIC_DRAW, 1, de), N.apply(void 0, ["4f", "uGlyphBounds"].concat(V)), N("1f", "uMaxDistance", K), N("1f", "uExponent", I), Me(ve, we, function(oe) {
              F.enable(F.BLEND), F.colorMask(!0, !0, !0, !0), F.viewport(0, 0, G, X), F.scissor(0, 0, G, X), F.blendFunc(F.ONE, F.ONE), F.blendEquationSeparate(F.FUNC_ADD, Ue ? F.MAX : $.MAX_EXT), F.clear(F.COLOR_BUFFER_BIT), Ue ? F.drawArraysInstanced(F.TRIANGLES, 0, 3, de.length / 4) : Z.drawArraysInstancedANGLE(F.TRIANGLES, 0, 3, de.length / 4);
            });
          }), pe("post", o, w, function(E) {
            E.setAttribute("aUV", 2, F.STATIC_DRAW, 0, T), E.setUniform("1i", "tex", we), F.bindFramebuffer(F.FRAMEBUFFER, Q), F.disable(F.BLEND), F.colorMask(te === 0, te === 1, te === 2, te === 3), F.viewport(ee, q, G, X), F.scissor(ee, q, G, X), F.drawArrays(F.TRIANGLES, 0, 3);
          });
        }), F.isContextLost())
          throw ce(), new Error("webgl context lost");
      });
    }
    function W(G) {
      var X = !G || G === S ? z : G.canvas || G, U = x.get(X);
      if (U === void 0) {
        C = !0;
        var V = null;
        try {
          var K = [
            97,
            106,
            97,
            61,
            99,
            137,
            118,
            80,
            80,
            118,
            137,
            99,
            61,
            97,
            106,
            97
          ], I = L(
            4,
            4,
            "M8,8L16,8L24,24L16,24Z",
            [0, 0, 32, 32],
            24,
            1,
            G
          );
          U = I && K.length === I.length && I.every(function(B, Q) {
            return B === K[Q];
          }), U || (V = "bad trial run results", console.info(K, I));
        } catch (B) {
          U = !1, V = B.message;
        }
        V && console.warn("WebGL SDF generation not supported:", V), C = !1, x.set(X, U);
      }
      return U;
    }
    var O = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      generate: L,
      generateIntoCanvas: k,
      generateIntoFramebuffer: P,
      isSupported: W
    });
    function Y(G, X, U, V, K, I) {
      K === void 0 && (K = Math.max(V[2] - V[0], V[3] - V[1]) / 2), I === void 0 && (I = 1);
      try {
        return L.apply(O, arguments);
      } catch (B) {
        return console.info("WebGL SDF generation failed, falling back to JS", B), _.apply(y, arguments);
      }
    }
    function b(G, X, U, V, K, I, B, Q, ee, q) {
      K === void 0 && (K = Math.max(V[2] - V[0], V[3] - V[1]) / 2), I === void 0 && (I = 1), Q === void 0 && (Q = 0), ee === void 0 && (ee = 0), q === void 0 && (q = 0);
      try {
        return k.apply(O, arguments);
      } catch (te) {
        return console.info("WebGL SDF generation failed, falling back to JS", te), v.apply(y, arguments);
      }
    }
    return e.forEachPathCommand = n, e.generate = Y, e.generateIntoCanvas = b, e.javascript = y, e.pathToLineSegments = i, e.webgl = O, e.webglUtils = d, Object.defineProperty(e, "__esModule", { value: !0 }), e;
  }({});
  return s;
}
function rp() {
  var s = function(e) {
    var t = {
      R: "13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",
      EN: "1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",
      ES: "17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",
      ET: "z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",
      AN: "16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",
      CS: "18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",
      B: "a,3,f+2,2v,690",
      S: "9,2,k",
      WS: "c,k,4f4,1vk+a,u,1j,335",
      ON: "x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",
      BN: "0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",
      NSM: "lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",
      AL: "16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",
      LRO: "6ct",
      RLO: "6cu",
      LRE: "6cq",
      RLE: "6cr",
      PDF: "6cs",
      LRI: "6ee",
      RLI: "6ef",
      FSI: "6eg",
      PDI: "6eh"
    }, r = {}, n = {};
    r.L = 1, n[1] = "L", Object.keys(t).forEach(function(ce, ve) {
      r[ce] = 1 << ve + 1, n[r[ce]] = ce;
    }), Object.freeze(r);
    var i = r.LRI | r.RLI | r.FSI, o = r.L | r.R | r.AL, a = r.B | r.S | r.WS | r.ON | r.FSI | r.LRI | r.RLI | r.PDI, l = r.BN | r.RLE | r.LRE | r.RLO | r.LRO | r.PDF, c = r.S | r.WS | r.B | i | r.PDI | l, u = null;
    function f() {
      if (!u) {
        u = /* @__PURE__ */ new Map();
        var ce = function(we) {
          if (t.hasOwnProperty(we)) {
            var E = 0;
            t[we].split(",").forEach(function(M) {
              var N = M.split("+"), Z = N[0], $ = N[1];
              Z = parseInt(Z, 36), $ = $ ? parseInt($, 36) : 0, u.set(E += Z, r[we]);
              for (var oe = 0; oe < $; oe++)
                u.set(++E, r[we]);
            });
          }
        };
        for (var ve in t) ce(ve);
      }
    }
    function h(ce) {
      return f(), u.get(ce.codePointAt(0)) || r.L;
    }
    function d(ce) {
      return n[h(ce)];
    }
    var _ = {
      pairs: "14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",
      canonical: "6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"
    };
    function v(ce, ve) {
      var we = 36, E = 0, M = /* @__PURE__ */ new Map(), N = ve && /* @__PURE__ */ new Map(), Z;
      return ce.split(",").forEach(function $(oe) {
        if (oe.indexOf("+") !== -1)
          for (var Se = +oe; Se--; )
            $(Z);
        else {
          Z = oe;
          var ye = oe.split(">"), se = ye[0], he = ye[1];
          se = String.fromCodePoint(E += parseInt(se, we)), he = String.fromCodePoint(E += parseInt(he, we)), M.set(se, he), ve && N.set(he, se);
        }
      }), { map: M, reverseMap: N };
    }
    var p, m, y;
    function g() {
      if (!p) {
        var ce = v(_.pairs, !0), ve = ce.map, we = ce.reverseMap;
        p = ve, m = we, y = v(_.canonical, !1).map;
      }
    }
    function A(ce) {
      return g(), p.get(ce) || null;
    }
    function w(ce) {
      return g(), m.get(ce) || null;
    }
    function T(ce) {
      return g(), y.get(ce) || null;
    }
    var S = r.L, C = r.R, z = r.EN, x = r.ES, R = r.ET, L = r.AN, k = r.CS, P = r.B, W = r.S, O = r.ON, Y = r.BN, b = r.NSM, G = r.AL, X = r.LRO, U = r.RLO, V = r.LRE, K = r.RLE, I = r.PDF, B = r.LRI, Q = r.RLI, ee = r.FSI, q = r.PDI;
    function te(ce, ve) {
      for (var we = 125, E = new Uint32Array(ce.length), M = 0; M < ce.length; M++)
        E[M] = h(ce[M]);
      var N = /* @__PURE__ */ new Map();
      function Z(Nt, tn) {
        var Ot = E[Nt];
        E[Nt] = tn, N.set(Ot, N.get(Ot) - 1), Ot & a && N.set(a, N.get(a) - 1), N.set(tn, (N.get(tn) || 0) + 1), tn & a && N.set(a, (N.get(a) || 0) + 1);
      }
      for (var $ = new Uint8Array(ce.length), oe = /* @__PURE__ */ new Map(), Se = [], ye = null, se = 0; se < ce.length; se++)
        ye || Se.push(ye = {
          start: se,
          end: ce.length - 1,
          // 3.3.1 P2-P3: Determine the paragraph level
          level: ve === "rtl" ? 1 : ve === "ltr" ? 0 : _a(se, !1)
        }), E[se] & P && (ye.end = se, ye = null);
      for (var he = K | V | U | X | i | q | I | P, Ne = function(Nt) {
        return Nt + (Nt & 1 ? 1 : 2);
      }, ge = function(Nt) {
        return Nt + (Nt & 1 ? 2 : 1);
      }, Be = 0; Be < Se.length; Be++) {
        ye = Se[Be];
        var Pe = [{
          _level: ye.level,
          _override: 0,
          //0=neutral, 1=L, 2=R
          _isolate: 0
          //bool
        }], xe = void 0, Ae = 0, Ce = 0, ke = 0;
        N.clear();
        for (var Ie = ye.start; Ie <= ye.end; Ie++) {
          var Le = E[Ie];
          if (xe = Pe[Pe.length - 1], N.set(Le, (N.get(Le) || 0) + 1), Le & a && N.set(a, (N.get(a) || 0) + 1), Le & he)
            if (Le & (K | V)) {
              $[Ie] = xe._level;
              var H = (Le === K ? ge : Ne)(xe._level);
              H <= we && !Ae && !Ce ? Pe.push({
                _level: H,
                _override: 0,
                _isolate: 0
              }) : Ae || Ce++;
            } else if (Le & (U | X)) {
              $[Ie] = xe._level;
              var Ee = (Le === U ? ge : Ne)(xe._level);
              Ee <= we && !Ae && !Ce ? Pe.push({
                _level: Ee,
                _override: Le & U ? C : S,
                _isolate: 0
              }) : Ae || Ce++;
            } else if (Le & i) {
              Le & ee && (Le = _a(Ie + 1, !0) === 1 ? Q : B), $[Ie] = xe._level, xe._override && Z(Ie, xe._override);
              var j = (Le === Q ? ge : Ne)(xe._level);
              j <= we && Ae === 0 && Ce === 0 ? (ke++, Pe.push({
                _level: j,
                _override: 0,
                _isolate: 1,
                _isolInitIndex: Ie
              })) : Ae++;
            } else if (Le & q) {
              if (Ae > 0)
                Ae--;
              else if (ke > 0) {
                for (Ce = 0; !Pe[Pe.length - 1]._isolate; )
                  Pe.pop();
                var fe = Pe[Pe.length - 1]._isolInitIndex;
                fe != null && (oe.set(fe, Ie), oe.set(Ie, fe)), Pe.pop(), ke--;
              }
              xe = Pe[Pe.length - 1], $[Ie] = xe._level, xe._override && Z(Ie, xe._override);
            } else Le & I ? (Ae === 0 && (Ce > 0 ? Ce-- : !xe._isolate && Pe.length > 1 && (Pe.pop(), xe = Pe[Pe.length - 1])), $[Ie] = xe._level) : Le & P && ($[Ie] = ye.level);
          else
            $[Ie] = xe._level, xe._override && Le !== Y && Z(Ie, xe._override);
        }
        for (var Te = [], ze = null, Oe = ye.start; Oe <= ye.end; Oe++) {
          var Ke = E[Oe];
          if (!(Ke & l)) {
            var it = $[Oe], Ye = Ke & i, et = Ke === q;
            ze && it === ze._level ? (ze._end = Oe, ze._endsWithIsolInit = Ye) : Te.push(ze = {
              _start: Oe,
              _end: Oe,
              _level: it,
              _startsWithPDI: et,
              _endsWithIsolInit: Ye
            });
          }
        }
        for (var dt = [], Kt = 0; Kt < Te.length; Kt++) {
          var Zt = Te[Kt];
          if (!Zt._startsWithPDI || Zt._startsWithPDI && !oe.has(Zt._start)) {
            for (var Gt = [ze = Zt], ln = void 0; ze && ze._endsWithIsolInit && (ln = oe.get(ze._end)) != null; )
              for (var Lt = Kt + 1; Lt < Te.length; Lt++)
                if (Te[Lt]._start === ln) {
                  Gt.push(ze = Te[Lt]);
                  break;
                }
            for (var bt = [], cn = 0; cn < Gt.length; cn++)
              for (var ar = Gt[cn], Pi = ar._start; Pi <= ar._end; Pi++)
                bt.push(Pi);
            for (var Qr = $[bt[0]], D = ye.level, J = bt[0] - 1; J >= 0; J--)
              if (!(E[J] & l)) {
                D = $[J];
                break;
              }
            var re = bt[bt.length - 1], ae = $[re], ie = ye.level;
            if (!(E[re] & i)) {
              for (var Fe = re + 1; Fe <= ye.end; Fe++)
                if (!(E[Fe] & l)) {
                  ie = $[Fe];
                  break;
                }
            }
            dt.push({
              _seqIndices: bt,
              _sosType: Math.max(D, Qr) % 2 ? C : S,
              _eosType: Math.max(ie, ae) % 2 ? C : S
            });
          }
        }
        for (var Ge = 0; Ge < dt.length; Ge++) {
          var He = dt[Ge], be = He._seqIndices, We = He._sosType, Xe = He._eosType, Ve = $[be[0]] & 1 ? C : S;
          if (N.get(b))
            for (var ot = 0; ot < be.length; ot++) {
              var Et = be[ot];
              if (E[Et] & b) {
                for (var pt = We, Ft = ot - 1; Ft >= 0; Ft--)
                  if (!(E[be[Ft]] & l)) {
                    pt = E[be[Ft]];
                    break;
                  }
                Z(Et, pt & (i | q) ? O : pt);
              }
            }
          if (N.get(z))
            for (var rt = 0; rt < be.length; rt++) {
              var je = be[rt];
              if (E[je] & z)
                for (var bn = rt - 1; bn >= -1; bn--) {
                  var at = bn === -1 ? We : E[be[bn]];
                  if (at & o) {
                    at === G && Z(je, L);
                    break;
                  }
                }
            }
          if (N.get(G))
            for (var Jt = 0; Jt < be.length; Jt++) {
              var Di = be[Jt];
              E[Di] & G && Z(Di, C);
            }
          if (N.get(x) || N.get(k))
            for (var Qt = 1; Qt < be.length - 1; Qt++) {
              var Ln = be[Qt];
              if (E[Ln] & (x | k)) {
                for (var ht = 0, $t = 0, Fn = Qt - 1; Fn >= 0 && (ht = E[be[Fn]], !!(ht & l)); Fn--)
                  ;
                for (var wt = Qt + 1; wt < be.length && ($t = E[be[wt]], !!($t & l)); wt++)
                  ;
                ht === $t && (E[Ln] === x ? ht === z : ht & (z | L)) && Z(Ln, ht);
              }
            }
          if (N.get(z))
            for (var It = 0; It < be.length; It++) {
              var $r = be[It];
              if (E[$r] & z) {
                for (var In = It - 1; In >= 0 && E[be[In]] & (R | l); In--)
                  Z(be[In], z);
                for (It++; It < be.length && E[be[It]] & (R | l | z); It++)
                  E[be[It]] !== z && Z(be[It], z);
              }
            }
          if (N.get(R) || N.get(x) || N.get(k))
            for (var Ui = 0; Ui < be.length; Ui++) {
              var ia = be[Ui];
              if (E[ia] & (R | x | k)) {
                Z(ia, O);
                for (var or = Ui - 1; or >= 0 && E[be[or]] & l; or--)
                  Z(be[or], O);
                for (var lr = Ui + 1; lr < be.length && E[be[lr]] & l; lr++)
                  Z(be[lr], O);
              }
            }
          if (N.get(z))
            for (var es = 0, ra = We; es < be.length; es++) {
              var sa = be[es], ts = E[sa];
              ts & z ? ra === S && Z(sa, S) : ts & o && (ra = ts);
            }
          if (N.get(a)) {
            var Li = C | z | L, aa = Li | S, cr = [];
            {
              for (var $n = [], ei = 0; ei < be.length; ei++)
                if (E[be[ei]] & a) {
                  var Fi = ce[be[ei]], oa = void 0;
                  if (A(Fi) !== null)
                    if ($n.length < 63)
                      $n.push({ char: Fi, seqIndex: ei });
                    else
                      break;
                  else if ((oa = w(Fi)) !== null)
                    for (var Ii = $n.length - 1; Ii >= 0; Ii--) {
                      var ns = $n[Ii].char;
                      if (ns === oa || ns === w(T(Fi)) || A(T(ns)) === Fi) {
                        cr.push([$n[Ii].seqIndex, ei]), $n.length = Ii;
                        break;
                      }
                    }
                }
              cr.sort(function(Nt, tn) {
                return Nt[0] - tn[0];
              });
            }
            for (var is = 0; is < cr.length; is++) {
              for (var la = cr[is], ur = la[0], rs = la[1], ca = !1, en = 0, ss = ur + 1; ss < rs; ss++) {
                var ua = be[ss];
                if (E[ua] & aa) {
                  ca = !0;
                  var fa = E[ua] & Li ? C : S;
                  if (fa === Ve) {
                    en = fa;
                    break;
                  }
                }
              }
              if (ca && !en) {
                en = We;
                for (var as = ur - 1; as >= 0; as--) {
                  var ha = be[as];
                  if (E[ha] & aa) {
                    var da = E[ha] & Li ? C : S;
                    da !== Ve ? en = da : en = Ve;
                    break;
                  }
                }
              }
              if (en) {
                if (E[be[ur]] = E[be[rs]] = en, en !== Ve) {
                  for (var Ni = ur + 1; Ni < be.length; Ni++)
                    if (!(E[be[Ni]] & l)) {
                      h(ce[be[Ni]]) & b && (E[be[Ni]] = en);
                      break;
                    }
                }
                if (en !== Ve) {
                  for (var Oi = rs + 1; Oi < be.length; Oi++)
                    if (!(E[be[Oi]] & l)) {
                      h(ce[be[Oi]]) & b && (E[be[Oi]] = en);
                      break;
                    }
                }
              }
            }
            for (var Sn = 0; Sn < be.length; Sn++)
              if (E[be[Sn]] & a) {
                for (var pa = Sn, os = Sn, ls = We, Bi = Sn - 1; Bi >= 0; Bi--)
                  if (E[be[Bi]] & l)
                    pa = Bi;
                  else {
                    ls = E[be[Bi]] & Li ? C : S;
                    break;
                  }
                for (var ma = Xe, zi = Sn + 1; zi < be.length; zi++)
                  if (E[be[zi]] & (a | l))
                    os = zi;
                  else {
                    ma = E[be[zi]] & Li ? C : S;
                    break;
                  }
                for (var cs = pa; cs <= os; cs++)
                  E[be[cs]] = ls === ma ? ls : Ve;
                Sn = os;
              }
          }
        }
        for (var kt = ye.start; kt <= ye.end; kt++) {
          var vl = $[kt], fr = E[kt];
          if (vl & 1 ? fr & (S | z | L) && $[kt]++ : fr & C ? $[kt]++ : fr & (L | z) && ($[kt] += 2), fr & l && ($[kt] = kt === 0 ? ye.level : $[kt - 1]), kt === ye.end || h(ce[kt]) & (W | P))
            for (var hr = kt; hr >= 0 && h(ce[hr]) & c; hr--)
              $[hr] = ye.level;
        }
      }
      return {
        levels: $,
        paragraphs: Se
      };
      function _a(Nt, tn) {
        for (var Ot = Nt; Ot < ce.length; Ot++) {
          var Mn = E[Ot];
          if (Mn & (C | G))
            return 1;
          if (Mn & (P | S) || tn && Mn === q)
            return 0;
          if (Mn & i) {
            var va = gl(Ot);
            Ot = va === -1 ? ce.length : va;
          }
        }
        return 0;
      }
      function gl(Nt) {
        for (var tn = 1, Ot = Nt + 1; Ot < ce.length; Ot++) {
          var Mn = E[Ot];
          if (Mn & P)
            break;
          if (Mn & q) {
            if (--tn === 0)
              return Ot;
          } else Mn & i && tn++;
        }
        return -1;
      }
    }
    var de = "14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1", le;
    function F() {
      if (!le) {
        var ce = v(de, !0), ve = ce.map, we = ce.reverseMap;
        we.forEach(function(E, M) {
          ve.set(M, E);
        }), le = ve;
      }
    }
    function Ue(ce) {
      return F(), le.get(ce) || null;
    }
    function _e(ce, ve, we, E) {
      var M = ce.length;
      we = Math.max(0, we == null ? 0 : +we), E = Math.min(M - 1, E == null ? M - 1 : +E);
      for (var N = /* @__PURE__ */ new Map(), Z = we; Z <= E; Z++)
        if (ve[Z] & 1) {
          var $ = Ue(ce[Z]);
          $ !== null && N.set(Z, $);
        }
      return N;
    }
    function pe(ce, ve, we, E) {
      var M = ce.length;
      we = Math.max(0, we == null ? 0 : +we), E = Math.min(M - 1, E == null ? M - 1 : +E);
      var N = [];
      return ve.paragraphs.forEach(function(Z) {
        var $ = Math.max(we, Z.start), oe = Math.min(E, Z.end);
        if ($ < oe) {
          for (var Se = ve.levels.slice($, oe + 1), ye = oe; ye >= $ && h(ce[ye]) & c; ye--)
            Se[ye] = Z.level;
          for (var se = Z.level, he = 1 / 0, Ne = 0; Ne < Se.length; Ne++) {
            var ge = Se[Ne];
            ge > se && (se = ge), ge < he && (he = ge | 1);
          }
          for (var Be = se; Be >= he; Be--)
            for (var Pe = 0; Pe < Se.length; Pe++)
              if (Se[Pe] >= Be) {
                for (var xe = Pe; Pe + 1 < Se.length && Se[Pe + 1] >= Be; )
                  Pe++;
                Pe > xe && N.push([xe + $, Pe + $]);
              }
        }
      }), N;
    }
    function ue(ce, ve, we, E) {
      var M = Me(ce, ve, we, E), N = [].concat(ce);
      return M.forEach(function(Z, $) {
        N[$] = (ve.levels[Z] & 1 ? Ue(ce[Z]) : null) || ce[Z];
      }), N.join("");
    }
    function Me(ce, ve, we, E) {
      for (var M = pe(ce, ve, we, E), N = [], Z = 0; Z < ce.length; Z++)
        N[Z] = Z;
      return M.forEach(function($) {
        for (var oe = $[0], Se = $[1], ye = N.slice(oe, Se + 1), se = ye.length; se--; )
          N[Se - se] = ye[se];
      }), N;
    }
    return e.closingToOpeningBracket = w, e.getBidiCharType = h, e.getBidiCharTypeName = d, e.getCanonicalBracket = T, e.getEmbeddingLevels = te, e.getMirroredCharacter = Ue, e.getMirroredCharactersMap = _e, e.getReorderSegments = pe, e.getReorderedIndices = Me, e.getReorderedString = ue, e.openingToClosingBracket = A, Object.defineProperty(e, "__esModule", { value: !0 }), e;
  }({});
  return s;
}
const cl = /\bvoid\s+main\s*\(\s*\)\s*{/g;
function Xs(s) {
  const e = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function t(r, n) {
    let i = Qe[n];
    return i ? Xs(i) : r;
  }
  return s.replace(e, t);
}
const Mt = [];
for (let s = 0; s < 256; s++)
  Mt[s] = (s < 16 ? "0" : "") + s.toString(16);
function sp() {
  const s = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0;
  return (Mt[s & 255] + Mt[s >> 8 & 255] + Mt[s >> 16 & 255] + Mt[s >> 24 & 255] + "-" + Mt[e & 255] + Mt[e >> 8 & 255] + "-" + Mt[e >> 16 & 15 | 64] + Mt[e >> 24 & 255] + "-" + Mt[t & 63 | 128] + Mt[t >> 8 & 255] + "-" + Mt[t >> 16 & 255] + Mt[t >> 24 & 255] + Mt[r & 255] + Mt[r >> 8 & 255] + Mt[r >> 16 & 255] + Mt[r >> 24 & 255]).toUpperCase();
}
const Hn = Object.assign || function() {
  let s = arguments[0];
  for (let e = 1, t = arguments.length; e < t; e++) {
    let r = arguments[e];
    if (r)
      for (let n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (s[n] = r[n]);
  }
  return s;
}, ap = Date.now(), _o = /* @__PURE__ */ new WeakMap(), vo = /* @__PURE__ */ new Map();
let op = 1e10;
function qs(s, e) {
  const t = fp(e);
  let r = _o.get(s);
  if (r || _o.set(s, r = /* @__PURE__ */ Object.create(null)), r[t])
    return new r[t]();
  const n = `_onBeforeCompile${t}`, i = function(c, u) {
    s.onBeforeCompile.call(this, c, u);
    const f = this.customProgramCacheKey() + "|" + c.vertexShader + "|" + c.fragmentShader;
    let h = vo[f];
    if (!h) {
      const d = lp(this, c, e, t);
      h = vo[f] = d;
    }
    c.vertexShader = h.vertexShader, c.fragmentShader = h.fragmentShader, Hn(c.uniforms, this.uniforms), e.timeUniform && (c.uniforms[e.timeUniform] = {
      get value() {
        return Date.now() - ap;
      }
    }), this[n] && this[n](c);
  }, o = function() {
    return a(e.chained ? s : s.clone());
  }, a = function(c) {
    const u = Object.create(c, l);
    return Object.defineProperty(u, "baseMaterial", { value: s }), Object.defineProperty(u, "id", { value: op++ }), u.uuid = sp(), u.uniforms = Hn({}, c.uniforms, e.uniforms), u.defines = Hn({}, c.defines, e.defines), u.defines[`TROIKA_DERIVED_MATERIAL_${t}`] = "", u.extensions = Hn({}, c.extensions, e.extensions), u._listeners = void 0, u;
  }, l = {
    constructor: { value: o },
    isDerivedMaterial: { value: !0 },
    type: {
      get: () => s.type,
      set: (c) => {
        s.type = c;
      }
    },
    isDerivedFrom: {
      writable: !0,
      configurable: !0,
      value: function(c) {
        const u = this.baseMaterial;
        return c === u || u.isDerivedMaterial && u.isDerivedFrom(c) || !1;
      }
    },
    customProgramCacheKey: {
      writable: !0,
      configurable: !0,
      value: function() {
        return s.customProgramCacheKey() + "|" + t;
      }
    },
    onBeforeCompile: {
      get() {
        return i;
      },
      set(c) {
        this[n] = c;
      }
    },
    copy: {
      writable: !0,
      configurable: !0,
      value: function(c) {
        return s.copy.call(this, c), !s.isShaderMaterial && !s.isDerivedMaterial && (Hn(this.extensions, c.extensions), Hn(this.defines, c.defines), Hn(this.uniforms, $i.clone(c.uniforms))), this;
      }
    },
    clone: {
      writable: !0,
      configurable: !0,
      value: function() {
        const c = new s.constructor();
        return a(c).copy(this);
      }
    },
    /**
     * Utility to get a MeshDepthMaterial that will honor this derived material's vertex
     * transformations and discarded fragments.
     */
    getDepthMaterial: {
      writable: !0,
      configurable: !0,
      value: function() {
        let c = this._depthMaterial;
        return c || (c = this._depthMaterial = qs(
          s.isDerivedMaterial ? s.getDepthMaterial() : new tl({ depthPacking: 3201 }),
          e
        ), c.defines.IS_DEPTH_MATERIAL = "", c.uniforms = this.uniforms), c;
      }
    },
    /**
     * Utility to get a MeshDistanceMaterial that will honor this derived material's vertex
     * transformations and discarded fragments.
     */
    getDistanceMaterial: {
      writable: !0,
      configurable: !0,
      value: function() {
        let c = this._distanceMaterial;
        return c || (c = this._distanceMaterial = qs(
          s.isDerivedMaterial ? s.getDistanceMaterial() : new nl(),
          e
        ), c.defines.IS_DISTANCE_MATERIAL = "", c.uniforms = this.uniforms), c;
      }
    },
    dispose: {
      writable: !0,
      configurable: !0,
      value() {
        const { _depthMaterial: c, _distanceMaterial: u } = this;
        c && c.dispose(), u && u.dispose(), s.dispose.call(this);
      }
    }
  };
  return r[t] = o, new o();
}
function lp(s, { vertexShader: e, fragmentShader: t }, r, n) {
  let {
    vertexDefs: i,
    vertexMainIntro: o,
    vertexMainOutro: a,
    vertexTransform: l,
    fragmentDefs: c,
    fragmentMainIntro: u,
    fragmentMainOutro: f,
    fragmentColorTransform: h,
    customRewriter: d,
    timeUniform: _
  } = r;
  if (i = i || "", o = o || "", a = a || "", c = c || "", u = u || "", f = f || "", (l || d) && (e = Xs(e)), (h || d) && (t = t.replace(
    /^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,
    `
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`
  ), t = Xs(t)), d) {
    let v = d({ vertexShader: e, fragmentShader: t });
    e = v.vertexShader, t = v.fragmentShader;
  }
  if (h) {
    let v = [];
    t = t.replace(
      /^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,
      // [^]+? = non-greedy match of any chars including newlines
      (p) => (v.push(p), "")
    ), f = `${h}
${v.join(`
`)}
${f}`;
  }
  if (_) {
    const v = `
uniform float ${_};
`;
    i = v + i, c = v + c;
  }
  return l && (e = `vec3 troika_position_${n};
vec3 troika_normal_${n};
vec2 troika_uv_${n};
${e}
`, i = `${i}
void troikaVertexTransform${n}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${l}
}
`, o = `
troika_position_${n} = vec3(position);
troika_normal_${n} = vec3(normal);
troika_uv_${n} = vec2(uv);
troikaVertexTransform${n}(troika_position_${n}, troika_normal_${n}, troika_uv_${n});
${o}
`, e = e.replace(/\b(position|normal|uv)\b/g, (v, p, m, y) => /\battribute\s+vec[23]\s+$/.test(y.substr(0, m)) ? p : `troika_${p}_${n}`), s.map && s.map.channel > 0 || (e = e.replace(/\bMAP_UV\b/g, `troika_uv_${n}`))), e = go(e, n, i, o, a), t = go(t, n, c, u, f), {
    vertexShader: e,
    fragmentShader: t
  };
}
function go(s, e, t, r, n) {
  return (r || n || t) && (s = s.replace(
    cl,
    `
${t}
void troikaOrigMain${e}() {`
  ), s += `
void main() {
  ${r}
  troikaOrigMain${e}();
  ${n}
}`), s;
}
function cp(s, e) {
  return s === "uniforms" ? void 0 : typeof e == "function" ? e.toString() : e;
}
let up = 0;
const xo = /* @__PURE__ */ new Map();
function fp(s) {
  const e = JSON.stringify(s, cp);
  let t = xo.get(e);
  return t == null && xo.set(e, t = ++up), t;
}
/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/
function hp() {
  return typeof window > "u" && (self.window = self), function(s) {
    var e = { parse: function(n) {
      var i = e._bin, o = new Uint8Array(n);
      if (i.readASCII(o, 0, 4) == "ttcf") {
        var a = 4;
        i.readUshort(o, a), a += 2, i.readUshort(o, a), a += 2;
        var l = i.readUint(o, a);
        a += 4;
        for (var c = [], u = 0; u < l; u++) {
          var f = i.readUint(o, a);
          a += 4, c.push(e._readFont(o, f));
        }
        return c;
      }
      return [e._readFont(o, 0)];
    }, _readFont: function(n, i) {
      var o = e._bin, a = i;
      o.readFixed(n, i), i += 4;
      var l = o.readUshort(n, i);
      i += 2, o.readUshort(n, i), i += 2, o.readUshort(n, i), i += 2, o.readUshort(n, i), i += 2;
      for (var c = ["cmap", "head", "hhea", "maxp", "hmtx", "name", "OS/2", "post", "loca", "glyf", "kern", "CFF ", "GDEF", "GPOS", "GSUB", "SVG "], u = { _data: n, _offset: a }, f = {}, h = 0; h < l; h++) {
        var d = o.readASCII(n, i, 4);
        i += 4, o.readUint(n, i), i += 4;
        var _ = o.readUint(n, i);
        i += 4;
        var v = o.readUint(n, i);
        i += 4, f[d] = { offset: _, length: v };
      }
      for (h = 0; h < c.length; h++) {
        var p = c[h];
        f[p] && (u[p.trim()] = e[p.trim()].parse(n, f[p].offset, f[p].length, u));
      }
      return u;
    }, _tabOffset: function(n, i, o) {
      for (var a = e._bin, l = a.readUshort(n, o + 4), c = o + 12, u = 0; u < l; u++) {
        var f = a.readASCII(n, c, 4);
        c += 4, a.readUint(n, c), c += 4;
        var h = a.readUint(n, c);
        if (c += 4, a.readUint(n, c), c += 4, f == i) return h;
      }
      return 0;
    } };
    e._bin = { readFixed: function(n, i) {
      return (n[i] << 8 | n[i + 1]) + (n[i + 2] << 8 | n[i + 3]) / 65540;
    }, readF2dot14: function(n, i) {
      return e._bin.readShort(n, i) / 16384;
    }, readInt: function(n, i) {
      return e._bin._view(n).getInt32(i);
    }, readInt8: function(n, i) {
      return e._bin._view(n).getInt8(i);
    }, readShort: function(n, i) {
      return e._bin._view(n).getInt16(i);
    }, readUshort: function(n, i) {
      return e._bin._view(n).getUint16(i);
    }, readUshorts: function(n, i, o) {
      for (var a = [], l = 0; l < o; l++) a.push(e._bin.readUshort(n, i + 2 * l));
      return a;
    }, readUint: function(n, i) {
      return e._bin._view(n).getUint32(i);
    }, readUint64: function(n, i) {
      return 4294967296 * e._bin.readUint(n, i) + e._bin.readUint(n, i + 4);
    }, readASCII: function(n, i, o) {
      for (var a = "", l = 0; l < o; l++) a += String.fromCharCode(n[i + l]);
      return a;
    }, readUnicode: function(n, i, o) {
      for (var a = "", l = 0; l < o; l++) {
        var c = n[i++] << 8 | n[i++];
        a += String.fromCharCode(c);
      }
      return a;
    }, _tdec: typeof window < "u" && window.TextDecoder ? new window.TextDecoder() : null, readUTF8: function(n, i, o) {
      var a = e._bin._tdec;
      return a && i == 0 && o == n.length ? a.decode(n) : e._bin.readASCII(n, i, o);
    }, readBytes: function(n, i, o) {
      for (var a = [], l = 0; l < o; l++) a.push(n[i + l]);
      return a;
    }, readASCIIArray: function(n, i, o) {
      for (var a = [], l = 0; l < o; l++) a.push(String.fromCharCode(n[i + l]));
      return a;
    }, _view: function(n) {
      return n._dataView || (n._dataView = n.buffer ? new DataView(n.buffer, n.byteOffset, n.byteLength) : new DataView(new Uint8Array(n).buffer));
    } }, e._lctf = {}, e._lctf.parse = function(n, i, o, a, l) {
      var c = e._bin, u = {}, f = i;
      c.readFixed(n, i), i += 4;
      var h = c.readUshort(n, i);
      i += 2;
      var d = c.readUshort(n, i);
      i += 2;
      var _ = c.readUshort(n, i);
      return i += 2, u.scriptList = e._lctf.readScriptList(n, f + h), u.featureList = e._lctf.readFeatureList(n, f + d), u.lookupList = e._lctf.readLookupList(n, f + _, l), u;
    }, e._lctf.readLookupList = function(n, i, o) {
      var a = e._bin, l = i, c = [], u = a.readUshort(n, i);
      i += 2;
      for (var f = 0; f < u; f++) {
        var h = a.readUshort(n, i);
        i += 2;
        var d = e._lctf.readLookupTable(n, l + h, o);
        c.push(d);
      }
      return c;
    }, e._lctf.readLookupTable = function(n, i, o) {
      var a = e._bin, l = i, c = { tabs: [] };
      c.ltype = a.readUshort(n, i), i += 2, c.flag = a.readUshort(n, i), i += 2;
      var u = a.readUshort(n, i);
      i += 2;
      for (var f = c.ltype, h = 0; h < u; h++) {
        var d = a.readUshort(n, i);
        i += 2;
        var _ = o(n, f, l + d, c);
        c.tabs.push(_);
      }
      return c;
    }, e._lctf.numOfOnes = function(n) {
      for (var i = 0, o = 0; o < 32; o++) n >>> o & 1 && i++;
      return i;
    }, e._lctf.readClassDef = function(n, i) {
      var o = e._bin, a = [], l = o.readUshort(n, i);
      if (i += 2, l == 1) {
        var c = o.readUshort(n, i);
        i += 2;
        var u = o.readUshort(n, i);
        i += 2;
        for (var f = 0; f < u; f++) a.push(c + f), a.push(c + f), a.push(o.readUshort(n, i)), i += 2;
      }
      if (l == 2) {
        var h = o.readUshort(n, i);
        for (i += 2, f = 0; f < h; f++) a.push(o.readUshort(n, i)), i += 2, a.push(o.readUshort(n, i)), i += 2, a.push(o.readUshort(n, i)), i += 2;
      }
      return a;
    }, e._lctf.getInterval = function(n, i) {
      for (var o = 0; o < n.length; o += 3) {
        var a = n[o], l = n[o + 1];
        if (n[o + 2], a <= i && i <= l) return o;
      }
      return -1;
    }, e._lctf.readCoverage = function(n, i) {
      var o = e._bin, a = {};
      a.fmt = o.readUshort(n, i), i += 2;
      var l = o.readUshort(n, i);
      return i += 2, a.fmt == 1 && (a.tab = o.readUshorts(n, i, l)), a.fmt == 2 && (a.tab = o.readUshorts(n, i, 3 * l)), a;
    }, e._lctf.coverageIndex = function(n, i) {
      var o = n.tab;
      if (n.fmt == 1) return o.indexOf(i);
      if (n.fmt == 2) {
        var a = e._lctf.getInterval(o, i);
        if (a != -1) return o[a + 2] + (i - o[a]);
      }
      return -1;
    }, e._lctf.readFeatureList = function(n, i) {
      var o = e._bin, a = i, l = [], c = o.readUshort(n, i);
      i += 2;
      for (var u = 0; u < c; u++) {
        var f = o.readASCII(n, i, 4);
        i += 4;
        var h = o.readUshort(n, i);
        i += 2;
        var d = e._lctf.readFeatureTable(n, a + h);
        d.tag = f.trim(), l.push(d);
      }
      return l;
    }, e._lctf.readFeatureTable = function(n, i) {
      var o = e._bin, a = i, l = {}, c = o.readUshort(n, i);
      i += 2, c > 0 && (l.featureParams = a + c);
      var u = o.readUshort(n, i);
      i += 2, l.tab = [];
      for (var f = 0; f < u; f++) l.tab.push(o.readUshort(n, i + 2 * f));
      return l;
    }, e._lctf.readScriptList = function(n, i) {
      var o = e._bin, a = i, l = {}, c = o.readUshort(n, i);
      i += 2;
      for (var u = 0; u < c; u++) {
        var f = o.readASCII(n, i, 4);
        i += 4;
        var h = o.readUshort(n, i);
        i += 2, l[f.trim()] = e._lctf.readScriptTable(n, a + h);
      }
      return l;
    }, e._lctf.readScriptTable = function(n, i) {
      var o = e._bin, a = i, l = {}, c = o.readUshort(n, i);
      i += 2, c > 0 && (l.default = e._lctf.readLangSysTable(n, a + c));
      var u = o.readUshort(n, i);
      i += 2;
      for (var f = 0; f < u; f++) {
        var h = o.readASCII(n, i, 4);
        i += 4;
        var d = o.readUshort(n, i);
        i += 2, l[h.trim()] = e._lctf.readLangSysTable(n, a + d);
      }
      return l;
    }, e._lctf.readLangSysTable = function(n, i) {
      var o = e._bin, a = {};
      o.readUshort(n, i), i += 2, a.reqFeature = o.readUshort(n, i), i += 2;
      var l = o.readUshort(n, i);
      return i += 2, a.features = o.readUshorts(n, i, l), a;
    }, e.CFF = {}, e.CFF.parse = function(n, i, o) {
      var a = e._bin;
      (n = new Uint8Array(n.buffer, i, o))[i = 0], n[++i], n[++i], n[++i], i++;
      var l = [];
      i = e.CFF.readIndex(n, i, l);
      for (var c = [], u = 0; u < l.length - 1; u++) c.push(a.readASCII(n, i + l[u], l[u + 1] - l[u]));
      i += l[l.length - 1];
      var f = [];
      i = e.CFF.readIndex(n, i, f);
      var h = [];
      for (u = 0; u < f.length - 1; u++) h.push(e.CFF.readDict(n, i + f[u], i + f[u + 1]));
      i += f[f.length - 1];
      var d = h[0], _ = [];
      i = e.CFF.readIndex(n, i, _);
      var v = [];
      for (u = 0; u < _.length - 1; u++) v.push(a.readASCII(n, i + _[u], _[u + 1] - _[u]));
      if (i += _[_.length - 1], e.CFF.readSubrs(n, i, d), d.CharStrings) {
        i = d.CharStrings, _ = [], i = e.CFF.readIndex(n, i, _);
        var p = [];
        for (u = 0; u < _.length - 1; u++) p.push(a.readBytes(n, i + _[u], _[u + 1] - _[u]));
        d.CharStrings = p;
      }
      if (d.ROS) {
        i = d.FDArray;
        var m = [];
        for (i = e.CFF.readIndex(n, i, m), d.FDArray = [], u = 0; u < m.length - 1; u++) {
          var y = e.CFF.readDict(n, i + m[u], i + m[u + 1]);
          e.CFF._readFDict(n, y, v), d.FDArray.push(y);
        }
        i += m[m.length - 1], i = d.FDSelect, d.FDSelect = [];
        var g = n[i];
        if (i++, g != 3) throw g;
        var A = a.readUshort(n, i);
        for (i += 2, u = 0; u < A + 1; u++) d.FDSelect.push(a.readUshort(n, i), n[i + 2]), i += 3;
      }
      return d.Encoding && (d.Encoding = e.CFF.readEncoding(n, d.Encoding, d.CharStrings.length)), d.charset && (d.charset = e.CFF.readCharset(n, d.charset, d.CharStrings.length)), e.CFF._readFDict(n, d, v), d;
    }, e.CFF._readFDict = function(n, i, o) {
      var a;
      for (var l in i.Private && (a = i.Private[1], i.Private = e.CFF.readDict(n, a, a + i.Private[0]), i.Private.Subrs && e.CFF.readSubrs(n, a + i.Private.Subrs, i.Private)), i) ["FamilyName", "FontName", "FullName", "Notice", "version", "Copyright"].indexOf(l) != -1 && (i[l] = o[i[l] - 426 + 35]);
    }, e.CFF.readSubrs = function(n, i, o) {
      var a = e._bin, l = [];
      i = e.CFF.readIndex(n, i, l);
      var c, u = l.length;
      c = u < 1240 ? 107 : u < 33900 ? 1131 : 32768, o.Bias = c, o.Subrs = [];
      for (var f = 0; f < l.length - 1; f++) o.Subrs.push(a.readBytes(n, i + l[f], l[f + 1] - l[f]));
    }, e.CFF.tableSE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 0, 111, 112, 113, 114, 0, 115, 116, 117, 118, 119, 120, 121, 122, 0, 123, 0, 124, 125, 126, 127, 128, 129, 130, 131, 0, 132, 133, 0, 134, 135, 136, 137, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 138, 0, 139, 0, 0, 0, 0, 140, 141, 142, 143, 0, 0, 0, 0, 0, 144, 0, 0, 0, 145, 0, 0, 146, 147, 148, 149, 0, 0, 0, 0], e.CFF.glyphByUnicode = function(n, i) {
      for (var o = 0; o < n.charset.length; o++) if (n.charset[o] == i) return o;
      return -1;
    }, e.CFF.glyphBySE = function(n, i) {
      return i < 0 || i > 255 ? -1 : e.CFF.glyphByUnicode(n, e.CFF.tableSE[i]);
    }, e.CFF.readEncoding = function(n, i, o) {
      e._bin;
      var a = [".notdef"], l = n[i];
      if (i++, l != 0) throw "error: unknown encoding format: " + l;
      var c = n[i];
      i++;
      for (var u = 0; u < c; u++) a.push(n[i + u]);
      return a;
    }, e.CFF.readCharset = function(n, i, o) {
      var a = e._bin, l = [".notdef"], c = n[i];
      if (i++, c == 0) for (var u = 0; u < o; u++) {
        var f = a.readUshort(n, i);
        i += 2, l.push(f);
      }
      else {
        if (c != 1 && c != 2) throw "error: format: " + c;
        for (; l.length < o; ) {
          f = a.readUshort(n, i), i += 2;
          var h = 0;
          for (c == 1 ? (h = n[i], i++) : (h = a.readUshort(n, i), i += 2), u = 0; u <= h; u++) l.push(f), f++;
        }
      }
      return l;
    }, e.CFF.readIndex = function(n, i, o) {
      var a = e._bin, l = a.readUshort(n, i) + 1, c = n[i += 2];
      if (i++, c == 1) for (var u = 0; u < l; u++) o.push(n[i + u]);
      else if (c == 2) for (u = 0; u < l; u++) o.push(a.readUshort(n, i + 2 * u));
      else if (c == 3) for (u = 0; u < l; u++) o.push(16777215 & a.readUint(n, i + 3 * u - 1));
      else if (l != 1) throw "unsupported offset size: " + c + ", count: " + l;
      return (i += l * c) - 1;
    }, e.CFF.getCharString = function(n, i, o) {
      var a = e._bin, l = n[i], c = n[i + 1];
      n[i + 2], n[i + 3], n[i + 4];
      var u = 1, f = null, h = null;
      l <= 20 && (f = l, u = 1), l == 12 && (f = 100 * l + c, u = 2), 21 <= l && l <= 27 && (f = l, u = 1), l == 28 && (h = a.readShort(n, i + 1), u = 3), 29 <= l && l <= 31 && (f = l, u = 1), 32 <= l && l <= 246 && (h = l - 139, u = 1), 247 <= l && l <= 250 && (h = 256 * (l - 247) + c + 108, u = 2), 251 <= l && l <= 254 && (h = 256 * -(l - 251) - c - 108, u = 2), l == 255 && (h = a.readInt(n, i + 1) / 65535, u = 5), o.val = h ?? "o" + f, o.size = u;
    }, e.CFF.readCharString = function(n, i, o) {
      for (var a = i + o, l = e._bin, c = []; i < a; ) {
        var u = n[i], f = n[i + 1];
        n[i + 2], n[i + 3], n[i + 4];
        var h = 1, d = null, _ = null;
        u <= 20 && (d = u, h = 1), u == 12 && (d = 100 * u + f, h = 2), u != 19 && u != 20 || (d = u, h = 2), 21 <= u && u <= 27 && (d = u, h = 1), u == 28 && (_ = l.readShort(n, i + 1), h = 3), 29 <= u && u <= 31 && (d = u, h = 1), 32 <= u && u <= 246 && (_ = u - 139, h = 1), 247 <= u && u <= 250 && (_ = 256 * (u - 247) + f + 108, h = 2), 251 <= u && u <= 254 && (_ = 256 * -(u - 251) - f - 108, h = 2), u == 255 && (_ = l.readInt(n, i + 1) / 65535, h = 5), c.push(_ ?? "o" + d), i += h;
      }
      return c;
    }, e.CFF.readDict = function(n, i, o) {
      for (var a = e._bin, l = {}, c = []; i < o; ) {
        var u = n[i], f = n[i + 1];
        n[i + 2], n[i + 3], n[i + 4];
        var h = 1, d = null, _ = null;
        if (u == 28 && (_ = a.readShort(n, i + 1), h = 3), u == 29 && (_ = a.readInt(n, i + 1), h = 5), 32 <= u && u <= 246 && (_ = u - 139, h = 1), 247 <= u && u <= 250 && (_ = 256 * (u - 247) + f + 108, h = 2), 251 <= u && u <= 254 && (_ = 256 * -(u - 251) - f - 108, h = 2), u == 255) throw _ = a.readInt(n, i + 1) / 65535, h = 5, "unknown number";
        if (u == 30) {
          var v = [];
          for (h = 1; ; ) {
            var p = n[i + h];
            h++;
            var m = p >> 4, y = 15 & p;
            if (m != 15 && v.push(m), y != 15 && v.push(y), y == 15) break;
          }
          for (var g = "", A = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "e", "e-", "reserved", "-", "endOfNumber"], w = 0; w < v.length; w++) g += A[v[w]];
          _ = parseFloat(g);
        }
        u <= 21 && (d = ["version", "Notice", "FullName", "FamilyName", "Weight", "FontBBox", "BlueValues", "OtherBlues", "FamilyBlues", "FamilyOtherBlues", "StdHW", "StdVW", "escape", "UniqueID", "XUID", "charset", "Encoding", "CharStrings", "Private", "Subrs", "defaultWidthX", "nominalWidthX"][u], h = 1, u == 12 && (d = ["Copyright", "isFixedPitch", "ItalicAngle", "UnderlinePosition", "UnderlineThickness", "PaintType", "CharstringType", "FontMatrix", "StrokeWidth", "BlueScale", "BlueShift", "BlueFuzz", "StemSnapH", "StemSnapV", "ForceBold", 0, 0, "LanguageGroup", "ExpansionFactor", "initialRandomSeed", "SyntheticBase", "PostScript", "BaseFontName", "BaseFontBlend", 0, 0, 0, 0, 0, 0, "ROS", "CIDFontVersion", "CIDFontRevision", "CIDFontType", "CIDCount", "UIDBase", "FDArray", "FDSelect", "FontName"][f], h = 2)), d != null ? (l[d] = c.length == 1 ? c[0] : c, c = []) : c.push(_), i += h;
      }
      return l;
    }, e.cmap = {}, e.cmap.parse = function(n, i, o) {
      n = new Uint8Array(n.buffer, i, o), i = 0;
      var a = e._bin, l = {};
      a.readUshort(n, i), i += 2;
      var c = a.readUshort(n, i);
      i += 2;
      var u = [];
      l.tables = [];
      for (var f = 0; f < c; f++) {
        var h = a.readUshort(n, i);
        i += 2;
        var d = a.readUshort(n, i);
        i += 2;
        var _ = a.readUint(n, i);
        i += 4;
        var v = "p" + h + "e" + d, p = u.indexOf(_);
        if (p == -1) {
          var m;
          p = l.tables.length, u.push(_);
          var y = a.readUshort(n, _);
          y == 0 ? m = e.cmap.parse0(n, _) : y == 4 ? m = e.cmap.parse4(n, _) : y == 6 ? m = e.cmap.parse6(n, _) : y == 12 ? m = e.cmap.parse12(n, _) : console.debug("unknown format: " + y, h, d, _), l.tables.push(m);
        }
        if (l[v] != null) throw "multiple tables for one platform+encoding";
        l[v] = p;
      }
      return l;
    }, e.cmap.parse0 = function(n, i) {
      var o = e._bin, a = {};
      a.format = o.readUshort(n, i), i += 2;
      var l = o.readUshort(n, i);
      i += 2, o.readUshort(n, i), i += 2, a.map = [];
      for (var c = 0; c < l - 6; c++) a.map.push(n[i + c]);
      return a;
    }, e.cmap.parse4 = function(n, i) {
      var o = e._bin, a = i, l = {};
      l.format = o.readUshort(n, i), i += 2;
      var c = o.readUshort(n, i);
      i += 2, o.readUshort(n, i), i += 2;
      var u = o.readUshort(n, i);
      i += 2;
      var f = u / 2;
      l.searchRange = o.readUshort(n, i), i += 2, l.entrySelector = o.readUshort(n, i), i += 2, l.rangeShift = o.readUshort(n, i), i += 2, l.endCount = o.readUshorts(n, i, f), i += 2 * f, i += 2, l.startCount = o.readUshorts(n, i, f), i += 2 * f, l.idDelta = [];
      for (var h = 0; h < f; h++) l.idDelta.push(o.readShort(n, i)), i += 2;
      for (l.idRangeOffset = o.readUshorts(n, i, f), i += 2 * f, l.glyphIdArray = []; i < a + c; ) l.glyphIdArray.push(o.readUshort(n, i)), i += 2;
      return l;
    }, e.cmap.parse6 = function(n, i) {
      var o = e._bin, a = {};
      a.format = o.readUshort(n, i), i += 2, o.readUshort(n, i), i += 2, o.readUshort(n, i), i += 2, a.firstCode = o.readUshort(n, i), i += 2;
      var l = o.readUshort(n, i);
      i += 2, a.glyphIdArray = [];
      for (var c = 0; c < l; c++) a.glyphIdArray.push(o.readUshort(n, i)), i += 2;
      return a;
    }, e.cmap.parse12 = function(n, i) {
      var o = e._bin, a = {};
      a.format = o.readUshort(n, i), i += 2, i += 2, o.readUint(n, i), i += 4, o.readUint(n, i), i += 4;
      var l = o.readUint(n, i);
      i += 4, a.groups = [];
      for (var c = 0; c < l; c++) {
        var u = i + 12 * c, f = o.readUint(n, u + 0), h = o.readUint(n, u + 4), d = o.readUint(n, u + 8);
        a.groups.push([f, h, d]);
      }
      return a;
    }, e.glyf = {}, e.glyf.parse = function(n, i, o, a) {
      for (var l = [], c = 0; c < a.maxp.numGlyphs; c++) l.push(null);
      return l;
    }, e.glyf._parseGlyf = function(n, i) {
      var o = e._bin, a = n._data, l = e._tabOffset(a, "glyf", n._offset) + n.loca[i];
      if (n.loca[i] == n.loca[i + 1]) return null;
      var c = {};
      if (c.noc = o.readShort(a, l), l += 2, c.xMin = o.readShort(a, l), l += 2, c.yMin = o.readShort(a, l), l += 2, c.xMax = o.readShort(a, l), l += 2, c.yMax = o.readShort(a, l), l += 2, c.xMin >= c.xMax || c.yMin >= c.yMax) return null;
      if (c.noc > 0) {
        c.endPts = [];
        for (var u = 0; u < c.noc; u++) c.endPts.push(o.readUshort(a, l)), l += 2;
        var f = o.readUshort(a, l);
        if (l += 2, a.length - l < f) return null;
        c.instructions = o.readBytes(a, l, f), l += f;
        var h = c.endPts[c.noc - 1] + 1;
        for (c.flags = [], u = 0; u < h; u++) {
          var d = a[l];
          if (l++, c.flags.push(d), (8 & d) != 0) {
            var _ = a[l];
            l++;
            for (var v = 0; v < _; v++) c.flags.push(d), u++;
          }
        }
        for (c.xs = [], u = 0; u < h; u++) {
          var p = (2 & c.flags[u]) != 0, m = (16 & c.flags[u]) != 0;
          p ? (c.xs.push(m ? a[l] : -a[l]), l++) : m ? c.xs.push(0) : (c.xs.push(o.readShort(a, l)), l += 2);
        }
        for (c.ys = [], u = 0; u < h; u++)
          p = (4 & c.flags[u]) != 0, m = (32 & c.flags[u]) != 0, p ? (c.ys.push(m ? a[l] : -a[l]), l++) : m ? c.ys.push(0) : (c.ys.push(o.readShort(a, l)), l += 2);
        var y = 0, g = 0;
        for (u = 0; u < h; u++) y += c.xs[u], g += c.ys[u], c.xs[u] = y, c.ys[u] = g;
      } else {
        var A;
        c.parts = [];
        do {
          A = o.readUshort(a, l), l += 2;
          var w = { m: { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 }, p1: -1, p2: -1 };
          if (c.parts.push(w), w.glyphIndex = o.readUshort(a, l), l += 2, 1 & A) {
            var T = o.readShort(a, l);
            l += 2;
            var S = o.readShort(a, l);
            l += 2;
          } else
            T = o.readInt8(a, l), l++, S = o.readInt8(a, l), l++;
          2 & A ? (w.m.tx = T, w.m.ty = S) : (w.p1 = T, w.p2 = S), 8 & A ? (w.m.a = w.m.d = o.readF2dot14(a, l), l += 2) : 64 & A ? (w.m.a = o.readF2dot14(a, l), l += 2, w.m.d = o.readF2dot14(a, l), l += 2) : 128 & A && (w.m.a = o.readF2dot14(a, l), l += 2, w.m.b = o.readF2dot14(a, l), l += 2, w.m.c = o.readF2dot14(a, l), l += 2, w.m.d = o.readF2dot14(a, l), l += 2);
        } while (32 & A);
        if (256 & A) {
          var C = o.readUshort(a, l);
          for (l += 2, c.instr = [], u = 0; u < C; u++) c.instr.push(a[l]), l++;
        }
      }
      return c;
    }, e.GDEF = {}, e.GDEF.parse = function(n, i, o, a) {
      var l = i;
      i += 4;
      var c = e._bin.readUshort(n, i);
      return { glyphClassDef: c === 0 ? null : e._lctf.readClassDef(n, l + c) };
    }, e.GPOS = {}, e.GPOS.parse = function(n, i, o, a) {
      return e._lctf.parse(n, i, o, a, e.GPOS.subt);
    }, e.GPOS.subt = function(n, i, o, a) {
      var l = e._bin, c = o, u = {};
      if (u.fmt = l.readUshort(n, o), o += 2, i == 1 || i == 2 || i == 3 || i == 7 || i == 8 && u.fmt <= 2) {
        var f = l.readUshort(n, o);
        o += 2, u.coverage = e._lctf.readCoverage(n, f + c);
      }
      if (i == 1 && u.fmt == 1) {
        var h = l.readUshort(n, o);
        o += 2, h != 0 && (u.pos = e.GPOS.readValueRecord(n, o, h));
      } else if (i == 2 && u.fmt >= 1 && u.fmt <= 2) {
        h = l.readUshort(n, o), o += 2;
        var d = l.readUshort(n, o);
        o += 2;
        var _ = e._lctf.numOfOnes(h), v = e._lctf.numOfOnes(d);
        if (u.fmt == 1) {
          u.pairsets = [];
          var p = l.readUshort(n, o);
          o += 2;
          for (var m = 0; m < p; m++) {
            var y = c + l.readUshort(n, o);
            o += 2;
            var g = l.readUshort(n, y);
            y += 2;
            for (var A = [], w = 0; w < g; w++) {
              var T = l.readUshort(n, y);
              y += 2, h != 0 && (L = e.GPOS.readValueRecord(n, y, h), y += 2 * _), d != 0 && (k = e.GPOS.readValueRecord(n, y, d), y += 2 * v), A.push({ gid2: T, val1: L, val2: k });
            }
            u.pairsets.push(A);
          }
        }
        if (u.fmt == 2) {
          var S = l.readUshort(n, o);
          o += 2;
          var C = l.readUshort(n, o);
          o += 2;
          var z = l.readUshort(n, o);
          o += 2;
          var x = l.readUshort(n, o);
          for (o += 2, u.classDef1 = e._lctf.readClassDef(n, c + S), u.classDef2 = e._lctf.readClassDef(n, c + C), u.matrix = [], m = 0; m < z; m++) {
            var R = [];
            for (w = 0; w < x; w++) {
              var L = null, k = null;
              h != 0 && (L = e.GPOS.readValueRecord(n, o, h), o += 2 * _), d != 0 && (k = e.GPOS.readValueRecord(n, o, d), o += 2 * v), R.push({ val1: L, val2: k });
            }
            u.matrix.push(R);
          }
        }
      } else if (i == 4 && u.fmt == 1) u.markCoverage = e._lctf.readCoverage(n, l.readUshort(n, o) + c), u.baseCoverage = e._lctf.readCoverage(n, l.readUshort(n, o + 2) + c), u.markClassCount = l.readUshort(n, o + 4), u.markArray = e.GPOS.readMarkArray(n, l.readUshort(n, o + 6) + c), u.baseArray = e.GPOS.readBaseArray(n, l.readUshort(n, o + 8) + c, u.markClassCount);
      else if (i == 6 && u.fmt == 1) u.mark1Coverage = e._lctf.readCoverage(n, l.readUshort(n, o) + c), u.mark2Coverage = e._lctf.readCoverage(n, l.readUshort(n, o + 2) + c), u.markClassCount = l.readUshort(n, o + 4), u.mark1Array = e.GPOS.readMarkArray(n, l.readUshort(n, o + 6) + c), u.mark2Array = e.GPOS.readBaseArray(n, l.readUshort(n, o + 8) + c, u.markClassCount);
      else {
        if (i == 9 && u.fmt == 1) {
          var P = l.readUshort(n, o);
          o += 2;
          var W = l.readUint(n, o);
          if (o += 4, a.ltype == 9) a.ltype = P;
          else if (a.ltype != P) throw "invalid extension substitution";
          return e.GPOS.subt(n, a.ltype, c + W);
        }
        console.debug("unsupported GPOS table LookupType", i, "format", u.fmt);
      }
      return u;
    }, e.GPOS.readValueRecord = function(n, i, o) {
      var a = e._bin, l = [];
      return l.push(1 & o ? a.readShort(n, i) : 0), i += 1 & o ? 2 : 0, l.push(2 & o ? a.readShort(n, i) : 0), i += 2 & o ? 2 : 0, l.push(4 & o ? a.readShort(n, i) : 0), i += 4 & o ? 2 : 0, l.push(8 & o ? a.readShort(n, i) : 0), i += 8 & o ? 2 : 0, l;
    }, e.GPOS.readBaseArray = function(n, i, o) {
      var a = e._bin, l = [], c = i, u = a.readUshort(n, i);
      i += 2;
      for (var f = 0; f < u; f++) {
        for (var h = [], d = 0; d < o; d++) h.push(e.GPOS.readAnchorRecord(n, c + a.readUshort(n, i))), i += 2;
        l.push(h);
      }
      return l;
    }, e.GPOS.readMarkArray = function(n, i) {
      var o = e._bin, a = [], l = i, c = o.readUshort(n, i);
      i += 2;
      for (var u = 0; u < c; u++) {
        var f = e.GPOS.readAnchorRecord(n, o.readUshort(n, i + 2) + l);
        f.markClass = o.readUshort(n, i), a.push(f), i += 4;
      }
      return a;
    }, e.GPOS.readAnchorRecord = function(n, i) {
      var o = e._bin, a = {};
      return a.fmt = o.readUshort(n, i), a.x = o.readShort(n, i + 2), a.y = o.readShort(n, i + 4), a;
    }, e.GSUB = {}, e.GSUB.parse = function(n, i, o, a) {
      return e._lctf.parse(n, i, o, a, e.GSUB.subt);
    }, e.GSUB.subt = function(n, i, o, a) {
      var l = e._bin, c = o, u = {};
      if (u.fmt = l.readUshort(n, o), o += 2, i != 1 && i != 2 && i != 4 && i != 5 && i != 6) return null;
      if (i == 1 || i == 2 || i == 4 || i == 5 && u.fmt <= 2 || i == 6 && u.fmt <= 2) {
        var f = l.readUshort(n, o);
        o += 2, u.coverage = e._lctf.readCoverage(n, c + f);
      }
      if (i == 1 && u.fmt >= 1 && u.fmt <= 2) {
        if (u.fmt == 1) u.delta = l.readShort(n, o), o += 2;
        else if (u.fmt == 2) {
          var h = l.readUshort(n, o);
          o += 2, u.newg = l.readUshorts(n, o, h), o += 2 * u.newg.length;
        }
      } else if (i == 2 && u.fmt == 1) {
        h = l.readUshort(n, o), o += 2, u.seqs = [];
        for (var d = 0; d < h; d++) {
          var _ = l.readUshort(n, o) + c;
          o += 2;
          var v = l.readUshort(n, _);
          u.seqs.push(l.readUshorts(n, _ + 2, v));
        }
      } else if (i == 4)
        for (u.vals = [], h = l.readUshort(n, o), o += 2, d = 0; d < h; d++) {
          var p = l.readUshort(n, o);
          o += 2, u.vals.push(e.GSUB.readLigatureSet(n, c + p));
        }
      else if (i == 5 && u.fmt == 2) {
        if (u.fmt == 2) {
          var m = l.readUshort(n, o);
          o += 2, u.cDef = e._lctf.readClassDef(n, c + m), u.scset = [];
          var y = l.readUshort(n, o);
          for (o += 2, d = 0; d < y; d++) {
            var g = l.readUshort(n, o);
            o += 2, u.scset.push(g == 0 ? null : e.GSUB.readSubClassSet(n, c + g));
          }
        }
      } else if (i == 6 && u.fmt == 3) {
        if (u.fmt == 3) {
          for (d = 0; d < 3; d++) {
            h = l.readUshort(n, o), o += 2;
            for (var A = [], w = 0; w < h; w++) A.push(e._lctf.readCoverage(n, c + l.readUshort(n, o + 2 * w)));
            o += 2 * h, d == 0 && (u.backCvg = A), d == 1 && (u.inptCvg = A), d == 2 && (u.ahedCvg = A);
          }
          h = l.readUshort(n, o), o += 2, u.lookupRec = e.GSUB.readSubstLookupRecords(n, o, h);
        }
      } else {
        if (i == 7 && u.fmt == 1) {
          var T = l.readUshort(n, o);
          o += 2;
          var S = l.readUint(n, o);
          if (o += 4, a.ltype == 9) a.ltype = T;
          else if (a.ltype != T) throw "invalid extension substitution";
          return e.GSUB.subt(n, a.ltype, c + S);
        }
        console.debug("unsupported GSUB table LookupType", i, "format", u.fmt);
      }
      return u;
    }, e.GSUB.readSubClassSet = function(n, i) {
      var o = e._bin.readUshort, a = i, l = [], c = o(n, i);
      i += 2;
      for (var u = 0; u < c; u++) {
        var f = o(n, i);
        i += 2, l.push(e.GSUB.readSubClassRule(n, a + f));
      }
      return l;
    }, e.GSUB.readSubClassRule = function(n, i) {
      var o = e._bin.readUshort, a = {}, l = o(n, i), c = o(n, i += 2);
      i += 2, a.input = [];
      for (var u = 0; u < l - 1; u++) a.input.push(o(n, i)), i += 2;
      return a.substLookupRecords = e.GSUB.readSubstLookupRecords(n, i, c), a;
    }, e.GSUB.readSubstLookupRecords = function(n, i, o) {
      for (var a = e._bin.readUshort, l = [], c = 0; c < o; c++) l.push(a(n, i), a(n, i + 2)), i += 4;
      return l;
    }, e.GSUB.readChainSubClassSet = function(n, i) {
      var o = e._bin, a = i, l = [], c = o.readUshort(n, i);
      i += 2;
      for (var u = 0; u < c; u++) {
        var f = o.readUshort(n, i);
        i += 2, l.push(e.GSUB.readChainSubClassRule(n, a + f));
      }
      return l;
    }, e.GSUB.readChainSubClassRule = function(n, i) {
      for (var o = e._bin, a = {}, l = ["backtrack", "input", "lookahead"], c = 0; c < l.length; c++) {
        var u = o.readUshort(n, i);
        i += 2, c == 1 && u--, a[l[c]] = o.readUshorts(n, i, u), i += 2 * a[l[c]].length;
      }
      return u = o.readUshort(n, i), i += 2, a.subst = o.readUshorts(n, i, 2 * u), i += 2 * a.subst.length, a;
    }, e.GSUB.readLigatureSet = function(n, i) {
      var o = e._bin, a = i, l = [], c = o.readUshort(n, i);
      i += 2;
      for (var u = 0; u < c; u++) {
        var f = o.readUshort(n, i);
        i += 2, l.push(e.GSUB.readLigature(n, a + f));
      }
      return l;
    }, e.GSUB.readLigature = function(n, i) {
      var o = e._bin, a = { chain: [] };
      a.nglyph = o.readUshort(n, i), i += 2;
      var l = o.readUshort(n, i);
      i += 2;
      for (var c = 0; c < l - 1; c++) a.chain.push(o.readUshort(n, i)), i += 2;
      return a;
    }, e.head = {}, e.head.parse = function(n, i, o) {
      var a = e._bin, l = {};
      return a.readFixed(n, i), i += 4, l.fontRevision = a.readFixed(n, i), i += 4, a.readUint(n, i), i += 4, a.readUint(n, i), i += 4, l.flags = a.readUshort(n, i), i += 2, l.unitsPerEm = a.readUshort(n, i), i += 2, l.created = a.readUint64(n, i), i += 8, l.modified = a.readUint64(n, i), i += 8, l.xMin = a.readShort(n, i), i += 2, l.yMin = a.readShort(n, i), i += 2, l.xMax = a.readShort(n, i), i += 2, l.yMax = a.readShort(n, i), i += 2, l.macStyle = a.readUshort(n, i), i += 2, l.lowestRecPPEM = a.readUshort(n, i), i += 2, l.fontDirectionHint = a.readShort(n, i), i += 2, l.indexToLocFormat = a.readShort(n, i), i += 2, l.glyphDataFormat = a.readShort(n, i), i += 2, l;
    }, e.hhea = {}, e.hhea.parse = function(n, i, o) {
      var a = e._bin, l = {};
      return a.readFixed(n, i), i += 4, l.ascender = a.readShort(n, i), i += 2, l.descender = a.readShort(n, i), i += 2, l.lineGap = a.readShort(n, i), i += 2, l.advanceWidthMax = a.readUshort(n, i), i += 2, l.minLeftSideBearing = a.readShort(n, i), i += 2, l.minRightSideBearing = a.readShort(n, i), i += 2, l.xMaxExtent = a.readShort(n, i), i += 2, l.caretSlopeRise = a.readShort(n, i), i += 2, l.caretSlopeRun = a.readShort(n, i), i += 2, l.caretOffset = a.readShort(n, i), i += 2, i += 8, l.metricDataFormat = a.readShort(n, i), i += 2, l.numberOfHMetrics = a.readUshort(n, i), i += 2, l;
    }, e.hmtx = {}, e.hmtx.parse = function(n, i, o, a) {
      for (var l = e._bin, c = { aWidth: [], lsBearing: [] }, u = 0, f = 0, h = 0; h < a.maxp.numGlyphs; h++) h < a.hhea.numberOfHMetrics && (u = l.readUshort(n, i), i += 2, f = l.readShort(n, i), i += 2), c.aWidth.push(u), c.lsBearing.push(f);
      return c;
    }, e.kern = {}, e.kern.parse = function(n, i, o, a) {
      var l = e._bin, c = l.readUshort(n, i);
      if (i += 2, c == 1) return e.kern.parseV1(n, i - 2, o, a);
      var u = l.readUshort(n, i);
      i += 2;
      for (var f = { glyph1: [], rval: [] }, h = 0; h < u; h++) {
        i += 2, o = l.readUshort(n, i), i += 2;
        var d = l.readUshort(n, i);
        i += 2;
        var _ = d >>> 8;
        if ((_ &= 15) != 0) throw "unknown kern table format: " + _;
        i = e.kern.readFormat0(n, i, f);
      }
      return f;
    }, e.kern.parseV1 = function(n, i, o, a) {
      var l = e._bin;
      l.readFixed(n, i), i += 4;
      var c = l.readUint(n, i);
      i += 4;
      for (var u = { glyph1: [], rval: [] }, f = 0; f < c; f++) {
        l.readUint(n, i), i += 4;
        var h = l.readUshort(n, i);
        i += 2, l.readUshort(n, i), i += 2;
        var d = h >>> 8;
        if ((d &= 15) != 0) throw "unknown kern table format: " + d;
        i = e.kern.readFormat0(n, i, u);
      }
      return u;
    }, e.kern.readFormat0 = function(n, i, o) {
      var a = e._bin, l = -1, c = a.readUshort(n, i);
      i += 2, a.readUshort(n, i), i += 2, a.readUshort(n, i), i += 2, a.readUshort(n, i), i += 2;
      for (var u = 0; u < c; u++) {
        var f = a.readUshort(n, i);
        i += 2;
        var h = a.readUshort(n, i);
        i += 2;
        var d = a.readShort(n, i);
        i += 2, f != l && (o.glyph1.push(f), o.rval.push({ glyph2: [], vals: [] }));
        var _ = o.rval[o.rval.length - 1];
        _.glyph2.push(h), _.vals.push(d), l = f;
      }
      return i;
    }, e.loca = {}, e.loca.parse = function(n, i, o, a) {
      var l = e._bin, c = [], u = a.head.indexToLocFormat, f = a.maxp.numGlyphs + 1;
      if (u == 0) for (var h = 0; h < f; h++) c.push(l.readUshort(n, i + (h << 1)) << 1);
      if (u == 1) for (h = 0; h < f; h++) c.push(l.readUint(n, i + (h << 2)));
      return c;
    }, e.maxp = {}, e.maxp.parse = function(n, i, o) {
      var a = e._bin, l = {}, c = a.readUint(n, i);
      return i += 4, l.numGlyphs = a.readUshort(n, i), i += 2, c == 65536 && (l.maxPoints = a.readUshort(n, i), i += 2, l.maxContours = a.readUshort(n, i), i += 2, l.maxCompositePoints = a.readUshort(n, i), i += 2, l.maxCompositeContours = a.readUshort(n, i), i += 2, l.maxZones = a.readUshort(n, i), i += 2, l.maxTwilightPoints = a.readUshort(n, i), i += 2, l.maxStorage = a.readUshort(n, i), i += 2, l.maxFunctionDefs = a.readUshort(n, i), i += 2, l.maxInstructionDefs = a.readUshort(n, i), i += 2, l.maxStackElements = a.readUshort(n, i), i += 2, l.maxSizeOfInstructions = a.readUshort(n, i), i += 2, l.maxComponentElements = a.readUshort(n, i), i += 2, l.maxComponentDepth = a.readUshort(n, i), i += 2), l;
    }, e.name = {}, e.name.parse = function(n, i, o) {
      var a = e._bin, l = {};
      a.readUshort(n, i), i += 2;
      var c = a.readUshort(n, i);
      i += 2, a.readUshort(n, i);
      for (var u, f = ["copyright", "fontFamily", "fontSubfamily", "ID", "fullName", "version", "postScriptName", "trademark", "manufacturer", "designer", "description", "urlVendor", "urlDesigner", "licence", "licenceURL", "---", "typoFamilyName", "typoSubfamilyName", "compatibleFull", "sampleText", "postScriptCID", "wwsFamilyName", "wwsSubfamilyName", "lightPalette", "darkPalette"], h = i += 2, d = 0; d < c; d++) {
        var _ = a.readUshort(n, i);
        i += 2;
        var v = a.readUshort(n, i);
        i += 2;
        var p = a.readUshort(n, i);
        i += 2;
        var m = a.readUshort(n, i);
        i += 2;
        var y = a.readUshort(n, i);
        i += 2;
        var g = a.readUshort(n, i);
        i += 2;
        var A, w = f[m], T = h + 12 * c + g;
        if (_ == 0) A = a.readUnicode(n, T, y / 2);
        else if (_ == 3 && v == 0) A = a.readUnicode(n, T, y / 2);
        else if (v == 0) A = a.readASCII(n, T, y);
        else if (v == 1) A = a.readUnicode(n, T, y / 2);
        else if (v == 3) A = a.readUnicode(n, T, y / 2);
        else {
          if (_ != 1) throw "unknown encoding " + v + ", platformID: " + _;
          A = a.readASCII(n, T, y), console.debug("reading unknown MAC encoding " + v + " as ASCII");
        }
        var S = "p" + _ + "," + p.toString(16);
        l[S] == null && (l[S] = {}), l[S][w !== void 0 ? w : m] = A, l[S]._lang = p;
      }
      for (var C in l) if (l[C].postScriptName != null && l[C]._lang == 1033) return l[C];
      for (var C in l) if (l[C].postScriptName != null && l[C]._lang == 0) return l[C];
      for (var C in l) if (l[C].postScriptName != null && l[C]._lang == 3084) return l[C];
      for (var C in l) if (l[C].postScriptName != null) return l[C];
      for (var C in l) {
        u = C;
        break;
      }
      return console.debug("returning name table with languageID " + l[u]._lang), l[u];
    }, e["OS/2"] = {}, e["OS/2"].parse = function(n, i, o) {
      var a = e._bin.readUshort(n, i);
      i += 2;
      var l = {};
      if (a == 0) e["OS/2"].version0(n, i, l);
      else if (a == 1) e["OS/2"].version1(n, i, l);
      else if (a == 2 || a == 3 || a == 4) e["OS/2"].version2(n, i, l);
      else {
        if (a != 5) throw "unknown OS/2 table version: " + a;
        e["OS/2"].version5(n, i, l);
      }
      return l;
    }, e["OS/2"].version0 = function(n, i, o) {
      var a = e._bin;
      return o.xAvgCharWidth = a.readShort(n, i), i += 2, o.usWeightClass = a.readUshort(n, i), i += 2, o.usWidthClass = a.readUshort(n, i), i += 2, o.fsType = a.readUshort(n, i), i += 2, o.ySubscriptXSize = a.readShort(n, i), i += 2, o.ySubscriptYSize = a.readShort(n, i), i += 2, o.ySubscriptXOffset = a.readShort(n, i), i += 2, o.ySubscriptYOffset = a.readShort(n, i), i += 2, o.ySuperscriptXSize = a.readShort(n, i), i += 2, o.ySuperscriptYSize = a.readShort(n, i), i += 2, o.ySuperscriptXOffset = a.readShort(n, i), i += 2, o.ySuperscriptYOffset = a.readShort(n, i), i += 2, o.yStrikeoutSize = a.readShort(n, i), i += 2, o.yStrikeoutPosition = a.readShort(n, i), i += 2, o.sFamilyClass = a.readShort(n, i), i += 2, o.panose = a.readBytes(n, i, 10), i += 10, o.ulUnicodeRange1 = a.readUint(n, i), i += 4, o.ulUnicodeRange2 = a.readUint(n, i), i += 4, o.ulUnicodeRange3 = a.readUint(n, i), i += 4, o.ulUnicodeRange4 = a.readUint(n, i), i += 4, o.achVendID = [a.readInt8(n, i), a.readInt8(n, i + 1), a.readInt8(n, i + 2), a.readInt8(n, i + 3)], i += 4, o.fsSelection = a.readUshort(n, i), i += 2, o.usFirstCharIndex = a.readUshort(n, i), i += 2, o.usLastCharIndex = a.readUshort(n, i), i += 2, o.sTypoAscender = a.readShort(n, i), i += 2, o.sTypoDescender = a.readShort(n, i), i += 2, o.sTypoLineGap = a.readShort(n, i), i += 2, o.usWinAscent = a.readUshort(n, i), i += 2, o.usWinDescent = a.readUshort(n, i), i += 2;
    }, e["OS/2"].version1 = function(n, i, o) {
      var a = e._bin;
      return i = e["OS/2"].version0(n, i, o), o.ulCodePageRange1 = a.readUint(n, i), i += 4, o.ulCodePageRange2 = a.readUint(n, i), i += 4;
    }, e["OS/2"].version2 = function(n, i, o) {
      var a = e._bin;
      return i = e["OS/2"].version1(n, i, o), o.sxHeight = a.readShort(n, i), i += 2, o.sCapHeight = a.readShort(n, i), i += 2, o.usDefault = a.readUshort(n, i), i += 2, o.usBreak = a.readUshort(n, i), i += 2, o.usMaxContext = a.readUshort(n, i), i += 2;
    }, e["OS/2"].version5 = function(n, i, o) {
      var a = e._bin;
      return i = e["OS/2"].version2(n, i, o), o.usLowerOpticalPointSize = a.readUshort(n, i), i += 2, o.usUpperOpticalPointSize = a.readUshort(n, i), i += 2;
    }, e.post = {}, e.post.parse = function(n, i, o) {
      var a = e._bin, l = {};
      return l.version = a.readFixed(n, i), i += 4, l.italicAngle = a.readFixed(n, i), i += 4, l.underlinePosition = a.readShort(n, i), i += 2, l.underlineThickness = a.readShort(n, i), i += 2, l;
    }, e == null && (e = {}), e.U == null && (e.U = {}), e.U.codeToGlyph = function(n, i) {
      var o = n.cmap, a = -1;
      if (o.p0e4 != null ? a = o.p0e4 : o.p3e1 != null ? a = o.p3e1 : o.p1e0 != null ? a = o.p1e0 : o.p0e3 != null && (a = o.p0e3), a == -1) throw "no familiar platform and encoding!";
      var l = o.tables[a];
      if (l.format == 0) return i >= l.map.length ? 0 : l.map[i];
      if (l.format == 4) {
        for (var c = -1, u = 0; u < l.endCount.length; u++) if (i <= l.endCount[u]) {
          c = u;
          break;
        }
        return c == -1 || l.startCount[c] > i ? 0 : 65535 & (l.idRangeOffset[c] != 0 ? l.glyphIdArray[i - l.startCount[c] + (l.idRangeOffset[c] >> 1) - (l.idRangeOffset.length - c)] : i + l.idDelta[c]);
      }
      if (l.format == 12) {
        if (i > l.groups[l.groups.length - 1][1]) return 0;
        for (u = 0; u < l.groups.length; u++) {
          var f = l.groups[u];
          if (f[0] <= i && i <= f[1]) return f[2] + (i - f[0]);
        }
        return 0;
      }
      throw "unknown cmap table format " + l.format;
    }, e.U.glyphToPath = function(n, i) {
      var o = { cmds: [], crds: [] };
      if (n.SVG && n.SVG.entries[i]) {
        var a = n.SVG.entries[i];
        return a == null ? o : (typeof a == "string" && (a = e.SVG.toPath(a), n.SVG.entries[i] = a), a);
      }
      if (n.CFF) {
        var l = { x: 0, y: 0, stack: [], nStems: 0, haveWidth: !1, width: n.CFF.Private ? n.CFF.Private.defaultWidthX : 0, open: !1 }, c = n.CFF, u = n.CFF.Private;
        if (c.ROS) {
          for (var f = 0; c.FDSelect[f + 2] <= i; ) f += 2;
          u = c.FDArray[c.FDSelect[f + 1]].Private;
        }
        e.U._drawCFF(n.CFF.CharStrings[i], l, c, u, o);
      } else n.glyf && e.U._drawGlyf(i, n, o);
      return o;
    }, e.U._drawGlyf = function(n, i, o) {
      var a = i.glyf[n];
      a == null && (a = i.glyf[n] = e.glyf._parseGlyf(i, n)), a != null && (a.noc > -1 ? e.U._simpleGlyph(a, o) : e.U._compoGlyph(a, i, o));
    }, e.U._simpleGlyph = function(n, i) {
      for (var o = 0; o < n.noc; o++) {
        for (var a = o == 0 ? 0 : n.endPts[o - 1] + 1, l = n.endPts[o], c = a; c <= l; c++) {
          var u = c == a ? l : c - 1, f = c == l ? a : c + 1, h = 1 & n.flags[c], d = 1 & n.flags[u], _ = 1 & n.flags[f], v = n.xs[c], p = n.ys[c];
          if (c == a) if (h) {
            if (!d) {
              e.U.P.moveTo(i, v, p);
              continue;
            }
            e.U.P.moveTo(i, n.xs[u], n.ys[u]);
          } else d ? e.U.P.moveTo(i, n.xs[u], n.ys[u]) : e.U.P.moveTo(i, (n.xs[u] + v) / 2, (n.ys[u] + p) / 2);
          h ? d && e.U.P.lineTo(i, v, p) : _ ? e.U.P.qcurveTo(i, v, p, n.xs[f], n.ys[f]) : e.U.P.qcurveTo(i, v, p, (v + n.xs[f]) / 2, (p + n.ys[f]) / 2);
        }
        e.U.P.closePath(i);
      }
    }, e.U._compoGlyph = function(n, i, o) {
      for (var a = 0; a < n.parts.length; a++) {
        var l = { cmds: [], crds: [] }, c = n.parts[a];
        e.U._drawGlyf(c.glyphIndex, i, l);
        for (var u = c.m, f = 0; f < l.crds.length; f += 2) {
          var h = l.crds[f], d = l.crds[f + 1];
          o.crds.push(h * u.a + d * u.b + u.tx), o.crds.push(h * u.c + d * u.d + u.ty);
        }
        for (f = 0; f < l.cmds.length; f++) o.cmds.push(l.cmds[f]);
      }
    }, e.U._getGlyphClass = function(n, i) {
      var o = e._lctf.getInterval(i, n);
      return o == -1 ? 0 : i[o + 2];
    }, e.U._applySubs = function(n, i, o, a) {
      for (var l = n.length - i - 1, c = 0; c < o.tabs.length; c++) if (o.tabs[c] != null) {
        var u, f = o.tabs[c];
        if (!f.coverage || (u = e._lctf.coverageIndex(f.coverage, n[i])) != -1) {
          if (o.ltype == 1) n[i], f.fmt == 1 ? n[i] = n[i] + f.delta : n[i] = f.newg[u];
          else if (o.ltype == 4) for (var h = f.vals[u], d = 0; d < h.length; d++) {
            var _ = h[d], v = _.chain.length;
            if (!(v > l)) {
              for (var p = !0, m = 0, y = 0; y < v; y++) {
                for (; n[i + m + (1 + y)] == -1; ) m++;
                _.chain[y] != n[i + m + (1 + y)] && (p = !1);
              }
              if (p) {
                for (n[i] = _.nglyph, y = 0; y < v + m; y++) n[i + y + 1] = -1;
                break;
              }
            }
          }
          else if (o.ltype == 5 && f.fmt == 2) for (var g = e._lctf.getInterval(f.cDef, n[i]), A = f.cDef[g + 2], w = f.scset[A], T = 0; T < w.length; T++) {
            var S = w[T], C = S.input;
            if (!(C.length > l)) {
              for (p = !0, y = 0; y < C.length; y++) {
                var z = e._lctf.getInterval(f.cDef, n[i + 1 + y]);
                if (g == -1 && f.cDef[z + 2] != C[y]) {
                  p = !1;
                  break;
                }
              }
              if (p) {
                var x = S.substLookupRecords;
                for (d = 0; d < x.length; d += 2) x[d], x[d + 1];
              }
            }
          }
          else if (o.ltype == 6 && f.fmt == 3) {
            if (!e.U._glsCovered(n, f.backCvg, i - f.backCvg.length) || !e.U._glsCovered(n, f.inptCvg, i) || !e.U._glsCovered(n, f.ahedCvg, i + f.inptCvg.length)) continue;
            var R = f.lookupRec;
            for (T = 0; T < R.length; T += 2) {
              g = R[T];
              var L = a[R[T + 1]];
              e.U._applySubs(n, i + g, L, a);
            }
          }
        }
      }
    }, e.U._glsCovered = function(n, i, o) {
      for (var a = 0; a < i.length; a++)
        if (e._lctf.coverageIndex(i[a], n[o + a]) == -1) return !1;
      return !0;
    }, e.U.glyphsToPath = function(n, i, o) {
      for (var a = { cmds: [], crds: [] }, l = 0, c = 0; c < i.length; c++) {
        var u = i[c];
        if (u != -1) {
          for (var f = c < i.length - 1 && i[c + 1] != -1 ? i[c + 1] : 0, h = e.U.glyphToPath(n, u), d = 0; d < h.crds.length; d += 2) a.crds.push(h.crds[d] + l), a.crds.push(h.crds[d + 1]);
          for (o && a.cmds.push(o), d = 0; d < h.cmds.length; d++) a.cmds.push(h.cmds[d]);
          o && a.cmds.push("X"), l += n.hmtx.aWidth[u], c < i.length - 1 && (l += e.U.getPairAdjustment(n, u, f));
        }
      }
      return a;
    }, e.U.P = {}, e.U.P.moveTo = function(n, i, o) {
      n.cmds.push("M"), n.crds.push(i, o);
    }, e.U.P.lineTo = function(n, i, o) {
      n.cmds.push("L"), n.crds.push(i, o);
    }, e.U.P.curveTo = function(n, i, o, a, l, c, u) {
      n.cmds.push("C"), n.crds.push(i, o, a, l, c, u);
    }, e.U.P.qcurveTo = function(n, i, o, a, l) {
      n.cmds.push("Q"), n.crds.push(i, o, a, l);
    }, e.U.P.closePath = function(n) {
      n.cmds.push("Z");
    }, e.U._drawCFF = function(n, i, o, a, l) {
      for (var c = i.stack, u = i.nStems, f = i.haveWidth, h = i.width, d = i.open, _ = 0, v = i.x, p = i.y, m = 0, y = 0, g = 0, A = 0, w = 0, T = 0, S = 0, C = 0, z = 0, x = 0, R = { val: 0, size: 0 }; _ < n.length; ) {
        e.CFF.getCharString(n, _, R);
        var L = R.val;
        if (_ += R.size, L == "o1" || L == "o18") c.length % 2 != 0 && !f && (h = c.shift() + a.nominalWidthX), u += c.length >> 1, c.length = 0, f = !0;
        else if (L == "o3" || L == "o23")
          c.length % 2 != 0 && !f && (h = c.shift() + a.nominalWidthX), u += c.length >> 1, c.length = 0, f = !0;
        else if (L == "o4") c.length > 1 && !f && (h = c.shift() + a.nominalWidthX, f = !0), d && e.U.P.closePath(l), p += c.pop(), e.U.P.moveTo(l, v, p), d = !0;
        else if (L == "o5") for (; c.length > 0; ) v += c.shift(), p += c.shift(), e.U.P.lineTo(l, v, p);
        else if (L == "o6" || L == "o7") for (var k = c.length, P = L == "o6", W = 0; W < k; W++) {
          var O = c.shift();
          P ? v += O : p += O, P = !P, e.U.P.lineTo(l, v, p);
        }
        else if (L == "o8" || L == "o24") {
          k = c.length;
          for (var Y = 0; Y + 6 <= k; ) m = v + c.shift(), y = p + c.shift(), g = m + c.shift(), A = y + c.shift(), v = g + c.shift(), p = A + c.shift(), e.U.P.curveTo(l, m, y, g, A, v, p), Y += 6;
          L == "o24" && (v += c.shift(), p += c.shift(), e.U.P.lineTo(l, v, p));
        } else {
          if (L == "o11") break;
          if (L == "o1234" || L == "o1235" || L == "o1236" || L == "o1237") L == "o1234" && (y = p, g = (m = v + c.shift()) + c.shift(), x = A = y + c.shift(), T = A, C = p, v = (S = (w = (z = g + c.shift()) + c.shift()) + c.shift()) + c.shift(), e.U.P.curveTo(l, m, y, g, A, z, x), e.U.P.curveTo(l, w, T, S, C, v, p)), L == "o1235" && (m = v + c.shift(), y = p + c.shift(), g = m + c.shift(), A = y + c.shift(), z = g + c.shift(), x = A + c.shift(), w = z + c.shift(), T = x + c.shift(), S = w + c.shift(), C = T + c.shift(), v = S + c.shift(), p = C + c.shift(), c.shift(), e.U.P.curveTo(l, m, y, g, A, z, x), e.U.P.curveTo(l, w, T, S, C, v, p)), L == "o1236" && (m = v + c.shift(), y = p + c.shift(), g = m + c.shift(), x = A = y + c.shift(), T = A, S = (w = (z = g + c.shift()) + c.shift()) + c.shift(), C = T + c.shift(), v = S + c.shift(), e.U.P.curveTo(l, m, y, g, A, z, x), e.U.P.curveTo(l, w, T, S, C, v, p)), L == "o1237" && (m = v + c.shift(), y = p + c.shift(), g = m + c.shift(), A = y + c.shift(), z = g + c.shift(), x = A + c.shift(), w = z + c.shift(), T = x + c.shift(), S = w + c.shift(), C = T + c.shift(), Math.abs(S - v) > Math.abs(C - p) ? v = S + c.shift() : p = C + c.shift(), e.U.P.curveTo(l, m, y, g, A, z, x), e.U.P.curveTo(l, w, T, S, C, v, p));
          else if (L == "o14") {
            if (c.length > 0 && !f && (h = c.shift() + o.nominalWidthX, f = !0), c.length == 4) {
              var b = c.shift(), G = c.shift(), X = c.shift(), U = c.shift(), V = e.CFF.glyphBySE(o, X), K = e.CFF.glyphBySE(o, U);
              e.U._drawCFF(o.CharStrings[V], i, o, a, l), i.x = b, i.y = G, e.U._drawCFF(o.CharStrings[K], i, o, a, l);
            }
            d && (e.U.P.closePath(l), d = !1);
          } else if (L == "o19" || L == "o20")
            c.length % 2 != 0 && !f && (h = c.shift() + a.nominalWidthX), u += c.length >> 1, c.length = 0, f = !0, _ += u + 7 >> 3;
          else if (L == "o21") c.length > 2 && !f && (h = c.shift() + a.nominalWidthX, f = !0), p += c.pop(), v += c.pop(), d && e.U.P.closePath(l), e.U.P.moveTo(l, v, p), d = !0;
          else if (L == "o22") c.length > 1 && !f && (h = c.shift() + a.nominalWidthX, f = !0), v += c.pop(), d && e.U.P.closePath(l), e.U.P.moveTo(l, v, p), d = !0;
          else if (L == "o25") {
            for (; c.length > 6; ) v += c.shift(), p += c.shift(), e.U.P.lineTo(l, v, p);
            m = v + c.shift(), y = p + c.shift(), g = m + c.shift(), A = y + c.shift(), v = g + c.shift(), p = A + c.shift(), e.U.P.curveTo(l, m, y, g, A, v, p);
          } else if (L == "o26") for (c.length % 2 && (v += c.shift()); c.length > 0; ) m = v, y = p + c.shift(), v = g = m + c.shift(), p = (A = y + c.shift()) + c.shift(), e.U.P.curveTo(l, m, y, g, A, v, p);
          else if (L == "o27") for (c.length % 2 && (p += c.shift()); c.length > 0; ) y = p, g = (m = v + c.shift()) + c.shift(), A = y + c.shift(), v = g + c.shift(), p = A, e.U.P.curveTo(l, m, y, g, A, v, p);
          else if (L == "o10" || L == "o29") {
            var I = L == "o10" ? a : o;
            if (c.length == 0) console.debug("error: empty stack");
            else {
              var B = c.pop(), Q = I.Subrs[B + I.Bias];
              i.x = v, i.y = p, i.nStems = u, i.haveWidth = f, i.width = h, i.open = d, e.U._drawCFF(Q, i, o, a, l), v = i.x, p = i.y, u = i.nStems, f = i.haveWidth, h = i.width, d = i.open;
            }
          } else if (L == "o30" || L == "o31") {
            var ee = c.length, q = (Y = 0, L == "o31");
            for (Y += ee - (k = -3 & ee); Y < k; ) q ? (y = p, g = (m = v + c.shift()) + c.shift(), p = (A = y + c.shift()) + c.shift(), k - Y == 5 ? (v = g + c.shift(), Y++) : v = g, q = !1) : (m = v, y = p + c.shift(), g = m + c.shift(), A = y + c.shift(), v = g + c.shift(), k - Y == 5 ? (p = A + c.shift(), Y++) : p = A, q = !0), e.U.P.curveTo(l, m, y, g, A, v, p), Y += 4;
          } else {
            if ((L + "").charAt(0) == "o") throw console.debug("Unknown operation: " + L, n), L;
            c.push(L);
          }
        }
      }
      i.x = v, i.y = p, i.nStems = u, i.haveWidth = f, i.width = h, i.open = d;
    };
    var t = e, r = { Typr: t };
    return s.Typr = t, s.default = r, Object.defineProperty(s, "__esModule", { value: !0 }), s;
  }({}).Typr;
}
/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/
function dp() {
  return function(s) {
    var e = Uint8Array, t = Uint16Array, r = Uint32Array, n = new e([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), i = new e([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), o = new e([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), a = function(L, k) {
      for (var P = new t(31), W = 0; W < 31; ++W) P[W] = k += 1 << L[W - 1];
      var O = new r(P[30]);
      for (W = 1; W < 30; ++W) for (var Y = P[W]; Y < P[W + 1]; ++Y) O[Y] = Y - P[W] << 5 | W;
      return [P, O];
    }, l = a(n, 2), c = l[0], u = l[1];
    c[28] = 258, u[258] = 28;
    for (var f = a(i, 0)[0], h = new t(32768), d = 0; d < 32768; ++d) {
      var _ = (43690 & d) >>> 1 | (21845 & d) << 1;
      _ = (61680 & (_ = (52428 & _) >>> 2 | (13107 & _) << 2)) >>> 4 | (3855 & _) << 4, h[d] = ((65280 & _) >>> 8 | (255 & _) << 8) >>> 1;
    }
    var v = function(L, k, P) {
      for (var W = L.length, O = 0, Y = new t(k); O < W; ++O) ++Y[L[O] - 1];
      var b, G = new t(k);
      for (O = 0; O < k; ++O) G[O] = G[O - 1] + Y[O - 1] << 1;
      {
        b = new t(1 << k);
        var X = 15 - k;
        for (O = 0; O < W; ++O) if (L[O]) for (var U = O << 4 | L[O], V = k - L[O], K = G[L[O] - 1]++ << V, I = K | (1 << V) - 1; K <= I; ++K) b[h[K] >>> X] = U;
      }
      return b;
    }, p = new e(288);
    for (d = 0; d < 144; ++d) p[d] = 8;
    for (d = 144; d < 256; ++d) p[d] = 9;
    for (d = 256; d < 280; ++d) p[d] = 7;
    for (d = 280; d < 288; ++d) p[d] = 8;
    var m = new e(32);
    for (d = 0; d < 32; ++d) m[d] = 5;
    var y = v(p, 9), g = v(m, 5), A = function(L) {
      for (var k = L[0], P = 1; P < L.length; ++P) L[P] > k && (k = L[P]);
      return k;
    }, w = function(L, k, P) {
      var W = k / 8 | 0;
      return (L[W] | L[W + 1] << 8) >> (7 & k) & P;
    }, T = function(L, k) {
      var P = k / 8 | 0;
      return (L[P] | L[P + 1] << 8 | L[P + 2] << 16) >> (7 & k);
    }, S = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"], C = function(L, k, P) {
      var W = new Error(k || S[L]);
      if (W.code = L, Error.captureStackTrace && Error.captureStackTrace(W, C), !P) throw W;
      return W;
    }, z = function(L, k, P) {
      var W = L.length;
      if (!W || P && !P.l && W < 5) return k || new e(0);
      var O = !k || P, Y = !P || P.i;
      P || (P = {}), k || (k = new e(3 * W));
      var b, G = function(xe) {
        var Ae = k.length;
        if (xe > Ae) {
          var Ce = new e(Math.max(2 * Ae, xe));
          Ce.set(k), k = Ce;
        }
      }, X = P.f || 0, U = P.p || 0, V = P.b || 0, K = P.l, I = P.d, B = P.m, Q = P.n, ee = 8 * W;
      do {
        if (!K) {
          P.f = X = w(L, U, 1);
          var q = w(L, U + 1, 3);
          if (U += 3, !q) {
            var te = L[(we = ((b = U) / 8 | 0) + (7 & b && 1) + 4) - 4] | L[we - 3] << 8, de = we + te;
            if (de > W) {
              Y && C(0);
              break;
            }
            O && G(V + te), k.set(L.subarray(we, de), V), P.b = V += te, P.p = U = 8 * de;
            continue;
          }
          if (q == 1) K = y, I = g, B = 9, Q = 5;
          else if (q == 2) {
            var le = w(L, U, 31) + 257, F = w(L, U + 10, 15) + 4, Ue = le + w(L, U + 5, 31) + 1;
            U += 14;
            for (var _e = new e(Ue), pe = new e(19), ue = 0; ue < F; ++ue) pe[o[ue]] = w(L, U + 3 * ue, 7);
            U += 3 * F;
            var Me = A(pe), ce = (1 << Me) - 1, ve = v(pe, Me);
            for (ue = 0; ue < Ue; ) {
              var we, E = ve[w(L, U, ce)];
              if (U += 15 & E, (we = E >>> 4) < 16) _e[ue++] = we;
              else {
                var M = 0, N = 0;
                for (we == 16 ? (N = 3 + w(L, U, 3), U += 2, M = _e[ue - 1]) : we == 17 ? (N = 3 + w(L, U, 7), U += 3) : we == 18 && (N = 11 + w(L, U, 127), U += 7); N--; ) _e[ue++] = M;
              }
            }
            var Z = _e.subarray(0, le), $ = _e.subarray(le);
            B = A(Z), Q = A($), K = v(Z, B), I = v($, Q);
          } else C(1);
          if (U > ee) {
            Y && C(0);
            break;
          }
        }
        O && G(V + 131072);
        for (var oe = (1 << B) - 1, Se = (1 << Q) - 1, ye = U; ; ye = U) {
          var se = (M = K[T(L, U) & oe]) >>> 4;
          if ((U += 15 & M) > ee) {
            Y && C(0);
            break;
          }
          if (M || C(2), se < 256) k[V++] = se;
          else {
            if (se == 256) {
              ye = U, K = null;
              break;
            }
            var he = se - 254;
            if (se > 264) {
              var Ne = n[ue = se - 257];
              he = w(L, U, (1 << Ne) - 1) + c[ue], U += Ne;
            }
            var ge = I[T(L, U) & Se], Be = ge >>> 4;
            if (ge || C(3), U += 15 & ge, $ = f[Be], Be > 3 && (Ne = i[Be], $ += T(L, U) & (1 << Ne) - 1, U += Ne), U > ee) {
              Y && C(0);
              break;
            }
            O && G(V + 131072);
            for (var Pe = V + he; V < Pe; V += 4) k[V] = k[V - $], k[V + 1] = k[V + 1 - $], k[V + 2] = k[V + 2 - $], k[V + 3] = k[V + 3 - $];
            V = Pe;
          }
        }
        P.l = K, P.p = ye, P.b = V, K && (X = 1, P.m = B, P.d = I, P.n = Q);
      } while (!X);
      return V == k.length ? k : function(xe, Ae, Ce) {
        (Ce == null || Ce > xe.length) && (Ce = xe.length);
        var ke = new (xe instanceof t ? t : xe instanceof r ? r : e)(Ce - Ae);
        return ke.set(xe.subarray(Ae, Ce)), ke;
      }(k, 0, V);
    }, x = new e(0), R = typeof TextDecoder < "u" && new TextDecoder();
    try {
      R.decode(x, { stream: !0 });
    } catch {
    }
    return s.convert_streams = function(L) {
      var k = new DataView(L), P = 0;
      function W() {
        var le = k.getUint16(P);
        return P += 2, le;
      }
      function O() {
        var le = k.getUint32(P);
        return P += 4, le;
      }
      function Y(le) {
        te.setUint16(de, le), de += 2;
      }
      function b(le) {
        te.setUint32(de, le), de += 4;
      }
      for (var G = { signature: O(), flavor: O(), length: O(), numTables: W(), reserved: W(), totalSfntSize: O(), majorVersion: W(), minorVersion: W(), metaOffset: O(), metaLength: O(), metaOrigLength: O(), privOffset: O(), privLength: O() }, X = 0; Math.pow(2, X) <= G.numTables; ) X++;
      X--;
      for (var U = 16 * Math.pow(2, X), V = 16 * G.numTables - U, K = 12, I = [], B = 0; B < G.numTables; B++) I.push({ tag: O(), offset: O(), compLength: O(), origLength: O(), origChecksum: O() }), K += 16;
      var Q, ee = new Uint8Array(12 + 16 * I.length + I.reduce(function(le, F) {
        return le + F.origLength + 4;
      }, 0)), q = ee.buffer, te = new DataView(q), de = 0;
      return b(G.flavor), Y(G.numTables), Y(U), Y(X), Y(V), I.forEach(function(le) {
        b(le.tag), b(le.origChecksum), b(K), b(le.origLength), le.outOffset = K, (K += le.origLength) % 4 != 0 && (K += 4 - K % 4);
      }), I.forEach(function(le) {
        var F, Ue = L.slice(le.offset, le.offset + le.compLength);
        if (le.compLength != le.origLength) {
          var _e = new Uint8Array(le.origLength);
          F = new Uint8Array(Ue, 2), z(F, _e);
        } else _e = new Uint8Array(Ue);
        ee.set(_e, le.outOffset);
        var pe = 0;
        (K = le.outOffset + le.origLength) % 4 != 0 && (pe = 4 - K % 4), ee.set(new Uint8Array(pe).buffer, le.outOffset + le.origLength), Q = K + pe;
      }), q.slice(0, Q);
    }, Object.defineProperty(s, "__esModule", { value: !0 }), s;
  }({}).convert_streams;
}
function pp(s, e) {
  const t = {
    M: 2,
    L: 2,
    Q: 4,
    C: 6,
    Z: 0
  }, r = { C: "18g,ca,368,1kz", D: "17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v", R: "17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6", L: "x9u,jff,a,fd,jv", T: "4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n" }, n = 1, i = 2, o = 4, a = 8, l = 16, c = 32;
  let u;
  function f(S) {
    if (!u) {
      const C = {
        R: i,
        L: n,
        D: o,
        C: l,
        U: c,
        T: a
      };
      u = /* @__PURE__ */ new Map();
      for (let z in r) {
        let x = 0;
        r[z].split(",").forEach((R) => {
          let [L, k] = R.split("+");
          L = parseInt(L, 36), k = k ? parseInt(k, 36) : 0, u.set(x += L, C[z]);
          for (let P = k; P--; )
            u.set(++x, C[z]);
        });
      }
    }
    return u.get(S) || c;
  }
  const h = 1, d = 2, _ = 3, v = 4, p = [null, "isol", "init", "fina", "medi"];
  function m(S) {
    const C = new Uint8Array(S.length);
    let z = c, x = h, R = -1;
    for (let L = 0; L < S.length; L++) {
      const k = S.codePointAt(L);
      let P = f(k) | 0, W = h;
      P & a || (z & (n | o | l) ? P & (i | o | l) ? (W = _, (x === h || x === _) && C[R]++) : P & (n | c) && (x === d || x === v) && C[R]-- : z & (i | c) && (x === d || x === v) && C[R]--, x = C[L] = W, z = P, R = L, k > 65535 && L++);
    }
    return C;
  }
  function y(S, C) {
    const z = [];
    for (let R = 0; R < C.length; R++) {
      const L = C.codePointAt(R);
      L > 65535 && R++, z.push(s.U.codeToGlyph(S, L));
    }
    const x = S.GSUB;
    if (x) {
      const { lookupList: R, featureList: L } = x;
      let k;
      const P = /^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/, W = [];
      L.forEach((O) => {
        if (P.test(O.tag))
          for (let Y = 0; Y < O.tab.length; Y++) {
            if (W[O.tab[Y]]) continue;
            W[O.tab[Y]] = !0;
            const b = R[O.tab[Y]], G = /^(isol|init|fina|medi)$/.test(O.tag);
            G && !k && (k = m(C));
            for (let X = 0; X < z.length; X++)
              (!k || !G || p[k[X]] === O.tag) && s.U._applySubs(z, X, b, R);
          }
      });
    }
    return z;
  }
  function g(S, C) {
    const z = new Int16Array(C.length * 3);
    let x = 0;
    for (; x < C.length; x++) {
      const P = C[x];
      if (P === -1) continue;
      z[x * 3 + 2] = S.hmtx.aWidth[P];
      const W = S.GPOS;
      if (W) {
        const O = W.lookupList;
        for (let Y = 0; Y < O.length; Y++) {
          const b = O[Y];
          for (let G = 0; G < b.tabs.length; G++) {
            const X = b.tabs[G];
            if (b.ltype === 1) {
              if (s._lctf.coverageIndex(X.coverage, P) !== -1 && X.pos) {
                k(X.pos, x);
                break;
              }
            } else if (b.ltype === 2) {
              let U = null, V = R();
              if (V !== -1) {
                const K = s._lctf.coverageIndex(X.coverage, C[V]);
                if (K !== -1) {
                  if (X.fmt === 1) {
                    const I = X.pairsets[K];
                    for (let B = 0; B < I.length; B++)
                      I[B].gid2 === P && (U = I[B]);
                  } else if (X.fmt === 2) {
                    const I = s.U._getGlyphClass(C[V], X.classDef1), B = s.U._getGlyphClass(P, X.classDef2);
                    U = X.matrix[I][B];
                  }
                  if (U) {
                    U.val1 && k(U.val1, V), U.val2 && k(U.val2, x);
                    break;
                  }
                }
              }
            } else if (b.ltype === 4) {
              const U = s._lctf.coverageIndex(X.markCoverage, P);
              if (U !== -1) {
                const V = R(L), K = V === -1 ? -1 : s._lctf.coverageIndex(X.baseCoverage, C[V]);
                if (K !== -1) {
                  const I = X.markArray[U], B = X.baseArray[K][I.markClass];
                  z[x * 3] = B.x - I.x + z[V * 3] - z[V * 3 + 2], z[x * 3 + 1] = B.y - I.y + z[V * 3 + 1];
                  break;
                }
              }
            } else if (b.ltype === 6) {
              const U = s._lctf.coverageIndex(X.mark1Coverage, P);
              if (U !== -1) {
                const V = R();
                if (V !== -1) {
                  const K = C[V];
                  if (A(S, K) === 3) {
                    const I = s._lctf.coverageIndex(X.mark2Coverage, K);
                    if (I !== -1) {
                      const B = X.mark1Array[U], Q = X.mark2Array[I][B.markClass];
                      z[x * 3] = Q.x - B.x + z[V * 3] - z[V * 3 + 2], z[x * 3 + 1] = Q.y - B.y + z[V * 3 + 1];
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      } else if (S.kern && !S.cff) {
        const O = R();
        if (O !== -1) {
          const Y = S.kern.glyph1.indexOf(C[O]);
          if (Y !== -1) {
            const b = S.kern.rval[Y].glyph2.indexOf(P);
            b !== -1 && (z[O * 3 + 2] += S.kern.rval[Y].vals[b]);
          }
        }
      }
    }
    return z;
    function R(P) {
      for (let W = x - 1; W >= 0; W--)
        if (C[W] !== -1 && (!P || P(C[W])))
          return W;
      return -1;
    }
    function L(P) {
      return A(S, P) === 1;
    }
    function k(P, W) {
      for (let O = 0; O < 3; O++)
        z[W * 3 + O] += P[O] || 0;
    }
  }
  function A(S, C) {
    const z = S.GDEF && S.GDEF.glyphClassDef;
    return z ? s.U._getGlyphClass(C, z) : 0;
  }
  function w(...S) {
    for (let C = 0; C < S.length; C++)
      if (typeof S[C] == "number")
        return S[C];
  }
  function T(S) {
    const C = /* @__PURE__ */ Object.create(null), z = S["OS/2"], x = S.hhea, R = S.head.unitsPerEm, L = w(z && z.sTypoAscender, x && x.ascender, R), k = {
      unitsPerEm: R,
      ascender: L,
      descender: w(z && z.sTypoDescender, x && x.descender, 0),
      capHeight: w(z && z.sCapHeight, L),
      xHeight: w(z && z.sxHeight, L),
      lineGap: w(z && z.sTypoLineGap, x && x.lineGap),
      supportsCodePoint(P) {
        return s.U.codeToGlyph(S, P) > 0;
      },
      forEachGlyph(P, W, O, Y) {
        let b = 0;
        const G = 1 / k.unitsPerEm * W, X = y(S, P);
        let U = 0;
        const V = g(S, X);
        return X.forEach((K, I) => {
          if (K !== -1) {
            let B = C[K];
            if (!B) {
              const { cmds: Q, crds: ee } = s.U.glyphToPath(S, K);
              let q = "", te = 0;
              for (let _e = 0, pe = Q.length; _e < pe; _e++) {
                const ue = t[Q[_e]];
                q += Q[_e];
                for (let Me = 1; Me <= ue; Me++)
                  q += (Me > 1 ? "," : "") + ee[te++];
              }
              let de, le, F, Ue;
              if (ee.length) {
                de = le = 1 / 0, F = Ue = -1 / 0;
                for (let _e = 0, pe = ee.length; _e < pe; _e += 2) {
                  let ue = ee[_e], Me = ee[_e + 1];
                  ue < de && (de = ue), Me < le && (le = Me), ue > F && (F = ue), Me > Ue && (Ue = Me);
                }
              } else
                de = F = le = Ue = 0;
              B = C[K] = {
                index: K,
                advanceWidth: S.hmtx.aWidth[K],
                xMin: de,
                yMin: le,
                xMax: F,
                yMax: Ue,
                path: q
              };
            }
            Y.call(
              null,
              B,
              b + V[I * 3] * G,
              V[I * 3 + 1] * G,
              U
            ), b += V[I * 3 + 2] * G, O && (b += O * W);
          }
          U += P.codePointAt(U) > 65535 ? 2 : 1;
        }), b;
      }
    };
    return k;
  }
  return function(C) {
    const z = new Uint8Array(C, 0, 4), x = s._bin.readASCII(z, 0, 4);
    if (x === "wOFF")
      C = e(C);
    else if (x === "wOF2")
      throw new Error("woff2 fonts not supported");
    return T(s.parse(C)[0]);
  };
}
const mp = /* @__PURE__ */ Ri({
  name: "Typr Font Parser",
  dependencies: [hp, dp, pp],
  init(s, e, t) {
    const r = s(), n = e();
    return t(r, n);
  }
});
/*!
Custom bundle of @unicode-font-resolver/client v1.0.2 (https://github.com/lojjic/unicode-font-resolver)
for use in Troika text rendering. 
Original MIT license applies
*/
function _p() {
  return function(s) {
    var e = function() {
      this.buckets = /* @__PURE__ */ new Map();
    };
    e.prototype.add = function(g) {
      var A = g >> 5;
      this.buckets.set(A, (this.buckets.get(A) || 0) | 1 << (31 & g));
    }, e.prototype.has = function(g) {
      var A = this.buckets.get(g >> 5);
      return A !== void 0 && (A & 1 << (31 & g)) != 0;
    }, e.prototype.serialize = function() {
      var g = [];
      return this.buckets.forEach(function(A, w) {
        g.push((+w).toString(36) + ":" + A.toString(36));
      }), g.join(",");
    }, e.prototype.deserialize = function(g) {
      var A = this;
      this.buckets.clear(), g.split(",").forEach(function(w) {
        var T = w.split(":");
        A.buckets.set(parseInt(T[0], 36), parseInt(T[1], 36));
      });
    };
    var t = Math.pow(2, 8), r = t - 1, n = ~r;
    function i(g) {
      var A = function(T) {
        return T & n;
      }(g).toString(16), w = function(T) {
        return (T & n) + t - 1;
      }(g).toString(16);
      return "codepoint-index/plane" + (g >> 16) + "/" + A + "-" + w + ".json";
    }
    function o(g, A) {
      var w = g & r, T = A.codePointAt(w / 6 | 0);
      return ((T = (T || 48) - 48) & 1 << w % 6) != 0;
    }
    function a(g, A) {
      var w;
      (w = g, w.replace(/U\+/gi, "").replace(/^,+|,+$/g, "").split(/,+/).map(function(T) {
        return T.split("-").map(function(S) {
          return parseInt(S.trim(), 16);
        });
      })).forEach(function(T) {
        var S = T[0], C = T[1];
        C === void 0 && (C = S), A(S, C);
      });
    }
    function l(g, A) {
      a(g, function(w, T) {
        for (var S = w; S <= T; S++) A(S);
      });
    }
    var c = {}, u = {}, f = /* @__PURE__ */ new WeakMap(), h = "https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";
    function d(g) {
      var A = f.get(g);
      return A || (A = new e(), l(g.ranges, function(w) {
        return A.add(w);
      }), f.set(g, A)), A;
    }
    var _, v = /* @__PURE__ */ new Map();
    function p(g, A, w) {
      return g[A] ? A : g[w] ? w : function(T) {
        for (var S in T) return S;
      }(g);
    }
    function m(g, A) {
      var w = A;
      if (!g.includes(w)) {
        w = 1 / 0;
        for (var T = 0; T < g.length; T++) Math.abs(g[T] - A) < Math.abs(w - A) && (w = g[T]);
      }
      return w;
    }
    function y(g) {
      return _ || (_ = /* @__PURE__ */ new Set(), l("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000", function(A) {
        _.add(A);
      })), _.has(g);
    }
    return s.CodePointSet = e, s.clearCache = function() {
      c = {}, u = {};
    }, s.getFontsForString = function(g, A) {
      A === void 0 && (A = {});
      var w, T = A.lang;
      T === void 0 && (T = /\p{Script=Hangul}/u.test(w = g) ? "ko" : /\p{Script=Hiragana}|\p{Script=Katakana}/u.test(w) ? "ja" : "en");
      var S = A.category;
      S === void 0 && (S = "sans-serif");
      var C = A.style;
      C === void 0 && (C = "normal");
      var z = A.weight;
      z === void 0 && (z = 400);
      var x = (A.dataUrl || h).replace(/\/$/g, ""), R = /* @__PURE__ */ new Map(), L = new Uint8Array(g.length), k = {}, P = {}, W = new Array(g.length), O = /* @__PURE__ */ new Map(), Y = !1;
      function b(U) {
        var V = v.get(U);
        return V || (V = fetch(x + "/" + U).then(function(K) {
          if (!K.ok) throw new Error(K.statusText);
          return K.json().then(function(I) {
            if (!Array.isArray(I) || I[0] !== 1) throw new Error("Incorrect schema version; need 1, got " + I[0]);
            return I[1];
          });
        }).catch(function(K) {
          if (x !== h) return Y || (console.error('unicode-font-resolver: Failed loading from dataUrl "' + x + '", trying default CDN. ' + K.message), Y = !0), x = h, v.delete(U), b(U);
          throw K;
        }), v.set(U, V)), V;
      }
      for (var G = function(U) {
        var V = g.codePointAt(U), K = i(V);
        W[U] = K, c[K] || O.has(K) || O.set(K, b(K).then(function(I) {
          c[K] = I;
        })), V > 65535 && (U++, X = U);
      }, X = 0; X < g.length; X++) G(X);
      return Promise.all(O.values()).then(function() {
        O.clear();
        for (var U = function(K) {
          var I = g.codePointAt(K), B = null, Q = c[W[K]], ee = void 0;
          for (var q in Q) {
            var te = P[q];
            if (te === void 0 && (te = P[q] = new RegExp(q).test(T || "en")), te) {
              for (var de in ee = q, Q[q]) if (o(I, Q[q][de])) {
                B = de;
                break;
              }
              break;
            }
          }
          if (!B) {
            e: for (var le in Q) if (le !== ee) {
              for (var F in Q[le]) if (o(I, Q[le][F])) {
                B = F;
                break e;
              }
            }
          }
          B || (console.debug("No font coverage for U+" + I.toString(16)), B = "latin"), W[K] = B, u[B] || O.has(B) || O.set(B, b("font-meta/" + B + ".json").then(function(Ue) {
            u[B] = Ue;
          })), I > 65535 && (K++, V = K);
        }, V = 0; V < g.length; V++) U(V);
        return Promise.all(O.values());
      }).then(function() {
        for (var U, V = null, K = 0; K < g.length; K++) {
          var I = g.codePointAt(K);
          if (V && (y(I) || d(V).has(I))) L[K] = L[K - 1];
          else {
            V = u[W[K]];
            var B = k[V.id];
            if (!B) {
              var Q = V.typeforms, ee = p(Q, S, "sans-serif"), q = p(Q[ee], C, "normal"), te = m((U = Q[ee]) === null || U === void 0 ? void 0 : U[q], z);
              B = k[V.id] = x + "/font-files/" + V.id + "/" + ee + "." + q + "." + te + ".woff";
            }
            var de = R.get(B);
            de == null && (de = R.size, R.set(B, de)), L[K] = de;
          }
          I > 65535 && (K++, L[K] = L[K - 1]);
        }
        return { fontUrls: Array.from(R.keys()), chars: L };
      });
    }, Object.defineProperty(s, "__esModule", { value: !0 }), s;
  }({});
}
function vp(s, e) {
  const t = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  function n(o, a) {
    const l = (c) => {
      console.error(`Failure loading font ${o}`, c);
    };
    try {
      const c = new XMLHttpRequest();
      c.open("get", o, !0), c.responseType = "arraybuffer", c.onload = function() {
        if (c.status >= 400)
          l(new Error(c.statusText));
        else if (c.status > 0)
          try {
            const u = s(c.response);
            u.src = o, a(u);
          } catch (u) {
            l(u);
          }
      }, c.onerror = l, c.send();
    } catch (c) {
      l(c);
    }
  }
  function i(o, a) {
    let l = t[o];
    l ? a(l) : r[o] ? r[o].push(a) : (r[o] = [a], n(o, (c) => {
      c.src = o, t[o] = c, r[o].forEach((u) => u(c)), delete r[o];
    }));
  }
  return function(o, a, {
    lang: l,
    fonts: c = [],
    style: u = "normal",
    weight: f = "normal",
    unicodeFontsURL: h
  } = {}) {
    const d = new Uint8Array(o.length), _ = [];
    o.length || y();
    const v = /* @__PURE__ */ new Map(), p = [];
    if (u !== "italic" && (u = "normal"), typeof f != "number" && (f = f === "bold" ? 700 : 400), c && !Array.isArray(c) && (c = [c]), c = c.slice().filter((A) => !A.lang || A.lang.test(l)).reverse(), c.length) {
      let S = 0;
      (function C(z = 0) {
        for (let x = z, R = o.length; x < R; x++) {
          const L = o.codePointAt(x);
          if (S === 1 && _[d[x - 1]].supportsCodePoint(L) || x > 0 && /\s/.test(o[x]))
            d[x] = d[x - 1], S === 2 && (p[p.length - 1][1] = x);
          else
            for (let k = d[x], P = c.length; k <= P; k++)
              if (k === P) {
                const W = S === 2 ? p[p.length - 1] : p[p.length] = [x, x];
                W[1] = x, S = 2;
              } else {
                d[x] = k;
                const { src: W, unicodeRange: O } = c[k];
                if (!O || g(L, O)) {
                  const Y = t[W];
                  if (!Y) {
                    i(W, () => {
                      C(x);
                    });
                    return;
                  }
                  if (Y.supportsCodePoint(L)) {
                    let b = v.get(Y);
                    typeof b != "number" && (b = _.length, _.push(Y), v.set(Y, b)), d[x] = b, S = 1;
                    break;
                  }
                }
              }
          L > 65535 && x + 1 < R && (d[x + 1] = d[x], x++, S === 2 && (p[p.length - 1][1] = x));
        }
        m();
      })();
    } else
      p.push([0, o.length - 1]), m();
    function m() {
      if (p.length) {
        const A = p.map((w) => o.substring(w[0], w[1] + 1)).join(`
`);
        e.getFontsForString(A, {
          lang: l || void 0,
          style: u,
          weight: f,
          dataUrl: h
        }).then(({ fontUrls: w, chars: T }) => {
          const S = _.length;
          let C = 0;
          p.forEach((x) => {
            for (let R = 0, L = x[1] - x[0]; R <= L; R++)
              d[x[0] + R] = T[C++] + S;
            C++;
          });
          let z = 0;
          w.forEach((x, R) => {
            i(x, (L) => {
              _[R + S] = L, ++z === w.length && y();
            });
          });
        });
      } else
        y();
    }
    function y() {
      a({
        chars: d,
        fonts: _
      });
    }
    function g(A, w) {
      for (let T = 0; T < w.length; T++) {
        const [S, C = S] = w[T];
        if (S <= A && A <= C)
          return !0;
      }
      return !1;
    }
  };
}
const gp = /* @__PURE__ */ Ri({
  name: "FontResolver",
  dependencies: [
    vp,
    mp,
    _p
  ],
  init(s, e, t) {
    return s(e, t());
  }
});
function xp(s, e) {
  const r = /[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/, n = "[^\\S\\u00A0]", i = new RegExp(`${n}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);
  function o({ text: _, lang: v, fonts: p, style: m, weight: y, preResolvedFonts: g, unicodeFontsURL: A }, w) {
    const T = ({ chars: S, fonts: C }) => {
      let z, x;
      const R = [];
      for (let L = 0; L < S.length; L++)
        S[L] !== x ? (x = S[L], R.push(z = { start: L, end: L, fontObj: C[S[L]] })) : z.end = L;
      w(R);
    };
    g ? T(g) : s(
      _,
      T,
      { lang: v, fonts: p, style: m, weight: y, unicodeFontsURL: A }
    );
  }
  function a({
    text: _ = "",
    font: v,
    lang: p,
    sdfGlyphSize: m = 64,
    fontSize: y = 400,
    fontWeight: g = 1,
    fontStyle: A = "normal",
    letterSpacing: w = 0,
    lineHeight: T = "normal",
    maxWidth: S = 1 / 0,
    direction: C,
    textAlign: z = "left",
    textIndent: x = 0,
    whiteSpace: R = "normal",
    overflowWrap: L = "normal",
    anchorX: k = 0,
    anchorY: P = 0,
    metricsOnly: W = !1,
    unicodeFontsURL: O,
    preResolvedFonts: Y = null,
    includeCaretPositions: b = !1,
    chunkedBoundsSize: G = 8192,
    colorRanges: X = null
  }, U) {
    const V = f(), K = { fontLoad: 0, typesetting: 0 };
    _.indexOf("\r") > -1 && (console.info("Typesetter: got text with \\r chars; normalizing to \\n"), _ = _.replace(/\r\n/g, `
`).replace(/\r/g, `
`)), y = +y, w = +w, S = +S, T = T || "normal", x = +x, o({
      text: _,
      lang: p,
      style: A,
      weight: g,
      fonts: typeof v == "string" ? [{ src: v }] : v,
      unicodeFontsURL: O,
      preResolvedFonts: Y
    }, (I) => {
      K.fontLoad = f() - V;
      const B = isFinite(S);
      let Q = null, ee = null, q = null, te = null, de = null, le = null, F = null, Ue = null, _e = 0, pe = 0, ue = R !== "nowrap";
      const Me = /* @__PURE__ */ new Map(), ce = f();
      let ve = x, we = 0, E = new h();
      const M = [E];
      I.forEach((Se) => {
        const { fontObj: ye } = Se, { ascender: se, descender: he, unitsPerEm: Ne, lineGap: ge, capHeight: Be, xHeight: Pe } = ye;
        let xe = Me.get(ye);
        if (!xe) {
          const Le = y / Ne, H = T === "normal" ? (se - he + ge) * Le : T * y, Ee = (H - (se - he) * Le) / 2, j = Math.min(H, (se - he) * Le), fe = (se + he) / 2 * Le + j / 2;
          xe = {
            index: Me.size,
            src: ye.src,
            fontObj: ye,
            fontSizeMult: Le,
            unitsPerEm: Ne,
            ascender: se * Le,
            descender: he * Le,
            capHeight: Be * Le,
            xHeight: Pe * Le,
            lineHeight: H,
            baseline: -Ee - se * Le,
            // baseline offset from top of line height
            // cap: -halfLeading - capHeight * fontSizeMult, // cap from top of line height
            // ex: -halfLeading - xHeight * fontSizeMult, // ex from top of line height
            caretTop: fe,
            caretBottom: fe - j
          }, Me.set(ye, xe);
        }
        const { fontSizeMult: Ae } = xe, Ce = _.slice(Se.start, Se.end + 1);
        let ke, Ie;
        ye.forEachGlyph(Ce, y, w, (Le, H, Ee, j) => {
          H += we, j += Se.start, ke = H, Ie = Le;
          const fe = _.charAt(j), Te = Le.advanceWidth * Ae, ze = E.count;
          let Oe;
          if ("isEmpty" in Le || (Le.isWhitespace = !!fe && new RegExp(n).test(fe), Le.canBreakAfter = !!fe && i.test(fe), Le.isEmpty = Le.xMin === Le.xMax || Le.yMin === Le.yMax || r.test(fe)), !Le.isWhitespace && !Le.isEmpty && pe++, ue && B && !Le.isWhitespace && H + Te + ve > S && ze) {
            if (E.glyphAt(ze - 1).glyphObj.canBreakAfter)
              Oe = new h(), ve = -H;
            else
              for (let it = ze; it--; )
                if (it === 0 && L === "break-word") {
                  Oe = new h(), ve = -H;
                  break;
                } else if (E.glyphAt(it).glyphObj.canBreakAfter) {
                  Oe = E.splitAt(it + 1);
                  const Ye = Oe.glyphAt(0).x;
                  ve -= Ye;
                  for (let et = Oe.count; et--; )
                    Oe.glyphAt(et).x -= Ye;
                  break;
                }
            Oe && (E.isSoftWrapped = !0, E = Oe, M.push(E), _e = S);
          }
          let Ke = E.glyphAt(E.count);
          Ke.glyphObj = Le, Ke.x = H + ve, Ke.y = Ee, Ke.width = Te, Ke.charIndex = j, Ke.fontData = xe, fe === `
` && (E = new h(), M.push(E), ve = -(H + Te + w * y) + x);
        }), we = ke + Ie.advanceWidth * Ae + w * y;
      });
      let N = 0;
      M.forEach((Se) => {
        let ye = !0;
        for (let se = Se.count; se--; ) {
          const he = Se.glyphAt(se);
          ye && !he.glyphObj.isWhitespace && (Se.width = he.x + he.width, Se.width > _e && (_e = Se.width), ye = !1);
          let { lineHeight: Ne, capHeight: ge, xHeight: Be, baseline: Pe } = he.fontData;
          Ne > Se.lineHeight && (Se.lineHeight = Ne);
          const xe = Pe - Se.baseline;
          xe < 0 && (Se.baseline += xe, Se.cap += xe, Se.ex += xe), Se.cap = Math.max(Se.cap, Se.baseline + ge), Se.ex = Math.max(Se.ex, Se.baseline + Be);
        }
        Se.baseline -= N, Se.cap -= N, Se.ex -= N, N += Se.lineHeight;
      });
      let Z = 0, $ = 0;
      if (k && (typeof k == "number" ? Z = -k : typeof k == "string" && (Z = -_e * (k === "left" ? 0 : k === "center" ? 0.5 : k === "right" ? 1 : c(k)))), P && (typeof P == "number" ? $ = -P : typeof P == "string" && ($ = P === "top" ? 0 : P === "top-baseline" ? -M[0].baseline : P === "top-cap" ? -M[0].cap : P === "top-ex" ? -M[0].ex : P === "middle" ? N / 2 : P === "bottom" ? N : P === "bottom-baseline" ? -M[M.length - 1].baseline : c(P) * N)), !W) {
        const Se = e.getEmbeddingLevels(_, C);
        Q = new Uint16Array(pe), ee = new Uint8Array(pe), q = new Float32Array(pe * 2), te = {}, F = [1 / 0, 1 / 0, -1 / 0, -1 / 0], Ue = [], b && (le = new Float32Array(_.length * 4)), X && (de = new Uint8Array(pe * 3));
        let ye = 0, se = -1, he = -1, Ne, ge;
        if (M.forEach((Be, Pe) => {
          let { count: xe, width: Ae } = Be;
          if (xe > 0) {
            let Ce = 0;
            for (let j = xe; j-- && Be.glyphAt(j).glyphObj.isWhitespace; )
              Ce++;
            let ke = 0, Ie = 0;
            if (z === "center")
              ke = (_e - Ae) / 2;
            else if (z === "right")
              ke = _e - Ae;
            else if (z === "justify" && Be.isSoftWrapped) {
              let j = 0;
              for (let fe = xe - Ce; fe--; )
                Be.glyphAt(fe).glyphObj.isWhitespace && j++;
              Ie = (_e - Ae) / j;
            }
            if (Ie || ke) {
              let j = 0;
              for (let fe = 0; fe < xe; fe++) {
                let Te = Be.glyphAt(fe);
                const ze = Te.glyphObj;
                Te.x += ke + j, Ie !== 0 && ze.isWhitespace && fe < xe - Ce && (j += Ie, Te.width += Ie);
              }
            }
            const Le = e.getReorderSegments(
              _,
              Se,
              Be.glyphAt(0).charIndex,
              Be.glyphAt(Be.count - 1).charIndex
            );
            for (let j = 0; j < Le.length; j++) {
              const [fe, Te] = Le[j];
              let ze = 1 / 0, Oe = -1 / 0;
              for (let Ke = 0; Ke < xe; Ke++)
                if (Be.glyphAt(Ke).charIndex >= fe) {
                  let it = Ke, Ye = Ke;
                  for (; Ye < xe; Ye++) {
                    let et = Be.glyphAt(Ye);
                    if (et.charIndex > Te)
                      break;
                    Ye < xe - Ce && (ze = Math.min(ze, et.x), Oe = Math.max(Oe, et.x + et.width));
                  }
                  for (let et = it; et < Ye; et++) {
                    const dt = Be.glyphAt(et);
                    dt.x = Oe - (dt.x + dt.width - ze);
                  }
                  break;
                }
            }
            let H;
            const Ee = (j) => H = j;
            for (let j = 0; j < xe; j++) {
              const fe = Be.glyphAt(j);
              H = fe.glyphObj;
              const Te = H.index, ze = Se.levels[fe.charIndex] & 1;
              if (ze) {
                const Oe = e.getMirroredCharacter(_[fe.charIndex]);
                Oe && fe.fontData.fontObj.forEachGlyph(Oe, 0, 0, Ee);
              }
              if (b) {
                const { charIndex: Oe, fontData: Ke } = fe, it = fe.x + Z, Ye = fe.x + fe.width + Z;
                le[Oe * 4] = ze ? Ye : it, le[Oe * 4 + 1] = ze ? it : Ye, le[Oe * 4 + 2] = Be.baseline + Ke.caretBottom + $, le[Oe * 4 + 3] = Be.baseline + Ke.caretTop + $;
                const et = Oe - se;
                et > 1 && u(le, se, et), se = Oe;
              }
              if (X) {
                const { charIndex: Oe } = fe;
                for (; Oe > he; )
                  he++, X.hasOwnProperty(he) && (ge = X[he]);
              }
              if (!H.isWhitespace && !H.isEmpty) {
                const Oe = ye++, { fontSizeMult: Ke, src: it, index: Ye } = fe.fontData, et = te[it] || (te[it] = {});
                et[Te] || (et[Te] = {
                  path: H.path,
                  pathBounds: [H.xMin, H.yMin, H.xMax, H.yMax]
                });
                const dt = fe.x + Z, Kt = fe.y + Be.baseline + $;
                q[Oe * 2] = dt, q[Oe * 2 + 1] = Kt;
                const Zt = dt + H.xMin * Ke, Gt = Kt + H.yMin * Ke, ln = dt + H.xMax * Ke, Lt = Kt + H.yMax * Ke;
                Zt < F[0] && (F[0] = Zt), Gt < F[1] && (F[1] = Gt), ln > F[2] && (F[2] = ln), Lt > F[3] && (F[3] = Lt), Oe % G === 0 && (Ne = { start: Oe, end: Oe, rect: [1 / 0, 1 / 0, -1 / 0, -1 / 0] }, Ue.push(Ne)), Ne.end++;
                const bt = Ne.rect;
                if (Zt < bt[0] && (bt[0] = Zt), Gt < bt[1] && (bt[1] = Gt), ln > bt[2] && (bt[2] = ln), Lt > bt[3] && (bt[3] = Lt), Q[Oe] = Te, ee[Oe] = Ye, X) {
                  const cn = Oe * 3;
                  de[cn] = ge >> 16 & 255, de[cn + 1] = ge >> 8 & 255, de[cn + 2] = ge & 255;
                }
              }
            }
          }
        }), le) {
          const Be = _.length - se;
          Be > 1 && u(le, se, Be);
        }
      }
      const oe = [];
      Me.forEach(({ index: Se, src: ye, unitsPerEm: se, ascender: he, descender: Ne, lineHeight: ge, capHeight: Be, xHeight: Pe }) => {
        oe[Se] = { src: ye, unitsPerEm: se, ascender: he, descender: Ne, lineHeight: ge, capHeight: Be, xHeight: Pe };
      }), K.typesetting = f() - ce, U({
        glyphIds: Q,
        //id for each glyph, specific to that glyph's font
        glyphFontIndices: ee,
        //index into fontData for each glyph
        glyphPositions: q,
        //x,y of each glyph's origin in layout
        glyphData: te,
        //dict holding data about each glyph appearing in the text
        fontData: oe,
        //data about each font used in the text
        caretPositions: le,
        //startX,endX,bottomY caret positions for each char
        // caretHeight, //height of cursor from bottom to top - todo per glyph?
        glyphColors: de,
        //color for each glyph, if color ranges supplied
        chunkedBounds: Ue,
        //total rects per (n=chunkedBoundsSize) consecutive glyphs
        fontSize: y,
        //calculated em height
        topBaseline: $ + M[0].baseline,
        //y coordinate of the top line's baseline
        blockBounds: [
          //bounds for the whole block of text, including vertical padding for lineHeight
          Z,
          $ - N,
          Z + _e,
          $
        ],
        visibleBounds: F,
        //total bounds of visible text paths, may be larger or smaller than blockBounds
        timings: K
      });
    });
  }
  function l(_, v) {
    a({ ..._, metricsOnly: !0 }, (p) => {
      const [m, y, g, A] = p.blockBounds;
      v({
        width: g - m,
        height: A - y
      });
    });
  }
  function c(_) {
    let v = _.match(/^([\d.]+)%$/), p = v ? parseFloat(v[1]) : NaN;
    return isNaN(p) ? 0 : p / 100;
  }
  function u(_, v, p) {
    const m = _[v * 4], y = _[v * 4 + 1], g = _[v * 4 + 2], A = _[v * 4 + 3], w = (y - m) / p;
    for (let T = 0; T < p; T++) {
      const S = (v + T) * 4;
      _[S] = m + w * T, _[S + 1] = m + w * (T + 1), _[S + 2] = g, _[S + 3] = A;
    }
  }
  function f() {
    return (self.performance || Date).now();
  }
  function h() {
    this.data = [];
  }
  const d = ["glyphObj", "x", "y", "width", "charIndex", "fontData"];
  return h.prototype = {
    width: 0,
    lineHeight: 0,
    baseline: 0,
    cap: 0,
    ex: 0,
    isSoftWrapped: !1,
    get count() {
      return Math.ceil(this.data.length / d.length);
    },
    glyphAt(_) {
      let v = h.flyweight;
      return v.data = this.data, v.index = _, v;
    },
    splitAt(_) {
      let v = new h();
      return v.data = this.data.splice(_ * d.length), v;
    }
  }, h.flyweight = d.reduce((_, v, p, m) => (Object.defineProperty(_, v, {
    get() {
      return this.data[this.index * d.length + p];
    },
    set(y) {
      this.data[this.index * d.length + p] = y;
    }
  }), _), { data: null, index: 0 }), {
    typeset: a,
    measure: l
  };
}
const Zn = () => (self.performance || Date).now(), Jr = /* @__PURE__ */ ll();
let yo;
function yp(s, e, t, r, n, i, o, a, l, c, u = !0) {
  return u ? Sp(s, e, t, r, n, i, o, a, l, c).then(
    null,
    (f) => (yo || (console.warn("WebGL SDF generation failed, falling back to JS", f), yo = !0), So(s, e, t, r, n, i, o, a, l, c))
  ) : So(s, e, t, r, n, i, o, a, l, c);
}
const Vr = [], bp = 5;
let Ys = 0;
function ul() {
  const s = Zn();
  for (; Vr.length && Zn() - s < bp; )
    Vr.shift()();
  Ys = Vr.length ? setTimeout(ul, 0) : 0;
}
const Sp = (...s) => new Promise((e, t) => {
  Vr.push(() => {
    const r = Zn();
    try {
      Jr.webgl.generateIntoCanvas(...s), e({ timing: Zn() - r });
    } catch (n) {
      t(n);
    }
  }), Ys || (Ys = setTimeout(ul, 0));
}), Mp = 4, Tp = 2e3, bo = {};
let Ep = 0;
function So(s, e, t, r, n, i, o, a, l, c) {
  const u = "TroikaTextSDFGenerator_JS_" + Ep++ % Mp;
  let f = bo[u];
  return f || (f = bo[u] = {
    workerModule: Ri({
      name: u,
      workerId: u,
      dependencies: [
        ll,
        Zn
      ],
      init(h, d) {
        const _ = h().javascript.generate;
        return function(...v) {
          const p = d();
          return {
            textureData: _(...v),
            timing: d() - p
          };
        };
      },
      getTransferables(h) {
        return [h.textureData.buffer];
      }
    }),
    requests: 0,
    idleTimer: null
  }), f.requests++, clearTimeout(f.idleTimer), f.workerModule(s, e, t, r, n, i).then(({ textureData: h, timing: d }) => {
    const _ = Zn(), v = new Uint8Array(h.length * 4);
    for (let p = 0; p < h.length; p++)
      v[p * 4 + c] = h[p];
    return Jr.webglUtils.renderImageData(o, v, a, l, s, e, 1 << 3 - c), d += Zn() - _, --f.requests === 0 && (f.idleTimer = setTimeout(() => {
      np(u);
    }, Tp)), { timing: d };
  });
}
function wp(s) {
  s._warm || (Jr.webgl.isSupported(s), s._warm = !0);
}
const Ap = Jr.webglUtils.resizeWebGLCanvasWithoutClearing, ji = {
  unicodeFontsURL: null,
  sdfGlyphSize: 64,
  sdfMargin: 1 / 16,
  sdfExponent: 9,
  textureWidth: 2048
}, Cp = /* @__PURE__ */ new me();
function vi() {
  return (self.performance || Date).now();
}
const Mo = /* @__PURE__ */ Object.create(null);
function Rp(s, e) {
  s = Dp({}, s);
  const t = vi(), r = [];
  if (s.font && r.push({ label: "user", src: Up(s.font) }), s.font = r, s.text = "" + s.text, s.sdfGlyphSize = s.sdfGlyphSize || ji.sdfGlyphSize, s.unicodeFontsURL = s.unicodeFontsURL || ji.unicodeFontsURL, s.colorRanges != null) {
    let h = {};
    for (let d in s.colorRanges)
      if (s.colorRanges.hasOwnProperty(d)) {
        let _ = s.colorRanges[d];
        typeof _ != "number" && (_ = Cp.set(_).getHex()), h[d] = _;
      }
    s.colorRanges = h;
  }
  Object.freeze(s);
  const { textureWidth: n, sdfExponent: i } = ji, { sdfGlyphSize: o } = s, a = n / o * 4;
  let l = Mo[o];
  if (!l) {
    const h = document.createElement("canvas");
    h.width = n, h.height = o * 256 / a, l = Mo[o] = {
      glyphCount: 0,
      sdfGlyphSize: o,
      sdfCanvas: h,
      sdfTexture: new Tt(
        h,
        void 0,
        void 0,
        void 0,
        1006,
        1006
      ),
      contextLost: !1,
      glyphsByFont: /* @__PURE__ */ new Map()
    }, l.sdfTexture.generateMipmaps = !1, Pp(l);
  }
  const { sdfTexture: c, sdfCanvas: u } = l;
  dl(s).then((h) => {
    const { glyphIds: d, glyphFontIndices: _, fontData: v, glyphPositions: p, fontSize: m, timings: y } = h, g = [], A = new Float32Array(d.length * 4);
    let w = 0, T = 0;
    const S = vi(), C = v.map((k) => {
      let P = l.glyphsByFont.get(k.src);
      return P || l.glyphsByFont.set(k.src, P = /* @__PURE__ */ new Map()), P;
    });
    d.forEach((k, P) => {
      const W = _[P], { src: O, unitsPerEm: Y } = v[W];
      let b = C[W].get(k);
      if (!b) {
        const { path: K, pathBounds: I } = h.glyphData[O][k], B = Math.max(I[2] - I[0], I[3] - I[1]) / o * (ji.sdfMargin * o + 0.5), Q = l.glyphCount++, ee = [
          I[0] - B,
          I[1] - B,
          I[2] + B,
          I[3] + B
        ];
        C[W].set(k, b = { path: K, atlasIndex: Q, sdfViewBox: ee }), g.push(b);
      }
      const { sdfViewBox: G } = b, X = p[T++], U = p[T++], V = m / Y;
      A[w++] = X + G[0] * V, A[w++] = U + G[1] * V, A[w++] = X + G[2] * V, A[w++] = U + G[3] * V, d[P] = b.atlasIndex;
    }), y.quads = (y.quads || 0) + (vi() - S);
    const z = vi();
    y.sdf = {};
    const x = u.height, R = Math.ceil(l.glyphCount / a), L = Math.pow(2, Math.ceil(Math.log2(R * o)));
    L > x && (console.info(`Increasing SDF texture size ${x}->${L}`), Ap(u, n, L), c.dispose()), Promise.all(g.map(
      (k) => fl(k, l, s.gpuAccelerateSDF).then(({ timing: P }) => {
        y.sdf[k.atlasIndex] = P;
      })
    )).then(() => {
      g.length && !l.contextLost && (hl(l), c.needsUpdate = !0), y.sdfTotal = vi() - z, y.total = vi() - t, e(Object.freeze({
        parameters: s,
        sdfTexture: c,
        sdfGlyphSize: o,
        sdfExponent: i,
        glyphBounds: A,
        glyphAtlasIndices: d,
        glyphColors: h.glyphColors,
        caretPositions: h.caretPositions,
        chunkedBounds: h.chunkedBounds,
        ascender: h.ascender,
        descender: h.descender,
        lineHeight: h.lineHeight,
        capHeight: h.capHeight,
        xHeight: h.xHeight,
        topBaseline: h.topBaseline,
        blockBounds: h.blockBounds,
        visibleBounds: h.visibleBounds,
        timings: h.timings
      }));
    });
  }), Promise.resolve().then(() => {
    l.contextLost || wp(u);
  });
}
function fl({ path: s, atlasIndex: e, sdfViewBox: t }, { sdfGlyphSize: r, sdfCanvas: n, contextLost: i }, o) {
  if (i)
    return Promise.resolve({ timing: -1 });
  const { textureWidth: a, sdfExponent: l } = ji, c = Math.max(t[2] - t[0], t[3] - t[1]), u = Math.floor(e / 4), f = u % (a / r) * r, h = Math.floor(u / (a / r)) * r, d = e % 4;
  return yp(r, r, s, t, c, l, n, f, h, d, o);
}
function Pp(s) {
  const e = s.sdfCanvas;
  e.addEventListener("webglcontextlost", (t) => {
    console.log("Context Lost", t), t.preventDefault(), s.contextLost = !0;
  }), e.addEventListener("webglcontextrestored", (t) => {
    console.log("Context Restored", t), s.contextLost = !1;
    const r = [];
    s.glyphsByFont.forEach((n) => {
      n.forEach((i) => {
        r.push(fl(i, s, !0));
      });
    }), Promise.all(r).then(() => {
      hl(s), s.sdfTexture.needsUpdate = !0;
    });
  });
}
function Dp(s, e) {
  for (let t in e)
    e.hasOwnProperty(t) && (s[t] = e[t]);
  return s;
}
let Or;
function Up(s) {
  return Or || (Or = typeof document > "u" ? {} : document.createElement("a")), Or.href = s, Or.href;
}
function hl(s) {
  if (typeof createImageBitmap != "function") {
    console.info("Safari<15: applying SDF canvas workaround");
    const { sdfCanvas: e, sdfTexture: t } = s, { width: r, height: n } = e, i = s.sdfCanvas.getContext("webgl");
    let o = t.image.data;
    (!o || o.length !== r * n * 4) && (o = new Uint8Array(r * n * 4), t.image = { width: r, height: n, data: o }, t.flipY = !1, t.isDataTexture = !0), i.readPixels(0, 0, r, n, i.RGBA, i.UNSIGNED_BYTE, o);
  }
}
const Lp = /* @__PURE__ */ Ri({
  name: "Typesetter",
  dependencies: [
    xp,
    gp,
    rp
  ],
  init(s, e, t) {
    return s(e, t());
  }
}), dl = /* @__PURE__ */ Ri({
  name: "Typesetter",
  dependencies: [
    Lp
  ],
  init(s) {
    return function(e) {
      return new Promise((t) => {
        s.typeset(e, t);
      });
    };
  },
  getTransferables(s) {
    const e = [];
    for (let t in s)
      s[t] && s[t].buffer && e.push(s[t].buffer);
    return e;
  }
});
dl.onMainThread;
const To = {};
function Fp(s) {
  let e = To[s];
  return e || (e = To[s] = new tt(1, 1, s, s).translate(0.5, 0.5, 0)), e;
}
const Ip = "aTroikaGlyphBounds", Eo = "aTroikaGlyphIndex", Np = "aTroikaGlyphColor";
class Op extends kd {
  constructor() {
    super(), this.detail = 1, this.curveRadius = 0, this.groups = [
      { start: 0, count: 1 / 0, materialIndex: 0 },
      { start: 0, count: 1 / 0, materialIndex: 1 }
    ], this.boundingSphere = new Qn(), this.boundingBox = new yn();
  }
  computeBoundingSphere() {
  }
  computeBoundingBox() {
  }
  set detail(e) {
    if (e !== this._detail) {
      this._detail = e, (typeof e != "number" || e < 1) && (e = 1);
      let t = Fp(e);
      ["position", "normal", "uv"].forEach((r) => {
        this.attributes[r] = t.attributes[r].clone();
      }), this.setIndex(t.getIndex().clone());
    }
  }
  get detail() {
    return this._detail;
  }
  set curveRadius(e) {
    e !== this._curveRadius && (this._curveRadius = e, this._updateBounds());
  }
  get curveRadius() {
    return this._curveRadius;
  }
  /**
   * Update the geometry for a new set of glyphs.
   * @param {Float32Array} glyphBounds - An array holding the planar bounds for all glyphs
   *        to be rendered, 4 entries for each glyph: x1,x2,y1,y1
   * @param {Float32Array} glyphAtlasIndices - An array holding the index of each glyph within
   *        the SDF atlas texture.
   * @param {Array} blockBounds - An array holding the [minX, minY, maxX, maxY] across all glyphs
   * @param {Array} [chunkedBounds] - An array of objects describing bounds for each chunk of N
   *        consecutive glyphs: `{start:N, end:N, rect:[minX, minY, maxX, maxY]}`. This can be
   *        used with `applyClipRect` to choose an optimized `instanceCount`.
   * @param {Uint8Array} [glyphColors] - An array holding r,g,b values for each glyph.
   */
  updateGlyphs(e, t, r, n, i) {
    this.updateAttributeData(Ip, e, 4), this.updateAttributeData(Eo, t, 1), this.updateAttributeData(Np, i, 3), this._blockBounds = r, this._chunkedBounds = n, this.instanceCount = t.length, this._updateBounds();
  }
  _updateBounds() {
    const e = this._blockBounds;
    if (e) {
      const { curveRadius: t, boundingBox: r } = this;
      if (t) {
        const { PI: n, floor: i, min: o, max: a, sin: l, cos: c } = Math, u = n / 2, f = n * 2, h = Math.abs(t), d = e[0] / h, _ = e[2] / h, v = i((d + u) / f) !== i((_ + u) / f) ? -h : o(l(d) * h, l(_) * h), p = i((d - u) / f) !== i((_ - u) / f) ? h : a(l(d) * h, l(_) * h), m = i((d + n) / f) !== i((_ + n) / f) ? h * 2 : a(h - c(d) * h, h - c(_) * h);
        r.min.set(v, e[1], t < 0 ? -m : 0), r.max.set(p, e[3], t < 0 ? 0 : m);
      } else
        r.min.set(e[0], e[1], 0), r.max.set(e[2], e[3], 0);
      r.getBoundingSphere(this.boundingSphere);
    }
  }
  /**
   * Given a clipping rect, and the chunkedBounds from the last updateGlyphs call, choose the lowest
   * `instanceCount` that will show all glyphs within the clipped view. This is an optimization
   * for long blocks of text that are clipped, to skip vertex shader evaluation for glyphs that would
   * be clipped anyway.
   *
   * Note that since `drawElementsInstanced[ANGLE]` only accepts an instance count and not a starting
   * offset, this optimization becomes less effective as the clipRect moves closer to the end of the
   * text block. We could fix that by switching from instancing to a full geometry with a drawRange,
   * but at the expense of much larger attribute buffers (see classdoc above.)
   *
   * @param {Vector4} clipRect
   */
  applyClipRect(e) {
    let t = this.getAttribute(Eo).count, r = this._chunkedBounds;
    if (r)
      for (let n = r.length; n--; ) {
        t = r[n].end;
        let i = r[n].rect;
        if (i[1] < e.w && i[3] > e.y && i[0] < e.z && i[2] > e.x)
          break;
      }
    this.instanceCount = t;
  }
  /**
   * Utility for updating instance attributes with automatic resizing
   */
  updateAttributeData(e, t, r) {
    const n = this.getAttribute(e);
    t ? n && n.array.length === t.length ? (n.array.set(t), n.needsUpdate = !0) : (this.setAttribute(e, new Kn(t, r)), delete this._maxInstanceCount, this.dispose()) : n && this.deleteAttribute(e);
  }
}
const Bp = `
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaEdgeOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`, zp = `
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaEdgeOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaEdgeOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);


float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`, Gp = `
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaEdgeOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`, kp = `
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaEdgeOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;
function Hp(s) {
  const e = qs(s, {
    chained: !0,
    extensions: {
      derivatives: !0
    },
    uniforms: {
      uTroikaSDFTexture: { value: null },
      uTroikaSDFTextureSize: { value: new De() },
      uTroikaSDFGlyphSize: { value: 0 },
      uTroikaSDFExponent: { value: 0 },
      uTroikaTotalBounds: { value: new vt(0, 0, 0, 0) },
      uTroikaClipRect: { value: new vt(0, 0, 0, 0) },
      uTroikaEdgeOffset: { value: 0 },
      uTroikaFillOpacity: { value: 1 },
      uTroikaPositionOffset: { value: new De() },
      uTroikaCurveRadius: { value: 0 },
      uTroikaBlurRadius: { value: 0 },
      uTroikaStrokeWidth: { value: 0 },
      uTroikaStrokeColor: { value: new me() },
      uTroikaStrokeOpacity: { value: 1 },
      uTroikaOrient: { value: new $e() },
      uTroikaUseGlyphColors: { value: !0 },
      uTroikaSDFDebug: { value: !1 }
    },
    vertexDefs: Bp,
    vertexTransform: zp,
    fragmentDefs: Gp,
    fragmentColorTransform: kp,
    customRewriter({ vertexShader: t, fragmentShader: r }) {
      let n = /\buniform\s+vec3\s+diffuse\b/;
      return n.test(r) && (r = r.replace(n, "varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g, "vTroikaGlyphColor"), n.test(t) || (t = t.replace(
        cl,
        `uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`
      ))), { vertexShader: t, fragmentShader: r };
    }
  });
  return e.transparent = !0, e.forceSinglePass = !0, Object.defineProperties(e, {
    isTroikaTextMaterial: { value: !0 },
    // WebGLShadowMap reverses the side of the shadow material by default, which fails
    // for planes, so here we force the `shadowSide` to always match the main side.
    shadowSide: {
      get() {
        return this.side;
      },
      set() {
      }
    }
  }), e;
}
const na = /* @__PURE__ */ new Jn({
  color: 16777215,
  side: 2,
  transparent: !0
}), wo = 8421504, Ao = /* @__PURE__ */ new ft(), Br = /* @__PURE__ */ new ne(), Bs = /* @__PURE__ */ new ne(), Yi = [], Vp = /* @__PURE__ */ new ne(), zs = "+x+y";
function Co(s) {
  return Array.isArray(s) ? s[0] : s;
}
let pl = () => {
  const s = new qe(
    new tt(1, 1),
    na
  );
  return pl = () => s, s;
}, ml = () => {
  const s = new qe(
    new tt(1, 1, 32, 1),
    na
  );
  return ml = () => s, s;
};
const Wp = { type: "syncstart" }, Xp = { type: "synccomplete" }, _l = [
  "font",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "lang",
  "letterSpacing",
  "lineHeight",
  "maxWidth",
  "overflowWrap",
  "text",
  "direction",
  "textAlign",
  "textIndent",
  "whiteSpace",
  "anchorX",
  "anchorY",
  "colorRanges",
  "sdfGlyphSize"
], qp = _l.concat(
  "material",
  "color",
  "depthOffset",
  "clipRect",
  "curveRadius",
  "orientation",
  "glyphGeometryDetail"
);
class fn extends qe {
  constructor() {
    const e = new Op();
    super(e, null), this.text = "", this.anchorX = 0, this.anchorY = 0, this.curveRadius = 0, this.direction = "auto", this.font = null, this.unicodeFontsURL = null, this.fontSize = 0.1, this.fontWeight = "normal", this.fontStyle = "normal", this.lang = null, this.letterSpacing = 0, this.lineHeight = "normal", this.maxWidth = 1 / 0, this.overflowWrap = "normal", this.textAlign = "left", this.textIndent = 0, this.whiteSpace = "normal", this.material = null, this.color = null, this.colorRanges = null, this.outlineWidth = 0, this.outlineColor = 0, this.outlineOpacity = 1, this.outlineBlur = 0, this.outlineOffsetX = 0, this.outlineOffsetY = 0, this.strokeWidth = 0, this.strokeColor = wo, this.strokeOpacity = 1, this.fillOpacity = 1, this.depthOffset = 0, this.clipRect = null, this.orientation = zs, this.glyphGeometryDetail = 1, this.sdfGlyphSize = null, this.gpuAccelerateSDF = !0, this.debugSDF = !1;
  }
  /**
   * Updates the text rendering according to the current text-related configuration properties.
   * This is an async process, so you can pass in a callback function to be executed when it
   * finishes.
   * @param {function} [callback]
   */
  sync(e) {
    this._needsSync && (this._needsSync = !1, this._isSyncing ? (this._queuedSyncs || (this._queuedSyncs = [])).push(e) : (this._isSyncing = !0, this.dispatchEvent(Wp), Rp({
      text: this.text,
      font: this.font,
      lang: this.lang,
      fontSize: this.fontSize || 0.1,
      fontWeight: this.fontWeight || "normal",
      fontStyle: this.fontStyle || "normal",
      letterSpacing: this.letterSpacing || 0,
      lineHeight: this.lineHeight || "normal",
      maxWidth: this.maxWidth,
      direction: this.direction || "auto",
      textAlign: this.textAlign,
      textIndent: this.textIndent,
      whiteSpace: this.whiteSpace,
      overflowWrap: this.overflowWrap,
      anchorX: this.anchorX,
      anchorY: this.anchorY,
      colorRanges: this.colorRanges,
      includeCaretPositions: !0,
      //TODO parameterize
      sdfGlyphSize: this.sdfGlyphSize,
      gpuAccelerateSDF: this.gpuAccelerateSDF,
      unicodeFontsURL: this.unicodeFontsURL
    }, (t) => {
      this._isSyncing = !1, this._textRenderInfo = t, this.geometry.updateGlyphs(
        t.glyphBounds,
        t.glyphAtlasIndices,
        t.blockBounds,
        t.chunkedBounds,
        t.glyphColors
      );
      const r = this._queuedSyncs;
      r && (this._queuedSyncs = null, this._needsSync = !0, this.sync(() => {
        r.forEach((n) => n && n());
      })), this.dispatchEvent(Xp), e && e();
    })));
  }
  /**
   * Initiate a sync if needed - note it won't complete until next frame at the
   * earliest so if possible it's a good idea to call sync() manually as soon as
   * all the properties have been set.
   * @override
   */
  onBeforeRender(e, t, r, n, i, o) {
    this.sync(), i.isTroikaTextMaterial && this._prepareForRender(i);
  }
  /**
   * Shortcut to dispose the geometry specific to this instance.
   * Note: we don't also dispose the derived material here because if anything else is
   * sharing the same base material it will result in a pause next frame as the program
   * is recompiled. Instead users can dispose the base material manually, like normal,
   * and we'll also dispose the derived material at that time.
   */
  dispose() {
    this.geometry.dispose();
  }
  /**
   * @property {TroikaTextRenderInfo|null} textRenderInfo
   * @readonly
   * The current processed rendering data for this TextMesh, returned by the TextBuilder after
   * a `sync()` call. This will be `null` initially, and may be stale for a short period until
   * the asynchrous `sync()` process completes.
   */
  get textRenderInfo() {
    return this._textRenderInfo || null;
  }
  /**
   * Create the text derived material from the base material. Can be overridden to use a custom
   * derived material.
   */
  createDerivedMaterial(e) {
    return Hp(e);
  }
  // Handler for automatically wrapping the base material with our upgrades. We do the wrapping
  // lazily on _read_ rather than write to avoid unnecessary wrapping on transient values.
  get material() {
    let e = this._derivedMaterial;
    const t = this._baseMaterial || this._defaultMaterial || (this._defaultMaterial = na.clone());
    if ((!e || !e.isDerivedFrom(t)) && (e = this._derivedMaterial = this.createDerivedMaterial(t), t.addEventListener("dispose", function r() {
      t.removeEventListener("dispose", r), e.dispose();
    })), this.hasOutline()) {
      let r = e._outlineMtl;
      return r || (r = e._outlineMtl = Object.create(e, {
        id: { value: e.id + 0.1 }
      }), r.isTextOutlineMaterial = !0, r.depthWrite = !1, r.map = null, e.addEventListener("dispose", function n() {
        e.removeEventListener("dispose", n), r.dispose();
      })), [
        r,
        e
      ];
    } else
      return e;
  }
  set material(e) {
    e && e.isTroikaTextMaterial ? (this._derivedMaterial = e, this._baseMaterial = e.baseMaterial) : this._baseMaterial = e;
  }
  hasOutline() {
    return !!(this.outlineWidth || this.outlineBlur || this.outlineOffsetX || this.outlineOffsetY);
  }
  get glyphGeometryDetail() {
    return this.geometry.detail;
  }
  set glyphGeometryDetail(e) {
    this.geometry.detail = e;
  }
  get curveRadius() {
    return this.geometry.curveRadius;
  }
  set curveRadius(e) {
    this.geometry.curveRadius = e;
  }
  // Create and update material for shadows upon request:
  get customDepthMaterial() {
    return Co(this.material).getDepthMaterial();
  }
  set customDepthMaterial(e) {
  }
  get customDistanceMaterial() {
    return Co(this.material).getDistanceMaterial();
  }
  set customDistanceMaterial(e) {
  }
  _prepareForRender(e) {
    const t = e.isTextOutlineMaterial, r = e.uniforms, n = this.textRenderInfo;
    if (n) {
      const { sdfTexture: a, blockBounds: l } = n;
      r.uTroikaSDFTexture.value = a, r.uTroikaSDFTextureSize.value.set(a.image.width, a.image.height), r.uTroikaSDFGlyphSize.value = n.sdfGlyphSize, r.uTroikaSDFExponent.value = n.sdfExponent, r.uTroikaTotalBounds.value.fromArray(l), r.uTroikaUseGlyphColors.value = !t && !!n.glyphColors;
      let c = 0, u = 0, f = 0, h, d, _, v = 0, p = 0;
      if (t) {
        let { outlineWidth: y, outlineOffsetX: g, outlineOffsetY: A, outlineBlur: w, outlineOpacity: T } = this;
        c = this._parsePercent(y) || 0, u = Math.max(0, this._parsePercent(w) || 0), h = T, v = this._parsePercent(g) || 0, p = this._parsePercent(A) || 0;
      } else
        f = Math.max(0, this._parsePercent(this.strokeWidth) || 0), f && (_ = this.strokeColor, r.uTroikaStrokeColor.value.set(_ ?? wo), d = this.strokeOpacity, d == null && (d = 1)), h = this.fillOpacity;
      r.uTroikaEdgeOffset.value = c, r.uTroikaPositionOffset.value.set(v, p), r.uTroikaBlurRadius.value = u, r.uTroikaStrokeWidth.value = f, r.uTroikaStrokeOpacity.value = d, r.uTroikaFillOpacity.value = h ?? 1, r.uTroikaCurveRadius.value = this.curveRadius || 0;
      let m = this.clipRect;
      if (m && Array.isArray(m) && m.length === 4)
        r.uTroikaClipRect.value.fromArray(m);
      else {
        const y = (this.fontSize || 0.1) * 100;
        r.uTroikaClipRect.value.set(
          l[0] - y,
          l[1] - y,
          l[2] + y,
          l[3] + y
        );
      }
      this.geometry.applyClipRect(r.uTroikaClipRect.value);
    }
    r.uTroikaSDFDebug.value = !!this.debugSDF, e.polygonOffset = !!this.depthOffset, e.polygonOffsetFactor = e.polygonOffsetUnits = this.depthOffset || 0;
    const i = t ? this.outlineColor || 0 : this.color;
    if (i == null)
      delete e.color;
    else {
      const a = e.hasOwnProperty("color") ? e.color : e.color = new me();
      (i !== a._input || typeof i == "object") && a.set(a._input = i);
    }
    let o = this.orientation || zs;
    if (o !== e._orientation) {
      let a = r.uTroikaOrient.value;
      o = o.replace(/[^-+xyz]/g, "");
      let l = o !== zs && o.match(/^([-+])([xyz])([-+])([xyz])$/);
      if (l) {
        let [, c, u, f, h] = l;
        Br.set(0, 0, 0)[u] = c === "-" ? 1 : -1, Bs.set(0, 0, 0)[h] = f === "-" ? -1 : 1, Ao.lookAt(Vp, Br.cross(Bs), Bs), a.setFromMatrix4(Ao);
      } else
        a.identity();
      e._orientation = o;
    }
  }
  _parsePercent(e) {
    if (typeof e == "string") {
      let t = e.match(/^(-?[\d.]+)%$/), r = t ? parseFloat(t[1]) : NaN;
      e = (isNaN(r) ? 0 : r / 100) * this.fontSize;
    }
    return e;
  }
  /**
   * Translate a point in local space to an x/y in the text plane.
   */
  localPositionToTextCoords(e, t = new De()) {
    t.copy(e);
    const r = this.curveRadius;
    return r && (t.x = Math.atan2(e.x, Math.abs(r) - Math.abs(e.z)) * Math.abs(r)), t;
  }
  /**
   * Translate a point in world space to an x/y in the text plane.
   */
  worldPositionToTextCoords(e, t = new De()) {
    return Br.copy(e), this.localPositionToTextCoords(this.worldToLocal(Br), t);
  }
  /**
   * @override Custom raycasting to test against the whole text block's max rectangular bounds
   * TODO is there any reason to make this more granular, like within individual line or glyph rects?
   */
  raycast(e, t) {
    const { textRenderInfo: r, curveRadius: n } = this;
    if (r) {
      const i = r.blockBounds, o = n ? ml() : pl(), a = o.geometry, { position: l, uv: c } = a.attributes;
      for (let u = 0; u < c.count; u++) {
        let f = i[0] + c.getX(u) * (i[2] - i[0]);
        const h = i[1] + c.getY(u) * (i[3] - i[1]);
        let d = 0;
        n && (d = n - Math.cos(f / n) * n, f = Math.sin(f / n) * n), l.setXYZ(u, f, h, d);
      }
      a.boundingSphere = this.geometry.boundingSphere, a.boundingBox = this.geometry.boundingBox, o.matrixWorld = this.matrixWorld, o.material.side = this.material.side, Yi.length = 0, o.raycast(e, Yi);
      for (let u = 0; u < Yi.length; u++)
        Yi[u].object = this, t.push(Yi[u]);
    }
  }
  copy(e) {
    const t = this.geometry;
    return super.copy(e), this.geometry = t, qp.forEach((r) => {
      this[r] = e[r];
    }), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
_l.forEach((s) => {
  const e = "_private_" + s;
  Object.defineProperty(fn.prototype, s, {
    get() {
      return this[e];
    },
    set(t) {
      t !== this[e] && (this[e] = t, this._needsSync = !0);
    }
  });
});
new yn();
new me();
const Yp = "/chromic-lyrics/vendor/NotoSans-Bold.ttf", Ro = "/chromic-lyrics/vendor/SFNS-ExtraBold.ttf";
let js = Yp;
try {
  fetch(Ro, { method: "HEAD" }).then((s) => {
    s.ok && (js = Ro);
  });
} catch {
}
const Po = "https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";
class jp {
  constructor(e) {
    this.opacity = 0, this.targetOpacity = 0, this.group = new Dn(), this.group.layers.set(1), this.titleText = new fn(), this.titleText.font = js, this.titleText.fontSize = 0.09, this.titleText.unicodeFontsURL = Po, this.titleText.fontWeight = 800, this.titleText.color = 16777215, this.titleText.anchorX = "center", this.titleText.anchorY = "middle", this.titleText.position.set(0, 0.06, -1), this.titleText.fillOpacity = 0, this.titleText.sdfGlyphSize = 64, this.titleText.gpuAccelerateSDF = !0, this.titleText.text = "", this.titleText.layers.set(1), this.titleText.sync(), this.group.add(this.titleText), this.artistText = new fn(), this.artistText.font = js, this.artistText.fontSize = 0.055, this.artistText.unicodeFontsURL = Po, this.artistText.fontWeight = 800, this.artistText.color = 8304895, this.artistText.anchorX = "center", this.artistText.anchorY = "middle", this.artistText.position.set(0, -0.05, -1), this.artistText.fillOpacity = 0, this.artistText.sdfGlyphSize = 64, this.artistText.gpuAccelerateSDF = !0, this.artistText.text = "", this.artistText.layers.set(1), this.artistText.sync(), this.group.add(this.artistText);
  }
  setTrack(e, t) {
    this.titleText.text = e, this.artistText.text = t, this.titleText.sync(), this.artistText.sync();
  }
  setVisible(e) {
    this.targetOpacity = e ? 1 : 0;
  }
  update(e) {
    this.opacity += (this.targetOpacity - this.opacity) * 0.04, this.titleText.fillOpacity = this.opacity, this.artistText.fillOpacity = this.opacity * 0.85;
  }
  addToScene(e) {
    e.add(this.group);
  }
  removeFromScene(e) {
    e.remove(this.group);
  }
  dispose() {
    this.titleText.dispose(), this.artistText.dispose();
  }
}
const Kp = "/chromic-lyrics/vendor/NotoSans-Bold.ttf", Do = "/chromic-lyrics/vendor/SFNS-ExtraBold.ttf";
let Ji = Kp;
try {
  fetch(Do, { method: "HEAD" }).then((s) => {
    s.ok && (Ji = Do);
  });
} catch {
}
const Wr = "https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data", jt = 0.5, Vn = 1, gi = 0.15, an = 0.09, Uo = 0.65, on = 0.14, Wn = 0.018, xi = 0, Lo = 1.35, Xn = 0, Ks = 0.9, zr = 0.3, Zp = 0.25, Ze = {
  active: { op: 1, sc: 1.04, oy: 0 },
  // Past lines: vanish immediately — zero opacity target, fast lerp does the rest
  past: { op: 0, sc: 0.93, oy: 0.06 },
  pastFar: { op: 0, sc: 0.85, oy: 0.12 },
  // Future lines: small negative oy pushes them further down from active, progressive fade
  future: { op: 0.04, sc: 0.88, oy: -0.06 },
  future1: { op: 0.55, sc: 0.97, oy: -0.02 },
  future2: { op: 0.3, sc: 0.94, oy: -0.04 },
  future3: { op: 0.14, sc: 0.92, oy: -0.05 },
  future4: { op: 0.07, sc: 0.9, oy: -0.06 },
  future5: { op: 0.04, sc: 0.88, oy: -0.06 },
  adlibOn: { op: 0.6, sc: 0.92, oy: -0.05 },
  adlibOff: { op: 0.35, sc: 0.9, oy: -0.033 },
  adlibHid: { op: 0, sc: 0.88, oy: 0.033 },
  scroll: { op: 0.7, sc: 1, oy: 0 },
  scrollAct: { op: 1, sc: 1, oy: 0 },
  // Paired () echo lines — from gpu-panel golden code (Y scaled to NDC)
  pairAct: { op: 1, sc: 0.97, oy: 0 },
  pairPast: { op: 0, sc: 0.96, oy: -0.083 },
  pairFut: { op: 0, sc: 0.9, oy: 0.067 }
};
function Jp(s) {
  return s.stretch || s.isVocalStretch ? "stretch" : s.sung ? "sung" : s.spoken ? "spoken" : s.whisper ? "whisper" : "normal";
}
function Gr(s, e, t) {
  s.text = e, s.font = Ji, s.fontSize = t, s.maxWidth = Ks, s.unicodeFontsURL = Wr, s.fontWeight = 800, s.anchorX = "left", s.anchorY = "middle", s.color = 16777215, s.transparent = !0, s.sdfGlyphSize = 128, s.gpuAccelerateSDF = !0;
}
function Qp(s, e, t, r, n) {
  if (r)
    return s === e ? Ze.scrollAct : Ze.scroll;
  if (t) return s === e ? Ze.adlibOn : s < e ? Ze.adlibOff : Ze.adlibHid;
  if (n)
    return s === e ? Ze.pairAct : s < e ? Ze.pairPast : Ze.pairFut;
  if (s === e) return Ze.active;
  if (s < e) return e - s > 1 ? Ze.pastFar : Ze.past;
  const i = s - e;
  return i === 1 ? Ze.future1 : i === 2 ? Ze.future2 : i === 3 ? Ze.future3 : i === 4 ? Ze.future4 : i === 5 ? Ze.future5 : Ze.future;
}
class $p {
  // sparse, same length as this.lines
  constructor() {
    this.lines = [], this.timeline = [], this.activeLineIdx = -1, this.opacity = 0, this.targetOpacity = 0, this.lastTime = 0, this.lastTimeStamp = 0, this.interpolatedTime = 0, this._trackStarted = !1, this.ready = !1, this.lastCt = 0, this._pendingSeekTime = null, this._leftEdge = 0, this._aspectX = 1, this.manualScrollOffset = 0, this.scrollDecayTimer = 0, this.scrollY = zr, this._onSeek = null, this._metaGroup = null, this._metaArtistMesh = null, this._metaAlbumMesh = null, this._metaVisible = !1, this._debugRenderer = null, this._debugEnabled = !1, this._debugLastDump = 0, this._uiVisible = !0, this._activeLineY = zr, this._accentColor = new me(8304895), this._translations = [], this._translationVisible = !1, this._translationMeshes = [], this._dbgCount = 0, this.group = new Dn(), this.group.layers.enable(0), this.group.layers.enable(1);
  }
  setTimeline(e, t, r) {
    this.disposeLines(), this.timeline = e, this.activeLineIdx = -1, this.ready = !1, this._trackStarted = !1, this.scrollY = zr, this.manualScrollOffset = 0, this.scrollDecayTimer = 0, this.opacity = 0, this.targetOpacity = 0, this.group.visible = !1, e.length && (this.buildScene(e), (t || r) && this.setTrackMeta(t, r));
  }
  disposeLines() {
    for (const e of this._translationMeshes)
      e && e.dispose();
    this._translationMeshes = [], this._translations = [], this._metaGroup && (this._metaArtistMesh && (this._metaArtistMesh.dispose(), this._metaArtistMesh = null), this._metaAlbumMesh && (this._metaAlbumMesh.dispose(), this._metaAlbumMesh = null), this.group.remove(this._metaGroup), this._metaGroup = null, this._metaVisible = !1);
    for (const e of this.lines) {
      for (const t of e.entries)
        if (t._isCueDot)
          t.base.geometry?.dispose(), t.base.material?.dispose(), t.fill.geometry?.dispose(), t.fill.material?.dispose();
        else if (t._isCharSplit)
          for (const r of t._chars)
            r.base.dispose(), r.fill.dispose();
        else
          t.base.dispose(), t.fill.dispose();
      this.group.remove(e.group);
    }
    this.lines = [];
  }
  buildScene(e) {
    const t = e.filter((h) => h.type === "vocal_cue" || h.words?.length || h.text), r = [], n = t[0], i = n && (n.start || n.time) || 0;
    n?.type !== "vocal_cue" && i > 2 && r.push({ type: "vocal_cue", start: 0, end: i, text: "" });
    for (let h = 0; h < t.length; h++)
      r.push(t[h]);
    const o = [];
    for (let h = 0; h < r.length; h++) {
      const d = r[h], _ = r[h + 1] ? r[h + 1].start || r[h + 1].time || 999 : (d.start || 0) + 5;
      if (d.type === "vocal_cue") {
        const v = d.start || d.time || 0, p = d.end || Math.min(+_ - 0.1, v + 5);
        o.push({
          ...d,
          _isCue: !0,
          start: v,
          end: p,
          words: [
            { text: "•", start: v, end: v + (p - v) * 0.33 },
            { text: "•", start: v + (p - v) * 0.33, end: v + (p - v) * 0.66 },
            { text: "•", start: v + (p - v) * 0.66, end: p }
          ]
        });
        continue;
      }
      if (!d.words || !d.words.length) {
        const p = (d.text || "").split(/\s+/).filter(Boolean);
        if (!p.length) continue;
        const m = d.start || d.time || 0, g = ((d.end || Math.min(+_ - 0.1, m + 5)) - m) / p.length;
        d.words = p.map((A, w) => ({
          text: A,
          start: m + w * g,
          end: m + (w + 1) * g
        }));
      }
      !d.end && d.words.length && (d.end = d.words[d.words.length - 1].end), o.push(d);
    }
    if (!o.length) return;
    let a = 0, l = 0, c = 0;
    for (let h = 0; h < o.length; h++) {
      const d = o[h], _ = !!d._isCue, v = !_ && ((d.words || []).every((C) => C.adlib) || !!d.adlib), p = !_ && !v && (d.words || []).some((C) => C.adlib), m = _ ? an : v ? an * Uo : an, y = new Dn();
      y.layers.enable(0), y.layers.enable(1), this.group.add(y);
      const g = [], A = { start: d.start || d.time || 0, end: d.end || 0 };
      if (_) {
        const C = an * 0.22, z = an * 0.45, x = new $s(C, 128);
        for (let L = 0; L < 3; L++) {
          const k = d.words[L], P = new Jn({ color: 16777215, transparent: !0, opacity: 0.1, depthTest: !1, depthWrite: !1 }), W = new qe(x, P), O = Xn + L * (C * 2 + z) + C;
          W.position.set(O, 0, xi), W.layers.set(1), y.add(W);
          const Y = new Jn({ color: 16777215, transparent: !0, opacity: 1, depthTest: !1, depthWrite: !1 }), b = new qe(x, Y);
          b.position.copy(W.position), b.scale.set(0, 0, 1), b.layers.set(1), y.add(b), g.push({
            base: W,
            fill: b,
            start: k.start,
            end: k.end,
            text: "•",
            li: h,
            wi: L,
            ad: !1,
            wt: "normal",
            _w: C * 2,
            _p: 0,
            _cop: 0,
            _tOp: 1,
            _scX: 1,
            _scY: 1,
            _wave: 0,
            _glow: 0,
            _baseY: 0,
            _isCueDot: !0,
            _dotRadius: C,
            _clickFlash: 0,
            _adBaseY: 0
          });
        }
        y.position.set(0, c, 0);
        const R = this.lines.length === 0;
        this.lines.push({
          group: y,
          entries: g,
          ld: A,
          ad: !1,
          isCue: !0,
          hasInlineAdlibs: !1,
          fs: m,
          _baseY: c,
          _cOp: R ? Ze.active.op : Ze.future.op,
          _cSc: R ? Ze.active.sc : Ze.future.sc,
          _cOy: R ? Ze.active.oy : Ze.future.oy,
          _tOp: R ? Ze.active.op : Ze.future.op,
          _tSc: R ? Ze.active.sc : Ze.future.sc,
          _tOy: R ? Ze.active.oy : Ze.future.oy,
          _cueCollapse: 0,
          _cueCollapseTarget: 0,
          _cueExitPhase: 0,
          _cueExitTimer: 0
        }), c -= on;
        continue;
      }
      let w = Xn;
      for (let C = 0; C < d.words.length; C++) {
        const z = d.words[C], x = z.word || z.text || "", R = !!z.adlib || v, L = Jp(z), k = R && !v ? m * Uo : m;
        if (L === "stretch" && x.length > 1 && !v) {
          const W = x.split(""), O = [];
          for (let b = 0; b < W.length; b++) {
            const G = W[b], X = new fn();
            Gr(X, G, k), X.layers.set(1), y.add(X);
            const U = new fn();
            Gr(U, G, k), U.layers.set(1), y.add(U), O.push({ base: X, fill: U, idx: b }), a += 2;
          }
          const Y = {
            base: O[0].base,
            fill: O[0].fill,
            start: z.start,
            end: z.end,
            text: x,
            li: h,
            wi: C,
            ad: R,
            wt: L,
            _w: 0,
            _p: 0,
            _cop: 1,
            _tOp: 1,
            _scX: 1,
            _scY: 1,
            _wave: 0,
            _glow: 0,
            _baseY: 0,
            _isCharSplit: !0,
            _chars: O,
            _charWidths: [],
            _charCount: W.length,
            _clickFlash: 0,
            _adBaseY: 0
          };
          g.push(Y);
        } else {
          const W = new fn();
          Gr(W, x, k), W.position.set(w, 0, xi), W.layers.set(1), y.add(W);
          const O = new fn();
          Gr(O, x, k), O.clipRect = [-10, -10, -10, 10], O.position.set(w, 0, xi), O.layers.set(1), y.add(O);
          const Y = {
            base: W,
            fill: O,
            start: z.start,
            end: z.end,
            text: x,
            li: h,
            wi: C,
            ad: R,
            wt: L,
            _w: 0,
            _p: 0,
            _cop: 1,
            _tOp: 1,
            _scX: 1,
            _scY: 1,
            _wave: 0,
            _glow: 0,
            _baseY: 0,
            _clickFlash: 0,
            _adBaseY: 0
          };
          g.push(Y), a += 2;
        }
        w += x.length * k * 0.55 + Wn;
      }
      const T = [];
      if (p) {
        let C = null;
        for (const z of g)
          z.ad ? (C || (C = { words: [], start: 1 / 0, end: 0, totalW: 0 }), C.words.push(z), C.start = Math.min(C.start, z.start), C.end = Math.max(C.end, z.end), C.totalW += z._w + Wn) : C && (C.totalW -= Wn, T.push(C), C = null);
        C && (C.totalW -= Wn, T.push(C));
        for (let z = 0; z < T.length; z++)
          for (const x of T[z].words) x._adPhraseIdx = z;
      }
      y.position.set(0, c, 0);
      const S = this.lines.length === 0;
      this.lines.push({
        group: y,
        entries: g,
        ld: A,
        ad: v,
        isCue: !1,
        hasInlineAdlibs: p,
        fs: m,
        _baseY: c,
        _cOp: S ? Ze.active.op : Ze.future.op,
        _cSc: S ? Ze.active.sc : Ze.future.sc,
        _cOy: S ? Ze.active.oy : Ze.future.oy,
        _tOp: S ? Ze.active.op : Ze.future.op,
        _tSc: S ? Ze.active.sc : Ze.future.sc,
        _tOy: S ? Ze.active.oy : Ze.future.oy,
        _adPhrases: T,
        _adLastEnd: T.length ? Math.max(...T.map((C) => C.end)) : 0,
        _adPhraseReveal: 0
      }), c -= on;
    }
    for (let h = 0; h < this.lines.length; h++)
      this.lines[h].entries.map((_) => _.text).join(" ").startsWith("(") && h + 1 < this.lines.length && this.lines[h + 1].entries.map((v) => v.text).join(" ").startsWith("(") && (this.lines[h]._pairWith = h + 1, this.lines[h + 1]._pairWith = h, this.lines[h]._pairRole = "first", this.lines[h + 1]._pairRole = "second", h++);
    for (let h = 0; h < this.lines.length; h++) {
      const d = this.lines[h];
      d.ad && !d.isCue && d._pairWith == null && (d._standaloneAdlib = !0);
    }
    const u = (h) => {
      h.material && (h.material.transparent = !0, h.material.depthWrite = !1, h.material.depthTest = !1);
    }, f = () => {
      if (l++, l >= a) {
        for (const h of this.lines)
          for (const d of h.entries)
            if (!d._isCueDot)
              if (d._isCharSplit && d._chars)
                for (const _ of d._chars)
                  u(_.base), u(_.fill);
              else
                u(d.base), u(d.fill);
        console.log("[LyricsRenderer] All meshes synced & patched transparent. Lines:", this.lines.length), this.doLayout(), this.ready = !0, this.group.visible = !0, this.targetOpacity = 1;
      }
    };
    for (const h of this.lines)
      for (const d of h.entries)
        if (d._isCueDot)
          l += 2, l >= a && (this.doLayout(), this.ready = !0, this.group.visible = !0, this.targetOpacity = 1);
        else if (d._isCharSplit)
          for (const _ of d._chars)
            _.base.sync(f), _.fill.sync(f);
        else
          d.base.sync(f), d.fill.sync(f);
    a === 0 && (this.doLayout(), this.ready = !0, this.group.visible = !0, this.targetOpacity = 1);
  }
  /** Position per-char meshes within a char-split word entry (from gpu-panel) */
  layoutChars(e, t, r) {
    if (!e._isCharSplit || !e._chars) return;
    let n = t;
    for (let i = 0; i < e._chars.length; i++) {
      const o = e._chars[i], a = e._charWidths[i] || 0;
      o.base.position.x = n, o.base.position.y = r, o.fill.position.x = n, o.fill.position.y = r, o._baseX = n, n += a;
    }
  }
  doLayout() {
    const e = Ks, t = Xn;
    this._leftEdge = t;
    let r = 0;
    for (let n = 0; n < this.lines.length; n++) {
      const i = this.lines[n];
      if (i.isCue) {
        const a = on * 0.35, l = i.entries[0]?._dotRadius || an * 0.18, c = an * 0.4;
        for (let u = 0; u < i.entries.length; u++) {
          const f = i.entries[u], h = t + u * (l * 2 + c) + l;
          f.base.position.x = h, f.base.position.y = 0, f.fill.position.x = h, f.fill.position.y = 0, f._adBaseY = 0;
        }
        i.group.position.set(0, r + a, 0), i._baseY = r + a, r -= on;
        continue;
      }
      for (const a of i.entries)
        if (!a._isCueDot)
          if (a._isCharSplit && a._chars) {
            let l = 0;
            a._charWidths = [];
            for (const c of a._chars) {
              const u = c.base.textRenderInfo?.blockBounds, f = u ? u[2] - u[0] : i.fs * 0.5;
              a._charWidths.push(f), l += f;
            }
            a._w = l;
          } else {
            const l = a.base.textRenderInfo?.blockBounds;
            a._w = l ? l[2] - l[0] : a.text.length * i.fs * 0.5;
          }
      const o = i.fs * Lo;
      if (i.hasInlineAdlibs) {
        const a = i.entries.filter((v) => !v.ad), l = i.entries.filter((v) => v.ad);
        let c = t, u = 0;
        for (const v of a)
          c + v._w > t + e && c > t + 0.01 && (c = t, u -= o), v.base.position.x = c, v.base.position.y = u, v.fill.position.x = c, v.fill.position.y = u, v._adBaseY = u, v._baseY = u, v._baseX = c, v._isCharSplit && this.layoutChars(v, c, u), c += v._w + Wn;
        const f = i.fs * 0.15, h = u - i.fs - f;
        let d = t;
        for (const v of l)
          v.base.position.x = d, v.base.position.y = h, v.fill.position.x = d, v.fill.position.y = h, v._adBaseY = h, v._baseY = h, v._baseX = d, v._adBaseX = d, v._isCharSplit && this.layoutChars(v, d, h), d += v._w + Wn;
        i.group.position.set(0, r, 0), i._baseY = r;
        const _ = Math.abs(u) + o;
        r -= _ + on;
      } else {
        let a = t, l = 0;
        for (const f of i.entries)
          a + f._w > t + e && a > t + 0.01 && (a = t, l -= o), f.base.position.x = a, f.base.position.y = l, f.fill.position.x = a, f.fill.position.y = l, f._adBaseY = l, f._baseY = l, f._baseX = a, f._isCharSplit && this.layoutChars(f, a, l), a += f._w + Wn;
        i.group.position.set(0, r, 0), i._baseY = r;
        const c = Math.abs(l) + o;
        let u;
        i._pairRole === "first" ? u = on * 0.3 : i._pairRole === "second" ? u = on * 1.4 : u = i.ad && !i._standaloneAdlib ? on * 0.15 : i._standaloneAdlib ? on * 0.5 : on, r -= c + u;
      }
    }
  }
  setVisible(e) {
    this.targetOpacity = e && this.timeline.length > 0 ? 1 : 0;
  }
  /** Set UI controls visibility — shifts text position when controls are shown vs idle */
  setControlsVisible(e) {
    this._uiVisible = e, this._activeLineY = e ? zr : Zp;
  }
  /** Set accent color from palette — used for artist name bloom */
  setAccentColor(e) {
    this._accentColor = e.clone();
    const t = { h: 0, s: 0, l: 0 };
    if (this._accentColor.getHSL(t), t.l < 0.5 && this._accentColor.setHSL(t.h, t.s, Math.max(0.55, t.l)), this._metaAlbumMesh) {
      const r = this._accentColor.clone(), n = { h: 0, s: 0, l: 0 };
      r.getHSL(n), r.setHSL(n.h, Math.max(0.15, n.s * 0.5), Math.min(0.75, n.l + 0.15)), this._metaAlbumMesh.color = r.getHex();
    }
  }
  /** Set aspect ratio correction (call on resize). w/h of container. */
  setAspect(e, t) {
    const r = t / e;
    Math.abs(r - this._aspectX) > 1e-3 && (this._aspectX = r, this.ready && this.doLayout());
  }
  setCurrentTime(e) {
    this.lastTime = e, this.lastTimeStamp = performance.now(), e > 0.1 && (this._trackStarted = !0);
  }
  /** Register a callback for click-to-seek */
  onSeek(e) {
    this._onSeek = e;
  }
  /** Set track metadata for display above lyrics (artist + album with blue glow) */
  setTrackMeta(e, t) {
    this._metaGroup && (this._metaArtistMesh && (this._metaArtistMesh.dispose(), this._metaArtistMesh = null), this._metaAlbumMesh && (this._metaAlbumMesh.dispose(), this._metaAlbumMesh = null), this.group.remove(this._metaGroup), this._metaGroup = null);
    const r = e || "", n = t || "";
    if (!r && !n) {
      this._metaVisible = !1;
      return;
    }
    this._metaGroup = new Dn(), this._metaGroup.layers.enable(0), this._metaGroup.layers.enable(1);
    const i = an * 0.58;
    this._metaArtistMesh = new fn(), this._metaArtistMesh.text = r, this._metaArtistMesh.font = Ji, this._metaArtistMesh.fontSize = i, this._metaArtistMesh.unicodeFontsURL = Wr, this._metaArtistMesh.fontWeight = 800, this._metaArtistMesh.anchorX = "left", this._metaArtistMesh.anchorY = "bottom", this._metaArtistMesh.color = this._accentColor.getHex(), this._metaArtistMesh.transparent = !0, this._metaArtistMesh.sdfGlyphSize = 128, this._metaArtistMesh.gpuAccelerateSDF = !0, this._metaArtistMesh.position.set(Xn, 0, xi), this._metaArtistMesh.layers.enable(0), this._metaArtistMesh.layers.enable(1), this._metaGroup.add(this._metaArtistMesh);
    const o = an * 0.47;
    this._metaAlbumMesh = new fn(), this._metaAlbumMesh.text = n, this._metaAlbumMesh.font = Ji, this._metaAlbumMesh.fontSize = o, this._metaAlbumMesh.unicodeFontsURL = Wr, this._metaAlbumMesh.fontWeight = 800, this._metaAlbumMesh.anchorX = "left", this._metaAlbumMesh.anchorY = "top";
    const a = this._accentColor.clone(), l = { h: 0, s: 0, l: 0 };
    a.getHSL(l), a.setHSL(l.h, Math.max(0.15, l.s * 0.5), Math.min(0.75, l.l + 0.15)), this._metaAlbumMesh.color = a.getHex(), this._metaAlbumMesh.transparent = !0, this._metaAlbumMesh.sdfGlyphSize = 128, this._metaAlbumMesh.gpuAccelerateSDF = !0, this._metaAlbumMesh.position.set(Xn, -i - 3e-3, xi), this._metaAlbumMesh.layers.set(1), this._metaGroup.add(this._metaAlbumMesh), this.group.add(this._metaGroup), this._metaVisible = !0;
    const c = (u) => {
      u.material && (u.material.transparent = !0, u.material.depthWrite = !1, u.material.depthTest = !1);
    };
    this._metaArtistMesh.sync(() => c(this._metaArtistMesh)), this._metaAlbumMesh.sync(() => c(this._metaAlbumMesh));
  }
  /** Update metadata group position — footer after last lyric line, scrolls with content */
  updateMeta() {
    if (!this._metaGroup || !this._metaVisible) return;
    const e = this.lines[this.lines.length - 1];
    let t;
    if (e) {
      let a = 0;
      for (const l of e.entries)
        l._baseY < a && (a = l._baseY);
      t = e._baseY + a - e.fs * Lo - on * 1.5;
    } else
      t = -0.5;
    this._metaGroup.position.y = t + this.scrollY, this._metaGroup.position.x = this._leftEdge;
    const r = this._metaGroup.position.y;
    let n = 1;
    r > 1.2 || r < -1.8 ? n = 0 : r > 0.9 ? n = Math.max(0, (1.2 - r) / 0.3) : r < -1.3 && (n = Math.max(0, (r + 1.8) / 0.5));
    const i = 0.9 * n * this.opacity, o = 0.55 * n * this.opacity;
    if (this._metaArtistMesh?.material)
      if (this._metaArtistMesh.material.opacity = i, i > 0.1) {
        this._metaArtistMesh.layers.enable(0);
        const a = 1 + 0.6 * n, l = this._accentColor;
        this._metaArtistMesh.color = new me(
          l.r * a,
          l.g * a,
          l.b * a
        );
      } else
        this._metaArtistMesh.layers.disable(0), this._metaArtistMesh.color = this._accentColor.clone();
    this._metaAlbumMesh?.material && (this._metaAlbumMesh.material.opacity = o);
  }
  /** Handle mouse wheel for manual scroll (from gpu-panel) */
  handleWheel(e) {
    if (this.manualScrollOffset += e * 2e-3, this.lines.length > 1) {
      const t = this.lines[0]._baseY, r = this.lines[this.lines.length - 1]._baseY, n = Math.max(0, this.activeLineIdx), i = this.lines[n]._baseY, o = Math.abs(r - i) + 0.5, a = Math.abs(i - t) + 0.3;
      this.manualScrollOffset = Math.max(-a, Math.min(o, this.manualScrollOffset));
    }
    this.scrollDecayTimer = 3;
  }
  /** Handle click for click-to-seek */
  handleClick(e, t) {
    if (!this.ready || !this.lines.length || e < Xn - 0.2) return;
    const r = e / (this._aspectX || 1);
    let n = null, i = 1 / 0;
    for (const l of this.lines) {
      const c = l.group.position.y, u = l._cSc || 1;
      if (!(l._cOp < 0.05))
        for (const f of l.entries) {
          if (f._isCueDot) continue;
          const h = c + (f._adBaseY || 0) * u, d = l.group.position.x + f.base.position.x * u, _ = Math.abs(t - h);
          if (_ > l.fs * 2.5) continue;
          const v = d, p = d + f._w * u, m = r < v ? v - r : r > p ? r - p : 0, y = _ + m * 0.5;
          y < i && (i = y, n = f);
        }
    }
    if (n && n.start != null && this._onSeek) {
      console.log(`[LR-SEEK] word="${n.text}" → t=${n.start.toFixed(3)}`), this.manualScrollOffset = 0, this.scrollDecayTimer = 0, this._pendingSeekTime = n.start, this._onSeek(n.start), n._clickFlash = 1;
      return;
    }
    let o = 0, a = 1 / 0;
    for (let l = 0; l < this.lines.length; l++) {
      if (this.lines[l]._cOp < 0.05) continue;
      const c = Math.abs(this.lines[l].group.position.y - t);
      c < a && (a = c, o = l);
    }
    if (this._onSeek && this.lines[o]) {
      console.log(`[LR-SEEK] line #${o} → t=${this.lines[o].ld.start.toFixed(3)}`), this.manualScrollOffset = 0, this.scrollDecayTimer = 0, this._pendingSeekTime = this.lines[o].ld.start, this._onSeek(this.lines[o].ld.start);
      for (const l of this.lines[o].entries) l._clickFlash = 1;
    }
  }
  update(e) {
    if (this._dbgCount++, this._dbgCount % 300, !this.lines.length || !this.ready) {
      this.opacity += (this.targetOpacity - this.opacity) * 0.15;
      return;
    }
    const t = Math.min((performance.now() - this.lastTimeStamp) / 1e3, 0.5);
    this.interpolatedTime = this.lastTime + t + 0.05;
    let r = this.interpolatedTime;
    const n = this.opacity < 0.5 ? 0.15 : 0.05;
    this.opacity += (this.targetOpacity - this.opacity) * n, this.group.scale.x = this._aspectX;
    const i = r - this.lastCt, o = i < -0.3 || i > 2, a = this._pendingSeekTime !== null || o, l = this._pendingSeekTime ?? r;
    if (a && (r = l, this.lastTimeStamp = performance.now(), this.interpolatedTime = l, this._pendingSeekTime = null), this.lastCt = r, a) {
      let w = 0;
      for (let T = 0; T < this.lines.length; T++) {
        const S = this.lines[T].ld;
        if (r >= S.start && r <= S.end) {
          w = T;
          break;
        }
        r > S.end && (w = T);
      }
      for (const T of this.lines)
        for (const S of T.entries)
          if (r >= S.end ? S._p = 1 : r >= S.start ? S._p = Math.min(1, (r - S.start) / (S.end - S.start)) : S._p = 0, S._clickFlash = 0, S._wave = 0, S._glow = 0, S._scX = 1, S._scY = 1, !S._isCueDot) if (S._isCharSplit && S._chars)
            for (const C of S._chars)
              C.base.scale.set(1, 1, 1), C.fill.scale.set(1, 1, 1), C._lerpScX = 1, C._lerpScY = 1, C._charGlow = 0, C._charFilled = !1, C._baseX !== void 0 && (C.base.position.x = C._baseX, C.fill.position.x = C._baseX);
          else {
            if (S._p >= 1)
              S.fill.clipRect = [-10, -10, 100, 10];
            else if (S._p <= 0)
              S.fill.clipRect = [-10, -10, -10, 10];
            else {
              const C = S._w * S._p, z = S._w * gi;
              S.fill.clipRect = [-0.01, -10, C + z, 10];
            }
            S.fill.layers.disable(0), S.fill.color = 16777215, S._baseX !== void 0 && (S.base.position.x = S._baseX, S.fill.position.x = S._baseX);
          }
      this.manualScrollOffset = 0, this.scrollDecayTimer = 0, this.activeLineIdx = w;
    }
    let c = -1;
    for (let w = 0; w < this.lines.length; w++) {
      const T = this.lines[w].ld;
      if (r >= T.start && r <= T.end) {
        c = w;
        break;
      }
    }
    if (c === -1)
      for (let w = 0; w < this.lines.length; w++) {
        const T = this.lines[w].ld;
        if (r >= T.start - 0.15 && r <= T.end + 0.15) {
          c = w;
          break;
        }
      }
    if (c === -1 && this.lines.length > 0) {
      if (r > this.lines[this.lines.length - 1].ld.end + 0.5)
        c = this.lines.length - 1;
      else if (r < this.lines[0].ld.start - 0.5)
        c = 0;
      else
        for (let w = 0; w < this.lines.length - 1; w++)
          if (r > this.lines[w].ld.end && r < this.lines[w + 1].ld.start) {
            const T = this.lines[w + 1].ld.start - this.lines[w].ld.end;
            c = r - this.lines[w].ld.end < T * 0.6 ? w : w + 1;
            break;
          }
    }
    c === -1 && (c = this.activeLineIdx >= 0 ? this.activeLineIdx : 0);
    let u = /* @__PURE__ */ new Set([c]);
    if (c >= 0 && c < this.lines.length) {
      const w = this.lines[c].ld, T = this.lines[c]._pairWith;
      if (T != null && T >= 0 && T < this.lines.length) {
        u.add(T);
        const S = Math.max(w.end, this.lines[T].ld.end);
        r <= S + 0.1 && (c = Math.min(c, T));
      }
      for (let S = 0; S < this.lines.length; S++) {
        if (u.has(S)) continue;
        const C = this.lines[S].ld;
        Math.min(w.end, C.end) - Math.max(w.start, C.start) > 0.05 && u.add(S);
      }
      if (u.size > 1) {
        let S = 0;
        for (const C of u) S = Math.max(S, this.lines[C].ld.end);
        r <= S + 0.1 ? c = Math.min(...u) : u = /* @__PURE__ */ new Set([c]);
      }
    }
    this.activeLineIdx = c;
    const f = 1 / 60, h = 1 - Math.exp(-5 * f), d = 1 - Math.exp(-2.5 * f), _ = 1 - Math.exp(-12 * f);
    this.scrollDecayTimer > 0 ? this.scrollDecayTimer -= f : (this.manualScrollOffset *= 0.95, Math.abs(this.manualScrollOffset) < 5e-3 && (this.manualScrollOffset = 0));
    const p = (c >= 0 && c < this.lines.length ? -this.lines[c]._baseY + this._activeLineY : this._activeLineY) + this.manualScrollOffset, m = Math.abs(p - this.scrollY), y = m > 0.5 ? 3.5 + Math.min(12, m * 6) : 3.5, g = 1 - Math.exp(-y * f);
    this.scrollY += (p - this.scrollY) * g, this.updateMeta();
    const A = this.scrollDecayTimer > 0;
    for (let w = 0; w < this.lines.length; w++) {
      const T = this.lines[w], S = u.has(w), C = T._pairWith != null, z = C ? !1 : T.ad && !T._standaloneAdlib, x = S ? Ze.active : Qp(w, c, z, A, C), R = !S && w < c, L = S;
      if (T._tOp = x.op, T._tSc = x.sc, T._tOy = x.oy, R) {
        const b = 1 - Math.exp(-20 * f);
        T._cOp += (T._tOp - T._cOp) * b, T._cSc += (T._tSc - T._cSc) * b, T._cOy += (T._tOy - T._cOy) * b;
      } else {
        T._cOp += (T._tOp - T._cOp) * h, T._cSc += (T._tSc - T._cSc) * h;
        const b = w - c;
        let G;
        b === 1 ? G = h * 0.8 : b === 2 ? G = h * 0.5 : G = h * Math.max(0.2, 0.4 - b * 0.04), T._cOy += (T._tOy - T._cOy) * G;
      }
      T.group.scale.set(T._cSc, T._cSc, 1), T.group.position.x = this._leftEdge * (1 - T._cSc), T.group.position.y = T._baseY + T._cOy + this.scrollY;
      const k = T.group.position.y, P = 0.3;
      let W = 1;
      k > 1 - P ? W = Math.max(0, (1 - k) / P) : k < -1 + P && (W = Math.max(0, (k + 1) / P));
      const O = T._cOp * W;
      let Y = 0;
      if (C) {
        const b = T.ld.start, G = T.ld.end;
        r >= G ? Y = 1 : r >= b && (Y = (r - b) / (G - b));
      }
      for (const b of T.entries) {
        r >= b.end ? b._p = 1 : r >= b.start ? b._p = Math.min(1, (r - b.start) / (b.end - b.start)) : b._p = 0, b._p > 0 && b._p < 1;
        const G = b._p >= 1, X = b.wt === "stretch";
        if ((!b.ad || C || T._standaloneAdlib) && (b._tOp = O, R ? b._cop = O : b._cop += (b._tOp - b._cop) * h), b._clickFlash && b._clickFlash > 0.01 ? b._clickFlash *= 1 - _ : b._clickFlash = 0, T.isCue && b._isCueDot) {
          const q = b.base, te = b.fill, de = q.material, le = te.material;
          if (te.scale.set(0, 0, 1), le.opacity = 0, te.layers.disable(0), !this._trackStarted) {
            q.scale.set(1, 1, 1), de.opacity = 0.3 * b._cop * this.opacity, de.color.setRGB(1, 1, 1), q.layers.enable(0), q.layers.disable(1);
            continue;
          }
          const F = 0.8, Ue = T.ld.end, _e = Ue - F, pe = Math.min(b.end, _e);
          let ue;
          r >= pe ? ue = 1 : r >= b.start ? ue = Math.min(1, (r - b.start) / Math.max(0.01, pe - b.start)) : ue = 0;
          const Me = T.entries.every((ve) => r >= Math.min(ve.end, _e));
          if (r >= Ue)
            q.scale.set(0.01, 0.01, 1), de.opacity = 0, de.color.setRGB(1, 1, 1);
          else if (r >= _e && Me) {
            const ve = (r - _e) / F, we = Math.max(0, 1 - ve * ve), E = 0.15;
            let M;
            ve < E ? M = 1 + 0.25 * (ve / E) : M = 1.25 * (1 - (ve - E) / (1 - E)), M = Math.max(0.01, M), q.scale.set(M, M, 1), de.opacity = we * b._cop * this.opacity, q.layers.enable(0), q.layers.enable(1);
            const N = 1 + 0.2 * we;
            de.color.setRGB(N, N, N);
          } else if (q.position.y = 0, de.color.setRGB(1, 1, 1), ue > 0) {
            const ve = L ? 0.4 : 0.2, we = ve + (1 - ve) * ue;
            q.scale.set(1, 1, 1), de.opacity = we * b._cop * this.opacity, q.layers.enable(0), q.layers.disable(1), de.color.setRGB(1, 1, 1), Me && (de.color.setRGB(1.05, 1.05, 1.05), q.layers.enable(1));
          } else {
            q.layers.enable(0), q.layers.disable(1);
            const ve = L ? 0.4 : 0.2;
            de.opacity = ve * b._cop * this.opacity, q.scale.set(1, 1, 1);
          }
          continue;
        }
        if (b.ad && !L && !C)
          if (b._tOp = 0, b._cop += (b._tOp - b._cop) * _, b._cop < 0.01 && (b._cop = 0), b._isCharSplit && b._chars)
            for (const q of b._chars)
              q.base.material.opacity = jt * b._cop * this.opacity, q.fill.material.opacity = jt * b._cop * this.opacity;
          else b._isCueDot || (b.base.material.opacity = jt * b._cop * this.opacity, b.fill.material.opacity = jt * b._cop * this.opacity);
        if (b._isCharSplit && b._chars) {
          const q = b._charCount, de = (b.end - b.start) * 0.15, F = b.end + de - b.start, Ue = b._p, _e = F > 0 ? Math.max(0, Math.min(1, (r - b.start) / F)) : 0, pe = _e * (q - 1), ue = 2.2;
          let Me = 0;
          const ce = [];
          for (let M = 0; M < q; M++)
            ce.push(Me), Me += b._charWidths[M] || T.fs * 0.5;
          const ve = Me, we = ve * Ue, E = ve * gi;
          for (let M = 0; M < q; M++) {
            const N = b._chars[M], Z = b._charWidths[M] || T.fs * 0.5, $ = ce[M], oe = M - pe, se = _e > 0 && _e < 1 ? Math.exp(-(oe * oe) / (2 * ue * ue)) : 0, he = C && L ? 0.7 : 1;
            if (R)
              N.base.material.opacity = 0, N.fill.material.opacity = Vn * b._cop * this.opacity, N.fill.clipRect && (N.fill.clipRect = null);
            else if (!L && !C)
              N.base.material.opacity = jt * b._cop * this.opacity, N.fill.material.opacity = Vn * b._cop * this.opacity, N.fill.clipRect = [-10, -10, -10, 10];
            else {
              N.base.material.opacity = jt * b._cop * he * this.opacity;
              const Ee = Vn * b._cop * he * this.opacity;
              if (G)
                N.fill.material.opacity = Ee, N.fill.clipRect && (N.fill.clipRect = null);
              else if (Ue <= 0)
                N.fill.material.opacity = Ee, N.fill.clipRect = [-10, -10, -10, 10];
              else {
                N.fill.material.opacity = Ee;
                const j = we + E - $;
                j <= 0 ? N.fill.clipRect = [-10, -10, -10, 10] : j >= Z ? N.fill.clipRect && (N.fill.clipRect = null) : N.fill.clipRect = [-0.01, -10, j, 10];
              }
            }
            const Ne = 1 + 0.16 * se, ge = 1 + 0.03 * se, Be = N._lerpScY ?? 1, Pe = N._lerpScX ?? 1, xe = 1 - Math.exp(-3.5 * f), Ae = Be + (Ne - Be) * xe, Ce = Pe + (ge - Pe) * xe;
            N._lerpScY = Ae, N._lerpScX = Ce, N.base.scale.set(Ce, Ae, 1), N.fill.scale.set(Ce, Ae, 1);
            const ke = (Ae - 1) * T.fs * 0.5;
            N.base.position.y = (b._adBaseY || 0) + ke, N.fill.position.y = (b._adBaseY || 0) + ke, N.base.position.x = N._baseX, N.fill.position.x = N._baseX;
            const Ie = $ + Z;
            (Ue >= 1 || Ie <= we) && !N._charFilled && (N._charFilled = !0), se > 0.2 ? N._charGlow = 0.6 : N._charFilled && L ? ((!N._charGlow || N._charGlow < 0.3) && (N._charGlow = 0.3), N._charGlow *= 0.999) : !L && N._charGlow > 0 && (N._charGlow *= 0.97, N._charGlow < 0.01 && (N._charGlow = 0)), se > b._glow ? b._glow = se : b._glow *= 0.95;
            const H = N._charGlow || 0;
            if (H > 0.01) {
              const Ee = 1 + 0.35 * H;
              N.fill.color = new me(Ee, Ee, Ee), N.fill.layers.enable(0);
            } else
              N.fill.color = 16777215, N.fill.layers.disable(0);
          }
          if (b.ad && T.hasInlineAdlibs && T._adPhrases) {
            const M = T._adPhrases, N = b._adPhraseIdx || 0, Z = M[N], $ = T._adLastEnd || 0, oe = Z.start - r;
            if (!(!L && r > $ ? !1 : r >= Z.start - 0.3))
              b._tOp = 0;
            else if (oe > 0 && oe <= 0.3) {
              const se = 1 - oe / 0.3;
              b._tOp = se * se * 0.4 * O;
            } else
              b._tOp = 0.45 * O;
            const ye = b._tOp < b._cop ? _ : h;
            b._cop += (b._tOp - b._cop) * ye, b._cop < 0.01 && (b._cop = 0);
            for (const se of b._chars)
              se.base.material.opacity = jt * b._cop * this.opacity, se.fill.material.opacity = Vn * b._cop * this.opacity;
          }
          continue;
        }
        const U = C && L ? 0.7 : 1, V = R ? 0 : jt * b._cop * U * this.opacity;
        let K = Vn * b._cop * U * this.opacity;
        if (b._clickFlash && b._clickFlash > 0 && (K = Math.min(1, K + 0.5 * b._clickFlash)), b.base.material && (b.base.material.opacity = V), b.fill.material && (b.fill.material.opacity = K), R || G)
          b.fill.clipRect = [-10, -10, 100, 10];
        else if (C && L)
          if (Y >= 1)
            b.fill.clipRect = [-10, -10, 100, 10];
          else if (Y <= 0)
            b.fill.clipRect = [-10, -10, -10, 10];
          else {
            const q = T.entries[T.entries.length - 1], te = q.base.position.x - T.entries[0].base.position.x + q._w, de = T.entries[0].base.position.x + te * Y, le = te * gi, F = b.base.position.x, Ue = de + le - F;
            Ue <= 0 ? b.fill.clipRect = [-10, -10, -10, 10] : Ue >= b._w ? b.fill.clipRect = [-10, -10, 100, 10] : b.fill.clipRect = [-0.01, -10, Ue, 10];
          }
        else if (b._p <= 0)
          b.fill.clipRect = [-10, -10, -10, 10];
        else {
          const q = b._w * b._p, te = b._w * gi;
          b.fill.clipRect = [-0.01, -10, q + te, 10];
        }
        if (X) {
          const q = b.end - b.start, te = q * 0.3, de = b.end + te;
          if (r >= b.start && r < de) {
            const F = de - b.start, Ue = Math.max(0, Math.min(1, (r - b.start) / F)), _e = Math.pow(Math.sin(Ue * Math.PI), 0.6), pe = Math.max(1.5, 3.5 / Math.max(0.3, q)), ue = (r - b.start) * pe * Math.PI * 2, Me = Math.sin(ue), ce = _e * Me;
            b._wave += (ce - b._wave) * Math.min(1, f * 8);
          } else r >= de ? b._wave += (0 - b._wave) * Math.min(1, f * 4) : b._wave += (0 - b._wave) * d;
        } else
          b._wave += (0 - b._wave) * d;
        let I = 1, B = 1;
        const Q = Math.abs(b._wave);
        Q > 0.01 ? (B = 1 + 0.08 * Q, I = 1 + 0.03 * Q, b._glow += (Q - b._glow) * 0.18) : L && b._p > 0 ? b._glow < 0.15 && (b._glow = 0.15) : (b._glow *= 0.97, b._glow < 1e-3 && (b._glow = 0));
        const ee = b._wave * an * 0.18;
        if (X && b._glow > 3e-3 && !b._isCueDot) {
          const te = 1 + 0.25 * b._glow;
          b.fill.color = new me(te, te, te), b.fill.layers.enable(0);
        } else
          b.fill.color = 16777215, b.fill.layers.disable(0);
        if (b._scX += (I - b._scX) * h, b._scY += (B - b._scY) * h, b.base.scale.set(b._scX, b._scY, 1), b.fill.scale.set(b._scX, b._scY, 1), !b.ad || !T.hasInlineAdlibs) {
          const q = b._adBaseY || 0, te = (b._scY - 1) * T.fs * 0.5;
          b.base.position.y = q + te, b.fill.position.y = q + te, b._baseX === void 0 && (b._baseX = b.base.position.x), b.base.position.x = (b._baseX ?? 0) + ee, b.fill.position.x = (b._baseX ?? 0) + ee;
        }
        if (b.ad && T.hasInlineAdlibs && T._adPhrases) {
          const q = T._adPhrases, te = b._adPhraseIdx || 0, de = q[te], le = T._adLastEnd || 0, F = de.start - r;
          let Ue;
          if (!L && r > le ? Ue = !1 : r >= de.start - 0.3 ? Ue = !0 : Ue = !1, !Ue)
            b._tOp = 0;
          else if (F > 0 && F <= 0.3) {
            const pe = 1 - F / 0.3;
            b._tOp = pe * pe * 0.4 * O;
          } else
            b._tOp = 0.45 * O;
          const _e = b._tOp < b._cop ? _ : h;
          if (b._cop += (b._tOp - b._cop) * _e, b._cop < 0.01 && (b._cop = 0), b.base.position.y += ((b._adBaseY || 0) - b.base.position.y) * h, b.fill.position.y = b.base.position.y, b.base.material.opacity = jt * b._cop * this.opacity, b.fill.material.opacity = Vn * b._cop * this.opacity, R || G) b.fill.clipRect = [-10, -10, 100, 10];
          else if (b._p <= 0) b.fill.clipRect = [-10, -10, -10, 10];
          else {
            const pe = b._w * b._p, ue = b._w * gi;
            b.fill.clipRect = [-0.01, -10, pe + ue, 10];
          }
        } else if (b.ad && T.ad && !T._standaloneAdlib) {
          const q = b.start - r;
          if (r > b.end) {
            const te = r - b.end, de = Math.max(0, 1 - te / 0.25);
            b._tOp = de * 0.35 * O;
          } else if (b._p > 0)
            b._tOp = 0.4 * O;
          else if (q <= 0.35 && q > 0) {
            const te = 1 - q / 0.35;
            b._tOp = te * te * 0.3 * O;
          } else
            b._tOp = 0;
          if (b._cop += (b._tOp - b._cop) * h, b._cop < 0.01 && (b._cop = 0), b.base.position.y += ((b._adBaseY || 0) - b.base.position.y) * h, b.fill.position.y = b.base.position.y, b.base.material.opacity = jt * b._cop * this.opacity, b.fill.material.opacity = Vn * b._cop * this.opacity, R || G) b.fill.clipRect = [-10, -10, 100, 10];
          else if (b._p <= 0) b.fill.clipRect = [-10, -10, -10, 10];
          else {
            const te = b._w * b._p, de = b._w * gi;
            b.fill.clipRect = [-0.01, -10, te + de, 10];
          }
        }
      }
    }
    if (this._translationVisible && this._translationMeshes.length)
      for (let w = 0; w < this.lines.length; w++) {
        const T = this._translationMeshes[w];
        if (!T?.material) continue;
        const S = this.lines[w], C = u.has(w), z = w - c;
        let x;
        C ? x = 0.4 : w < c || z === 1 ? x = 0.5 : z === 2 ? x = 0.4 : z === 3 || z === 4 ? x = 0.3 : x = 0.2, T.material.opacity = x * S._cOp * this.opacity;
      }
    this.debugPeriodicDump(r, c);
  }
  addToScene(e) {
    e.add(this.group);
  }
  removeFromScene(e) {
    e.remove(this.group);
  }
  dispose() {
    this.disposeLines();
  }
  /**
   * DEBUG: Read actual rendered pixel color at a canvas position.
   * Call from click handler with the renderer reference.
   */
  debugReadPixel(e, t, r) {
    try {
      const n = e.getContext(), i = e.getPixelRatio(), o = Math.floor(t * i), a = Math.floor((e.domElement.height / i - r) * i), l = new Uint8Array(4);
      return n.readPixels(o, a, 1, 1, n.RGBA, n.UNSIGNED_BYTE, l), { r: l[0], g: l[1], b: l[2], a: l[3] };
    } catch (n) {
      return console.warn("[LR-DEBUG] readPixels failed:", n), null;
    }
  }
  /**
   * DEBUG: Shift+Click inspector — reads actual pixel color + dumps word state.
   * Pass the renderer from ThreeOrchestrator.
   */
  debugInspectClick(e, t, r, n, i) {
    if (console.log("%c[LR-INSPECT] ═══ PIXEL COLOR PICKER ═══", "color: #0ff; font-weight: bold; font-size: 14px"), console.log(`  ready=${this.ready} lines=${this.lines.length} ndcX=${e.toFixed(3)} ndcY=${t.toFixed(3)}`), !this.ready || !this.lines.length) {
      console.log("  %cNo lyrics loaded or not ready yet", "color: #f80"), console.log("%c[LR-INSPECT] ═══════════════════════", "color: #0ff");
      return;
    }
    const o = r.domElement.getBoundingClientRect(), a = n - o.left, l = i - o.top, c = this.debugReadPixel(r, a, l), u = c ? `rgba(${c.r},${c.g},${c.b},${c.a})` : "FAILED", f = [];
    if (c)
      for (let y = -2; y <= 2; y++)
        for (let g = -2; g <= 2; g++) {
          const A = this.debugReadPixel(r, a + g * 2, l + y * 2);
          A && A.a > 0 && f.push(`(${A.r},${A.g},${A.b},${A.a})`);
        }
    const h = e / (this._aspectX || 1);
    let d = null, _ = null, v = 1 / 0, p = -1;
    for (let y = 0; y < this.lines.length; y++) {
      const g = this.lines[y], A = g.group.position.y, w = g._cSc || 1;
      for (const T of g.entries) {
        if (T._isCueDot) continue;
        const S = A + (T._adBaseY || 0) * w, C = g.group.position.x + T.base.position.x * w, z = Math.abs(t - S);
        if (z > g.fs * 2) continue;
        const x = C + T._w * w, R = z + Math.abs(h - (C + x) / 2) * 0.3;
        R < v && (v = R, d = T, _ = g, p = y);
      }
    }
    const m = this.activeLineIdx;
    if (console.log(`  Canvas pos: (${a.toFixed(0)}, ${l.toFixed(0)})  NDC: (${e.toFixed(3)}, ${t.toFixed(3)})`), console.log(`  %cActual rendered pixel: ${u}`, `color: rgb(${c?.r},${c?.g},${c?.b}); font-weight: bold; font-size: 13px; background: #222; padding: 2px 8px`), f.length && console.log(`  5×5 non-transparent samples (${f.length}): ${f.slice(0, 8).join(" ")}`), console.log(`  Global opacity: ${this.opacity.toFixed(3)}, aspectX: ${this._aspectX.toFixed(3)}, scrollY: ${this.scrollY.toFixed(3)}`), d && _) {
      const y = d, g = _, A = p < m ? `PAST(${m - p})` : p === m ? "ACTIVE" : `FUTURE(${p - m})`;
      if (console.log(`  %cWord: "${y.text}" | line #${p} ${A} | wt=${y.wt} ad=${y.ad}`, "color: #ff0; font-weight: bold"), console.log(`  Line state: cOp=${g._cOp.toFixed(4)} cSc=${g._cSc.toFixed(4)} cOy=${g._cOy.toFixed(4)} tOp=${g._tOp.toFixed(4)}`), console.log(`  Word state: _p=${y._p.toFixed(4)} _cop=${y._cop.toFixed(4)} _tOp=${y._tOp.toFixed(4)} _wave=${y._wave.toFixed(4)} _glow=${y._glow.toFixed(4)}`), console.log(`  Word time: start=${y.start.toFixed(3)} end=${y.end.toFixed(3)} dur=${(y.end - y.start).toFixed(3)}`), y._isCharSplit && y._chars) {
        console.log(`  CHAR-SPLIT: ${y._charCount} chars`);
        for (const w of y._chars) {
          const T = w.base?.material?.opacity, S = w.fill?.material?.opacity, C = w.fill?.color, z = C?.isColor ? `rgb(${(C.r * 255).toFixed(0)},${(C.g * 255).toFixed(0)},${(C.b * 255).toFixed(0)})` : String(C), x = w.fill?.clipRect ? `[${w.fill.clipRect.map((L) => L.toFixed(2)).join(",")}]` : "null", R = w.fill?.scale ? `(${w.fill.scale.x.toFixed(3)},${w.fill.scale.y.toFixed(3)})` : "?";
          console.log(`    char[${w.idx}]: base.op=${T?.toFixed(4)} fill.op=${S?.toFixed(4)} fill.col=${z} fill.scale=${R} clip=${x}`);
        }
      } else {
        const w = y.base?.material?.opacity, T = y.fill?.material?.opacity, S = y.base?.color, C = y.fill?.color, z = S?.isColor ? `rgb(${(S.r * 255).toFixed(0)},${(S.g * 255).toFixed(0)},${(S.b * 255).toFixed(0)})` : String(S), x = C?.isColor ? `rgb(${(C.r * 255).toFixed(0)},${(C.g * 255).toFixed(0)},${(C.b * 255).toFixed(0)})` : String(C), R = y.fill?.clipRect ? `[${y.fill.clipRect.map((k) => k.toFixed(2)).join(",")}]` : "null", L = y.fill?.scale ? `(${y.fill.scale.x.toFixed(2)},${y.fill.scale.y.toFixed(2)})` : "?";
        console.log(`  base: opacity=${w?.toFixed(4)} color=${z}`), console.log(`  fill: opacity=${T?.toFixed(4)} color=${x} clipRect=${R} scale=${L}`), console.log(`  scale: (${y._scX.toFixed(3)}, ${y._scY.toFixed(3)}) layers: fill.mask=${y.fill?.layers?.mask}`);
      }
      if (c && c.a > 0) {
        const w = Math.round(255 * (y._isCharSplit, jt) * y._cop * this.opacity), T = Math.round((c.r + c.g + c.b) / 3);
        console.log(
          `  %cExpected brightness ~${w} | Actual pixel brightness ~${T} | Delta: ${T - w}`,
          Math.abs(T - w) > 20 ? "color: #f00; font-weight: bold" : "color: #0f0"
        );
      }
    } else
      console.log("  %cNo word found near click", "color: #f80; font-weight: bold");
    console.log("%c[LR-INSPECT] ═══════════════════════", "color: #0ff");
  }
  /**
   * DEBUG: Periodic dump — call from update() to log a compact comparison table every N seconds.
   * Shows all word types in visible lines and their actual material opacities.
   */
  debugPeriodicDump(e, t) {
    if (!this._debugEnabled || e - this._debugLastDump < 5) return;
    this._debugLastDump = e;
    const r = Math.max(0, t - 2), n = Math.min(this.lines.length - 1, t + 5);
    console.log(`%c[LR-DUMP] t=${e.toFixed(2)} active=#${t} globalOp=${this.opacity.toFixed(3)} scrollY=${this.scrollY.toFixed(3)}`, "color: #0ff; font-weight: bold");
    for (let i = r; i <= n; i++) {
      const o = this.lines[i];
      if (!o || o.isCue) continue;
      const a = i < t ? `past(${t - i})` : i === t ? "ACTIVE" : `fut(${i - t})`, l = o.entries.filter((c) => !c._isCueDot).map((c) => {
        if (c._isCharSplit && c._chars) {
          const u = c._chars[0], f = u.fill?.scale ? `(${u.fill.scale.x.toFixed(2)},${u.fill.scale.y.toFixed(2)})` : "?";
          return `"${c.text}"[${c.wt}] bOp=${u.base?.material?.opacity?.toFixed(3) || "?"} fOp=${u.fill?.material?.opacity?.toFixed(3) || "?"} fSc=${f} clip=${u.fill?.clipRect ? "Y" : "N"} p=${c._p.toFixed(2)}`;
        } else {
          const u = c.fill?.scale ? `(${c.fill.scale.x.toFixed(2)},${c.fill.scale.y.toFixed(2)})` : "?";
          return `"${c.text}"[${c.wt}] bOp=${c.base?.material?.opacity?.toFixed(3) || "?"} fOp=${c.fill?.material?.opacity?.toFixed(3) || "?"} fSc=${u} clip=${c.fill?.clipRect ? c.fill.clipRect[2] > 0 ? "open" : "shut" : "null"} p=${c._p.toFixed(2)}`;
        }
      });
      console.log(`  #${i} ${a.padEnd(8)} cOp=${o._cOp.toFixed(3)} | ${l.join(" | ")}`);
    }
  }
  /** Enable/disable debug mode. When enabled, logs every 5s + Shift+Click to inspect, reads pixel. */
  setDebug(e) {
    this._debugEnabled = e, console.log(`[LyricsRenderer] Debug mode ${e ? "ON — Shift+Click to inspect, logs every 5s" : "OFF"}`);
  }
  // ══════════════════════════════════════════════════════════════════════════════
  // ── TRANSLATIONS ──
  // ══════════════════════════════════════════════════════════════════════════════
  /** Set translation strings — parallel array to non-cue lines (same as DOM LyricsEngine) */
  setTranslations(e) {
    this._translations = Array.isArray(e) ? e : [];
    for (const n of this._translationMeshes)
      n && n.dispose();
    if (this._translationMeshes = [], !this.lines.length || !this._translations.length) return;
    const t = an * 0.55;
    let r = 0;
    for (let n = 0; n < this.lines.length; n++) {
      const i = this.lines[n];
      if (i.isCue) {
        this._translationMeshes.push(null);
        continue;
      }
      const o = this._translations[r] || "";
      if (r++, !o) {
        this._translationMeshes.push(null);
        continue;
      }
      const a = new fn();
      a.text = o, a.font = Ji, a.fontSize = t, a.maxWidth = Ks, a.unicodeFontsURL = Wr, a.fontWeight = 400, a.fontStyle = "italic", a.anchorX = "left", a.anchorY = "top", a.color = 16777215, a.transparent = !0, a.sdfGlyphSize = 64, a.gpuAccelerateSDF = !0, a.layers.set(1);
      let l = 0;
      for (const u of i.entries)
        !u.ad && (u._baseY || 0) < l && (l = u._baseY || 0);
      let c = l;
      if (i.hasInlineAdlibs)
        for (const u of i.entries)
          u.ad && (u._adBaseY || 0) < c && (c = u._adBaseY || 0);
      a.position.set(Xn, c - i.fs * 0.6, xi), i.group.add(a), a.sync(() => {
        a.material && (a.material.transparent = !0, a.material.depthWrite = !1, a.material.depthTest = !1, a.material.opacity = 0);
      }), this._translationMeshes.push(a);
    }
  }
  /** Show/hide translations */
  setTranslationsVisible(e) {
    if (this._translationVisible = e, !e)
      for (const t of this._translationMeshes)
        t?.material && (t.material.opacity = 0);
  }
}
class ut {
  constructor() {
    this._dimBlurMaterial = null, this._baseResolution = null, this.scene = new Zr(), this.camera = new Wt(75, window.innerWidth / window.innerHeight, 0.1, 1e3);
  }
  resize(e, t, r) {
    if (this.camera instanceof Wt && (this.camera.aspect = e / t, this.camera.updateProjectionMatrix()), this._dimBlurMaterial?.uniforms.u_resolution) {
      const n = r || window.devicePixelRatio || 1;
      this._baseResolution = new De(e * n, t * n);
    }
  }
  /**
   * Call in subclass constructor after creating the ShaderMaterial.
   * Injects u_dim and u_blur uniforms and wraps the fragment shader.
   */
  enableDimBlur(e) {
    if (this._dimBlurMaterial = e, e.uniforms.u_resolution) {
      const n = e.uniforms.u_resolution.value;
      this._baseResolution = new De(n.x, n.y);
    }
    e.uniforms.u_dim = { value: 0 }, e.uniforms.u_blur = { value: 0 };
    let t = e.fragmentShader;
    t = t.replace(/\n\s*gl_FragColor\.rgb \*= \(1\.0 - u_dim\);/g, "");
    const r = t.lastIndexOf("}");
    e.fragmentShader = `uniform float u_dim;
uniform float u_blur;
` + t.substring(0, r) + `
  gl_FragColor.rgb *= (1.0 - u_dim);
}`, e.needsUpdate = !0;
  }
  /** Dim the shader scene (0 = normal, 1 = black) */
  setDim(e) {
    if (this._dimBlurMaterial) {
      this._dimBlurMaterial.uniforms.u_dim.value = e;
      return;
    }
    this.scene.traverse((t) => {
      const r = t.material;
      if (r && r.isShaderMaterial && r.fragmentShader)
        if (r.uniforms.u_dim)
          r.uniforms.u_dim.value = e;
        else {
          r.uniforms.u_dim = { value: e };
          let n = r.fragmentShader;
          if (!n.includes("u_dim")) {
            const i = n.lastIndexOf("}");
            r.fragmentShader = `uniform float u_dim;
` + n.substring(0, i) + `
  gl_FragColor.rgb *= (1.0 - u_dim);
}`, r.needsUpdate = !0;
          }
        }
    });
  }
  /** Blur the shader scene (0 = sharp, 1 = max blur) — reduces effective resolution */
  setBlur(e) {
    if (this._dimBlurMaterial && (this._dimBlurMaterial.uniforms.u_blur.value = e, this._dimBlurMaterial.uniforms.u_resolution && this._baseResolution)) {
      const t = Math.max(0.05, 1 - e * 0.85);
      this._dimBlurMaterial.uniforms.u_resolution.value.set(
        this._baseResolution.x * t,
        this._baseResolution.y * t
      );
    }
  }
}
var ct = `varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`, em = `precision highp float;
uniform float u_time;
uniform float u_bass;
uniform float u_treble;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
varying vec2 vUv;

vec4 qMul(vec4 a, vec4 b) {
  return vec4(
    a.x*b.x - a.y*b.y - a.z*b.z - a.w*b.w,
    a.x*b.y + a.y*b.x + a.z*b.w - a.w*b.z,
    a.x*b.z - a.y*b.w + a.z*b.x + a.w*b.y,
    a.x*b.w + a.y*b.z - a.z*b.y + a.w*b.x
  );
}

float julia4D(vec3 p, vec4 c) {
  vec4 z = vec4(p, 0.0);
  float md2 = 1.0;
  float mz2 = dot(z, z);

  for (int i = 0; i < 8; i++) {
    md2 *= 4.0 * mz2;
    z = qMul(z, z) + c;
    mz2 = dot(z, z);
    if (mz2 > 4.0) break;
  }

  return 0.25 * sqrt(mz2 / md2) * log(mz2);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  
  vec3 ro = vec3(0.0, 0.0, 2.5);
  vec3 rd = normalize(vec3(uv, -1.5));

  
  vec4 c = vec4(
    -0.2 + u_bass * 0.6 * sin(u_time * 0.3),
    0.6 + u_bass * 0.3 * cos(u_time * 0.2),
    0.2 + u_bass * 0.2 * sin(u_time * 0.5),
    -0.5 + u_bass * 0.4
  );

  
  float t = 0.0;
  vec3 col = vec3(0.0);

  for (int i = 0; i < 64; i++) {
    vec3 p = ro + rd * t;
    float d = julia4D(p, c);
    if (d < 0.002) {
      
      float glow = 1.0 - float(i) / 64.0;
      float colorIdx = glow * 2.0;
      vec3 baseCol = colorIdx < 1.0 ? mix(u_colors[0], u_colors[1], colorIdx) : mix(u_colors[1], u_colors[2], colorIdx - 1.0);
      col = baseCol * (0.4 + glow * 0.8);
      break;
    }
    t += d * 0.8;
    if (t > 10.0) break;
  }

  
  col += u_colors[2] * u_treble * 0.3;

  
  vec3 bg = u_colors[0] * 0.15 + u_colors[2] * 0.05 * (1.0 - length(uv));
  float hit = step(0.01, length(col));
  col = mix(bg, col, hit);

  gl_FragColor = vec4(col, 1.0);
}`;
class tm extends ut {
  constructor() {
    super(), this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: em,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_treble: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_colors: {
          value: [
            new me(1705267),
            new me(4856130),
            new me(996448)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = e.bass, this.material.uniforms.u_treble.value = e.treble;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var nm = `precision highp float;
uniform sampler2D u_positions;
uniform float u_time;
uniform float u_bass;
uniform float u_treble;
uniform vec2 u_resolution;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec3 pos = texture2D(u_positions, uv).xyz;

  
  float sigma = 10.0;
  float rho = 28.0 + u_bass * 20.0;
  float beta = 8.0 / 3.0;

  float dt = 0.001 + u_treble * 0.005;

  float dx = sigma * (pos.y - pos.x);
  float dy = pos.x * (rho - pos.z) - pos.y;
  float dz = pos.x * pos.y - beta * pos.z;

  pos += vec3(dx, dy, dz) * dt;

  gl_FragColor = vec4(pos, 1.0);
}`, im = `uniform sampler2D u_positions;
uniform float u_bass;
attribute vec2 a_ref;
varying vec3 vColor;

void main() {
  vec3 pos = texture2D(u_positions, a_ref).xyz;
  
  pos *= 0.03 * (1.0 + u_bass * 0.5);
  vColor = normalize(abs(pos)) * 0.8 + 0.2;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 3.0;
}`, rm = `varying vec3 vColor;
void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
  gl_FragColor = vec4(vColor, alpha);
}`;
const mt = 512;
class sm extends ut {
  constructor(e) {
    super(), this.flip = !1, this.renderer = e, this.scene.background = new me(328208), this.camera.position.z = 3;
    const t = new Float32Array(mt * mt * 4);
    for (let l = 0; l < mt * mt; l++)
      t[l * 4] = (Math.random() - 0.5) * 50, t[l * 4 + 1] = (Math.random() - 0.5) * 50, t[l * 4 + 2] = Math.random() * 50, t[l * 4 + 3] = 1;
    const r = new rr(t, mt, mt, 1023, 1015);
    r.needsUpdate = !0;
    const n = { minFilter: 1003, magFilter: 1003, format: 1023, type: 1015 };
    this.rt1 = new gt(mt, mt, n), this.rt2 = new gt(mt, mt, n), this.simCamera = new nt(-1, 1, 1, -1, 0, 1), this.simScene = new Zr(), this.simMaterial = new Je({
      vertexShader: ct,
      fragmentShader: nm,
      uniforms: {
        u_positions: { value: r },
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_treble: { value: 0 },
        u_resolution: { value: new De(mt, mt) }
      }
    });
    const i = new qe(new tt(2, 2), this.simMaterial);
    this.simScene.add(i), e.setRenderTarget(this.rt1), e.render(this.simScene, this.simCamera), e.setRenderTarget(null);
    const o = new Float32Array(mt * mt * 2);
    for (let l = 0; l < mt; l++)
      for (let c = 0; c < mt; c++) {
        const u = l * mt + c;
        o[u * 2] = c / mt, o[u * 2 + 1] = l / mt;
      }
    const a = new qt();
    a.setAttribute("position", new Xt(new Float32Array(mt * mt * 3), 3)), a.setAttribute("a_ref", new Xt(o, 2)), this.renderMaterial = new Je({
      vertexShader: im,
      fragmentShader: rm,
      uniforms: {
        u_positions: { value: this.rt1.texture },
        u_bass: { value: 0 }
      },
      transparent: !0,
      depthWrite: !1
    }), this.particles = new Fd(a, this.renderMaterial), this.scene.add(this.particles), this.gpuCompute = { rt1: this.rt1, rt2: this.rt2, simMat: this.simMaterial, mesh: i };
  }
  update(e, t) {
    const r = this.flip ? this.rt2 : this.rt1, n = this.flip ? this.rt1 : this.rt2;
    this.simMaterial.uniforms.u_positions.value = r.texture, this.simMaterial.uniforms.u_time.value = t, this.simMaterial.uniforms.u_bass.value = e.bass, this.simMaterial.uniforms.u_treble.value = e.treble, this.renderer.setRenderTarget(n), this.renderer.render(this.simScene, this.simCamera), this.renderer.setRenderTarget(null), this.renderMaterial.uniforms.u_positions.value = n.texture, this.renderMaterial.uniforms.u_bass.value = e.bass, this.flip = !this.flip, this.camera.position.x = Math.sin(t * 0.1) * 3, this.camera.position.z = Math.cos(t * 0.1) * 3, this.camera.lookAt(0, 0, 0);
  }
  dispose() {
    this.rt1.dispose(), this.rt2.dispose(), this.simMaterial.dispose(), this.renderMaterial.dispose();
  }
}
var am = `uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform sampler2D u_freqData;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normal;
  vec3 pos = position;

  
  float theta = atan(pos.y, pos.x);
  float phi = acos(pos.z / length(pos));

  
  float freq = texture2D(u_freqData, vec2(theta / 6.2832 + 0.5, 0.5)).r;

  
  float disp = freq * u_bass * 0.5 + sin(phi * 8.0 + u_time * 2.0) * u_mid * 0.2;
  pos += normal * disp;

  vPosition = pos;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`, om = `uniform float u_time;
uniform float u_treble;
uniform vec3 u_colors[3];
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 light = normalize(vec3(1.0, 1.0, 2.0));
  float diff = max(dot(vNormal, light), 0.0);
  vec3 viewDir = normalize(-vPosition);
  vec3 reflectDir = reflect(-light, vNormal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);

  
  float normMix = dot(vNormal, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
  vec3 baseCol = normMix < 0.5 ? mix(u_colors[0], u_colors[1], normMix * 2.0) : mix(u_colors[1], u_colors[2], (normMix - 0.5) * 2.0);
  vec3 col = baseCol * (0.3 + diff * 0.7) + u_colors[2] * spec * (0.5 + u_treble);
  col += u_colors[0] * 0.08;
  gl_FragColor = vec4(col, 1.0);
}`;
class lm extends ut {
  constructor() {
    super(), this.scene.background = new me(196882), this.camera.position.z = 3, this.freqData = new Uint8Array(256), this.freqTexture = new rr(this.freqData, 256, 1, 1028, 1009), this.freqTexture.needsUpdate = !0, this.material = new Je({
      vertexShader: am,
      fragmentShader: om,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_freqData: { value: this.freqTexture },
        u_colors: {
          value: [
            new me(196882),
            new me(1718906),
            new me(8247039)
          ]
        }
      }
    });
    const e = new qe(new ea(1, 128, 128), this.material);
    this.scene.add(e), this.scene.add(new Gd(1118498));
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = e.bass, this.material.uniforms.u_mid.value = e.mid, this.material.uniforms.u_treble.value = e.treble;
    for (let r = 0; r < 256; r++) {
      const n = r / 256;
      this.freqData[r] = Math.floor(
        (e.bass * (1 - n) + e.treble * n) * 255 * (0.5 + 0.5 * Math.sin(n * 20 + t * 3))
      );
    }
    this.freqTexture.needsUpdate = !0;
  }
  dispose() {
    this.material.dispose(), this.freqTexture.dispose();
  }
}
var cm = `precision highp float;
uniform sampler2D u_state;
uniform vec2 u_resolution;
uniform float u_bass;
uniform float u_treble;
uniform float u_time;
varying vec2 vUv;

void main() {
  vec2 texel = 1.0 / u_resolution;
  vec4 state = texture2D(u_state, vUv);
  float a = state.r;
  float b = state.g;

  
  float la = -a;
  float lb = -b;
  la += texture2D(u_state, vUv + vec2(texel.x, 0.0)).r * 0.2;
  la += texture2D(u_state, vUv - vec2(texel.x, 0.0)).r * 0.2;
  la += texture2D(u_state, vUv + vec2(0.0, texel.y)).r * 0.2;
  la += texture2D(u_state, vUv - vec2(0.0, texel.y)).r * 0.2;
  la += texture2D(u_state, vUv + texel).r * 0.05;
  la += texture2D(u_state, vUv - texel).r * 0.05;
  la += texture2D(u_state, vUv + vec2(texel.x, -texel.y)).r * 0.05;
  la += texture2D(u_state, vUv + vec2(-texel.x, texel.y)).r * 0.05;

  lb += texture2D(u_state, vUv + vec2(texel.x, 0.0)).g * 0.2;
  lb += texture2D(u_state, vUv - vec2(texel.x, 0.0)).g * 0.2;
  lb += texture2D(u_state, vUv + vec2(0.0, texel.y)).g * 0.2;
  lb += texture2D(u_state, vUv - vec2(0.0, texel.y)).g * 0.2;
  lb += texture2D(u_state, vUv + texel).g * 0.05;
  lb += texture2D(u_state, vUv - texel).g * 0.05;
  lb += texture2D(u_state, vUv + vec2(texel.x, -texel.y)).g * 0.05;
  lb += texture2D(u_state, vUv + vec2(-texel.x, texel.y)).g * 0.05;

  
  float f = 0.037 + u_bass * 0.03;
  float k = 0.06 + u_treble * 0.02;
  float Da = 1.0;
  float Db = 0.5;

  float abb = a * b * b;
  float na = a + (Da * la - abb + f * (1.0 - a));
  float nb = b + (Db * lb + abb - (k + f) * b);

  gl_FragColor = vec4(clamp(na, 0.0, 1.0), clamp(nb, 0.0, 1.0), 0.0, 1.0);
}`;
const Rt = 512;
class um extends ut {
  constructor(e) {
    super(), this.flip = !1, this.renderer = e, this.camera = new nt(-1, 1, 1, -1, 0, 1);
    const t = { minFilter: 1006, magFilter: 1006, format: 1023, type: 1015 };
    this.rt1 = new gt(Rt, Rt, t), this.rt2 = new gt(Rt, Rt, t);
    const r = new Float32Array(Rt * Rt * 4);
    for (let i = 0; i < Rt * Rt; i++) {
      const o = i % Rt / Rt - 0.5, a = Math.floor(i / Rt) / Rt - 0.5;
      r[i * 4] = 1, r[i * 4 + 1] = Math.abs(o) < 0.05 && Math.abs(a) < 0.05 ? 1 : 0, r[i * 4 + 2] = 0, r[i * 4 + 3] = 1;
    }
    const n = new rr(r, Rt, Rt, 1023, 1015);
    n.needsUpdate = !0, this.simCamera = new nt(-1, 1, 1, -1, 0, 1), this.simScene = new Zr(), this.simMaterial = new Je({
      vertexShader: ct,
      fragmentShader: cm,
      uniforms: {
        u_state: { value: n },
        u_resolution: { value: new De(Rt, Rt) },
        u_bass: { value: 0 },
        u_treble: { value: 0 },
        u_time: { value: 0 }
      }
    }), this.simScene.add(new qe(new tt(2, 2), this.simMaterial)), e.setRenderTarget(this.rt1), e.render(this.simScene, this.simCamera), e.setRenderTarget(null), this.displayMaterial = new Jn({ map: this.rt1.texture }), this.scene.add(new qe(new tt(2, 2), this.displayMaterial));
  }
  update(e, t) {
    for (let r = 0; r < 8; r++) {
      const n = this.flip ? this.rt2 : this.rt1, i = this.flip ? this.rt1 : this.rt2;
      this.simMaterial.uniforms.u_state.value = n.texture, this.simMaterial.uniforms.u_bass.value = e.bass, this.simMaterial.uniforms.u_treble.value = e.treble, this.simMaterial.uniforms.u_time.value = t, this.renderer.setRenderTarget(i), this.renderer.render(this.simScene, this.simCamera), this.flip = !this.flip;
    }
    this.renderer.setRenderTarget(null), this.displayMaterial.map = (this.flip ? this.rt2 : this.rt1).texture, this.displayMaterial.needsUpdate = !0;
  }
  dispose() {
    this.rt1.dispose(), this.rt2.dispose(), this.simMaterial.dispose(), this.displayMaterial.dispose();
  }
}
var fm = `precision highp float;
uniform float u_time;
uniform float u_rms;
uniform float u_mid;
uniform vec2 u_resolution;
varying vec2 vUv;

vec2 cdiv(vec2 a, vec2 b) {
  float d = dot(b, b);
  return vec2(a.x*b.x + a.y*b.y, a.y*b.x - a.x*b.y) / d;
}

float hdist(vec2 a, vec2 b) {
  vec2 diff = a - b;
  float num = length(diff);
  float denom = length(vec2(1.0) - a * b);
  return log((1.0 + num/denom) / (1.0 - num/denom + 0.001));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  
  float zoom = 1.0 + u_rms * 2.0 + sin(u_time * 0.2) * 0.3;
  uv *= zoom;

  
  float r = length(uv);
  if (r > 0.99) {
    gl_FragColor = vec4(0.0);
    return;
  }

  
  float angle = atan(uv.y, uv.x);
  float n = 7.0; 

  
  vec2 z = uv;
  float edgeDist = 1.0;

  for (int i = 0; i < 12; i++) {
    
    float a = floor(atan(z.y, z.x) / (6.2832 / n) + 0.5) * (6.2832 / n);
    float cs = cos(-a), sn = sin(-a);
    z = vec2(z.x * cs - z.y * sn, z.x * sn + z.y * cs);

    
    float geoR = 1.0 / cos(3.14159 / n);
    vec2 center = vec2(geoR, 0.0);
    vec2 diff = z - center;
    float d = dot(diff, diff);
    float invR2 = geoR * geoR - 1.0;

    if (d < invR2) {
      z = center + diff * invR2 / d;
    } else {
      break;
    }

    edgeDist = min(edgeDist, abs(length(diff) - sqrt(invR2)));
  }

  
  float tile = mod(floor(atan(z.y, z.x) * n / 6.2832), 2.0);
  vec3 col = mix(vec3(0.05, 0.05, 0.2), vec3(0.1, 0.0, 0.3), tile);

  
  float edge = smoothstep(0.02, 0.0, edgeDist);
  col += vec3(0.3, 0.6, 1.0) * edge * (0.5 + u_mid * 2.0);

  
  col += vec3(0.1, 0.2, 0.5) * smoothstep(0.9, 1.0, r);

  gl_FragColor = vec4(col, 1.0);
}`;
class hm extends ut {
  constructor() {
    super(), this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: fm,
      uniforms: {
        u_time: { value: 0 },
        u_rms: { value: 0 },
        u_mid: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) }
      }
    }), this.scene.add(new qe(new tt(2, 2), this.material));
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_rms.value = e.rms, this.material.uniforms.u_mid.value = e.mid;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var dm = `uniform float u_time;
uniform float u_bass;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;
uniform float u_smoothing;

varying vec2 vUv;

vec3 hash3(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return fract(sin(p) * 43758.5453) * 2.0 - 1.0;
}

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise3d(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)),
                     dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                 mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)),
                     dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
             mix(mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)),
                     dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                 mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)),
                     dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z);
}

float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
        v += a * noise3d(p);
        p *= 2.1;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);

    
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }

    
    float time = u_time * 0.15;
    float bassMod = u_bass * 0.4;

    
    vec3 coords = vec3(p * (1.8 - u_bass * 0.3), time);

    
    vec3 q = vec3(fbm(coords), fbm(coords + vec3(1.2, 4.3, 0.5)), 0.0);
    vec3 r = vec3(fbm(coords + q * 2.5 + vec3(5.7, 1.2, time)),
                  fbm(coords + q * 1.5 + vec3(2.3, 7.8, time)), 0.0);

    float n = fbm(coords + r * (2.0 + bassMod));
    float t = smoothstep(-0.7, 0.7, n);

    
    
    vec3 col0_dark = u_colors[0] * 0.3;  
    vec3 col1_mid = u_colors[1] * 0.6;   
    vec3 col1_hot = u_colors[1];          
    vec3 col2_bright = u_colors[2];       

    
    vec3 finalCol = col0_dark;

    
    finalCol = mix(finalCol, col1_mid, smoothstep(0.1, 0.4, t));

    
    float flowMask = smoothstep(0.35 - bassMod * 0.2, 0.7, t);
    finalCol = mix(finalCol, col1_hot, flowMask);

    
    float heatMask = smoothstep(0.65 - u_rms * 0.25, 0.95, t);
    finalCol = mix(finalCol, col2_bright, heatMask);

    
    
    float grain = hash(uv * 500.0) * 0.08;
    finalCol -= (1.0 - flowMask) * grain;

    
    float edgeDetails = noise3d(vec3(p * 40.0, time * 0.1));
    finalCol += (flowMask * (1.0 - heatMask)) * edgeDetails * 0.1;

    
    finalCol *= 0.9 + (u_rms * 0.4);

    
    finalCol *= smoothstep(1.3, 0.4, length(p));

    
    finalCol = pow(clamp(finalCol, 0.0, 1.0), vec3(0.9));

    gl_FragColor = vec4(finalCol, 1.0);
}`;
class pm extends ut {
  constructor() {
    super(), this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: dm,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_rms: { value: 0 },
        u_smoothing: { value: 0.5 },
        u_dim: { value: 0 },
        u_blur: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_debug: { value: !1 },
        u_colors: {
          value: [
            new me(1705267),
            new me(4856130),
            new me(996448)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = e.bass, this.material.uniforms.u_rms.value = e.rms;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  setDim(e) {
    this.material.uniforms.u_dim.value = e;
  }
  setBlur(e) {
    this.material.uniforms.u_blur.value = e;
  }
  dispose() {
    this.material.dispose();
  }
}
var mm = `precision highp float;
uniform sampler2D u_velocity;
uniform sampler2D u_pressure;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_bass;
uniform float u_dissipation;

varying vec2 vUv;

void main() {
  vec2 texel = 1.0 / u_resolution;
  vec2 vel = texture2D(u_velocity, vUv).xy;

  
  vec2 prevPos = vUv - vel * texel * 1.0;
  vec2 advected = texture2D(u_velocity, prevPos).xy;

  
  float pL = texture2D(u_pressure, vUv - vec2(texel.x, 0.0)).x;
  float pR = texture2D(u_pressure, vUv + vec2(texel.x, 0.0)).x;
  float pB = texture2D(u_pressure, vUv - vec2(0.0, texel.y)).x;
  float pT = texture2D(u_pressure, vUv + vec2(0.0, texel.y)).x;
  advected -= 0.5 * vec2(pR - pL, pT - pB);

  
  float angle1 = u_time * 1.7;
  float angle2 = u_time * 2.3 + 3.14;
  vec2 injectPos1 = vec2(0.5 + 0.3 * cos(angle1), 0.5 + 0.3 * sin(angle1));
  vec2 injectPos2 = vec2(0.5 + 0.2 * cos(angle2), 0.5 + 0.2 * sin(angle2));

  float dist1 = length(vUv - injectPos1);
  float dist2 = length(vUv - injectPos2);
  float inject1 = smoothstep(0.08, 0.0, dist1) * u_bass * 3.0;
  float inject2 = smoothstep(0.08, 0.0, dist2) * u_bass * 3.0;

  vec2 force1 = vec2(cos(u_time * 3.0), sin(u_time * 2.0)) * inject1;
  vec2 force2 = vec2(sin(u_time * 2.5), cos(u_time * 1.8)) * inject2;

  advected += force1 + force2;

  
  advected *= u_dissipation;

  gl_FragColor = vec4(advected, 0.0, 1.0);
}`, _m = `precision highp float;
uniform sampler2D u_albumArt;
uniform sampler2D u_velocity;
uniform sampler2D u_prevFrame;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_bass;
uniform float u_treble;
uniform float u_rms;
uniform float u_healRate;
uniform vec3 u_colors[3];

varying vec2 vUv;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

float voronoi(vec2 p, float scale) {
  vec2 n = floor(p * scale);
  vec2 f = fract(p * scale);
  float md = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      o = 0.5 + 0.5 * sin(u_time * 0.5 + 6.2831 * o);
      vec2 r = g + o - f;
      float d = dot(r, r);
      md = min(md, d);
    }
  }
  return sqrt(md);
}

vec3 paletteMap(float lum, vec3 c0, vec3 c1, vec3 c2) {
  
  if (lum < 0.5) {
    return mix(c0, c1, lum * 2.0);
  }
  return mix(c1, c2, (lum - 0.5) * 2.0);
}

void main() {
  vec2 texel = 1.0 / u_resolution;

  
  vec2 vel = texture2D(u_velocity, vUv).xy;
  vec2 advectedUv = vUv - vel * texel * 2.0;

  
  float aberration = u_rms * 0.008;
  vec2 dir = normalize(vUv - 0.5) * aberration;
  float r = texture2D(u_albumArt, advectedUv + dir).r;
  float g = texture2D(u_albumArt, advectedUv).g;
  float b = texture2D(u_albumArt, advectedUv - dir).b;
  vec3 advectedColor = vec3(r, g, b);

  
  vec3 original = texture2D(u_albumArt, vUv).rgb;

  
  vec3 color = mix(advectedColor, original, u_healRate);

  
  float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
  vec3 paletteTinted = paletteMap(lum, u_colors[0], u_colors[1], u_colors[2]);
  
  
  float tintStrength = 0.3 + u_bass * 0.35;
  color = mix(color, paletteTinted, tintStrength);

  
  float vor = voronoi(vUv, 6.0 + u_treble * 4.0);
  float shatterEdge = smoothstep(0.02, 0.05, vor);
  
  vec3 shatterColor = mix(color * 1.3, color, shatterEdge);
  color = mix(color, shatterColor, u_treble * 0.7);

  
  float edgeGlow = smoothstep(0.05, 0.01, vor) * u_treble;
  color += u_colors[2] * edgeGlow * 1.5;

  
  vec3 prev = texture2D(u_prevFrame, vUv * 1.005).rgb; 
  color = mix(color, prev, 0.15);

  
  float bassGlow = u_bass * 0.15;
  float radial = 1.0 - length(vUv - 0.5) * 1.4;
  color += mix(u_colors[0], u_colors[1], 0.5) * bassGlow * max(radial, 0.0);

  
  float energy = u_rms * u_treble;
  color += u_colors[2] * energy * 0.2 * smoothstep(0.4, 0.8, vor);

  gl_FragColor = vec4(color, 1.0);
}`;
const yi = 256;
class Fo extends ut {
  constructor(e) {
    super(), this.flip = !1, this.renderer = e, this.camera = new nt(-1, 1, 1, -1, 0, 1);
    const t = 128, r = new Uint8Array(t * t * 4);
    for (let u = 0; u < t; u++)
      for (let f = 0; f < t; f++) {
        const h = (u * t + f) * 4, d = f / t, _ = u / t;
        r[h] = Math.floor((0.1 + d * 0.2) * 255), r[h + 1] = Math.floor((0.05 + _ * 0.15) * 255), r[h + 2] = Math.floor((0.2 + (d + _) * 0.15) * 255), r[h + 3] = 255;
      }
    this.defaultTexture = new rr(r, t, t, 1023), this.defaultTexture.needsUpdate = !0, this.albumTexture = this.defaultTexture;
    const n = {
      minFilter: 1006,
      magFilter: 1006,
      format: 1023,
      type: 1016
    };
    this.velRT1 = new gt(yi, yi, n), this.velRT2 = new gt(yi, yi, n);
    const i = window.innerWidth, o = window.innerHeight, a = {
      minFilter: 1006,
      magFilter: 1006,
      format: 1023,
      type: 1009
    };
    this.frameRT1 = new gt(i, o, a), this.frameRT2 = new gt(i, o, a), this.simCamera = new nt(-1, 1, 1, -1, 0, 1), this.simScene = new Zr(), this.velMaterial = new Je({
      vertexShader: ct,
      fragmentShader: mm,
      uniforms: {
        u_velocity: { value: null },
        u_pressure: { value: null },
        u_resolution: { value: new De(yi, yi) },
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_dissipation: { value: 0.97 }
      }
    });
    const l = new qe(new tt(2, 2), this.velMaterial);
    this.simScene.add(l), this.canvasMaterial = new Je({
      vertexShader: ct,
      fragmentShader: _m,
      uniforms: {
        u_albumArt: { value: this.albumTexture },
        u_velocity: { value: this.velRT1.texture },
        u_prevFrame: { value: this.frameRT1.texture },
        u_resolution: { value: new De(i, o) },
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_healRate: { value: 0.02 },
        u_colors: {
          value: [
            new me(1705267),
            new me(4856130),
            new me(3377407)
          ]
        }
      }
    });
    const c = new qe(new tt(2, 2), this.canvasMaterial);
    this.scene.add(c), globalThis.__DEBUG__ && console.log("[LivingCanvas] Scene initialized");
  }
  setAlbumArt(e) {
    new Bd().load(e, (r) => {
      r.minFilter = 1006, r.magFilter = 1006, this.albumTexture = r, this.canvasMaterial.uniforms.u_albumArt.value = r, globalThis.__DEBUG__ && console.log("[LivingCanvas] Album art loaded:", e);
    }, void 0, () => {
      console.warn("[LivingCanvas] Failed to load album art, using default");
    });
  }
  setAlbumTexture(e) {
    this.albumTexture = e, this.canvasMaterial.uniforms.u_albumArt.value = e;
  }
  setPalette(e) {
    this.canvasMaterial.uniforms.u_colors.value = e;
  }
  update(e, t) {
    const r = this.flip ? this.velRT2 : this.velRT1, n = this.flip ? this.velRT1 : this.velRT2;
    this.velMaterial.uniforms.u_velocity.value = r.texture, this.velMaterial.uniforms.u_pressure.value = r.texture, this.velMaterial.uniforms.u_time.value = t, this.velMaterial.uniforms.u_bass.value = e.bass, this.renderer.setRenderTarget(n), this.renderer.render(this.simScene, this.simCamera), this.renderer.setRenderTarget(null), this.canvasMaterial.uniforms.u_velocity.value = n.texture, this.canvasMaterial.uniforms.u_time.value = t, this.canvasMaterial.uniforms.u_bass.value = e.bass, this.canvasMaterial.uniforms.u_treble.value = e.treble, this.canvasMaterial.uniforms.u_rms.value = e.rms;
    const i = this.flip ? this.frameRT2 : this.frameRT1, o = this.flip ? this.frameRT1 : this.frameRT2;
    this.canvasMaterial.uniforms.u_prevFrame.value = i.texture, this.renderer.setRenderTarget(o), this.renderer.render(this.scene, this.camera), this.renderer.setRenderTarget(null), this.flip = !this.flip;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.canvasMaterial.uniforms.u_resolution.value.set(e * n, t * n), this.frameRT1.setSize(e, t), this.frameRT2.setSize(e, t);
  }
  dispose() {
    this.velRT1.dispose(), this.velRT2.dispose(), this.frameRT1.dispose(), this.frameRT2.dispose(), this.velMaterial.dispose(), this.canvasMaterial.dispose(), this.albumTexture !== this.defaultTexture && this.albumTexture.dispose(), this.defaultTexture.dispose();
  }
}
var vm = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

float fractalSDF(vec3 p) {
    
    p.xy *= rot(u_time * 0.05);

    
    float cellSize = 8.0;
    vec3 p_mod = p;
    p_mod.z = mod(p.z, cellSize) - cellSize * 0.5;

    
    float safeBass = min(u_bass, 0.85);
    float safeMid = min(u_mid, 0.85);
    float safeTreble = min(u_treble, 0.85);

    
    float tunnel = length(p_mod.xy) - (1.2 + safeBass * 0.8 + sin(p.z * 0.5) * 0.4);

    float scale = 1.8 + safeMid * 0.4;

    
    for (int i = 0; i < 7; i++) {
        p_mod = abs(p_mod) - vec3(0.8, 1.2, 0.6);

        p_mod.xy *= rot(0.5 + safeBass * 0.1 + float(i) * 0.2);
        p_mod.yz *= rot(0.3 + safeTreble * 0.1);

        
        if (p_mod.x < p_mod.y) p_mod.xy = p_mod.yx;
        if (p_mod.x < p_mod.z) p_mod.xz = p_mod.zx;

        p_mod = p_mod * scale - vec3(1.0, 2.0, 1.0) * (scale - 1.0);
    }

    float fractal = (length(p_mod) - 1.5) / pow(scale, 7.0);

    
    return smin(fractal, -tunnel, 0.5);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    
    float fov = 1.0 - min(u_rms, 0.8) * 0.3;
    vec3 rd = normalize(vec3(uv * fov, 1.2));

    
    float baseSpeed = u_time * 3.5;
    float kick = smoothstep(0.5, 1.0, u_bass) * 0.2;
    vec3 ro = vec3(0.0, 0.0, baseSpeed + kick);

    
    ro.x += sin(u_time * 0.7) * 0.5;
    ro.y += cos(u_time * 0.5) * 0.5;

    
    rd.xy *= rot(sin(u_time * 0.3) * 0.2 + min(u_rms, 0.8) * 0.1);
    rd.xz *= rot(cos(u_time * 0.2) * 0.1);

    float t = 0.05;
    float glow = 0.0;
    float d = 0.0;

    
    for (int i = 0; i < 80; i++) {
        vec3 p = ro + rd * t;
        d = fractalSDF(p);

        
        glow += (0.02 + min(u_treble, 0.85) * 0.05) / (0.1 + d * d * 15.0);

        if (d < 0.002 || t > 30.0) break;
        t += d * 0.75;
    }

    vec3 col = vec3(0.0);

    
    vec3 bgCol = mix(u_colors[0] * 0.5, u_colors[2] * 0.5, sin(u_time * 0.2) * 0.5 + 0.5);

    if (d < 0.1) {
        float edge = smoothstep(0.1, 0.0, d);
        
        vec3 material = mix(u_colors[1] * 0.65, u_colors[2] * 0.65, fract(t * 0.1 + u_time * 0.1));
        col = material * edge;

        
        col += u_colors[0] * 0.6 * (1.0 - fract(t * 0.5 - u_time * 2.0)) * min(u_bass, 0.85);
    }

    
    col += glow * mix(u_colors[1] * 0.6, u_colors[0] * 0.6, min(u_rms, 0.8));

    
    col = mix(col, bgCol * 0.05, smoothstep(5.0, 30.0, t));

    
    float mask = 1.0 - length(uv * 0.8);
    col *= mask;

    
    col = smoothstep(-0.05, 1.05, col);
    col = pow(col, vec3(0.8));

        
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}`;
class gm extends ut {
  constructor() {
    super(), this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: vm,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_debug: { value: !1 },
        u_colors: {
          value: [
            new me(2754629),
            new me(6570405),
            new me(54527)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = e.bass, this.material.uniforms.u_mid.value = e.mid, this.material.uniforms.u_treble.value = e.treble, this.material.uniforms.u_rms.value = e.rms;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var xm = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float val = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
        val += amp * noise(p);
        p *= 2.3;
        amp *= 0.45;
    }
    return val;
}

float map(vec3 p) {
    float h = fbm(p.xz * 0.2) * 3.5;
    h += noise(p.xz * 0.5 + u_time * 0.1) * u_bass * 1.5;
    float waterLevel = 0.2 + sin(u_time * 0.5) * 0.1;
    return p.y - max(h, waterLevel);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.1, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        0.2,
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    
    float fov = 1.0 - u_rms * 0.2;
    vec3 rd = normalize(vec3(uv * fov, 1.0));

    
    float travel = u_time * 3.0;
    vec3 ro = vec3(sin(u_time * 0.2) * 1.5, 3.5 + u_bass, travel);

    
    float alpha = sin(u_time * 0.3) * 0.1;
    float s = sin(alpha), c = cos(alpha);
    rd.xy *= mat2(c, -s, s, c);

    float t = 0.1;
    float d = 0.0;

    
    for (int i = 0; i < 50; i++) {
        d = map(ro + rd * t);
        if (d < 0.02 || t > 40.0) break;
        t += d * 0.6;
    }

    vec3 col = vec3(0.0);
    vec3 lightDir = normalize(vec3(0.5, 0.8, -0.5));

    if (t < 40.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        float diff = max(dot(n, lightDir), 0.0);

        
        float h = p.y;
        vec3 terrainCol = mix(u_colors[2], u_colors[1], smoothstep(0.3, 1.5, h));

        
        float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
        terrainCol += u_colors[0] * fresnel * u_treble * 2.0;

        col = terrainCol * (diff + 0.2);
    }

    
    float fog = smoothstep(0.0, 40.0, t);
    vec3 fogCol = mix(u_colors[0] * 0.2, u_colors[1] * 0.1, uv.y + 0.5);
    col = mix(col, fogCol, fog);

    
    float sun = pow(max(dot(rd, lightDir), 0.0), 10.0);
    col += u_colors[1] * sun * u_bass;

    
    col = pow(col, vec3(0.8));

        
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}`;
class ym extends ut {
  constructor() {
    super(), this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: xm,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_debug: { value: !1 },
        u_colors: {
          value: [
            new me(1706542),
            new me(4876097),
            new me(54527)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = e.bass, this.material.uniforms.u_mid.value = e.mid, this.material.uniforms.u_treble.value = e.treble, this.material.uniforms.u_rms.value = e.rms;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var bm = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float val = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 3; i++) {
        val += amp * noise(p);
        p *= 2.2;
        amp *= 0.45;
    }
    return val;
}

float map(vec3 p) {
    
    float waterLvl = 0.6 + u_bass * 0.3;

    
    float h = fbm(p.xz * 0.15) * 5.0;
    
    h += noise(p.xz * 0.8 + u_time * 0.3) * u_mid * 0.8;

    
    float waves = sin(p.x * 2.0 + u_time * 2.0) * cos(p.z * 1.5 + u_time * 1.5) * 0.08 * (1.0 + u_bass);

    float terrain = p.y - max(h, waterLvl + waves);
    return terrain;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.1, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        0.2,
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    
    float fov = 1.0 - u_bass * 0.2;
    vec3 rd = normalize(vec3(uv * fov, 1.2));

    
    float travel = u_time * 2.5;
    vec3 ro = vec3(sin(u_time * 0.15) * 2.0, 4.0 + u_bass * 0.5, travel);

    
    rd.xy *= rot(sin(u_time * 0.2) * 0.2);
    rd.xz *= rot(cos(u_time * 0.12) * 0.08);

    float t = 0.1;
    float d = 0.0;

    
    for (int i = 0; i < 64; i++) {
        d = map(ro + rd * t);
        if (d < 0.02 || t > 45.0) break;
        t += d * 0.7;
    }

    vec3 col = vec3(0.0);
    float waterLvl = 0.6 + u_bass * 0.3;

    
    vec3 lightDir = normalize(vec3(0.4, 0.7, -0.5));

    if (t < 45.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);
        float h = fbm(p.xz * 0.15) * 5.0 + noise(p.xz * 0.8 + u_time * 0.3) * u_mid * 0.8;

        float diff = max(dot(n, lightDir), 0.0);
        float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 32.0);

        
        float shoreMix = smoothstep(waterLvl - 0.3, waterLvl + 0.5, h);

        
        vec3 oceanCol = u_colors[2] * 0.4;
        
        oceanCol += spec * vec3(0.8, 0.9, 1.0) * 0.8;
        
        oceanCol += u_colors[2] * 0.3 * (1.0 - smoothstep(0.0, waterLvl, h));
        
        oceanCol += u_colors[2] * u_bass * 0.3 * sin(p.x * 4.0 + u_time * 3.0) * 0.5;

        
        vec3 jungleCol = u_colors[1] * (diff * 0.6 + 0.2);
        
        float veinPattern = smoothstep(0.4, 0.0, abs(noise(p.xz * 3.0 + u_time * 0.5) - 0.5));
        vec3 bioGlow = u_colors[2] * veinPattern * u_rms * 3.0;
        jungleCol += bioGlow;
        
        float canopySpec = pow(max(dot(n, lightDir), 0.0), 8.0);
        jungleCol += u_colors[1] * canopySpec * 0.3;

        
        col = mix(oceanCol, jungleCol, shoreMix);
    }

    
    float fog = smoothstep(0.0, 45.0, t);
    vec3 fogCol = u_colors[0] * 0.3;
    col = mix(col, fogCol, fog);

    
    float horizon = smoothstep(0.05, -0.15, rd.y);
    col += u_colors[2] * horizon * 0.2 * (1.0 + u_treble);

    
    float sun = pow(max(dot(rd, lightDir), 0.0), 16.0);
    col += u_colors[0] * sun * 0.5;

    
    if (t >= 45.0) {
        col = fogCol + u_colors[0] * 0.05 * smoothstep(-0.2, 0.5, rd.y);
        col += u_colors[2] * horizon * 0.3;
    }

    
    col = pow(col, vec3(0.85));

        
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}`;
class Sm extends ut {
  constructor() {
    super(), this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: bm,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_debug: { value: !1 },
        u_colors: {
          value: [
            new me(661032),
            new me(1731386),
            new me(65484)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = e.bass, this.material.uniforms.u_mid.value = e.mid, this.material.uniforms.u_treble.value = e.treble, this.material.uniforms.u_rms.value = e.rms;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var Mm = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash(vec3 p) {
    p = fract(p * vec3(123.34, 456.21, 789.53));
    p += dot(p, p.yzx + 45.32);
    return fract(p.x * p.y * p.z);
}

float hash2(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec3(1,0,0));
    float c = hash(i + vec3(0,1,0));
    float d = hash(i + vec3(1,1,0));
    float e = hash(i + vec3(0,0,1));
    float ff = hash(i + vec3(1,0,1));
    float g = hash(i + vec3(0,1,1));
    float h = hash(i + vec3(1,1,1));
    return mix(mix(mix(a,b,f.x), mix(c,d,f.x), f.y),
               mix(mix(e,ff,f.x), mix(g,h,f.x), f.y), f.z);
}

float islandNoise(vec3 p) {
    return noise(p) * 0.7 + noise(p * 2.1) * 0.3;
}

float map(vec3 p) {
    
    float cellSize = 5.0;
    vec3 cellId = floor(p / cellSize);
    vec3 cellPos = mod(p, cellSize) - cellSize * 0.5;

    
    float keep = step(0.7, hash(cellId));
    if (keep < 0.5) return cellSize * 0.4; 

    
    float radius = 0.8 + u_bass * 0.4;
    
    float distortion = islandNoise(cellPos * 0.8 + cellId * 3.7) * 0.6;
    float island = length(cellPos) - radius - distortion;

    
    island += sin(cellPos.y * 3.0 + u_time * 2.0) * u_bass * 0.1;

    return island;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    
    float fov = 1.0 - u_bass * 0.2;
    vec3 rd = normalize(vec3(uv * fov, 1.2));

    
    float baseSpeed = u_time * 4.0;
    vec3 ro = vec3(0.0, 0.0, baseSpeed);

    
    ro.x += sin(u_time * 3.7) * u_rms * 0.3;
    ro.y += cos(u_time * 2.9) * u_rms * 0.2;

    
    ro.x += sin(u_time * 0.4) * 1.5;
    ro.y += cos(u_time * 0.3) * 1.0;

    
    rd.xy *= rot(sin(u_time * 0.25) * 0.2);
    rd.xz *= rot(cos(u_time * 0.15) * 0.1);

    float t = 0.05;
    float d = 0.0;
    float glow = 0.0;

    
    for (int i = 0; i < 60; i++) {
        vec3 p = ro + rd * t;
        d = map(p);

        
        glow += (0.015 + u_treble * 0.04) / (0.1 + d * d * 8.0);

        if (d < 0.01) break;
        if (t > 50.0) break;

        
        t += d * 0.8;
    }

    vec3 col = u_colors[0] * 0.05; 

    if (d < 0.1 && t < 50.0) {
        vec3 p = ro + rd * t;
        vec3 cellPos = mod(p, 5.0) - 2.5;

        
        float yGrad = smoothstep(-1.0, 1.0, cellPos.y);

        
        vec3 surface = mix(u_colors[1] * 0.2, u_colors[1], yGrad);

        
        float coreGlow = smoothstep(0.8, 0.0, length(cellPos)) * (1.0 - yGrad);
        surface += u_colors[2] * coreGlow * (0.5 + u_rms * 2.0);

        
        float edge = smoothstep(0.1, 0.0, d);
        col = surface * edge;

        
        col += u_colors[2] * u_bass * 0.2 * edge;
    }

    
    col += glow * u_colors[2] * (0.4 + u_treble * 0.6);

    
    col = mix(col, u_colors[0] * 0.03, smoothstep(5.0, 50.0, t));

    
    col *= 1.0 - 0.4 * dot(uv, uv);

    
    col = smoothstep(-0.02, 1.1, col);
    col = pow(col, vec3(0.85));

        
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}`;
class Tm extends ut {
  constructor() {
    super(), this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: Mm,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_debug: { value: !1 },
        u_colors: {
          value: [
            new me(131592),
            new me(2984526),
            new me(65450)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = e.bass, this.material.uniforms.u_mid.value = e.mid, this.material.uniforms.u_treble.value = e.treble, this.material.uniforms.u_rms.value = e.rms;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var Em = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

vec3 soapRainbow(float f) {
    vec3 shift = vec3(0.0, 0.15, 0.3);
    return 0.5 + 0.5 * cos(6.28318 * (f + shift + u_time * 0.1));
}

float map(vec3 p) {
    float t = u_time * 0.2;

    
    p.y -= t * 2.0;
    p.x += sin(p.y * 0.5 + t) * 0.5;

    
    vec3 id = floor((p + 1.5) / 3.0);
    p = mod(p + 1.5, 3.0) - 1.5;

    
    float h = fract(sin(dot(id, vec3(12.989, 78.233, 45.164))) * 43758.5453);
    p += (h - 0.5) * 1.5;

    
    float size = (0.2 + h * 0.5) + u_bass * 0.2;

    
    float d = abs(length(p) - size) - 0.005;

    
    d -= sin(p.x * 5.0 + u_time) * cos(p.y * 5.0) * 0.02 * u_treble;

    return d;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    
    vec3 col = u_colors[0] * 0.1 * (1.0 - length(uv));

    vec3 ro = vec3(0.0, 0.0, -5.0);
    vec3 rd = normalize(vec3(uv, 1.5));

    
    ro.xz *= rot(u_time * 0.1);
    rd.xz *= rot(u_time * 0.1);

    float t = 0.0;
    float bubbleAccum = 0.0;

    for (int i = 0; i < 50; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);

        
        float glow = smoothstep(0.5, 0.0, d);
        bubbleAccum += pow(glow, 4.0) * 0.15;

        if (d < 0.001) {
            
            vec2 e = vec2(0.01, 0.0);
            vec3 n = normalize(vec3(
                map(p + e.xyy) - map(p - e.xyy),
                map(p + e.yxy) - map(p - e.yxy),
                map(p + e.yyx) - map(p - e.yyx)
            ));

            float f = pow(1.0 - max(dot(n, -rd), 0.0), 2.0);
            vec3 irid = soapRainbow(f + t * 0.1);

            
            col += irid * f * 0.6;
            col += pow(f, 10.0) * 0.4;

            
            d = 0.05;
        }

        if (t > 15.0) break;
        t += max(d, 0.02);
    }

    
    col += soapRainbow(u_time * 0.05) * bubbleAccum * (0.5 + u_rms);

    
    col *= 1.2;
    col = pow(col, vec3(0.8));
    col = mix(col, u_colors[1], u_bass * 0.1);

        
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}`;
class wm extends ut {
  constructor() {
    super(), this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: Em,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_debug: { value: !1 },
        u_colors: {
          value: [
            new me(657946),
            new me(6702250),
            new me(52479)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = e.bass, this.material.uniforms.u_mid.value = e.mid, this.material.uniforms.u_treble.value = e.treble, this.material.uniforms.u_rms.value = e.rms;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var Am = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float map(vec3 p) {
    float scene = 1e5;
    for (int i = 0; i < 6; i++) {
        float fi = float(i);
        vec3 center = vec3(
            sin(u_time * 0.3 + fi * 1.5) * 2.5,
            mod(u_time * (0.5 + fi * 0.1) + fi * 2.0, 12.0) - 6.0,
            cos(u_time * 0.2 + fi) * 1.5
        );
        float size = 0.5 + fi * 0.1 + u_bass * 0.2;
        
        float b = length(p - center) - size;
        
        b -= sin(p.x * 8.0 + u_time) * 0.02 * u_treble;
        scene = min(scene, b);
    }
    return scene;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    
    if (u_debug) {
        if (uv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; }
        else if (uv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; }
        else { gl_FragColor = vec4(u_colors[2], 1.0); return; }
    }

    vec3 ro = vec3(0.0, 0.0, -7.0);
    vec3 rd = normalize(vec3(uv, 1.5));

    
    vec3 col = u_colors[0] * 0.02;

    float t = 0.0;
    for (int i = 0; i < 64; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);

        if (d < 0.001) {
            vec3 e = vec3(0.01, 0.0, 0.0);
            vec3 n = normalize(vec3(
                map(p + e.xyy) - map(p - e.xyy),
                map(p + e.yxy) - map(p - e.yxy),
                map(p + e.yyx) - map(p - e.yyx)
            ));

            
            float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);

            
            vec3 irid = 0.5 + 0.5 * cos(6.283 * (fresnel + vec3(0.0, 0.1, 0.2) + u_time * 0.1));

            
            vec3 albumTone = mix(u_colors[1], u_colors[2], fresnel);
            irid = mix(irid, albumTone, 0.4);

            
            col += irid * fresnel * 1.5;
            col += pow(fresnel, 20.0) * 2.0 * u_colors[2];

            
            rd = refract(rd, n, 0.95);
            t += 0.2;
        }

        t += d;
        if (t > 20.0) break;
    }

    
    col += u_colors[1] * pow(u_bass, 3.0) * 0.1;

    
    vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) { col = vec3(1.0); }

    
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));

    gl_FragColor = vec4(col, 1.0);
}`;
class Cm extends ut {
  constructor() {
    super(), this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: Am,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_debug: { value: !1 },
        u_colors: {
          value: [
            new me(657946),
            new me(6702250),
            new me(52479)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = e.bass, this.material.uniforms.u_mid.value = e.mid, this.material.uniforms.u_treble.value = e.treble, this.material.uniforms.u_rms.value = e.rms;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var Rm = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;

vec3 orbitTrap;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float map(vec3 p) {
    float explodeForce = 0.5 + pow(u_bass, 3.0) * 3.5;
    float twist = u_time * 0.2 + u_treble * 2.0;

    orbitTrap = vec3(100.0);
    float scale = 1.0;

    for (int i = 0; i < 5; i++) {
        p.xyz = abs(p.xyz);
        p -= vec3(1.2, 0.8, 1.0) * explodeForce * (0.2 + float(i) * 0.05);
        p.xy *= rot(twist + float(i) * 0.1);
        p *= 1.35;
        scale *= 1.35;
        orbitTrap = min(orbitTrap, abs(p));
    }

    float d = (abs(p.x) + abs(p.y) + abs(p.z) - 2.0) / scale;
    return d;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.001, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    if (u_debug) {
        if (uv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; }
        else if (uv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; }
        else { gl_FragColor = vec4(u_colors[2], 1.0); return; }
    }

    vec3 ro = vec3(0.0, 0.0, -8.0 + u_bass * 1.5);
    ro.xy *= rot(u_bass * 0.1 * sin(u_time * 10.0));

    vec3 rd = normalize(vec3(uv, 1.5));

    float t = 0.0;
    float d = 0.0;
    vec3 p;

    vec3 col = u_colors[0] * 0.05;

    for (int i = 0; i < 60; i++) {
        p = ro + rd * t;
        d = map(p);
        if (d < 0.002 || t > 25.0) break;
        t += d * 0.8;
    }

    if (d < 0.002) {
        vec3 n = getNormal(p);

        vec3 lightPos = vec3(2.0 * sin(u_time), 3.0, -4.0);
        vec3 l = normalize(lightPos - p);
        float diff = max(dot(n, l), 0.0);

        vec3 coreGlow = vec3(0.0);
        coreGlow += exp(-orbitTrap.x * 2.0) * u_colors[1];
        coreGlow += exp(-orbitTrap.y * 3.0) * u_colors[2];
        coreGlow *= 1.0 + u_bass * 2.0;

        vec3 baseMaterial = mix(u_colors[0], u_colors[1], diff * 0.3);
        col = baseMaterial + coreGlow * 0.8;
    }

    col += u_colors[2] * (0.05 / (0.1 + t * t * 0.005)) * u_mid;

    
    vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0);

    col *= 1.0 - 0.5 * length(uv);
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));

    gl_FragColor = vec4(col, 1.0);
}`;
class Pm extends ut {
  constructor() {
    super(), this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: Rm,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_debug: { value: !1 },
        u_colors: {
          value: [
            new me(657946),
            new me(16720486),
            new me(52479)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = e.bass, this.material.uniforms.u_mid.value = e.mid, this.material.uniforms.u_treble.value = e.treble, this.material.uniforms.u_rms.value = e.rms;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var Dm = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;
vec3 orbitTrap;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float map(vec3 p) {
    
    p.xy *= rot(p.z * 0.1);
    p.x += sin(p.z * 0.4) * 0.5;

    vec3 q = p;
    float zStep = 10.0;
    q.z = mod(p.z, zStep) - zStep * 0.5;

    float scale = 1.0;
    orbitTrap = vec3(10.0);

    
    float safeBass = min(u_bass, 0.85);
    float safeMid = min(u_mid, 0.85);

    for (int i = 0; i < 6; i++) {
        q = abs(q) - vec3(0.8 + safeBass * 0.5, 1.0 + safeMid * 0.2, 1.2);

        float r2 = dot(q, q);
        float k = (1.6 + safeBass * 0.4) / clamp(r2, 0.15, 1.8);
        q *= k;
        scale *= k;

        q.xy *= rot(0.5 + u_time * 0.05);
        orbitTrap = min(orbitTrap, abs(q));
    }

    
    float fractal = (abs(length(q.xy) - 0.5) - 0.1) / scale;

    
    float tunnel = -(length(p.xy) - (4.0 + safeBass * 2.0));

    return max(fractal, tunnel * 0.5);
}

float getAO(vec3 p, vec3 n) {
    float occ = 0.0;
    float sca = 1.0;
    for (int i = 0; i < 4; i++) {
        float hr = 0.05 + 0.1 * float(i);
        float d = map(p + n * hr);
        occ += -(d - hr) * sca;
        sca *= 0.85;
    }
    return clamp(1.0 - 3.0 * occ, 0.0, 1.0);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.005, -0.005);
    return normalize(e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) + e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    if (u_debug) {
        if (uv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; }
        else if (uv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; }
        else { gl_FragColor = vec4(u_colors[2], 1.0); return; }
    }

    float speed = u_time * 6.0 + min(u_rms, 0.8) * 3.0;
    vec3 ro = vec3(0.0, 0.0, speed);
    vec3 rd = normalize(vec3(uv, 1.2));

    
    ro.x += sin(u_time * 0.5) * 0.5;
    ro.y += cos(u_time * 0.3) * 0.5;

    float t = 0.0, d = 0.0;
    for (int i = 0; i < 55; i++) {
        d = map(ro + rd * t);
        if (abs(d) < 0.001 || t > 40.0) break;
        t += d * 0.65;
    }

    vec3 skyCol = u_colors[0] * 0.05;
    vec3 col = skyCol;

    if (t < 40.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);
        float ao = getAO(p, n);

        vec3 baseCol = mix(u_colors[1], u_colors[2], fract(orbitTrap.y * 0.3 + u_time * 0.1));

        float diff = max(dot(n, normalize(vec3(0.5, 1.0, -0.5))), 0.0);
        float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);

        col = baseCol * (diff + 0.3);
        col += rim * u_colors[1] * (min(u_bass, 0.85) + 0.5);
        col *= ao;

        
        col += u_colors[2] * exp(-abs(d) * 50.0) * min(u_rms, 0.8);
    }

    
    col = mix(col, skyCol, smoothstep(10.0, 40.0, t));

    
    col += u_colors[1] * 0.2 * exp(-length(uv) * 3.0) * (min(u_bass, 0.85) + 0.5);

    col = smoothstep(-0.1, 1.1, col);
    gl_FragColor = vec4(pow(col, vec3(0.6)), 1.0);
}`;
class Um extends ut {
  constructor() {
    super(), this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: Dm,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_debug: { value: !1 },
        u_colors: {
          value: [
            new me(328976),
            new me(16724872),
            new me(61183)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = e.bass, this.material.uniforms.u_mid.value = e.mid, this.material.uniforms.u_treble.value = e.treble, this.material.uniforms.u_rms.value = e.rms;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var Lm = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;
vec3 orbitTrap;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float map(vec3 p) {
    
    p.xy *= rot(p.z * 0.1);
    p.x += sin(p.z * 0.4 + u_time) * 1.2;
    p.y += cos(p.z * 0.3 + u_time * 0.5) * 0.8;

    vec3 q = p;
    float zSize = 5.0;
    q.z = mod(q.z, zSize) - zSize * 0.5;

    float scale = 1.0;
    orbitTrap = vec3(10.0);

    
    float safeBass = min(u_bass, 0.85);
    float safeRms = min(u_rms, 0.8);
    float safeTreble = min(u_treble, 0.85);

    
    vec3 nodeGrowth = vec3(
        0.8 + safeBass * 0.6,
        1.0 + safeRms * 0.4,
        1.2 + safeTreble * 0.3
    );

    for (int i = 0; i < 5; i++) {
        q = abs(q) - nodeGrowth;

        float r2 = dot(q, q);
        float k = (1.85 + safeRms * 0.2) / clamp(r2, 0.15, 2.5);
        q *= k;
        scale *= k;

        q.xy *= rot(0.2 + u_time * 0.02 + float(i) * 0.1);
        orbitTrap = min(orbitTrap, abs(q));
    }

    float shapes = (length(q.xy) - 0.5) / scale;
    float cavern = -(length(p.xy) - (3.5 + safeBass));

    return max(shapes, cavern * 0.8);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.01, -0.01);
    return normalize(e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) + e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    if (u_debug) {
        if (uv.y > 0.9) {
            if (uv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; }
            if (uv.x < 0.3)  { gl_FragColor = vec4(u_colors[1], 1.0); return; }
            gl_FragColor = vec4(u_colors[2], 1.0); return;
        }
    }

    vec3 ro = vec3(0.0, 0.0, u_time * 7.0);
    vec3 rd = normalize(vec3(uv + (min(u_rms, 0.8) * 0.05 * sin(u_time)), 1.4));

    float t = 0.0, d = 0.0;
    for (int i = 0; i < 45; i++) {
        d = map(ro + rd * t);
        if (d < 0.003 || t > 35.0) break;
        t += d;
    }

    vec3 col = u_colors[0] * 0.05;

    if (t < 35.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        float diff = max(dot(n, vec3(0.5, 0.7, -0.5)), 0.0);
        float fres = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);

        vec3 objCol = mix(u_colors[1], u_colors[2], fract(t * 0.1 + orbitTrap.y * 0.2));

        col = objCol * diff;
        col += fres * u_colors[1] * min(u_bass, 0.85);

        
        float lightning = pow(min(u_rms, 0.8), 3.0) * 2.0;
        col += u_colors[2] * lightning * exp(-d * 2.0);

        col *= exp(-t * 0.05);
    }

    
    col = mix(col, u_colors[0] * 0.1, smoothstep(5.0, 35.0, t));

    col = smoothstep(-0.1, 1.1, col);
    gl_FragColor = vec4(pow(col, vec3(0.8)), 1.0);
}`;
class Fm extends ut {
  constructor() {
    super(), this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: Lm,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_debug: { value: !1 },
        u_colors: {
          value: [
            new me(328976),
            new me(16724872),
            new me(61183)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = e.bass, this.material.uniforms.u_mid.value = e.mid, this.material.uniforms.u_treble.value = e.treble, this.material.uniforms.u_rms.value = e.rms;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var Im = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;
vec3 orbitTrap;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float smax(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(a, b, h) + k * h * (1.0 - h);
}

float map(vec3 p) {
    
    float pathX = sin(p.z * 0.4 + u_time) * 1.2;
    float pathY = cos(p.z * 0.3 + u_time * 0.5) * 0.8;
    p.x += pathX;
    p.y += pathY;

    p.xy *= rot(p.z * 0.1);

    vec3 q = p;
    float zSize = 4.0;
    q.z = mod(q.z, zSize) - zSize * 0.5;

    float scale = 1.0;
    orbitTrap = vec3(10.0);

    
    float safeBass = min(u_bass, 0.85);
    float safeRms = min(u_rms, 0.8);
    float safeTreble = min(u_treble, 0.85);

    vec3 nodeGrowth = vec3(
        0.5 + safeBass * 0.8,
        0.7 + safeRms * 0.5,
        0.9 + safeTreble * 0.4
    );

    for (int i = 0; i < 6; i++) {
        q = abs(q) - nodeGrowth;

        if (q.x < q.y) q.xy = q.yx;
        if (q.x < q.z) q.xz = q.zx;
        if (q.y < q.z) q.yz = q.zy;

        float r2 = dot(q, q);
        float k = (1.7 + safeRms * 0.25) / clamp(r2, 0.1, 2.0);
        q *= k;
        scale *= k;

        q.xy *= rot(0.3 + u_time * 0.01);
        orbitTrap = min(orbitTrap, abs(q));
    }

    float shapes = (length(q.xz) - 0.2) / abs(scale);

    
    float cavernRadius = 1.8 - safeBass * 0.5;
    float cavern = -(length(p.xy) - cavernRadius);

    
    return smax(shapes, cavern, 0.5);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.005, -0.005);
    return normalize(e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) + e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    if (u_debug) {
        if (uv.y > 0.9) {
            if (uv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; }
            if (uv.x < 0.3)  { gl_FragColor = vec4(u_colors[1], 1.0); return; }
            gl_FragColor = vec4(u_colors[2], 1.0); return;
        }
    }

    vec3 ro = vec3(0.0, 0.0, u_time * 6.0);
    vec3 rd = normalize(vec3(uv, 1.2));

    float t = 0.0, d = 0.0;
    for (int i = 0; i < 50; i++) {
        d = map(ro + rd * t);
        if (d < 0.002 || t > 25.0) break;
        t += d * 0.7;
    }

    vec3 col = u_colors[0] * 0.03;

    if (t < 25.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        float diff = max(dot(n, vec3(0.4, 0.6, -0.4)), 0.0);
        float fres = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);

        vec3 objCol = mix(u_colors[1], u_colors[2], fract(orbitTrap.z * 0.4 + t * 0.1));

        col = objCol * (diff + 0.1);
        col += fres * u_colors[1] * min(u_bass, 0.85);

        
        float glow = exp(-d * 30.0) * min(u_rms, 0.8);
        col += u_colors[2] * glow * 1.5;

        col *= exp(-t * 0.08);
    }

    col = mix(col, u_colors[0] * 0.05, smoothstep(5.0, 25.0, t));

    col = smoothstep(-0.1, 1.1, col);
    gl_FragColor = vec4(pow(col, vec3(0.85)), 1.0);
}`;
class Nm extends ut {
  constructor() {
    super(), this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: Im,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_debug: { value: !1 },
        u_colors: {
          value: [
            new me(328976),
            new me(16724872),
            new me(61183)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = e.bass, this.material.uniforms.u_mid.value = e.mid, this.material.uniforms.u_treble.value = e.treble, this.material.uniforms.u_rms.value = e.rms;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var Om = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;        
uniform float u_energy;      
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define MAX_STEPS 60
#define MAX_DIST 20.0
#define SURF_DIST 0.003
#define PI 3.14159265359

mat2 rot2(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

vec3 getMoodColor(float t, float moodShift) {
  
  vec3 c0 = u_colors[0];
  vec3 c1 = u_colors[1];
  vec3 c2 = u_colors[2];

  
  vec3 comp0 = vec3(1.0) - c0;
  vec3 comp1 = vec3(1.0) - c1;

  c0 = mix(c0, comp0, moodShift * 0.4);
  c1 = mix(c1, comp1, moodShift * 0.3);

  
  float seg = t * 2.0;
  if (seg < 1.0) return mix(c0, c1, seg);
  return mix(c1, c2, seg - 1.0);
}

float fractalSDF(vec3 pos) {
  vec3 p = pos;

  
  float bassWarp = 0.1 + u_bass * 1.5;
  p.xz *= rot2(u_time * 0.2 + bassWarp * 0.5 * sin(p.y * 0.5));

  float scale = 1.0;
  float totalScale = 1.0;

  
  float maxIter = 4.0 + min(u_energy, 0.3) * 3.0;

  
  vec3 offset = vec3(
    1.0 + u_bass * 0.3,
    0.9 + u_mid * 0.4,
    1.1 + u_treble * 0.3
  );

  for (int i = 0; i < 5; i++) {
    if (float(i) >= maxIter) break;

    p = abs(p);
    if (p.x < p.y) p.xy = p.yx;
    if (p.x < p.z) p.xz = p.zx;
    if (p.y < p.z) p.yz = p.zy;

    float rotAngle = u_time * 0.1 + u_treble * 0.4 + float(i) * 0.1;
    p.xy *= rot2(rotAngle * 0.2);

    scale = 1.6 + u_mid * 0.4;
    p = p * scale - offset * (scale - 1.0);
    totalScale *= scale;
  }

  
  float baseRadius = 1.5 + u_rms * 0.8;
  float d = (length(p) - baseRadius) / totalScale;

  
  float r = length(pos);
  float shellRadius = 1.2 + u_bass * 0.4;
  d = min(d, r - shellRadius);

  
  if (u_bass > 0.2) {
    float power = 2.0 + u_energy * 4.0;
    float bulge = pow(r, power) * 0.015 * u_bass;
    d = min(d, r - shellRadius - 0.1 + bulge);
  }

  return d;
}

float map(vec3 p) {
  
  vec3 shakeOffset = vec3(
    sin(u_time * 40.0) * u_beat * 0.1,
    cos(u_time * 45.0) * u_beat * 0.08,
    sin(u_time * 35.0) * u_beat * 0.05
  );
  p += shakeOffset;

  p.xz *= rot2(u_time * 0.1);
  p.xy *= rot2(u_time * 0.05 + u_bass * 0.15);

  return fractalSDF(p);
}

vec3 getNormal(vec3 p) {
  float d = map(p);
  vec2 e = vec2(0.001, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - d,
    map(p + e.yxy) - d,
    map(p + e.yyx) - d
  ));
}

float calcAO(vec3 pos, vec3 nor) {
  return clamp(map(pos + nor * 0.15) / 0.15, 0.0, 1.0);
}

float glowAccum = 0.0;

float raymarch(vec3 ro, vec3 rd) {
  float t = 0.0;
  glowAccum = 0.0;

  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);

    
    glowAccum += exp(-d * 8.0) * 0.015;

    if (d < SURF_DIST) return t;
    if (t > MAX_DIST) break;

    t += d * 0.8; 
  }
  return -1.0;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

  
  vec3 ro = vec3(0.0, 0.0, 4.5 - u_bass * 0.8); 
  ro.x += sin(u_time * 37.0) * u_beat * 0.2;
  ro.y += cos(u_time * 43.0) * u_beat * 0.15;

  
  ro.xz *= rot2(sin(u_time * 0.1) * 0.3);
  ro.yz *= rot2(cos(u_time * 0.07) * 0.2);

  vec3 lookAt = vec3(0.0);
  vec3 forward = normalize(lookAt - ro);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));
  vec3 up = cross(forward, right);

  
  float fov = 1.0 + u_bass * 0.3;
  vec3 rd = normalize(uv.x * right + uv.y * up + fov * forward);

  
  float t = raymarch(ro, rd);

  
  vec3 bgColor = u_colors[0] * 0.05;
  bgColor += u_colors[2] * 0.03 * (1.0 - length(uv));

  vec3 col = bgColor;

  if (t > 0.0) {
    vec3 p = ro + rd * t;
    vec3 n = getNormal(p);

    
    vec3 lightDir = normalize(vec3(1.0, 2.0, 3.0));
    lightDir.xz *= rot2(u_time * 0.2);

    float diff = max(dot(n, lightDir), 0.0);
    float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 16.0 + u_treble * 48.0);
    float ao = calcAO(p, n);

    
    float colorMix = dot(n, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
    colorMix += length(p) * 0.1;
    float moodShift = u_energy * u_mid; 
    vec3 surfColor = getMoodColor(fract(colorMix), moodShift);

    
    col = surfColor * (0.15 + diff * 0.7) * ao;
    col += spec * u_colors[2] * (0.3 + u_treble * 0.7); 

    
    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    col += rim * u_colors[1] * (0.2 + u_rms * 0.8);
  }

  
  float glowIntensity = u_treble * 1.5 + u_rms * 0.5;
  vec3 glowColor = mix(u_colors[1], u_colors[2], 0.5);
  col += glowAccum * glowColor * glowIntensity;

  
  col += vec3(1.0) * u_beat * 0.3;

  
  float vig = 1.0 - 0.4 * dot(uv, uv);
  col *= vig;

  
  col = col / (col + vec3(1.0));
  col = pow(col, vec3(0.9)); 

  gl_FragColor = vec4(col, 1.0);
}`;
class Bm extends ut {
  // Smoothed energy/aggression accumulator
  constructor() {
    super(), this.bassHistory = [], this.lastBeatTime = 0, this.currentBeat = 0, this.currentEnergy = 0, this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: Om,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_beat: { value: 0 },
        u_energy: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_colors: {
          value: [
            new me(661032),
            new me(1731406),
            new me(54527)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    const { bass: r, mid: n, treble: i, rms: o } = e;
    this.bassHistory.push(r), this.bassHistory.length > 20 && this.bassHistory.shift();
    const a = this.bassHistory.reduce((u, f) => u + f, 0) / this.bassHistory.length, l = performance.now();
    r > a * 1.4 && r > 0.35 && l - this.lastBeatTime > 150 && (this.currentBeat = 1, this.lastBeatTime = l), this.currentBeat *= 0.88, this.currentBeat < 0.01 && (this.currentBeat = 0);
    const c = (r * 0.5 + n * 0.3 + i * 0.2) * 2;
    c > this.currentEnergy ? this.currentEnergy = this.currentEnergy * 0.92 + c * 0.08 : this.currentEnergy = this.currentEnergy * 0.985 + c * 0.015, o < 0.01 && (this.currentEnergy *= 0.9), this.currentEnergy = Math.min(this.currentEnergy, 1), this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = r, this.material.uniforms.u_mid.value = n, this.material.uniforms.u_treble.value = i, this.material.uniforms.u_rms.value = o, this.material.uniforms.u_beat.value = this.currentBeat, this.material.uniforms.u_energy.value = this.currentEnergy;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var zm = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform float u_beat;
uniform float u_energy;

varying vec2 vUv;

#define MAX_STEPS 55
#define SURF_DIST 0.003
#define VOXEL_SIZE 20.0
#define PI 3.14159265359

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

float hash41(vec4 p4) {
  p4 = fract(p4 * vec4(.1031, .11369, .13787, .09987));
  p4 += dot(p4, p4.wzxy + 19.19);
  return fract((p4.x + p4.y) * (p4.z + p4.w));
}

float smax(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
  return mix(b, a, h) + k * h * (1.0 - h);
}

vec3 getCosPalette(float t, vec3 base, vec3 mid, vec3 accent) {
  vec3 a = (base + mid) * 0.5;
  vec3 b = (accent - base) * 0.5 + 0.3;
  return a + b * cos(2.0 * PI * (vec3(1.0) * t + vec3(0.0, 0.33, 0.67)));
}

float de_mandelbox(vec3 p, float audio) {
  vec4 q = vec4(p, 1.0);
  float scale = 2.4 + audio * 1.5;
  for (int i = 0; i < 3; i++) {
    q.xyz = clamp(q.xyz, -1.0, 1.0) * 2.0 - q.xyz;
    float r2 = dot(q.xyz, q.xyz);
    q *= clamp(max(0.25 / r2, 0.25), 0.0, 1.0);
    q = q * scale + vec4(p, 0.0);
  }
  return length(q.xyz) / abs(q.w);
}

float de_apollonian(vec3 p, float audio) {
  float s = 1.0;
  for (int i = 0; i < 3; i++) {
    p = -1.0 + 2.0 * fract(0.5 + 0.5 * p);
    float r2 = dot(p, p);
    float k = (1.15 + audio * 0.5) / r2;
    p *= k;
    s *= k;
  }
  return 0.3 * abs(p.y) / s;
}

float de_menger(vec3 p, float audio) {
  float d = length(max(abs(p) - 1.0, 0.0));
  float s = 1.0;
  for (int i = 0; i < 3; i++) {
    vec3 a = mod(p * s, 2.0) - 1.0;
    s *= 3.0;
    vec3 v = 1.0 - 3.0 * abs(a);
    d = max(d, max(v.x, max(v.y, v.z)) / s);
  }
  return d - audio * 0.1;
}

float de_lattice(vec3 p, float audio) {
  p = abs(mod(p, 4.0) - 2.0);
  float thickness = 0.08 + audio * 0.2;
  return min(length(p.xy), length(p.yz)) - thickness;
}

float de_sierpinski(vec3 p, float audio) {
  float scale = 1.0;
  float offset = 1.0 + audio * 0.3;
  for (int i = 0; i < 3; i++) {
    if (p.x + p.y < 0.0) p.xy = -p.yx;
    if (p.x + p.z < 0.0) p.xz = -p.zx;
    if (p.y + p.z < 0.0) p.yz = -p.zy;
    p = p * 2.0 - offset;
    scale *= 2.0;
  }
  return length(p) / scale - 0.01;
}

float de_kaleido(vec3 p, float audio) {
  float scale = 1.0;
  float angle = PI / (3.0 + audio * 3.0);
  for (int i = 0; i < 3; i++) {
    p = abs(p);
    p.xy *= rot(angle);
    p.xz *= rot(angle * 0.7);
    p -= vec3(1.0, 0.8, 1.2);
    p *= 1.4;
    scale *= 1.4;
  }
  return (length(p.xz) - 0.2) / scale;
}

vec4 map(vec3 p) {
  float tunnelSpeed = u_time * 0.1;
  vec3 q = p;
  q.xy -= vec2(sin(p.z * 0.15 + tunnelSpeed) * 3.5, cos(p.z * 0.1 + tunnelSpeed * 1.2) * 2.5);

  vec3 cell = floor(q / VOXEL_SIZE);
  vec3 localP = mod(q, VOXEL_SIZE) - VOXEL_SIZE * 0.5;

  
  float timeSlice = floor(u_time * 0.02);
  float timeFract = smoothstep(0.0, 1.0, fract(u_time * 0.02));
  float entropy = hash41(vec4(cell, timeSlice));
  float entropyNext = hash41(vec4(cell, timeSlice + 1.0));
  float entropy2 = hash41(vec4(cell + 73.0, timeSlice));

  
  vec3 cellFract = smoothstep(0.0, 0.3, fract(q / VOXEL_SIZE)) * smoothstep(1.0, 0.7, fract(q / VOXEL_SIZE));
  float blendEdge = min(cellFract.x, min(cellFract.y, cellFract.z));

  
  float safeBass = min(u_bass, 0.8);
  float safeMid = min(u_mid, 0.8);
  float safeTreble = min(u_treble, 0.8);
  float safeRms = min(u_rms, 0.7);

  
  int biomeId = int(entropy * 6.0);
  int biomeIdNext = int(entropyNext * 6.0);

  float d1;
  if (biomeId == 0) d1 = de_mandelbox(localP * 0.4, safeBass);
  else if (biomeId == 1) d1 = de_apollonian(localP * 0.5, safeRms * 0.6);
  else if (biomeId == 2) d1 = de_menger(localP * 0.35, safeMid);
  else if (biomeId == 3) d1 = de_lattice(localP, safeTreble);
  else if (biomeId == 4) d1 = de_sierpinski(localP * 0.3, safeBass);
  else d1 = de_kaleido(localP * 0.25, safeTreble);

  float d2;
  if (biomeIdNext == 0) d2 = de_mandelbox(localP * 0.4, safeBass);
  else if (biomeIdNext == 1) d2 = de_apollonian(localP * 0.5, safeRms * 0.6);
  else if (biomeIdNext == 2) d2 = de_menger(localP * 0.35, safeMid);
  else if (biomeIdNext == 3) d2 = de_lattice(localP, safeTreble);
  else if (biomeIdNext == 4) d2 = de_sierpinski(localP * 0.3, safeBass);
  else d2 = de_kaleido(localP * 0.25, safeTreble);

  
  float d = mix(d1, d2, timeFract);

  
  d = mix(d, d * 0.8, 1.0 - blendEdge);

  
  d = smax(d, -(length(q.xy) - (4.0 + safeBass * 2.0)), 1.2);

  return vec4(d, mix(entropy, entropyNext, timeFract), entropy2, length(localP));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  vec3 ro = vec3(sin(u_time * 0.4) * 2.0, 0.0, u_time * 6.0);
  vec3 rd = normalize(vec3(uv, 1.2));
  rd.xy *= rot(sin(u_time * 0.2) * 0.3);

  
  float ehStrength = smoothstep(0.6, 1.0, u_bass) * 0.4;
  rd = normalize(rd + vec3(0.0, 0.0, 1.0) * ehStrength * 0.1);

  float t = 0.0, glow = 0.0;
  vec4 sceneData;

  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * t;
    sceneData = map(p);
    glow += exp(-sceneData.x * 4.0) * 0.04;
    if (sceneData.x < SURF_DIST || t > 80.0) break;
    t += sceneData.x;
  }

  vec3 finalCol = u_colors[0] * 0.05;
  if (t < 80.0) {
    vec3 baseCol = getCosPalette(sceneData.y + t * 0.03 + sceneData.z * 3.0, u_colors[0], u_colors[1], u_colors[2]);
    float fog = exp(-t * 0.025);
    finalCol = baseCol * fog * 2.0;
    
    finalCol += u_colors[1] * pow(1.0 - fog, 2.0) * (0.6 + u_mid * 0.8);
    finalCol += u_colors[2] * pow(fog, 4.0) * u_treble * 2.5;
    
    finalCol += u_colors[0] * pow(u_bass, 2.0) * 0.6 * fog;
  }

  finalCol += getCosPalette(u_time * 0.02, u_colors[0], u_colors[1], u_colors[2]) * glow * 0.08;
  finalCol += u_colors[2] * u_beat * 0.08;
  
  finalCol += mix(u_colors[0], u_colors[1], u_bass) * 0.03;
  finalCol = mix(finalCol, u_colors[0] * 0.05, smoothstep(40.0, 80.0, t));

  gl_FragColor = vec4(pow(finalCol / (1.0 + finalCol), vec3(0.75)), 1.0);
}`;
class Gm extends ut {
  constructor() {
    super(), this.bassHistory = [], this.lastBeatTime = 0, this.currentBeat = 0, this.currentEnergy = 0, this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: zm,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_beat: { value: 0 },
        u_energy: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_colors: {
          value: [
            new me(133136),
            new me(1722987),
            new me(54527)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    const { bass: r, mid: n, treble: i, rms: o } = e;
    this.bassHistory.push(r), this.bassHistory.length > 20 && this.bassHistory.shift();
    const a = this.bassHistory.reduce((u, f) => u + f, 0) / this.bassHistory.length, l = performance.now();
    r > a * 1.4 && r > 0.35 && l - this.lastBeatTime > 150 && (this.currentBeat = 1, this.lastBeatTime = l), this.currentBeat *= 0.9, this.currentBeat < 0.01 && (this.currentBeat = 0);
    const c = (r * 0.4 + n * 0.35 + i * 0.25) * 2;
    this.currentEnergy = this.currentEnergy * 0.96 + c * 0.04, this.currentEnergy = Math.min(this.currentEnergy, 1), this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = r, this.material.uniforms.u_mid.value = n, this.material.uniforms.u_treble.value = i, this.material.uniforms.u_rms.value = o, this.material.uniforms.u_beat.value = this.currentBeat, this.material.uniforms.u_energy.value = this.currentEnergy;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var km = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform float u_energy;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define MAX_STEPS 64
#define MAX_DIST 20.0
#define SURF_DIST 0.002
#define PI 3.14159265359

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    return (p.x + p.y + p.z - s) * 0.57735027;
}

float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

float map(vec3 p) {
    
    p.xz *= rot(u_time * 0.15 + u_bass * 0.3);
    p.xy *= rot(u_time * 0.1);

    float scene = 1e5;

    
    for (int i = 0; i < 5; i++) {
        float fi = float(i);
        vec3 off = vec3(
            sin(fi * 1.2 + u_time * 0.1) * 0.8,
            cos(fi * 0.9 + u_time * 0.08) * 0.6,
            sin(fi * 1.7) * 0.5
        );
        float size = 1.2 + fi * 0.15 + u_bass * 0.3;
        float oct = sdOctahedron(p - off, size);
        
        float cut = sdBox(p - off, vec3(size * 0.7));
        float crystal = max(oct, -cut * 0.5);
        scene = smin(scene, crystal, 0.3);
    }

    
    float inner = sdOctahedron(p, 0.6 + u_rms * 0.3);
    scene = max(scene, -inner);

    return scene;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.002, -0.002);
    return normalize(
        e.xyy * map(p + e.xyy) +
        e.yyx * map(p + e.yyx) +
        e.yxy * map(p + e.yxy) +
        e.xxx * map(p + e.xxx)
    );
}

vec3 opticalAxis(float t) {
    float angle = t * 0.2 + u_bass * PI;
    return normalize(vec3(sin(angle), cos(angle * 0.7), sin(angle * 0.3 + 0.5)));
}

vec3 thinFilm(float cosTheta, float thickness) {
    float delta = 2.0 * thickness * cosTheta;
    return 0.5 + 0.5 * cos(2.0 * PI * delta + vec3(0.0, 2.094, 4.188));
}

float glowAccum = 0.0;

float raymarch(vec3 ro, vec3 rd) {
    float t = 0.0;
    glowAccum = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        glowAccum += exp(-d * 6.0) * 0.012;
        if (d < SURF_DIST) return t;
        if (t > MAX_DIST) break;
        t += d * 0.85;
    }
    return -1.0;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

    
    vec3 ro = vec3(0.0, 0.0, 5.0 - u_bass * 0.5);
    ro.x += sin(u_time * 31.0) * u_beat * 0.15;
    ro.y += cos(u_time * 37.0) * u_beat * 0.1;
    ro.xz *= rot(sin(u_time * 0.08) * 0.4);
    ro.yz *= rot(cos(u_time * 0.06) * 0.25);

    vec3 lookAt = vec3(0.0);
    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);
    float fov = 1.2 + u_bass * 0.2;
    vec3 rd = normalize(uv.x * right + uv.y * up + fov * fwd);

    
    vec3 bgColor = u_colors[0] * 0.03 + u_colors[2] * 0.02 * (1.0 - length(uv));
    vec3 col = bgColor;

    float t = raymarch(ro, rd);

    if (t > 0.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        vec3 axis = opticalAxis(u_time);

        
        
        float delta_eta = 0.08 + u_treble * 0.15;
        float splitAngle = dot(n, axis) * delta_eta * 3.0;
        float cosNR = max(dot(n, -rd), 0.0);

        
        float splitFactor = 0.5 + 0.3 * dot(n, axis);
        vec3 col_o = u_colors[1] * (0.5 + 0.3 * cosNR);
        vec3 col_e = u_colors[2] * (0.5 + 0.3 * cosNR);
        vec3 refractedCol = mix(col_o, col_e, splitFactor + sin(splitAngle * 6.0) * 0.2);

        
        vec3 lightDir = normalize(vec3(1.0, 2.0, 3.0));
        lightDir.xz *= rot(u_time * 0.25);
        float diff = max(dot(n, lightDir), 0.0);
        float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 32.0 + u_treble * 64.0);

        
        float fresnel = pow(1.0 - cosNR, 4.0);
        float filmThickness = 1.5 + u_mid * 2.0 + length(p) * 0.3;
        vec3 film = thinFilm(cosNR, filmThickness);
        vec3 filmColor = mix(u_colors[1], u_colors[2], film);

        
        float ao = clamp(map(p + n * 0.15) / 0.15, 0.0, 1.0);

        
        col = refractedCol * 0.4;
        col += diff * mix(u_colors[1], filmColor, 0.5) * 0.5 * ao;
        col += spec * u_colors[2] * (0.5 + u_treble * 1.0);
        col += fresnel * filmColor * 0.6;

        
        col += fresnel * fresnel * fresnel * u_colors[2] * (0.3 + u_rms * 0.7);
    }

    
    vec3 glowColor = mix(u_colors[1], u_colors[2], 0.6);
    col += glowAccum * glowColor * (u_treble * 1.5 + u_rms * 0.5);

    
    col += vec3(1.0) * u_beat * 0.25;

    
    col *= 1.0 - 0.4 * dot(uv, uv);

    
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.9));

    gl_FragColor = vec4(col, 1.0);
}`;
class Hm extends ut {
  constructor() {
    super(), this.bassHistory = [], this.lastBeatTime = 0, this.currentBeat = 0, this.currentEnergy = 0, this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: km,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_beat: { value: 0 },
        u_energy: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_colors: {
          value: [
            new me(661032),
            new me(1731406),
            new me(54527)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    const { bass: r, mid: n, treble: i, rms: o } = e;
    this.bassHistory.push(r), this.bassHistory.length > 20 && this.bassHistory.shift();
    const a = this.bassHistory.reduce((u, f) => u + f, 0) / this.bassHistory.length, l = performance.now();
    r > a * 1.4 && r > 0.35 && l - this.lastBeatTime > 150 && (this.currentBeat = 1, this.lastBeatTime = l), this.currentBeat *= 0.88, this.currentBeat < 0.01 && (this.currentBeat = 0);
    const c = (r * 0.5 + n * 0.3 + i * 0.2) * 2;
    c > this.currentEnergy ? this.currentEnergy = this.currentEnergy * 0.92 + c * 0.08 : this.currentEnergy = this.currentEnergy * 0.985 + c * 0.015, o < 0.01 && (this.currentEnergy *= 0.9), this.currentEnergy = Math.min(this.currentEnergy, 1), this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = r, this.material.uniforms.u_mid.value = n, this.material.uniforms.u_treble.value = i, this.material.uniforms.u_rms.value = o, this.material.uniforms.u_beat.value = this.currentBeat, this.material.uniforms.u_energy.value = this.currentEnergy;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var Vm = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform float u_energy;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define PI 3.14159265359
#define MAX_STEPS 48
#define MAX_DIST 12.0

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float waveFunction(vec3 p, float phase) {
    float psi = 0.0;

    
    float r = length(p);
    psi += sin(4.0 * r - phase * 2.0) * exp(-r * 0.8) * 1.5;

    
    float py = p.y / (r + 0.01);
    psi += sin(6.0 * r - phase * 1.5) * py * exp(-r * 0.6);

    
    float dxz = p.x * p.z / (r * r + 0.01);
    psi += sin(5.0 * r - phase * 1.8) * dxz * 2.0 * exp(-r * 0.7);

    return psi;
}

float probabilityDensity(vec3 p, float beat) {
    
    float phase = u_time * 1.5;

    
    phase += beat * 5.0;

    
    p.xz *= rot(u_bass * 0.5);
    p.xy *= rot(u_time * 0.1);

    float psi = waveFunction(p, phase);

    
    return psi * psi;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

    
    float camDist = 6.0 - u_bass * 0.8;
    vec3 ro = vec3(
        sin(u_time * 0.15) * camDist,
        sin(u_time * 0.1) * 2.0,
        cos(u_time * 0.15) * camDist
    );
    ro.x += sin(u_time * 35.0) * u_beat * 0.2;
    ro.y += cos(u_time * 41.0) * u_beat * 0.15;

    vec3 lookAt = vec3(0.0);
    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);
    float fov = 1.0 + u_rms * 0.3;
    vec3 rd = normalize(uv.x * right + uv.y * up + fov * fwd);

    
    vec3 col = vec3(0.0);
    float jitter = hash(gl_FragCoord.xy + u_time) * 0.5;

    float stepSize = MAX_DIST / float(MAX_STEPS);
    float t = jitter * stepSize;
    float totalDensity = 0.0;

    
    float temperature = 0.3 + u_rms * 2.0;

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;

        float density = probabilityDensity(p, u_beat);

        if (density > 0.01) {
            
            float r = length(p);
            float colorT = fract(r * 0.3 + density * 0.5 + u_time * 0.05);

            
            vec3 cloudColor;
            float seg = colorT * 2.0;
            if (seg < 1.0) {
                cloudColor = mix(u_colors[0], u_colors[1], seg);
            } else {
                cloudColor = mix(u_colors[1], u_colors[2], seg - 1.0);
            }

            
            float emission = density * temperature * stepSize;
            emission = min(emission, 0.15); 

            
            cloudColor = mix(cloudColor, u_colors[2], u_energy * density * 0.5);

            col += cloudColor * emission * (1.0 - totalDensity);
            totalDensity += emission * 2.0;

            if (totalDensity > 0.95) break;
        }

        t += stepSize;
        if (t > MAX_DIST) break;
    }

    
    vec3 bg = u_colors[0] * 0.03;
    bg += u_colors[2] * 0.015 * (1.0 - length(uv));
    col = mix(bg, col, min(totalDensity * 3.0, 1.0));

    
    float ambientGlow = exp(-length(uv) * 2.0) * 0.08;
    col += mix(u_colors[1], u_colors[2], 0.5) * ambientGlow;

    
    col += vec3(0.8, 0.9, 1.0) * u_beat * 0.2;

    
    col *= 1.0 - 0.35 * dot(uv, uv);

    
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.9));

    gl_FragColor = vec4(col, 1.0);
}`;
class Wm extends ut {
  constructor() {
    super(), this.bassHistory = [], this.lastBeatTime = 0, this.currentBeat = 0, this.currentEnergy = 0, this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: Vm,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_beat: { value: 0 },
        u_energy: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_colors: {
          value: [
            new me(661032),
            new me(1731406),
            new me(54527)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    const { bass: r, mid: n, treble: i, rms: o } = e;
    this.bassHistory.push(r), this.bassHistory.length > 20 && this.bassHistory.shift();
    const a = this.bassHistory.reduce((u, f) => u + f, 0) / this.bassHistory.length, l = performance.now();
    r > a * 1.4 && r > 0.35 && l - this.lastBeatTime > 150 && (this.currentBeat = 1, this.lastBeatTime = l), this.currentBeat *= 0.88, this.currentBeat < 0.01 && (this.currentBeat = 0);
    const c = (r * 0.5 + n * 0.3 + i * 0.2) * 2;
    c > this.currentEnergy ? this.currentEnergy = this.currentEnergy * 0.92 + c * 0.08 : this.currentEnergy = this.currentEnergy * 0.985 + c * 0.015, o < 0.01 && (this.currentEnergy *= 0.9), this.currentEnergy = Math.min(this.currentEnergy, 1), this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = r, this.material.uniforms.u_mid.value = n, this.material.uniforms.u_treble.value = i, this.material.uniforms.u_rms.value = o, this.material.uniforms.u_beat.value = this.currentBeat, this.material.uniforms.u_energy.value = this.currentEnergy;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var Xm = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform float u_energy;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define PI 3.14159265359
#define MAX_STEPS 60
#define MAX_DIST 20.0
#define SURF_DIST 0.002

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash21(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec3 hash33(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return fract(sin(p) * 43758.5453);
}

float blockTime(vec3 blockId) {
    float h = hash21(blockId.xy + blockId.z * 17.3);
    
    float timeDelay = h * u_bass * 2.0;
    return u_time - timeDelay;
}

float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

vec2 camPath(float z) {
    float speed = u_time * 0.6 + u_energy * u_time * 0.15;
    return vec2(sin(speed * 0.2) * 2.5, cos(speed * 0.15) * 1.5);
}

float map(vec3 p) {
    
    float blockSize = 1.2 + u_mid * 0.4;

    
    vec3 blockId = floor(p / blockSize);
    vec3 blockPos = fract(p / blockSize) - 0.5; 

    
    vec3 h = hash33(blockId);
    float bt = blockTime(blockId);

    
    float alive = step(0.3, h.x + u_energy * 0.3);

    
    vec3 q = blockPos;
    q.xy *= rot(bt * (h.y - 0.5) * 2.0);
    q.yz *= rot(bt * (h.z - 0.5) * 1.5);

    
    float boxD = sdBox(q, vec3(0.25 + h.y * 0.12));
    float sphereD = length(q) - (0.2 + h.z * 0.12);
    float d = mix(boxD, sphereD, h.x) * blockSize;

    
    d = mix(10.0, d, alive);

    
    float glitchStrength = u_beat * 0.15 + u_treble * 0.05;
    vec3 glitchOff = (h - 0.5) * glitchStrength;
    
    if (u_beat > 0.3) {
        vec3 q2 = blockPos + glitchOff;
        q2.xy *= rot(bt * (h.y - 0.5) * 3.0);
        float gd = mix(sdBox(q2, vec3(0.2)), length(q2) - 0.18, h.x) * blockSize;
        d = mix(d, gd, u_beat);
    }

    
    
    d = max(d, length(blockPos) * blockSize - blockSize * 0.48);

    return d;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.001, -0.001);
    return normalize(
        e.xyy * map(p + e.xyy) +
        e.yyx * map(p + e.yyx) +
        e.yxy * map(p + e.yxy) +
        e.xxx * map(p + e.xxx)
    );
}

float glowAccum = 0.0;

float raymarch(vec3 ro, vec3 rd) {
    float t = 0.05; 
    glowAccum = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        
        d = max(d, 0.001);
        glowAccum += exp(-d * 5.0) * 0.01;
        if (d < SURF_DIST) return t;
        if (t > MAX_DIST) break;
        t += d * 0.9;
    }
    return -1.0;
}

vec3 scanlineEffect(vec2 uv, vec3 col) {
    
    float scan = sin(uv.y * u_resolution.y * 1.5) * 0.5 + 0.5;
    col *= 0.95 + 0.05 * scan;

    
    float barY = fract(u_time * 0.5 + u_beat * 1.5);
    float bar = smoothstep(0.0, 0.03, abs(uv.y - barY + 0.5));
    float shift = (1.0 - bar) * u_beat * 0.02;
    col.r = mix(col.r, col.g, shift * 3.0);

    return col;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

    
    float speed = u_time * 0.6 + u_energy * u_time * 0.15;
    vec3 ro = vec3(sin(speed * 0.2) * 2.5, cos(speed * 0.15) * 1.5, speed);
    ro.x += sin(u_time * 0.8) * u_beat * 0.08;
    ro.y += cos(u_time * 0.7) * u_beat * 0.06;

    vec3 lookAt = ro + vec3(sin(u_time * 0.08) * 0.3, cos(u_time * 0.06) * 0.2, 3.0);
    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);

    
    float roll = u_beat * 0.04;
    vec2 ruv = uv;
    ruv = vec2(ruv.x * cos(roll) - ruv.y * sin(roll),
               ruv.x * sin(roll) + ruv.y * cos(roll));

    float fov = 1.0 + u_bass * 0.2;
    vec3 rd = normalize(ruv.x * right + ruv.y * up + fov * fwd);

    
    float t = raymarch(ro, rd);

    
    vec3 bg = u_colors[0] * 0.04;
    
    vec2 gridUv = fract(uv * 8.0 + u_time * 0.1);
    float grid = smoothstep(0.02, 0.0, min(gridUv.x, gridUv.y));
    bg += u_colors[1] * grid * 0.05;

    vec3 col = bg;

    if (t > 0.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        
        float blockSize = 0.8 + u_mid * 0.5;
        vec3 blockId = floor(p / blockSize);
        vec3 h = hash33(blockId);

        
        float colorIdx = fract(h.x + h.y * 0.5);
        vec3 surfColor;
        float seg = colorIdx * 2.0;
        if (seg < 1.0) {
            surfColor = mix(u_colors[0] * 2.0, u_colors[1], seg);
        } else {
            surfColor = mix(u_colors[1], u_colors[2], seg - 1.0);
        }

        
        vec3 lightDir = normalize(vec3(0.5, 1.0, -0.5));
        float diff = max(dot(n, lightDir), 0.0);
        float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 16.0);

        col = surfColor * (0.3 + diff * 0.6);
        col += spec * u_colors[2] * 0.5;

        
        vec3 localP = fract(p / blockSize);
        float edge = 1.0 - smoothstep(0.0, 0.08, min(min(localP.x, 1.0 - localP.x),
                                                        min(localP.y, 1.0 - localP.y)));
        col += u_colors[2] * edge * 0.4;

        
        float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
        col += u_colors[1] * fresnel * 0.3;
    }

    
    col += glowAccum * mix(u_colors[1], u_colors[2], 0.5) * (u_rms + 0.3);

    
    col = scanlineEffect(uv, col);

    
    col += vec3(0.9, 1.0, 0.95) * u_beat * 0.08;

    
    float vig = 1.0 - 0.5 * pow(length(uv), 2.5);
    col *= vig;

    
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.92));

    gl_FragColor = vec4(col, 1.0);
}`;
class qm extends ut {
  constructor() {
    super(), this.bassHistory = [], this.lastBeatTime = 0, this.currentBeat = 0, this.currentEnergy = 0, this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: Xm,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_beat: { value: 0 },
        u_energy: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_colors: {
          value: [
            new me(661032),
            new me(1731406),
            new me(54527)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    const { bass: r, mid: n, treble: i, rms: o } = e;
    this.bassHistory.push(r), this.bassHistory.length > 20 && this.bassHistory.shift();
    const a = this.bassHistory.reduce((u, f) => u + f, 0) / this.bassHistory.length, l = performance.now();
    r > a * 1.4 && r > 0.35 && l - this.lastBeatTime > 150 && (this.currentBeat = 1, this.lastBeatTime = l), this.currentBeat *= 0.88, this.currentBeat < 0.01 && (this.currentBeat = 0);
    const c = (r * 0.5 + n * 0.3 + i * 0.2) * 2;
    c > this.currentEnergy ? this.currentEnergy = this.currentEnergy * 0.92 + c * 0.08 : this.currentEnergy = this.currentEnergy * 0.985 + c * 0.015, o < 0.01 && (this.currentEnergy *= 0.9), this.currentEnergy = Math.min(this.currentEnergy, 1), this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = r, this.material.uniforms.u_mid.value = n, this.material.uniforms.u_treble.value = i, this.material.uniforms.u_rms.value = o, this.material.uniforms.u_beat.value = this.currentBeat, this.material.uniforms.u_energy.value = this.currentEnergy;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var Ym = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define MAX_STEPS 90
#define MAX_DIST 40.0
#define SURF_DIST 0.002 

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

vec2 path(float z) {
    return vec2(sin(z * 0.15) * 2.0, cos(z * 0.1) * 1.5);
}

float map(vec3 p) {
    
    vec2 center = path(p.z);

    
    float tube = length(p.xy - center) - 1.5;

    
    vec3 q = p;
    q.xy -= center; 
    q.xy *= rot(q.z * 0.05); 

    
    q = mod(q, 8.0) - 4.0;

    float scale = 1.0;
    float d = 1e5;

    
    
    for (int i = 0; i < 4; i++) {
        q = abs(q) - (1.0 + u_bass * 0.3); 

        if (q.x < q.y) q.xy = q.yx;
        if (q.x < q.z) q.xz = q.zx;
        if (q.y < q.z) q.yz = q.zy;

        float s = 2.4 + u_mid * 0.2;
        q = q * s - 2.0 * (s - 1.0);
        scale *= s;

        
        float box = (max(abs(q.x), max(abs(q.y), abs(q.z))) - 2.5) / scale;
        d = min(d, box);
    }

    
    return max(d, -tube);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.002, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

vec3 thinFilm(float cosTheta) {
    return 0.5 + 0.5 * cos(6.28 * (cosTheta + vec3(0.0, 0.33, 0.67) + u_time * 0.2));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.y, u_resolution.x);

    
    
    float time = u_time * 2.5;

    vec3 ro = vec3(path(time), time); 
    vec3 lookAt = vec3(path(time + 1.0), time + 1.0);

    
    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);
    float fov = 0.8 + u_bass * 0.2;
    vec3 rd = normalize(uv.x * right + uv.y * up + fov * fwd);

    
    rd.xy *= rot(sin(u_time * 0.5) * 0.2);

    float t = 0.0;
    float glow = 0.0;

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        
        glow += exp(-d * 4.0) * (0.015 + u_rms * 0.03);

        if (d < SURF_DIST || t > MAX_DIST) break;
        t += d * 0.7; 
    }

    vec3 col = u_colors[0] * 0.02; 

    if (t < MAX_DIST) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        
        float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 4.5);
        vec3 iri = thinFilm(fresnel);

        
        vec3 rd_o = refract(rd, n, 0.8);
        vec3 rd_e = refract(rd, n, 0.85 + u_treble * 0.2);

        
        vec3 lightCol = mix(u_colors[1], u_colors[2], sin(p.z * 0.1) * 0.5 + 0.5);

        
        col = vec3(0.01); 
        col += iri * fresnel * 2.0; 
        col += lightCol * glow * 0.7; 

        float spec = pow(max(dot(reflect(rd, n), normalize(vec3(0.0, 1.0, 1.0))), 0.0), 32.0);
        col += spec * u_colors[2] * (1.0 + u_bass);

        
        col *= exp(-0.06 * t);
    }

    
    col += mix(u_colors[1], u_colors[2], 0.5) * glow * 0.3;

    
    col += vec3(1.0) * u_beat * 0.15;

    
    col = pow(col, vec3(0.85)) * 1.2;

    gl_FragColor = vec4(col, 1.0);
}`;
class jm extends ut {
  constructor() {
    super(), this.bassHistory = [], this.lastBeatTime = 0, this.currentBeat = 0, this.currentEnergy = 0, this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: Ym,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_beat: { value: 0 },
        u_energy: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_colors: {
          value: [
            new me(661032),
            new me(1731406),
            new me(54527)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    const { bass: r, mid: n, treble: i, rms: o } = e;
    this.bassHistory.push(r), this.bassHistory.length > 20 && this.bassHistory.shift();
    const a = this.bassHistory.reduce((u, f) => u + f, 0) / this.bassHistory.length, l = performance.now();
    r > a * 1.4 && r > 0.35 && l - this.lastBeatTime > 150 && (this.currentBeat = 1, this.lastBeatTime = l), this.currentBeat *= 0.88, this.currentBeat < 0.01 && (this.currentBeat = 0);
    const c = (r * 0.5 + n * 0.3 + i * 0.2) * 2;
    c > this.currentEnergy ? this.currentEnergy = this.currentEnergy * 0.92 + c * 0.08 : this.currentEnergy = this.currentEnergy * 0.985 + c * 0.015, o < 0.01 && (this.currentEnergy *= 0.9), this.currentEnergy = Math.min(this.currentEnergy, 1), this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = r, this.material.uniforms.u_mid.value = n, this.material.uniforms.u_treble.value = i, this.material.uniforms.u_rms.value = o, this.material.uniforms.u_beat.value = this.currentBeat, this.material.uniforms.u_energy.value = this.currentEnergy;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var Km = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform float u_energy;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define MAX_STEPS 90
#define MAX_DIST 50.0
#define SURF_DIST 0.0015

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash11(float p) {
    return fract(sin(p * 127.1) * 43758.5453);
}

vec2 path(float z) {
    return vec2(sin(z * 0.15) * 2.5, cos(z * 0.1) * 1.5);
}

float smax(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
    return mix(b, a, h) + k * h * (1.0 - h);
}

vec3 rot4d(vec3 p, float w, float angle) {
    float s = sin(angle), c = cos(angle);
    float nx = p.x * c - w * s;
    float nw = p.x * s + w * c;
    return vec3(nx, p.y + nw * 0.3, p.z);
}

float map(vec3 p) {
    vec2 p_offset = path(p.z);
    vec3 q = p;
    q.xy -= p_offset;

    
    float _bass = max(u_bass, 0.35);
    float _mid = max(u_mid, 0.25);
    float _treble = max(u_treble, 0.15);
    float _rms = max(u_rms, 0.2);
    float _beat = u_beat;
    float _energy = max(u_energy, 0.3);

    float tunnel = length(q.xy) - (1.8 + _bass * 0.3 + _beat * 0.15);

    
    float cellSize = 8.0;
    float cellId = floor(p.z / cellSize);
    float genome = hash11(cellId);

    float discreteShift = hash11(floor(u_time * 2.2) + cellId) * 6.28;
    float w = u_time * 0.2 + _bass * 0.8;

    q = rot4d(q, w, u_time * 0.15 + genome * 3.14);
    q.xy *= rot(p.z * 0.1 + u_time * 0.15 + genome * 2.0);

    
    float s = 1.0;
    vec3 foldOff = mix(vec3(1.0), vec3(1.4, 0.8, 1.2), genome) + vec3(_bass * 0.2, _mid * 0.15, _treble * 0.1);
    float rAngle = mix(0.35, 0.65, genome) + _treble * 0.1 + _bass * 0.08;
    mat2 rMat = rot(rAngle + discreteShift * 0.1);
    float iterScale = mix(1.5, 1.8, genome) + _bass * 0.1 + _rms * 0.08;

    for (int i = 0; i < 5; i++) {
        q = abs(q) - foldOff;

        
        if (q.x < q.y) q.xy = q.yx;
        if (q.x < q.z) q.xz = q.zx;

        q.xy *= rMat;
        q *= iterScale;
        s *= iterScale;
    }

    float shape = mix((length(q) - 0.6 - _rms * 0.2), ((abs(q.x) + abs(q.y) + abs(q.z)) * 0.577 - 0.8 - _beat * 0.15), genome) / s;

    
    float columns = 1e5;
    {
        vec3 colQ = p;
        colQ.xy -= p_offset;
        float colGrid = max(abs(mod(colQ.x, 1.5) - 0.75), abs(mod(colQ.y, 1.5) - 0.75)) - 0.08;
        columns = max(colGrid, -(length(colQ.xy) - 1.2 - (_beat * 2.0 + _rms * 1.5)));
    }

    return smax(min(shape, columns), -tunnel, 0.8);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.005, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

vec3 pal(float t) {
    return 0.5 + 0.5 * cos(6.28 * (t + vec3(0.0, 0.3, 0.6) + u_time * 0.08));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.y, u_resolution.x);

    
    float bass = max(u_bass, 0.35);
    float mid = max(u_mid, 0.25);
    float treble = max(u_treble, 0.15);
    float rms = max(u_rms, 0.2);
    float energy = max(u_energy, 0.3);
    float beat = u_beat;

    
    float speed = 3.5;
    float z = u_time * speed;
    vec3 ro = vec3(path(z), z);
    vec3 lookAt = vec3(path(z + 2.0), z + 2.0);

    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);

    
    vec3 rd = normalize(uv.x * right + uv.y * up + 1.1 * fwd);
    rd.xy *= rot(sin(u_time * 0.15) * 0.06);

    float t = 0.0, d, glow = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        d = map(p);
        glow += exp(-max(d, 0.0) * 3.5) * (0.025 + rms * 0.03);
        if (d < SURF_DIST || t > MAX_DIST) break;
        t += d * 0.8;
    }

    vec3 col = u_colors[0] * 0.08 + vec3(0.01); 
    if (t < MAX_DIST) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);
        float genome = hash11(floor(p.z / 8.0));

        float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
        vec3 refr = pal(fres + p.z * 0.05 + genome);

        col = vec3(0.03) + refr * fres * 2.5;
        col += mix(u_colors[1], u_colors[2], genome) * (glow * 0.5 + 0.15);

        
        col += pow(max(dot(reflect(rd, n), fwd), 0.0), 32.0) * u_colors[0] * (1.0 + bass);
        col *= exp(-0.025 * t);
    }

    col += pal(u_time * 0.1) * glow * (0.35 + beat * 0.3);
    col = smoothstep(-0.05, 1.1, col * 1.2);
    col *= 1.0 - length(uv) * 0.5; 

    gl_FragColor = vec4(col, 1.0);
}`;
class Zm extends ut {
  constructor() {
    super(), this.bassHistory = [], this.lastBeatTime = 0, this.currentBeat = 0, this.currentEnergy = 0, this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: Km,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_beat: { value: 0 },
        u_energy: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_colors: {
          value: [
            new me(661032),
            new me(1731406),
            new me(54527)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    const { bass: r, mid: n, treble: i, rms: o } = e;
    this.bassHistory.push(r), this.bassHistory.length > 20 && this.bassHistory.shift();
    const a = this.bassHistory.reduce((u, f) => u + f, 0) / this.bassHistory.length, l = performance.now();
    r > a * 1.4 && r > 0.35 && l - this.lastBeatTime > 150 && (this.currentBeat = 1, this.lastBeatTime = l), this.currentBeat *= 0.88, this.currentBeat < 0.01 && (this.currentBeat = 0);
    const c = (r * 0.5 + n * 0.3 + i * 0.2) * 2;
    c > this.currentEnergy ? this.currentEnergy = this.currentEnergy * 0.92 + c * 0.08 : this.currentEnergy = this.currentEnergy * 0.985 + c * 0.015, o < 0.01 && (this.currentEnergy *= 0.9), this.currentEnergy = Math.min(this.currentEnergy, 1), this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = r, this.material.uniforms.u_mid.value = n, this.material.uniforms.u_treble.value = i, this.material.uniforms.u_rms.value = o, this.material.uniforms.u_beat.value = this.currentBeat, this.material.uniforms.u_energy.value = this.currentEnergy;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
var Jm = `precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform float u_energy;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define MAX_STEPS 55
#define MAX_DIST 45.0
#define SURF_DIST 0.005

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash11(float p) {
    return fract(sin(p * 127.1) * 43758.5453);
}

vec2 path(float z) {
    return vec2(sin(z * 0.12) * 2.0, cos(z * 0.08) * 1.2);
}

float de_menger(vec3 p, float audio) {
    float d = length(max(abs(p) - 1.0, 0.0));
    float s = 1.0;
    for (int i = 0; i < 3; i++) {
        vec3 a = mod(p * s, 2.0) - 1.0;
        s *= 3.0;
        vec3 v = 1.0 - 3.0 * abs(a);
        d = max(d, max(v.x, max(v.y, v.z)) / s);
    }
    return d - audio * 0.05;
}

float de_kifs(vec3 p, float audio) {
    float s = 1.0;
    for (int i = 0; i < 3; i++) {
        p = abs(p) - vec3(1.2, 0.8, 1.0);
        p.xy *= rot(0.5 + audio * 0.1);
        p.yz *= rot(0.3);
        float sc = 1.7;
        p *= sc;
        s *= sc;
    }
    return (length(p) - 0.6) / s;
}

float de_apollonian(vec3 p, float audio) {
    float s = 1.0;
    for (int i = 0; i < 3; i++) {
        p = -1.0 + 2.0 * fract(0.5 + 0.5 * p);
        float r2 = dot(p, p);
        float k = (1.15 + audio * 0.3) / r2;
        p *= k;
        s *= k;
    }
    return 0.25 * abs(p.y) / s;
}

float de_sierpinski(vec3 p, float audio) {
    float scale = 1.0;
    float offset = 1.0 + audio * 0.2;
    for (int i = 0; i < 3; i++) {
        if (p.x + p.y < 0.0) p.xy = -p.yx;
        if (p.x + p.z < 0.0) p.xz = -p.zx;
        if (p.y + p.z < 0.0) p.yz = -p.zy;
        p = p * 2.0 - offset;
        scale *= 2.0;
    }
    return length(p) / scale - 0.01;
}

float smax(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
    return mix(b, a, h) + k * h * (1.0 - h);
}

float map(vec3 p) {
    vec2 center = path(p.z);
    vec3 q = p;
    q.xy -= center;

    
    float distFromCenter = length(q.xy);

    
    float cellSize = 20.0;
    
    float wrappedZ = mod(p.z, cellSize * 50.0); 
    float cellId = floor(wrappedZ / cellSize);
    float cellFract = fract(wrappedZ / cellSize);
    float genome = hash11(mod(cellId, 47.0)); 
    float genomeNext = hash11(mod(cellId + 1.0, 47.0));

    
    vec3 lp = q;
    lp.z = mod(q.z, cellSize) - cellSize * 0.5; 
    lp.xy *= rot(wrappedZ * 0.04 + u_time * 0.08);

    
    float bass = min(u_bass, 0.8);
    float treble = min(u_treble, 0.8);

    
    float d1;
    int biome = int(genome * 4.0);
    if (biome == 0) d1 = de_menger(lp * 0.35, bass);
    else if (biome == 1) d1 = de_kifs(lp * 0.3, treble);
    else if (biome == 2) d1 = de_apollonian(lp * 0.4, u_rms * 0.4);
    else d1 = de_sierpinski(lp * 0.3, bass);

    
    float d2;
    int biomeNext = int(genomeNext * 4.0);
    if (biomeNext == 0) d2 = de_menger(lp * 0.35, bass);
    else if (biomeNext == 1) d2 = de_kifs(lp * 0.3, treble);
    else if (biomeNext == 2) d2 = de_apollonian(lp * 0.4, u_rms * 0.4);
    else d2 = de_sierpinski(lp * 0.3, bass);

    
    float fadeIn = smoothstep(0.0, 0.12, cellFract);
    float fadeOut = smoothstep(1.0, 0.88, cellFract);
    float biomePresence = fadeIn * fadeOut;

    float blend = smoothstep(0.75, 1.0, cellFract);
    float d = mix(d1, d2, blend);

    
    d = mix(2.0, d, biomePresence);

    
    float tunnel = distFromCenter - (2.0 + bass * 0.4);
    d = max(d, -tunnel);

    return d;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.006, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

vec3 thinFilm(float cosTheta) {
    return 0.5 + 0.5 * cos(6.28 * (cosTheta + vec3(0.0, 0.33, 0.67) + u_time * 0.15));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.y, u_resolution.x);

    
    float speed = u_time * 2.0;
    vec3 ro = vec3(path(speed), speed);
    vec3 lookAt = vec3(path(speed + 2.0), speed + 2.0);

    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);

    float fov = 1.0 + u_bass * 0.15;
    vec3 rd = normalize(uv.x * right + uv.y * up + fov * fwd);
    
    rd.xy *= rot(sin(u_time * 0.25) * 0.12);

    float t = 0.1, d;
    float glow = 0.0;

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        d = map(p);
        glow += exp(-max(d, 0.0) * 3.5) * (0.015 + u_rms * 0.04);
        if (d < SURF_DIST || t > MAX_DIST) break;
        t += d * 0.8;
    }

    vec3 col = u_colors[0] * 0.015;

    vec3 c1 = (length(u_colors[1]) > 0.01) ? u_colors[1] : vec3(0.2, 0.5, 1.0);
    vec3 c2 = (length(u_colors[2]) > 0.01) ? u_colors[2] : vec3(1.0, 0.3, 0.6);

    if (t < MAX_DIST) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        
        float cellId = floor(mod(p.z, 1000.0) / 20.0);
        float genome = hash11(mod(cellId, 47.0));

        
        float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);
        vec3 iri = thinFilm(fresnel + genome);

        
        vec3 surfColor = mix(c1, c2, genome);

        
        col = vec3(0.01);
        col += iri * fresnel * 2.0;
        col += surfColor * glow * 0.5;

        
        float spec = pow(max(dot(reflect(rd, n), fwd), 0.0), 40.0);
        col += spec * c2 * (1.0 + u_bass * 0.8);

        
        col *= exp(-0.04 * t);
    }

    
    col += mix(c1, c2, 0.5) * glow * (0.25 + u_beat * 0.4);

    
    col += c2 * pow(u_beat, 3.0) * 0.12;

    
    col = col / (col + vec3(1.0)); 
    col = pow(col, vec3(0.85));
    col *= 1.0 - 0.4 * dot(uv, uv); 

    gl_FragColor = vec4(col, 1.0);
}`;
class Qm extends ut {
  constructor() {
    super(), this.bassHistory = [], this.lastBeatTime = 0, this.currentBeat = 0, this.currentEnergy = 0, this.camera = new nt(-1, 1, 1, -1, 0, 1), this.material = new Je({
      vertexShader: ct,
      fragmentShader: Jm,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_beat: { value: 0 },
        u_energy: { value: 0 },
        u_resolution: { value: new De(window.innerWidth, window.innerHeight) },
        u_colors: {
          value: [
            new me(661032),
            new me(1731470),
            new me(54527)
          ]
        }
      }
    });
    const e = new qe(new tt(2, 2), this.material);
    this.scene.add(e);
  }
  setPalette(e) {
    this.material.uniforms.u_colors.value = e;
  }
  update(e, t) {
    const { bass: r, mid: n, treble: i, rms: o } = e;
    this.bassHistory.push(r), this.bassHistory.length > 20 && this.bassHistory.shift();
    const a = this.bassHistory.reduce((u, f) => u + f, 0) / this.bassHistory.length, l = performance.now();
    r > a * 1.4 && r > 0.35 && l - this.lastBeatTime > 150 && (this.currentBeat = 1, this.lastBeatTime = l), this.currentBeat *= 0.88, this.currentBeat < 0.01 && (this.currentBeat = 0);
    const c = (r * 0.5 + n * 0.3 + i * 0.2) * 2;
    c > this.currentEnergy ? this.currentEnergy = this.currentEnergy * 0.92 + c * 0.08 : this.currentEnergy = this.currentEnergy * 0.985 + c * 0.015, o < 0.01 && (this.currentEnergy *= 0.9), this.currentEnergy = Math.min(this.currentEnergy, 1), this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = r, this.material.uniforms.u_mid.value = n, this.material.uniforms.u_treble.value = i, this.material.uniforms.u_rms.value = o, this.material.uniforms.u_beat.value = this.currentBeat, this.material.uniforms.u_energy.value = this.currentEnergy;
  }
  resize(e, t, r) {
    const n = r || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(e * n, t * n);
  }
  dispose() {
    this.material.dispose();
  }
}
const bi = 200, $m = 12, e0 = `
  attribute vec3 instanceOffset;
  attribute float instancePhase;
  attribute float instanceSpeed;
  attribute vec3 instanceColor;

  uniform float u_time;
  uniform float u_bass;
  uniform float u_energy;
  uniform float u_beat;

  varying vec3 vColor;
  varying float vAlpha;
  varying vec3 vNormal;

  void main() {
    vColor = instanceColor;

    // Ribbon animation: Bézier-like path from sin/cos composition
    float t = u_time * instanceSpeed + instancePhase;
    float bassCompress = 1.0 - u_bass * 0.4;

    // Orbital path
    vec3 pathPos = vec3(
      sin(t * 0.7 + instancePhase * 3.0) * (2.0 + sin(t * 0.3) * 1.5) * bassCompress,
      cos(t * 0.5 + instancePhase * 2.0) * (1.5 + cos(t * 0.4) * 1.0) * bassCompress,
      sin(t * 0.9 + instancePhase) * (2.5 + sin(t * 0.2) * 1.0) * bassCompress
    );

    // Turbulence on high energy
    float turb = u_energy * 0.5 + u_beat * 0.8;
    pathPos += vec3(
      sin(t * 5.0 + instancePhase * 10.0),
      cos(t * 4.3 + instancePhase * 8.0),
      sin(t * 3.7 + instancePhase * 12.0)
    ) * turb * 0.3;

    vec3 displaced = position + instanceOffset + pathPos;

    // Fade edges
    float segmentT = (position.y + 0.5); // 0..1 along ribbon length
    vAlpha = smoothstep(0.0, 0.1, segmentT) * smoothstep(1.0, 0.9, segmentT);
    vAlpha *= 0.6 + u_energy * 0.4;

    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`, t0 = `
  varying vec3 vColor;
  varying float vAlpha;
  varying vec3 vNormal;

  uniform vec3 u_accentColor;
  uniform float u_rms;

  void main() {
    // Soft lighting
    vec3 light = normalize(vec3(0.5, 1.0, 0.3));
    float diff = max(dot(vNormal, light), 0.0) * 0.5 + 0.5;

    vec3 col = vColor * diff;

    // RMS glow
    col += u_accentColor * u_rms * 0.3;

    // Slight emissive
    col += vColor * 0.1;

    gl_FragColor = vec4(col, vAlpha);
  }
`;
class n0 {
  constructor() {
    this.dummy = new Pt();
    const e = new tt(0.02, 0.3, 1, $m);
    this.material = new Je({
      vertexShader: e0,
      fragmentShader: t0,
      transparent: !0,
      depthWrite: !1,
      side: 2,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_energy: { value: 0 },
        u_beat: { value: 0 },
        u_rms: { value: 0 },
        u_accentColor: { value: new me(54527) }
      }
    }), this.mesh = new Ud(e, this.material, bi), this.mesh.frustumCulled = !1, this.mesh.layers.set(0), this.offsets = new Float32Array(bi * 3), this.phases = new Float32Array(bi), this.speeds = new Float32Array(bi);
    const t = new Float32Array(bi * 3);
    for (let r = 0; r < bi; r++) {
      const n = Math.random() * Math.PI * 2, i = Math.acos(2 * Math.random() - 1), o = 1.5 + Math.random() * 3;
      this.offsets[r * 3] = o * Math.sin(i) * Math.cos(n), this.offsets[r * 3 + 1] = o * Math.sin(i) * Math.sin(n), this.offsets[r * 3 + 2] = o * Math.cos(i), this.phases[r] = Math.random() * Math.PI * 2, this.speeds[r] = 0.3 + Math.random() * 0.7;
      const a = 0.5 + Math.random() * 0.3, l = new me().setHSL(a, 0.7, 0.5);
      t[r * 3] = l.r, t[r * 3 + 1] = l.g, t[r * 3 + 2] = l.b, this.dummy.position.set(0, 0, 0), this.dummy.updateMatrix(), this.mesh.setMatrixAt(r, this.dummy.matrix);
    }
    e.setAttribute("instanceOffset", new Kn(this.offsets, 3)), e.setAttribute("instancePhase", new Kn(this.phases, 1)), e.setAttribute("instanceSpeed", new Kn(this.speeds, 1)), e.setAttribute("instanceColor", new Kn(t, 3));
  }
  addToScene(e) {
    e.add(this.mesh);
  }
  removeFromScene(e) {
    e.remove(this.mesh);
  }
  setAccentColor(e) {
    this.material.uniforms.u_accentColor.value = e;
  }
  update(e, t) {
    this.material.uniforms.u_time.value = t, this.material.uniforms.u_bass.value = e.bass, this.material.uniforms.u_rms.value = e.rms;
    const r = (e.bass * 0.5 + e.mid * 0.3 + e.treble * 0.2) * 2;
    this.material.uniforms.u_energy.value = Math.min(r, 1), this.material.uniforms.u_beat.value = e.bass > 0.6 ? 1 : this.material.uniforms.u_beat.value * 0.9;
  }
  setVisible(e) {
    this.mesh.visible = e;
  }
  dispose() {
    this.mesh.geometry.dispose(), this.material.dispose();
  }
}
class i0 {
  constructor(e) {
    this.scenes = [], this.sceneFactories = [], this.currentIdx = 0, this.running = !1, this.frameId = 0, this.overlayOpacity = 1, this.zenFadeTarget = 1, this.zenFadeCurrent = 1, this.gpuTextEnabled = !0, this.uiVisible = !1, this._currentPalette = null, this.maxFps = 0, this.lastFrameTime = 0, this._scrollPaused = !1, this._loopDbg = 0, this.timeScale = 1, this.timeScaleTarget = 1, this.timeScaleLerpSpeed = 5e-3, this.dilatedTime = 0, this.lastRealTime = 0, this.loop = () => {
      if (!this.running || (this.frameId = requestAnimationFrame(this.loop), this._scrollPaused)) return;
      if (this.maxFps > 0) {
        const m = performance.now(), y = 1e3 / this.maxFps;
        if (m - this.lastFrameTime < y) return;
        this.lastFrameTime = m;
      }
      const u = performance.now() * 1e-3, f = this.lastRealTime > 0 ? Math.min(u - this.lastRealTime, 0.1) : 0.016;
      this.lastRealTime = u, this.timeScale += (this.timeScaleTarget - this.timeScale) * this.timeScaleLerpSpeed;
      const d = Math.abs(this.timeScale - this.timeScaleTarget) > 0.05 ? 1 / 60 : f;
      this.dilatedTime += d * this.timeScale, this.dilatedTime > 1e4 && (this.dilatedTime -= 1e4);
      const _ = this.audioProcessor.update(), v = this.zenFadeCurrent;
      this.zenFadeCurrent += (this.zenFadeTarget - this.zenFadeCurrent) * 0.05, Math.abs(this.zenFadeCurrent - v) > 1e-3 && (this.renderer.domElement.style.opacity = String(this.zenFadeCurrent)), this.current.update(_, this.dilatedTime), this.gpuTypography.update(_.rms);
      const p = window.musicRuntime?.audioEngine?.audioElement;
      if (p && this.lyricsRenderer.setCurrentTime(p.currentTime), this.lyricsRenderer.update(_.rms), this.kineticRibbons.update(_, this.dilatedTime), this.postProcessing.update(_), this.postProcessing.composer.render(), this.postProcessing.renderText(), this._loopDbg || (this._loopDbg = 0), this._loopDbg++, this._loopDbg % 300, globalThis.__PERF_MODE__) {
        const m = globalThis;
        m._chromicMathVisualizer || (m._chromicMathVisualizer = {});
        const y = m._chromicMathVisualizer;
        y.running = this.running, y._sceneIdx = this.currentIdx, y._sceneName = this.current?.constructor?.name || `Scene ${this.currentIdx}`, y._sceneCount = this.sceneFactories.length, y._rendererInfo = {
          drawCalls: this.renderer.info.render.calls,
          triangles: this.renderer.info.render.triangles
        }, y.setScene = (g) => this.setScene(g);
      }
    }, this._resizeDebounce = 0, this._savedResScale = 0, this.container = e.container, this.resolutionScale = e.resolutionScale ?? 1, this.renderer = new il({
      alpha: !0,
      antialias: !1,
      // Use SMAA-like post instead for M1 optimization
      powerPreference: "high-performance",
      preserveDrawingBuffer: !0
      // Needed for debug readPixels
    }), this.renderer.debug.checkShaderErrors = !0, this.renderer.setClearColor(0, 0), this.renderer.setPixelRatio(window.devicePixelRatio * this.resolutionScale);
    const t = this.renderer.domElement;
    t.style.position = "absolute", t.style.inset = "0", t.style.width = "100%", t.style.height = "100%", t.style.pointerEvents = "none", t.style.zIndex = "0", this.container.appendChild(t);
    const r = this.container.clientWidth || window.innerWidth, n = this.container.clientHeight || window.innerHeight;
    this.renderer.setSize(r, n, !1), this.audioProcessor = new Vd(e.analyser), this.sceneFactories = [
      () => new pm(),
      () => new tm(),
      () => new sm(this.renderer),
      () => new lm(),
      () => new um(this.renderer),
      () => new hm(),
      () => new Fo(this.renderer),
      () => new gm(),
      () => new ym(),
      () => new Sm(),
      () => new Tm(),
      () => new wm(),
      () => new Cm(),
      () => new Pm(),
      () => new Um(),
      () => new Fm(),
      () => new Nm(),
      () => new Bm(),
      () => new Gm(),
      () => new Hm(),
      () => new Wm(),
      () => new qm(),
      () => new jm(),
      () => new Zm(),
      () => new Qm()
    ], this.scenes = new Array(this.sceneFactories.length).fill(null), this.current = this.getOrCreateScene(0), this.postProcessing = new Jd(this.renderer, this.current.scene, this.current.camera), this.gpuTypography = new jp(this.current.camera), this.gpuTypography.addToScene(this.current.scene), this.gpuTypography.setVisible(!1), this.lyricsRenderer = new $p(), this.lyricsRenderer.addToScene(this.current.scene), this.lyricsRenderer.setVisible(!0), this.lyricsRenderer.setAspect(r, n), this.container.addEventListener("wheel", (u) => {
      const f = this.container.getBoundingClientRect();
      (u.clientX - f.left) / f.width * 2 - 1 > -0.1 && (u.preventDefault(), this.lyricsRenderer.handleWheel(u.deltaY));
    }, { passive: !1 }), this.container.addEventListener("click", (u) => {
      const f = this.container.getBoundingClientRect(), h = (u.clientX - f.left) / f.width * 2 - 1, d = -((u.clientY - f.top) / f.height) * 2 + 1;
      console.log(`[Orchestrator] click event: ndcX=${h.toFixed(2)} ndcY=${d.toFixed(2)} target=${u.target?.tagName}`), u.shiftKey ? this.lyricsRenderer.debugInspectClick(h, d, this.renderer, u.clientX, u.clientY) : this.lyricsRenderer.handleClick(h, d);
    }), this.lyricsRenderer.onSeek((u) => {
      console.log(`[Orchestrator] seek → ${u.toFixed(3)}s`), document.dispatchEvent(new CustomEvent("visualizer-seek", { detail: { time: u } }));
      const f = window.musicRuntime?.audioEngine?.audioElement || document.querySelector("audio") || document.getElementById("globalAudio");
      f && typeof f.currentTime == "number" && (f.currentTime = u);
    }), this.kineticRibbons = new n0(), this.kineticRibbons.addToScene(this.current.scene), this.current.camera.layers.enable(1), globalThis.__DEBUG__ && console.log(`[Visualizer] Initialized with ${this.sceneFactories.length} scenes (lazy)`), globalThis.__DEBUG__ && console.log("[Visualizer] Scenes: Lava, Julia, Lorenz, Riemann, ReactionDiffusion, Hyperbolic, LivingCanvas, FractalInfinity"), globalThis.__lyricsDebug = (u = !0) => {
      this.lyricsRenderer.setDebug(u);
    }, globalThis.__lyricsRenderer = this.lyricsRenderer, document.addEventListener("uiToggle", (u) => {
      this.setUiVisible(u.detail?.visible ?? !1);
    }), new ResizeObserver(() => this.handleResize()).observe(this.container);
    let o = 0, a = !1;
    const l = this.renderer.domElement, c = () => {
      !a && this.running && (a = !0, this._scrollPaused = !0, l.style.transition = "none", l.style.filter = "blur(8px) saturate(1.3)"), clearTimeout(o), o = window.setTimeout(() => {
        a && (a = !1, this._scrollPaused = !1, l.style.transition = "filter 0.3s ease-out", l.style.filter = "", setTimeout(() => {
          l.style.transition = "";
        }, 350));
      }, 200);
    };
    document.addEventListener("scroll", c, { capture: !0, passive: !0 }), document.addEventListener("keydown", (u) => {
      const f = u.target;
      if (f?.isContentEditable || f?.tagName === "INPUT" || f?.tagName === "TEXTAREA") return;
      const h = Number(u.key);
      h >= 1 && h <= 9 && this.setScene(h - 1), u.key === "0" && this.setScene(9), u.key.toLowerCase() === "z" && (this.uiVisible = !this.uiVisible, this.setUiVisible(this.uiVisible));
    });
  }
  getOrCreateScene(e) {
    if (this.scenes[e]) return this.scenes[e];
    const t = this.sceneFactories[e]();
    return t.camera.layers.enable(1), this.scenes[e] = t, this._currentPalette && typeof t.setPalette == "function" && t.setPalette(this._currentPalette), t;
  }
  setScene(e) {
    e < 0 || e >= this.sceneFactories.length || e === this.currentIdx && this.scenes[e] || (globalThis.__DEBUG__ && console.log(`[Visualizer] Switching scene: ${this.currentIdx} → ${e}`), this.gpuTypography.removeFromScene(this.current.scene), this.lyricsRenderer.removeFromScene(this.current.scene), this.kineticRibbons.removeFromScene(this.current.scene), this.currentIdx = e, this.current = this.getOrCreateScene(e), this._currentPalette && typeof this.current.setPalette == "function" && this.current.setPalette(this._currentPalette), this.postProcessing.updateScene(this.current.scene, this.current.camera), this.gpuTypography.addToScene(this.current.scene), this.lyricsRenderer.addToScene(this.current.scene), this.current.camera instanceof nt && this.kineticRibbons.addToScene(this.current.scene), this.handleResize());
  }
  setResolutionScale(e) {
    this.resolutionScale = Math.max(0.1, Math.min(2, e)), this.renderer.setPixelRatio(window.devicePixelRatio * this.resolutionScale);
    const t = this.container.clientWidth || window.innerWidth, r = this.container.clientHeight || window.innerHeight;
    if (t === 0 || r === 0) return;
    this.renderer.setSize(t, r, !1), this.postProcessing.setSize(t, r);
    const n = window.devicePixelRatio * this.resolutionScale;
    this.current.resize(t, r, n);
  }
  /** Set maximum FPS (0 = unlimited / screen refresh rate) */
  setMaxFps(e) {
    this.maxFps = Math.max(0, Math.round(e));
  }
  /** 
   * Cinematic time dilation — slow/speed shader animation smoothly.
   * @param scale Target timeScale (0.05 = near-frozen, 1.0 = normal)
   * @param duration Lerp duration in ms (controls how fast we reach target)
   */
  setTimeScale(e, t = 600) {
    this.timeScaleTarget = Math.max(0, Math.min(3, e)), this.timeScaleLerpSpeed = 1 - Math.pow(0.05, 16 / t);
  }
  /** Zen mode: fade overlay when UI active */
  setZenMode(e) {
    this.zenFadeTarget = e ? 0.15 : 1;
  }
  /** Show/hide GPU text and blur background */
  setUiVisible(e) {
    this.uiVisible = e, this.gpuTypography.setVisible(e), this.lyricsRenderer.setVisible(e), this.lyricsRenderer.setControlsVisible(e);
  }
  /** Control blur on the shader scene (called by blur button in GPU mode) */
  setBlur(e) {
    this.current.setBlur(e ? 1 : 0);
  }
  /** Control dim on the shader scene (called by dim button in GPU mode) */
  setDim(e, t) {
    this.current.setDim(e ? t ?? 0.4 : 0);
  }
  /** @deprecated Use setBlur/setDim separately */
  setBlurDim(e) {
    this.current.setBlur(e ? 1 : 0), this.current.setDim(e ? 0.4 : 0);
  }
  /** Set track info for GPU text */
  setTrack(e, t) {
    globalThis.__DEBUG__ && console.log(`[Visualizer] setTrack: "${e}" - "${t}"`), this.gpuTypography.setTrack(e, t), this.setScene(0), this.setUiVisible(!0);
  }
  /** Set color palette for all palette-aware scenes */
  setPalette(e) {
    const t = e.map((n) => new me(n));
    this._currentPalette = t;
    const r = this.scenes[this.currentIdx];
    r && typeof r.setPalette == "function" && r.setPalette(t), this.kineticRibbons.setAccentColor(t[2]), this.lyricsRenderer.setAccentColor(t[0]);
  }
  /** Set album art for Living Canvas scene */
  setAlbumArt(e) {
    globalThis.__DEBUG__ && console.log("[Visualizer] setAlbumArt:", e);
    const t = this.scenes[6];
    t instanceof Fo && t.setAlbumArt(e);
  }
  /** Set lyrics timeline for GPU karaoke rendering */
  setLyricsTimeline(e, t, r) {
    this.lyricsRenderer.setTimeline(e, t, r), this.gpuTypography.setVisible(!1), this.lyricsRenderer.setVisible(!0);
  }
  /** Update audio clock for lyrics sync (call from main thread on timeupdate) */
  setCurrentTime(e) {
    this.lyricsRenderer.setCurrentTime(e);
  }
  start() {
    this.running || (this.running = !0, this.lastRealTime = performance.now() * 1e-3, this.dilatedTime > 3600 && (this.dilatedTime = 0), requestAnimationFrame(() => this.handleResize()), this.loop());
  }
  /** Render a single frame immediately (synchronous). Use before FLIP to seed canvas. */
  renderFrame() {
    const e = performance.now() * 1e-3;
    this.lastRealTime === 0 && (this.lastRealTime = e);
    const t = Math.min(e - this.lastRealTime, 0.1) || 0.016;
    this.lastRealTime = e, this.timeScale += (this.timeScaleTarget - this.timeScale) * this.timeScaleLerpSpeed, this.dilatedTime += t * this.timeScale, this.dilatedTime > 1e4 && (this.dilatedTime -= 1e4);
    const r = this.audioProcessor.update();
    this.zenFadeCurrent += (this.zenFadeTarget - this.zenFadeCurrent) * 0.05, this.renderer.domElement.style.opacity = String(this.zenFadeCurrent), this.current.update(r, this.dilatedTime), this.gpuTypography.update(r.rms);
    const n = window.musicRuntime?.audioEngine?.audioElement;
    n && this.lyricsRenderer.setCurrentTime(n.currentTime), this.lyricsRenderer.update(r.rms), this.kineticRibbons.update(r, this.dilatedTime), this.postProcessing.update(r), this.postProcessing.composer.render(), this.postProcessing.renderText();
  }
  stop() {
    this.running = !1, cancelAnimationFrame(this.frameId);
  }
  dispose() {
    this.stop(), this.scenes.forEach((e) => e?.dispose()), this.renderer.dispose(), this.renderer.domElement.remove();
  }
  handleResize() {
    const e = this.container.clientWidth || window.innerWidth, t = this.container.clientHeight || window.innerHeight;
    if (e === 0 || t === 0) return;
    this.renderer.setSize(e, t, !1), this.postProcessing.setSize(e, t), this.lyricsRenderer.setAspect(e, t);
    const r = window.devicePixelRatio * this.resolutionScale;
    this.current.resize(e, t, r), this.running && this.renderFrame();
  }
}
export {
  i0 as ThreeOrchestrator
};
