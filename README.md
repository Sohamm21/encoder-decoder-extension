# Encode-Decode-Craft

**Encode-Decode-Craft** is a powerful and aesthetic Chrome Extension designed for developers. It serves as a comprehensive utility tool for quickly encoding, decoding, and formatting strings directly from your browser.

With seamless clipboard integration and a modern dark-mode interface, it simplifies tasks like inspecting JSON responses, decoding Base64 strings, or URL-encoding parameters.

## 🚀 Features

### 1. **Smart Input Handling**

- **Auto-Paste**: Automatically detects and reads content from your clipboard when you open the extension (requires permission).
- **JSON Detection**: Intelligent detection of JSON content, offering a dedicated JSON editor view with syntax highlighting.

### 2. **JSON Formatter**

- **Prettify JSON**: Quickly format minified JSON into a readable structure with a single click.
- **CodeMirror Editor**: Features a robust JSON editor (CodeMirror) for easy viewing and editing of JSON data.
- **Toggle Views**: Switch between raw text and formatted JSON views.

### 3. **Encoder / Decoder**

Transform your text using various algorithms:

- **Base64**: Encode to and decode from Base64 strings.
- **URL**: Encode components for URLs or decode them back to plain text.
- **Hex**: Convert text to Hexadecimal representation and vice versa.

### 4. **Developer-Centric UX**

- **Modify & Run**: Edit the input text or JSON and immediately run transformations.
- **One-Click Actions**: dedicated **Copy** and **Clear** buttons for efficient workflow.
- **Modern UI**: Built with a sleek, dark-themed interface using polished CSS and responsive design.

---

## 🛠️ Installation & Setup

To use this extension in your Chrome (or Chromium-based) browser, follow these steps:

### Prerequisites

- Node.js installed on your machine.

### Build Steps

1.  **Clone the Repository** (or download the source code):

    ```bash
    git clone <repository_url>
    cd eencoder-decoder-extension
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Build the Project**:
    ```bash
    npm run build
    ```
    This command compiles the React application using Vite and generates a `dist` folder containing the production-ready extension.

### Load into Chrome

1.  Open Chrome and navigate to `chrome://extensions/`.
2.  Enable **Developer mode** (toggle switch in the top right corner).
3.  Click on the **Load unpacked** button (top left).
4.  Select the **`dist`** folder generated in the previous step.
5.  The **Encode-Decode-Craft** extension should now appear in your list and browser toolbar!

---

## 📖 How to Use

1.  **Open the Extension**: Click the Encode-Decode-Craft icon in your browser toolbar.
2.  **Input Data**:
    - If you have text in your clipboard, it will appear automatically.
    - Otherwise, type or paste text into the input area.
3.  **JSON Formatting**:
    - If valid JSON is detected, click **Show JSON** to switch to the editor view.
    - Click **Format** to prettify the JSON structure.
4.  **Encoding/Decoding**:
    - Select your desired **Operation** (Encode or Decode) from the dropdown.
    - Select the **Format** algorithm (Base64, Hex, or URL).
    - Click **Run** to transform the text in the input area.
5.  **Result**:
    - The input area updates with the result.
    - Click **Copy** to save the result back to your clipboard.

## 💻 Technologies Used

- **React**: For building the dynamic user interface.
- **Vite**: For fast tooling and bundling.
- **CodeMirror**: For the advanced JSON editing experience.
- **Vanilla CSS**: For custom, high-performance styling.

---

**Happy Coding!** 🚀
