import '../assets/css/validate.css';
import {useState} from "react";
import img from '../assets/common/img/1.png';
import {contracts} from "../scripts/contractScript";

export function Validate() {
    const [value, setValue] = useState({});

    function handleChange(event) {
        setValue(...event.target.name, ...event.target.value);
    }

    function validateWarranty() {
        contracts.validateNFT(value.userAddress, parseInt(value.token)).then(v => console.log(v))
    }

    function submit() {

    }

    return (<>
        <div className="validate">
            <div className="max_width">
                <div className="showNft">
                    <div className="nftImg">
                        <img src={img} alt=""/>
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
                </div>
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
                        <input type="text" className="formInput" placeholder={"Token Id"} name={'token'}
                               value={value.token} onChange={handleChange}/>
                        <div className="validateBtn" onClick={validateWarranty}>Validate Warranty</div>
                    </form>
                </div>
            </div>
        </div>
    </>);
}