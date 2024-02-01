import { useState } from "react";
import { chargeWallet } from "../services/wallet.service";
import { decryptMessage, encryptMessage } from "../utils/AESencryption.util";
import { useNavigate } from "react-router-dom";
import { validateInputs } from "../utils/utils";

export const useWallet = () => {
  const [carId, setCarId] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCharge = async () => {
    if (
      validateInputs([
        { value: carId, type: "carId" },
        { value: password, type: "password" },
        { value: amount, type: "number" },
        { value: phone, type: "mobileNo" },
      ])
    ) {
      try {
        const transaction = await chargeWallet({
          carId,
          password,
          mobileNo: phone,
          amount: Number(amount),
        });
        if (transaction.state) {
          window.alert(
            "Transaction is valid, please check your phone, enter sent OTP"
          );
          sessionStorage.setItem(
            "otp-code",
            encryptMessage(
              transaction.value.data?.OTP || "",
              decryptMessage(
                sessionStorage.getItem("sessionKey") || "",
                process.env.REACT_APP_SECRET_KEY || ""
              ) as string
            ) as string
          );
          sessionStorage.setItem(
            "transaction-id",
            encryptMessage(
              transaction.value.data?.ID || "",
              decryptMessage(
                sessionStorage.getItem("sessionKey") || "",
                process.env.REACT_APP_SECRET_KEY || ""
              ) as string
            ) as string
          );
          navigate("/otp");
          const newTab: Window = window.open("", "_blank") as Window;
          newTab.location.href = "/otp-message";
        } else {
          window.alert("invalid credentials, please check your data");
        }
      } catch (error) {
        window.alert("Something went wrong, please try again!");
        setCarId("");
        setPhone("");
        setAmount("");
        setPassword("");
      }
    } else {
      window.alert("Invalid input format, please check it out!");
    }
  };
  return {
    carId,
    setCarId,
    password,
    setPassword,
    amount,
    setAmount,
    phone,
    setPhone,
    passwordVisibility,
    setPasswordVisibility,
    handleCharge,
  };
};
