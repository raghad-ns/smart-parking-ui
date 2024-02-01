import { decryptMessage } from "../utils/AESencryption.util";

interface IParking {
  customid: string;
  location: string;
}
export const parkingEnrollmentService = (parking: IParking) => {
  const token = decryptMessage(
    sessionStorage.getItem("token") || "",
    decryptMessage(
      sessionStorage.getItem("sessionKey") || "",
      process.env.REACT_APP_SECRET_KEY || ""
    ) as string
  ) as string;
  console.log("token: ", token);
  return fetch(`${process.env.REACT_APP_SERVER_URL}/parking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify(parking),
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

export const getParkingsListService = () => {
  // console.log("fetching...");
  const token = decryptMessage(
    sessionStorage.getItem("token") || "",
    decryptMessage(
      sessionStorage.getItem("sessionKey") || "",
      process.env.REACT_APP_SECRET_KEY || ""
    ) as string
  ) as string;

  return fetch(`${process.env.REACT_APP_SERVER_URL}/parking`, {
    method: "GET",
    headers: {
      Authorization: token || "",
    },
  })
    .then(async (response) => {
      // console.log("fetched successfully!");
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
