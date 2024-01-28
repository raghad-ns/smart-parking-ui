import React from 'react'
import './header.scss'
import logo from '../../../ps-logo.png';
import { ExitToApp } from '@mui/icons-material'
import { useHeader } from '../../../hooks/header.hook';
import { useNavigate } from 'react-router';

const Header = () => {
    const { user, handleSignout } = useHeader()
    const navigate = useNavigate()
    return (
        <div className='nav-bar' style={{ width: '100%' }}>
            <div className='headerWrapper'>
                <img className="logo" src={logo} alt="Logo" onClick={e => navigate('/')} />
                {user.user?.id &&
                    <div className='user-data'>
                        <button className='signoutIcon' onClick={(handleSignout)}>
                            <ExitToApp fontSize='large' />
                        </button>
                    </div>
                }
            </div>
            {/* <div className='info-bar'>
                {user.user?.id && <span className='user-name'>{user.user.owner}</span>}
            </div> */}
        </div>
    )
}

export default Header