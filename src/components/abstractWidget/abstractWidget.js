
import React from 'react';

import AbstractChart from './abstractChart';


// todo dont allow someone to supply chart.renderTo

const AbstractWidget = ({config}) => {
  return (
    <div>
      <AbstractChart config={config} />
    </div>
  )
};

// todo - proptypes

export default AbstractWidget;
