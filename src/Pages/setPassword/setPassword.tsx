import React, { useState } from "react";
import "./setPassword.scss";
import { InputAdornment } from "@mui/material";
import { Key } from "@mui/icons-material";
import { passwordSetService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";

const SetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate()
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const handlePasswordSetting = async () => {
    const setPassword = await passwordSetService(password, confirmPassword)
    if (setPassword.state) {
      window.alert('password set successfully!')
      navigate('/info', { replace: true })
    } else {
      window.alert('invalid password!')
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
