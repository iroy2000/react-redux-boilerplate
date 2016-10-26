import webpackConfig, { JS_SOURCE } from './webpack.config.common';
import config from 'config';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import postcssImport from 'postcss-import';

const PUBLIC_PATH = config.get('publicPath');
const APP_ENTRY_POINT = `${JS_SOURCE}/router`;

const webpackDevOutput = {
  publicPath: `http://${PUBLIC_PATH}/`,
  filename: 'assets/bundle.js',
};

// Merges webpackDevOutput and webpackConfig.output
webpackConfig.output = Object.assign(webpackConfig.output, webpackDevOutput);

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
  // Since we specify --hot mode, we don’t need to add this plugin
  // It is mutually exclusive with the --hot option.
  // new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __CONFIG__: JSON.stringify(config.get('app')),
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 3001,
    proxy: `http://localhost:${process.env.PORT}/`,

    // Prevents BrowserSync from automatically opening up the app in your browser
    open: false,
    reloadDelay: 2500,
  }, {
    // Disable BrowserSync's browser reload/asset injections feature because
    // Webpack Dev Server handles this for us already
    reload: false,
  })
);

webpackConfig.plugins = webpackConfig.plugins.concat(htmlPlugins);

webpackConfig.module.loaders = webpackConfig.module.loaders.concat({
  test: /\.css$/,
  loaders: ['style', 'css', 'postcss']
});

webpackConfig.devtool = 'cheap-module-eval-source-map';
webpackConfig.debug = true;

webpackConfig.entry = [
  'babel-polyfill',
  `webpack-dev-server/client?http://${PUBLIC_PATH}`,
  'webpack/hot/only-dev-server',
  `./${APP_ENTRY_POINT}`,
];

export default webpackConfig;
