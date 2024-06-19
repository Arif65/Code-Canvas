import React, { useState } from 'react';

const DisplayHeader = ({ username, onBackClick }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Code Canvas</div>
      <div>Linear Search</div>
      <div style={{ color: 'blue', cursor: 'pointer' }}>
        {username}
      </div>
      <button onClick={onBackClick}>Back to Main</button>
    </div>
  );
};

export default DisplayHeader;
