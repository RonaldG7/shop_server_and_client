import React, {useContext, useRef, useState} from 'react';
import mainContext from "../context/mainContext";


const InventoryBoughtItems = ({item}) => {

    const {setProductList, setUser} = useContext(mainContext)
    const [status, setStatus] = useState(null)
    const priceRef = useRef()

    function sendRequest() {

        const changePrice = {
            newPrice: priceRef.current.value,
            id: item.id,
            secretKey: localStorage.getItem("SecretKey")
        }

        const options = {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(changePrice)
        }

        fetch(`http://localhost:4000/changePrice`, options)
            .then(res => res.json())
            .then(data => {
                setStatus(data.message)
                if (data.success) {
                    setUser(data.findUser)
                }
            })
        priceRef.current.value = ""
    }

    function sendForSale() {

        const sell = {
            id: item.id,
            secretKey: localStorage.getItem("SecretKey")
        }

        const options = {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(sell)
        }

        fetch(`http://localhost:4000/sell`, options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUser(data.findUser)
                    setProductList(data.products)
                }
            })
        priceRef.current.value = ""
    }

    return (
        <div className="form d-flex column a-center">
            <img src={item.image} alt=""/>
            <p>{item.title}</p>
            <p>{item.price}</p>
            <div className="d-flex a-center j-center">
                <input type="number" ref={priceRef}/>
                <button onClick={sendRequest}>Change price</button>
            </div>
            <button onClick={sendForSale}>Sell</button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default InventoryBoughtItems;