import React, { useState, useEffect, createContext, useContext } from "react"; // Import useContext here
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// 페이지 및 컴포넌트 import (경로는 예시입니다, 실제 경로에 맞게 조정해야 함)
import Main from "./Main";
import Join from "./pages/Join";
import TourOrder from "./pages/TourOrder";
import TourDet3 from "./pages/TourDet3";
import AdminLogin from "./pages/AdminLogin";

import TourDet2 from "./pages/TourDet2";
import TourCompleteOrder from "./pages/TourCompleteOrder";
import SampleCake from "./pages/SampleCake";
import UserMypage from "./pages/UserMypage";
import TourReviewPopup from "./pages/TourReviewPopup";
import MpOrderList from "./pages/MpOrderList";
import Cakes from "./pages/Cakes";
import CustomCake from "./pages/CustomCake";
import Login from "./pages/Login";
import UserMessage from "./pages/UserMessage";
import Capture from "./pages/Capture";
import CustomCakeOrder from "./pages/CustomCakeOrder";
import { AdminJoin } from "./pages/AdminJoin";
// 헤더 컴포넌트 import
import Header_bf from "./component/Header_bf";
import Header_af from './component/Header_af';
import Ad_Header from "./component/Ad_Header";


// Admin import

import AdminMessage from "./ad_component/AdminMessage";


// 글로벌 스타일 적용을 위한 컴포넌트
import GlobalStyle from "./component/GlobalStyle";

// 컨텍스트 생성
export const StoreContext = createContext();


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  

  useEffect(() => {
    // 세션 스토리지에서 사용자 데이터를 불러옵니다
    const userStorageData = sessionStorage.getItem('userData');
    setIsLoggedIn(!!userStorageData);
  }, []);


 // 컨텍스트 제공자 설정
 const storeValue = {
   isLoggedIn,
   setIsLoggedIn,
   isAdminLoggedIn,
   setIsAdminLoggedIn
 };
 

  return (

    <StoreContext.Provider value={storeValue}>
      <BrowserRouter>
        <GlobalStyle />
        {/* 로그인 상태에 따른 헤더 렌더링 */}
      
        {/* 라우트 설정 */}
        <Routes>
 
          <Route path="/join" element={<Layout><Join /></Layout>} />
          <Route path="/admin/join" element={<Layout><AdminJoin /></Layout>} />
          <Route path="/admin/login" element={<Layout><AdminLogin /></Layout>} />

          <Route path="/" element={<Layout><Main /></Layout>} />
          <Route path="/tour-order" element={<Layout><TourOrder /></Layout>} />
          <Route path="/tour-det3" element={<Layout><TourDet3 /></Layout>} />
          <Route path="/tour-det2" element={<Layout><TourDet2 /></Layout>} />
          <Route path="/tour-complete-order" element={<Layout><TourCompleteOrder /></Layout>} />
          <Route path="/samplecake" element={<Layout><SampleCake /></Layout>} />
          <Route path="/usermypage" element={<Layout><UserMypage /></Layout>} />
          <Route path="/mporderlist" element={<Layout><MpOrderList /></Layout>} />
          <Route path="/cakes" element={<Layout><Cakes /></Layout>} />

          <Route path="/adminmessage" element = {<Layout><AdminMessage/></Layout>}/>  

          <Route path="/customcake" element={<Layout><CustomCake /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/usermessage" element={<Layout><UserMessage /></Layout>} />
          <Route path="/capture" element={<Layout><Capture /></Layout>} />
          <Route path="/customcake/order" element={<Layout><CustomCakeOrder /></Layout>} />
          <Route path="*" element={<Layout />} />
          {/* 기타 필요한 라우트 */}
        </Routes>
      </BrowserRouter>
    </StoreContext.Provider>

    // </store.Provider>

)}



export default App;


// Layout 컴포넌트를 BrowserRouter 내부에서 useLocation을 사용하도록 하고, 헤더를 조건부로 렌더링합니다.
function Layout( {children}) {
  const location = useLocation();
  const { isAdminLoggedIn, isLoggedIn } = useContext(StoreContext);

  // 현재 경로에 따라 헤더 렌더링 여부 결정
  const hideHeaderRoutes = ['/admin/login', '/admin/join'];
  const showHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && !isAdminLoggedIn && (isLoggedIn ? <Header_af /> : <Header_bf />)}
      {isAdminLoggedIn && <Ad_Header />}
      {children}
      {/* 해당 컴포넌트에 라우트된 내용을 렌더링하려면 여기에 Outlet을 사용합니다 */}
    </>
  );

  };


