
import React from 'react';

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
}) => {
  return (
    <article role="article" className="D_widget">
      <header>
        {infoText && <div className="D_SCW_infoContainer"><Tooltip text={infoText} viewport={viewport} /></div>}
        <h1 className="highcharts-title">{title}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(dateLastUpdated)}>{dateFormats.dayMonthYear(dateLastUpdated)}</time></span>
      </header>
      <section>
        <StackedColumnChart series={series}
                            xAxis={xAxis}
                            yAxis={yAxis}
                            displayHighContrast={displayHighContrast}
                            chartDescription={infoText || chartDescription} />
      </section>
    </article>
  )
};

export default StackedColumnWidget;
