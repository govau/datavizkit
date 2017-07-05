
import React from 'react';
import get from 'lodash/get';

import AbstractChart from './abstractChart';


const AbstractWidget = ({config}) => {

  if (get(config, 'chart.renderTo')) {
    delete config.chart.renderTo
  }

  return (
    <div>
      <AbstractChart config={config} />
    </div>
  )
};

// todo - proptypes

export default AbstractWidget;
