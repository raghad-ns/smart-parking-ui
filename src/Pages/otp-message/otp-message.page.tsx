import React from 'react'
import PopUp from '../../components/core/popup/popup.component'
import { decryptMessage } from '../../utils/AESencryption.util';

const OTPMessage = () => {
    const otp = decryptMessage(
        sessionStorage.getItem("otp-code") || "",
        decryptMessage(
            sessionStorage.getItem("sessionKey") || "",
            process.env.REACT_APP_SECRET_KEY || ""
        ) as string
    ) as string;
    sessionStorage.removeItem('otp-code')
    return (
        <div>
            <PopUp>
                <h1>Transaction code is:</h1>
                <h1>{otp}</h1>
                <h1>Enter this code to complete your transaction.</h1>
            </PopUp>
        </div>
    )
}

export default OTPMessage