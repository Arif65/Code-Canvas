import React from 'react';
import { useNavigate } from 'react-router-dom';

const DisplayHeader = ({ username, topicName, item }) => {
  const navigate = useNavigate();

  const handleUserProfileClick = () => {
    navigate(`/user-profile/${username}`); // Navigate to user profile page with username in the URL
  };

  const handleLogoutClick = () => {
    navigate('/'); // Navigate to the login page
  };

  const handleLoginClick = () => {
    navigate('/'); // Navigate to the login page
  };

  const handleMainlistClick = () => {
    navigate('/mainlist', { state: { username } }); // Navigate to the algo list page with username in state
  };

  return (
    <div className='w-full  mx-auto p-4 bg-white rounded-lg shadow-md mb-2'>
      <div className='flex justify-between items-center'>
        {/* Left */}
        <div className='text-lg font-bold text-blue-600'>
          Code Canvas
        </div>
        
        {/* Middle */}
        <div text-md className='text-gray-700'>
          {item}
        </div>
        
        {/* Right */}
        {username !== 'Guest' && (
          <div className='flex items-center space-x-4'>
            <button
              className='text-md text-gray-600 hover:text-blue-500 cursor-pointer underline py-1 px-2 border border-transparent rounded-md hover:border-blue-500'
              onClick={handleUserProfileClick}
            >
              {username}
            </button>

            <button
              className='bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md py-2 px-4'
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </div>
        )}

        {username === 'Guest' && (
          <div className='flex items-center space-x-4'>
            <div className='text-md text-gray-600'>
              Guest
            </div>
            <button
              className='bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4'
              onClick={handleLoginClick}
            >
              Login
            </button>
          </div>
        )}
      </div>
      
      {item !== 'Algorithms and Techniques' && (
        <button 
        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4'
          onClick={handleMainlistClick}
        >
          Back to Mainlist
        </button>
      )}
    </div>
  );
};

export default DisplayHeader;
