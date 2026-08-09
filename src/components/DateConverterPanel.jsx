import React from "react";
import { parseEpochOrDate } from "../utils";

import "./index.css";

const DateConverterPanel = ({ value, setValue }) => {
  const handleConvertDate = () => {
    if (!value) {
      return;
    }
    const date = parseEpochOrDate(value);
    if (!date) {
      alert("Couldn't recognize that as an epoch timestamp or date.");
      return;
    }
    setValue(date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "long" }));
  };

  return (
    <>
      <div className="body">
        <div className="body-header">
          <span>Input / Output</span>
        </div>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="body-input-textarea"
          placeholder="Paste an epoch timestamp or date..."
        />
      </div>
      <div className="footer">
        <button className={`footer-button ${value ? "" : "disabled"}`} onClick={handleConvertDate}>
          Convert to Local Time
        </button>
      </div>
    </>
  );
};

export default DateConverterPanel;
