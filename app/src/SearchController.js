import React, { useState, useEffect, useRef } from 'react';

const SearchController = ({ arrayElements, onColorUpdate, resetChartColors }) => {
  const [searchElement, setSearchElement] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchSpeedMultiplier, setSearchSpeedMultiplier] = useState(1); // Default is 1x (500ms)
  const searchTimeoutRef = useRef(null);

  const handleSearchElementChange = (e) => {
    setSearchElement(e.target.value);
  };

  const startSearch = () => {
    setCurrentIndex(0);
    setIsSearching(true);
    resetChartColors(); // Reset chart colors when search starts
  };

  const stopSearch = () => {
    setIsSearching(false);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  const handleSpeedChange = (e) => {
    setSearchSpeedMultiplier(Number(e.target.value));
  };

  const searchSpeed = 500 / searchSpeedMultiplier; // Calculate the search speed in ms

  useEffect(() => {
    let timeoutId;
  
    if (isSearching) {
      if (currentIndex < arrayElements.length) {
        timeoutId = setTimeout(() => {
          onColorUpdate(currentIndex, 'blue');
          if (arrayElements[currentIndex] === parseInt(searchElement, 10)) {
            setTimeout(() => {
              onColorUpdate(currentIndex, 'green');
            }, searchSpeed / 2);
            alert(`Element found at index ${currentIndex + 1}`);
            stopSearch();
          } else {
            setTimeout(() => {
              onColorUpdate(currentIndex, 'red');
            }, searchSpeed / 2); 
            setCurrentIndex(currentIndex + 1);
          }
        }, searchSpeed);
      } else {
        // Search completed, element not found
        alert('Element not found');
        stopSearch();
      }
    }
  
    return () => clearTimeout(timeoutId); 
  }, [isSearching, currentIndex, searchSpeed, arrayElements, searchElement, onColorUpdate]);

  return (
    <div>
      <input
        type="number"
        value={searchElement}
        onChange={handleSearchElementChange}
        placeholder="Element to search"
      />
      <button onClick={startSearch} disabled={isSearching}>Start Search</button>
      <button onClick={stopSearch} disabled={!isSearching}>Stop Search</button>
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
    </div>
  );
};

export default SearchController;
