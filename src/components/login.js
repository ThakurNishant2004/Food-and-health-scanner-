

import React, { useState } from "react";
import "./Signup.css"

import { useNavigate } from "react-router-dom";
import weblogin from "../assests/weblogin.svg";


const Login = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);

  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", isRememberMe ? "Yes" : "No");
    try {
      const response = await fetch("https://e-mail-auth.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      // console.log(response.status)
      console.log(response)
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message || "Login successful! Redirecting...");
        navigate("/HomePage2"); 
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleToggle = () => {
    setIsRememberMe(!isRememberMe);
  };

  return (
      <div className="portion">
           <div className="Head">
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
                  placeholder="Enter your password"
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
              <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Login..." : "Login"}
              </button>
            </form>
            <p>
              Already have an account?{" "}
              <a href="/Signup" onClick={() => navigate("/Signup")}>
                Signup
              </a>
            </p>
          </div>
        </div>
      </div>
    );
};

export default Login;