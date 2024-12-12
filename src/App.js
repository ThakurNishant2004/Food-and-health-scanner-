import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import EnterPage from "./components/EnterPage";
import Signup from "./components/Signup";
import Login from "./components/login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
// import HomePage from "./components/HomePage";
 import HomePage2 from "./components/HomePage2";
import Profile from "./components/Profile";
import { UserProvider } from "./components/userContext";
// import Chatbot from "./components/chatbot";


const App = () => {
  return (
    <>
     <UserProvider>
       <BrowserRouter>
       <Routes>
         <Route path="/" element={<EnterPage />} />
         <Route path="/Signup" element={<Signup/>} />
         <Route path="/login" element={<Login/>} />
        <Route path="/ForgotPassword" element={<ForgotPassword/>} />
        <Route path="/ResetPassword" element={<ResetPassword/>} />
        {/* <Route path="/HomePage" element={<HomePage/>} /> */}
        <Route path="/HomePage2" element={<HomePage2/>} />
        <Route path="/Profile" element={<Profile/>} />
        {/* <Route path="/chatbot" element={<Chatbot/>} /> */}
       </Routes>
     </BrowserRouter>
    </UserProvider>
    </>
  );
};

export default App;
