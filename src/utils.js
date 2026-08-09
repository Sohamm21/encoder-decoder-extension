const XOR_KEY = 150;

export const xorEncrypt = (data) => {
  const jsonStr = JSON.stringify(data);
  const encrypted = new Uint8Array(jsonStr.length);
  for (let i = 0; i < jsonStr.length; i++) {
    encrypted[i] = jsonStr.charCodeAt(i) ^ XOR_KEY;
  }
  return btoa(String.fromCharCode(...encrypted));
};

export const xorDecrypt = (base64) => {
  const binary = atob(base64);
  let decryptedStr = "";
  for (let i = 0; i < binary.length; i++) {
    decryptedStr += String.fromCharCode(binary.charCodeAt(i) ^ XOR_KEY);
  }
  return decryptedStr;
};

const MIN_PLAUSIBLE_EPOCH_SECONDS = Date.UTC(1990, 0, 1) / 1000;
const MAX_PLAUSIBLE_EPOCH_SECONDS = Date.UTC(2100, 0, 1) / 1000;

export const isEpoch = (input) => {
  const trimmed = input.trim();

  let seconds;
  if (/^-?\d{10}$/.test(trimmed)) {
    seconds = Number(trimmed);
  } else if (/^-?\d{13}$/.test(trimmed)) {
    seconds = Number(trimmed) / 1000;
  } else {
    return false;
  }

  return seconds >= MIN_PLAUSIBLE_EPOCH_SECONDS && seconds < MAX_PLAUSIBLE_EPOCH_SECONDS;
};

export const parseEpochOrDate = (input) => {
  const trimmed = input.trim();

  if (isEpoch(trimmed)) {
    const isSeconds = /^-?\d{10}$/.test(trimmed);
    return new Date(Number(trimmed) * (isSeconds ? 1000 : 1));
  }

  const parsed = new Date(trimmed);
  return isNaN(parsed.getTime()) ? null : parsed;
};

export const hasExplicitTimeZone = (input) => {
  return /([zZ]|[+-]\d{2}:?\d{2})$/.test(input.trim());
};

const getTimeZoneOffsetMs = (date, timeZone) => {
  const utcStr = date.toLocaleString("en-US", { timeZone: "UTC" });
  const tzStr = date.toLocaleString("en-US", { timeZone });
  return new Date(utcStr).getTime() - new Date(tzStr).getTime();
};

export const zonedTimeToUtc = (components, timeZone) => {
  const { year, month, day, hour, minute, second } = components;
  const naive = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  const offset = getTimeZoneOffsetMs(naive, timeZone);
  return new Date(naive.getTime() + offset);
};

export const getTimeZoneOptions = () => {
  if (typeof Intl.supportedValuesOf === "function") {
    return Intl.supportedValuesOf("timeZone");
  }
  return [
    "UTC",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Berlin",
    "Asia/Kolkata",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney",
  ];
};
