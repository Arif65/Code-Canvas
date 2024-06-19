import React, { useState } from 'react';
import Modal from './Modal'; // Adjust the import path based on your project structure

const UserInput = ({
  numElements,
  isRandomInputChecked,
  isUserInputChecked,
  onNumElementsChange,
  onNumElementsBlur,
  onRandomInputChange,
  onUserInputChange,
  onModalSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRandomInputChange = () => {
    onRandomInputChange();
    setIsModalOpen(false);
  };

  const handleUserInputChange = () => {
    onUserInputChange();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (numbers) => {
    onModalSubmit(numbers);
    setIsModalOpen(false);
  };

  return (
    <div>
      <label htmlFor="number-of-elements">Number of elements:</label>
      <input
        type="number"
        id="number-of-elements"
        value={numElements}
        min="1"
        max="50"
        onChange={onNumElementsChange}
        onBlur={onNumElementsBlur}
      />
      <input
        type="checkbox"
        id="random-input"
        checked={isRandomInputChecked}
        onChange={handleRandomInputChange}
      />
      <label htmlFor="random-input">Random Input</label>
      <input
        type="checkbox"
        id="user-input"
        checked={isUserInputChecked}
        onChange={handleUserInputChange}
      />
      <label htmlFor="user-input">User Input</label>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        numElements={numElements}
      />
    </div>
  );
};

export default UserInput;
