
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
        {chartDescription && <div className="D_DW_infoContainer"><Tooltip text={chartDescription} viewport={viewport} /></div>}
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
    chartDescription: PropTypes.string,
  }
}

export default ColumnWidget;
