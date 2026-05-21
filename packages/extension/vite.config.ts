import path from 'node:path';

import babel from '@rolldown/plugin-babel';
import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import manifest from './manifest.json';

const uiRoot = path.resolve(__dirname, '../ui');

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      components: path.resolve(uiRoot, 'components'),
      extension: __dirname,
      utils: path.resolve(uiRoot, 'utils'),
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
