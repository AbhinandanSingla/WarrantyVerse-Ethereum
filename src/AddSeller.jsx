import {useEffect, useState} from "react";
import {useMetaMask} from "./hooks/useMetaMask";
import logo from './assets/common/img/logo.svg';
import './assets/css/AddSeller.css';
import {addSeller} from "./scripts/addSeller";

export function AddSeller() {
    const [seller, setValue] = useState({'SellerAddress': '', 'SellerName': ''});
    const [error, setError] = useState('');
    const context = useMetaMask();
    useEffect(() => {
        // console.log(context.haveMetamask);
        // console.log(context.accountAddress);

    }, [context.accountAddress, context.haveMetamask]);

    function errorPage() {
        if (error === '') {
            return '';
        } else {
            return (<div className="errorBox">
                    <div className="max_width">

                    </div>
                </div>
            );
        }
    }

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

    return (
        <section className={'addSeller'}>
            <div className="max_width">
                <div className="sellerContainer">
                    <div className="logoContainer">
                        <img src={logo} alt=""/>
                        <div className="logoText">WarrantyVerse</div>
                    </div>
                    <div className="seller_heading">Welcome to <span>WarrantyVerse</span></div>
                    <form className="sellerForm">
                        <div className="col">
                            <label htmlFor='SellerName'>Seller Name</label>
                            <input type="text" value={seller.SellerName} onChange={handleChange} name={'SellerName'}
                                   id={'SellerName'}/>
                        </div>
                        <div className="col">
                            <label htmlFor='SellerAddress'>Seller Address</label>

                            <input type="text" value={seller.SellerAddress} onChange={handleChange} id={'SellerAddress'}
                                   name={'SellerAddress'}/>
                        </div>
                        <div className={'sellerBtn'} onClick={handleSubmit}>Add Seller</div>
                    </form>
                </div>
                {errorPage}
            </div>

        </section>)
}