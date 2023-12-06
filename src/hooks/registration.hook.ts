import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../services/user.service";

const useRegistration = () => {
  const [ownerName, setOwnerName] = useState<string>("");
  const [carId, setCarId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [buttonEnable, setButtonEnable] = useState<boolean>(false);
  const navigate = useNavigate();

  const checkButtonEnable = () => {
    setButtonEnable(ownerName !== "" && carId !== "" && email !== "");
  };

  const handleRegistration = async () => {
    // Handle registration logic here, e.g., sending data to server or validating inputs
    const signup = await signupService({ ownerName, carId, email });
    if (signup.state) {
      console.log("passwordLink: ", signup.value.data.passwordLink);
      sessionStorage.setItem("setPassworkAPI", signup.value.data.passwordLink);
      window.alert("Car added successfylly! set your password");
      navigate("/set-password");
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
