import React, { useState, useEffect } from "react";
import "./Profile.css"; // Styles for the profile page
import "./EditProfile.css"; // Styles for editing
import "./ProfileSettings.css";
import "./termsConditions.css"
import "./PrivacyPolicy.css"
import { useNavigate } from "react-router-dom";
import profileImage from "../assests/profile.svg"; // Placeholder for profile picture
import profile2 from "../assests/profile2.svg"
import emailicon from "../assests/email-Icon.svg"


const Profile = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: 'Piyush chauhan',
    email: "piyushchauhan200417@gmail.com",
    phone: "8882871921",
    age: 20,
    weight: "50 kg",
    height: "170 cm",
  });

  const [isEditing, setIsEditing] = useState(false); // State to toggle between viewing and editing
  const [selectedOption, setSelectedOption] = useState("MyProfile"); // State to track which section to display
  const [profileImg, setProfileImg] = useState(profileImage); // State to handle profile image

  // Mock user details retrieval, replace with actual API call if needed
  useEffect(() => {
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

  const handleSave = async () => {
    try {
      const response = await fetch("https://e-mail-auth.onrender.com/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false); // Exit edit mode
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result); // Set the selected image as the profile picture
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    // <div className="ProfilePage">
      <div>
        <header className="header head">
                <h1 id="heading">NutriTrack</h1>
                <nav className="nav">
                    <a href="#home" onClick={()=>navigate("/HomePage2")}>Home</a>
          <a href="#profile" onClick={() => setSelectedOption("MyProfile")}>
            Profile
          </a>
          <a href="#contact">Contact us</a>
                </nav>
            </header>
      <div className="profile-container">
        {/* Profile Options */}
        <div className="profile-options-container">
          <ul className="profile-options">
            <li
              className="profile-list"
              onClick={() => setSelectedOption("MyProfile")}
            >
              <i>👤</i> My Profile
            </li>
            <li
              className="profile-list"
              onClick={() => setSelectedOption("ProfileSettings")}
            >
              <i>👤</i> Profile Settings
            </li>
            <li
              className="profile-list"
              onClick={() => alert("Health Information is under development.")}
            >
              <i>🛡️</i> Health Information
            </li>
            <li
              className="profile-list"
              onClick={() => alert("History is under development.")}
            >
              <i>📜</i> History
            </li>
            <li
              className="profile-list"
              onClick={() => alert("Settings is under development.")}
            >
              <i>⚙️</i> Settings
            </li>
            <li
              className="profile-list"
              onClick={() => setSelectedOption("PrivacyAndPolicy")}
            >
              <i>🔒</i> Privacy Policy
            </li>
            <li
              className="profile-list"
              onClick={() => setSelectedOption("TermsAndConditions")}
            >
              <i>📄</i> Terms & Conditions
            </li>

            <li
              className="profile-list"
              onClick={() => alert("FAQs is under development.")}
            >
              <i>❓</i> FAQs
            </li>
            <li className="profile-list" onClick={() => navigate("/")}>
              <i>🔓</i> Log out
            </li>
          </ul>
        </div>

        {/* Dynamic Section Rendering */}
        {selectedOption === "ProfileSettings" ? (
          <div className="profile-settings">
            <div className="profile-photo-section">
              <img className="profile-photo" src={profileImg} alt="Profile" />
              <div className="profile-photo-buttons">
                <label className="btn-upload">
                  Select a file
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </label>
                <button
                  className="btn-remove"
                  onClick={() => setProfileImg(profileImage)} // Reset to placeholder image
                >
                  Remove photo
                </button>
              </div>
            </div>
            <div className="profile-info">
              <div>
                <p id="info-item">
                  <strong><img className="profile2" src={profile2} alt="Profile" /> Name:</strong> {userDetails.name}
                </p>
                <p id="info-item">
                  <strong>  <img className="email-icon" src={emailicon} alt="Profile" /> Email:</strong> {userDetails.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userDetails.phone}
                </p>
              </div>
              <div>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setSelectedOption("MyProfile"); // Switch to "MyProfile" where the edit form is rendered
                  }}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        ) : selectedOption === "MyProfile" ? (
          !isEditing ? (
            <div className="section2">
              <div className="profile-header">
                <h1 className="profile-title">My Profile</h1>
                <button onClick={() => setIsEditing(true)} className="edit-profile-btn">
                  Edit Profile
                </button>
              </div>
              <div className="profile-content">
                <img className="profile-image" src={profileImg} alt="Profile" />
                <div className="profile-details">
                  <p>
                    <strong>Name:</strong> {userDetails.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userDetails.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {userDetails.phone}
                  </p>
                  <p>
                    <strong>Age:</strong> {userDetails.age}
                  </p>
                  <p>
                    <strong>Weight:</strong> {userDetails.weight}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="edit-profile-section">
              <h1>Edit Your Profile</h1>
              <form className="edit-profile-form">
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={userDetails.name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Phone:
                  <input
                    type="phone"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Age:
                  <input
                    type="number"
                    name="age"
                    value={userDetails.age}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Weight:
                  <input
                    type="text"
                    name="weight"
                    value={userDetails.weight}
                    onChange={handleChange}
                  />
                </label>
                <div className="form-actions">
                  <button type="button" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )
        ) : null}
        {selectedOption === "TermsAndConditions" && (
          <div className="terms-and-conditions-section" >
            <h1>Terms & Conditions</h1>
            <h3> 1. Acceptance of Terms</h3>
            <p> History
              By downloading, accessing, or using the Hola app, you agree to these Terms and Conditions and our Privacy Policy. If you do not agree, do not use the app.
              Settings </p>
            <h3> 2. Eligibility</h3>
            <p> You must be at least 13 years old to use the app. By using the app, you confirm that you meet the age requirement and have the legal capacity to agree to these terms.
              Privacy policy
              Terms & conditions </p>
            <h3> 3. Account Registration</h3>
            <p> You are responsible for maintaining the confidentiality of your login credentials.
              You agree to provide accurate, complete, and updated information.
              Hola reserves the right to terminate accounts that provide false information or violate our policies
              FAQs </p>
            <h3> 5. Content Ownership</h3>
            <p>You retain ownership of the content you post.
              By posting, you grant Hola a worldwide, royalty-free license to use, display, and share your content within the app.</p>
            <h3> 6. Privacy and Data</h3>
            <p> Your use of the app is subject to our Privacy Policy. We are committed to protecting your personal information.
              Log out </p>
            <h3> 7. Termination</h3>
            <p> Hola may suspend or terminate your access to the app at any time without notice for violating these terms. </p>
            <h3> 8. Liability Disclaimer </h3>
            <p> Hola is provided on an "as-is" basis. We do not guarantee uninterrupted service or error-free functionality.</p>
            <h3> 9. Changes to Terms</h3>
            <p> Hola reserves the right to update these Terms at any time. Continued use of the app constitutes acceptance of the updated terms.</p>
            <p>Thank you for using NutriTrack. Stay healthy!</p>
          </div>
        )}
        {selectedOption === "PrivacyAndPolicy" && (
          <div className="privacy-and-policy-section" >
            <h1> Privacy & Policy </h1>
            <h3> 1. Information We Collect</h3>
            <p> We collect the following types of data:
              Personal Information: Name, email, phone number (provided during registration).
              Usage Data: Device information, app activity, and interactions.
              Content: Photos, videos, and messages you post or share. </p>
            <h3> 2. How We Use Your Information</h3>
            <p>We use your information to:
              Provide and improve app functionality.
              Personalize your experience.
              Monitor and prevent abuse.
              Communicate updates and promotional offers. </p>
            <h3> 3. Data Sharing</h3>
            <p> You are responsible for maintaining the confidentiality of your login credentials.
              You agree to provide accurate, complete, and updated information.
              Hola reserves the right to terminate accounts that provide false information or violate our policies
              FAQs </p>
            <h3> 4. Cookies and Tracking Technologies</h3>
            <p> We use cookies to enhance your experience. You can manage cookie settings in your browser. </p>
            <h3> 5. Data Security</h3>
            <p>We use industry-standard measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>
            <h3> 6. Your Rights</h3>
            <p> Depending on your location, you may have the right to:
Access, update, or delete your data.
Object to data processing. </p>
            <h3> 7. Children’s Privacy</h3>
            <p> Nutritrack does not knowingly collect data from users under 13. Accounts of underage users will be terminated upon discovery</p>
            <h3> 8. Policy Updates </h3>
            <p> We may update this Privacy Policy from time to time. Changes will be communicated through the app.</p>
            <h3> 9. Contact Us</h3>
            <p> For questions or concerns, contact us at:
Email: support@nutritrack.com
Address: 123 Innovation Street, Suite 456, Tech City, CA 94016, India</p>
            <p>Thank you for using NutriTrack. Stay healthy!</p>
          </div>
        )}

      </div>
 </div>
  );
};

export default Profile;
