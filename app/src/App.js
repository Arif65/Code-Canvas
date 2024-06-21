import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Mainlist from "./Mainlist";
import LinearSearch from "./LinearSearch";
import UserProfile from "./UserProfile";

const App = () => {
  const [view, setView] = useState("login");

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginSignup view={view} onViewChange={handleViewChange} />} />
        <Route path="/mainlist" element={<Mainlist />} />
        <Route path="/linear" element={<LinearSearch />} />
        <Route path="/user-profile/:username" element={<UserProfile />} /> {/* Update route to include username */}
      </Routes>
    </div>
  );
};

const LoginSignup = ({ view, onViewChange }) => {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    navigate("/mainlist", { state: { isGuest: true, username: "Guest" } });
  };

  const handleLoginSuccess = (username) => {
    navigate("/mainlist", { state: { isGuest: false, username } });
  };

  const handleSignupSuccess = (username) => {
    navigate("/mainlist", { state: { isGuest: false, username } });
  };

  return (
    <div>
      {view === "login" ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Signup onSignupSuccess={handleSignupSuccess} />
      )}
      <div>
        <button onClick={() => onViewChange(view === "login" ? "signup" : "login")}>
          {view === "login" ? "Switch to Signup" : "Switch to Login"}
        </button>
        <button onClick={handleGuestLogin}>Guest Login</button>
      </div>
    </div>
  );
};

export default App;
