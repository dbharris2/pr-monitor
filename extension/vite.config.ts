import path from 'node:path';

import babel from '@rolldown/plugin-babel';
import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import manifest from './manifest.json';

const repoRoot = path.resolve(__dirname, '..');

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      app: path.resolve(repoRoot, 'app'),
      components: path.resolve(repoRoot, 'components'),
      extension: path.resolve(repoRoot, 'extension'),
      utils: path.resolve(repoRoot, 'utils'),
    },
  },
  plugins: [
    react(),
    babel({
      plugins: ['babel-plugin-relay'],
    }),
    crx({ manifest }),
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
});
