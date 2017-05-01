
import {valueFormats} from './../utils/displayFormats'


const getValueForLegend = (y, units = '') => {
  if (typeof y === 'undefined') {
    return 'No data';
  }
  if (units.toLowerCase() === 'Money') {
    return `${units}${y}`;
  } else if (units.toLowerCase() === 'percentage') {
    return `${units}${y}`;
  } else
    return y;
};

export const createCartesianCustomLegendData = (series, seriesDataIndex = null) => {
  // supplied index or default to last (latest data)
  const _i = seriesDataIndex || series[0].data.length - 1;

  return series.map(s => {
    const d = s.data[_i];
    return {
      key: s.name,
      value: getValueForLegend(d.y, s.options.units),
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


export const plotNullDataLayerToAxis = (xAxis, series) => {
  if (xAxis.length > 1) {
    throw new Error('Null data layer can currently only be plotted to a single axis.')
  }

  const idxsWithNullValue = series.map(s => {
    return s.data.map((d, idx) => {
      if (d.y === null) {
        return idx;
      }
    });
  }).reduce((a,b) => {
    // find an intersection between the arrays - common null vals in a series set
    if (a.length) {
      return [...a].filter(x => {
        return b.includes(x);
      });
    }
    return b;
  }, []);

  idxsWithNullValue.forEach((i, idx) => {
    if (typeof i !== 'undefined') {
      xAxis[0].addPlotBand({
        from: i -.5,  // point back
        to: i + .5,   // point after
        color: 'url(#null-data-layer)', // this color represents the null value region
      });
    }
  });

  return xAxis;
};
