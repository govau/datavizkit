
import React from 'react';
import PropTypes from 'prop-types';

import ColumnChart from './columnChart';

import Tooltip from './../tooltip/tooltip';
import {dateFormats} from './../../utils/displayFormats';

import './columnWidget.css';


const ColumnWidget = ({
  chartTitle,
  chartDescription,
  chartUpdatedDate,
  series,
  xAxis,
  yAxis,

  viewport,
  displayHighContrast,
}) => {
  return (
    <article role="article" className="D_widget">
      <header>
        {chartDescription && <div className="D_CW_infoContainer"><Tooltip text={chartDescription} viewport={viewport} /></div>}
        <h1 className="highcharts-title">{chartTitle}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(chartUpdatedDate)}>{dateFormats.dayMonthYear(chartUpdatedDate)}</time></span>
      </header>
      <section>
        <ColumnChart series={series}
                     xAxis={xAxis}
                     yAxis={yAxis}
                     chartDescription={chartDescription}
                     displayHighContrast={displayHighContrast} />
      </section>
    </article>
  )
};

if (__DEV__) {
  ColumnWidget.propTypes = {
    chartTitle: PropTypes.string,
    chartDescription: PropTypes.string,
    chartUpdatedDate: PropTypes.string,
    series: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      units: PropTypes.string,
      color: PropTypes.string,
      data: PropTypes.array.isRequired,
    })).isRequired,
    xAxis: PropTypes.arrayOf(PropTypes.shape({
      categories: PropTypes.array,
    })),
    yAxis: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.object,
    })),
    viewport: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    displayHighContrast: PropTypes.bool,
  };
}

export default ColumnWidget;
