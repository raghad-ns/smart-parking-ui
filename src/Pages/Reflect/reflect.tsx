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
  const {
    owner,
    phone,
    amount,
    password,
    confirmPassword,
    handleAddReflect,
    valid,
    buttonEnable,
  } = useReflect();
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState<boolean>(false);
  return (
    <div className="page-wrapper reflect-wrapper">
      <div className="reflect-page form-wrapper">
        <div className="form-title">
          <h1>Create reflect wallet</h1>
        </div>
        <div className="first-row">
          <div className="input-group-reflect">
            <span>
              <InputAdornment position="start">
                <Person className="symbols-reflect" />
              </InputAdornment>
            </span>
            <input
              type="text"
              id="owner"
              className="input-reflect"
              value={owner.value}
              onChange={(e) => owner.setState(e.target.value)}
              placeholder="Owner"
            />
          </div>
          <div className="input-group-reflect">
            <span>
              <InputAdornment position="start">
                <LocalPhoneOutlined className="symbols-reflect" />
              </InputAdornment>
            </span>
            <input
              type="text"
              id="phone"
              className="input-reflect"
              value={phone.value}
              onChange={(e) => phone.setState(e.target.value)}
              placeholder="Phone Number"
            />
            <span className={valid ? "desc" : "desc invalid"}>
              phone number should be 05xxxxxxxxx
            </span>
          </div>
        </div>
        <div className="second-row">
          <div className="input-group-reflect">
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
              className="input-reflect"
              value={password.value}
              onChange={(e) => password.setState(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="input-group-reflect">
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
              className="input-reflect"
              type={confirmPasswordVisibility ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword.value}
              onChange={(e) => confirmPassword.setState(e.target.value)}
              placeholder="Confirm-Password"
            />
            <span className={valid ? "desc" : "desc invalid"}>
              password must be at least 8 characters includeing digits, symbols,
              upper and lower case letters
            </span>
          </div>
        </div>
        <div className="third-row">
          <div className="input-group-reflect">
            <span>
              <InputAdornment position="start">
                <PaidOutlined className="symbols-reflect" />
              </InputAdornment>
            </span>
            <input
              type="text"
              id="amount"
              className="input-reflect"
              value={amount.value}
              onChange={(e) => amount.setState(e.target.value)}
              placeholder="Amount"
            />
          </div>
          <button
            onClick={handleAddReflect}
            disabled={!buttonEnable}
            className={buttonEnable ? "reflect-button" : "disabled reflect-button"}
          >
            Add Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reflect;
