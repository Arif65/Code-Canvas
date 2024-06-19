import React, { useState, useEffect } from 'react';
import DisplayHeader from './DisplayHeader';
import UserInput from './UserInput';
import ArrayDisplay from './ArrayDisplay';
import ChartComponent from './ChartComponent';
import SearchController from './SearchController';

const LinearSearch = ({ onBackClick, isGuest, username }) => {
  const [isRandomInputChecked, setIsRandomInputChecked] = useState(true);
  const [isUserInputChecked, setIsUserInputChecked] = useState(false);
  const [numElements, setNumElements] = useState(0);
  const [arrayElements, setArrayElements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);

  useEffect(() => {
    if(isRandomInputChecked && numElements > 0) {
      generateRandomArray();
    }
  }, [isRandomInputChecked, numElements]);

  const generateRandomArray = () => {
    const randomArray = Array.from({ length: numElements }, () => Math.floor(Math.random() * 50) + 1);
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

  const handleSearchComplete = (index) => {
    setFoundIndex(index);
  };

  const handleCurrentIndexChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <DisplayHeader username={username} onBackClick={onBackClick} />
      
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

      <ArrayDisplay arrayElements={arrayElements} />
      
      <ChartComponent 
        arrayElements={arrayElements} 
        currentIndex={currentIndex} 
        foundIndex={foundIndex} 
      />

      <SearchController 
        arrayElements={arrayElements} 
        onSearchComplete={handleSearchComplete} 
        onCurrentIndexChange={handleCurrentIndexChange}
      />
    </div>
  );
};

export default LinearSearch;
