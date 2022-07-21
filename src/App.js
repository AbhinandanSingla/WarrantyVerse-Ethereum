import './App.css';
import {useEffect, useMemo} from "react";
import {useMetaMask} from "./hooks/useMetaMask";
import {BrowserRouter, Route, Routes} from "react-router-dom";
// import {AddSeller} from "./AddSeller";
import {ConnectMetamask} from "./ConnectMetamask";
import {Seller} from "./Seller";

function App() {
    const {accountAddress, haveMetamask, accountBalance} = useMetaMask();
    useEffect(() => {
        console.log(accountAddress)
        console.log(haveMetamask)
    });
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<ConnectMetamask/>}/>
                    {/*<Route path={'/addSeller'} element={<AddSeller/>}/>*/}
                    <Route path={'/seller'} element={<Seller/>}/>
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
