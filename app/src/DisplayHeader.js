import React from 'react';
import { useNavigate } from 'react-router-dom';

const DisplayHeader = ({ text, username, onBackClick }) => {
  const navigate = useNavigate();

  const handleUserProfileClick = () => {
    navigate('/user-profile', { state: { username } }); // Navigate to user profile page with username state
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>{text}</div> {/* Display the text prop */}
      <button
        style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline', border: 'none', background: 'none' }}
        onClick={handleUserProfileClick}
      >
        {username}
      </button>
      <button onClick={onBackClick}>Back to Main</button>
    </div>
  );
};

export default DisplayHeader;
