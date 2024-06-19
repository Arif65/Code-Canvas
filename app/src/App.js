import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Mainlist from "./Mainlist";

function App() {
  const [view, setView] = useState("main"); // 'main', 'login', 'signup', 'guest'
  const [isGuest, setIsGuest] = useState(false); // Track if user is guest
  const [username, setUsername] = useState(""); // Store the username

  const renderView = () => {
    if (view === "main") {
      return (
        <div>
          <h1>Code-Canvas</h1>
          <button onClick={() => setView("login")}>Login</button>
          <button onClick={() => setView("signup")}>Signup</button>
          <button
            onClick={() => {
              setIsGuest(true);
              setView("mainlist");
            }}
          >
            Guest Login
          </button>
        </div>
      );
    }
    if (view === "login") {
      return (
        <Login
          onBackClick={() => setView("main")}
          onLoginSuccess={(username) => {
            setIsGuest(false);
            setUsername(username);
            setView("mainlist");
          }}
        />
      );
    }
    if (view === "signup") {
      return (
        <Signup
          onBackClick={() => setView("main")}
          onSignupSuccess={(username) => {
            setIsGuest(false);
            setUsername(username);
            setView("mainlist");
          }}
        />
      );
    }
    if (view === "mainlist") {
      return (
        <Mainlist
          isGuest={isGuest}
          username={username}
          onBackClick={() => setView("main")}
        />
      );
    }
  };

  return <div className="App">{renderView()}</div>;
}

export default App;
