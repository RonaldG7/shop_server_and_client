import InventoryBoughtItems from "../components/InventoryBoughtItems";
import Toolbar from "../components/Toolbar";
import {useContext} from "react";
import mainContext from "../context/mainContext";

const InventoryPage = () => {

    const {user} = useContext(mainContext)

    return (
        <>
            <Toolbar/>
            <div className="d-flex wrap">
                {user.boughtItems && user.boughtItems.map((x, i) =>
                    <InventoryBoughtItems item={x} key={i} />)}
            </div>

        </>
    );
};

export default InventoryPage;