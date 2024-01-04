import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const useAesEncryption = () => {
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    // Generate a random 256-bit (32-byte) key on mount
    console.log("Random key: ", CryptoJS.lib.WordArray.random(256 / 8));
    const randomKey = CryptoJS.lib.WordArray.random(256 / 8);
    const keyString = CryptoJS.enc.Hex.stringify(randomKey);
    console.log("Generated Key (Hex String):", keyString);
    setKey(randomKey.toString());
    process.env.SECRET_KEY = randomKey.toString();
    console.log("process.env: ", process.env.SECRET_KEY);
    // es-lint/skip/next/line
  }, []);

  const encryptMessage = (message: string) => {
    console.log("string key: ", key);
    if (!key) {
      console.error("Encryption key is not available.");
      return null;
    }

    const encrypted = CryptoJS.AES.encrypt(message, key);
    return encrypted.toString();
  };

  const decryptMessage = (encryptedMessage: string) => {
    if (!key) {
      console.error("Decryption key is not available.");
      return null;
    }

    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  return { encryptMessage, decryptMessage };
};

export default useAesEncryption;
