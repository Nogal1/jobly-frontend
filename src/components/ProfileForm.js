import React, { useState, useContext } from "react";
import UserContext from "../UserContext"; // Access current user information
import JoblyApi from "../api"; // Use JoblyAPI for making API requests

/** ProfileForm component for editing user profile */
function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext); // Get current user info and setter
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: "", // Password field for authentication purposes
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  /** Handle form field change */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value
    }));
  }

  /** Handle form submission */
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const updatedUser = await JoblyApi.updateProfile(currentUser.username, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password, // Password is required for updating the profile
      });

      setCurrentUser(updatedUser); // Update the user state globally
      setSaveSuccess(true); // Show success message
      setFormErrors([]); // Clear any form errors

    } catch (err) {
      setFormErrors(err); // Set any API-related errors
      setSaveSuccess(false);
    }
  }

  return (
    <div className="ProfileForm">
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            disabled // Username should not be editable
            id="username"
          />
        </div>

        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            id="firstName"
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            id="lastName"
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            id="email"
          />
        </div>

        <div>
          <label htmlFor="password">Confirm Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            id="password"
            required // Password is required to update the profile
          />
        </div>

        {formErrors.length ? <p>{formErrors.join(", ")}</p> : null}
        {saveSuccess ? <p>Profile updated successfully!</p> : null}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileForm;
