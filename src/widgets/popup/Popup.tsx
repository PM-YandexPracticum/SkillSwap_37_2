import { ReactNode, forwardRef, useEffect, useRef } from "react";
import styles from './Popup.module.css'
import ReactDOM from "react-dom";
import { OverlayUI } from "../../shared/ui/overlay/OverlayUI";

type TPopupProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const popupRoot = document.getElementById('popups');

export const Popup = ({ children, isOpen, onClose }:TPopupProps) => {

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose()
    };
    
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [ isOpen, onClose ]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles.popup_container}>
        <div className={styles.content}>{children}</div>
      </div>
      <OverlayUI onClick={onClose}/>
    </>,
    popupRoot as HTMLDivElement
  )
};