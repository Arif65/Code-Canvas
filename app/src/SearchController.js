import React, { useState, useEffect, useRef } from 'react';

const SearchController = ({ username, topicName, arrayElements, onColorUpdate, resetChartColors }) => {
  const [searchElement, setSearchElement] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // To handle pause/resume state
  const [isCompleted, setIsCompleted] = useState(false);
  const [searchSpeedMultiplier, setSearchSpeedMultiplier] = useState(1); // Default is 1x (500ms)
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
    resetChartColors(); // Reset chart colors when search starts
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

  const saveIt = () => {
    const currentTime = new Date().toLocaleString();
    const alertMessage = `
      Username: ${username}
      Topic Name: ${topicName}
      Array Elements: ${JSON.stringify(arrayElements)}
      Verdict: ${verdict}
      Current Time: ${currentTime}
    `;
    alert(alertMessage);
  };

  const handleSpeedChange = (e) => {
    setSearchSpeedMultiplier(Number(e.target.value));
  };

  const searchSpeed = 500 / searchSpeedMultiplier; // Calculate the search speed in ms

  const performSearchStep = () => {
    if (document.visibilityState === 'hidden') {
      return; // Skip execution when the tab is not visible
    }

    if (currentIndex < arrayElements.length) {
      searchTimeoutRef.current = setTimeout(() => {
        onColorUpdate(currentIndex, 'blue');
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
        // Tab has become visible
        if (isSearching && !isPaused) {
          performSearchStep(); // Continue the search when the tab becomes visible
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
      {!isSearching && !isPaused && searchElement !== '' && (
        <button onClick={startSearch} disabled={isSearching}>
          Start Search
        </button>
      )}
      {isSearching && (
        <>
          <button onClick={pauseSearch}>Pause</button>
          <button onClick={startSearch}>Restart</button>
          <button onClick={stopSearch}>Stop</button>
        </>
      )}
      {isPaused && (
        <>
          <button onClick={continueSearch}>Continue</button>
          <button onClick={startSearch}>Restart</button>
          <button onClick={stopSearch}>Stop</button>
        </>
      )}
      {isCompleted && (
        <>
          <button onClick={stopSearch}>Reset</button>
          {username !== 'Guest' && <button onClick={saveIt}>Save</button>}
        </>
      )}

      <div>
        <label>Search Speed: </label>
        <input
          type="range"
          value={searchSpeedMultiplier}
          min="0.1"
          max="2"
          step="0.1"
          onChange={handleSpeedChange}
        />
        <span>{searchSpeedMultiplier.toFixed(1)}x</span>
      </div>

      {verdict && <div>{verdict}</div>}
    </div>
  );
};

export default SearchController;
