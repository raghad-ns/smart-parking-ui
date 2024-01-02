import { useState } from "react";
import { InputAdornment } from "@mui/material";
import { Person, LocalPhoneOutlined, VpnKeyOutlined, PaidOutlined } from "@mui/icons-material"
import './reflect.scss'

const Reflect = () => {
    const [owner, setOwner] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm_password, setConfirm_password] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const handleAddReflect = () => {
        console.log("Owner: ", owner);
        console.log("Phone: ", phone);
        console.log("Password: ", password);
        console.log("Confirm Password: ", confirm_password);
        console.log("Amount: ", amount);

    }
    return (
        <div className="reflect-page">
            <div className="input-group">
                <span>
                    <InputAdornment position="start">
                        <Person className='icons' />
                    </InputAdornment>
                </span>
                <input type="text" id="owner" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" />
            </div>
            <div className="input-group">
                <span>
                    <InputAdornment position="start">
                        <LocalPhoneOutlined className='icons' />
                    </InputAdornment>
                </span>
                <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number"/>
            </div>
            <div className="input-group">
                <span>
                    <InputAdornment position="start">
                        <VpnKeyOutlined className='icons' />
                    </InputAdornment>
                </span>
                <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            </div>
            <div className="input-group">
                <span>
                    <InputAdornment position="start">
                        <VpnKeyOutlined className='icons' />
                    </InputAdornment>
                </span>
                <input type="text" id="confirm_password" value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)} placeholder="Confirm Password"/>
            </div>
            <div className="input-group">
                <span>
                    <InputAdornment position="start">
                        <PaidOutlined className='icons' />
                    </InputAdornment>
                </span>
                <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount"/>
            </div>
            <button onClick={handleAddReflect}>Add Account</button>
        </div>
    )
}

export default Reflect;