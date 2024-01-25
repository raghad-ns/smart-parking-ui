import React from 'react'
import './OTP.scss'
import { confirmTransaction } from '../../services/wallet.service';

const OTPForm = () => {
    const [code, setCode] = React.useState<string[]>(['', '', '', '', '', '']);

    const handleConfirmation = async () => {
        const otp = code.join('')
        const confirmation = await confirmTransaction(otp);
        if (confirmation.state) {
            confirmation.value.statusCode === 201
                ? window.alert("Transaction completed successfully")
                : window.alert("Incorrect code, transaction discarded!");
        } else {
            window.alert("Something went wrong, please try again!");
        }
    }

    return (
        <div className="page-wrapper">
            <div className="otp-form-wrapper form-wrapper">
                <div className="input-group">
                    {code.map((digit, index) => {
                        return (<input
                            key={index}
                            style={{ width: '30px', padding: '12px 8px', textAlign: 'center', margin: '0px 3px' }}
                            className='digit'
                            type="text"
                            value={digit}
                            onChange={e => {
                                setCode(oldCode =>
                                    oldCode.map((oldDigit, idx) =>
                                        idx === index && /^\d$/.test(e.target.value[e.target.value.length - 1])
                                            ? e.target.value[e.target.value.length - 1]
                                            : oldDigit
                                    ))
                            }}
                        />)
                    })}
                </div>
                <button style={{ width: '100%' }} onClick={handleConfirmation}>Submit</button>
            </div>
        </div>
    );
}

export default OTPForm