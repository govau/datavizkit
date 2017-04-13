
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
      type: 'spline',
      margin: [150, 0, 0, 0],
      events: {
        load: function() {

          var latestValue = last(this.series[0].data).y;
          this.renderer.text(latestValue)
            .attr({
                zIndex: 6,
                x: '50%',
                y: '35%'
            })
            .css({
                fontSize: '700%',
                textAnchor: 'middle'
            })
            .add();

          if (this.series[0].data.length >= 2) {
            emitSetState({'trendLegend': this.series[0].data});
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
    yAxis: {
      visible: false
    },
    xAxis: {
      visible: false
    },
    plotOptions: {
      line: {
        animation: false,
        allowPointSelect: false,
        stickyTracking: true
      },
      series: {
        animation: false,
        marker: {
          enabled: false
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
      enabled: false
    },

    // instance props
    series: [],   // replaced by chartConfig
    // series: [{
    //   name: 'Approved suppliers',
    //   data: [254.0, 254.0, 254.0, 251.0, 244.0, 244.0, 222.0]
    // }]
  }, chartConfig);

  return config;

};

