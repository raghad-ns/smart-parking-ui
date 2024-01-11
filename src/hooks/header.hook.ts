import React from "react";
import { UserContext } from "../providers/user.provider";
import { useNavigate } from "react-router-dom";
import { signoutService } from "../services/user.service";

export const useHeader = () => {
  const user = React.useContext(UserContext);
  const navigate = useNavigate();
  const handleSignout = async () => {
    console.log("Signing out... ");
    const signout = await signoutService();
    if (signout.state) {
      user.setUser && user.setUser({});
      sessionStorage.clear();
      navigate("/signin");
      window.alert("Signed out successfully!");
    } else {
      window.alert("Something went wrong!");
    }
  };

  return { handleSignout, user };
};
