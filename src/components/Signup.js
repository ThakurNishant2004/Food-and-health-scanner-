import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import weblogin from "../assests/weblogin.svg";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch("https://e-mail-auth.onrender.com/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name:fullName,
          email,
          password,
        }),
      });
      // console.log(response.status)
      console.log(response)

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Signup successful! Redirecting to login...");
        navigate("/login"); 
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="portion">
         <div className="Head">
            <div className="head1">NUTRITRACK</div>
            <p className="head2">Your pocket sized nutrition coach</p>
            </div>
      <div className="portion-2">
        <img className="login-image" src={weblogin} alt="image" />
        <div className="signup-container">
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <h2 id="f-h">Get started</h2>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
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
            <button type="submit" className="signup-btn" disabled={loading} >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <a href="/login" onClick={() => navigate("/login")}>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;




