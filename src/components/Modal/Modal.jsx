import { useEffect} from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';


const modalRoot = document.getElementById('modal_root');
export default function Modal ({ onClose, children }){
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  });
  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      onClose()
    }
  }
 const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }
    return createPortal(
      <div
        className={css.overlay}
        onClick={handleBackdropClick}>
        <div className={css.modal}>
         {children}
        </div>
      </div>,
      modalRoot
    );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  // src: PropTypes.string.isRequired,
}
