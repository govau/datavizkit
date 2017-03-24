var path = require('path');

module.exports = {
  title: '@gov.au/datavizkit',
  components: './src/components/**/*.js',
  styleguideDir: 'docs',
  defaultExample: true,
  serverPort: 4000,
  updateWebpackConfig(webpackConfig) {
    // Your source files folder or array of folders, should not include node_modules
    const dir = path.join(__dirname, 'src');
    webpackConfig.module.loaders.push(
      // Babel loader will use your project’s .babelrc
      {
        test: /\.js?$/,
        include: dir,
        loader: 'babel'
      },
      // Other loaders that are needed for your components
      {
        test: /\.css$/,
        include: dir,
        loader: 'style!css?modules&importLoaders=1'
      }
    );
    webpackConfig.devtool = 'eval';
    return webpackConfig;
  },
};
