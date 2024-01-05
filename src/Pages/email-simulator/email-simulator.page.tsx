import React from 'react'
import PopUp from '../../components/core/popup/popup.component'

const EmailSimulator = () => {
    return (
        <div>
            <PopUp>
                <h1>Click this link to set your password!</h1>
                <a href="http://localhost:3000/set-password">Password reset</a>
            </PopUp>
        </div>
    )
}

export default EmailSimulator