
const win = typeof window !== 'undefined' ? window : global;

const KPI_COLOR_PALETTE = [
  '#cf7e33', // gold
  '#7e985c', // green
  '#007cc3', // blue
  '#6e63a7', // purple
];

const BTL_COLOR_PALETTES = [
  [
    '#4e9774', // green
    '#742a69', // maroon
    '#f17465', // salmon
    '#46b4ba', // teal
    '#6d82dc', // blue
    '#c45d8e', // pink
    '#0c7b92', // turquoise
    '#b6988f', // tan
  ],
  [
    '#742a69', // maroon
    '#4e9774', // green
    '#c45d8e', // pink
    '#46b4ba', // teal
    '#f17465', // salmon
    '#0c7b92', // turquoise
    '#b6988f', // tan
    '#6d82dc', // blue
  ],
  [
    '#b6988f', // tan
    '#46b4ba', // teal
    '#f17465', // salmon
    '#4e9774', // green
    '#c45d8e', // pink
    '#0c7b92', // turquoise
    '#6d82dc', // blue
    '#742a69', // maroon
  ],
  [
    '#0c7b92', // turquoise
    '#46b4ba', // teal
    '#c45d8e', // pink
    '#6d82dc', // blue
    '#f17465', // salmon
    '#4e9774', // green
    '#742a69', // maroon
    '#b6988f', // tan
  ],
];

const CONFIG = {
  ACCESSIBILITY_MODULE: true,
  KPI_COLOR_PALETTE: KPI_COLOR_PALETTE,
  BTL_COLOR_PALETTES: BTL_COLOR_PALETTES,
};

const makeDatavizkitConfig = (instanceConfig = {}) => {
  win.DATAVIZKIT_CONFIG = {
    ...CONFIG,
    ...instanceConfig
  };
};

export default makeDatavizkitConfig;
