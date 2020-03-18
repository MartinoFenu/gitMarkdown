import React, { Component } from 'react';
import Credits from '../Pages/Credits/Credits';
import Privacy from '../Pages/Privacy/Privacy';
import Modal from '../UI/Modal/Modal';

class Footer extends Component {
  state = {
    showModal: false,
    modalContent: ''
  }
  handleFooterLinks = e => {
    this.setState({
      showModal: true,
      modalContent: e.currentTarget.id
    })
  }
  showModal = () => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal
      }
    })
  }
  render() {
    return (
      <footer>
        <span>Made with fun by <a href="www.martinofenu.it"> Martino Fenu</a> | </span>
        <span
          id='credits'
          className='clickable'
          onClick={this.handleFooterLinks} >
          Credits
        </span>
        <span
          id='privacy'
          className='clickable'
          onClick={this.handleFooterLinks} >
          Privacy Policy
        </span>
        {this.state.showModal ?
          <Modal
            addClass={this.state.modalContent}
            show={this.state.showModal}
            backDropClick={this.showModal} >
            {this.state.modalContent === 'credits' ? <Credits /> : <Privacy />}
          </Modal>
          : null}
      </footer>
    )
  }

}

export default Footer;
