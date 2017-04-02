
// todo - not import Highcharts again
import Highcharts from 'highcharts';

import {findRelativeByAncestor} from './../../../utils/DOMAccessors';


export const makeChartOptions = ({}) => {

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
        }
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
              const container = this.series.chart.container;
              const customLegendNode = findRelativeByAncestor(container, 'dvk-chart', 'customLegend');
              if (customLegendNode) {
                customLegendNode.innerHTML = 'TOOLTIP: <br/>' +
                  this.category + ' ' + this.color + ' ' + this.y + ' ' + this.series.name;
              }
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
