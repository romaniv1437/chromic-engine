/**
 * GPU Pre-Warm — Initialize WebGL context at app startup for instant visualizer.
 *
 * Creates a hidden canvas, compiles a trivial shader, draws one frame.
 * When the visualizer is first activated, the GPU driver already has compiled
 * shader pipelines cached → zero cold-start stall.
 *
 * Also pre-loads the visualizer module so import() is instant.
 */

let _warmCanvas = null;
let _warmGl = null;
let _vizModulePromise = null;

export function preWarmGPU() {
  try {
    // Create persistent hidden canvas (never removed from DOM)
    _warmCanvas = document.createElement('canvas');
    _warmCanvas.width = 2;
    _warmCanvas.height = 2;
    _warmCanvas.style.cssText = 'position:fixed;top:-10px;left:-10px;width:1px;height:1px;opacity:0;pointer-events:none;z-index:-1';
    document.body.appendChild(_warmCanvas);

    // Get WebGL2 context (matches Three.js default)
    _warmGl = _warmCanvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

    if (_warmGl) {
      // Compile a trivial shader to trigger GPU driver shader cache init
      const vs = _warmGl.createShader(_warmGl.VERTEX_SHADER);
      _warmGl.shaderSource(vs, 'attribute vec4 p;void main(){gl_Position=p;}');
      _warmGl.compileShader(vs);

      const fs = _warmGl.createShader(_warmGl.FRAGMENT_SHADER);
      _warmGl.shaderSource(fs, 'precision lowp float;void main(){gl_FragColor=vec4(0.0);}');
      _warmGl.compileShader(fs);

      const prog = _warmGl.createProgram();
      _warmGl.attachShader(prog, vs);
      _warmGl.attachShader(prog, fs);
      _warmGl.linkProgram(prog);
      _warmGl.useProgram(prog);

      // Draw one frame to fully warm the pipeline
      _warmGl.clear(_warmGl.COLOR_BUFFER_BIT);
      _warmGl.flush();

      // Clean up shader objects (context stays alive)
      _warmGl.deleteShader(vs);
      _warmGl.deleteShader(fs);
      _warmGl.deleteProgram(prog);
    }

    console.log('[GPU Pre-Warm] WebGL2 context warmed successfully');
  } catch (e) {
    console.warn('[GPU Pre-Warm] Failed:', e.message);
  }
}

export function preLoadVisualizerModule() {
  // Start loading the Three.js visualizer module immediately (non-blocking)
  _vizModulePromise = import('/visualizer/main.js').catch(() => null);
  return _vizModulePromise;
}

export function getPreloadedVizModule() {
  return _vizModulePromise;
}

export function getWarmCanvas() {
  return _warmCanvas;
}

