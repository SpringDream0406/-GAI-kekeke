import React, { useState } from "react";
import ReactResponsive, { Mobile, PC } from './component/ReactResponsive'
import Header_bf from "./component/Header_bf";
import Header_af from './component/Header_af'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cakes from "./pages/Cakes";
import CustomCake from "./pages/CustomCake";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Main from "./Main";

function App() {
  const [toggle , setToggle] = useState(false);

  return (
    <BrowserRouter>
<<<<<<< Updated upstream
 
      
        <Header_af toggle={toggle} setToggle={setToggle}/>  
=======
    <div className="index">
      {/* <div className="header-bflogin-wrapper"> */}
        <Header_bf className="header-bflogin-all"/>
      {/* </div> */}

>>>>>>> Stashed changes
      

    <Routes>
      <Route path ='/cakes' element={<Cakes />}/>
      <Route path ='/customcake' element={<CustomCake />}/>
      <Route path ='/login' element={<Login />}/>
      <Route path ='/join' element={<Join />}/>
      <Route path="/" element={<Main/>}/>
    </Routes>
   
    </BrowserRouter>
   
  );
}

export default App;