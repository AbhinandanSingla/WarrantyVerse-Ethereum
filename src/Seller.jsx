import logo from "./assets/common/img/logo.svg";
import {useState} from "react";
import './assets/css/style.css';
import './assets/css/seller.css';

export function Seller() {
    const [nftValues, setValue] = useState({'userAddress': '', 'userName': '', 'productNo': 0, 'productName': ''});
    function handleChange(event) {
        setValue((value => ({
            ...value, [event.target.name]: event.target.value
        })));
    }

    async function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <section className={'seller'}>
            <div className="max_width">
                <div className="NFTContainer">

                </div>
                <div className="sellerContainer">
                    <div className="main_heading">
                        Welcome Seller
                    </div>
                    <div className="sub_heading">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto libero nobis?
                    </div>

                    <div className="sellerForm">
                        <div className="col">
                            <label htmlFor="username">Username</label>
                            <input type="text"/>
                        </div>
                        <div className="col">
                            <label htmlFor="userAddress">User Address</label>
                            <input type="text"/>
                        </div>
                        <div className="col">
                            <label htmlFor="productName">product Name</label>
                            <input type="text"/>
                        </div>
                        <div className="col">
                            <label htmlFor="productNo">Product Serial No </label>
                            <input type="text"/>
                        </div>
                        <div className="mintNftBtn">
                            Mint Warranty
                        </div>
                    </div>
                </div>
            </div>
        </section>);
}