import { useEffect, useState } from "react";
import { Header, Body, Footer } from "./components";
import "./App.css";

function App() {
  const [value, setValue] = useState("");

  useEffect(() => {
    const readClipboard = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      try {
        // The popup is focused when opened, so we can read directly here
        const text = await navigator.clipboard.readText();
        console.log("Clipboard content found:", text);

        if (text && text.trim().length > 0) {
          setValue(text);
        }
      } catch (error) {
        console.error("Failed to read clipboard:", error);
      }
    };

    readClipboard();
  }, []);

  return (
    <div className="container">
      <Header />
      <Body value={value} setValue={setValue} />
      <Footer />
    </div>
  );
}

export default App;
