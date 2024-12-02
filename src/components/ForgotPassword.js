import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import forgotpass from "../assests/forgotpass.svg"

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset email sent to:", email);
    alert(`A password reset link has been sent to ${email}`);
    navigate("/ForgotPassword2"); // Redirect back to login page
  };

  return (
    <div>
    <nav className="head h2">
    <p id="heading">NutriTrack</p>
    <div className="btns">
    <button className="nav-btn" onClick={()=>navigate("/Signup")}>Signup</button>
    <button className="nav-btn" onClick={()=>navigate("/login")}>Login</button>
    </div>
</nav>
   <div className="cont">
   <img src={forgotpass} alt="image" srcset="" />
    <div className="forgot-password-container">
      <h2 className="forgot-title">Forgot Password</h2>
      <p className="forgot-description">
       Don't worry it happens. Please enter the E-mail <br /> <address> associated with your account</address>.
      </p>
      <form onSubmit={handleSubmit} className="forgot-form">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit" className="forgot-btn" onClick={() => navigate("/ForgotPassword")}>
          Send Reset Link
        </button>
      </form>
      <p className="back-to-login">
        Remembered your password?{" "}
        <a href="/login" onClick={() => navigate("/login")}>
          Back to Login
        </a>
      </p>
    </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
