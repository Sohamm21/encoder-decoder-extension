import React from "react";
import { TABS } from "../tabs";
import SegmentedControl from "./SegmentedControl";

import "./index.css";

const TAB_OPTIONS = TABS.map(({ id, label }) => ({ value: id, label }));

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <SegmentedControl options={TAB_OPTIONS} value={activeTab} onChange={setActiveTab} />
    </div>
  );
};

export default Tabs;
