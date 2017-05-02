
import React from 'react';
import {compose} from 'recompose';
import styled from 'styled-components';

import withHighcharts from './../withHighcharts';
import withDonutChart from './../withDonutChart';
import Tooltip from './../tooltip';


// render a uniquely marked up and styled custom ColumnWidget
// might also have a ColumnWidgetLarge or ColumnWidgetMonochrome
const DonutWidget = ({infoText, children}) => {
  return (
    <article className="chart--donut" role="article">
      {infoText && <Div_styledInfoTextContainer><Tooltip text={infoText} /></Div_styledInfoTextContainer>}
      <section>{children}</section>
    </article>
  )
};

const Div_styledInfoTextContainer = styled.div`
  text-align: right;
`;

const enhance = compose(
  withHighcharts,
  withDonutChart
)(DonutWidget);

export default enhance;

