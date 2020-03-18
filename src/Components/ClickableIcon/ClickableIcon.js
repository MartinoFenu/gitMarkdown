import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClickableIcon = props => {
  return(
    <button
      className={["btn clickableIcon", props.addClass].join(' ')}
      name={props.name}
      key={props.name}
      onClick={props.onClick}
      title={props.title}
      onBlur={props.onBlur}>
      <FontAwesomeIcon
        icon={props.icon} >
      </FontAwesomeIcon>
      {props.children}
    </button>
  )
}

export default ClickableIcon;
