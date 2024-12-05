import React, { useState, useEffect } from "react";
import "./Profile.css"; // Create this file to style the profile page
import { useNavigate } from "react-router-dom";
import profileImage from "../assests/profile.svg"; // Placeholder for profile picture

const Profile = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "Piyush chauhan",
    email: "piyush@example.com",
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

  const handleOptionClick = (option) => {
    alert(`${option} is under development.`);
  };

  return (
    <div className="ProfilePage">
    <header className="header">
    <h1>NutriTrack</h1>
    <nav className="nav">
      <a href="#home">Home</a>
      <a href="#profile" onClick={()=>navigate("/Profile")}>Profile</a>
      <a href="#contact">Contact us</a>
    </nav>
  </header>
    <div className="profile-container">
      {/* New Container */}
      <div className="profile-options-container">
        <ul className="profile-options">
          <li className="profile-list" onClick={() => handleOptionClick("Profile Settings")}>
            <i>👤</i> Profile Settings
          </li>
          <li className="profile-list" onClick={() => handleOptionClick("Health Information")}>
            <i>🛡️</i> Health Information
          </li>
          <li className="profile-list" onClick={() => handleOptionClick("History")}>
            <i>📜</i> History
          </li>
          <li className="profile-list" onClick={() => handleOptionClick("Settings")}>
            <i>⚙️</i> Settings
          </li>
          <li className="profile-list" onClick={() => handleOptionClick("Privacy Policy")}>
            <i>🔒</i> Privacy Policy
          </li>
          <li className="profile-list" onClick={() => handleOptionClick("Terms & Conditions")}>
            <i>📄</i> Terms & Conditions
          </li>
          <li className="profile-list" onClick={() => handleOptionClick("FAQs")}>
            <i>❓</i> FAQs
          </li>
          <li className="profile-list" onClick={() => navigate("/")}>
            <i>🔓</i> Log out
          </li>
        </ul>
      </div>

      <div className="section2">
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

    </div>
    </div>
  );
};

export default Profile;
