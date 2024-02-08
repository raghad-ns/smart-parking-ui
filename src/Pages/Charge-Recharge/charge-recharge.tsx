import { InputAdornment } from "@mui/material";
import {
  DirectionsCarFilledOutlined,
  LocalPhoneOutlined,
  PaidOutlined,
  VisibilityOff,
  RemoveRedEye,
} from "@mui/icons-material";
import "./charge.scss";
import { useWallet } from "../../hooks/wallet.hook";
import { ViewSideManContext } from "../../providers/view-side-man.provider";
import React from "react";

const Charge = () => {
  const viewSideManContext = React.useContext(ViewSideManContext)
  React.useEffect(() => {
    viewSideManContext.setViewSideMan && viewSideManContext.setViewSideMan(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const {
    carId,
    setCarId,
    password,
    setPassword,
    amount,
    setAmount,
    phone,
    setPhone,
    passwordVisibility,
    setPasswordVisibility,
    handleCharge,
  } = useWallet()
  return (
    <div className="page-wrapper">
      <div className="charge-page form-wrapper">
        <div className='form-title'><h1>Charge car's wallet</h1></div>
        <div className="input-group">
          <span>
            <InputAdornment position="start">
              <DirectionsCarFilledOutlined className="symbols wallet-icon" />
            </InputAdornment>
          </span>
          <input
            type="text"
            id="carId"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
            placeholder="Car ID"
          />
        </div>
        <div className="input-group">
          <span>
            <InputAdornment position="start">
              <LocalPhoneOutlined className="symbols wallet-icon" />
            </InputAdornment>
          </span>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
        </div>
        <div className="input-group">
          <span>
            <InputAdornment position="start">
              <PaidOutlined className="symbols wallet-icon" />
            </InputAdornment>
          </span>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
        </div>
        <div className="input-group">
          <span>
            <InputAdornment position="start">
              <button className="invisible" onClick={() => setPasswordVisibility(!passwordVisibility)}>
                {passwordVisibility ? <VisibilityOff className="passsymbols" /> : <RemoveRedEye className="passsymbols" />}
              </button>
            </InputAdornment>
          </span>
          <input
            type={passwordVisibility ? "text" : "password"}
            id="password"
            value={password}
            style={{ width: "105%" }}            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button onClick={handleCharge} className="chargebutton">Charge</button>
      </div>
    </div>
  );
};

export default Charge;
