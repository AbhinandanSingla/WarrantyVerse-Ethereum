import style from '../assets/css/dashboard.module.css'
import img from '../assets/common/img/user.png';
import {contracts} from "../scripts/contractScript";
import {useEffect, useState} from "react";
import {useMetaMask} from "../hooks/useMetaMask";
import {useLocation} from "react-router-dom";

export function Dashboard() {
    const {accountAddress} = useMetaMask();
    const location = useLocation();
    const [tranferAddress, setAddress] = useState();
    const [errMsg, setMsg] = useState('');
    const [err, setErr] = useState(false);
    const [load, setLoad] = useState(false);
    const [upload, setUpload] = useState(false);

    async function transferWarranty() {
        setLoad(false)
        contracts.transferFrom(accountAddress, tranferAddress, parseInt(location.state.data['id']['_hex'], 16))
            .then(val => {
                console.log(val)
                val.wait().then(v => {
                    setLoad(true);
                })
            }).catch((e) => {
            console.log(Object.keys(e))
            console.log(Object.values(e))
            setLoad(false)
            setErr(true);
            switch (e.code) {
                case 4001:
                    setMsg(e.message)
                    break;
                case "UNSUPPORTED_OPERATION":
                    setMsg("Please Enter Correct Address")
                    break;
                case "INVALID_ARGUMENT":
                    setMsg('Please Enter Correct Address')
                    break;
                case "NETWORK_ERROR":
                    if (e.event === "changed") {
                        setMsg("Network Changed")
                    }
                    break;

                case "UNPREDICTABLE_GAS_LIMIT":
                    switch (e.reason) {
                        case "execution reverted: ERC721: caller is not token owner nor approved":
                            setMsg("Sorry You are not longer owner of this Warranty")
                    }
                    break;
                default:
                    setMsg("Something went wrong")
            }

        });
    }

    function toDate(timestamp) {
        var date = new Date(timestamp * 1000);
        return date.getDate() +
            "-" + (date.getMonth() + 1) +
            "-" + date.getFullYear()
    }

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
                        {accountAddress}
                    </div>
                    <img src={img} alt=""/>
                </div>
            </div>
        </div>
        <div className={style.dashboard}>
            <div className={style.main_heading}>
                Details
            </div>
            <div className={style.max_width}>
                <div className={style.showNft}>
                    <img src={location.state.data['metadata']['image']} alt=""/>
                </div>
                <div className={style.dashboardContainer}>
                    <div className={style.informationContainer}>
                        <div
                            className={style.info_heading}>MacBookia <span>#{parseInt(location.state.data['id']['_hex'], 16)}</span>
                        </div>
                        <div className={style.infoCol}>
                            <div className={style.label}>Product Name:</div>
                            <div className={style.value}>{location.state.data['metadata']['productName']}</div>
                        </div>
                        <div className={style.infoCol}>
                            <div className={style.label}>Product Serial:</div>
                            <div className={style.value}>{location.state.data['metadata']['productSerial']}</div>
                        </div>
                        <div className={style.infoCol}>
                            <div className={style.label}>Company Name:</div>
                            <div className={style.value}>{location.state.data['metadata']['companyName']}</div>
                        </div>
                        <div className={style.infoCol}>
                            <div className={style.label}>Purchase Date:</div>
                            <div
                                className={style.value}>{toDate(location.state.data['metadata']['dateOfPurchase'])}</div>
                        </div>
                        <div className={style.infoCol}>
                            <div className={style.label}>Expire Date:</div>
                            <div
                                className={style.value}>{toDate(parseInt(location.state.data['expireDate']['_hex'], 16))}</div>
                        </div>
                        <div className={style.infoCol}>
                            <div className={style.label}>Seller Address:</div>
                            <div className={style.value}>{location.state.data['seller']}</div>
                        </div>
                    </div>
                    <div className={style.btnContainer}>
                        <div className={style.transNFT}>
                            Transfer NFT
                        </div>
                        <div className={style.enterName}><input type="text" placeholder={"Enter the Address"}
                                                                onChange={(e) => setAddress(e.target.value)}
                                                                name={'tranferAddress'}/></div>
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"
                             onClick={transferWarranty}>
                            <rect x="0.5" y="0.5" width="37" height="37" rx="18.5" fill="#8E2AC3" stroke="white"/>
                            <path
                                d="M27.5357 11.875L15.9427 23.6016L11.0581 18.6607L10.0938 19.6362L15.4605 25.0647L15.9427 25.5312L16.4248 25.0647L28.5 12.8504L27.5357 11.875Z"
                                fill="white"/>
                        </svg>
                    </div>
                    {load ?
                        <div className={style.transferMsg}>Warranty has Transfer to <span>{tranferAddress}</span></div>
                        : ''}
                    {err ? <div className={style.err}>{errMsg}</div>
                        : ''}
                </div>

            </div>
        </div>
    </>);
}