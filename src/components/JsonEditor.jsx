import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

const JsonEditor = ({ value, onChange }) => {
  return (
    <CodeMirror
      value={value}
      height="100%"
      width="100%"
      maxWidth="100%"
      minWidth="100%"
      extensions={[json()]}
      basicSetup={true}
      theme="dark"
      className="json-editor"
      onChange={(val) => {
        try {
          onChange(val);
        } catch {
          // ignore until JSON becomes valid
        }
      }}
    />
  );
};

export default JsonEditor;
