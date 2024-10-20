import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  // Simple validation checks
  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Full name is required.";
    }
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid.";
    }
    if (!pass) {
      errors.password = "Password is required.";
    } else if (pass.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Run validation checks before submitting
    if (!validateForm()) return;

    const registerData = { name, email, password: pass };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        registerData
      );

      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        navigate("/");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      console.error("Error during registration:", error);
    }
  }

  return (
    <div className="formContainer">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Fullname</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Fullname"
          id="name"
          name="name"
        />
        {validationErrors.name && (
          <p className="error">{validationErrors.name}</p>
        )}

        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        {validationErrors.email && (
          <p className="error">{validationErrors.email}</p>
        )}

        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="*******"
          id="password"
          name="password"
        />
        <button type="submit">Register</button>
      </form>
      <button>
        <Link to="/">Already have an account? Log in here</Link>
      </button>
    </div>
  );
}

export default Register;
