
import React, {PropTypes} from 'react';
import Highcharts from 'highcharts';
import {BASE_CHART_OPTIONS} from './../../../hocs/withHighcharts';


/**
 * Create a vanilla Highchart Donut
 */
const createDonutChart = ({domNode, onRender = () => {}}) => {

  const options = {
    ...BASE_CHART_OPTIONS,

    // default pie options
    chart: {
      type: 'pie',
      events: {   // todo - abstract
        render: onRender
      },
      renderTo: domNode
    },
    plotOptions: {
      pie: {
        animation: false,
        dataLabels: {
          enabled: false
        },
        showInLegend: true,
        states: {
          hover: {
            halo: {
              size: 0
            }
          },
          select: { // required because can be selected programatically
            enabled: false
          }
        }
      },
    },

    // instance props
    series: [{
      name: 'Brands',
      colorByPoint: true,
      innerSize: '50%',
      data: [{
        name: 'Microsoft Internet Explorer',
        y: 56.33
      }, {
        name: 'Chrome',
        y: 24.03,
      }, {
        name: 'Firefox',
        y: 10.38
      }, {
        name: 'Safari',
        y: 4.77
      }, {
        name: 'Opera',
        y: 0.91
      }, {
        name: 'Proprietary or Undetectable',
        y: 0.2
      }]
    }],
  };

  return new Highcharts.Chart(options);

};

createDonutChart.propTypes = {
  domNode: PropTypes.node.isRequired,
  onRender: PropTypes.func
};

export default createDonutChart;
