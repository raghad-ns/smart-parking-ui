// import cryptojs from "crypto-js";
// export const generateSessionKey = (size: 128 | 256 | 192) => {
//   process.env.SECRET_KEY = cryptojs.lib.WordArray.random(256 / 8).toString();
// };

import { getWalletBalance } from "../services/wallet.service";

export const getBalance = async () => {
  const walletBalance = await getWalletBalance();
  const balance: number = walletBalance.state ? walletBalance.value.data : 0;
  return balance;
};

interface IInputs {
  value: any;
  type: string;
}
// use it and apply fail safe scenarios
export const validateInputs = (inputs: Array<IInputs>) => {
  // This regex is used to defense against XSS vulnerabilities
  const regex = /^(?!(<script>|<object>|<embed>|<link>)).*$/;
  return inputs.every((input) => {
    switch (input.type) {
      case "mobileNo":
        // Verify that it matches the pattern: 05XXXXXXXX
        return /^05\d{8}$/.test(input.value) && regex.test(input.value);
      case "number":
      case "customid":
        // Verify that it includes digits only
        return /^\d+$/.test(input.value) && regex.test(input.value);
      case "password":
        // Verify password strength, it should be at least 8 characters
        // including digits, special symbols, upper and lower case letters
        const strongRegex = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        );
        return strongRegex.test(input.value) && regex.test(input.value);
      case "name":
        // Verify that it does not contain any digit and it's not empty
        const noNumbersPattern = /^[^0-9]*$/;
        return (
          noNumbersPattern.test(input.value) &&
          input.value.toString().trim().length &&
          regex.test(input.value)
        );
      case "email":
        // Verify that it matches the pattern: example@example.anything
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(input.value) && regex.test(input.value);
      case "carId":
        // Verify that it starts with two letters followed by dash then three or four digits
        const carIdPattern = /^[A-Za-z]{2}-\d{3,4}$/;
        return carIdPattern.test(input.value) && regex.test(input.value);
      default:
        return false;
    }
  });
};
