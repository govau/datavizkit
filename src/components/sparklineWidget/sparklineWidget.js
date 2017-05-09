
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withSparklineChart from './../withSparklineChart';
import Tooltip from './../tooltip/tooltip';
import {dateFormats} from './../../utils/displayFormats';

import './sparklineWidget.css';


// render a uniquely marked up and styled custom SparklineWidget
// might also have a SparklineWidgetLarge or SparklineWidgetMonochrome
const SparklineWidget = ({
  infoText,
  title,
  dateLastUpdated,
  children,
  viewport,
}) => {
  return (
    <article role="article" className="D_widget">
      <header>
        {infoText && <div className="D_SW_infoContainer"><Tooltip text={infoText} viewport={viewport}  /></div>}
        <h1 className="highcharts-title">{title}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(dateLastUpdated)}>{dateFormats.dayMonthYear(dateLastUpdated)}</time></span>
      </header>
      <section>{children}</section>
    </article>
  )
};

const enhance = compose(
  withHighcharts,
  withSparklineChart
)(SparklineWidget);

export default enhance;

