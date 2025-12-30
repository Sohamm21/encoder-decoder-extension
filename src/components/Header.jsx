import React from "react";
import "./index.css";

const Header = () => {
  return (
    <div className="header">
      <img
        src="https://res.cloudinary.com/dyrv985gb/image/upload/v1767114288/encoder-decoder/Gemini_Generated_Image_zop6xzop6xzop6xz_eosjsj.png"
        className="header-icon"
        loading="lazy"
      />
      <div className="header-text">
        <span className="medium-font">EncodeDecode Craft</span>
        <span className="guide-text">Utility Tool</span>
      </div>
    </div>
  );
};

export default Header;
