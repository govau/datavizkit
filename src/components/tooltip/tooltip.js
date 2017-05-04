
import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'pui-react-tooltip';
import {OverlayTrigger} from 'pui-react-overlay-trigger';

import 'pui-css-tooltips';
import './tooltip.css';


const TooltipComponent = ({placement = 'bottom', text, iconOnly = false}) => {
  return (
    <OverlayTrigger placement={placement} overlay={<Tooltip>{text}</Tooltip>}>
      <span className="D_Tool_overlay-trigger overlay-trigger" tabIndex="0">
        <span className="D_Tool_text-wrap">
          {iconOnly ? ''  : <span>About this chart</span>}
          <i className="fa fa-question-circle-o" />
        </span>
      </span>
    </OverlayTrigger>
  )
};

if (__DEV__) {
  TooltipComponent.propTypes = {
    placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    text: PropTypes.string.isRequired,
    iconOnly: PropTypes.bool,
  };
}

export default TooltipComponent;
