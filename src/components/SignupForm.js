import React, { useState } from "react";

function SignupForm({ signup }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({ ...f, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    signup(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        id="username"
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        id="password"
      />

      {/* Other form fields */}
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        id="firstName"
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        id="lastName"
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        id="email"
      />

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;

