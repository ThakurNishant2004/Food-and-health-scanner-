

import React, { useState } from "react";
import "./Signup.css"

import { useNavigate } from "react-router-dom";
import weblogin from "../assests/weblogin.svg";


const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", isRememberMe ? "Yes" : "No");
  };

  const handleToggle = () => {
    setIsRememberMe(!isRememberMe);
  };


  return (
      <div className="portion">
           <div className="header">
              <div className="head1">NUTRITRACK</div>
              <p className="head2">Your pocket sized nutrition coach</p>
              </div>
        <div className="portion-2">
          <img className="login-image" src={weblogin} alt="image" srcset="" />
          <div className="signup-container">
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <h2 id="f-h">Welcome back</h2>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </div>
              <div className="slider-group">
          <label className="slider">
            <input  type="checkbox" checked={isRememberMe} onChange={handleToggle}  />
            <span className="slider-button"></span>
          </label>
          <span id='rem'>Remember Me</span>
          <span className="forgot" onClick={()=>navigate("/ForgotPassword")}>Forgot Password?</span>
        </div>
              <button type="submit" className="signup-btn" >
                  Sign in
              </button>
            </form>
            <p>
              Already have an account?{" "}
              <a href="/Signup" onClick={() => navigate("/Signup")}>
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    );
};

export default Login;