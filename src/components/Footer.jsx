import React, { useState, useEffect } from "react";

import "./index.css";

const XOR_KEY = 150;

const xorEncrypt = (data) => {
  const jsonStr = JSON.stringify(data);
  const encrypted = new Uint8Array(jsonStr.length);
  for (let i = 0; i < jsonStr.length; i++) {
    encrypted[i] = jsonStr.charCodeAt(i) ^ XOR_KEY;
  }
  return btoa(String.fromCharCode(...encrypted));
};

const xorDecrypt = (base64) => {
  const binary = atob(base64);
  let decryptedStr = '';
  for (let i = 0; i < binary.length; i++) {
    decryptedStr += String.fromCharCode(binary.charCodeAt(i) ^ XOR_KEY);
  }
  return decryptedStr;
};

const Footer = ({ value, setValue, showJsonFormat }) => {
  const [operation, setOperation] = useState(() => {
    return localStorage.getItem("operation") || "decode";
  });
  const [format, setFormat] = useState(() => {
    return localStorage.getItem("format") || "url";
  });

  useEffect(() => {
    localStorage.setItem("operation", operation);
  }, [operation]);

  useEffect(() => {
    localStorage.setItem("format", format);
  }, [format]);

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
        case "xor":
          try {
            const parsed = JSON.parse(value);
            setValue(xorEncrypt(parsed));
          } catch {
            alert("Invalid JSON input for XOR encryption");
          }
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
        case "xor":
          try {
            const decrypted = xorDecrypt(value);
            let parsed = JSON.parse(decrypted);
            // Unwrap if result is still a string (double-stringified JSON)
            if (typeof parsed === 'string') {
              parsed = JSON.parse(parsed);
            }
            setValue(JSON.stringify(parsed, null, 2));
          } catch {
            alert("Invalid encrypted input for XOR decryption");
          }
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
            <select value={operation} onChange={handleOperationChange} className="dropdown">
              <option value="decode">Decode</option>
              <option value="encode">Encode</option>
            </select>
          </div>
          <div className="operation-container">
            <span>Format</span>
            <select value={format} onChange={handleFormatChange} className="dropdown">
              <option value="url">URL</option>
              <option value="base64">Base64</option>
              <option value="xor">XOR</option>
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
