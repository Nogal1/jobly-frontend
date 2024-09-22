import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import CompanyList from "./components/CompanyList";
import CompanyDetail from "./components/CompanyDetail";
import JobList from "./components/JobList";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProfileForm from "./components/ProfileForm";
import { jwtDecode } from "jwt-decode";
import JoblyApi from "./api";
import UserContext from "./UserContext";
import useLocalStorage from "./hooks/useLocalStorage"; // Custom hook for localStorage management

/** App component that handles routing, authentication, and navigation */
function App() {
  const [token, setToken] = useLocalStorage("jobly-token"); // Store token in localStorage
  const [currentUser, setCurrentUser] = useState(null);

  // Handle login
  async function login(loginData) {
    try {
      const token = await JoblyApi.login(loginData);
      setToken(token); // Save token in localStorage
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  // Handle signup
  async function signup(signupData) {
    try {
      const token = await JoblyApi.signup(signupData);
      setToken(token); // Save token in localStorage
    } catch (err) {
      console.error("Signup failed", err);
    }
  }

  // Handle logout
  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  // Effect to load user info based on token change
  useEffect(() => {
    async function getUser() {
      if (token) {
        try {
          const { username } = jwtDecode(token);
          JoblyApi.token = token; // Store token in JoblyAPI class
          const user = await JoblyApi.getCurrentUser(username); // Fetch user info from API
          setCurrentUser(user); // Ensure currentUser contains applications array
        } catch (err) {
          console.error("Failed to load user", err);
        }
      } else {
        setCurrentUser(null);
      }
    }
    getUser();
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <NavBar logout={logout} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/companies" element={currentUser ? <CompanyList /> : <Navigate to="/login" />} />
            <Route path="/companies/:handle" element={currentUser ? <CompanyDetail /> : <Navigate to="/login" />} />
            <Route path="/jobs" element={currentUser ? <JobList /> : <Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
            <Route path="/profile" element={currentUser ? <ProfileForm /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to Homepage */}
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
