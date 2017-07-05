
const win = typeof window !== 'undefined' ? window : global;


const CONFIG = {
  accessibility_module: true,
  // enable_highcontrast: true,  // todo
  has_bubble_chart: true,  // requires loading highcharts-more.js
};

const configure = () => {
  win.__DATAVIZKIT_CONFIG__ = {
    ...CONFIG,
    ...win.__DATAVIZKIT_CONFIG__,
  };
  return win.__DATAVIZKIT_CONFIG__;
};

export default configure;


/** todo - deprecate **/
// const makeDatavizkitConfig = (instanceConfig = {}) => {
//   throw new Error('configure::makeDatavizkitConfig is deprecated.');
// };

