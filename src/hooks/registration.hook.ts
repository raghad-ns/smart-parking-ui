import { useEffect, useState } from "react";
import { managerEnrollment, signupService } from "../services/user.service";
import { validateInputs } from "../utils/utils";
import useNotification from "./notification.hook";

const useRegistration = (type: "car" | "manager") => {
  const [ownerName, setOwnerName] = useState<string>("");
  const [carId, setCarId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [buttonEnable, setButtonEnable] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(true);
  const { setNotification } = useNotification();

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
        const identifier = signup.value.data.passwordLink.substring(
          signup.value.data.passwordLink.indexOf("set-password") +
            "set-password".length
        );
        setNotification({
          message:
            "Car added successfully! set account's password for activation",
          status: "success",
        });
        // window.alert("Car added successfully! set your password");
        // const newTab: Window = window.open("", "_blank") as Window;
        // newTab.location.href = "/email";
        window.open(`/email/User${identifier}`, "_blank");
        setCarId("");
        setEmail("");
        setOwnerName("");
      } else if (signup.state === 403) {
        setNotification({
          message: "You don't have the permission to modify this resource!",
          status: "error",
        });
        // window.alert("You don't have the permission to modify this resource");
      } else {
        setNotification({
          message: "Something went wrong, please try again!",
          status: "error",
        });
        // window.alert("Something went wrong, please try again!");
      }
    } else {
      setNotification({
        message: "Invalid input format, please check it out!",
        status: "error",
      });
      // window.alert("Invalid inputs format, please check your data!");
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
        const identifier = signup.value.data.passwordLink.substring(
          signup.value.data.passwordLink.indexOf("set-manager-password") +
            "set-manager-password".length
        );
        setNotification({
          message:
            "Manager enrolled successfully! set account's password for activation",
          status: "success",
        });
        // window.alert("Manager enrolled successfully! set your password");
        // const newTab: Window = window.open("", "_blank") as Window;
        // newTab.location.href = "/email";
        window.open(`/email/Manager${identifier}`, "_blank");
        setEmail("");
        setOwnerName("");
      }
    } else {
      setNotification({
        message: "Invalid input format, please check it out!",
        status: "error",
      });
      // window.alert("Invalid inputs format, please check your data!");
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
