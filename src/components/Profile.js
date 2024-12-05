import React, { useState, useEffect } from "react";
import "./Profile.css"; // Create this file to style the profile page
import { useNavigate } from "react-router-dom";
import profileImage from "../assests/profile.svg"; // Placeholder for profile picture

const Profile = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    age: 25,
    weight: "70 kg",
    height: "170 cm",
  });

  // Mock user details retrieval, replace with actual API call if needed
  useEffect(() => {
    // Fetch user details from server or localStorage
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("https://e-mail-auth.onrender.com/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserDetails(data);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditProfile = () => {
    navigate("/EditProfile"); // Navigate to edit profile page
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">My Profile</h1>
        <button onClick={handleEditProfile} className="edit-profile-btn">
          Edit Profile
        </button>
      </div>
      <div className="profile-content">
        <img className="profile-image" src={profileImage} alt="Profile" />
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {userDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Age:</strong> {userDetails.age}
          </p>
          <p>
            <strong>Weight:</strong> {userDetails.weight}
          </p>
          <p>
            <strong>Height:</strong> {userDetails.height}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
