/**
 * GlobalPlayerVisualizer — "Frosted Multiverse" Aurora shader for the mini music player.
 * Pure WebGL (no Three.js), zero CPU load, audio-reactive via u_bass/u_rms.
 * Renders at 0.5x DPR normally, 0.25x in low-power mode (~1 FPS when minimized).
 */

const AURORA_VERT = `attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0,1);}`;

const AURORA_FRAG = `
precision mediump float;
uniform float u_time;
uniform float u_bass;
uniform float u_rms;
uniform vec3 u_accent;
uniform vec2 u_resolution;

float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
float noise(vec2 p){
  vec2 i=floor(p);vec2 f=fract(p);
  f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}
float fbm(vec2 p){
  float v=0.0;float a=0.5;
  for(int i=0;i<4;i++){v+=a*noise(p);p*=2.0;a*=0.5;}
  return v;
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution;
  vec2 q=uv-0.5;
  q.x*=u_resolution.x/u_resolution.y;
  float t=u_time*0.15;
  float dist=u_bass*0.6;
  // Domain warping with fbm — creates "living mercury" effect
  vec2 warp=vec2(fbm(q*3.0+t+dist),fbm(q*3.0+t*1.3+dist+vec2(5.2,1.3)));
  q+=warp*0.4;
  // SDF-like distance field
  float d=length(q);
  float sdf=fbm(q*2.5+warp+t*0.5)*0.5+d*0.5;
  // Color: accent blended with deep dark
  vec3 deep=vec3(0.02,0.04,0.08);
  vec3 col=mix(deep,u_accent*0.7,sdf*(u_rms*1.5+0.15));
  // Highlight sparks
  float bright=smoothstep(0.55,0.0,d)*(u_rms*0.6+0.1);
  col+=u_accent*bright;
  // Subtle iridescence
  col+=vec3(0.03,0.01,0.05)*sin(sdf*12.0+t*2.0);
  gl_FragColor=vec4(col,1.0);
}`;

export class GlobalPlayerVisualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      preserveDrawingBuffer: false,
      powerPreference: 'low-power',
    });
    this._running = false;
    this._frameId = null;
    this._lowPower = false;
    this._lastFrameTime = 0;
    this._bass = 0;
    this._rms = 0;
    this._accent = [0.47, 0.62, 1.0];
    if (!this.gl) { console.warn('[GlobalPlayerViz] WebGL unavailable'); return; }
    this._initShader();
  }

  _initShader() {
    const gl = this.gl;
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, AURORA_VERT);
    gl.compileShader(vs);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, AURORA_FRAG);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.warn('[GlobalPlayerViz] Frag error:', gl.getShaderInfoLog(fs));
    }
    this._prog = gl.createProgram();
    gl.attachShader(this._prog, vs);
    gl.attachShader(this._prog, fs);
    gl.linkProgram(this._prog);
    gl.useProgram(this._prog);
    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(this._prog, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this._uTime = gl.getUniformLocation(this._prog, 'u_time');
    this._uBass = gl.getUniformLocation(this._prog, 'u_bass');
    this._uRms = gl.getUniformLocation(this._prog, 'u_rms');
    this._uAccent = gl.getUniformLocation(this._prog, 'u_accent');
    this._uRes = gl.getUniformLocation(this._prog, 'u_resolution');
  }

  setAccentHex(hex) {
    if (!hex || hex.length < 7) return;
    this._accent = [
      parseInt(hex.slice(1, 3), 16) / 255,
      parseInt(hex.slice(3, 5), 16) / 255,
      parseInt(hex.slice(5, 7), 16) / 255,
    ];
  }

  setLowPower(lp) { this._lowPower = lp; }

  start() {
    if (this._running || !this.gl) return;
    this._running = true;
    this._tick();
  }

  stop() {
    this._running = false;
    if (this._frameId) { cancelAnimationFrame(this._frameId); this._frameId = null; }
  }

  update(bass, rms) {
    this._bass = bass || 0;
    this._rms = rms || 0;
  }

  _tick() {
    if (!this._running) return;
    // Don't render when tab is hidden — zero GPU when minimized
    if (document.hidden) {
      this._frameId = requestAnimationFrame(() => this._tick());
      return;
    }
    const now = performance.now();
    const interval = this._lowPower ? 1000 : 50; // ~1fps vs ~20fps
    if (now - this._lastFrameTime < interval) {
      this._frameId = requestAnimationFrame(() => this._tick());
      return;
    }
    this._lastFrameTime = now;
    this._draw(now * 0.001);
    this._frameId = requestAnimationFrame(() => this._tick());
  }

  _draw(time) {
    const gl = this.gl;
    const rect = this.canvas.parentElement?.getBoundingClientRect();
    if (!rect || !rect.width) return;
    // Render at very low resolution — under CSS blur, pixelation is invisible
    const dpr = this._lowPower ? 0.15 : 0.3;
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.useProgram(this._prog);
    gl.uniform1f(this._uTime, time);
    gl.uniform1f(this._uBass, this._bass);
    gl.uniform1f(this._uRms, this._rms);
    gl.uniform3fv(this._uAccent, this._accent);
    gl.uniform2f(this._uRes, w, h);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  destroy() {
    this.stop();
    const ext = this.gl?.getExtension('WEBGL_lose_context');
    ext?.loseContext();
  }
}



