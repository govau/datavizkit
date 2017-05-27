
import React from 'react';

import LineChart from './donutChart';

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
}) => {
  return (
    <article role="article" className="D_widget">
      <header>
        {infoText && <div className="D_DW_infoContainer"><Tooltip text={infoText} viewport={viewport} /></div>}
        <h1 className="highcharts-title">{title}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(dateLastUpdated)}>{dateFormats.dayMonthYear(dateLastUpdated)}</time></span>
      </header>
      <section>
        <LineChart series={series} xAxis={xAxis} yAxis={yAxis} displayHighContrast={displayHighContrast} />
      </section>
    </article>
  )
};

export default DonutWidget;
