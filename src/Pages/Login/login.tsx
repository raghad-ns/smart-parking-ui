import "./login.scss"; // Import your SCSS module
import { InputAdornment } from "@mui/material";
import { CarRental, Email, Key } from "@mui/icons-material";
import useSignin from "../../hooks/signin.hook";
import { ViewSideManContext } from "../../providers/view-side-man.provider";
import React from "react";

const Login = () => {
  const viewSideManContext = React.useContext(ViewSideManContext)
  React.useEffect(() => {
    viewSideManContext.setViewSideMan && viewSideManContext.setViewSideMan(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const {
    carId,
    email,
    password,
    selectedRole,
    handleRoleSelection,
    handleSignin,
  } = useSignin();

  return (
    <div className="page-wrapper">
      <div className="login-page form-wrapper">
        <div className="role-selection">
          <button
            className={`role-button ${selectedRole.value === "user" ? "active" : ""}`}
            onClick={() => handleRoleSelection("user")}
          >
            User
          </button>
          <button
            className={`role-button ${selectedRole.value === "manager" ? "active" : ""
              }`}
            onClick={() => handleRoleSelection("manager")}
          >
            Manager
          </button>
        </div>
        {selectedRole.value === "user" && (
          <div className="user-login">
            <div className="input-group">
              <input
                type="text"
                id="carId"
                value={carId.value}
                onChange={(e) => carId.setState(e.target.value)}
                placeholder="Car-ID"
              />
              <span>
                <InputAdornment position="start">
                  <CarRental className="icons" />
                </InputAdornment>
              </span>
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                className="input-login password-input"
                value={password.value}
                onChange={(e) => password.setState(e.target.value)}
                placeholder="Password"
              />
              <span>
                <InputAdornment position="start">
                  <Key className="icons" />
                </InputAdornment>
              </span>
            </div>
            <button className="button sign-in-button" type="submit" onClick={handleSignin}>Sign In</button>
          </div>
        )}
        {selectedRole.value === "manager" && (
          <div className="manager-login">
            <div className="input-group">

              <input
                type="email"
                id="email"
                value={email.value}
                onChange={(e) => email.setState(e.target.value)}
                placeholder="Email"
              />
              <span>
                <InputAdornment position="start">
                  <Email className="icons" />
                </InputAdornment>
              </span>
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                className="input-login password-input"
                value={password.value}
                onChange={(e) => password.setState(e.target.value)}
                placeholder="Password"
              />
              <span>
                <InputAdornment position="start">
                  <Key className="icons" />
                </InputAdornment>
              </span>
            </div>
            <button className="button sign-in-button" type="submit" onClick={() => handleSignin()}>Sign In</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
