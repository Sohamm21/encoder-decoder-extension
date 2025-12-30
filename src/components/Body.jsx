import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

import "./index.css";

const Body = ({
  value,
  setValue,
  isJsonFormat,
  showJsonFormat,
  setShowJsonFormat,
}) => {
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
              {showJsonFormat ? "Show Text" : "Show JSON"}
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderBodyInputText = () => {
    return (
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="body-input-textarea"
        autoSize={false}
      />
    );
  };

  const renderBodyInputJson = () => {
    return (
      <CodeMirror
        value={value}
        height="400px"
        width="100%"
        minWidth="100%"
        extensions={[json()]}
        basicSetup={true}
        theme="dark"
        className="json-editor"
        onChange={(val) => {
          try {
            setValue(val);
          } catch {
            // ignore until JSON becomes valid
          }
        }}
      />
    );
  };

  const renderBodyInput = () => {
    if (showJsonFormat) {
      return renderBodyInputJson();
    }
    return renderBodyInputText();
  };

  return (
    <div className="body">
      {renderBodyHeader()}
      {renderBodyInput()}
    </div>
  );
};

export default Body;
