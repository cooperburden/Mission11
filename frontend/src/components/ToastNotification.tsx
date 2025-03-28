import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap'; // Import Bootstrap Toast components

interface ToastNotificationProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ show, message, onClose }) => {
  return (
    <ToastContainer
      className="toast-container" 
      style={{ zIndex: 1050, position: 'fixed', top: '10px', left: '10px' }} // Updated to fixed positioning for top-left
    >
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;
