import {useEffect, useState} from "react";
import logo from './assets/common/img/logo.svg';
import './assets/css/AddSeller.css';
import './assets/css/style.css';
import {addSeller} from "./scripts/contractScript";

export function AddSeller() {
    const [seller, setValue] = useState({'SellerAddress': '', 'SellerName': ''});

    function handleChange(event) {
        setValue((value => ({
            ...value, [event.target.name]: event.target.value
        })));
        // console.log(seller)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        addSeller(seller.SellerAddress).then();
    }

    return (<>
            <section className="navbar">
                <div className="max_width">
                    <div className="logo">
                        <svg viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M46.2492 51.0794L27.4205 18.4671L65.0779 18.4671L46.2492 51.0794Z"
                                  fill="url(#paint0_linear_202_52)"/>
                            <path d="M24.2738 29.1041L43.1025 61.7164H5.44504L24.2738 29.1041Z"
                                  fill="url(#paint1_linear_202_52)"/>
                            <path d="M67.7567 29.1041L86.5854 61.7164H48.9279L67.7567 29.1041Z"
                                  fill="url(#paint2_linear_202_52)"/>
                            <circle cx="46" cy="46" r="44.5" stroke="white" stroke-width="3"/>
                            <defs>
                                <linearGradient id="paint0_linear_202_52" x1="67.9907" y1="29.3378" x2="24.5077"
                                                y2="29.3378" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#4B6CB7"/>
                                    <stop offset="1" stop-color="#182848"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear_202_52" x1="2.53223" y1="50.8457" x2="46.0153"
                                                y2="50.8457" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#4B6CB7"/>
                                    <stop offset="1" stop-color="#182848"/>
                                </linearGradient>
                                <linearGradient id="paint2_linear_202_52" x1="46.0151" y1="50.8457" x2="89.4982"
                                                y2="50.8457" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#4B6CB7"/>
                                    <stop offset="1" stop-color="#182848"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </section>

            <section className={'addSeller'}>
                <div className="max_width">
                    <div className="sellerContainer">
                        <div className="seller_heading">Welcome to WarrantyVerse</div>
                        <form className="sellerForm">
                            <div className="col">
                                <label htmlFor='SellerName'>Seller Name</label>
                                <input type="text" value={seller.SellerName} onChange={handleChange} name={'SellerName'}
                                       id={'SellerName'}/>
                            </div>
                            <div className="col">
                                <label htmlFor='SellerAddress'>Seller Address</label>

                                <input type="text" value={seller.SellerAddress} onChange={handleChange}
                                       id={'SellerAddress'}
                                       name={'SellerAddress'}/>
                            </div>
                            <div className={'sellerBtn'} onClick={handleSubmit}>Add Seller</div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}