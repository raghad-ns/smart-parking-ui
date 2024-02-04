import React from 'react'
import './access-denied.scss'
import NoAccess from '../../assets/access-denied.png'
import { useNavigate } from 'react-router'

const AccessDenied = () => {
    const navigate = useNavigate()
    return (
        <div className='access-denied-wrapper'>
            <img src={NoAccess} alt='access-denied' className='access-denied-img'/>
            <div className='no-access-info'>
                <h1>You don't have access to this page</h1>
                <div className="no-access-buttons">
                    <button className='button' onClick={() => navigate(-1)}>Go back</button>
                    <button className='button' onClick={() => navigate('/home')}>Go home</button>
                </div>
            </div>
        </div>
    )
}

export default AccessDenied