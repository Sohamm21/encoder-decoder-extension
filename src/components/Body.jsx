import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

import "./index.css";

const Body = ({ value, setValue }) => {
  const renderBodyHeader = () => {
    return <span className="body-header">Input / Output</span>;
  };

  const renderBodyInput = () => {
    return (
      <CodeMirror
        value={JSON.stringify(value, null, 2)}
        height="400px"
        extensions={[json()]}
        basicSetup={true}
        theme="dark"
        onChange={(val) => {
          try {
            setValue(JSON.parse(val));
          } catch {
            // ignore until JSON becomes valid
          }
        }}
      />
    );
  };
  return (
    <div className="body">
      {renderBodyHeader()}
      {renderBodyInput()}
    </div>
  );
};

export default Body;
