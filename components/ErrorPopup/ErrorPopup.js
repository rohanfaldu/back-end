import React from "react";
import "./ErrorPopup.css";

const ErrorPopup = ({ errors, validationSchema, onClose }) => {
    return (
        <div className="error-popup">
        <button className="close-popup-btn" onClick={onClose} aria-label="Close">
            &times;
        </button>
            <ul>
                {Object.keys(validationSchema.fields).map((field) => {
                    const error = errors[field];
                    if (error) {
                        return (
                            <li key={field}>
                                {error}
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
           
        </div>
    );
};

export default ErrorPopup;
