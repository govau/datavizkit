
import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'pui-react-tooltip';
import {OverlayTrigger} from 'pui-react-overlay-trigger';


const TooltipComponent = ({placement = 'bottom', text, children}) => {
  return (
    <OverlayTrigger placement={placement} overlay={<Tooltip>{text}</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> {children}</span>
    </OverlayTrigger>
  )
};

if (__DEV__) {
  TooltipComponent.propTypes = {
    placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    text: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };
}

export default TooltipComponent;


