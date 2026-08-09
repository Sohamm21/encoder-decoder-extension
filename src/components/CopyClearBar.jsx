import React from "react";
import { FaRegCopy, FaRegTrashCan } from "react-icons/fa6";

import "./index.css";

const CopyClearBar = ({ value, setValue }) => {
  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
    }
  };

  const handleClear = () => {
    if (value) {
      setValue("");
    }
  };

  return (
    <div className="footer-copy-clear">
      <hr className="footer-hr" />
      <div className="copy-clear-buttons">
        <button
          className={`icon-button ${value ? "" : "disabled"}`}
          onClick={handleCopy}
          title="Copy"
          aria-label="Copy"
        >
          <FaRegCopy />
        </button>
        <button
          className={`icon-button icon-button-danger ${value ? "" : "disabled"}`}
          onClick={handleClear}
          title="Clear"
          aria-label="Clear"
        >
          <FaRegTrashCan />
        </button>
      </div>
    </div>
  );
};

export default CopyClearBar;
