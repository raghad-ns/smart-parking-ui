import React, { useEffect, useState } from "react";
import "./setPassword.scss";
import { InputAdornment } from "@mui/material";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import { passwordSetService } from "../../services/user.service";
import { useNavigate, useParams } from "react-router-dom";
import { validateInputs } from "../../utils/utils";
import { ViewSideManContext } from "../../providers/view-side-man.provider";
import useNotification from "../../hooks/notification.hook";

const SetPassword = () => {
  const viewSideManContext = React.useContext(ViewSideManContext)
  React.useEffect(() => {
    viewSideManContext.setViewSideMan && viewSideManContext.setViewSideMan(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { role, id, token } = useParams()
  const [password, setPassword] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [valid, setValid] = useState<boolean>(true)
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<boolean>(false)
  const [buttonEnable, setButtonEnable] = useState<boolean>(false)
  const navigate = useNavigate()
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { setNotification } = useNotification()

  const checkButtonEnable = () => {
    setButtonEnable(
      (password !== "" && confirmPassword !== "")
    );
  };
  useEffect(() => {
    checkButtonEnable()
    // eslint-disable-next-line
  }, [password, confirmPassword])
  const handlePasswordSetting = async () => {
    const inputs = [
      { value: password, type: "password" },
      { value: confirmPassword, type: "password" }
    ]
    if (validateInputs(inputs)) {
      setValid(true)
      if (password === confirmPassword) {
        const setPassword = await passwordSetService(password, confirmPassword, id as string, token as string, role as string)
        if (setPassword.state) {
          setNotification({ message: 'Password set successfully!', status: 'success' })
          // window.alert('password set successfully!')
          navigate('/info', { replace: true })
        } else {
          setNotification({ message: 'Invalid password!', status: 'error' })
          // window.alert('invalid password!')
        }
      } else {
        setNotification({ message: 'Password confirmation does not match the password you entered!', status: 'error' })
        // window.alert('Password confirmation does not match the password you entered!')
      }
    } else {
      setNotification({
        message: 'Password must be at least 8 characters containing digits, special symbols except \\ and /, upper and lower case letters', status: 'info'
      })
      // window.alert('Password must be at least 8 characters containing digits, special symbols, upper and lower case letters')
      setValid(false)
    }
  }
  return (
    <div className="page-wrapper">
      <div className="set-form form-wrapper">
        <div className='form-title'><h1>Set your password</h1></div>
        <div className="input-group-pass">
          <span>
            <InputAdornment position="start">
              <button className="invisible button" onClick={() => setPasswordVisibility(!passwordVisibility)}>
                {passwordVisibility ? <VisibilityOff className="eye-pass" /> : <RemoveRedEye className="eye-pass" />}
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
        <div className="input-group-pass">
          <span>
            <InputAdornment position="start">
              <button className="invisible button" onClick={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}>
                {confirmPasswordVisibility ? <VisibilityOff className="eye-pass" /> : <RemoveRedEye className="eye-pass" />}
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
          <span className={valid ? "desc" : "desc invalid"}>Password must be at least 8 characters includeing digits, symbols other than '/' and '\', upper and lower case letters</span>
        </div>
        <button
          onClick={handlePasswordSetting}
          disabled={!buttonEnable}
          style={{ width: '320px' }}
          className={buttonEnable ? 'button' : 'disabled button'}> Set </button>
      </div>
    </div>
  );
};

export default SetPassword;
