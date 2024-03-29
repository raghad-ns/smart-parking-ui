import CryptoJS from "crypto-js";

const generateRandomKey = (keyName: string) => {
  // Generate a random 256-bit (32-byte) key on mount
  const randomKey = CryptoJS.lib.WordArray.random(256 / 8);
  const keyString = CryptoJS.enc.Hex.stringify(randomKey);
  // setKey(randomKey.toString());
  sessionStorage.setItem(
    keyName,
    CryptoJS.AES.encrypt(
      keyString.toString(),
      process.env.REACT_APP_SECRET_KEY || ""
    ).toString()
  );
};

const encryptMessage = (message: string, encryptionKey: string) => {
  if (!encryptionKey) {
    console.error("Encryption key is not available.");
    return null;
  }

  const encrypted = CryptoJS.AES.encrypt(message, encryptionKey);
  return encrypted.toString();
};

const decryptMessage = (encryptedMessage: string, decryptionKey: string) => {
  if (!decryptionKey) {
    console.error("Decryption key is not available.");
    return null;
  }

  const decrypted = CryptoJS.AES.decrypt(encryptedMessage, decryptionKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export { encryptMessage, decryptMessage, generateRandomKey };
