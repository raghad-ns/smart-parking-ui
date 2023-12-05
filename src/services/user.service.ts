import { IUser } from "../types/users.types";

export const signupService = (carObject: IUser): Promise<Response> => {
  return fetch("http://localhost:5000/home/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Owner: carObject.ownerName,
      Car_Id: carObject.carId,
      Email: carObject.email,
    }),
  });
};

export const signinService = (userObject: IUser, role: string) => {
  return fetch("http://localhost:5000/home/manager/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      role === "user"
        ? {
            Car_Id: userObject.carId,
            Password: userObject.password,
          }
        : {
            Email: userObject.email,
            Password: userObject.password,
          }
    ),
  });
};
