// import cryptojs from "crypto-js";
// export const generateSessionKey = (size: 128 | 256 | 192) => {
//   process.env.SECRET_KEY = cryptojs.lib.WordArray.random(256 / 8).toString();
// };

interface IInputs {
  value: any;
  type: string;
}
// use it and apply fail safe scenarios
export const validateInputs = (inputs: Array<IInputs>) => {
  return inputs.every((input) => {
    switch (input.type) {
      case "customid":
        return /^[0-9]+(?:\.[0-9]+)?$/.test(input.value);
      case "password":
        const strongRegex = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        );
        return strongRegex.test(input.value);
      case "name":
        // Verify that it does not contain any digit and it's not empty
        const noNumbersPattern = /^[^0-9]*$/;
        return (
          noNumbersPattern.test(input.value) &&
          input.value.toString().trim().length
        );
      case "email":
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(input.value);
      case "carId":
        // Verify that it starts with two letters followed by dash then three or four digits
        const carIdPattern = /^[A-Za-z]{2}-\d{3,4}$/;
        return carIdPattern.test(input.value);
      default:
        return false;
    }
  });
};
