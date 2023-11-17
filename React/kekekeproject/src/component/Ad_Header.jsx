import React from "react";
import "../css/Ad_Header.css";

const Ad_Header = () => {
    return (
        <div className="div-wrapper">
        <div className="div">
          <div className="view">
            <div className="div-2">
              <div className="text-wrapper">사장님</div>
            </div>
            <div className="view-2">
              <div className="text-wrapper">정건식</div>
            </div>
            <div className="view-3" />
            <div className="ellipse-wrapper">
              <img className="ellipse" src="/assets/images/cake1.jpg"/>
            </div>
          </div>
          <img className="menubar" alt="Menubar" src="menubar-2.png" />
        </div>
      </div>
    );
  };
export default  Ad_Header;