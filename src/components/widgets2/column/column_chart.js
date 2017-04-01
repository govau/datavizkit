
import React, {PropTypes} from 'react';
import Highcharts from 'highcharts';
import {BASE_CHART_OPTIONS} from './../../../hocs/withHighcharts';


const createColumnChart = ({
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
        animation: false,
        point: {
          events: {
            mouseOver: onPointUpdate,
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
      categories: ["Jan 2017","Feb 2017","Mar 2017","Apr 2017","May 2017","Jun 2017","Jul 2017","Aug 2017","Sep 2017","Oct 2017","Nov 2017","Dec 2017"]
    },
    series: [
      {
        "name": "Desktop",
        "data": [29.9, 71.5, 106.4, 129.2, 144, 176, 135, 148.5, 216.4, 194.1, 95.6, 54.4]
      }
    ],
  };

  return new Highcharts.Chart(options);

};


createColumnChart.propTypes = {
  domNode: PropTypes.node.isRequired,
  onRender: PropTypes.func,
  onPointUpdate: PropTypes.func,
};

export default createColumnChart;
