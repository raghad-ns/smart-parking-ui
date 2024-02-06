import React from "react";
import { getBalance } from "../utils/utils";

interface IState {
    updateWalletBalance?: () => void,
    walletBalance?: number;
}
export const WalletBalanceContext: React.Context<IState> = React.createContext({});

interface IPopupParams {
    children: React.ReactNode
}

/**
 * @param {{
*  children: React.ReactNode;
* }} props Component props
*/
const WalletBalanceProvider = (props: IPopupParams) => {

    const [walletBalance, setWalletBalance] = React.useState(0);
    console.log('balance: ', walletBalance)
    const updateWalletBalance = () => {
        getBalance()
            .then(balance => setWalletBalance(balance))
            .catch(error => window.alert('failed to fetch car\'s wallet balance'))
    }
    React.useEffect(updateWalletBalance, [])

    return (
        <WalletBalanceContext.Provider value={{ walletBalance: walletBalance, updateWalletBalance: updateWalletBalance }}>
            {props.children}
        </WalletBalanceContext.Provider>
    )
}

export default WalletBalanceProvider