import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../UserContext"; // Import UserContext to access current user

/** Navigation bar component */
function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext); // Access currentUser from UserContext

  function handleLogout() {
    logout();
  }

  return (
    <nav className="NavBar">
      <Link to="/" className="nav-brand">
        Jobly
      </Link>
      <ul>
        {currentUser ? (
          <>
            <li>
              <NavLink to="/companies">Companies</NavLink>
            </li>
            <li>
              <NavLink to="/jobs">Jobs</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <span>Welcome, {currentUser.username}!</span>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;

