import "../assets/css/user.css";
import img from "../assets/common/img/user.png";
import {useMetaMask} from "../hooks/useMetaMask";
import {contractAddress, contracts, web3} from "../scripts/contractScript";
import {useEffect} from "react";

export function User() {
    const {accountAddress} = useMetaMask();

    async function getNfts() {
        const hmm = await contracts.getAllUserNfts(accountAddress);
        let data = [];
        for (const i of hmm) {
            data.push(web3.alchemy.getNftMetadata(
                {
                    contractAddress: contractAddress,
                    tokenId: parseInt(i["id"], 16).toString(),
                    tokenType: "erc721",
                }
            ))
        }
        return await Promise.all(data);
    }

    useEffect(() => {
        getNfts().then(data => {
            document.getElementById('NftContainer').innerHTML = data.map((value, index) =>
                `<div class="card">
                        <img src=${value["metadata"]["image"]} alt=""/>
                        <div class="card_heading">
                           ${value["title"]}
                        </div>
                        <div class="card_sub">
                            Product Name
                        </div>
                        <div class="card_serial">
                            # Serial Number: <span>${value["id"]["tokenId"]}</span>
                        </div>
                        <div class="expire">
                            <svg viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M6 11.5C3.2385 11.5 1 9.2615 1 6.5C1 3.7385 3.2385 1.5 6 1.5C8.7615 1.5 11 3.7385 11 6.5C11 9.2615 8.7615 11.5 6 11.5ZM10 6.5C10 5.43913 9.57857 4.42172 8.82843 3.67157C8.07828 2.92143 7.06087 2.5 6 2.5C4.93913 2.5 3.92172 2.92143 3.17157 3.67157C2.42143 4.42172 2 5.43913 2 6.5C2 7.56087 2.42143 8.57828 3.17157 9.32843C3.92172 10.0786 4.93913 10.5 6 10.5C7.06087 10.5 8.07828 10.0786 8.82843 9.32843C9.57857 8.57828 10 7.56087 10 6.5ZM8 6C8.13261 6 8.25979 6.05268 8.35355 6.14645C8.44732 6.24021 8.5 6.36739 8.5 6.5C8.5 6.63261 8.44732 6.75979 8.35355 6.85355C8.25979 6.94732 8.13261 7 8 7H6.5C5.95 7 5.5 6.55 5.5 6V4C5.5 3.86739 5.55268 3.74021 5.64645 3.64645C5.74021 3.55268 5.86739 3.5 6 3.5C6.13261 3.5 6.25979 3.55268 6.35355 3.64645C6.44732 3.74021 6.5 3.86739 6.5 4V6H8Z"
                                      fill="white"/>
                            </svg>
                            Expire Date: <span>5d</span>
                        </div>
                    </div>`).join('')

        })
    })
    return (<>
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
                                <stop stop-color="#4B6CB7"/>
                                <stop offset="1" stop-color="#182848"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_238_469" x1="1.10059" y1="22.1069" x2="20.0063"
                                            y2="22.1069" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#4B6CB7"/>
                                <stop offset="1" stop-color="#182848"/>
                            </linearGradient>
                            <linearGradient id="paint2_linear_238_469" x1="20.0059" y1="22.1069" x2="38.9115"
                                            y2="22.1069" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#4B6CB7"/>
                                <stop offset="1" stop-color="#182848"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <span>WarrantyVerse</span>
                </div>
                <div className="loginContainer">
                    <div className="serialNumber">
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
        <div className="userContainer">
            <div className="max_width">
                <div className="heading">
                    Owned NFTs
                </div>
                <div className="container" id={'NftContainer'}>
                </div>
            </div>
        </div>
    </>);
}