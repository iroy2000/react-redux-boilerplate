import config from 'config';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SaveAssetsJson from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';  //https://github.com/postcss/postcss-loader/issues/8
import postcssCssnext from 'postcss-cssnext';

import webpackConfig, { JS_SOURCE } from './webpack.config.common';

const S3_DEPLOY = config.get('s3Deploy') || 'false';
const IS_S3_DEPLOY = String(S3_DEPLOY) === 'true';

const PUBLIC_PATH = IS_S3_DEPLOY ? process.env.AWS_CDN_URL : config.get('publicPath');
const APP_ENTRY_POINT = `${JS_SOURCE}/router`;

const webpackProdOutput = {
  publicPath: PUBLIC_PATH,
  filename: 'assets/[name]-[hash].js',
};

// Merges webpackProdOutput and webpackConfig.output
webpackConfig.output = Object.assign(webpackConfig.output, webpackProdOutput);

webpackConfig.module.rules = webpackConfig.module.rules.concat({
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      {
        loader: 'css-loader',
        options: { sourceMap: true, importLoaders: 1 }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: () => [
            precss(),
            postcssNested(),
            postcssImport({ addDependencyTo: webpack }),
            postcssCssnext({
              browsers: ['last 2 versions', 'ie >= 9'],
              compress: true,
            }),
          ],
        },
      }
    ]
  })
});

webpackConfig.devtool = 'source-map';

webpackConfig.entry = {
  app: ['babel-polyfill', path.resolve(__dirname, APP_ENTRY_POINT)],
};

if (IS_S3_DEPLOY) {
  const S3Plugin = require('webpack-s3-plugin');

  // Please read README if you have no idea where
  // `process.env.AWS_ACCESS_KEY` is coming from
  const s3Config = new S3Plugin({
    // Only upload css and js
    // include: /.*\.(css|js)/,
    // s3Options are required
    s3Options: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    s3UploadOptions: {
      Bucket: process.env.AWS_BUCKET,
    },
    cdnizerCss: {
      test: /images/,
      cdnUrl: process.env.AWS_CDN_URL,
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
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),

   // how you want your code to be optimized
  // all configurable
  new webpack.IgnorePlugin(/un~$/),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'assets/common-[hash].js'
  }),
  new SaveAssetsJson({
    path: path.join(__dirname, 'docroot'),
    filename: 'assets.json',
    prettyPrint: true,
    metadata: {
      version: process.env.PACKAGE_VERSION,
    },
  }),

  new ExtractTextPlugin({
    filename: 'assets/app-[hash].css',
    disable: false,
    allChunks: true,
  })
);

webpackConfig.plugins = webpackConfig.plugins.concat(htmlPlugins);

export default webpackConfig;
