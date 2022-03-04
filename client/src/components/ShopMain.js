import React, {useContext} from 'react';
import mainContext from "../context/mainContext";
import SingleItemForSale from "./SingleItemForSale";

const ShopMain = () => {

    const {productList} = useContext(mainContext)

    return (
        <div className="d-flex wrap">
            {productList && productList.map((x, i) => <SingleItemForSale item={x} key={i} /> )}
        </div>
    );
};

export default ShopMain;