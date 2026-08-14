import { useEffect, useState } from "react";
import { Header, Tabs, CopyClearBar } from "./components";
import { getTab, DEFAULT_TAB } from "./tabs";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || DEFAULT_TAB;
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const { Panel: ActivePanel } = getTab(activeTab);

  return (
    <div className="container">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ActivePanel value={value} setValue={setValue} />
      <CopyClearBar value={value} setValue={setValue} />
    </div>
  );
}

export default App;
