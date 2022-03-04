import React, {useContext, useRef, useState} from 'react';
import mainContext from "../context/mainContext";

const Profile = () => {

    const [status, setStatus] = useState()
    const [statusPsw, setStatusPsw] = useState()
    const {setUser} = useContext(mainContext)
    const emailRef = useRef()
    const emailRepeatRef = useRef()
    const oldPasswordRef = useRef()
    const passwordRef = useRef()
    const passwordRepeatRef = useRef()

    function sendEmailRequest() {

        const user = {
            secretKey: localStorage.getItem("SecretKey"),
            email: emailRef.current.value,
            emailRepeat: emailRepeatRef.current.value,
        }

        const options = {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch(`http://localhost:4000/profileEmail`, options)
            .then(res => res.json())
            .then(data => {
                setStatus(data.message)
                if (data.success) {
                    setUser(data.findUser)
                }
            })
    }

    function sendRequest() {

        const user = {
            secretKey: localStorage.getItem("SecretKey"),
            oldPassword: oldPasswordRef.current.value,
            password: passwordRef.current.value,
            passwordRepeat: passwordRepeatRef.current.value,
        }

        const options = {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch(`http://localhost:4000/profilePassword`, options)
            .then(res => res.json())
            .then(data => {
                setStatusPsw(data.message)
                if (data.success) {
                    setUser(data.findUser)
                }
            })
    }

    return (
        <div className="d-flex j-center">
            <div className="form d-flex column a-center">
                <p>Change email</p>
                <input className="m10" ref={emailRef} type="text" placeholder="New email..."/>
                <input className="m10" ref={emailRepeatRef} type="text" placeholder="Repeat new email..."/>
                <button className="m10" onClick={sendEmailRequest}>Submit</button>
                {status && <p>{status}</p>}
            </div>
            <div className="form d-flex column a-center">
                <p>Change password</p>
                <input className="m10" ref={oldPasswordRef} type="text" placeholder="Old password..."/>
                <input className="m10" ref={passwordRef} type="text" placeholder="New password..."/>
                <input className="m10" ref={passwordRepeatRef} type="text" placeholder="Repeat new password..."/>
                <button className="m10" onClick={sendRequest}>Submit</button>
                {statusPsw && <p>{statusPsw}</p>}
            </div>
        </div>
    );
};

export default Profile;