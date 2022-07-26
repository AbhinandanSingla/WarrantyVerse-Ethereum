import style from '../assets/css/dashboard.module.css'
import img from '../assets/common/img/user.png';
import {contracts} from "../scripts/contractScript";
import {useEffect} from "react";
import {useMetaMask} from "../hooks/useMetaMask";
import {useLocation} from "react-router-dom";

export function Dashboard() {
    const {accountAddress} = useMetaMask();
    const location = useLocation();
    useEffect(() => {
    })
    return (<>
        <div className={style.navbar}>
            <div className={style.max_width}>
                <div className={style.logo}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.1082 22.2087L11.9218 8.02948L28.2946 8.02948L20.1082 22.2087Z"
                              fill="url(#paint0_linear_238_469)"/>
                        <path d="M10.5534 12.6541L18.7398 26.8333H2.36703L10.5534 12.6541Z"
                              fill="url(#paint1_linear_238_469)"/>
                        <path d="M29.4587 12.6541L37.6451 26.8333H21.2723L29.4587 12.6541Z"
                              fill="url(#paint2_linear_238_469)"/>
                        <circle cx="20" cy="20" r="18.5" stroke="white" strokeWidth="3"/>
                        <defs>
                            <linearGradient id="paint0_linear_238_469" x1="29.561" y1="12.7559" x2="10.6554"
                                            y2="12.7559" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4B6CB7"/>
                                <stop offset="1" stopColor="#182848"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_238_469" x1="1.10059" y1="22.1069" x2="20.0063"
                                            y2="22.1069" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4B6CB7"/>
                                <stop offset="1" stopColor="#182848"/>
                            </linearGradient>
                            <linearGradient id="paint2_linear_238_469" x1="20.0059" y1="22.1069" x2="38.9115"
                                            y2="22.1069" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4B6CB7"/>
                                <stop offset="1" stopColor="#182848"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <span>WarrantyVerse</span>
                </div>
                <div className={style.loginContainer}>
                    <div className={style.serialNumber}>
                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.27883 6.93066H6.46372V6.74576V3.04598H8.42946V6.74576V6.93066H8.61436H12.204V8.65262H8.61436H8.42946V8.83751V12.5373H6.46372V8.83751V8.65262H6.27883H2.71273V6.93066H6.27883Z"
                                fill="black" stroke="white" strokeWidth="0.369792"/>
                        </svg>

                        Serial Number
                    </div>
                    <img src={img} alt=""/>
                </div>
            </div>
        </div>
        <div className={style.dashboard}>
            <div className={style.max_width}>
                <div className="dashboardContainer">
                    <div className={style.main_heading}>
                        Details
                    </div>
                    <div className={style.informationContainer}>
                        <div className={`${style.info} ${style.div1}`}>XXXXXX
                            <span className={style.infoSpan}>Serial Number</span>
                        </div>
                        <div className={`${style.info} ${style.div2}`}>XXXXXX
                            <span className={style.infoSpan}>Serial Number</span>
                        </div>
                        <div className={`${style.info} ${style.div3}`}>XXXXXX<span
                            className={style.infoSpan}>Serial Number</span></div>
                        <div className={`${style.info} ${style.div4}`}>Apple<span
                            className={style.infoSpan}>Serial Number</span></div>
                        <div className={`${style.info} ${style.div5}`}>Macbook
                            <span
                                className={style.infoSpan}>Serial Number</span></div>
                        <div className={`${style.info} ${style.div6}`}>12-04-22
                            <span className={style.infoSpan}>Serial Number</span>
                        </div>
                        <div className={`${style.info} ${style.div7}`}>1 year<span
                            className={style.infoSpan}>Serial Number</span></div>
                    </div>
                    <div className={style.btnContainer}>
                        <div className={style.transNFT}>
                            Transfer NFT
                        </div>
                        <div className={style.enterName}> Enter the name</div>
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="37" height="37" rx="18.5" fill="#8E2AC3" stroke="white"/>
                            <path
                                d="M27.5357 11.875L15.9427 23.6016L11.0581 18.6607L10.0938 19.6362L15.4605 25.0647L15.9427 25.5312L16.4248 25.0647L28.5 12.8504L27.5357 11.875Z"
                                fill="white"/>
                        </svg>

                    </div>
                </div>
                <div className="showNft">

                </div>
            </div>
        </div>
    </>);
}