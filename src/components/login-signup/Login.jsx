import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext.js"; // Import your Auth context
import "./App.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null); // To store error messages
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from the Auth context

  async function handleSubmit(e) {
    e.preventDefault();

    // Create the login payload
    const loginData = { email, password: pass };

    try {
      // Use the login function from AuthContext
      await login(email, pass);

      // Successful login - redirect to a protected route
      navigate("/dashboard");
    } catch (error) {
      // Handle error response
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Error during login:", error);
    }
  }

  return (
    <div className="formContainer">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>} {/* Display errors if any */}
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
        onClick={() => props.onFormSwitch("register")}
      >
        Do not have an Account? Sign up here
      </button>
    </div>
  );
}

export default Login;
