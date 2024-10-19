import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";
function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Create the registration payload
    const registerData = { name, email, password: pass };

    try {
      // Send a POST request to the registration API using axios
      const response = await axios.post(
        "http://localhost:5000/api/users/signup ",
        registerData
      );

      if (response.status === 200) {
        console.log("Registration successful:", response.data);
        navigate("/login");
      }
    } catch (error) {
      // Handle error response
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
      {error && <p className="error">{error}</p>} {/* Display errors if any */}
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
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
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
      <button onClick={() => props.onFormSwitch("login")}>
        Already have an account? Log in here
      </button>
    </div>
  );
}

export default Register;
