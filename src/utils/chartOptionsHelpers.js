
import {valueFormats} from './../utils/displayFormats'


export const createCartesianCustomLegendData = (series, seriesDataIndex = null) => {
  // supplied index or default to last (latest data)
  const _i = seriesDataIndex || series[0].data.length - 1;
  return series.map(s => {
    const d = s.data[_i];
    return {
      key: s.name,
      y: d.y || 'No data',
      color: d.color,
    }
  }).reduce((a, b) => { // flatten
    return [...a, b];
  }, []);
};


export const createPolarCustomLegendData = (series) => {
  return series[0].data.map(d => {
    return {
      key: d.name,
      y: d.percentage ? valueFormats.percentage(d.percentage) : 'No data',
      color: d.color,
    }
  });
};
