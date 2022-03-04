import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import GreetingShopPage from "./pages/GreetingShopPage";
import RegisterShopUserPage from "./pages/RegisterShopUserPage";
import LoginToShopPage from "./pages/LoginToShopPage";
import ShopMainPage from "./pages/ShopMainPage";
import CreateItemForSalePage from "./pages/CreateItemForSalePage";
import InventoryPage from "./pages/InventoryPage";
import ProfilePage from "./pages/ProfilePage";
import mainContext from "./context/mainContext";
import {useState} from "react";

const App = () => {

    const [productList, setProductList] = useState()
    const [user, setUser] = useState()

    return (
        <div>
            <mainContext.Provider value={{setProductList, productList, user, setUser}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<GreetingShopPage />} />
                        <Route path="/register" element={<RegisterShopUserPage />}/>
                        <Route path="/login" element={<LoginToShopPage />}/>
                        <Route path="/shop" element={<ShopMainPage />} />
                        <Route path="/create" element={<CreateItemForSalePage />} />
                        <Route path="/inventory" element={<InventoryPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                </BrowserRouter>
            </mainContext.Provider>
        </div>
    );
};

export default App;


// import React, {useEffect, useState} from 'react';
// import "./App.css"
// import LoginUser from "./components/LoginUser";
// import RegisterUser from "./components/RegisterUser";
// import CreatePostUser from "./components/CreatePostUser";
// import ViewUserPosts from "./components/ViewUserPosts";
//
// const App = () => {
//
//     const [posts, setPosts] = useState(null)
//     const [login, setLogin] = useState(null)
//
//     return (
//         <div className="d-flex wrap">
//             <RegisterUser />
//             <LoginUser setLogin={setLogin}/>
//             <CreatePostUser setPosts={setPosts} />
//             <ViewUserPosts posts={posts} setPosts={setPosts} login={login}/>
//         </div>
//     );
// };
//
// export default App;


// import './App.css';
// import {useRef, useState} from "react";
//
// function App() {
//
//     const [some, setSome] = useState()
//     const textRef = useRef()
//
//     function sendRequest() {
//
//         // const domain = {
//         //     domain: textRef.current.value
//         // }
//
//         const id = {
//             id: textRef.current.value
//         }
//
//         const options = {
//             method: "POST",
//             headers: {
//                 "content-type" : "application/json"
//             },
//             body: JSON.stringify(id)
//         }
//
//         fetch(`http://localhost:4000/info`, options)
//             .then(res => res.json())
//             .then(data => {
//                 setSome(data)
//                 console.log(data)
//             })
//     }
//
//     return (
//         <div>
//             <input ref={textRef} type="text" placeholder="Domain..."/>
//             <button onClick={sendRequest}>Send</button>
//                {some &&
//                 <div className="card">
//                     <h2>{some.title}</h2>
//                     <h4>{some.price}</h4>
//                     <h4>{some.displayName}</h4>
//                     <img src={some.image} alt=""/>
//                     <h4>{some.rating}</h4>
//                     <p>{some.comment}</p>
//                 </div>
//                 }
//
//             {/*<h3>{some ? some : ""}</h3>*/}
//         </div>
//     );
// }
//
// export default App;
