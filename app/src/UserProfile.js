import React from 'react';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  const { username } = location.state || { username: '' };

  return (
    <div>
      <h2>User Profile: {username}</h2>
      {/* Add more details or functionality as needed */}
    </div>
  );
};

export default UserProfile;
