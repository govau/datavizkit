
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withStackedColumnChart from './../withStackedColumnChart';
import Tooltip from './../tooltip/tooltip';
import {dateFormats} from './../../utils/displayFormats';

import './stackedColumnWidget.css';


// render a uniquely marked up and styled custom StackedColumnWidget
// might also have a StackedColumnWidgetLarge or StackedColumnWidgetMonochrome
const StackedColumnWidget = ({
  infoText,
  title,
  dateLastUpdated,
  children,
  viewport,
}) => {
  return (
    <article role="article"D_widget>
      <header>
        {infoText && <div className="D_SCW_infoContainer"><Tooltip text={infoText} viewport={viewport}  /></div>}
        <h1 className="highcharts-title">{title}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(dateLastUpdated)}>{dateFormats.dayMonthYear(dateLastUpdated)}</time></span>
      </header>
      <section>{children}</section>
    </article>
  )
};

const enhance = compose(
  withHighcharts,
  withStackedColumnChart
)(StackedColumnWidget);

export default enhance;

