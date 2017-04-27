
export const createCustomLegendData = (series, seriesDataIndex = null) => {
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
