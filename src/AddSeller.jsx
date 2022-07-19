import {useEffect, useState} from "react";
import {useMetaMask} from "./hooks/useMetaMask";

export function AddSeller() {
    const [seller, setValue] = useState({});
    const context = useMetaMask();
    useEffect(() => {
        console.log(context.haveMetamask);
        console.log(context.accountAddress);
    }, [context.accountAddress, context.haveMetamask]);

    function handleChange(event) {
        setValue((value => ({
            ...value, [event.target.name]: event.target.value
        })));
        console.log(seller)
    }

    function handleSubmit(event) {
        console.log(event)
        event.preventDefault();
        console.log(seller)
    }

    return (
        <section className={'AddSeller'}>
            <form className="sellerForm">
                <input type="text" value={seller.name} onChange={handleChange} name={'SellerName'}/>
                <input type="text" value={seller.address} onChange={handleChange} name={'SellerAddress'}/>
                <button onClick={handleSubmit} value={'Submit'}/>
            </form>
        </section>)
}