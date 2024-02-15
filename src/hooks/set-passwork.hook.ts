import { useState } from "react";
import useNotification from "./notification.hook";

const useSetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { setNotification } = useNotification();
  const handlePasswordSetting = () => {
    fetch(sessionStorage.getItem("setPassworkAPI") || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Password: password,
        Confirm_Password: confirmPassword,
      }),
    })
      .then((response) => {
        if (response.status === 200)
          setNotification({
            message: "Password set successfully.",
            status: "success",
          });
        else {
          setNotification({ message: "Invalid password!", status: "error" });
        }
      })
      .catch((error) => {
        console.error("Error message: ", error);
      });
  };
  return {
    password: {
      value: password,
      setState: setPassword,
    },
    confirmPassword: {
      value: confirmPassword,
      setState: setConfirmPassword,
    },
    handlePasswordSetting,
  };
};
export default useSetPassword;
