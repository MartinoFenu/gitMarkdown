import React from 'react';
import Modal from '../UI/Modal/Modal';
import Privacy from '../Pages/Privacy/Privacy';

const CookieBanner = props => {

  return (
    <div className="cookieBanner">
      <span>This website use cookies to give you a better experience. Clicking "Accept" you agree to our use of cookies. <span className="clickable" onClick={props.toggleModal}>Read More</span> </span>
      <button
        onClick={props.giveConsent}
        name="showCookieBanner" >
        Accept
      </button>
      {props.showModal ?
        <Modal
          show={props.showModal}
          backDropClick={props.toggleModal} >
          <Privacy />
        </Modal>
        : null}
    </div>
  )
}

export default CookieBanner
