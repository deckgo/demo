import path from 'path';

import {VitePWA} from 'vite-plugin-pwa';
import manifestJson from './src/manifest.json';

export default {
  root: path.join(__dirname, 'src'),
  build: {
    outDir: path.join(__dirname, 'dist'),
    assetsDir: 'build',
    emptyOutDir: true
  },
  define: {
    'process.env': {}
  },
  plugins: [VitePWA({
    manifest: {
      ...manifestJson
    }
  })]
};
