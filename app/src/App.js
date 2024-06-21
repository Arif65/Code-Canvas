import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Mainlist from "./Mainlist";
import LinearSearch from "./LinearSearch";
import UserProfile from "./UserProfile";

const App = () => {
  const [view, setView] = useState("login");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Whenever location changes (route changes), set view to 'login'
    setView("login");
  }, [location]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginSignup view={view} onViewChange={handleViewChange} />} />
        <Route path="/mainlist" element={<Mainlist />} />
        <Route path="/linear-search" element={<LinearSearch />} />
        <Route path="/user-profile/:username" element={<UserProfile />} />
      </Routes>
    </div>
  );
};

const LoginSignup = ({ view, onViewChange }) => {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    navigate("/mainlist", { state: { username: "Guest" } });
  };

  const handleLoginSuccess = (username) => {
    navigate("/mainlist", { state: { username } });
  };

  const handleSignupSuccess = (username) => {
    navigate("/mainlist", { state: { username } });
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
          {view === "login" ? "Don't have an account? Signup Now!" : "Already have an account? Login Now!"}
        </button>
        <button onClick={handleGuestLogin}>Guest Login</button>
      </div>
    </div>
  );
};

export default App;
