
import Highcharts from 'highcharts';


export const makeChartOptions = ({
  onRender = () => {},
  onPointMouseOver = () => {},
}) => {
  return {
    // default options
    chart: {
      type: 'line',
      events: {
        render: onRender
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
            mouseOver: onPointMouseOver,
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
