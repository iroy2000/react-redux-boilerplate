// Requiring dependencies
// ================================================================================
import path from 'path';
import webpack from 'webpack';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';  //https://github.com/postcss/postcss-loader/issues/8
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import config from 'config';
import fs from 'fs';

import { SHOULD_BUILD } from './bin/shouldBuild';

// Please read the following link if
// you have no idea how to use this feature
// https://github.com/motdotla/dotenv
if(!SHOULD_BUILD) {
  require('dotenv').config({silent: true});
}

// Environment variable injection
// ================================================================================
const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
process.env.PACKAGE_VERSION = version;

// Defining config variables
// ================================================================================
const BUILD_PATH = path.join(__dirname, 'docroot');

const COMMON_LOADERS = [
  {
    test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
    loaders: [
      'file?hash=sha512&digest=hex&name=assets/[hash].[ext]',
      'image?bypassOnDebug&optimizationLevel=7&interlaced=false',
    ],
  }, {
    test: /\.(js|jsx)?$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      cacheDirectory: true,
      plugins: ['transform-runtime', 'transform-decorators-legacy'],
    },
  },
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file'
  }
];

// Export
// ===============================================================================
export const JS_SOURCE = config.get('jsSourcePath');

export default {
  output: {
    path: BUILD_PATH,
  },
  postcss: () => {
    // https://github.com/postcss/postcss-loader/issues/8
    // https://github.com/jonathantneal/precss/issues/6
    return [precss, autoprefixer, postcssNested, postcssImport({
      addDependencyTo: webpack
    })];
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    modulesDirectories: ['node_modules'],
    root: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'assets'),
      path.join(__dirname, JS_SOURCE),
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/), // https://github.com/webpack/webpack/issues/353
    new CaseSensitivePathsPlugin(),
  ],
  resolveLoader: {
    modulesDirectories: ['node_modules'],
  },
  module: {
    loaders: COMMON_LOADERS,
  },
  node: {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	externals: {
		console:true,
		fs:'{}',
		tls:'{}',
		net:'{}'
	},
};
