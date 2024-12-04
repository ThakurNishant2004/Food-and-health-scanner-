import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import EnterPage from "./components/EnterPage";
import Signup from "./components/Signup";
import Login from "./components/login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import HomePage from "./components/HomePage";


const App = () => {
  return (
    <>
       <BrowserRouter>
       <Routes>
         <Route path="/" element={<EnterPage />} />
         <Route path="/Signup" element={<Signup/>} />
         <Route path="/login" element={<Login/>} />
        <Route path="/ForgotPassword" element={<ForgotPassword/>} />
        <Route path="/ResetPassword" element={<ResetPassword/>} />
        <Route path="/HomePage" element={<HomePage/>} />
       </Routes>
     </BrowserRouter>
    </>
  );
};

export default App;
