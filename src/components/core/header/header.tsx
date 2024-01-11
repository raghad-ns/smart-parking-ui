import React from 'react'
import './header.scss'
import logo from '../../../ps-logo.png';
import { ExitToApp } from '@mui/icons-material'
import { useHeader } from '../../../hooks/header.hook';

const Header = () => {
    const { user, handleSignout } = useHeader()
    return (
        <div className='headerWrapper'>
            <img className="logo" src={logo} alt="Logo" />
            {user &&
                <button className='signoutIcon' onClick={(handleSignout)}>
                    <ExitToApp fontSize='large' />
                </button>
            }
        </div>
    )
}

export default Header