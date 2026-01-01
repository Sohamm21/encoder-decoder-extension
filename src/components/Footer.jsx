import React, { useState } from "react";

import "./index.css";

const Footer = ({ value, setValue, showJsonFormat }) => {
  const [operation, setOperation] = useState("encode");
  const [format, setFormat] = useState("url");

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleRun = () => {
    if (!value) {
      return;
    }
    if (operation === "encode") {
      switch (format) {
        case "base64":
          setValue(btoa(value));
          break;
        case "url":
          setValue(encodeURIComponent(value));
          break;
        default:
          break;
      }
    } else {
      switch (format) {
        case "base64":
          setValue(atob(value));
          break;
        case "url":
          setValue(decodeURIComponent(value));
          break;
        default:
          break;
      }
    }
  };

  const renderOperationButtons = () => {
    return (
      <div className="footer">
        <div className="footer-buttons">
          <div className="operation-container">
            <span>Operation</span>
            <select onChange={handleOperationChange} className="dropdown">
              <option value="encode">Encode</option>
              <option value="decode">Decode</option>
            </select>
          </div>
          <div className="operation-container">
            <span>Format</span>
            <select onChange={handleFormatChange} className="dropdown">
              <option value="url">URL</option>
              <option value="base64">Base64</option>
            </select>
          </div>
        </div>
        <button
          className={`footer-button ${value ? "" : "disabled"}`}
          onClick={handleRun}
        >
          Run
        </button>
      </div>
    );
  };

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

  const renderCopyClearButtons = () => {
    return (
      <div className="copy-clear-buttons">
        <button
          className={`copy-clear-button ${value ? "" : "disabled"}`}
          onClick={handleCopy}
        >
          Copy
        </button>
        <button
          className={`copy-clear-button ${value ? "" : "disabled"}`}
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    );
  };

  return (
    <div>
      {!showJsonFormat && renderOperationButtons()}
      {!showJsonFormat && <hr className="footer-hr" />}
      {renderCopyClearButtons()}
    </div>
  );
};

export default Footer;
