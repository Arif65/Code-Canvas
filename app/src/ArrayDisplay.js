import React from 'react';

const ArrayDisplay = ({ arrayElements }) => {
  return (
    <>
      {arrayElements.length > 0 && (
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
          <h3 style={{ marginRight: '10px' }}>Array Elements:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', alignItems: 'center' }}>
            {arrayElements.map((element, index) => (
              <span
                key={index}
                style={{
                  border: '1px solid #ccc',
                  padding: '1px',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9',
                  display: 'inline-block',
                  minWidth: '21px',
                  textAlign: 'center',
                  fontSize: '12px', 
                  lineHeight: '1',
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
