import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import forgotpass from "../assests/forgotpass.svg";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    // Replace this with actual OTP verification logic
    if (otp === otp) { // Example: Hardcoded OTP for demonstration
      alert("OTP verified successfully! Please reset your password.");
      setIsOtpVerified(true);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Backend password reset logic goes here
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
          {!isOtpVerified ? (
            <>
              <h2 className="forgot-title">Enter OTP</h2>
              <p className="forgot-description">
                Please enter the OTP <br />{" "}
                <address>sent to your registered email address.</address>
              </p>
              <form onSubmit={handleOtpSubmit} className="forgot-form">
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
                <button type="submit" className="forgot-btn" >
                  Verify OTP
                </button>
              </form>
              <p className="back-to-login">
                Remembered your password?{" "}
                <a href="/login">Back to Login</a>
              </p>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
