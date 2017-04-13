
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
}) => {

  const config = merge({
    // default options
    chart: {
      type: 'line',
      events: {
        load: function() {

          var seriesData = this.series[0].data;//this is series data  // todo - this will be different for different dimensions of data
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
              key: s.name,
              y: lastData.y,
              color: lastData.color,
            }
          });
          emitSetState({'customLegend': customLegendData});

          // "hover" over the last column
          const lastCol = last(this.series[0].data);
          if (lastCol) {
            lastCol.onMouseOver && lastCol.onMouseOver();
          }
        }
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
      line: {
        animation: false,
        allowPointSelect: true,
        stickyTracking: true
      },
      series: {
        animation: false,
        point: {
          events: {
            mouseOver: function() {
              const sliceIdx = this.index;
              const customLegendData = this.series.chart.series.map(s => {
                const sliceData = s.data[sliceIdx];
                return {
                  key: s.name,
                  y: sliceData.y,
                  color: sliceData.color
                }
              });
              emitSetState({'customLegend': customLegendData});
            },
          }
        },
        states: {
          select: { // required because can be selected programatically
            enabled: false
          }
        },
        allowPointSelect: false,
      },
    },

    tooltip: {
      enabled: true, //false,
      shared: true,
      crosshairs: true,
    },

    // instance props
    xAxis: {
      crosshair: true,
      // type: 'datetime', // todo - format x labels to datetime
      // Format 24 hour time to AM/PM
      // dateTimeLabelFormats: {
      //   hour: '%I:%M %P',
      //   minute: '%I %M'
      // },
      // labels: {
      //   formatter: function() {
      //     return Highcharts.dateFormat('%I:%M %P', this.value);
      //   }
      // }
      categories: [],   // replaced by chartConfig
    },
    yAxis: {
      title: {
        text: null
      },
      min: 0, //minimumValue, // todo - enable. disabled because "same as live"
    },
    series: [],  // replaced by chartConfig
  }, chartConfig);

  return config;

};
