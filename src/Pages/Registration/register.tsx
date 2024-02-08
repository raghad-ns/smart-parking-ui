import React from "react";
import { InputAdornment } from "@mui/material";
import { Person, CarRental, Email } from "@mui/icons-material";
import "./register.scss";

import useRegistration from '../../hooks/registration.hook';
import { ViewSideManContext } from "../../providers/view-side-man.provider";

const Register = () => {
  const viewSideManContext = React.useContext(ViewSideManContext)
  React.useEffect(() => {
    viewSideManContext.setViewSideMan && viewSideManContext.setViewSideMan(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const {
    ownerName,
    setOwnerName,
    carId,
    setCarId,
    email,
    setEmail,
    handleRegistration,
    buttonEnable,
    valid
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
        <span className={valid ? "desc" : "desc invalid"}>car id should begin with two uppercase letters followed by dash and 3-4 digits</span>
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
