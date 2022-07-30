import style from '../assets/css/mintNft.module.css';
import img from "../assets/common/img/user.png";
import {useMetaMask} from "../hooks/useMetaMask";
import {useState} from "react";
import {contracts} from "../scripts/contractScript";
import DatePicker from "react-datepicker";
import bg from '../assets/common/img/hm1.png';
import "react-datepicker/dist/react-datepicker.css";

export function MintNFT() {
    const {accountAddress} = useMetaMask();
    const [value, setValue] = useState();
    const [err, setErr] = useState(false);
    const [errMsg, setMsg] = useState('');
    const [upload, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [uploadW, setUploadw] = useState(0);
    const [startDate, setStartDate] = useState();
    const [purchaseDate, setPurschaseDate] = useState();

    function handleChange(event) {
        setErr(false)
        setUploading(false)
        setSuccess(false)
        setUploadw(0)
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
                mintWarranty(val).then((val1) => {
                    console.log(Object.keys(val1));
                    setUploadw(50);
                    val1.wait().then(val => {
                        console.log(val);
                        setUploadw(100);
                        setSuccess(true)
                        setUploading(false);
                    })
                }).catch(e => {
                    setErr(true)
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
                            console.log(e.error.message)
                            switch (e.error.message) {
                                case "execution reverted: Seller is not Authorized Seller":
                                    setMsg('Only Authorized people can mint warranty')
                                    break;

                            }
                            break;
                        default:
                            setMsg("Something went wrong")
                    }
                    console.log(Object.keys(e));
                    console.log(Object.values(e));
                })

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

    function toTimestamp(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }

    async function mintWarranty(metaData) {
        let time = toTimestamp(startDate)
        console.log(time)
        return await contracts.mintWarrantyNFT(value['userAddress'], metaData, time);
    }

    return (
        <div>
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
                <div className={style.progressBar} style={
                    {width: `${uploadW}%`}}>
                </div>
            </div>

            <div className={style.mintNft}>
                <div className={style.max_width}>
                    <div className="col1">
                        <div className={style.heading} data-aos="fade-up" data-aos-duration="700"
                             data-aos-easing="ease">
                            Welcome <span>Seller</span>
                        </div>
                        <div className={style.sub_heading} data-aos="fade-up" data-aos-duration="500"
                             data-aos-delay="300"
                             data-aos-easing="ease">
                            Enter user Credentials to Mint Warranty
                        </div>
                        {err ? < div className={style.error}>
                            {errMsg}
                        </div> : ''}
                        {success ? < div className={style.mint}>
                            "Warranty Minted
                        </div> : ''}
                    </div>
                    <form className={style.form} data-aos="fade-up" data-aos-duration="800"
                          data-aos-delay="300"
                          data-aos-easing="ease">
                        <div className={style.colForm}>
                            <input type="text" name="username" placeholder={'Enter Username'} onChange={handleChange}/>
                        </div>
                        <div className={style.colForm}>
                            <input type="text" name="userAddress" placeholder={'Enter User Address'}
                                   onChange={handleChange}/>
                        </div>
                        <div className={style.colForm}>
                            <input type="text" name="productName" placeholder={'Enter Product Name'}
                                   onChange={handleChange}/>
                        </div>
                        <div className={style.colForm}>
                            <input type="text" name="companyName" placeholder={"Enter Company Name"}
                                   onChange={handleChange}/>
                        </div>
                        <div className={style.colForm}>
                            <DatePicker selected={purchaseDate} onChange={(date) => setPurschaseDate(date)}
                                        placeholderText="Purchase date"/>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                                        placeholderText="Expire date"/>
                        </div>

                        <div className={style.colForm}>
                            <div className={style.mintWarranty}
                                 style={upload ? {background: 'none', border: "1px solid #4f9cc0"} : {}}
                                 onClick={upload ? null : handleSubmit}>
                                Mint Warranty
                            </div>
                        </div>
                    </form>
                    <div className={style.background}>
                        <img src={bg} alt=""/>
                    </div>
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
