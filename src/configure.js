
const win = typeof window !== 'undefined' ? window : global;


const CONFIG = {
  ACCESSIBILITY_MODULE: true,
  // ENABLE_HIGHCONTRAST: true,  // todo

  HAS_BUBBLE_CHART: false,  // requires loading highcharts-more.js
};

const configure = () => {
  win.__DATAVIZKIT_CONFIG__ = {
    ...CONFIG,
    ...win.__DATAVIZKIT_CONFIG__
  };
  return win.__DATAVIZKIT_CONFIG__;
};

export default configure;


/** todo - deprecate **/
const makeDatavizkitConfig = (instanceConfig = {}) => {
  throw new Error('configure::makeDatavizkitConfig is deprecated.');
};

