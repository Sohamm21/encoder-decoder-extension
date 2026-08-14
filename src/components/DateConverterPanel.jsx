import React, { useEffect, useMemo, useState } from "react";
import {
  parseEpochOrDate,
  isEpoch,
  hasExplicitTimeZone,
  zonedTimeToUtc,
  getTimeZoneOptions,
} from "../utils";
import SearchableSelect from "./SearchableSelect";

import "./index.css";

const LOCAL_ZONE = "local";

const DateConverterPanel = ({ value, setValue }) => {
  const [fromZone, setFromZone] = useState(() => {
    return localStorage.getItem("dateFromZone") || LOCAL_ZONE;
  });
  const [toZone, setToZone] = useState(() => {
    return localStorage.getItem("dateToZone") || LOCAL_ZONE;
  });

  const zoneOptions = useMemo(() => {
    const options = [{ value: LOCAL_ZONE, label: "Local time" }];
    for (const zone of getTimeZoneOptions()) {
      options.push({ value: zone, label: zone });
    }
    return options;
  }, []);

  useEffect(() => {
    localStorage.setItem("dateFromZone", fromZone);
  }, [fromZone]);

  useEffect(() => {
    localStorage.setItem("dateToZone", toZone);
  }, [toZone]);

  useEffect(() => {
    const checkClipboard = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      try {
        const text = await navigator.clipboard.readText();
        const clipboardTrimmed = text.trim();

        if (clipboardTrimmed && parseEpochOrDate(clipboardTrimmed) !== null) {
          setValue(text);
        } else {
          setValue("");
        }
      } catch (error) {
        console.error("Failed to read clipboard:", error);
      }
    };

    checkClipboard();
  }, []);

  const trimmed = value.trim();
  const fromZoneIgnored = trimmed.length > 0 && (isEpoch(trimmed) || hasExplicitTimeZone(trimmed));

  const resolveDate = (input) => {
    if (isEpoch(input) || fromZone === LOCAL_ZONE || hasExplicitTimeZone(input)) {
      return parseEpochOrDate(input);
    }

    const naive = new Date(input);
    if (isNaN(naive.getTime())) {
      return null;
    }
    return zonedTimeToUtc(
      {
        year: naive.getFullYear(),
        month: naive.getMonth() + 1,
        day: naive.getDate(),
        hour: naive.getHours(),
        minute: naive.getMinutes(),
        second: naive.getSeconds(),
      },
      fromZone
    );
  };

  const formatInZone = (date, zone) => {
    const options = { dateStyle: "medium", timeStyle: "long" };
    if (zone !== LOCAL_ZONE) {
      options.timeZone = zone;
    }
    return date.toLocaleString(undefined, options);
  };

  const resolvedDate = useMemo(() => {
    if (!trimmed) return null;
    return resolveDate(trimmed);
  }, [trimmed, fromZone]);

  const toResult = resolvedDate ? formatInZone(resolvedDate, toZone) : "";
  const toPlaceholder =
    trimmed && !resolvedDate
      ? "Couldn't recognize that as an epoch timestamp or date"
      : "Converted value will appear here";

  return (
    <>
      <div className="body">
        <div className="body-header">
          <span>
            From{" "}
            {fromZoneIgnored
              ? "(zone ignored — input is already absolute)"
              : fromZone !== LOCAL_ZONE && `(${fromZone})`}
          </span>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="body-input"
          placeholder="Paste an epoch timestamp or date..."
        />

        <div className="body-header">
          <span>To {toZone !== LOCAL_ZONE && `(${toZone})`}</span>
        </div>
        <input
          type="text"
          readOnly
          value={toResult}
          className="body-input"
          placeholder={toPlaceholder}
        />
      </div>
      <div className="footer">
        <div className="footer-buttons">
          <div className={`operation-container ${fromZoneIgnored ? "operation-container-muted" : ""}`}>
            <span>From{fromZoneIgnored ? " (ignored)" : ""}</span>
            <SearchableSelect
              options={zoneOptions}
              value={fromZone}
              onChange={setFromZone}
              disabled={fromZoneIgnored}
            />
          </div>
          <div className="operation-container">
            <span>To</span>
            <SearchableSelect options={zoneOptions} value={toZone} onChange={setToZone} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DateConverterPanel;
