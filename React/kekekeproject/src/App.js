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
import GlobalStyle from "./component/GlobalStyle";
import Mypage from "./pages/Mypage";
import TourOrder from "./pages/TourOrder"
import TourDet3 from "./pages/TourDet3";
import './css/Footer.css'
import { AdminLogin } from "./pages/AdminLogin";
import { AdminJoin } from "./pages/AdminJoin";

import TourDet2 from "./pages/TourDet2";
import TourCompleteOrder from "./pages/TourCompleteOrder";
import SampleCake from "./pages/SampleCake";
import TourReviewPopup from"./pages/TourReviewPopup";




function App() {
  const [toggle , setToggle] = useState(false);

  return (
    
    <BrowserRouter>    
  

        <GlobalStyle />
        <Header_bf toggle={toggle} setToggle={setToggle}/>  
 
    <Routes>
      <Route path="TourReviewPopup" element = {<TourReviewPopup/>}/>
      <Route path="TourDet2" element={<TourDet2/>}/>
      <Route path="TourDet3" element={<TourDet3/>}/>
      <Route path ='/cakes' element={<Cakes />}/>
      {/* <Route path ='/mypage' element={<Mypage />}/> */}
      <Route path ='/customcake' element={<CustomCake />}/>
      <Route path ='/login' element={<Login />}/>
      <Route path ='/join' element={<Join />}/>
      <Route path="/" element={<Main/>}/>

      <Route path="/adminlogin" element={<AdminLogin/>}/>
      <Route path="/adminjoin" element={<AdminJoin/>}/>

      <Route path="/tourorder" element = {<TourOrder/>}/>
      <Route path="/tourcompleteorder" element = {<TourCompleteOrder/>}/>
      <Route path="/samplecake" element = {<SampleCake/>}/>    


    </Routes>
 
  
   
    </BrowserRouter>
   

  
  );
}

export default App;