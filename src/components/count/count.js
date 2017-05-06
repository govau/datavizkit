
import React from 'react';

import './count.css';


const formatLargeNumber = (val) => {
  let formatted = val;
  let isNegative = false;
  if (val < 0) {
    isNegative = true;
  }
  val = Math.abs(val);
  if (val >= 1000000) {
    formatted = (val/1000000).toFixed(1) + 'm';
  } else if (val >= 1000) {
    formatted = (val/1000).toFixed(1) + 'k';
  } else {
    formatted = val;
  }
  if (isNegative) {
    formatted = `- ${formatted}`;
  }
  return formatted.replace(/\.0/, '');
};

const Count = ({value, units}) => {

  const formattedValue = formatLargeNumber(value);

  return (
    <div className="D_CTW_S_count">
      <div className="D_CTW_S_countInner">
        {units === '$' && <span className="D_CTW_S_countUnits">{units}</span>}
        <span className="D_CTW_S_countValue">{formattedValue}</span>
        {units === '%' && <span className="D_CTW_S_countUnits">{units}</span>}
      </div>
    </div>
  )
};

export default Count;
