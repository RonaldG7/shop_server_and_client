import {useNavigate} from "react-router-dom"

const GreetingShop = () => {

    const nav = useNavigate()

    return (
        <div className="d-flex column a-center">
            <h1>Welcome!</h1>
            <div>
                <button onClick={() => nav("/register")}>Register</button>
                <button onClick={() => nav("/login")}>Login</button>
            </div>

        </div>
    );
};

export default GreetingShop;