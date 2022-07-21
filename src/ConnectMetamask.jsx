import logo from './assets/common/img/logo.svg'
import './assets/css/homepage.css'

import {useMetaMask} from "./hooks/useMetaMask";
import {useNavigate} from "react-router-dom";

export function ConnectMetamask() {
    const context = useMetaMask();
    let navigate = useNavigate();

    function Connect() {
        context.checkMetamaskAvailability().then(r => navigate("/addSeller"));
    }

    return (<section className="home">
        <div className="max_width">
            <div className="homeContainer">
                <div className="logoContainer">
                    <div className="logo">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="logoText">WarrantyVerse</div>
                </div>
                <div className="main_heading">
                    Connect Your Wallet
                </div>
                <div className="sub_heading">
                    To begin please connect your metamask wallet
                </div>
                <div className="ConnectMetaMask" onClick={Connect}>Connect</div>
            </div>
        </div>
    </section>);
}