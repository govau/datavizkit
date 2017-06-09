
import React from 'react';
import PropTypes from 'prop-types';

import DonutChart from './donutChart';

import Tooltip from './../tooltip/tooltip';
import {dateFormats} from './../../utils/displayFormats';

import './donutWidget.css';


const DonutWidget = ({
  infoText,
  title,
  dateLastUpdated,
  viewport,
  series, xAxis, yAxis,
  displayHighContrast,
  chartDescription,
  widgetIndex = 0,
}) => {
  return (
    <article role="article" className="D_widget">
      <header>
        {infoText && <div className="D_DW_infoContainer">{infoText && <Tooltip text={infoText} viewport={viewport} />}</div>}
        <h1 className="highcharts-title">{title}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(dateLastUpdated)}>{dateFormats.dayMonthYear(dateLastUpdated)}</time></span>
      </header>
      <section>
        <DonutChart series={series}
										xAxis={xAxis}
										yAxis={yAxis}
										chartDescription={infoText || chartDescription}
										widgetIndex={widgetIndex}
										displayHighContrast={displayHighContrast} />
      </section>
    </article>
  )
};

if (__DEV__) {
  DonutWidget.propTypes = {
    widgetIndex: PropTypes.number,
    infoText: PropTypes.string,
    chartDescription: PropTypes.string,
  }
}

export default DonutWidget;
