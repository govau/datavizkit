var path = require('path');

module.exports = {
  title: '@gov.au/datavizkit',
  sections: [
    {
      name: 'Widgets',
      components: './src/components/widgets/**/*.js',
    },
  ],
  styleguideDir: 'docs',
  defaultExample: true,
  serverPort: 4000,
  webpackConfig: require('./config/webpack.config.styleguide.js')
};
