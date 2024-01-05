import React, { useEffect, useState } from 'react'
import { UserNS } from '../typess/user.type';
// import { decryptMessage, encryptMessage, generateRandomKey } from '../utils/AESencryption.util';

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
    // generateRandomKey("userKey");

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user") || '{}')
        //     JSON.parse(decryptMessage(
        //     sessionStorage.getItem("user") || "",
        //     decryptMessage(
        //         sessionStorage.getItem("userKey") || "",
        //         process.env.REACT_APP_SECRET_KEY || ""
        //     ) as string
        // ) || '{}')
    );

    useEffect(() => {
        sessionStorage.setItem(
            "user",
            JSON.stringify(user)
            // encryptMessage(
            //     JSON.stringify(user) || "",
            //     decryptMessage(
            //         sessionStorage.getItem("sessionKey") || "",
            //         process.env.REACT_APP_SECRET_KEY || ""
            //     ) as string
            // ) as string
        );
    }, [user])

    return (
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider