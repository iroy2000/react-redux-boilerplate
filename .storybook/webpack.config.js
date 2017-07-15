// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const webpack = require('webpack');
const precss = require('precss');
const postcssNested = require('postcss-nested');
const postcssImport = require('postcss-import');
const postcssCssnext = require('postcss-cssnext');

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      {
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
          },
        ],
      }
    ]
  },
};
