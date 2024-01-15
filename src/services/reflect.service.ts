import { decryptMessage } from "../utils/AESencryption.util";

interface IReflect {
  owner: string;
  mobileNo: string;
  password: string;
  cofirm_password: string;
  code: string;
  amount: number;
}
export const reflectEnrollmentService = (reflectAccount: IReflect) => {
  const token = decryptMessage(
    sessionStorage.getItem("token") || "",
    decryptMessage(
      sessionStorage.getItem("sessionKey") || "",
      process.env.REACT_APP_SECRET_KEY || ""
    ) as string
  ) as string;
  return fetch(`${process.env.REACT_APP_SERVER_URL}/Reflect/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify(reflectAccount),
  })
    .then(async (response) => {
      try {
        return { state: response.status !== 500, value: await response.json() };
      } catch (error) {
        console.error(error);
        return { state: false, value: {} };
      }
    })
    .catch((error) => {
      console.error(error.message);
      return { state: false, value: {} };
    });
};
