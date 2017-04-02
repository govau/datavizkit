
import Highcharts from 'highcharts';


export const makeChartOptions = ({
  onRender = () => {},
  onLoad = () => {},
  onPointMouseOver = () => {}
}) => {
  return {
    // default column options
    chart: {
      type: 'column',
      events: {
        render: onRender,
        load: onLoad
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
            mouseOver: onPointMouseOver,
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
      // categories: ["Jan 2017","Feb 2017","Mar 2017","Apr 2017","May 2017","Jun 2017","Jul 2017","Aug 2017","Sep 2017","Oct 2017","Nov 2017","Dec 2017"]
      categories: Highcharts.getOptions().lang.shortMonths + ' 2017'
    },
    series: [
      {
        name: "Desktop",
        data: [29.9, 71.5, 106.4, null, null, 176, 135, 148.5, 216.4, null, 95.6, 54.4]
      },
    ],
  };
};
