import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import profile from "../../assets/profileimage.svg";
import icon from "../../assets/icon.svg";
import { useAuth } from "../../Context/AuthContext"; // Import your Auth context

const UserInfo = () => {
  const { token } = useAuth(); // Get the token from Auth context
  const [userInfo, setUserInfo] = useState(null); // To store user info
  const [error, setError] = useState(null); // To store error messages

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) {
        console.warn("No token found. Exiting fetchUserInfo."); // Debugging line
        return; // Return if no token
      }

      try {
        // Decode the token to extract user ID
        const userId = token.split(".")[1]; // Get the payload part of the JWT
        const decodedPayload = JSON.parse(atob(userId)); // Decode the base64 payload
        console.log("Decoded payload:", decodedPayload); // Debugging line
        const user_id = decodedPayload._id; // Extract the user ID

        // Fetch user information from API
        const response = await axios.get(
          `http://localhost:5000/api/users/displayUserInfo/${user_id}`, // Make the request to your API
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send the token in the header
            },
          }
        );

        console.log("User info response:", response.data); // Debugging line
        setUserInfo(response.data.user); // Store user info in state
      } catch (error) {
        console.error("Error fetching user info:", error); // Debugging line
        if (error.response) {
          console.error("Error response data:", error.response.data); // Log error response data
          setError(
            error.response?.data?.message || "Failed to fetch user info"
          );
        } else {
          setError("An unknown error occurred."); // Handle unknown errors
        }
      }
    };

    fetchUserInfo();
  }, [token]); // Run when the token changes

  return (
    <div id="info">
      <img src={profile} alt="profile" />
      {error && <p className="error">{error}</p>}
      {userInfo && (
        <div>
          <p id="name" style={{ color: "black" }}>
            {userInfo.name}
          </p>
          <p id="location">{userInfo.email}</p>
        </div>
      )}
      <img src={icon} alt="notification" id="notf" />
    </div>
  );
};

export default UserInfo;
