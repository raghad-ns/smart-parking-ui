import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../services/signup.service";

const useRegistration = () => {
  const [ownerName, setOwnerName] = useState<string>("");
  const [carId, setCarId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [buttonEnable, setButtonEnable] = useState<boolean>(false);
  const navigate = useNavigate();

  const checkButtonEnable = () => {
    setButtonEnable(ownerName !== "" && carId !== "" && email !== "");
  };

  const handleRegistration = () => {
    // Handle registration logic here, e.g., sending data to server or validating inputs
    signupService({ ownerName, carId, email })
      .then((res) => {
        if (res.status === 201) {
          window.alert("Car added successfylly!");
          navigate("/home");
        }
      })
      .catch((error: ErrorEvent) => console.error("Error message: ", error));
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
