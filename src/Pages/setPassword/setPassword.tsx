import React, { useState } from "react";
import "./setPassword.scss";
import { InputAdornment } from "@mui/material";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import { passwordSetService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { validateInputs } from "../../utils/utils";

const SetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<boolean>(false)
  const navigate = useNavigate()
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const handlePasswordSetting = async () => {
    const inputs = [
      { value: password, type: "password" },
      { value: confirmPassword, type: "password" }
    ]
    if (validateInputs(inputs)) {
      if (password === confirmPassword) {
        const setPassword = await passwordSetService(password, confirmPassword)
        if (setPassword.state) {
          window.alert('password set successfully!')
          navigate('/info', { replace: true })
        } else {
          window.alert('invalid password!')
        }
      } else {
        window.alert('Password confirmation does not match the password you entered!')
      }
    } else {
      window.alert('Password must be at least 8 characters containing digits, special symbols, upper and lower case letters')
    }
  }
  return (
    <div className="page-wrapper">
      <div className="set-form form-wrapper">
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
        <div className="input-group">
          <span>
            <InputAdornment position="start">
              <button className="invisible" onClick={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}>
                {confirmPasswordVisibility ? <VisibilityOff className="icons" /> : <RemoveRedEye className="icons" />}
              </button>
            </InputAdornment>
          </span>
          <input
            type={confirmPasswordVisibility ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm-Password"
          />
        </div>
        <button onClick={handlePasswordSetting}> Set </button>
      </div>
    </div>
  );
};

export default SetPassword;
