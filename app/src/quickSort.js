import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from 'chart.js/auto';
import DisplayHeader from './DisplayHeader'; //
import ArrayDisplaySort from './ArrayDisplaySort'; //
import SpeedControl from './SpeedControl'; 
import UserInput from './UserInput'; //
import SaveButton from './SaveButton';

const QuickSort = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const searchTimeoutRef = useRef(null);

  const location = useLocation();
  const { username, topicName, item } = location.state || { username: '', topicName: '', item: '' };

  const [arr, setArr] = useState([]);
  const [data, setData] = useState([]);
  const [boxColors, setBoxColors] = useState([]);
  const [numElements, setNumElements] = useState(3);
  const [searchSpeedMultiplier, setSearchSpeedMultiplier] = useState(1.0);
  const [isRandomInputChecked, setIsRandomInputChecked] = useState(true);
  const [isUserInputChecked, setIsUserInputChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [numCheck, setNumCheck] = useState(0);
  const [numSwap, setNumSwap] = useState(0);

  useEffect(() => {
    generateRandomArray(numElements);
  }, [numElements]);

  useEffect(() => {
    if (chartContainer.current && chartContainer.current.getContext) {
      const ctx = chartContainer.current.getContext('2d');
      if (!chartInstance.current) {
        initializeChart(ctx);
      } else {
        updateChart();
      }
    }
  }, [data, numElements]);

  useEffect(() => {
    
  }, [data]);

  useEffect(() => {
    setBoxColors(Array.from({ length: numElements }, () => '#f9f9f9'));
  }, [data, numElements]);

  const initializeChart = (ctx) => {
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Array.from({ length: numElements }, (_, i) => (i + 1).toString()),
        datasets: [{
          data: data.slice(0, numElements),
          backgroundColor: generateColors(numElements),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        },
        maintainAspectRatio: false,
        height: window.innerHeight
      }
    });
  };
  

  const generateRandomArray = (num) => {
    const randomArray = Array.from({ length: num }, () =>
      Math.floor(Math.random() * 50) + 1
    );
    setData(randomArray);
  };

  const generateColors = (num) => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      colors.push('lightblue');
    }
    return colors;
  };

  const handleRandomInputChange = () => {
    setIsRandomInputChecked(true);
    setIsUserInputChecked(false);
    setIsModalOpen(false);
    generateRandomArray(numElements);
    setIsRunning(false);
  };

  const handleUserInputChange = () => {
    setIsRandomInputChecked(false);
    setIsUserInputChecked(true);
    setIsModalOpen(true);
    setIsRunning(false);
  };

  const handleNumElementsChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 50)) {
      setNumElements(value === '' ? '' : Number(value));
    } else {
      setNumElements(numElements);
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
    setData(numbers.slice(0, numElements));
    setIsModalOpen(false);
  };

  const isSorted = (arrayElements) => {
    if(!numElements)return false;
    for (let i = 0; i < numElements - 1; i++) {
      if (arrayElements[i] > arrayElements[i + 1])
        return false;
    }
    verdict = 'Sorted by ' + numSwap + ' swaps out of ' + numCheck + ' checks.';
    return true;
  };

  const quickSort = () => {
    const newData = [...data];
    let labels = Array.from({ length: numElements }, (_, i) => (i + 1).toString());
    let colors = generateColors(numElements);
    let timeout = 0;
  
    const partition = (arr, low, high) => {
      let pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        setNumCheck(prevNumCheck => prevNumCheck + 1);
        if (arr[j] < pivot) {
          i++;
          swap(arr, i, j);
          swap(labels, i, j);
          swap(colors, i, j);
          timeout += 500 / searchSpeedMultiplier;
          updateChartDelayed(labels.slice(), arr.slice(), colors.slice(), timeout);
        }
      }
      swap(arr, i + 1, high);
      swap(labels, i + 1, high);
      swap(colors, i + 1, high);
      timeout += 500 / searchSpeedMultiplier;
      updateChartDelayed(labels.slice(), arr.slice(), colors.slice(), timeout);
      return i + 1;
    };
  
    const quickSortHelper = (arr, low, high) => {
      if (low < high) {
        let pi = partition(arr, low, high);
        quickSortHelper(arr, low, pi - 1);
        quickSortHelper(arr, pi + 1, high);
      }
    };
  
    quickSortHelper(newData, 0, newData.length - 1);
  
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  const swap = (arr, i, j) => {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };

  const updateChart = () => {
    if (chartInstance.current) {
      chartInstance.current.data.labels = Array.from({ length: numElements }, (_, i) => (i + 1).toString());
      chartInstance.current.data.datasets[0].data = data.slice(0, numElements);
      chartInstance.current.data.datasets[0].backgroundColor = generateColors(numElements);
      chartInstance.current.update();
    }
  };

  const updateChartDelayed = (labels, data, colors, timeout) => {
  setTimeout(() => {
    if (chartInstance.current) {
      chartInstance.current.data.labels = labels;
      chartInstance.current.data.datasets[0].data = data.slice(0, numElements);
      chartInstance.current.data.datasets[0].backgroundColor = colors;
      chartInstance.current.update();
    }
    setData(data.slice(0, numElements));
  }, timeout);
};

  const handleSpeedChange = (event) => {
    setSearchSpeedMultiplier(parseFloat(event.target.value));
  };

  const start = () => {
    setArr(data);
    setIsRunning(true);
    quickSort();
  };

  const reset = () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    setNumCheck(0);
    setNumSwap(0);
    setIsRunning(false);
    setNumElements(5);
    handleRandomInputChange();
  };

  const completed = () => {
    // setIsRunning(false);
  };

  let verdict = null;

  return (
    <>
      <DisplayHeader topicName={topicName} item={item} username={username} />

      <UserInput
        numElements={numElements}
        isRandomInputChecked={isRandomInputChecked}
        isUserInputChecked={isUserInputChecked}
        onRandomInputChange={handleRandomInputChange}
        onUserInputChange={handleUserInputChange}
        onNumElementsChange={handleNumElementsChange}
        onNumElementsBlur={handleNumElementsBlur}
        isModalOpen={isModalOpen}
        onModalClose={handleModalClose}
        onModalSubmit={handleModalSubmit}
        isRunning={isRunning}
      />

      <ArrayDisplaySort arrayElements={data} colors={boxColors}/>

      <div className="w-5/6 h-[50vh] flex flex-col items-center mx-auto mt-8">
        <canvas ref={chartContainer} className="w-full h-full"></canvas>

        {!isRunning && !isSorted(data) && (
          <button onClick={() => start()} className="mt-4 mx-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Start</button>
        )}

        {isSorted(data) && (
          <div className='flex gap-3'>
            <div className='flex gap-2'>
              <button 
                onClick={() => reset()}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 hover:text-white"
              >
                Reset
              </button>
              <SaveButton
                username={username}
                topicName={topicName}
                item={item}
                arrayElements={arr}
              />
            </div>

            <div className="flex justify-center items-center">
              {verdict && verdict}
            </div>
          </div>
        )}
        <SpeedControl 
          searchSpeedMultiplier={searchSpeedMultiplier} 
          handleSpeedChange={handleSpeedChange} 
        />
      </div>
    </>
  );
};

export default QuickSort;
