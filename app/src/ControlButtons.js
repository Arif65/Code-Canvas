import React from 'react';
import SaveButton from './SaveButton';

const ControlButtons = ({
  onStart,
  onStop,
  onPause,
  onContinue,
  onRestart,
  onReset,
  isSearching,
  isPaused,
  isCompleted, // Include isCompleted in props destructuring
  searchElement,
  username,
  topicName, // Include topicName in props destructuring
  item, // Include item in props destructuring
  arrayElements, // Include arrayElements in props destructuring
}) => {
  return (
    <>
      {!isSearching && !isPaused && searchElement !== '' && (
        <button onClick={onStart} disabled={isSearching}>
          Start
        </button>
      )}
      {isSearching && (
        <>
          <button onClick={onPause}>Pause</button>
          <button onClick={onRestart}>Restart</button>
          <button onClick={onStop}>Stop</button>
        </>
      )}
      {isPaused && (
        <>
          <button onClick={onContinue}>Continue</button>
          <button onClick={onRestart}>Restart</button>
          <button onClick={onStop}>Stop</button>
        </>
      )}
      {isCompleted && (
        <>
          <button onClick={onReset}>Reset</button>
          {username !== 'Guest' && (
            <SaveButton
              username={username}
              topicName={topicName} // Pass topicName to SaveButton
              item={item} // Pass item to SaveButton
              arrayElements={arrayElements} // Pass arrayElements to SaveButton
            />
          )}
        </>
      )}
    </>
  );
};

export default ControlButtons;
