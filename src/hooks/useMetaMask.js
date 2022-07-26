import {ethers} from "ethers";
import {createContext, useContext, useEffect, useMemo, useState} from "react";

const {ethereum} = window;
export const MetaMaskContext = createContext({});
export const MetaMaskProvider = ({children}) => {
    const [haveMetamask, sethaveMetamask] = useState(false);
    const [login, setLogin] = useState(false);
    const [accountAddress, setAccountAddress] = useState('');
    const [accountBalance, setAccountBalance] = useState('0');
    const checkMetamaskAvailability = async () => {
        try {
            if (!ethereum) {
                sethaveMetamask(false);
            }
            const provider = new ethers.providers.Web3Provider(ethereum);
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            setAccountAddress(accounts[0]);
            sethaveMetamask(true);
            setLogin(true)
            let balance = await provider.getBalance(accounts[0]);
            let bal = ethers.utils.formatEther(balance);
            setAccountBalance(bal)
        } catch (e) {
            console.log(e)
            sethaveMetamask(false);
        }
    };
    useEffect(() => {
        checkMetamaskAvailability().then(v => v);
    }, [])
    const values = useMemo(() => ({
        accountAddress,
        haveMetamask,
        login,
        setLogin,
        accountBalance,
        sethaveMetamask,
        setAccountAddress,
        setAccountBalance,
        checkMetamaskAvailability
    }), [accountAddress, haveMetamask, accountBalance, login]);
    return <MetaMaskContext.Provider value={values}>{children}</MetaMaskContext.Provider>
}
export const useMetaMask = () => {

    const context = useContext(MetaMaskContext);
    if (context === undefined) {
        throw new Error('useMetaMask hook must be used with MetaMask Provider component')
    }
    return context;
}