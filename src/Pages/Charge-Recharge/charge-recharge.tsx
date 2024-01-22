import { useState } from "react";
import { InputAdornment } from "@mui/material";
import {
  DirectionsCarFilledOutlined,
  LocalPhoneOutlined,
  PaidOutlined,
  VisibilityOff,
  RemoveRedEye,
} from "@mui/icons-material";
import "./charge.scss";
import { validateInputs } from "../../utils/utils";
import { chargeWallet } from "../../services/wallet.service";
import { useNavigate } from "react-router-dom";
import { decryptMessage, encryptMessage } from "../../utils/AESencryption.util";

const Charge = () => {
  const [carId, setCarId] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const navigate = useNavigate()

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
          window.alert("Transaction is valid, please check your phone, enter sent OTP");
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
          navigate('/otp')
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
  return (
    <div className="charge-page">
      <div className="input-group">
        <span>
          <InputAdornment position="start">
            <DirectionsCarFilledOutlined className="icons" />
          </InputAdornment>
        </span>
        <input
          type="text"
          id="carId"
          value={carId}
          onChange={(e) => setCarId(e.target.value)}
          placeholder="Car ID"
        />
      </div>
      <div className="input-group">
        <span>
          <InputAdornment position="start">
            <LocalPhoneOutlined className="icons" />
          </InputAdornment>
        </span>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
        />
      </div>
      <div className="input-group">
        <span>
          <InputAdornment position="start">
            <PaidOutlined className="icons" />
          </InputAdornment>
        </span>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </div>
      <div className="input-group">
        <span>
          <InputAdornment position="start">
            <button className="invisible" onClick={() => setPasswordVisibility(!passwordVisibility)}>
              {passwordVisibility ? <VisibilityOff className="icons" /> : <RemoveRedEye className="icons" />}
            </button>
          </InputAdornment>
        </span>
        <input
          type={passwordVisibility ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>

      <button onClick={handleCharge}>Charge</button>
    </div>
  );
};

export default Charge;
