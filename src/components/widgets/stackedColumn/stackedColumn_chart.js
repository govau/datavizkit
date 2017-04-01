
import React, {PropTypes} from 'react';
import Highcharts from 'highcharts';
import {BASE_CHART_OPTIONS} from './../../../hocs/withHighcharts';


const createStackedColumnChart = ({
  domNode,
  onRender = () => {},
  onPointUpdate = () => {}
}) => {

  const options = {
    ...BASE_CHART_OPTIONS,

    // default pie options
    chart: {
      type: 'column',
      events: {
        render: onRender
      },
      renderTo: domNode
    },
    yAxis: {
      title: {
        text: null
      }
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        animation: false,
        point: {
          events: {
            mouseOver: onPointUpdate,
          }
        },
        states: {
          // hover: {
          //   color: 'yellow',
          // },
          select: { // required because can be selected programatically
            enabled: false
          }
        },
        allowPointSelect: false,
      },
    },

    // instance props
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
    },
    series: [
      {
        name: 'John',
        data: [5, 3, 4, 7, 2]
      }, {
        name: 'Jane',
        data: [2, 2, 3, 2, 1]
      }, {
        name: 'Joe',
        data: [3, 4, 4, 2, 5]
      }
    ],
  };

  return new Highcharts.Chart(options);

};


createStackedColumnChart.propTypes = {
  domNode: PropTypes.node.isRequired,
  onRender: PropTypes.func,
  onPointUpdate: PropTypes.func
};

export default createStackedColumnChart;
