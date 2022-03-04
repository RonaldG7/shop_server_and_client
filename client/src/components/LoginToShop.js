import {useContext, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import mainContext from "../context/mainContext";

const LoginUser = () => {

    const {setUser, setProductList} = useContext(mainContext)
    const [status, setStatus] = useState(null)

    const username = useRef()
    const password = useRef()
    const nav = useNavigate()

    function sendRequest() {

        const user = {
            username: username.current.value,
            password: password.current.value,
        }

        const options = {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch(`http://localhost:4000/login`, options)
            .then(res => res.json())
            .then(data => {
                setStatus(data.message)
                if (data.success) {
                    localStorage.setItem("SecretKey", data.findUser.secretKey)
                    setUser(data.findUser)
                    setProductList(data.products)
                    nav("/shop")
                }
            })
    }

    return (
        <div className="d-flex j-center">
            <div className="form d-flex column a-center">
                <p>Login</p>
                <input className="m10" ref={username} type="text" placeholder="username..."/>
                <input className="m10" ref={password} type="text" placeholder="password..."/>
                <button className="m10" onClick={sendRequest}>Login</button>
                <button onClick={() => nav(-1)}>Go Back</button>
                {status && <p>{status}</p>}
            </div>
        </div>

    );
};

export default LoginUser;