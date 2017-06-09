
import React from 'react';
import PropTypes from 'prop-types';

import StackedColumnChart from './stackedColumnChart';

import Tooltip from './../tooltip/tooltip';
import {dateFormats} from './../../utils/displayFormats';

import './stackedColumnWidget.css';


const StackedColumnWidget = ({
  infoText,
  title,
  dateLastUpdated,
  viewport,
  series, xAxis, yAxis,
  displayHighContrast,
  chartDescription,

  groupIndex, // todo - rename to widgetIndex
}) => {
  return (
    <article role="article" className="D_widget">
      <header>
        {infoText && <div className="D_SCW_infoContainer">{infoText && <Tooltip text={infoText} viewport={viewport} />}</div>}
        <h1 className="highcharts-title">{title}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(dateLastUpdated)}>{dateFormats.dayMonthYear(dateLastUpdated)}</time></span>
      </header>
      <section>
        <StackedColumnChart series={series}
                            xAxis={xAxis}
                            yAxis={yAxis}
                            chartDescription={infoText || chartDescription}
                            widgetIndex={groupIndex}
                            displayHighContrast={displayHighContrast} />
      </section>
    </article>
  )
};

if (__DEV__) {
  StackedColumnChart.propTypes = {
    infoText: PropTypes.string,
    chartDescription: PropTypes.string,
  }
}

export default StackedColumnWidget;
