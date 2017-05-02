
import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'pui-react-tooltip';
import 'pui-css-tooltips';
import {OverlayTrigger} from 'pui-react-overlay-trigger';

import styled from 'styled-components';


const TooltipComponent = ({placement = 'bottom', text, iconOnly = false}) => {
  return (
    <OverlayTrigger placement={placement} overlay={<Tooltip trigger="click" delayHide="900000">{text}</Tooltip>}>
      <Span_styledText className="overlay-trigger" tabIndex="0">
        <span>{iconOnly ? '' : 'About this chart '}<i className="fa fa-question-circle" /></span>}
      </Span_styledText>
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

const Span_styledText = styled.span`
	font-size: 12px;
	font-weight: 600;
	text-align: right;
	color: #1362a6;
`;

export default TooltipComponent;


