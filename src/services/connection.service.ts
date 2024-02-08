import { IResponse } from "../types/response.types";
import { decryptMessage } from "../utils/AESencryption.util";

export const initiateConnectionService = (
  parkingId: string
): Promise<IResponse> => {
  const token = decryptMessage(
    sessionStorage.getItem("token") || "",
    decryptMessage(
      sessionStorage.getItem("sessionKey") || "",
      process.env.REACT_APP_SECRET_KEY || ""
    ) as string
  ) as string;
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

export const terminateConnectionService = (
  parkingId: string
): Promise<IResponse> => {
  const token = decryptMessage(
    sessionStorage.getItem("token") || "",
    decryptMessage(
      sessionStorage.getItem("sessionKey") || "",
      process.env.REACT_APP_SECRET_KEY || ""
    ) as string
  ) as string;
  return fetch(`${process.env.REACT_APP_SERVER_URL}/simulation/leave`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify({ parkingId }),
  })
    .then(async (response) => {
      try {
        return {
          state: response.status !== 500,
          value: { statusCode: response.status },
        };
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

export const getHistory = (
  page?: number,
  pageSize?: number
): Promise<IResponse> => {
  const token = decryptMessage(
    sessionStorage.getItem("token") || "",
    decryptMessage(
      sessionStorage.getItem("sessionKey") || "",
      process.env.REACT_APP_SECRET_KEY || ""
    ) as string
  ) as string;
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/simulation/history?page=${
      page || 1
    }&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        Authorization: token || "",
      },
    }
  )
    .then(async (response) => {
      try {
        return {
          state: response.status !== 500,
          value: await response.json(),
        };
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
