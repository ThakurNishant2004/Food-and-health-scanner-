import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import forgotpass from "../assests/forgotpass.svg"

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState("false");
  const [email, setEmail] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Password reset email sent to:", email);
    alert(`A password reset link has been sent to ${email}`);
    navigate("/ResetPassword"); 

    setLoading(true);
    try {
      const response = await fetch("https://e-mail-auth.onrender.com/user/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
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
   <img className="forgot-img" src={forgotpass} alt="image" srcset="" />
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
        <button type="submit" className="forgot-btn" onClick={() => navigate("/ResetPassword")}>
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
