import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import includePaths from 'rollup-plugin-includepaths';
import livereload from 'rollup-plugin-livereload';
import child_process from 'child_process';

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        child_process.spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        });
      }
    },
  };
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js',
  },
  moduleContext: {
    'node_modules/whatwg-fetch/fetch.js': 'window',
  },
  plugins: [
    eslint({
      include: [
        'src/**/*.svelte',
        'src/**/*.js',
        'src/**/*.mjs',
      ],
    }),
    includePaths({
      include: {},
      paths: ['src'],
      external: [],
      extensions: [
        '.mjs',
        '.js',
        '.json',
        '.html',
        '.svelte',
      ],
    }),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: (css) => {
        css.write('public/bundle.css');
      },
      // this results in smaller CSS files
      shared: false,
      hydratable: false,
    }),
    resolve({
      browser: true,
    }),
    commonjs(),
    // If we're building for production (npm run build
    // instead of npm run dev), transpile and minify
    babel({
      babelrc: false,
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.html', '.svelte'],
      exclude: [
        'node_modules/core-js/**',
        'node_modules/babel-runtime/**',
        'node_modules/@babel/runtime/**',
      ],
      runtimeHelpers: true,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            debug: false,
            useBuiltIns: 'usage',
            corejs: 3,
            shippedProposals: true,
            forceAllTransforms: true,
            targets: {
              browsers: [
                'last 2 versions',
                'ie >= 9',
              ],
            },
          },
        ],
      ],
      plugins: [
        ['@babel/plugin-syntax-dynamic-import', {}],
      ],
    }),
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),
    production && terser(),
  ],
};
