import React, { useState, useEffect } from "react";
import { FaRegCopy, FaRegTrashCan } from "react-icons/fa6";

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

  const renderSegmented = (options, activeValue, onSelect) => {
    return (
      <div className="segmented" role="tablist">
        {options.map(({ value: optionValue, label }) => (
          <button
            key={optionValue}
            type="button"
            role="tab"
            aria-selected={activeValue === optionValue}
            className={`segmented-option ${activeValue === optionValue ? "active" : ""}`}
            onClick={() => onSelect(optionValue)}
          >
            {label}
          </button>
        ))}
      </div>
    );
  };

  const renderOperationButtons = () => {
    return (
      <>
        <div className="footer-buttons">
          <div className="operation-container">
            <span>Operation</span>
            {renderSegmented(
              [
                { value: "decode", label: "Decode" },
                { value: "encode", label: "Encode" },
              ],
              operation,
              setOperation
            )}
          </div>
          <div className="operation-container">
            <span>Format</span>
            {renderSegmented(
              [
                { value: "url", label: "URL" },
                { value: "base64", label: "Base64" },
                { value: "xor", label: "XOR" },
              ],
              format,
              setFormat
            )}
          </div>
        </div>
        <button
          className={`footer-button ${value ? "" : "disabled"}`}
          onClick={handleRun}
        >
          Run
        </button>
      </>
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
    );
  };

  return (
    <div className="footer">
      {!showJsonFormat && renderOperationButtons()}
      {!showJsonFormat && <hr className="footer-hr" />}
      {renderCopyClearButtons()}
    </div>
  );
};

export default Footer;
