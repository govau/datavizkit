
import React from 'react';

import ColumnChart from './columnChart';

import Tooltip from './../tooltip/tooltip';
import {dateFormats} from './../../utils/displayFormats';

import './columnWidget.css';


const ColumnWidget = ({
  infoText,
  title,
  dateLastUpdated,
  viewport,
  series, xAxis, yAxis,
}) => {
  return (
    <article role="article" className="D_widget">
      <header>
        {infoText && <div className="D_SW_infoContainer"><Tooltip text={infoText} viewport={viewport} /></div>}
        <h1 className="highcharts-title">{title}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(dateLastUpdated)}>{dateFormats.dayMonthYear(dateLastUpdated)}</time></span>
      </header>
      <section>
        <ColumnChart series={series} xAxis={xAxis} yAxis={yAxis} />
      </section>
    </article>
  )
};

export default ColumnWidget;
