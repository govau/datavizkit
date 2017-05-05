
import React from 'react';
import {compose} from 'recompose';
import styled from 'styled-components';

import withHighcharts from './../withHighcharts';
import withStackedColumnChart from './../withStackedColumnChart';
import Tooltip from './../tooltip/tooltip';
import {dateFormats} from './../../utils/displayFormats';


// render a uniquely marked up and styled custom StackedColumnWidget
// might also have a StackedColumnWidgetLarge or StackedColumnWidgetMonochrome
const StackedColumnWidget = ({
  infoText,
  title,
  dateLastUpdated,
  children
}) => {
  return (
    <article role="article">
      <header>
        {infoText && <Div_styledInfoTextContainer><Tooltip text={infoText} viewport={viewport}  /></Div_styledInfoTextContainer>}
        <h1 className="highcharts-title">{title}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(dateLastUpdated)}>{dateFormats.dayMonthYear(dateLastUpdated)}</time></span>
      </header>
      <section>{children}</section>
    </article>
  )
};

const Div_styledInfoTextContainer = styled.div`
  text-align: right;
`;

const enhance = compose(
  withHighcharts,
  withStackedColumnChart
)(StackedColumnWidget);

export default enhance;

