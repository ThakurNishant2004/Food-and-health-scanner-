import React from "react";
import { useNavigate } from "react-router-dom";
// import onboardingimage1 from "../assests/web2.svg"
// import onboardingimage2 from "../assests/onboarding2.svg"
import onboardingimage3 from "../assests/web5.svg"
import "./EnterPage.css";

const EnterPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <div>
      <nav className="head">
            <p id="heading">NutriTrack</p>
            <div className="btns">
            <button className="nav-btn" onClick={()=>navigate("/Signup")}>Signup</button>
            <button className="nav-btn" onClick={()=>navigate("/login")}>Login</button>
            </div>
      </nav>
      <div className="screen1">
        <p>Welcome to NutriTrack</p>
      </div>
      <div className="page1">
    <div className="enter-page">
        {/* <img className="foodimg" src={onboardingimage1} alt="image" srcset="" /> */}
      <div className="content p1-cont">
        <div className="ph1"> <h1>Welcome to Food & Health Scanner</h1></div>
        <div className="pt1">Scan your food item to get instant insights <br /> into its calories , proteins , fats , and more.</div>
      </div>
    </div>
    </div>
    <div className="page2">
    <div className="enter-page e-p2">
      <div className="content content2">
        <h1>Stay healthy and informed</h1>
        <div className="pt1">Track your intake and make <br /> informed food choices for a <br /> balanced diet.</div>
      </div>
    </div>
    </div>
    <div className="page3">
        <h1 className="pt3">Your pocket sized nutrition coach</h1>
    <div className="enter-page">
        <img className="foodimg" src={onboardingimage3} alt="image" srcset="" />
      <div className="content last-cont">
        <div className="pt1 pt5">Get tailored recommendations <br /> and insights to meet your <br /> health goals.</div>
        <button type="submit" className="submit-btn" onClick={()=>navigate("/Signup")}>Get Start</button>
      </div>
    </div>
    </div>
    <footer className="footer">
    <div id="foot">NutriTrack</div>
            <div className="lists">
              <ul id="L-i">
              <li>About us</li>
              <li>Contact us</li>
            </ul>
           <ul id="L-i">
              <li>Terms & COnditions</li>
              <li>Privacy Policy</li>
            </ul>
            </div>
    </footer>
    </div>
    </>
  );
};

export default EnterPage;
