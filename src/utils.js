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

export const parseEpochOrDate = (input) => {
  const trimmed = input.trim();

  if (/^-?\d{10}$/.test(trimmed)) {
    return new Date(Number(trimmed) * 1000);
  }
  if (/^-?\d{13}$/.test(trimmed)) {
    return new Date(Number(trimmed));
  }

  const parsed = new Date(trimmed);
  return isNaN(parsed.getTime()) ? null : parsed;
};
