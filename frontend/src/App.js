/* eslint-disable no-unused-vars */
import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { createContext, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "../src/components/Home/Home.js";
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister.js";
import About from "./components/About/About.js";
import Contact from "./components/Contact/Contact.js";
import StaticCategory from "./components/StaticCategory/StaticCategory.js";
import ProductByCategoryId from "./components/ProductByCategoryId/ProductByCategoryId.js";
import Cart from "../src/components/Cart/Cart.js";
import Order from "./components/MyOrder/Order.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageSlider from "./ImageSlider/ImageSlider.js";
import AdminDashboard from "./components/admin/AdminDashboard.js";
export const ApplicationContext = createContext();
function App() {
  const [filter, setFilter] = useState({
    productName: "",
    categoryId: 0,
  });
  const [toggleShuffle, setToggleShuffle] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [productByCategory, setProductByCategory] = useState([]);
  const [toggleHome, setToggleHome] = useState(true);
  const [counter, setCounter] = useState(
    Number(localStorage.getItem("counter")) || 0
  );
  const [products, setProducts] = useState([]);
  const [login, setLogin] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const storedUserInfo = localStorage.getItem("userInfo");
  const initialUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [cartData, setCartData] = useState([]);

  return (
    <ApplicationContext.Provider
      value={{
        setToggleHome,
        setCategoryId,
        productByCategory,
        setProductByCategory,
        filter,
        setFilter,
        setToggleShuffle,
        toggleShuffle,
        token,
        setToken,
        counter,
        setCounter,
        userInfo,
        setUserInfo,
        cartData,
        setCartData,
        setProducts,
        login,
        setLogin,
      }}
    >
      {login.password === "123" ? null : <Navbar />}
      {toggleHome ? (
        <>
          <ImageSlider />
          <Home />
        </>
      ) : (
        <Routes>
          <Route path="/Category" element={<StaticCategory />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<LoginAndRegister />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route
            path="/ProductByCategoryId"
            element={<ProductByCategoryId />}
          />
          <Route path="/Order" element={<Order />} />
        </Routes>
      )}
    </ApplicationContext.Provider>
  );
}
// }
// }

export default App;
