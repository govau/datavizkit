
import React from 'react';
import {compose} from 'recompose';
import styled from 'styled-components';

import withHighcharts from './../withHighcharts';
import withSparklineChart from './../withSparklineChart';
import Tooltip from './../tooltip';


// render a uniquely marked up and styled custom SparklineWidget
// might also have a SparklineWidgetLarge or SparklineWidgetMonochrome
const SparklineWidget = ({infoText, children}) => {
  return (
    <article className="chart--sparkline" role="article">
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
  withSparklineChart
)(SparklineWidget);

export default enhance;

