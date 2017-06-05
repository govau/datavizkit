
const win = typeof window !== 'undefined' ? window : global;

const CONFIG = {
  ACCESSIBILITY_MODULE: true,
};

const makeDatavizkitConfig = (instanceConfig = {}) => {
  win.DATAVIZKIT_CONFIG = {
    ...CONFIG,
    ...instanceConfig
  };
};

export default makeDatavizkitConfig;
