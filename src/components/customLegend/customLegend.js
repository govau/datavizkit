
import React from 'react';
import styled from 'styled-components';


const Legend = (props) => {
  const {data, className} = props;
  return (
    <div className={className}>
      {data.map((d, idx) => {
        return <div key={idx} className="row">
          <div className="key">
            <svg width="12" height="12">
              <g>{d.color && <rect x="0" y="0" width="12" height="12" fill={d.color} visibility="visible" rx="6" ry="6"></rect>}</g>
            </svg>{d.key}
          </div>
          <div className="value">{d.y}</div>
        </div>
      })}
    </div>
  )
};

const StyledLegend = styled(Legend)`
  .row {
    display: table;
    width: 100%;
  }
  .key,
  .value {
    display: table-cell;
    vertical-align: middle;
  }
  .key {
    svg {
      margin-right: 1em;
    }
  }
  .value {
    text-align: right;
  }
`;

export default StyledLegend;
