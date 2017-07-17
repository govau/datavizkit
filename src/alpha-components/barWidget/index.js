
import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';

import AbstractWidget from './../../components/abstractWidget';

import style from './style.scss';


const ProjectBarChart = ({
  series = [{
    name: 'John',
    color: '#a28379',
    data: [{
      y: 5,
    }]
  }, {
    name: 'Jane',
    color: '#c2a69d',
    data: [{
      y: 2,
    }]
  }]
}) => {

  const defaultConfig = {
    chart: {
      type: 'bar',
      width: 900,
      height: 120,
      spacing: [0, 0, 10, 0]
    },
    title: {
      text: null,
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
      min: 0,
      max: 100,
    },
    legend: {
      enabled: true,
      reversed: true,
      labelFormatter: function () {
        return '% ' + this.name;
      },
      align: 'left',
      margin: 0,
      padding: -1,
    },
    plotOptions: {
      series: {
        animation: false,
        stacking: 'percent',
        states: {
          hover: {
            enabled: false
          },
          select: {
            enabled: false
          }
        }
      },
      bar: {
        pointWidth: 40, // height of the bar
        dataLabels: {
          enabled: true,
          formatter: function () {
            return Math.round(this.percentage) + '%';
          },
          align: 'left',
          x: 10,
          style: {
            fontSize: '20px',
            outline: 'none',
            textOutline: 0,
            color: 'white',
            fontWeight: 400,
            letterSpacing: '1px'
          }
        },
        borderRadius: 4,
        events: {
          legendItemClick: function () {
            return false;
          }
        },
        showInLegend: true,
        allowPointSelect: false,
      }
    },
    tooltip: {
      enabled: false
    },
    series: null,
  };


  const mergedConfig = merge({}, defaultConfig, {series});

  if (!mergedConfig.series) {
    throw new Error('Must provide series');
  }

  return (
    <div className={style.projectBarChart}>
      <AbstractWidget config={mergedConfig} />
    </div>
  );
};

if (__DEV__) {
  ProjectBarChart.propTypes = {
    series: PropTypes.arrayOf({
      name: PropTypes.string.required,
      color: PropTypes.string.required,
      data: PropTypes.shape({
        y: PropTypes.number.isRequired,
      }).required,
    })
  }
}

export default ProjectBarChart;
