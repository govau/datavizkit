
import Highcharts from 'highcharts';
import last from 'lodash/last';


export const makeChartOptions = ({
  emitSetState = () => {},
}) => {
  return {
    // default options
    chart: {
      type: 'line',
      events: {
        load: function() {
          let customLegendData = this.series.map(s => {
            const lastData = last(s.data);
            console.log(lastData)
            return {
              key: lastData.category,
              y: lastData.y,
              seriesName: s.name,
              color: lastData.color
            }
          });
          emitSetState({'customLegend': customLegendData});
        }
      },
    },
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
                  key: sliceData.category,
                  y: sliceData.y,
                  seriesName: s.name,
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
      enabled: true,
      shared: true,
      crosshairs: true,
    },

    // instance props
    series: [{
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    },
      {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    },
    // {
    //   name: 'Sales & Distribution',
    //   data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    // }, {
    //   name: 'Project Development',
    //   data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    // }, {
    //   name: 'Other',
    //   data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    // }
    ]
  };
};
