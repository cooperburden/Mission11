import React, { useEffect } from "react";
import { useCart } from "../context/CartContext"; // Import the Cart context
import { Toast } from "react-bootstrap"; // Import Bootstrap Toast component

const ToastNotification = () => {
  const { toast, setToast } = useCart(); // Get the toast state and setToast function

  // Automatically hide the toast after 3 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "" }); // Hide the toast after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Clear the timer on unmount
    }
  }, [toast.show, setToast]);

  return (
    <div
      aria-live="polite"
      style={{
        position: "fixed", // Fixed position
        top: "10px", // Top-left corner
        left: "10px", // Top-left corner
        zIndex: 1050, // Ensure it is on top
      }}
    >
      {toast.show && (
        <Toast
          onClose={() => setToast({ show: false, message: "" })}
          show={toast.show}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      )}
    </div>
  );
};

export default ToastNotification;
