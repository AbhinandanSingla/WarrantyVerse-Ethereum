import style from "../assets/css/user.module.css";
import img from "../assets/common/img/user.png";
import {useMetaMask} from "../hooks/useMetaMask";
import {contractAddress, contracts, web3} from "../scripts/contractScript";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import '../assets/css/loading.css';
import error from '../assets/common/img/error.png';
import background from '../assets/common/img/hm1.png'

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
                            {value['metadata']["productName"]}
                        </div>
                        <div className={style.card_sub}>
                            Product Name
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