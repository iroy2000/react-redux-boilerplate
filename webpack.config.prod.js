import config from 'config';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SaveAssetsJson from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpackConfig, { JS_SOURCE } from './webpack.config.common';

const PUBLIC_PATH = config.get('publicPath');
const APP_ENTRY_POINT = `${JS_SOURCE}/router`;
const S3_DEPLOY = process.env.S3_DEPLOY;

const webpackProdOutput = {
  publicPath: PUBLIC_PATH,
  filename: 'assets/app-[hash].js',
};

// Merges webpackProdOutput and webpackConfig.output
webpackConfig.output = Object.assign(webpackConfig.output, webpackProdOutput);

webpackConfig.module.loaders = webpackConfig.module.loaders.concat({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader']),
});

webpackConfig.devtool = 'source-map';

webpackConfig.entry = {
  app: ['babel-polyfill', path.resolve(__dirname, APP_ENTRY_POINT)],
  vendors: [
    'react',
    'react-dom',
    'react-router',
    'react-redux',
    'react-router-redux',
    'redux-actions'
  ],
};

if (String(S3_DEPLOY) === 'true') {
  const S3Plugin = require('webpack-s3-plugin');

  const s3Config = new S3Plugin({
    // Only upload css and js
    // include: /.*\.(css|js)/,
    // s3Options are required
    s3Options: {
      accessKeyId: config.get('s3.accessKey'),
      secretAccessKey: config.get('s3.accessSecret'),
    },
    s3UploadOptions: {
      Bucket: config.get('s3.bucket'),
    },
    cdnizerCss: {
      test: /images/,
      cdnUrl: config.get('s3.defaultCDNBase'),
    },
  });

  webpackConfig.plugins = webpackConfig.plugins.concat(s3Config);
} else {
  webpackConfig.output.publicPath = '/';
}

const html = config.get('html');

// Please configure this section if you plan
// to deploy the generated html to production.
// I don't mind you name your page as Retro
// if you want to ...
const htmlPlugins = html.map((page) => 
  new HtmlWebpackPlugin({
		title: page.title,
		template: `src/assets/template/${page.template}`,
		inject: 'body',
		filename: page.filename,
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			conservativeCollapse: true,
		}
	})
);

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    __CONFIG__: JSON.stringify(config.get('app')),
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    },
  }),

   // how you want your code to be optimized
  // all configurable
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.IgnorePlugin(/un~$/),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/vendor-[hash].js'),
  new SaveAssetsJson({
    path: path.join(__dirname, 'docroot'),
    filename: 'assets.json',
    prettyPrint: true,
    metadata: {
      version: process.env.PACKAGE_VERSION,
      assetsFile: `assets-v${process.env.PACKAGE_VERSION}.json`,
    },
  }),
  new SaveAssetsJson({
    path: path.join(__dirname, 'docroot'),
    filename: `assets-v${process.env.PACKAGE_VERSION}.json`,
    prettyPrint: true,
    metadata: {
      version: process.env.PACKAGE_VERSION,
    },
  }),
  new ExtractTextPlugin('assets/app-[hash].css', { allChunks: true })
);

webpackConfig.plugins = webpackConfig.plugins.concat(htmlPlugins);

export default webpackConfig;
