const esbuild = require('esbuild');

const {readFile, writeFile} = require('fs').promises;
const minify = require('html-minifier-terser').minify;

// js

const meta = esbuild.buildSync({
  entryPoints: ['src/index.js'],
  entryNames: '[dir]/[name]-[hash]',
  metafile: true,
  outdir: 'dist',
  bundle: true,
  sourcemap: true,
  minify: true,
  splitting: true,
  format: 'esm',
  target: ['esnext'],
  define: {
    'process.env.KEEP_HISTORY': true,
    'process.env.NO_REMOTE': false
  }
});

const indexEntry = Object.keys(meta.metafile.outputs)
  .find(key => meta.metafile.outputs[key].entryPoint === 'src/index.js')
  .replace('dist/', '');

(async () => {
  const html = await readFile('src/index.html', 'utf8');

  const minifyOptions = {
    collapseWhitespace: true,
    keepClosingSlash: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true
  };

  const minifyHtml = minify(html, minifyOptions);

  await writeFile(
    'dist/index.html',
      minifyHtml.replace('</head>', `<script type="module" src="${indexEntry}"></script></head>`)
  );
})();
