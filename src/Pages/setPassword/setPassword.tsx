import React, { useState } from "react";
import "./setPassword.scss";
import { InputAdornment } from "@mui/material";
import { VpnKey, Key } from "@mui/icons-material";

const SetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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
      <button> Set </button>
    </div>
  );
};

export default SetPassword;
