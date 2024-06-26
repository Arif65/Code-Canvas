import React from 'react';

const ArrayDisplaySort = ({ arrayElements, colors }) => {
    return (
      <div className='flex justify-center'>
        {arrayElements.length > 0 && (
          <div>
            <div className='mt-5 flex items-center'>
              <div className='mr-1.5 mb-1'>Array Elements:</div>
              <div className='flex flex-wrap gap-2 items-center'>
                {arrayElements.map((element, index) => (
                  <span
                    className='border border-gray-300 rounded-md p-1 inline-block min-w-21 text-center text-xs leading-4'
                    key={index}
                    style={{                      
                      // backgroundColor: colors[index] || '#f9f9f9',
                      backgroundColor: colors[index],
                    }}
                  >
                    {element}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default ArrayDisplaySort;
