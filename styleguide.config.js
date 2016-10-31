var path = require('path');

module.exports = {
  title: 'Style Guide',
  components: './src/js/views/**/*.jsx',
  updateWebpackConfig(webpackConfig) {
    // Your source files folder or array of folders, should not include node_modules
    webpackConfig.module.loaders.push(
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: path.join(__dirname, 'src/assets'),
        loaders: [
          'file?hash=sha512&digest=hex&name=assets/[hash].[ext]',
          'image?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      }, {
        test: /\.(js|jsx)?$/,
        include: path.join(__dirname, 'src/js'),
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime', 'transform-decorators-legacy'],
        },
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src/style'),
        loaders: ['style', 'css', 'postcss']
      }
    );
    return webpackConfig;
  },
};
