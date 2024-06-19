// src/Signup.js
import React, { useState } from 'react';

function Signup({ onBackClick, onSignupSuccess }) {
  const [username, setUsername] = useState('arif S');
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the actual login logic (e.g., form validation, API calls)
    // For now, we'll assume the login is successful
    onSignupSuccess(username);
  };
  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" />
        </div>
        <button type="submit">Signup</button>
      </form>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
}

export default Signup;
