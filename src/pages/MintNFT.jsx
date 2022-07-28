import '../assets/css/mintNft.css';
import img from "../assets/common/img/user.png";
import {useMetaMask} from "../hooks/useMetaMask";
import {useState} from "react";
import {contracts} from "../scripts/contractScript";

export function MintNFT() {
    const {accountAddress} = useMetaMask();
    const [value, setValue] = useState();
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [upload, setUploading] = useState(false);

    function handleChange(event) {
        setErr(false)
        setValue((value => ({
            ...value, [event.target.name]: event.target.value
        })));
    }

    async function handleSubmit(event) {
        setUploading(true);
        event.preventDefault();
        console.log(value)
        try {
            getMetaData().then(val => {
                console.log(val)
                console.log(mintWarranty(val).then((val1) => {
                    setUploading(false);
                    console.log(val1);
                }).catch(e => {
                    setErr(true)
                    switch (e.code) {
                        case "UNPREDICTABLE_GAS_LIMIT":
                            setErrMsg('Only Authorized people can mint warranty')
                            break;
                    }
                    console.log(Object.keys(e));
                    console.log(Object.values(e));
                }))
            });
        } catch (e) {
            setErr(true);
            console.log(Object.keys(e))
            console.log(Object.values(e))
        }

    }

    async function getMetaData() {
        return "https://firebasestorage.googleapis.com/v0/b/personaltestingbase.appspot.com/o/Metadata%2Fnft-metadata.json?alt=media&token=5f49d058-4de8-4e77-b670-64ccfd8d9e33";
    }

    async function mintWarranty(metaData) {
        return await contracts.mintWarrantyNFT(value['userAddress'], metaData, value['expireDate']);
    }

    return (
        <div>
            <div className="navbar">
                <div className="max_width">
                    <div className="logo">
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
                    <div className="loginContainer">
                        <div className="serialNumber">
                            {accountAddress}
                        </div>
                        <img src={img} alt=""/>
                    </div>
                </div>
            </div>
            <div className="mintNft">
                <div className="max_width">
                    <div className="col1">
                        <div className="heading">
                            Welcome <span>Seller</span>
                        </div>
                        <div className="sub_heading">
                            Enter user Credentials to Mint Warranty
                        </div>
                        {err ? < div className="error">
                            {errMsg}
                        </div> : ''}
                    </div>
                    <form className="form">
                        <div className="colForm">
                            <input type="text" name="username" placeholder={'Enter Username'} onChange={handleChange}/>
                        </div>
                        <div className="colForm">
                            <input type="text" name="userAddress" placeholder={'Enter User Address'}
                                   onChange={handleChange}/>
                        </div>
                        <div className="colForm">
                            <input type="text" name="productName" placeholder={'Enter Product Name'}
                                   onChange={handleChange}/>
                        </div>
                        <div className="colForm">
                            <input type="text" name="companyName" placeholder={"Enter Company Name"}
                                   onChange={handleChange}/>
                            <input type="text" name="expireDate" placeholder={"Enter Expire Date"}
                                   onChange={handleChange}/>
                        </div>
                        <div className="colForm">
                            <div className="mintWarranty"
                                 style={upload ? {background: 'none', border: "1px solid #4f9cc0"} : {}}
                                 onClick={handleSubmit}>
                                Mint Warranty
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

// username
// user adddress
// product name
// product company
// expireDate
