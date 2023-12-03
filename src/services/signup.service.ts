interface ICar {
  ownerName: string;
  carId: string;
  email: string;
}
export const signupService = (carObject: ICar): Promise<Response> => {
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
