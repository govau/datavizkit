
const win = typeof window !== 'undefined' ? window : global;

const CONFIG = {
  ACCESSIBILITY_MODULE: false,
};

const makeDatavizkitConfig = (instanceConfig = {}) => {
  win.DATAVIZKIT_CONFIG = {
    ...CONFIG,
    ...instanceConfig
  };
};

export default makeDatavizkitConfig;
