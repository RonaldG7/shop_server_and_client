import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

const RegisterUser = () => {

    const [status, setStatus] = useState(null)

    const username = useRef()
    const email = useRef()
    const password = useRef()
    const password2 = useRef()
    const nav = useNavigate()

    function sendRequest() {

        const user = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
            password2: password2.current.value,
        }

        const options = {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch(`http://localhost:4000/register`, options)
            .then(res => res.json())
            .then(data => {
                if (!data.success) {
                    setStatus(data)
                } else {
                    nav("/login")
                }
            })
    }

    return (
        <div className="d-flex j-center">
            <div className="form d-flex column a-center">
                <p>Register</p>
                <input className="m10" ref={username} type="text" placeholder="username..."/>
                <input className="m10" ref={email} type="text" placeholder="email..."/>
                <input className="m10" ref={password} type="text" placeholder="password..."/>
                <input className="m10" ref={password2} type="text" placeholder="repeat password..."/>
                <button className="m10" onClick={sendRequest}>Submit</button>
                <button onClick={() => nav(-1)}>Go Back</button>
                {status && <p>{status.message}</p>}
            </div>
        </div>

    );
};

export default RegisterUser;