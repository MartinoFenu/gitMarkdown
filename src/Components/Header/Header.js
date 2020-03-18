import React from 'react';

const Header = props => {
  return(
    <header>
      <span>Split view</span>
      <button onClick={props.handleChangeView}
        className={props.columnView ? "btnSplit columnView active" : "btnSplit columnView"} >
        <span className="blockIcon"></span>
        <span className="blockIcon"></span>
      </button>
      <button onClick={props.handleChangeView}
        className={!props.columnView ? "btnSplit rowView active" : "btnSplit rowView"} >
        <span className="blockIcon"></span>
        <span className="blockIcon"></span>
      </button>
    </header>
  )
}

export default Header;
