import React from 'react'
import PopUp from '../../components/core/popup/popup.component'

const EmailSimulator = () => {
    return (
        <div>
            <PopUp>
                <h1>Click this link to set your password!</h1>
                <button onClick={() => {
                    const newTab: Window = window.open('', '_blank') as Window;
                    newTab.location.href = '/set-password';
                }}>Set password</button>
                {/* <a href="http://localhost:3000/set-password">Password reset</a> */}
            </PopUp>
        </div>
    )
}

export default EmailSimulator