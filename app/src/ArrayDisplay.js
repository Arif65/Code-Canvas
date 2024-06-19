import React from 'react';

const ArrayDisplay = ({ arrayElements }) => {
  return (
    <>
      {arrayElements.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Array Elements:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1px' }}>
            {arrayElements.map((element, index) => (
              <span
                key={index}
                style={{
                  border: '1px solid #ccc',
                  padding: '6px',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9',
                  display: 'inline-block',
                  minWidth: '1px',
                  textAlign: 'center',
                }}
              >
                {element}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ArrayDisplay;
