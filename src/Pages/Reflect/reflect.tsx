import { InputAdornment } from "@mui/material";
import {
  Person,
  LocalPhoneOutlined,
  PaidOutlined,
  VisibilityOff,
  RemoveRedEye,
} from "@mui/icons-material";
import "./reflect.scss";
import { useReflect } from "../../hooks/refelct.hook";
import { useState } from "react";

const Reflect = () => {
  const { owner, phone, amount, password, confirmPassword, handleAddReflect, valid, buttonEnable } =
    useReflect();
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState<boolean>(false);
  return (
    <div className="page-wrapper">
      <div className="reflect-page form-wrapper">
        <div className="form-title">
          <h1>Create reflect wallet</h1>
        </div>
        <div className="input-group">
          <span>
            <InputAdornment position="start">
              <Person className="symbols" />
            </InputAdornment>
          </span>
          <input
            type="text"
            id="owner"
            value={owner.value}
            onChange={(e) => owner.setState(e.target.value)}
            placeholder="Owner"
          />
        </div>
        <div className="input-group">
          <span>
            <InputAdornment position="start">
              <LocalPhoneOutlined className="symbols" />
            </InputAdornment>
          </span>
          <input
            type="text"
            id="phone"
            value={phone.value}
            onChange={(e) => phone.setState(e.target.value)}
            placeholder="Phone Number"
          />
          <span className={valid ? "desc" : "desc invalid"}>phone number should be 05xxxxxxxxx</span>
        </div>
        <div className="input-group">
          <span>
            <InputAdornment position="start">
              <button
                className="invisible"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              >
                {passwordVisibility ? (
                  <VisibilityOff className="eye" />
                ) : (
                  <RemoveRedEye className="eye" />
                )}
              </button>
            </InputAdornment>
          </span>
          <input
            type={passwordVisibility ? "text" : "password"}
            id="password"
            value={password.value}
            onChange={(e) => password.setState(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="input-group">
          <span>
            <InputAdornment position="start">
              <button
                className="invisible"
                onClick={() =>
                  setConfirmPasswordVisibility(!confirmPasswordVisibility)
                }
              >
                {confirmPasswordVisibility ? (
                  <VisibilityOff className="eye" />
                ) : (
                  <RemoveRedEye className="eye" />
                )}
              </button>
            </InputAdornment>
          </span>
          <input
            type={confirmPasswordVisibility ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword.value}
            onChange={(e) => confirmPassword.setState(e.target.value)}
            placeholder="Confirm-Password"
          />
          <span className={valid ? "desc" : "desc invalid"}>password must be at least 8 characters includeing digits, symbols, upper and lower case letters</span>
        </div>
        <div className="input-group">
          <span>
            <InputAdornment position="start">
              <PaidOutlined className="symbols" />
            </InputAdornment>
          </span>
          <input
            type="text"
            id="amount"
            value={amount.value}
            onChange={(e) => amount.setState(e.target.value)}
            placeholder="Amount"
          />
        </div>
        <button
          onClick={handleAddReflect}
          disabled={!buttonEnable}
          className={buttonEnable ? '' : 'disabled'}>Add Account</button>
      </div>
    </div>
  );
};

export default Reflect;
