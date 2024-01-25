import React from "react";
import { InputAdornment } from "@mui/material";
import { Person, Email } from "@mui/icons-material";
import "./manager-enrollment.scss";

import useRegistration from '../../hooks/registration.hook';

const ManagerEnrollment = () => {
  const {
    ownerName,
    setOwnerName,
    email,
    setEmail,
    handleManagerEnrollment,
    buttonEnable,
  } = useRegistration('manager');

  return (
    <div className="page-wrapper">
      <div className="register-form form-wrapper">
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
            placeholder="Name"
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
          onClick={handleManagerEnrollment}
          className={buttonEnable ? '' : 'disabled'}
        >Enroll manager</button>
      </div>
    </div>
  );
};

export default ManagerEnrollment;
