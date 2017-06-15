var path = require('path');
var config = require('./package').config;

module.exports = {
  title: '@gov.au/datavizkit',
  template: './docs/template.html',
  sections: [
    {
      name: 'Widgets',
      components: 'src/components/**/*.js',
    },
  ],
  showUsage: true,
  showCode: true,
  skipComponentsWithoutExample: true,
  styleguideDir: config.styleguideDest,
  defaultExample: true,
  serverPort: 4000,
  webpackConfig: require('./config/webpack.config.styleguide.js')
};
