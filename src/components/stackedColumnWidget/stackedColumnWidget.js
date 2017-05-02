
import React from 'react';
import {compose} from 'recompose';
import styled from 'styled-components';

import withHighcharts from './../withHighcharts';
import withStackedColumnChart from './../withStackedColumnChart';
import Tooltip from './../tooltip';


// render a uniquely marked up and styled custom StackedColumnWidget
// might also have a StackedColumnWidgetLarge or StackedColumnWidgetMonochrome
const StackedColumnWidget = ({infoText, children}) => {
  return (
    <article className="chart--stackedColumn" role="article">
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
  withStackedColumnChart
)(StackedColumnWidget);

export default enhance;

