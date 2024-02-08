import React, { useState } from 'react'
// import { decryptMessage, encryptMessage, generateRandomKey } from '../utils/AESencryption.util';

interface IState {
    setViewSideMan?: React.Dispatch<React.SetStateAction<boolean>>,
    viewSideMan?: boolean;
}
export const ViewSideManContext: React.Context<IState> = React.createContext({});

interface IPopupParams {
    children: React.ReactNode
}

/**
 * @param {{
*  children: React.ReactNode;
* }} props Component props
*/
const ViewSideManProvider = (props: IPopupParams) => {

    const [viewSideMan, setViewSideMan] = useState(true)

    return (
        <ViewSideManContext.Provider value={{ viewSideMan: viewSideMan, setViewSideMan: setViewSideMan }}>
            {props.children}
        </ViewSideManContext.Provider>
    )
}

export default ViewSideManProvider