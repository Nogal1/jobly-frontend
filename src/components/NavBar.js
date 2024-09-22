import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../UserContext";
import styles from "./NavBar.module.css"; // Import custom CSS module

/** NavBar: Navigation bar component */
function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light ${styles.NavBar}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">Jobly</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {currentUser ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/companies">Companies</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">{currentUser.username}</NavLink>
                </li>
                <li className="nav-item">
                  <button className={`btn btn-secondary ${styles.LogoutBtn}`} onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
