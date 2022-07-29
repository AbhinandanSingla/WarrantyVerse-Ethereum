import style from "../assets/css/user.module.css";
import img from "../assets/common/img/user.png";
import {useMetaMask} from "../hooks/useMetaMask";
import {contractAddress, contracts, web3} from "../scripts/contractScript";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import '../assets/css/loading.css';
import error from '../assets/common/img/error.png';

export function User() {
    const {accountAddress} = useMetaMask();
    const [result, setResult] = useState([]);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const [err, setErr] = useState(false);

    async function getNfts() {
        setLoad(false);
        if (accountAddress === '') {
            return;
        }
        console.log('runing')
        if (accountAddress === undefined) {
            console.log("Address is loading")
        } else {
            console.log(contracts)
            try {
                const hmm = await contracts.getAllUserNfts(accountAddress);
                let data = [];
                for (const i of hmm) {
                    let d1 =
                        await web3.alchemy.getNftMetadata(
                            {
                                contractAddress: contractAddress,
                                tokenId: parseInt(i["id"]['_hex'], 16).toString(),
                                tokenType: "erc721",
                            }
                        )
                    data.push({...d1, ...i})
                }
                Promise.all(data).then((d) => {
                    setResult(d)
                    console.log(d);
                    if (d.length === 0) {
                        setErr(true);
                    }
                }).catch(reason => console.log(reason));
            } catch (e) {
                setErr(true)
                switch (e.code) {
                    case "code":
                        console.log("hmm")
                        break;
                }
                console.log(Object.keys(e))
                console.log(Object.values(e))
            }
        }
    }

    useEffect(() => {
        getNfts().then(r => setLoad(true));
    }, [accountAddress])
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
        <div className={style.userContainer}>
            <div className={style.max_width}>
                <div className={style.heading}>
                    Owned NFTs
                </div>
                <div className={style.container} id={'NftContainer'}>
                    {result.map(((value, index) => <div className={style.card} key={index}
                                                        onClick={() => navigate('/dashboard', {
                                                            state: {
                                                                id: index,
                                                                data: value
                                                            }
                                                        })}>
                        <img src={value["metadata"]["image"]} alt=""/>
                        <div className={style.card_heading}>
                            {value["title"]}
                        </div>
                        <div className={style.card_sub}>
                            Product Name
                        </div>
                        <div className={style.card_serial}>
                            Serial Number: <span>{value["id"]["tokenId"]}</span>
                        </div>
                        <div className={style.expire}>
                            <svg viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M6 11.5C3.2385 11.5 1 9.2615 1 6.5C1 3.7385 3.2385 1.5 6 1.5C8.7615 1.5 11 3.7385 11 6.5C11 9.2615 8.7615 11.5 6 11.5ZM10 6.5C10 5.43913 9.57857 4.42172 8.82843 3.67157C8.07828 2.92143 7.06087 2.5 6 2.5C4.93913 2.5 3.92172 2.92143 3.17157 3.67157C2.42143 4.42172 2 5.43913 2 6.5C2 7.56087 2.42143 8.57828 3.17157 9.32843C3.92172 10.0786 4.93913 10.5 6 10.5C7.06087 10.5 8.07828 10.0786 8.82843 9.32843C9.57857 8.57828 10 7.56087 10 6.5ZM8 6C8.13261 6 8.25979 6.05268 8.35355 6.14645C8.44732 6.24021 8.5 6.36739 8.5 6.5C8.5 6.63261 8.44732 6.75979 8.35355 6.85355C8.25979 6.94732 8.13261 7 8 7H6.5C5.95 7 5.5 6.55 5.5 6V4C5.5 3.86739 5.55268 3.74021 5.64645 3.64645C5.74021 3.55268 5.86739 3.5 6 3.5C6.13261 3.5 6.25979 3.55268 6.35355 3.64645C6.44732 3.74021 6.5 3.86739 6.5 4V6H8Z"
                                      fill="white"/>
                            </svg>
                            Expire Date: <span>5d</span>
                        </div>
                    </div>))
                    }
                </div>
                {load ? '' : <div className={'ring'}>Loading<span></span></div>}
                {err ? <div className={style.error}><img src={error} alt=""/>
                    <div className={style.errorHead}>Not Warranty Found</div>
                </div> : ''}
            </div>
        </div>
    </>);
}