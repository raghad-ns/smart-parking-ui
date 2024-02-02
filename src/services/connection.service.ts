import { decryptMessage } from "../utils/AESencryption.util";

export const initiateConnectionService = (parkingId: string) => {
  const token = decryptMessage(
    sessionStorage.getItem("token") || "",
    decryptMessage(
      sessionStorage.getItem("sessionKey") || "",
      process.env.REACT_APP_SECRET_KEY || ""
    ) as string
  ) as string;
  console.log("token: ", token);
  return fetch(`${process.env.REACT_APP_SERVER_URL}/simulation/park`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify({ parkingId }),
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
