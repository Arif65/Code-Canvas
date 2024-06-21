import React, { useState } from "react";

function Signup({ onSignupSuccess }) {
  const [username, setUsername] = useState("arif_S");

  const handleSubmit = (event) => {
    event.preventDefault();
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
    </div>
  );
}

export default Signup;
