
const win = typeof window !== 'undefined' ? window : global;

const KPI_COLORS = [
  '#cf7e33', // gold
  '#7e985c', // green
  '#007cc3', // blue
  '#6e63a7', // purple
];

const BTL_COLORS = [
  '#4e9774', // green
  '#742a69', // maroon
  '#f17465', // salmon
  '#46b4ba', // teal
  '#6d82dc', // blue
  '#c45d8e', // pink
  '#0c7b92', // turquoise
  '#b6988f', // tan
];

const CONFIG = {
  ACCESSIBILITY_MODULE: true,
  BTL_COLOR_PALETTE: BTL_COLORS,
  KPI_COLOR_PALETTE: KPI_COLORS,
};

const makeDatavizkitConfig = (instanceConfig = {}) => {
  win.DATAVIZKIT_CONFIG = {
    ...CONFIG,
    ...instanceConfig
  };
};

export default makeDatavizkitConfig;
