import React, { useState, useEffect } from 'react';
import DisplayHeader from './DisplayHeader';
import UserInput from './UserInput';
import ArrayDisplay from './ArrayDisplay';
import ChartComponent from './ChartComponent';
import SearchController from './SearchController';
import { useLocation, useNavigate } from 'react-router-dom';

const LinearSearch = ({ onBackClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state || { username: '' };

  const [isRandomInputChecked, setIsRandomInputChecked] = useState(true);
  const [isUserInputChecked, setIsUserInputChecked] = useState(false);
  const [numElements, setNumElements] = useState(0);
  const [arrayElements, setArrayElements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartColors, setChartColors] = useState([]);

  useEffect(() => {
    if (isRandomInputChecked && numElements > 0) {
      generateRandomArray();
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

  const handleColorUpdate = (index, color) => {
    const newChartColors = [...chartColors];
    newChartColors[index] = { index, color };
    setChartColors(newChartColors);
  };

  const resetChartColors = () => {
    const initialColors = arrayElements.map(() => ({ index: null, color: 'rgba(54, 162, 235, 0.5)' }));
    setChartColors(initialColors);
  };

  return (
    <div>
      <DisplayHeader text="Linear Search" username={username} onBackClick={() => navigate('/')} />
      
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
        chartColors={chartColors}
      />

      <SearchController 
        arrayElements={arrayElements} 
        onColorUpdate={handleColorUpdate} 
        resetChartColors={resetChartColors} // Pass the reset function as a prop
      />
    </div>
  );
};

export default LinearSearch;
