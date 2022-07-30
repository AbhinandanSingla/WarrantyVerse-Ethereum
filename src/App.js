import './App.css';
import {useEffect, useMemo} from "react";
import {useMetaMask} from "./hooks/useMetaMask";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AddSeller} from "./pages/AddSeller";
import {ConnectMetamask} from "./pages/ConnectMetamask";
import {Dashboard} from "./pages/Dashboard";
import {User} from "./pages/user";
import {MintNFT} from "./pages/MintNFT";
import {Validate} from "./pages/validate";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
    const {accountAddress, haveMetamask} = useMetaMask();
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<ConnectMetamask/>}/>
                    <Route path={'/addSeller'} element={<AddSeller/>}/>
                    <Route path={'/dashboard'} element={<Dashboard/>}/>
                    <Route path={'/user'} element={<User/>}/>
                    <Route path={'/mintWarranty'} element={<MintNFT/>}/>
                    <Route path={'/validate'} element={<Validate/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
