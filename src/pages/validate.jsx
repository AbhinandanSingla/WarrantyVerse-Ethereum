import '../assets/css/validate.css';
import {useEffect, useState} from "react";
import img from '../assets/common/img/1.png';
import {contractAddress, contracts, web3} from "../scripts/contractScript";
import err from '../assets/common/img/error.png';

export function Validate() {
    const [value, setValue] = useState({'tokenID': '', 'userAddress': ''});
    const [bool, setBool] = useState(false);
    const [warranty, setWarranty] = useState({});
    const [found, setFound] = useState(false);

    function handleChange(event) {
        setFound(false);
        setValue((val) => ({...val, [event.target.name]: event.target.value}));
        console.log(value)
    }

    async function getWarranty() {
        await contracts.validateNFT(value.userAddress, parseInt(value.tokenID)).then(async v => {
            let data = {};
            if (v) {
                web3.alchemy.getNftMetadata(
                    {
                        contractAddress: contractAddress,
                        tokenId: value.tokenID.toString(),
                        tokenType: "erc721",
                    }
                ).then(d => setWarranty((val) => ({...val, ...d})))
                console.log(data)
                return data;
            } else {
                setBool(false);
                setFound(true);
            }
        })
    }

    function validateWarranty() {
        getWarranty().then(r => r);
    }

    useEffect(() => {
        if (Object.keys(warranty).length !== 0) {
            console.log(warranty)
            setBool(true);
        }

    }, [warranty])
    return (<>
        <div className="validate">
            <div className="max_width">
                {bool ? <div className="showNft">
                    <div className="nftImg">
                        <img src={warranty['metadata']['image']} alt=""/>
                    </div>
                    <div className="informationContainer">
                        <div className="infoCon">
                            <div className="infoLabel">
                                <div className="label">Product Name:</div>
                                <div className="label">Product Serial:</div>
                                <div className="label">Company Name:</div>
                                <div className="label">Seller Address:</div>
                            </div>
                            <div className="infoVal">
                                <div className="value">2123</div>
                                <div className="value">2123</div>
                                <div className="value">2123</div>
                                <div className="value">2123</div>
                            </div>

                        </div>
                        <div className="infoCol">
                            <div className="Validated">Valid Warranty Card</div>
                        </div>


                    </div>
                </div> : ""}
                {found ? <div className="notFound">
                    <div className="nfheading">Warranty Not Found</div>
                    <img src={err} alt=""/>
                </div> : ""}
                <div className="formContainer">
                    <div className="heading">
                        Welcome Seller
                    </div>
                    <div className="sub_heading">
                        validate Warranty
                    </div>
                    <form className="validateForm">
                        <input type="text" className="formInput" placeholder={"UserAddress"} name={"userAddress"}
                               value={value.userAddress} onChange={handleChange}/>
                        <input type="text" className="formInput" placeholder={"Token Id"} name={'tokenID'}
                               value={value.tokenID} onChange={handleChange}/>
                        <div className="validateBtn" onClick={validateWarranty}>Validate Warranty</div>
                    </form>
                </div>
            </div>
        </div>
    </>);
}