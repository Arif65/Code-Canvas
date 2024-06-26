import React, { useState, useEffect } from 'react';
import UserInput from './UserInput';
import ArrayDisplay from './ArrayDisplay';
import ChartComponent from './ChartComponent';

const Build1DArray = ({
  arrayElements,
  setArrayElements,
  chartColors,
  setChartColors,
  onColorUpdate,
  onValueUpdate,
  resetChartColors,
}) => {
  const [isRandomInputChecked, setIsRandomInputChecked] = useState(true);
  const [isUserInputChecked, setIsUserInputChecked] = useState(false);
  const [numElements, setNumElements] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isRandomInputChecked && numElements > 0) {
      generateRandomArray();
    } else {
      setArrayElements([]);
      resetChartColors();
    }
  }, [isRandomInputChecked, numElements]);

  useEffect(() => {
    resetChartColors();
  }, [arrayElements]);

  const generateRandomArray = () => {
    const randomArray = Array.from({ length: numElements }, () =>
      Math.floor(Math.random() * 50) + 1
    );
    setArrayElements(randomArray);
  };

  const handleRandomInputChange = () => {
    setIsRandomInputChecked(true);
    setIsUserInputChecked(false);
    setIsModalOpen(false);
  };

  const handleUserInputChange = () => {
    setIsRandomInputChecked(false);
    setIsUserInputChecked(true);
    setIsModalOpen(true);
  };

  const handleNumElementsChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 50)) {
      setNumElements(value === '' ? '' : Number(value));
    } else {
      setNumElements(numElements); // Prevent invalid inputs
    }
  };

  const handleNumElementsBlur = () => {
    if (numElements === '' || numElements < 1) {
      setNumElements(1);
    } else if (numElements > 50) {
      setNumElements(50);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (numbers) => {
    setArrayElements(numbers);
    setIsModalOpen(false);
  };

  const sortArray = (order) => {
    const sortedArray = [...arrayElements].sort((a, b) => (order === 'asc' ? a - b : b - a));
    setArrayElements(sortedArray);
  };

  return (
    <div>
      <UserInput
        numElements={numElements}
        isRandomInputChecked={isRandomInputChecked}
        isUserInputChecked={isUserInputChecked}
        onNumElementsChange={handleNumElementsChange}
        onNumElementsBlur={handleNumElementsBlur}
        onRandomInputChange={handleRandomInputChange}
        onUserInputChange={handleUserInputChange}
        isModalOpen={isModalOpen}
        onModalClose={handleModalClose}
        onModalSubmit={handleModalSubmit}
      />

      <ArrayDisplay arrayElements={arrayElements} onSortArray={sortArray} />

      <ChartComponent
        arrayElements={arrayElements}
        chartColors={chartColors}
      />
    </div>
  );
};

export default Build1DArray;
