if (typeof __DEV__ !== 'undefined' && __DEV__) {
  module.exports = require('./src/Datavizkit');
} else {
  module.exports = require('./lib/Datavizkit');
}
