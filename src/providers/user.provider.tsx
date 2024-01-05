import React, { useEffect, useState } from 'react'
import { UserNS } from '../typess/user.type';

interface IState {
    setUser?: React.Dispatch<React.SetStateAction<UserNS.User | undefined>>,
    user?: UserNS.User;
}
export const UserContext: React.Context<IState> = React.createContext({});

interface IPopupParams {
    children: React.ReactNode
}

/**
 * @param {{
*  children: React.ReactNode;
* }} props Component props
*/
const UserProvider = (props: IPopupParams) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user || {}))
    }, [user])

    return (
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider