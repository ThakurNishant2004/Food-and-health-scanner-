import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnterPage from "./components/EnterPage";
import Signup from "./components/Signup";
import Login from "./components/login";
import ForgotPassword from "./components/ForgotPassword";
import ForgotPassword2 from "./components/ForgotPassword2";
import ResetPassword from "./components/ResetPassword";


const App = () => {
  return (
    <>
       <Router>
       <Routes>
         <Route path="/" element={<EnterPage />} />
         <Route path="/Signup" element={<Signup/>} />
         <Route path="/login" element={<Login/>} />
        <Route path="/ForgotPassword" element={<ForgotPassword/>} />
        <Route path="/ForgotPassword2" element={<ForgotPassword2/>} />
        <Route path="/ResetPassword" element={<ResetPassword/>} />
       </Routes>
     </Router>
    </>
  );
};

export default App;
