
import React from 'react';
import {compose} from 'recompose';
import styled from 'styled-components';

import withHighcharts from './../withHighcharts';
import withColumnChart from './../withColumnChart';
import Tooltip from './../tooltip';


// render a uniquely marked up and styled custom ColumnWidget
// might also have a ColumnWidgetLarge or ColumnWidgetMonochrome
const ColumnWidget = ({infoText, children}) => {
  return (
    <article className="chart--column" role="article">
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
  withColumnChart
)(ColumnWidget);

export default enhance;

