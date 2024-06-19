import React, { useState } from 'react';

function Login({ onBackClick, onLoginSuccess }) {
  const [username, setUsername] = useState('arif L');
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the actual signup logic (e.g., form validation, API calls)
    // For now, we'll assume the signup is successful
    onLoginSuccess(username);
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
}

export default Login;
