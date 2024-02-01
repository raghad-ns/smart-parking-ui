import React from 'react'
import './header.scss'
import logo from '../../../assets/ps-logo.png';
import { ExitToApp, AccountCircle } from '@mui/icons-material'
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
                        {user.user?.id && <span className='user-info'>
                            <span>
                                <AccountCircle fontSize='large' className='user-avatar' />
                            </span>
                            <span className='user-name'>{user.user.owner}</span>
                        </span>}
                        <button className='signoutIcon' onClick={(handleSignout)}>
                            <ExitToApp fontSize='large' />
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header