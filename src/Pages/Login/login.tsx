import { useState } from "react";
import "./login.scss"; // Import your SCSS module
import { InputAdornment } from "@mui/material";
import { CarRental, Email, Key } from "@mui/icons-material";
const Login = () => {
  const [carId, setCarId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelection = (role: string) => {
    console.log(role);

    setSelectedRole(role);
  };
  if (selectedRole === null) {
    setSelectedRole("user");
  }

  return (
    <div className="login-page">
      <div className="role-selection">
        <button
          className={`role-button ${selectedRole === "user" ? "active" : ""}`}
          onClick={() => handleRoleSelection("user")}
        >
          User
        </button>
        <button
          className={`role-button ${
            selectedRole === "manager" ? "active" : ""
          }`}
          onClick={() => handleRoleSelection("manager")}
        >
          Manager
        </button>
      </div>
      {selectedRole === "user" && (
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
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button className="sign-in-button">Sign In</button>
          <span className="dont-have-account">
            Don't have an account?<a href="/signup">Sign-up</a>
          </span>
        </div>
      )}
      {selectedRole === "manager" && (
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button className="sign-in-button">Sign In</button>
          <span className="dont-have-account">
            Don't have an account?<a href="/signup">Sign-up</a>
          </span>
        </div>
      )}
    </div>
  );
};

export default Login;
