import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import forgotpass from "../assests/forgotpass.svg";

const ResetPassword = () => {
  const navigate = useNavigate();
  const[loading,setLoading]=useState("false")
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handlePasswordReset = async(e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    try {
      const response = await fetch("https://e-mail-auth.onrender.com/user/resetPassword/:userId/:resetString", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        newPassword,
        confirmPassword,
        }),
      });
      // console.log(response.status)
      console.log(response)

       await response.json();
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  
    alert("Password reset successfully! Redirecting to login page.");
    navigate("/login");
  };

  return (
    <div>
      <nav className="head h2">
        <p id="heading">NutriTrack</p>
        <div className="btns">
          <button className="nav-btn" onClick={() => navigate("/Signup")}>
            Signup
          </button>
          <button className="nav-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </nav>
      <div className="cont">
        <img src={forgotpass} alt="Forgot Password" srcSet="" />
        <div className="forgot-password-container">
         
              <h2 className="forgot-title">Reset Password</h2>
              <form onSubmit={handlePasswordReset} className="forgot-form">
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  required
                />
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
                <button type="submit" className="forgot-btn">
                  Reset Password
                </button>
              </form>
          
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
