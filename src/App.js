import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./Pages/Home";


const App = () => {
   const [msg , setMsg] = useState('')
     
   if(msg && msg.length > 0){
     setTimeout(()=>{
        setMsg('')
     },3000)
   }
   
   return (
    <Router>
       <div className={`fixed ${msg ? 'right-0' : 'right-[-100%]'} transition-all duration-500 ease-in-out top-4 bg-gray-400 py-2 px-6 rounded-l-md text-white font-semibold md:text-lg text-sm`}>
         {msg}
       </div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login setMsg={setMsg} error={msg}/>} />
        <Route path="/signup" element={<SignUp setMsg={setMsg} error={msg}/>} />
      </Routes>
    </Router>
  );
};

export default App;
