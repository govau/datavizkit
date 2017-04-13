
import last from 'lodash/last';
import merge from 'lodash/merge';


export const makeChartOptions = ({
  emitSetState = () => {},
  chartConfig = {},
  title,
  units,
  type,
  dateLastUpdated,
  minimumValue = 0
}) => {

  const config = merge({
    // default column options
    chart: {
      type: 'column',
      events: {
        load: function() {  // equivalent to constructor callback

          var seriesData = this.series[0].data;//this is series data  // todo - this will be different for differnt dimensions of data
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
              key: lastData.category,
              y: lastData.y,
              seriesName: s.name,
              color: lastData.color,
            }
          });
          emitSetState({'customLegend': customLegendData});

          // "hover" over the last column
          const lastCol = last(this.series[0].data);
          if (lastCol) {
            lastCol.onMouseOver && lastCol.onMouseOver();
          }
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
      column: {},
      series: {
        animation: false,
        point: {
          events: {
            mouseOver: function() {
              const sliceIdx = this.index;
              // todo - identify all data permutations
              const customLegendData = this.series.chart.series.map(s => {
                const sliceData = s.data[sliceIdx];
                return {
                  key: sliceData.category,
                  y: sliceData.y,
                  seriesName: s.name,
                  color: sliceData.color
                }
              });
              emitSetState({'customLegend': customLegendData});
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
      //     return periodData.xAxisLabels[this.value] + ' 2017';
      //   },
      // },
    },
    yAxis: {
      title: {
        text: null
      },
      min: minimumValue
    },
    series: [],   // replaced by chartConfig
    tooltip: {
      enabled: false,
    }
  }, chartConfig);

  return config;

};
