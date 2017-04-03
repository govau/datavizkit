var path = require('path');

module.exports = {
  title: '@gov.au/datavizkit',
  template: './docs/template.html',
  sections: [
    {
      name: 'Widgets',
      components: './src/components/widgets/**/*.js',
    },
  ],
  styleguideDir: 'docs/.out',
  defaultExample: true,
  serverPort: 4000,
  webpackConfig: require('./config/webpack.config.styleguide.js')
};
