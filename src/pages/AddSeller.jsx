import {useEffect, useState} from "react";
import logo from '../assets/common/img/logo.svg';
import img from '../assets/common/img/img.png';
import style from '../assets/css/AddSeller.module.css';
import {contracts, web3} from "../scripts/contractScript";
import {useNavigate} from "react-router-dom";
import {useMetaMask} from "../hooks/useMetaMask";

export function AddSeller() {
    const [seller, setValue] = useState({'SellerAddress': '', 'SellerName': ''});
    const [errMsg, setMsg] = useState('');
    const [err, setErr] = useState(false);
    const [trans, setTrans] = useState(false);
    let {login} = useMetaMask();
    let navigate = useNavigate();
    useEffect(() => {
        if (!login) {
            console.log(login)
            navigate('/');
        }
    }, [login])

    function handleChange(event) {
        console.log(login)
        setValue((value => ({
            ...value, [event.target.name]: event.target.value
        })));
        setErr(false)
        setTrans(false)
        setMsg('')
        // console.log(seller)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (login && seller.SellerName !== '' && seller.SellerAddress.length > 0) {
            try {
                const code = await contracts.addSeller(seller.SellerAddress)
                console.log(code)
                console.log(Object.keys(code))
                console.log(Object.values(code))
                code.wait().then(val => {
                    console.log(val)
                    setTrans(true)
                });
            } catch (e) {
                console.log(e)
                console.log(Object.keys(e))
                console.log(Object.values(e))
                switch (e.code) {
                    case 4001:
                        setMsg(e.message)
                        setErr(true)
                        break;
                    case "UNSUPPORTED_OPERATION":
                        setMsg("Please Enter Correct Address")
                        setErr(true)
                        break;
                    case "INVALID_ARGUMENT":
                        setMsg('Please Enter Correct Address')
                        setErr(true)
                        break;
                    case "NETWORK_ERROR":
                        if (e.event === "changed") {
                            setMsg("Network Changed")
                        }
                        setErr(true);
                        break;
                    case "UNPREDICTABLE_GAS_LIMIT":
                        switch (e.error.message) {
                            case "execution reverted: Seller is already in Seller List":
                                setMsg("Seller is Already Registered");
                                setErr(true);
                                break;
                            case "execution reverted: Ownable: caller is not the owner":
                                setMsg("Only admin can add Seller")
                                setErr(true)
                                break;
                        }
                        break;
                    default:
                        setErr(true)
                        setMsg("Something went wrong")
                }
            }
        }
    }

    return (<>
            <section className={style.navbar}>
                <div className={style.max_width}>
                    <div className={style.logo}>
                        <svg viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M46.2492 51.0794L27.4205 18.4671L65.0779 18.4671L46.2492 51.0794Z"
                                  fill="url(#paint0_linear_202_52)"/>
                            <path d="M24.2738 29.1041L43.1025 61.7164H5.44504L24.2738 29.1041Z"
                                  fill="url(#paint1_linear_202_52)"/>
                            <path d="M67.7567 29.1041L86.5854 61.7164H48.9279L67.7567 29.1041Z"
                                  fill="url(#paint2_linear_202_52)"/>
                            <circle cx="46" cy="46" r="44.5" stroke="white" strokeWidth="3"/>
                            <defs>
                                <linearGradient id="paint0_linear_202_52" x1="67.9907" y1="29.3378" x2="24.5077"
                                                y2="29.3378" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#4B6CB7"/>
                                    <stop offset="1" stopColor="#182848"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear_202_52" x1="2.53223" y1="50.8457" x2="46.0153"
                                                y2="50.8457" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#4B6CB7"/>
                                    <stop offset="1" stopColor="#182848"/>
                                </linearGradient>
                                <linearGradient id="paint2_linear_202_52" x1="46.0151" y1="50.8457" x2="89.4982"
                                                y2="50.8457" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#4B6CB7"/>
                                    <stop offset="1" stopColor="#182848"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </section>

            <section className={style.addSeller}>
                <div className={style.max_width}>
                    <div className={style.sellerContainer}>
                        <div className={style.headContainer}>
                            <div className={style.seller_heading}>Welcome to WarrantyVerse</div>
                            <div className={style.sub_heading}>Please register if you don't have an account and login if
                                you
                                already have an account
                            </div>
                            {err ? <div className={style.errMsg}>{errMsg}</div> : ''}
                            {trans ? <div className={style.transSuccess}>Seller Added</div> : ''}

                        </div>
                        <form className={style.sellerForm}>
                            <div className={style.col}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.03971 7.74665C9.33205 7.74665 10.3797 6.699 10.3797 5.40665C10.3797 4.1143 9.33205 3.06665 8.03971 3.06665C6.74736 3.06665 5.69971 4.1143 5.69971 5.40665C5.69971 6.699 6.74736 7.74665 8.03971 7.74665Z"
                                        stroke="white" strokeOpacity="0.56" strokeWidth="1.2" strokeMiterlimit="10"
                                        strokeLinecap="round" strokeLinejoin="round"/>
                                    <path
                                        d="M12.34 13.5999C12.78 13.5999 13.12 13.1733 12.98 12.7466C12.3067 10.6599 10.3534 9.14661 8.04003 9.14661C5.7267 9.14661 3.77336 10.6599 3.10003 12.7466C2.9667 13.1666 3.30003 13.5999 3.74003 13.5999H12.34Z"
                                        stroke="white" strokeOpacity="0.56" strokeWidth="1.2" strokeMiterlimit="10"
                                        strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <input type="text" value={seller.SellerName} onChange={handleChange} name={'SellerName'}
                                       id={'SellerName'} placeholder={'Seller Name'}/>
                            </div>
                            <div className={style.col}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.7602 14.0201H4.40023C3.66689 14.0201 3.06689 13.4201 3.06689 12.6868V8.58675C3.06689 7.85342 3.66689 7.25342 4.40023 7.25342H11.7602C12.4936 7.25342 13.0936 7.85342 13.0936 8.58675V12.6868C13.0936 13.4201 12.4936 14.0201 11.7602 14.0201Z"
                                        stroke="white" strokeOpacity="0.56" strokeWidth="1.2" strokeMiterlimit="10"
                                        strokeLinecap="round" strokeLinejoin="round"/>
                                    <path
                                        d="M11.0601 7.25336V5.38002C11.0601 3.73336 9.72676 2.40002 8.0801 2.40002C6.43343 2.40002 5.1001 3.73336 5.1001 5.38002V7.25336"
                                        stroke="white" strokeOpacity="0.56" strokeWidth="1.2" strokeMiterlimit="10"
                                        strokeLinecap="round" strokeLinejoin="round"/>
                                    <path
                                        d="M8.07993 10.6334C8.52913 10.6334 8.89327 10.2692 8.89327 9.82005C8.89327 9.37086 8.52913 9.00671 8.07993 9.00671C7.63074 9.00671 7.2666 9.37086 7.2666 9.82005C7.2666 10.2692 7.63074 10.6334 8.07993 10.6334Z"
                                        fill="white" fillOpacity="0.56"/>
                                    <path d="M8.08008 10.3467V11.6667" stroke="white" strokeOpacity="0.56"
                                          strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                                <input type="text" value={seller.SellerAddress} onChange={handleChange}
                                       id={'SellerAddress'}
                                       name={'SellerAddress'} placeholder={"Seller Address"}/>
                            </div>
                            <div className={style.sellerBtn} onClick={handleSubmit}>Add Seller</div>
                        </form>
                    </div>
                    <div id="lodadiAmination"></div>
                    <div className={style.background}>
                        <img src={img} alt=""/>
                    </div>
                </div>
            </section>
        </>
    )
}