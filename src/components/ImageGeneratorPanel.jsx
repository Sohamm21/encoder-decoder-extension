import React, { useEffect, useState } from "react";
import SegmentedControl from "./SegmentedControl";

import "./index.css";

const MIN_DIMENSION = 16;
const MAX_DIMENSION = 4096;
const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 300;

const MODE_OPTIONS = [
  { value: "generate", label: "Generate" },
  { value: "convert", label: "Convert" },
];

const FORMAT_OPTIONS = [
  { value: "png", label: "PNG" },
  { value: "jpg", label: "JPG" },
  { value: "webp", label: "WebP" },
];

const FORMAT_CONFIG = {
  png: { mimeType: "image/png", extension: "png" },
  jpg: { mimeType: "image/jpeg", extension: "jpg" },
  webp: { mimeType: "image/webp", extension: "webp" },
};

const BG_COLOR = "#10b981";
const TEXT_COLOR = "#04140d";

const generatePlaceholderCanvas = (width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = `700 ${Math.max(12, Math.min(width, height) / 8)}px Arial, Helvetica, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(`${width} × ${height}`, width / 2, height / 2);
  }

  return canvas;
};

const drawImageToCanvas = (image) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Fill white first so formats without alpha (JPEG) don't turn transparent areas black.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
  }

  return canvas;
};

const triggerDownload = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const stripExtension = (filename) => filename.replace(/\.[^./\\]+$/, "");

const ImageGeneratorPanel = () => {
  const [mode, setMode] = useState("generate");
  const [width, setWidth] = useState(String(DEFAULT_WIDTH));
  const [height, setHeight] = useState(String(DEFAULT_HEIGHT));
  const [format, setFormat] = useState("png");
  const [previewSrc, setPreviewSrc] = useState("");
  const [sourceImage, setSourceImage] = useState(null);
  const [sourceFileName, setSourceFileName] = useState("");

  const widthNum = Number(width);
  const heightNum = Number(height);
  const isGenerateValid =
    width !== "" &&
    height !== "" &&
    Number.isFinite(widthNum) &&
    Number.isFinite(heightNum) &&
    widthNum >= MIN_DIMENSION &&
    widthNum <= MAX_DIMENSION &&
    heightNum >= MIN_DIMENSION &&
    heightNum <= MAX_DIMENSION;

  const isValid = mode === "generate" ? isGenerateValid : !!sourceImage;

  useEffect(() => {
    if (mode === "generate") {
      if (!isGenerateValid) {
        setPreviewSrc("");
        return;
      }
      const canvas = generatePlaceholderCanvas(widthNum, heightNum);
      setPreviewSrc(canvas.toDataURL("image/png"));
    } else {
      if (!sourceImage) {
        setPreviewSrc("");
        return;
      }
      const canvas = drawImageToCanvas(sourceImage);
      setPreviewSrc(canvas.toDataURL("image/png"));
    }
  }, [mode, widthNum, heightNum, isGenerateValid, sourceImage]);

  const handleBlur = (raw, setter) => () => {
    if (raw === "") return;
    const num = Number(raw);
    if (!Number.isFinite(num)) return;
    const clamped = Math.min(MAX_DIMENSION, Math.max(MIN_DIMENSION, Math.round(num)));
    setter(String(clamped));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setSourceImage(img);
      URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
    setSourceFileName(file.name);
  };

  const handleDownload = () => {
    if (!isValid) return;

    const { mimeType, extension } = FORMAT_CONFIG[format];
    const canvas =
      mode === "generate" ? generatePlaceholderCanvas(widthNum, heightNum) : drawImageToCanvas(sourceImage);
    const filename =
      mode === "generate"
        ? `datacraft-${widthNum}x${heightNum}.${extension}`
        : `${stripExtension(sourceFileName) || "datacraft-image"}.${extension}`;

    canvas.toBlob(
      (blob) => {
        if (blob) {
          triggerDownload(blob, filename);
        }
      },
      mimeType,
      0.92
    );
  };

  return (
    <>
      <div className="body">
        {mode === "generate" ? (
          <>
            <div className="body-header">
              <span>Width (px)</span>
            </div>
            <input
              type="number"
              min={MIN_DIMENSION}
              max={MAX_DIMENSION}
              step="1"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              onBlur={handleBlur(width, setWidth)}
              className="body-input"
            />

            <div className="body-header">
              <span>Height (px)</span>
            </div>
            <input
              type="number"
              min={MIN_DIMENSION}
              max={MAX_DIMENSION}
              step="1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              onBlur={handleBlur(height, setHeight)}
              className="body-input"
            />
          </>
        ) : (
          <>
            <div className="body-header">
              <span>Source Image</span>
            </div>
            <label className="file-input-label" htmlFor="source-image-input">
              <span className="file-input-button">Choose Image</span>
              <span className="file-input-filename">{sourceFileName || "No file chosen"}</span>
            </label>
            <input
              id="source-image-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input-native"
            />
          </>
        )}

        <div className="canvas-preview">
          {previewSrc ? (
            <img src={previewSrc} alt="Preview" />
          ) : (
            <span className="canvas-preview-empty">
              {mode === "generate" ? "Enter a valid width and height" : "Choose an image to convert"}
            </span>
          )}
        </div>
      </div>
      <div className="footer">
        <div className="footer-buttons">
          <div className="operation-container">
            <span>Mode</span>
            <SegmentedControl options={MODE_OPTIONS} value={mode} onChange={setMode} />
          </div>
          <div className="operation-container">
            <span>Format</span>
            <SegmentedControl options={FORMAT_OPTIONS} value={format} onChange={setFormat} />
          </div>
        </div>
        <button className={`footer-button ${isValid ? "" : "disabled"}`} onClick={handleDownload}>
          Download
        </button>
      </div>
    </>
  );
};

export default ImageGeneratorPanel;
