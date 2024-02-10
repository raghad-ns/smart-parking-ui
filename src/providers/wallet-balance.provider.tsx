import React from "react";
import { getWalletBalance } from "../services/wallet.service";
import { signoutService } from "../services/user.service";
import { UserContext } from "./user.provider";
import { useNavigate } from "react-router";

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
    const user = React.useContext(UserContext)
    const navigate = useNavigate()
    const [walletBalance, setWalletBalance] = React.useState(0);
    const updateWalletBalance = () => {
        getWalletBalance().then(balance => {
            if (balance.state && balance.value.statusCode === 401) {
                user.user?.email && window.alert('Session expiered, you have to login again!')
                signoutService()
                    .then(response => {
                        user.setUser && user.setUser({});
                        sessionStorage.clear();
                        navigate("/signin");
                    }).catch(error => console.error(error))
            }
            else if (balance.state && balance.value.statusCode === 200) setWalletBalance(balance.value.data)
            else if (!balance.state) setWalletBalance(0)
        })
    }
    // eslint-disable-next-line
    React.useEffect(updateWalletBalance, [])

    return (
        <WalletBalanceContext.Provider value={{ walletBalance: walletBalance, updateWalletBalance: updateWalletBalance }}>
            {props.children}
        </WalletBalanceContext.Provider>
    )
}

export default WalletBalanceProvider