import { Component } from "react";
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';


const modalRoot = document.getElementById('modal_root');
export function Modal (){

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }
  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose()
    }
  }
 const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  }

    return createPortal(
      <div
        className={css.overlay}
        onClick={handleBackdropClick}>
        <div className={css.modal}>
         {this.props.children}
        </div>
      </div>,
      modalRoot
    );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
}
