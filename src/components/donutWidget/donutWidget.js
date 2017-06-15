
import React from 'react';
import PropTypes from 'prop-types';

import DonutChart from './donutChart';

import Tooltip from './../tooltip/tooltip';
import {dateFormats} from './../../utils/displayFormats';

import './donutWidget.css';


const DonutWidget = ({
  chartTitle,
  chartDescription,
  chartUpdatedDate,
  series,
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
        <DonutChart series={series}
										chartDescription={chartDescription}
										displayHighContrast={displayHighContrast} />
      </section>
    </article>
  )
};

if (__DEV__) {
  DonutWidget.propTypes = {
    chartTitle: PropTypes.string,
    chartDescription: PropTypes.string,
    chartUpdatedDate: PropTypes.string,
    series: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      units: PropTypes.string,
      color: PropTypes.string,
      data: PropTypes.array.isRequired,
    })).isRequired,
    viewport: PropTypes.oneOf(['sm','md','lg','xl']),
    displayHighContrast: PropTypes.bool,
  };
}

export default DonutWidget;
