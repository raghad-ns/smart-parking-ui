import { IUser } from "../types/users.types";
import { decryptMessage } from "../utils/AESencryption.util";

export const signupService = (carObject: IUser) => {
  const token = decryptMessage(
    sessionStorage.getItem("token") || "",
    decryptMessage(
      sessionStorage.getItem("sessionKey") || "",
      process.env.REACT_APP_SECRET_KEY || ""
    ) as string
  ) as string;
  return fetch(`${process.env.REACT_APP_SERVER_URL}/home/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify({
      Owner: carObject.ownerName,
      Car_Id: carObject.carId,
      Email: carObject.email,
    }),
  })
    .then(async (response) => {
      try {
        return { state: response.status === 201, value: await response.json() };
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

interface IManager {
  Email: string;
  Name: string;
}
export const managerEnrollment = (manager: IManager) => {
  const token = decryptMessage(
    sessionStorage.getItem("token") || "",
    decryptMessage(
      sessionStorage.getItem("sessionKey") || "",
      process.env.REACT_APP_SECRET_KEY || ""
    ) as string
  ) as string;
  return fetch(`${process.env.REACT_APP_SERVER_URL}/home/manager/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify({ ...manager }),
  })
    .then(async (response) => {
      try {
        return { state: response.status === 201, value: await response.json() };
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

export const signinService = (userObject: IUser, role: string) => {
  return fetch(`${process.env.REACT_APP_SERVER_URL}/home/${role}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      role === "user"
        ? {
            Car_ID: userObject.carId,
            Password: userObject.password,
          }
        : {
            Email: userObject.email,
            Password: userObject.password,
          }
    ),
  })
    .then(async (response) => {
      try {
        return { state: response.status === 200, value: await response.json() };
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

export const passwordSetService = (
  password: string,
  confirmPassword: string
) => {
  return fetch(sessionStorage.getItem("setPassworkAPI") || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Password: password,
      Confirm_Password: confirmPassword,
    }),
  })
    .then(async (response) => {
      try {
        return { state: response.status === 200, value: await response.json() };
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

export const signoutService = () => {
  const token = decryptMessage(
    sessionStorage.getItem("token") || "",
    decryptMessage(
      sessionStorage.getItem("sessionKey") || "",
      process.env.REACT_APP_SECRET_KEY || ""
    ) as string
  ) as string;
  return fetch(`${process.env.REACT_APP_SERVER_URL}/home/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
  })
    .then(async (response) => {
      try {
        return { state: response.status === 200, value: await response.json() };
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
