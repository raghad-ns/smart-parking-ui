import { useState } from "react";
import { signinService } from "../services/user.service";
import { IUser } from "../types/users.types";

const useSignin = () => {
  const [carId, setCarId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
  };
  if (selectedRole === null) {
    setSelectedRole("user");
  }

  const handleSignin = () => {
    const payload: IUser =
      selectedRole === "user" ? { carId, password } : { email, password };
    signinService(payload, selectedRole || "")
      .then((response: Response) => {
        window.alert("logged in successfully!");
      })
      .catch((error) => {
        console.error("Error message: ", error);
      });
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
