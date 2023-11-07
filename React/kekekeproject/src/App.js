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
import Mypage from "./pages/Mypage";

function App() {
  const [toggle , setToggle] = useState(false);

  return (
    <BrowserRouter>
      
        <Header_af toggle={toggle} setToggle={setToggle}/>

    <Routes>
      <Route path ='/cakes' element={<Cakes />}/>
      <Route path ='/customcake' element={<CustomCake />}/>
      <Route path ='/login' element={<Login />}/>
      <Route path ='/join' element={<Join />}/>
      <Route path='/mypage' element={<Mypage/>}/>
    </Routes>
   
    </BrowserRouter>
   
  );
}

export default App;