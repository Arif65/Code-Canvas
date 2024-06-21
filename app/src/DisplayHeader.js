import React from 'react';
import { useNavigate } from 'react-router-dom';

const DisplayHeader = ({ topicName, username, onBackClick }) => {
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
    navigate('/mainlist'); // Navigate to the algo list page
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Code Canvas</div>
      <div>{topicName}</div> {/* Display topicName */}
      
      {username !== 'Guest' && (
        <div>
          <button
            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline', border: 'none', background: 'none' }}
            onClick={handleUserProfileClick}
          >
            {username}
          </button>

          <button
            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline', border: 'none', background: 'none' }}
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
      )}

      {username === 'Guest' && (
        <div style={{display: 'flex'}}>
          <div>Guest</div>

          <button
            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline', border: 'none', background: 'none' }}
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
      )}

      {/* <button onClick={onBackClick}>Back to Main</button> */}
      
      {topicName != 'Algorithms and Techniques' && (<button onClick={handleMainlistClick}>
          Back to Mainlist
        </button>
      )}

    </div>
  );
};

export default DisplayHeader;
