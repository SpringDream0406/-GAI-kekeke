import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Ad_Header from './component/Ad_Header';
import Ad_Menubar from './component/Ad_Menubar';
import Footer from './component/Footer';
import Header_bf from './component/Header_bf';
import App from './App'
import Ad_BG from './ad_component/Ad_BG';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

 <App /> 


//  <Ad_BG />


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();