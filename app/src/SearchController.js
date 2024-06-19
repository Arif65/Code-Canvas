import React, { useState, useEffect, useRef } from 'react';

const SearchController = ({ arrayElements, onSearchComplete, onCurrentIndexChange }) => {
  const [searchElement, setSearchElement] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchSpeed, setSearchSpeed] = useState(500); // Initial speed
  const searchTimeoutRef = useRef(null);

  const handleSearchElementChange = (e) => {
    setSearchElement(e.target.value);
  };

  const startSearch = () => {
    setCurrentIndex(-1);
    setIsSearching(true);
    setCurrentIndex(0);
    onCurrentIndexChange(0);
  };

  const stopSearch = () => {
    setIsSearching(false);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  const handleSpeedChange = (e) => {
    setSearchSpeed(Number(e.target.value));
  };

  useEffect(() => {
    if (isSearching && currentIndex < arrayElements.length) {
      searchTimeoutRef.current = setTimeout(() => {
        if (arrayElements[currentIndex] === parseInt(searchElement)) {
          alert(`Element found at index ${currentIndex}`);
          onSearchComplete(currentIndex);
          stopSearch();
        } else {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          onCurrentIndexChange(nextIndex);
        }
      }, searchSpeed);
    } else if (currentIndex >= arrayElements.length) {
      alert('Element not found');
      onSearchComplete(-1);
      stopSearch();
    }
  }, [isSearching, currentIndex, searchSpeed]); // Include searchSpeed in dependencies

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
        <label>Search Speed (ms): </label>
        <input
          type="range"
          value={searchSpeed}
          min="100"
          max="1000"
          step="100"
          onChange={handleSpeedChange}
        />
        <span>{searchSpeed} ms</span>
      </div>
    </div>
  );
};

export default SearchController;
