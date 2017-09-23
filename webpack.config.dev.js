import config from 'config';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import precss from 'precss';
import postcssCssnext from 'postcss-cssnext';

import webpackConfig, { JS_SOURCE } from './webpack.config.common';

const PUBLIC_PATH = config.get('publicPath');
const APP_ENTRY_POINT = `${JS_SOURCE}/router`;

const webpackDevOutput = {
  publicPath: `http://${PUBLIC_PATH}/`,
  filename: 'assets/bundle.js',
};

// Merges webpackDevOutput and webpackConfig.output
webpackConfig.output = Object.assign(webpackConfig.output, webpackDevOutput);

webpackConfig.devServer = {
  clientLogLevel: "error",
  compress: true,
  noInfo: true,
  quiet: true,
  stats: "errors-only",
};

// This is your testing container, we did
// that for you, so you don't need to, if
// you need to change the container template
// go to the file in `template` below
const html = config.get('html');

const htmlPlugins = html.map((page) =>
  new HtmlWebpackPlugin({
    title: page.title,
    template: `src/assets/template/${page.template}`,
    inject: 'body',
    filename: page.filename,
  })
);

webpackConfig.plugins.push(
  new DashboardPlugin({ port: 3300 }),
  new webpack.LoaderOptionsPlugin({
    debug: true
  }),
  // Since we specify --hot mode, we don’t need to add this plugin
  // It is mutually exclusive with the --hot option.
  // new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    __CONFIG__: JSON.stringify(config.get('app')),
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  })
);

webpackConfig.module.rules = webpackConfig.module.rules.concat({
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: { sourceMap: true, importLoaders: 1 }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        // https://github.com/postcss/postcss-loader/issues/92
        plugins: () => [
          precss(),
          postcssCssnext({
            browsers: ['last 2 versions', 'ie >= 9'],
            compress: true,
          }),
        ],
      },
    },
  ],
});

webpackConfig.plugins = webpackConfig.plugins.concat(htmlPlugins);

webpackConfig.devtool = 'cheap-module-eval-source-map';

webpackConfig.entry = [
  'babel-polyfill',
  `webpack-dev-server/client?http://${PUBLIC_PATH}`,
  'webpack/hot/only-dev-server',
  `./${APP_ENTRY_POINT}`,
];

export default webpackConfig;
