import Join from "./pages/Join";
import Main from "./Main";
import GlobalStyle from "./component/GlobalStyle";
import TourOrder from "./pages/TourOrder"
import TourDet3 from "./pages/TourDet3";
// import './css/Footer.css'
import { AdminLogin } from "./pages/AdminLogin";
import { AdminJoin } from "./pages/AdminJoin";
import TourDet2 from "./pages/TourDet2";
import TourCompleteOrder from "./pages/TourCompleteOrder";
import SampleCake from "./pages/SampleCake";
import UserMypage from "./pages/UserMypage";
import TourReviewPopup from"./pages/TourReviewPopup";
import MpOrderList from "./pages/MpOrderList"; // component의 직접적인 오류는 없습니다... 신경 쓰여도 무시해 주세요 - 유정 -
import React, { useState ,useEffect } from "react";
import ReactResponsive, { Mobile, PC } from './component/ReactResponsive'
import Header_bf from "./component/Header_bf";
import Header_af from './component/Header_af'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Cakes from "./pages/Cakes";
import CustomCake from "./pages/CustomCake";
import Login from "./pages/Login";
import UserMessage from "./pages/UserMessage";
import Capture from "./pages/Capture";

import Ad_Header from "./component/Ad_Header"

import CustomCakeOrder from "./pages/CustomCakeOrder";
import SampleCakeList from "./component/SampleCakeList";



function App() {
  const [toggle , setToggle] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };


  useEffect(() => {
    // 세션 스토리지에서 사용자 데이터 불러오기
    const userStorageData = sessionStorage.getItem('userData');
    
    console.log('Session Storage : ', userStorageData)
    setIsLoggedIn(!!userStorageData); // 사용자 데이터가 있으면 true, 없으면 false
  }, []);



  
  return (
    
    <BrowserRouter>    
  
      <GlobalStyle />
      {isLoggedIn ? (
        <Header_af toggle={toggle} setToggle={setToggle} />
      ) : (
        <Header_bf toggle={toggle} setToggle={setToggle} />
      )}

 
    <Routes>
    <Route path="SampleCakeList" element = {<SampleCakeList/>}/>
      <Route path="TourReviewPopup" element = {<TourReviewPopup/>}/>
      <Route path="TourDet2" element={<TourDet2/>}/>
      <Route path="TourDet3" element={<TourDet3/>}/>
      <Route path ='/cakes' element={<Cakes />}/>
      <Route path ='/customcake' element={<CustomCake />}/>
      <Route path ='/login' element={<Login />}/>
      <Route path ='/join' element={<Join />}/>
      <Route path="/" element={<Main/>}/>
      <Route path="/usermypage" element={<UserMypage/>}/>
      <Route path="/mporderlist" element={<MpOrderList/>}/>
      <Route path="/adminlogin" element={<AdminLogin/>}/>
      <Route path="/adminjoin" element={<AdminJoin/>}/>
      <Route path="/customcake/order" element={<CustomCakeOrder /> }/>
      <Route path="/capture" element={<Capture /> }/>

      <Route path="/tourorder" element = {<TourOrder/>}/>
      <Route path="/tourcompleteorder" element = {<TourCompleteOrder/>}/>
      <Route path="/samplecake" element = {<SampleCake/>}/>    
      <Route
          path="/usermessage"
          element={<UserMessage messages={messages} addMessage={addMessage} />}
        />


    </Routes>
 
  
   
    </BrowserRouter>
   

  
  );
}

export default App;
