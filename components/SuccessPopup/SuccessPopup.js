import React from "react";
import "./SuccessPopup.css";

const SuccessPopup = ({ message, onClose }) => {
    if (!message) return null; // Render nothing if there's no success message

    return (
        <div className="success-popup">
            <button className="close-popup-btn" onClick={onClose} aria-label="Close">
                &times;
            </button>
            <p>{message}</p>
        </div>
    );
};

export default SuccessPopup;
