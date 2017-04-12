
// import Highcharts from 'highcharts';
import last from 'lodash/last';


export const makeChartOptions = ({
  emitSetState = () => {},
  widget,
}) => {
  return {
    // default options
    chart: {
      type: 'spline',
      margin: [150, 0, 0, 0],
      events: {
        load: function() {
          var latestValue = last(this.series[0].data).y
          var label = this.renderer.text(latestValue)
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
            emitSetState({'customLegend': this.series[0].data});
          }
        }
      },
    },
    title: {
      text: widget.title,
      align: 'left',
    },
    subtitle: {
      useHTML: true,
      text: `<span>Last updated <time dateTime="${widget.dateUpdated}">${widget.dateUpdated}</time></span>`,
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
        point: {
          events: {
            mouseOver: function() {
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
      enabled: false
    },

    // instance props
    series: [{
      name: 'Approved suppliers',
      data: [254.0, 254.0, 254.0, 251.0, 244.0, 244.0, 222.0]
    }]
  };
};

