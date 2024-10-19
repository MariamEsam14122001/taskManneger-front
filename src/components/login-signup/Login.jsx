import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext.js";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(email, pass);
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Error during login:", error);
    }
  }

  return (
    <div className="formContainer">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form className="loginForm" onSubmit={handleSubmit}>
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
        <button type="submit">Log In</button>
      </form>
      <button
        className="linkBtn"
      >
        <Link to="/register">
        Do not have an Account? Sign up here
        </Link>
      </button>
    </div>
  );
}

export default Login;
