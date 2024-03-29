import React from 'react'
import './OTP.scss'
import { confirmTransaction } from '../../services/wallet.service';
import { useNavigate } from 'react-router';
import { WalletBalanceContext } from '../../providers/wallet-balance.provider';
import { ViewSideManContext } from '../../providers/view-side-man.provider';

const OTPForm = () => {
    const viewSideManContext = React.useContext(ViewSideManContext)
    React.useEffect(() => {
        viewSideManContext.setViewSideMan && viewSideManContext.setViewSideMan(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [code, setCode] = React.useState<string[]>(['', '', '', '', '', '']);
    const navigate = useNavigate()
    const walletBalanceContext = React.useContext(WalletBalanceContext)

    const handleConfirmation = async () => {
        const otp = code.join('')
        const confirmation = await confirmTransaction(otp);
        if (confirmation.state) {
            if (confirmation.value.statusCode === 201) {
                window.alert("Transaction completed successfully")
                walletBalanceContext.updateWalletBalance && walletBalanceContext.updateWalletBalance()
            } else {
                window.alert("Incorrect code, transaction discarded!");
            }
            navigate('/charge-wallet', { replace: true })
            sessionStorage.removeItem('transaction-id')
            sessionStorage.removeItem('otp-code')
        } else {
            window.alert("Something went wrong, please try again!");
        }
    }

    return (
        <div className="page-wrapper">
            <div className="otp-form-wrapper form-wrapper">
                <div className='form-title'><h1>Transaction verification code</h1></div>
                <div className="input-group">
                    {code.map((digit, index) => {
                        return (<input
                            key={index}
                            style={{ width: '45px', height: '30px', padding: '12px 8px', textAlign: 'center', margin: '0px 3px' }}
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
                <button className='button' style={{ width: '100%' }} onClick={handleConfirmation}>Submit</button>
            </div>
        </div>
    );
}

export default OTPForm