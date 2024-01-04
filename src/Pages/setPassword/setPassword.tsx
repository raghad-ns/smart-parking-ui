import React, { useState } from "react";
import "./setPassword.scss";
import { InputAdornment } from "@mui/material";
import { Key } from "@mui/icons-material";
import { passwordSetService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { validateInputs } from "../../utils/utils";

const SetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate()
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const handlePasswordSetting = async () => {
    const inputs = [
      { value: password, type: "password" },
      { value: confirmPassword, type: "password" }
    ]
    if (validateInputs(inputs)) {
      const setPassword = await passwordSetService(password, confirmPassword)
      if (setPassword.state) {
        window.alert('password set successfully!')
        navigate('/info', { replace: true })
      } else {
        window.alert('invalid password!')
      }
    } else {
      window.alert('Password must be at least 8 characters containing digits, special symbols, upper and lower case letters')
    }
  }
  return (
    <div className="set-form">
      <div className="input-group">
        <span>
          <InputAdornment position="start">
            <Key className="icons" />
          </InputAdornment>
        </span>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div className="input-group">
        <span>
          <InputAdornment position="start">
            <Key className="icons" />
          </InputAdornment>
        </span>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm-Password"
        />
      </div>
      <button onClick={handlePasswordSetting}> Set </button>
    </div>
  );
};

export default SetPassword;
