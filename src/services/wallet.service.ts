import { decryptMessage } from "../utils/AESencryption.util";

interface ITransaction {
  carId: string;
  mobileNo: string;
  password: string;
  amount: number;
}
export const chargeWallet = (transaction: ITransaction) => {
  const token = decryptMessage(
    sessionStorage.getItem("token") || "",
    decryptMessage(
      sessionStorage.getItem("sessionKey") || "",
      process.env.REACT_APP_SECRET_KEY || ""
    ) as string
  ) as string;
  return fetch(`${process.env.REACT_APP_SERVER_URL}/charge/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify(transaction),
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

export const confirmTransaction = (OTP: string) => {
  const token = decryptMessage(
    sessionStorage.getItem("token") || "",
    decryptMessage(
      sessionStorage.getItem("sessionKey") || "",
      process.env.REACT_APP_SECRET_KEY || ""
    ) as string
  ) as string;
  const transactionId = decryptMessage(
    sessionStorage.getItem("transaction-id") || "",
    decryptMessage(
      sessionStorage.getItem("sessionKey") || "",
      process.env.REACT_APP_SECRET_KEY || ""
    ) as string
  ) as string;
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/charge/confirm/${transactionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      body: JSON.stringify({ OTP }),
    }
  )
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

export const getWalletBalance = () => {
  const token = decryptMessage(
    sessionStorage.getItem("token") || "",
    decryptMessage(
      sessionStorage.getItem("sessionKey") || "",
      process.env.REACT_APP_SECRET_KEY || ""
    ) as string
  ) as string;
  return fetch(`${process.env.REACT_APP_SERVER_URL}/transactions/balance`, {
    method: "GET",
    headers: {
      Authorization: token || "",
    },
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
