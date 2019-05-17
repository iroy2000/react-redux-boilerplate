import config from 'config'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import DashboardPlugin from 'webpack-dashboard/plugin'
import precss from 'precss'
import postcssPresetEnv from 'postcss-preset-env'

import webpackConfig, { JS_SOURCE } from './webpack.config.common'

// Please read the following link if
// you have no idea how to use this feature
// https://github.com/motdotla/dotenv
require('dotenv').config({ silent: true })

const HOST = process.env.HOST || config.get('host') || '0.0.0.0'
const PORT = process.env.PORT || config.get('port') || '8080'
const APP_ENTRY_POINT = `${JS_SOURCE}/main`

const webpackDevOutput = {
  publicPath: config.get('publicPath'),
  filename: 'bundle.js',
}

// webpack 4 mode
// https://webpack.js.org/concepts/mode/
webpackConfig.mode = 'development'

// Merges webpackDevOutput and webpackConfig.output
webpackConfig.output = Object.assign(webpackConfig.output, webpackDevOutput)

webpackConfig.devServer = {
  host: HOST,
  port: PORT,
  // please look at app-history
  // this config is using HTML5 History API
  // If you would like to switch back to browser history,
  // you can turn this to true, and modify app-history accordingly.
  historyApiFallback: false,
  disableHostCheck: true,
  clientLogLevel: 'error',
  compress: true,
  noInfo: true,
  quiet: true,
  open: true,
  stats: 'errors-only',
}

// This is your testing container, we did
// that for you, so you don't need to, if
// you need to change the container template
// go to the file in `template` below
const html = config.get('html')

const htmlPlugins = html.map(
  (page) => new HtmlWebpackPlugin({
    title: page.title,
    template: `src/assets/template/${page.template}`,
    inject: 'body',
    filename: page.filename,
  })
)

webpackConfig.plugins.push(
  new DashboardPlugin({
    port: process.env.DASHBOARD_PORT,
    minified: false,
    gzip: false,
  }),
  new webpack.LoaderOptionsPlugin({
    debug: true,
  }),
  // Since we specify --hot mode, we don’t need to add this plugin
  // It is mutually exclusive with the --hot option.
  // new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    __CONFIG__: JSON.stringify(config.get('app')),
  })
)

// We turn off browserSync by default
// Turn that on if you want to include this use case
if (config.get('browserSync.active') === true) {
  const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  webpackConfig.plugins.push(
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: config.get('browserSync.port'),
        proxy: `http://localhost:${process.env.PORT}/`,

        // Prevents BrowserSync from automatically opening up the app in your browser
        open: false,
        reloadDelay: 2500,
      },
      {
        // Disable BrowserSync's browser reload/asset injections feature because
        // Webpack Dev Server handles this for us already
        reload: false,
      }
    )
  )
}

webpackConfig.module.rules = webpackConfig.module.rules.concat({
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 1,
        modules: true,
        localIdentName: '[name]__[local]_[hash:base64]',
      },
    },
    {
      loader: 'postcss-loader',
      ident: 'postcss',
      options: {
        sourceMap: true,
        // https://github.com/postcss/postcss-loader/issues/92
        // https://github.com/postcss/postcss-loader/issues/8
        plugins: () => [
          precss(),
          // https://github.com/csstools/postcss-preset-env
          postcssPresetEnv({
            browsers: ['last 2 versions', 'ie >= 9'],
            compress: true,
          }),
        ],
      },
    },
  ],
})

webpackConfig.plugins = webpackConfig.plugins.concat(htmlPlugins)

// webpack 4, if you set mode = 'development', it will set this value
// webpackConfig.devtool = 'cheap-module-eval-source-map';

webpackConfig.entry = [
  'babel-polyfill',
  `webpack-dev-server/client?http://${HOST}:${PORT}`,
  'webpack/hot/only-dev-server',
  `./${APP_ENTRY_POINT}`,
]

export default webpackConfig
