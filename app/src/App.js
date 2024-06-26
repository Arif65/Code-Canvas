import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Mainlist from "./Mainlist";
import LinearSearch from "./LinearSearch";
import BinarySearch from "./BinarySearch";
import SimpleBubbleSort from './simpleBubbleSort';
import InsertionSort from "./insertionSort";
import SelectionSort from "./selectionSort";
import MergeSort from "./mergeSort";
import QuickSort from "./quickSort";
import HeapSort from "./heapSort";
import RadixSort from "./radixSort";

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
        <Route path="/binary-search" element={<BinarySearch />} />
        <Route path="/bubble-sort" element={<SimpleBubbleSort />} />
        <Route path="/insertion-sort" element={<InsertionSort />} />
        <Route path="/selection-sort" element={<SelectionSort />} />
        <Route path="/merge-sort" element={<MergeSort />} />
        <Route path="/quick-sort" element={<QuickSort />} />
        <Route path="/heap-sort" element={<HeapSort />} />
        <Route path="/radix-sort" element={<RadixSort />} />

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
        <Login onLoginSuccess={handleLoginSuccess} view={view} />
      ) : (
        <Signup onSignupSuccess={handleSignupSuccess} />
      )}
      <div className="flex items-center justify-center mt-5">
        <div>
        <div>
          <button onClick={() => onViewChange(view === "login" ? "signup" : "login")} className="mt-6 text-blue-500 text-center hover:underline">
            {view === "login" ? "Don't have an account? Signup Now!" : "Already have an account? Login Now!"}
          </button>
        </div>
        <button onClick={handleGuestLogin} type="submit" class="bg-blue-300 hover:bg-blue-400 text-blue-950 font-medium rounded-md py-2 px-4 w-full mt-4">Guest Login</button>
        </div>
      </div>
    </div>
  );
};

export default App;
