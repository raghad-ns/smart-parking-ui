import React, { useEffect, useState } from 'react'
import { UserNS } from '../typess/user.type';
import { WalletBalanceContext } from './wallet-balance.provider';
// import { decryptMessage, encryptMessage } from '../utils/AESencryption.util';
// import { decryptMessage, encryptMessage, generateRandomKey } from '../utils/AESencryption.util';

interface IState {
    setUser?: React.Dispatch<React.SetStateAction<UserNS.User | undefined | {}>>,
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

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user") || '{}')
        // const [user, setUser] = useState(JSON.parse(decryptMessage(
        //     sessionStorage.getItem("user") || "",
        //     decryptMessage(
        //         sessionStorage.getItem("userKey") || "",
        //         process.env.REACT_APP_SECRET_KEY || ""
        //     ) as string
        // ) || '{}')

    );
    const walletBalanceContext = React.useContext(WalletBalanceContext)

    useEffect(() => {
        console.log('user: ', user)
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
        walletBalanceContext.updateWalletBalance && walletBalanceContext.updateWalletBalance()
        // eslint-disable-next-line
    }, [user])

    return (
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider