import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    // Retrieve token from sessionStorage on initial load
    return sessionStorage.getItem("authToken") || null;
  });

  // Function to log in and get the token
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      const { token } = response.data;
      setToken(token);
      sessionStorage.setItem("authToken", token); // Save token to sessionStorage
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // On logout, clear token from both state and sessionStorage
  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("authToken");
  };

  // Optional: Sync state with sessionStorage when the component mounts
  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const value = {
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
