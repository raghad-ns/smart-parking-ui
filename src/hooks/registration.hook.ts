import { useEffect, useState } from "react";
import { signupService } from "../services/user.service";
import { validateInputs } from "../utils/utils";

const useRegistration = () => {
  const [ownerName, setOwnerName] = useState<string>("");
  const [carId, setCarId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [buttonEnable, setButtonEnable] = useState<boolean>(false);

  const checkButtonEnable = () => {
    setButtonEnable(ownerName !== "" && carId !== "" && email !== "");
  };

  const handleRegistration = async () => {
    // Handle registration logic here, e.g., sending data to server or validating inputs
    const inputs = [
      { value: ownerName, type: "name" },
      { value: carId, type: "carId" },
      { value: email, type: "email" },
    ];
    if (validateInputs(inputs)) {
      const signup = await signupService({ ownerName, carId, email });
      if (signup.state) {
        sessionStorage.setItem(
          "setPassworkAPI",
          signup.value.data.passwordLink
        );
        window.alert("Car added successfully! set your password");
        const newTab: Window = window.open("", "_blank") as Window;
        newTab.location.href = "/email";
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
  };
};

export default useRegistration;
