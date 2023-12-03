import React, { useState } from "react";
import { InputAdornment } from "@mui/material";
import { Person, CarRental, Email } from "@mui/icons-material";
import "./register.scss";

const Register = () => {
  const [ownerName, setOwnerName] = useState<string>("");
  const [carId, setCarId] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleRegistration = () => {
    console.log("Owner Name:", ownerName);
    console.log("Car ID:", carId);
    console.log("Email:", email);
  };

  return (
    <div className="register-form">
      <div className="input-group">
        <span>
          <InputAdornment position="start">
            <Person className="icons" />
          </InputAdornment>
        </span>
        <input
          type="text"
          id="ownerName"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="Owner-Name"
        />
      </div>
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
      <button onClick={handleRegistration}> Register</button>
    </div>
  );
};

export default Register;
