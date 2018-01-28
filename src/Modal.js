import React from 'react';

import './Modal.css';

function Modal(props) {
  return (
    <div className="modal-container" onClick={props.onCloseModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
}

export default Modal;
