import React, { useState } from "react";

function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({ ...f, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    login(formData);
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

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
