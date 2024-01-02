import { useState } from "react";
import { InputAdornment } from "@mui/material";
import { DirectionsCarFilledOutlined, LocalPhoneOutlined, VpnKeyOutlined, PaidOutlined } from "@mui/icons-material"
import './charge.scss'

const Charge = () => {
    const [carID, setCarId] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm_password, setConfirm_password] = useState<string>("");
    const handleCharge = () => {
        console.log("Car ID: ", carID);
        console.log("Phone: ", phone);
        console.log("Amount: ", amount);
        console.log("Password: ", password);
        console.log("Confirm Password: ", confirm_password);

    }
    return (
        <div className="charge-page">
            <div className="input-group">
                <span>
                    <InputAdornment position="start">
                        <DirectionsCarFilledOutlined className='icons' />
                    </InputAdornment>
                </span>
                <input type="text" id="carID" value={carID} onChange={(e) => setCarId(e.target.value)} placeholder="Car ID" />
            </div>
            <div className="input-group">
                <span>
                    <InputAdornment position="start">
                        <LocalPhoneOutlined className='icons' />
                    </InputAdornment>
                </span>
                <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
            </div>
            <div className="input-group">
                <span>
                    <InputAdornment position="start">
                        <PaidOutlined className='icons' />
                    </InputAdornment>
                </span>
                <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
            </div>
            <div className="input-group">
                <span>
                    <InputAdornment position="start">
                        < VpnKeyOutlined className='icons' />
                    </InputAdornment>
                </span>
                <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <div className="input-group">
                <span>
                    <InputAdornment position="start">
                        <VpnKeyOutlined className='icons' />
                    </InputAdornment>
                </span>
                <input type="text" id="confirm_password" value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)} placeholder="Confirm Password" />
            </div>

            <button onClick={handleCharge}>Charge</button>
        </div>
    )
}

export default Charge;