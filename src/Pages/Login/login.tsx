import "./login.scss"; // Import your SCSS module
import { InputAdornment } from "@mui/material";
import { CarRental, Email, Key } from "@mui/icons-material";
import useSignin from "../../hooks/signin.hook";

const Login = () => {
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
              <span>
                <InputAdornment position="start">
                  <CarRental className="icons" />
                </InputAdornment>
              </span>
              <input
                type="text"
                id="carId"
                value={carId.value}
                onChange={(e) => carId.setState(e.target.value)}
                placeholder="Car-ID"
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
                id="password"
                value={password.value}
                onChange={(e) => password.setState(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button className="sign-in-button" onClick={handleSignin}>Sign In</button>
          </div>
        )}
        {selectedRole.value === "manager" && (
          <div className="manager-login">
            <div className="input-group">
              <span>
                <InputAdornment position="start">
                  <Email className="icons" />
                </InputAdornment>
              </span>
              <input
                type="email"
                id="email"
                value={email.value}
                onChange={(e) => email.setState(e.target.value)}
                placeholder="Email"
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
                id="password"
                value={password.value}
                onChange={(e) => password.setState(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button className="sign-in-button" type="submit" onClick={() => handleSignin()}>Sign In</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
