import React from 'react'
import './header.scss'
import logo from '../../../ps-logo.png';
import { ExitToApp } from '@mui/icons-material'
import { UserContext } from '../../../providers/user.provider';

const Header = () => {
    const user = React.useContext(UserContext)

    const handleSignout = () => {
        console.log('Signing out... ')
        user.setUser && user.setUser(undefined)
    }
    return (
        <div className='headerWrapper'>
            <img className="logo" src={logo} alt="Logo" />
            {user.user &&
                <button className='signoutIcon' onClick={(handleSignout)}>
                    <ExitToApp fontSize='large' />
                </button>
            }
        </div>
    )
}

export default Header