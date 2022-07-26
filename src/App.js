import './App.css';
import {useEffect, useMemo} from "react";
import {useMetaMask} from "./hooks/useMetaMask";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AddSeller} from "./pages/AddSeller";
import {ConnectMetamask} from "./pages/ConnectMetamask";
import {Seller} from "./pages/Seller";
import {Dashboard} from "./pages/Dashboard";
import {User} from "./pages/user";

function App() {
    const {accountAddress, haveMetamask} = useMetaMask();
    useEffect(() => {
        console.log(accountAddress)
        console.log(haveMetamask)
    }, [accountAddress]);
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<ConnectMetamask/>}/>
                    <Route path={'/addSeller'} element={<AddSeller/>}/>
                    <Route path={'/seller'} element={<Seller/>}/>
                    <Route path={'/dashboard'} element={<Dashboard/>}/>
                    <Route path={'/user'} element={<User/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
