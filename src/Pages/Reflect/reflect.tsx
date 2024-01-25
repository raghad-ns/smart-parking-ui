import { InputAdornment } from "@mui/material";
import { Person, LocalPhoneOutlined, PaidOutlined, VisibilityOff, RemoveRedEye } from "@mui/icons-material"
import './reflect.scss'
import { useReflect } from "../../hooks/refelct.hook";
import { useState } from "react";

const Reflect = () => {
    const { owner, phone, amount, password, confirmPassword, handleAddReflect } = useReflect()
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<boolean>(false)
    return (
        <div className="page-wrapper">
            <div className="reflect-page form-wrapper">
                <div className="input-group">
                    <span>
                        <InputAdornment position="start">
                            <Person className='icons' />
                        </InputAdornment>
                    </span>
                    <input type="text" id="owner" value={owner.value} onChange={(e) => owner.setState(e.target.value)} placeholder="Owner" />
                </div>
                <div className="input-group">
                    <span>
                        <InputAdornment position="start">
                            <LocalPhoneOutlined className='icons' />
                        </InputAdornment>
                    </span>
                    <input type="text" id="phone" value={phone.value} onChange={(e) => phone.setState(e.target.value)} placeholder="Phone Number" />
                </div>
                <div className="input-group">
                    <span>
                        <InputAdornment position="start">
                            <button className="invisible" onClick={() => setPasswordVisibility(!passwordVisibility)}>
                                {passwordVisibility ? <VisibilityOff className="icons" /> : <RemoveRedEye className="icons" />}
                            </button>
                        </InputAdornment>
                    </span>
                    <input
                        type={passwordVisibility ? "text" : "password"}
                        id="password"
                        value={password.value}
                        onChange={(e) => password.setState(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <div className="input-group">
                    <span>
                        <InputAdornment position="start">
                            <button className="invisible" onClick={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}>
                                {confirmPasswordVisibility ? <VisibilityOff className="icons" /> : <RemoveRedEye className="icons" />}
                            </button>
                        </InputAdornment>
                    </span>
                    <input
                        type={confirmPasswordVisibility ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword.value}
                        onChange={(e) => confirmPassword.setState(e.target.value)}
                        placeholder="Confirm-Password"
                    />
                </div>
                <div className="input-group">
                    <span>
                        <InputAdornment position="start">
                            <PaidOutlined className='icons' />
                        </InputAdornment>
                    </span>
                    <input type="text" id="amount" value={amount.value} onChange={(e) => amount.setState(e.target.value)} placeholder="Amount" />
                </div>
                <button onClick={handleAddReflect}>Add Account</button>
            </div>
        </div>
    )
}

export default Reflect;