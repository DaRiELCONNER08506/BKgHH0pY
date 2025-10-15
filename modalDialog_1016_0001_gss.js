// 代码生成时间: 2025-10-16 00:01:05
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './modalDialog.css'; // Importing the CSS file for styling

// Define the ModalDialog component
const ModalDialog = ({ isOpen, children, onClose }) => {
  // Use state to handle the modal's visibility
  const [isVisible, setIsVisible] = useState(isOpen);

  // Effect hook to handle component unmounting and visibility changes
  useEffect(() => {
    setIsVisible(isOpen);
    return () => {
      // Optional: Perform any clean-up actions here
    };
  }, [isOpen]);

  // Function to handle the modal overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Return null if the modal is not visible
  if (!isVisible) return null;

  // Render the modal dialog
  return ReactDOM.createPortal(
    // Overlay and modal content
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
};

// PropTypes for better development experience and error checking
ModalDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

// Export the ModalDialog component
export default ModalDialog;