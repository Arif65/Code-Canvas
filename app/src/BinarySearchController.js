import React, { useState, useEffect, useRef } from 'react';
import SpeedControl from './SpeedControl'; // Import the SpeedControl component
import ControlButtons from './ControlButtons';

const BinarySearchController = ({ username, topicName, item, arrayElements, onColorUpdate, resetChartColors }) => {
  
  const [searchElement, setSearchElement] = useState('');
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(arrayElements.length - 1);
  const [mid, setMid] = useState(null);
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
    setLow(0);
    setHigh(arrayElements.length - 1);
    setMid(null);
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
    setLow(0);
    setHigh(arrayElements.length - 1);
    setMid(null);
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

  // const saveIt = () => {
  //   const currentTime = new Date().toLocaleString();
  //   const alertMessage = `
  //     Username: ${username}
  //     Topic Name: ${topicName}
  //     Item Name: ${item}
  //     Array Elements: ${JSON.stringify(arrayElements)}
  //     Verdict: ${verdict}
  //     Current Time: ${currentTime}
  //   `;
  //   alert(alertMessage);
  // };

  const handleSpeedChange = (e) => {
    setSearchSpeedMultiplier(Number(e.target.value));
  };

  const searchSpeed = 500 / searchSpeedMultiplier;

  const performSearchStep = () => {
    if (document.visibilityState === 'hidden') {
      return; // Skip execution when the tab is not visible
    }
  
    if (low <= high) {
      const currentMid = Math.floor((low + high) / 2);
      setMid(currentMid); // Update mid immediately before the timeout
  
      searchTimeoutRef.current = setTimeout(() => {
        onColorUpdate(currentMid, 'blue');
  
        if (arrayElements[currentMid] === parseInt(searchElement, 10)) {
          setTimeout(() => {
            onColorUpdate(currentMid, 'green');
          }, searchSpeed / 2);
          alert(`Element found at index ${currentMid + 1}`);
          setIsCompleted(true);
          searchCompleted();
        } else {
          setTimeout(() => {
            onColorUpdate(currentMid, 'red');
          }, searchSpeed / 2);
  
          if (arrayElements[currentMid] < parseInt(searchElement, 10)) {
            setLow(currentMid + 1);
          } else {
            setHigh(currentMid - 1);
          }
  
          if (isSearching && !isPaused) {
            performSearchStep(); // Recursively call the next step
          }
        }
      }, searchSpeed);
    } else {
      // This block executes immediately after performSearchStep is called
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
  }, [isSearching, isPaused, low, high, mid, searchSpeed, arrayElements, searchElement, onColorUpdate]);

  let verdict = null;
  if (searchElement !== '') {
    if (!isSearching && !isCompleted) {
      verdict = <div>Waiting to start</div>;
    } else if (isSearching && !isPaused && !isCompleted) {
      verdict = <div>Searching...</div>;
    } else if (isPaused) {
      verdict = <div>Paused</div>;
    } else if (isCompleted && mid !== null) {
      verdict = <div>Found at index {mid + 1}</div>;
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
        onReset={stopSearch} // stop
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

export default BinarySearchController;
