import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { xorEncrypt, xorDecrypt } from "../utils";
import SegmentedControl from "./SegmentedControl";

import "./index.css";

const JsonEditor = lazy(() => import("./JsonEditor"));

const OPERATION_OPTIONS = [
  { value: "decode", label: "Decode" },
  { value: "encode", label: "Encode" },
];

const FORMAT_OPTIONS = [
  { value: "url", label: "URL" },
  { value: "base64", label: "Base64" },
  { value: "xor", label: "XOR" },
];

const EncodeDecodePanel = ({ value, setValue }) => {
  const [showJsonFormat, setShowJsonFormat] = useState(false);
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

  const isJsonFormat = useMemo(() => {
    if (!value || typeof value !== "string") return false;
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }, [value]);

  const handleFormat = () => {
    if (!value) {
      return;
    }
    try {
      const parsed = JSON.parse(value);
      setValue(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (isJsonFormat) {
      setShowJsonFormat(true);
      handleFormat();
    }
  }, [isJsonFormat]);

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
            if (typeof parsed === "string") {
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

  const renderBodyHeader = () => {
    const shouldShowToggle = isJsonFormat || showJsonFormat;

    return (
      <div className="body-header">
        <span>Input / Output</span>
        <div className="body-header-buttons">
          {showJsonFormat && (
            <button
              onClick={handleFormat}
              className={`body-header-button ${value ? "" : "disabled"}`}
            >
              Format
            </button>
          )}

          {shouldShowToggle && (
            <button
              onClick={() => setShowJsonFormat(!showJsonFormat)}
              className="body-header-button"
            >
              {showJsonFormat ? "Show Text / Operations" : "Show JSON"}
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderInput = () => {
    if (showJsonFormat) {
      return (
        <Suspense fallback={<div className="json-editor json-editor-loading" />}>
          <JsonEditor value={value} onChange={setValue} />
        </Suspense>
      );
    }
    return (
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="body-input-textarea"
        autoSize={false}
      />
    );
  };

  return (
    <>
      <div className="body">
        {renderBodyHeader()}
        {renderInput()}
      </div>
      {!showJsonFormat && (
        <div className="footer">
          <div className="footer-buttons">
            <div className="operation-container">
              <span>Operation</span>
              <SegmentedControl options={OPERATION_OPTIONS} value={operation} onChange={setOperation} />
            </div>
            <div className="operation-container">
              <span>Format</span>
              <SegmentedControl options={FORMAT_OPTIONS} value={format} onChange={setFormat} />
            </div>
          </div>
          <button className={`footer-button ${value ? "" : "disabled"}`} onClick={handleRun}>
            Run
          </button>
        </div>
      )}
    </>
  );
};

export default EncodeDecodePanel;
