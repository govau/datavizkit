
import React from 'react';
import PropTypes from 'prop-types';

import HeroChart from './heroChart';
import Tooltip from './../tooltip/tooltip';
import {dateFormats} from './../../utils/displayFormats';

import './heroWidget.css';


const HeroWidget = ({
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
        {chartDescription && <div className="D_SW_infoContainer"><Tooltip text={chartDescription} viewport={viewport} /></div>}
        <h1 className="highcharts-title">{chartTitle}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(chartUpdatedDate)}>{dateFormats.dayMonthYear(chartUpdatedDate)}</time></span>
      </header>
      <section>
        <HeroChart series={series}
                     xAxis={xAxis}
                     yAxis={yAxis}
	                   chartDescription={chartDescription}
	                   displayHighContrast={displayHighContrast} />
      </section>
    </article>
  )
};

if (__DEV__) {
  HeroWidget.propTypes = {
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
      opposite: PropTypes.bool,
    })),
    viewport: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    displayHighContrast: PropTypes.bool,
  };
}
export default HeroWidget;
