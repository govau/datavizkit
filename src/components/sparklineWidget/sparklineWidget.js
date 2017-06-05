
import React from 'react';

import SparklineChart from './sparklineChart';

import Tooltip from './../tooltip/tooltip';
import {dateFormats} from './../../utils/displayFormats';

import './sparklineWidget.css';


const SparklineWidget = ({
  infoText,
  title,
  dateLastUpdated,
  viewport,
  series, xAxis,
  chartDescription,
}) => {
  return (
    <article role="article" className="D_widget">
      <header>
        {infoText && <div className="D_SW_infoContainer"><Tooltip text={infoText} viewport={viewport} /></div>}
        <h1 className="highcharts-title">{title}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(dateLastUpdated)}>{dateFormats.dayMonthYear(dateLastUpdated)}</time></span>
      </header>
      <section>
        <SparklineChart series={series}
                        xAxis={xAxis}
                        chartDescription={infoText || chartDescription} />
      </section>
    </article>
  )
};

export default SparklineWidget;
