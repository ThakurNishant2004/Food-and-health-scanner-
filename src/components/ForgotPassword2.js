import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import forgotpass from "../assests/forgotpass.svg"

const ForgotPassword2 = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (otp === otp) {      // Replace with backend verification logic
      alert("OTP verified successfully! You can now reset your password.");
      navigate("/ResetPassword");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div>
      <nav className="head h2">
        <p id="heading">NutriTrack</p>
        <div className="btns">
          <button className="nav-btn" onClick={() => navigate("/Signup")}>Signup</button>
          <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
        </div>
      </nav>
      <div className="cont">
        <img src={forgotpass} alt="Forgot Password" srcSet="" />
        <div className="forgot-password-container">
          <h2 className="forgot-title">Enter OTP</h2>
          <p className="forgot-description">
            Please enter the OTP <br /> <address>sent to your registered email address.</address>
          </p>
          <form onSubmit={handleSubmit} className="forgot-form">
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
            <button type="submit" className="forgot-btn" onClick={()=>navigate("/ResetPassword")}>
              Verify OTP
            </button>
          </form>
          <p className="back-to-login">
            Remembered your password?{" "}
            <a href="/login" onClick={()=>navigate("/login")}>
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword2;
