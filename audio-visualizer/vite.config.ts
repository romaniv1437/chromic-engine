import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [glsl()],
  root: '.',
  build: {
    outDir: '../public/visualizer',
    emptyOutDir: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'main',
    },
    rollupOptions: {
      output: {
        entryFileNames: 'main.js',
      },
    },
    target: 'es2020',
  },
});

