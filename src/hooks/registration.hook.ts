import { useEffect, useState } from "react";
import { managerEnrollment, signupService } from "../services/user.service";
import { validateInputs } from "../utils/utils";

const useRegistration = (type: "car" | "manager") => {
  const [ownerName, setOwnerName] = useState<string>("");
  const [carId, setCarId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [buttonEnable, setButtonEnable] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(true);

  const checkButtonEnable = () => {
    setButtonEnable(
      (type === "car" && ownerName !== "" && carId !== "" && email !== "") ||
        (type === "manager" && ownerName !== "" && email !== "")
    );
  };

  const handleRegistration = async () => {
    // Handle registration logic here, e.g., sending data to server or validating inputs
    const inputs = [
      { value: ownerName, type: "name" },
      { value: carId, type: "carId" },
      { value: email, type: "email" },
    ];
    if (validateInputs(inputs)) {
      setValid(true);
      const signup = await signupService({ ownerName, carId, email });
      if (signup.state === 201) {
        sessionStorage.setItem(
          "setPassworkAPI",
          signup.value.data.passwordLink
        );
        window.alert("Car added successfully! set your password");
        const newTab: Window = window.open("", "_blank") as Window;
        newTab.location.href = "/email";
        setCarId("");
        setEmail("");
        setOwnerName("");
      } else if (signup.state === 403) {
        window.alert("You don't have the permission to modify this resource");
      } else {
        window.alert("Something went wrong, please try again!");
      }
    } else {
      window.alert("Invalid inputs format, please check your data!");
      setValid(false);
    }
  };

  const handleManagerEnrollment = async () => {
    // Handle registration logic here, e.g., sending data to server or validating inputs
    const inputs = [
      { value: ownerName, type: "name" },
      { value: email, type: "email" },
    ];
    if (validateInputs(inputs)) {
      const signup = await managerEnrollment({ Name: ownerName, Email: email });
      if (signup.state) {
        sessionStorage.setItem(
          "setPassworkAPI",
          signup.value.data.passwordLink
        );
        window.alert("Manager enrolled successfully! set your password");
        const newTab: Window = window.open("", "_blank") as Window;
        newTab.location.href = "/email";
        setEmail("");
        setOwnerName("");
      }
    } else {
      window.alert("Invalid inputs format, please check your data!");
    }
  };

  useEffect(() => {
    checkButtonEnable();
    // eslint-disable-next-line
  }, [ownerName, carId, email]);

  return {
    ownerName,
    setOwnerName,
    carId,
    setCarId,
    email,
    setEmail,
    handleRegistration,
    buttonEnable,
    handleManagerEnrollment,
    valid,
  };
};

export default useRegistration;
