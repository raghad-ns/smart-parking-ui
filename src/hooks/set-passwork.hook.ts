import { useState } from "react";

const useSetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
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
        if (response.status === 200) window.alert("password set successfully!");
        else {
          window.alert("invalid password!");
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
