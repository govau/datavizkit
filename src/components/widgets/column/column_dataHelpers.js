
// todo - not import Highcharts again
import Highcharts from 'highcharts';
import last from 'lodash/last';


export const makeChartOptions = ({
  emitSetState = () => {}
}) => {

  const categories = Highcharts.getOptions().lang.shortMonths;

  return {
    // default column options
    chart: {
      type: 'column',
      events: {
        load: function() {
          var seriesData = this.series[0].data;//this is series data
          seriesData.forEach((d, idx) => {
            if (d.y === null) { //find null value in series
              // adds plot band
              this.xAxis[0].addPlotBand({
                from: idx -.5,  // point back
                to: idx + .5,   // point after
                color: '#c5d8f7', // this color represents the null value region
              });
            }
          });

          let customLegendData = this.series.map(s => {
            const lastData = last(s.data);
            return {
              key: lastData.name,
              y: lastData.y,
              seriesName: s.name,
              color: lastData.color
            }
          });
          emitSetState({'customLegend': customLegendData});
        },
      },
    },
    yAxis: {
      title: {
        text: null
      }
    },
    plotOptions: {
      column: {},
      series: {
        animation: false,
        point: {
          events: {
            mouseOver: function() {
              const sliceIdx = this.index;
              let customLegendData;

              if (this.series.length) {
                customLegendData = this.series.map(s => {
                  const sliceData = s.data[sliceIdx];
                  return {
                    key: sliceData.category,
                    y: sliceData.y,
                    seriesName: s.name,
                    color: sliceData.color
                  }
                });
              } else {
                const sliceData = this.series.data[sliceIdx];
                customLegendData = [{
                  key: sliceData.category,
                  y: sliceData.y,
                  seriesName: this.series.name,
                  color: sliceData.color
                }];
              }
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
      labels: {
        formatter: function () {
          return categories[this.value] + ' 2017';
        },
      },
    },
    yAxis: {
      title: null,
      // labels: {
      //   formatter: function() {
      //     return this.value + ' (units)';
      //   }
      // }
    },
    series: [
      {
        name: "Desktop",
        data: [29.9, 71.5, 106.4, null, null, 176, 135, 148.5, 216.4, null, 95.6, 54.4]
      }
    ],
    tooltip: {
      enabled: false,
    },
  };
};
