import { useContext, useState } from "react";
import { signinService } from "../services/user.service";
import { IUser } from "../types/users.types";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/user.provider";
import useAesEncryption from "./AESencryption.hook";
import { validateInputs } from "../utils/utils";

const useSignin = () => {
  const [carId, setCarId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const { encryptMessage } = useAesEncryption();

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
        window.alert("logged in successfully!");
        // const encryptedToken = cryptoJS.AES.encrypt(
        //   signin.value.data?.token,
        //   process.env.SECRET_KEY as string
        // );
        // console.log("token: ", signin.value.data?.token);
        console.log(
          "encrypted token: ",
          encryptMessage(signin.value.data?.token)
        );
        sessionStorage.setItem("token", signin.value.data?.token);
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
