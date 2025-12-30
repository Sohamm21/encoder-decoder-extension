import React from "react";
import "./index.css";

const Header = () => {
  return (
    <div className="header">
      <img
        src="https://res.cloudinary.com/dyrv985gb/image/upload/v1767063951/encoder-decoder/code-solid-full_euldig.svg"
        className="header-icon"
        loading="lazy"
      />
      <div className="header-text">
        <span>Encoder Decoder Transformer</span>
        <span>Utility Tool</span>
      </div>
    </div>
  );
};

export default Header;
