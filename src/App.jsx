import { useState } from "react";

import { Header, Body, Footer } from "./components";

import "./App.css";

function App() {
  const [value, setValue] = useState({ key: "value" });
  return (
    <div className="container">
      <Header />
      <Body value={value} setValue={setValue} />
      <Footer />
    </div>
  );
}

export default App;
