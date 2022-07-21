import logo from './assets/common/img/logo.svg'
import './assets/css/homepage.css'

export function HomePage() {
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
                <div className="ConnectMetaMask" >Connect</div>
            </div>
        </div>
    </section>);
}