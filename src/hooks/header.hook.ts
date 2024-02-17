import React from "react";
import { UserContext } from "../providers/user.provider";
import { useNavigate } from "react-router-dom";
import { signoutService } from "../services/user.service";
import useNotification from "./notification.hook";

export const useHeader = () => {
  const user = React.useContext(UserContext);
  const { setNotification } = useNotification();
  const navigate = useNavigate();
  const handleSignout = async () => {
    const signout = await signoutService();
    if (signout.state) {
      user.setUser && user.setUser({});
      sessionStorage.clear();
      navigate("/signin");
      setNotification({
        message: "Signed out successfully!",
        status: "success",
      });

      // window.alert("Signed out successfully!");
    } else {
      setNotification({ message: "Something went wrong!", status: "error" });
      // window.alert("Something went wrong!");
    }
  };

  return { handleSignout, user };
};
