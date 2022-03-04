import {useContext, useRef, useState} from 'react';
import mainContext from "../context/mainContext";

const CreateItemForSale = () => {

    const {setProductList, user} = useContext(mainContext)
    const [status, setStatus] = useState(null)

    const imageRef = useRef()
    const titleRef = useRef()
    const priceRef = useRef()

    function sendRequest() {

        const item = {
            secretKey: localStorage.getItem("SecretKey"),
            username: user.username,
            title: titleRef.current.value,
            image: imageRef.current.value,
            price: priceRef.current.value
        }

        const options = {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(item)
        }

        fetch(`http://localhost:4000/create`, options)
            .then(res => res.json())
            .then(data => {
                setStatus(data.message)
                if (data.success) {
                    setProductList(data.products)
                }
            })
    }

    return (
        <div className="form d-flex column a-center">
            <input ref={imageRef} type="text" placeholder="image url..."/>
            <input ref={titleRef} type="text" placeholder="title..."/>
            <input ref={priceRef} type="number" placeholder="price..."/>
            <button onClick={sendRequest}>Submit</button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default CreateItemForSale;