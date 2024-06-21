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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Code Canvas</div>
      <div>{item}</div> {/* Display topicName */}
      
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
      
      {item !== 'Algorithms and Techniques' && (
        <button onClick={handleMainlistClick}>
          Back to Mainlist
        </button>
      )}

    </div>
  );
};

export default DisplayHeader;
