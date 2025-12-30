import { useEffect, useMemo, useState } from "react";
import { Header, Body, Footer } from "./components";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [showJsonFormat, setShowJsonFormat] = useState(false);

  useEffect(() => {
    const readClipboard = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      try {
        const text = await navigator.clipboard.readText();

        if (text && text.trim().length > 0) {
          setValue(text);
        }
      } catch (error) {
        console.error("Failed to read clipboard:", error);
      }
    };

    readClipboard();
  }, []);

  const isJsonFormat = useMemo(() => {
    if (!value || typeof value !== "string") return false;
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }, [value]);

  return (
    <div className="container">
      <Header />
      <Body
        value={value}
        setValue={setValue}
        isJsonFormat={isJsonFormat}
        showJsonFormat={showJsonFormat}
        setShowJsonFormat={setShowJsonFormat}
      />
      <Footer
        value={value}
        setValue={setValue}
        showJsonFormat={showJsonFormat}
      />
    </div>
  );
}

export default App;
