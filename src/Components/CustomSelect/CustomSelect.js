import React from 'react';
import ClickableIcon from '../ClickableIcon/ClickableIcon';

const CustomSelect = props => {
  let options = [];
  for(let i = 1; i <= props.el.optionsNum; i++) {
    options.push(
      <span
        className="options"
        title={`Heading ${i}`}
        key={i}
        onClick={e => props.choseHeading(e, props.el.markdownType, props.el.markdown, i)}>
        {`H${i}`}
      </span>
    )
  }
  return(
    <ClickableIcon
      addClass="customSelect"
      name={props.el.title}
      key={props.el.id}
      title={props.el.title}
      icon={props.el.icon}
      onClick={props.selectClick}
      onBlur={props.onSelectBlur}>
      {props.showOptions ? <div className="customOptionsBox">{options}</div> : null}
    </ClickableIcon>
  )
}

export default CustomSelect;
