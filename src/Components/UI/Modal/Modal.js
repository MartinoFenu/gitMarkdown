import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

const Modal =  props => {
   const modalClasses = [props.show ? 'Modal' : 'Modal closed', props.addClass].join(' ');
   return (
     <>
       <Backdrop
         show={props.show}
         clicked={props.backDropClick} />
       <div className={modalClasses} >
        {props.children}
       </div>
     </>
   )
 }


export default React.memo(Modal);
