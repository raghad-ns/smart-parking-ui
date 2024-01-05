import { useContext, useState } from "react";
import { signinService } from "../services/user.service";
import { IUser } from "../types/users.types";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/user.provider";
import { validateInputs } from "../utils/utils";
import {
  decryptMessage,
  encryptMessage,
  generateRandomKey,
} from "../utils/AESencryption.util";

const useSignin = () => {
  const [carId, setCarId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<string | null>("user");

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
  };
  if (selectedRole === null) {
    setSelectedRole("user");
  }

  const handleSignin = async () => {
    const payload: IUser =
      selectedRole === "user" ? { carId, password } : { email, password };
    const inputs = [];
    inputs.push({ value: password, type: "password" });
    payload.carId && inputs.push({ value: carId, type: "carId" });
    payload.email && inputs.push({ value: email, type: "email" });
    const validInputs = validateInputs(inputs);
    if (validInputs) {
      const signin = await signinService(payload, selectedRole || "");
      if (signin.state) {
        generateRandomKey("sessionKey");
        window.alert("logged in successfully!");
        sessionStorage.setItem(
          "token",
          encryptMessage(
            signin.value.data?.token || "",
            decryptMessage(
              sessionStorage.getItem("sessionKey") || "",
              process.env.REACT_APP_SECRET_KEY || ""
            ) as string
          ) as string
        );
        userContext.setUser && userContext?.setUser(signin.value.data.car);
        navigate("/home");
      } else {
        window.alert("Incorrect login credentials, please try agein!");
      }
    } else {
      window.alert("Invalid input format, please check the values you entered");
    }
  };
  return {
    carId: {
      value: carId,
      setState: setCarId,
    },
    email: {
      value: email,
      setState: setEmail,
    },
    password: {
      value: password,
      setState: setPassword,
    },
    selectedRole: {
      value: selectedRole,
      setState: setSelectedRole,
    },
    handleRoleSelection,
    handleSignin,
  };
};

export default useSignin;
