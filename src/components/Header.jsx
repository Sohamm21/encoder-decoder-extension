import React from "react";
import "./index.css";

const Header = () => {
  return (
    <div className="header">
      <img src="/logo.png" className="header-icon" loading="lazy" />
      <div className="header-text">
        <span className="medium-font">DataCraft</span>
        <span className="guide-text">Utility Tool</span>
      </div>
    </div>
  );
};

export default Header;
