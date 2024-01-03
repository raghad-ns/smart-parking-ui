import { useContext, useState } from "react";
import { signinService } from "../services/user.service";
import { IUser } from "../types/users.types";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/user.provider";

const useSignin = () => {
  const [carId, setCarId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
  };
  if (selectedRole === null) {
    setSelectedRole("user");
  }

  const handleSignin = async () => {
    const payload: IUser =
      selectedRole === "user" ? { carId, password } : { email, password };
    const signin = await signinService(payload, selectedRole || "");
    if (signin.state) {
      window.alert("logged in successfully!");
      console.log("signin response: ", signin.value);
      sessionStorage.setItem("token", signin.value.data?.token);
      userContext.setUser && userContext?.setUser(signin.value.data.car);
      navigate("/home");
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
