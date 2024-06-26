import React from 'react';

const SpeedControl = ({ searchSpeedMultiplier, handleSpeedChange }) => {
  return (
    <div class="flex flex-col sm:flex-row items-center justify-center gap-2">
      <label class="text-gray-700 font-bold">Search Speed:</label>
      <input
        type="range"
        value={searchSpeedMultiplier}
        min="0.1"
        max="2"
        step="0.1"
        onChange={handleSpeedChange}
        class="w-full sm:w-auto"
      />
      <span class="text-gray-700 mt-4">{searchSpeedMultiplier.toFixed(1)}x</span>
    </div>
  );
};

export default SpeedControl;
