import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  // Full name validation function
  const isValidFullName = (name) => {
    const nameParts = name.trim().split(" ");
    // Check if it has at least two parts (first and last name) and contains only letters and spaces
    return (
      nameParts.length >= 2 &&
      /^[a-zA-Z\s]+$/.test(name)
    );
  };

  const isValidPassword = (password) => {
    // Check for at least one uppercase letter, one lowercase letter, one special character, and at least 8 characters
    return (
      /[A-Z]/.test(password) && // at least one uppercase letter
      /[a-z]/.test(password) && // at least one lowercase letter
      /[!@#$%^&*(),.?":{}|<>]/.test(password) && // at least one special character
      password.length >= 8
    );
  };

  // Simple validation checks
  const validateForm = () => {
    const errors = {};

    // Full name validation
    if (!name.trim()) {
      errors.name = "Full name is required.";
    } else if (!isValidFullName(name)) {
      errors.name = "Full name must include first and last name and contain only letters.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid.";
    }

    if (!pass) {
      errors.password = "Password is required.";
    } else if (!isValidPassword(pass)) {
      errors.password = "Password must be at least 8 characters, an uppercase letter, a lowercase letter, and a special character.";
    }

    // Confirm password validation
    if (confirmPass !== pass) {
      errors.confirmPassword = "Passwords do not match.";
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
        {validationErrors.password && (
          <p className="error">{validationErrors.password}</p>
        )}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          type="password"
          placeholder="*******"
          id="confirmPassword"
          name="confirmPassword"
        />
        {validationErrors.confirmPassword && (
          <p className="error">{validationErrors.confirmPassword}</p>
        )}

        <button type="submit" className="submit">Register</button>
      <button className="linkBtn">
        <Link to="/" >Already have an account? Log in here</Link>
      </button>
        
      </form>

      
    </div>
  );
}

export default Register;
