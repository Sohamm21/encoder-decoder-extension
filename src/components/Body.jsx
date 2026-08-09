import React, { Suspense, lazy, useEffect } from "react";

import "./index.css";

const JsonEditor = lazy(() => import("./JsonEditor"));

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

  useEffect(() => {
    if (isJsonFormat) {
      setShowJsonFormat(true);
      handleFormat();
    }
  }, [isJsonFormat]);


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
      <Suspense fallback={<div className="json-editor json-editor-loading" />}>
        <JsonEditor value={value} onChange={setValue} />
      </Suspense>
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
