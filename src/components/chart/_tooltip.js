
// todo - choose a more flexible tooltip solution

import React, {PureComponent, PropTypes} from 'react';
import {Tooltip} from 'react-lightweight-tooltip';


const ChartTooltip = (props) => {
  const {
    content,
    text,
    cls = '',
    position = 'top'
  } = props;

  let positionStyle = {
    tooltip: {
      marginBottom: 0,
    },
    content: {
      padding: '0.3em 0.4em 0.4em 0',
    }
  };
  if (position === 'left') {
    throw new Error('Position left is not yet handled by this tooltip.')

  } else if (position === 'right') {
    throw new Error('Position right is not yet handled by this tooltip.')

  } else if (position === 'bottom') {
    positionStyle = {...positionStyle,
      tooltip: {
        bottom: 'inherit',
          top: '130%',
      },
      arrow: {
        top: '-5px',
          borderTop: 0,
          borderBottom: '5px solid rgb(0, 0, 0)',
      }
    }
  }

  return <Tooltip styles={positionStyle} className={cls} content={content}>{text || 'What is this?'}</Tooltip>
};

ChartTooltip.propTypes = {
  content: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'left', 'right', 'bottom'])
};

export default ChartTooltip;
