import React, { useState, useEffect } from 'react';
import './Modal.css'; // Ensure this CSS file includes necessary styling

const Modal = ({ isOpen, onClose, onSubmit, numElements }) => {
  const [inputValues, setInputValues] = useState(Array(numElements).fill(''));

  useEffect(() => {
    if (isOpen) {
      setInputValues(Array(numElements).fill(''));
    }
  }, [isOpen, numElements]);

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleSubmit = () => {
    const validNumbers = inputValues.map((val) => parseInt(val, 10)).filter((val) => !isNaN(val));
    if (validNumbers.length === numElements) {
      onSubmit(validNumbers);
      onClose(); // Close the modal after successful submission
    } else {
      alert('Please fill in all fields with valid numbers.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h2>Enter Numbers</h2>
        <div className="modal-content">
          {Array.from({ length: numElements }).map((_, index) => (
            <div key={index} className="input-container">
              <label>Element {index + 1}:</label>
              <input
                type="number"
                value={inputValues[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Modal;
