
import {valueFormats} from './displayFormats'
import {formatSecondsToHumanised} from './formatTime';
import {formatCurrency} from './formatCurrency';


const getValueForLegend = (y, units = '') => {
  if (typeof y === 'undefined') {
    return 'No data';
  }
  if (units === '$') {
    return `${units}${formatCurrency(y)}`;
  } else if (units === '%') {
    return `${y}${units}`;
  } else if (units === 's') {
    return formatSecondsToHumanised(y);
  } else {
    return y;
  }
};

/**
 * @param series
 * @param seriesDataIndex {Null|Undefined|Number}
 * @returns {*}
 */
export const createCartesianCustomLegendData = (series, seriesDataIndex) => {

  // supplied index or default to last (latest data)
  const _i = null == seriesDataIndex ? series[0].data.length - 1 : seriesDataIndex;

  return series.map(s => {
    const d = s.data[_i];

    if (typeof d === 'undefined') { // a series may be being created in the background and doesnt exist yet
      return {};
    }

    const units = d.units || s.options.units;

    return {
      key: s.name,
      // if _i is null, it's coming from a plot band
      value: d.isNull ? 'No data' : getValueForLegend(d.y, units),
      color: d.color,
      // hide this if i'm hovering a null data region
      category: seriesDataIndex === null ? null : d.category,
      symbol: s.symbol,
    }
  }).reduce((a, b) => { // flatten
    return [...a, b];
  }, []);
};


export const createPolarCustomLegendData = (series) => {
  return series[0].data.map(d => {
    return {
      key: d.name,
      value: d.percentage ? valueFormats.percentage(d.percentage, d.units) : 'No data',
      color: d.color,
      category: d.category,
    }
  });
};


export const plotNullDataLayerToAxis = (xAxis, series, broadcastSetState) => {
  if (xAxis.length > 1) {
    console.warn('Null data layer can only be plotted to a single axis.')
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
        events: {
          mouseover: function() {
            broadcastSetState({'customLegendData': createCartesianCustomLegendData(this.axis.series, null)});
            this.axis.crosshair = false;
            this.axis.series.forEach(s => {
              s.data.map(d => {
                d.setState('');
              });
            });
          },

          mouseout: function() {
            this.axis.crosshair = true;
          }
        }
      });
    }
  });

  return xAxis;
};
