import { useContext, useEffect, useState } from "react";
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
import { WalletBalanceContext } from "../providers/wallet-balance.provider";

const useSignin = () => {
  const [carId, setCarId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const walletBalanceContext = useContext(WalletBalanceContext);

  const [selectedRole, setSelectedRole] = useState<string | null>("user");

  useEffect(() => {
    if (userContext.user?.carID) {
      window.alert("you are already signed in");
      navigate("/home");
    }
    // eslint-disable-next-line
  }, []);

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
        const user = {
          carID: signin.value.data.carID,
          owner: signin.value.data.owner,
          email: signin.value.data.email,
          wallet: signin.value.data.wallet,
          role: signin.value.data.role,
          connection: signin.value.data.connection,
        };
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
        userContext.setUser && userContext?.setUser(user);
        userContext.user?.role?.roleName !== "Manager" &&
          walletBalanceContext.updateWalletBalance &&
          walletBalanceContext.updateWalletBalance();
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
