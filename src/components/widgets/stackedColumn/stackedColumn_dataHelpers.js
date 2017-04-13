
import last from 'lodash/last';
import merge from 'lodash/merge';


export const makeChartOptions = ({
  emitSetState = () => {},
  chartConfig = {},
  title,
  units,
  type,
  dateLastUpdated,
  minimumValue = 0,
  stackingType,
}) => {
  
  const config = merge({
    // default column options
    chart: {
      type: 'column',
      events: {
        load: function() {  // equivalent to constructor callback
          var seriesData = this.series[0].data;//this is series data
          seriesData.forEach((d, idx) => {
            if (d.y === null) { //find null value in series
              // adds plot band
              this.xAxis[0].addPlotBand({
                from: idx -.5,  // point back
                to: idx + .5,   // point after
                color: 'url(#diagonal-stripe-1)', // this color represents the null value region
              });
            }
          });

          let customLegendData = this.series.map(s => {
            const lastData = last(s.data);
            return {
              // key: lastData.category,
              key: s.name,
              y: lastData.y,
              seriesName: s.name,
              color: lastData.color,
            }
          });
          emitSetState({'customLegend': customLegendData});
        },
      },
    },
    title: {
      text: title,
      align: 'left',
    },
    subtitle: {
      useHTML: true,
      text: `<span>Last updated <time dateTime="${dateLastUpdated}">${dateLastUpdated}</time></span>`,
      align: 'left',
    },
    plotOptions: {
      column: {
        stacking: stackingType
      },
      series: {
        animation: false,
        point: {
          events: {
            mouseOver: function() {
              const sliceIdx = this.index;
              const chartSeries = this.series.chart.series;
              const customLegendData = chartSeries.map((s, i) => {
                const sliceData = s.data[sliceIdx];
                sliceData.setState('hover');
                return {
                  key: s.name,
                  y: sliceData.y,
                  seriesName: s.category,
                  color: sliceData.color
                }
              });
              emitSetState({'customLegend': customLegendData});
            },
            mouseOut: function() {
              // todo - something weird going on here
              const sliceIdx = this.index;
              this.series.chart.series.forEach((s, i) => {
                s.data[sliceIdx].setState('');
              });
            }
          }
        },
        states: {
          hover: {
            color: 'yellow',
          },
          select: { // required because it can be selected programatically
            enabled: false
          }
        },
        allowPointSelect: false
      },
    },

    // instance props
    xAxis: {
      categories: [],   // replaced by chartConfig
      // labels: {
      //   formatter: function () {
      //     return categories[this.value] + ' 2017';
      //   },
      // },
    },
    yAxis: {
      title: {
        text: null
      },
      // labels: {
      //   formatter: function() {
      //     return this.value + ' (units)';
      //   }
      // }
    },
    series: [],   // replaced by chartConfig
    tooltip: {
      enabled: false,
    },
  }, chartConfig);

  if (stackingType === 'normal') {
    config.yAxis.min = minimumValue;
  }

  return config;

};
