
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withColumnChart from './../withColumnChart';
import Tooltip from './../tooltip/tooltip';
import {dateFormats} from './../../utils/displayFormats';

import './columnWidget.css';


// render a uniquely marked up and styled custom ColumnWidget
// might also have a ColumnWidgetLarge or ColumnWidgetMonochrome
const ColumnWidget = ({
  infoText,
  title,
  dateLastUpdated,
  viewport,
  children
}) => {
  return (
    <article role="article" className="D_widget">
      <header>
        {infoText && <div className="D_CW_infoContainer"><Tooltip text={infoText} viewport={viewport} /></div>}
        <h1 className="highcharts-title">{title}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(dateLastUpdated)}>{dateFormats.dayMonthYear(dateLastUpdated)}</time></span>
      </header>
      <section>{children}</section>
    </article>
  )
};


const enhance = compose(
  withHighcharts,
  withColumnChart
)(ColumnWidget);

export default enhance;

