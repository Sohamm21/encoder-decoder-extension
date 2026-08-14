import React, { useEffect, useState } from "react";
import SegmentedControl from "./SegmentedControl";

import "./index.css";

const MIN_DIMENSION = 16;
const MAX_DIMENSION = 4096;
const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 300;

const FORMAT_OPTIONS = [
  { value: "png", label: "PNG" },
  { value: "jpg", label: "JPG" },
];

const FORMAT_CONFIG = {
  png: { mimeType: "image/png", extension: "png" },
  jpg: { mimeType: "image/jpeg", extension: "jpg" },
};

const BG_COLOR = "#10b981";
const TEXT_COLOR = "#04140d";

const generateCanvas = (width, height) => {
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

const ImageGeneratorPanel = () => {
  const [width, setWidth] = useState(String(DEFAULT_WIDTH));
  const [height, setHeight] = useState(String(DEFAULT_HEIGHT));
  const [format, setFormat] = useState("png");
  const [previewSrc, setPreviewSrc] = useState("");

  const widthNum = Number(width);
  const heightNum = Number(height);
  const isValid =
    width !== "" &&
    height !== "" &&
    Number.isFinite(widthNum) &&
    Number.isFinite(heightNum) &&
    widthNum >= MIN_DIMENSION &&
    widthNum <= MAX_DIMENSION &&
    heightNum >= MIN_DIMENSION &&
    heightNum <= MAX_DIMENSION;

  useEffect(() => {
    if (!isValid) return;
    const canvas = generateCanvas(widthNum, heightNum);
    setPreviewSrc(canvas.toDataURL("image/png"));
  }, [widthNum, heightNum, isValid]);

  const handleBlur = (raw, setter) => () => {
    if (raw === "") return;
    const num = Number(raw);
    if (!Number.isFinite(num)) return;
    const clamped = Math.min(MAX_DIMENSION, Math.max(MIN_DIMENSION, Math.round(num)));
    setter(String(clamped));
  };

  const handleDownload = () => {
    if (!isValid) return;

    const canvas = generateCanvas(widthNum, heightNum);
    const { mimeType, extension } = FORMAT_CONFIG[format];
    canvas.toBlob(
      (blob) => {
        if (blob) {
          triggerDownload(blob, `placeholder-${widthNum}x${heightNum}.${extension}`);
        }
      },
      mimeType,
      0.92
    );
  };

  return (
    <>
      <div className="body">
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

        <div className="canvas-preview">
          {previewSrc && (
            <img src={previewSrc} alt={`${widthNum} × ${heightNum} placeholder preview`} />
          )}
        </div>
      </div>
      <div className="footer">
        <div className="footer-buttons">
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
