import logo from './logo.svg';
import './App.css';
import {useEffect, useMemo} from "react";
import {useMetaMask} from "./hooks/useMetaMask";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AddSeller} from "./AddSeller";

function App() {
    const {accountAddress, haveMetamask, accountBalance} = useMetaMask();
    useEffect(() => {
        console.log(accountAddress)
        console.log(haveMetamask)
        // console.log(accountBalance)
    });

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<AddSeller/>}>

                    </Route>
                </Routes>
            </BrowserRouter>
            {/*<header className="App-header">*/}
            {/*    <img src={logo} className="App-logo" alt="logo"/>*/}
            {/*    <div className="balance">ETH {accountBalance}</div>*/}
            {/*</header>*/}
        </div>
    );
}

export default App;
