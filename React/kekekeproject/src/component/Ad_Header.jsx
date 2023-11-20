import React from "react";
import "../css/Ad_Header.css";
import Ad_Menubar from "./Ad_Menubar";
import { Link } from "react-router-dom";

const Ad_Header = () => {
    return (

        <div className="adminhd-container">
         
          <div className="view">
          <div className="view-2">
              <div className="text-wrapper">사장님</div>
              </div>
            <div className="view-2">
              <div className="text-wrapper2">정건식</div>
            </div>
            <Link to={'/admin'}>
            <div className="view-3" />
            </Link>
             <div className="ellipse-wrapper">
                   <img className="ellipse" src="/assets/images/cake1.jpg"/>
                   </div>
             
             
           
          
       
          </div>
        </div>
      
    );
  };
export default  Ad_Header;