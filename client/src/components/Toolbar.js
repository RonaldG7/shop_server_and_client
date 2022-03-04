import {useContext} from 'react';
import {Link} from "react-router-dom";
import mainContext from "../context/mainContext";

const Toolbar = () => {

    const {user, setUser} = useContext(mainContext)

    function logOut () {
        localStorage.removeItem("SecretKey")
        setUser(null)
    }

    return (
        <div className="d-flex">
            <div className="linkBtn">
                <Link className="link" to="/shop">Shop</Link>
            </div>
            <div className="linkBtn">
                <Link className="link" to="/create">Upload Item</Link>
            </div>
            <div className="linkBtn">
                <Link className="link" to="/inventory">Bought Items</Link>
            </div>
            <div className="linkBtn">
                <Link onClick={logOut} className="link" to="/">Logout</Link>
            </div>
            <div className="toolbarText">
                <p>Logged in as: <b>{user.username}</b></p>
            </div>
            <div className="toolbarText">
                <p>Money: <b>{user.money}</b></p>
            </div>
            <div className="linkBtn">
                <Link className="link" to="/profile">Profile</Link>
            </div>
        </div>
    );
};

export default Toolbar;