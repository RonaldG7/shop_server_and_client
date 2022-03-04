import {useContext} from 'react';
import mainContext from "../context/mainContext";

const SingleItemForSale = ({item}) => {

    const {user, setProductList, setUser} = useContext(mainContext)

    function sendRequest() {

        const buy = {
            id: item.id,
            secretKey: localStorage.getItem("SecretKey")
        }

        const options = {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(buy)
        }

        fetch(`http://localhost:4000/buy`, options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProductList(data.products)
                    setUser(data.findUser)
                }
            })
    }

    return (
        <div className="form d-flex column a-center">
            <img src={item.image} alt=""/>
            <h4>{item.title}</h4>
            <h4>{item.price}</h4>
            {user.username !== item.username && <button onClick={sendRequest}>Buy</button>}
        </div>
    );
};

export default SingleItemForSale;