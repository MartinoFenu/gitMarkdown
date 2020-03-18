import React, { Component } from 'react';

class Resizer extends Component {
  constructor(props) {
    super(props);
    this.resizerRef = null;

    this.handleResizerRef = element => {
      this.resizerRef = element;
    };
  }

  state = {
    touchedResizer: false,
    editorHeight: 0,
    editorWidth: 0,
    previewerWidtht: 0
  }
  componentDidMount() {
    this.resizerRef.addEventListener('mousedown', this.waitForResize, false);
    window.addEventListener('resize', this.handleWindowResize, false);
    this.resizerRef.addEventListener("touchstart", this.onTouchWaitForResize, false);
  }

  componentWillUnmount() {
    this.resizerRef.removeEventListener('mousedown', this.waitForResize, false);
    window.removeEventListener('resize', this.handleWindowResize, false);
    this.resizerRef.removeEventListener("touchstart", this.onTouchWaitForResize, false);
  }
  handleWindowResize = e => {
    const rootEl = document.documentElement;
    //keep the same ratio when user resize the window
    if(this.state.touchedResizer) {
      if(!this.props.columnView) {
        rootEl.style.setProperty('--editor-height', (this.state.editorHeight * rootEl.clientHeight) + "px");
      }
      else {
        rootEl.style.setProperty('--editor-width', this.state.editorWidth + "%");
        rootEl.style.setProperty('--previewer-width', this.state.previewerWidtht + "%");
        this.setState({touchedResizer: false})
      }
    } else return;
  }
  onTouchWaitForResize = e => {
    e.preventDefault();
    this.waitForResize(e.touches[0]);
  }
  waitForResize = e => {
    window.addEventListener('mousemove', this.resize, false);
    window.addEventListener('mouseup', this.stopResize, false);
    window.addEventListener('touchmove', this.onTouchResize, false);
    window.addEventListener('touchend', this.onTouchStopResize, false);
    window.addEventListener('touchcancel', this.onTouchStopResize, false);
  }
  onTouchResize = e => {
    e.preventDefault();
    this.resize(e.touches[0]);
  }
  resize = e => {
    const rootEl = document.documentElement;
    const headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
    if(!this.props.columnView){
      rootEl.style.setProperty('--editor-height', (e.pageY - headerHeight) + "px");
      //save the current ratio in state
      this.setState({ editorHeight: e.pageY / rootEl.clientHeight });
    }
    else {
      rootEl.style.setProperty('--editor-width', e.pageX + "px");
      rootEl.style.setProperty('--previewer-width', (rootEl.clientWidth - e.pageX) + "px");
      this.setState({
        editorWidth: e.pageX / rootEl.clientWidth * 100 ,
        previewerWidtht: (rootEl.clientWidth - e.pageX ) / rootEl.clientWidth * 100 - 1
      })
    }
    this.setState({ touchedResizer: true });
  }
  onTouchStopResize = e => {
    //after touch event stops the event is saved in changedTouches
    if (e.touches.length === 0) this.stopResize(e.changedTouches[0]);
}
  stopResize = e => {
    window.removeEventListener('mousemove', this.resize, false);
    window.removeEventListener('mouseup', this.stopResize, false);
    window.removeEventListener('touchmove', this.onTouchResize, false);
    window.removeEventListener('touchend', this.onTouchStopResize, false);
    window.removeEventListener('touchcancel', this.onTouchStopResize, false);
  }
  render() {
    return(
      <span
        title="Resize"
        ref={this.handleResizerRef}
        className="resizer">
      </span>
    )
  }
}

export default Resizer;
