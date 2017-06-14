
import React from 'react';
import PropTypes from 'prop-types';

import SparklineChart from './sparklineChart';

import Tooltip from './../tooltip/tooltip';
import {dateFormats} from './../../utils/displayFormats';

import './sparklineWidget.css';


const SparklineWidget = ({
  chartTitle,
  chartDescription,
  chartUpdatedDate,
  series,
  xAxis,

  viewport,
}) => {
  return (
    <article role="article" className="D_widget">
      <header>
        {chartDescription && <div className="D_DW_infoContainer"><Tooltip text={chartDescription} viewport={viewport} /></div>}
        <h1 className="highcharts-title">{chartTitle}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(chartUpdatedDate)}>{dateFormats.dayMonthYear(chartUpdatedDate)}</time></span>
      </header>
      <section>
        <SparklineChart series={series}
                        xAxis={xAxis}
                        chartDescription={chartDescription} />
      </section>
    </article>
  )
};

if (__DEV__) {
  SparklineWidget.propTypes = {
    infoText: PropTypes.string,
    chartDescription: PropTypes.string,
  }
}

export default SparklineWidget;

