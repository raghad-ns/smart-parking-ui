import React from "react";
import { InputAdornment } from "@mui/material";
import { Person, CarRental, Email } from "@mui/icons-material";
import "./register.scss";

import useRegistration from '../../hooks/registration.hook';

const Register = () => {
  const {
    ownerName,
    setOwnerName,
    carId,
    setCarId,
    email,
    setEmail,
    handleRegistration,
    buttonEnable,
  } = useRegistration('car');

  return (
    <div className="page-wrapper">
      <div className="register-form form-wrapper">
        <div className='form-title'><h1>Car enrollment</h1></div>
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
        <button
          disabled={!buttonEnable}
          onClick={handleRegistration}
          className={buttonEnable ? '' : 'disabled'}
        >Register</button>
      </div>
    </div>
  );
};

export default Register;
