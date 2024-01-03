import { IUser } from "../types/users.types";

export const signupService = (carObject: IUser) => {
  return fetch("http://localhost:5000/home/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token") || "",
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

export const signinService = (userObject: IUser, role: string) => {
  return fetch(`http://localhost:5000/home/${role}/signin`, {
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
