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
    // <div className="modal-overlay">
    //   <div className="modal">
    //     <button className="close-btn" onClick={onClose}>Close</button>
    //     <h2>Enter Numbers</h2>
    //     <div className="modal-content">
    //       {Array.from({ length: numElements }).map((_, index) => (
    //         <div key={index} className="input-container">
    //           <label>Element {index + 1}:</label>
    //           <input
    //             type="number"
    //             value={inputValues[index]}
    //             onChange={(e) => handleInputChange(index, e.target.value)}
    //           />
    //         </div>
    //       ))}
    //     </div>
    //     <button className="submit-btn" onClick={handleSubmit}>Submit</button>
    //   </div>
    // </div>

  <div class="fixed inset-0 flex items-center justify-center modal-overlay bg-gray-900 bg-opacity-50">
    <div class="bg-white p-8 rounded-lg modal w-1/5 max-w-md">
    
    <button class="absolute top-4 right-4 text-gray-600 hover:text-red-600 focus:outline-none" onClick={onClose}>
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>


      <div class="text-2xl font-semibold mb-4">Enter Numbers</div>
      <div class="modal-content">
        {Array.from({ length: numElements }).map((_, index) => (
          <div key={index} class="mb-4">
            <label class="block text-gray-700">Element {index + 1}:</label>
            <input
              type="number"
              min="1"
              max="50"
              value={inputValues[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              class="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
      </div>
      <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 mt-4 w-full" onClick={handleSubmit}>Submit</button>
    </div>
  </div>

  );
};

export default Modal;
