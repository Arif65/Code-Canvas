import React, { useState } from 'react';
import DisplayHeader from './DisplayHeader';
import Build1DArray from './Build1DArray';
import BinarySearchController from './BinarySearchController.js';
import { useLocation, useNavigate } from 'react-router-dom';

const BinarySearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, topicName, item } = location.state || { username: '', topicName: '', item: '' };

  const [arrayElements, setArrayElements] = useState([]);
  const [chartColors, setChartColors] = useState([]);

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
      <DisplayHeader topicName={topicName} item={item} username={username} />

      <Build1DArray
        arrayElements={arrayElements}
        setArrayElements={setArrayElements}
        chartColors={chartColors}
        setChartColors={setChartColors}
        onColorUpdate={handleColorUpdate}
        resetChartColors={resetChartColors}
      />

      <BinarySearchController
        username={username}
        topicName={topicName}
        item={item}
        arrayElements={arrayElements}
        onColorUpdate={handleColorUpdate}
        resetChartColors={resetChartColors}
      />
    </div>
  );
};

export default BinarySearch;
