import React from 'react'
import PopUp from '../../components/core/popup/popup.component'
import { useParams } from 'react-router-dom'

const EmailSimulator = () => {
    const { role, id, token } = useParams()
    return (
        <div>
            <PopUp>
                <h1>Click this link to set your password!</h1>
                <button className='button' onClick={() => {
                    // const newTab: Window = window.open('', '_blank') as Window;
                    // newTab.location.href = '/set-password';
                    window.open(`../../../set-password/${role}/${id}/${token}`, '_blank')
                }}>Set password</button>
                <h3>You have 5 minutes only</h3>
                {/* <a href="http://localhost:3000/set-password">Password reset</a> */}
            </PopUp>
        </div>
    )
}

export default EmailSimulator