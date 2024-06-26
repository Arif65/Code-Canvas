import React, { useState, useEffect, useRef } from 'react';
import SpeedControl from './SpeedControl'; // Import the SpeedControl component
import ControlButtons from './ControlButtons'; // Import the ControlButtons component
import simpleBubbleSort from './simpleBubbleSort.js';

const BubbleSortController = ({
  username,
  topicName,
  item,
  arrayElements,
  onColorUpdate,

  pair,
  setPair,
  arrayUpdate,

  arrayUpdateSwap,

  resetChartColors,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [searchSpeedMultiplier, setSearchSpeedMultiplier] = useState(1);
  const sortTimeoutRef = useRef(null);
  const visibilityStateRef = useRef(document.visibilityState);
  const [sortedIndex, setSortedIndex] = useState(arrayElements.length);
  const [localArray, setLocalArray] = useState([...arrayElements]);

  useEffect(() => {
    setLocalArray([...arrayElements]);
  }, [arrayElements]);

  const startSort = () => {
    setIsCompleted(false);
    setCurrentIndex(0);
    setIsSorting(true);
    setIsPaused(false);
    setSortedIndex(localArray.length);
    resetChartColors();
  };

  const pauseSort = () => {
    setIsPaused(true);
    setIsSorting(false);
    if (sortTimeoutRef.current) {
      clearTimeout(sortTimeoutRef.current);
    }
  };

  const continueSort = () => {
    setIsPaused(false);
    setIsSorting(true);
  };

  const stopSort = () => {
    setIsCompleted(false);
    setCurrentIndex(0);
    setIsSorting(false);
    setIsPaused(false);
    setSortedIndex(localArray.length);
    resetChartColors();
    if (sortTimeoutRef.current) {
      clearTimeout(sortTimeoutRef.current);
    }
  };

  const sortCompleted = () => {
    setIsSorting(false);
    setIsPaused(false);
    if (sortTimeoutRef.current) {
      clearTimeout(sortTimeoutRef.current);
    }
  };

  const handleSpeedChange = (e) => {
    setSearchSpeedMultiplier(Number(e.target.value));
  };

  const searchSpeed = 500 / searchSpeedMultiplier;

  const performSortStep = () => {
    if (document.visibilityState === 'hidden') {
      return;
    }
  
    arrayUpdateSwap(0, 1, 10, 20);
    setTimeout(() => {
      arrayUpdateSwap(2, 3, 10, 20);
    }, 200);

    stopSort();
  };
  

  useEffect(() => {
    if (isSorting && !isPaused) {
      performSortStep();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && visibilityStateRef.current === 'hidden') {
        if (isSorting && !isPaused) {
          performSortStep();
        }
      }
      visibilityStateRef.current = document.visibilityState;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (sortTimeoutRef.current) {
        clearTimeout(sortTimeoutRef.current);
      }
    };
  }, [isSorting, isPaused, currentIndex, searchSpeed, localArray, onColorUpdate]);

  let verdict = null;
  if (!isSorting && !isCompleted) {
    verdict = <div>Waiting to start</div>;
  } else if (isSorting && !isPaused && !isCompleted) {
    verdict = <div>Sorting at step {currentIndex + 1}</div>;
  } else if (isPaused) {
    verdict = <div>Paused at step {currentIndex + 1}</div>;
  } else if (isCompleted) {
    verdict = <div>Sorting completed</div>;
  } else {
    verdict = <div>No sorting initiated</div>;
  }

  return (
    <div>
      {/* <ControlButtons
        onStart={startSort}
        onStop={stopSort}
        onPause={pauseSort}
        onContinue={continueSort}
        onRestart={startSort}
        onReset={stopSort}
        isSearching={isSorting}
        isPaused={isPaused}
        isCompleted={isCompleted}
        username={username}
        topicName={topicName}
        item={item}
        arrayElements={localArray}
      />

      <SpeedControl
        searchSpeedMultiplier={searchSpeedMultiplier}
        handleSpeedChange={handleSpeedChange}
      />

      {verdict && <div>{verdict}</div>}

      <div>{arrayElements}</div>
          <div>{pair.index}</div>
          <div>{pair.value}</div>
          <button 
            onClick={() => {
              arrayUpdate(1, 51);
              setPair({ index: 1, value: 51 });
            }}>
              Update Val
      </button> */}

      {/* <simpleBubbleSort>

      </simpleBubbleSort> */}

    </div>
  );
};

export default BubbleSortController;
