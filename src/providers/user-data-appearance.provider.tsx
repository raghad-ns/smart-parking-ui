import React, { useState } from 'react'
// import { decryptMessage, encryptMessage, generateRandomKey } from '../utils/AESencryption.util';

interface IState {
    setUserDataAppearance?: React.Dispatch<React.SetStateAction<boolean>>,
    userDataAppearance?: boolean;
}
export const UserDataAppearanceContext: React.Context<IState> = React.createContext({});

interface IPopupParams {
    children: React.ReactNode
}

/**
 * @param {{
*  children: React.ReactNode;
* }} props Component props
*/
const UserDataAppearanceProvider = (props: IPopupParams) => {

    const [userDataAppearance, setUserDataAppearance] = useState(true)

    return (
        <UserDataAppearanceContext.Provider value={{ userDataAppearance: userDataAppearance, setUserDataAppearance: setUserDataAppearance }}>
            {props.children}
        </UserDataAppearanceContext.Provider>
    )
}

export default UserDataAppearanceProvider