import React, { useState, useEffect, useRef } from 'react';
import SpeedControl from './SpeedControl'; // Import the SpeedControl component
import ControlButtons from './ControlButtons';

const LinearSearchController = ({
  username,
  topicName,
  item,
  arrayElements,
  setArrayElements,
  onColorUpdate,
  onValueUpdate, // Added the new prop
  resetChartColors,
}) => {

  const [searchElement, setSearchElement] = useState('');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [searchSpeedMultiplier, setSearchSpeedMultiplier] = useState(1);
  const searchTimeoutRef = useRef(null);
  const visibilityStateRef = useRef(document.visibilityState);

  const handleSearchElementChange = (e) => {
    setSearchElement(e.target.value);
  };

  const startSearch = () => {
    setIsCompleted(false);
    setCurrentIndex(0);
    setIsSearching(true);
    setIsPaused(false);
    resetChartColors();
  };

  const pauseSearch = () => {
    setIsPaused(true);
    setIsSearching(false);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  const continueSearch = () => {
    setIsPaused(false);
    setIsSearching(true);
  };

  const stopSearch = () => {
    setIsCompleted(false);
    setCurrentIndex(0);
    setIsSearching(false);
    setIsPaused(false);
    resetChartColors();
    setSearchElement('');
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  const searchCompleted = () => {
    setIsSearching(false);
    setIsPaused(false);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  const handleSpeedChange = (e) => {
    setSearchSpeedMultiplier(Number(e.target.value));
  };

  const searchSpeed = 500 / searchSpeedMultiplier;

  const performSearchStep = () => {
    if (document.visibilityState === 'hidden') {
      return; // Skip execution when the tab is not visible
    }

    if (currentIndex < arrayElements.length) {
      searchTimeoutRef.current = setTimeout(() => {
        onColorUpdate(currentIndex, 'blue');
        
        // ///
        // if(currentIndex % 5 == 0)
        //   onValueUpdate(currentIndex, arrayElements[currentIndex] * 10); // Update the value
        // ///

        if (arrayElements[currentIndex] === parseInt(searchElement, 10)) {
          setTimeout(() => {
            onColorUpdate(currentIndex, 'green');
          }, searchSpeed / 2);
          alert(`Element found at index ${currentIndex + 1}`);
          setIsCompleted(true);
          searchCompleted();
        } else {
          setTimeout(() => {
            onColorUpdate(currentIndex, 'red');
          }, searchSpeed / 2);
          setCurrentIndex(currentIndex + 1);
          if (isSearching && !isPaused) {
            performSearchStep(); // Recursively call the next step
          }
        }
      }, searchSpeed);
    } else {
      alert('Element not found');
      setIsCompleted(true);
      searchCompleted();
    }
  };

  useEffect(() => {
    if (isSearching && !isPaused) {
      performSearchStep();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && visibilityStateRef.current === 'hidden') {
        if (isSearching && !isPaused) {
          performSearchStep();
        }
      }
      visibilityStateRef.current = document.visibilityState;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [isSearching, isPaused, currentIndex, searchSpeed, arrayElements, searchElement, onColorUpdate]);

  let verdict = null;
  if (searchElement !== '') {
    if (!isSearching && !isCompleted) {
      verdict = <div>Waiting to start</div>;
    } else if (isSearching && !isPaused && !isCompleted) {
      verdict = <div>Searching at index {currentIndex + 1}</div>;
    } else if (isPaused) {
      verdict = <div>Paused at index {currentIndex + 1}</div>;
    } else if (isCompleted && currentIndex < arrayElements.length) {
      verdict = <div>Found at {currentIndex + 1}</div>;
    } else {
      verdict = <div>Not found</div>;
    }
  } else {
    verdict = <div>No element has been given to search</div>;
  }

  return (
    <div>
      <input
        type="number"
        value={searchElement}
        onChange={handleSearchElementChange}
        placeholder="Element to search"
      />

      <ControlButtons
        onStart={startSearch}
        onStop={stopSearch}
        onPause={pauseSearch}
        onContinue={continueSearch}
        onRestart={startSearch}
        onReset={stopSearch}
        isSearching={isSearching}
        isPaused={isPaused}
        isCompleted={isCompleted}
        searchElement={searchElement}
        username={username}
        topicName={topicName}
        item={item}
        arrayElements={arrayElements}
      />

      <SpeedControl
        searchSpeedMultiplier={searchSpeedMultiplier}
        handleSpeedChange={handleSpeedChange}
      />

      {verdict && <div>{verdict}</div>}
    </div>
  );
};

export default LinearSearchController;
