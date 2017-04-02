
export const makeChartOptions = ({}) => {
  return {
    // default options
    chart: {},
    yAxis: {
      title: {
        text: null
      }
    },
    plotOptions: {
      series: {
        color: 'red',
        animation: false,
        states: {
          hover: {
            enables: false,
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
      categories: ["Jan 2017","Feb 2017","Mar 2017","Apr 2017","May 2017","Jun 2017","Jul 2017","Aug 2017","Sep 2017","Oct 2017","Nov 2017","Dec 2017"]
    },
    series: [
      {
        type: 'column',
        data: [100, null, 100, 100, null, null, 100, null, null, null, null, null]  // inverse here: nulls become transformed to max (100) and values become null.
      }
    ],
  };
};
