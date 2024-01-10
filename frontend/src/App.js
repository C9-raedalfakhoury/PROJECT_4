/* eslint-disable no-unused-vars */
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Home from "../src/components/Home/Home.js";
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister.js";
import About from "./components/ِAbout/About.js";
import Contact from "./components/Contact/Contact.js";
import StaticCategory from "./components/StaticCategory/StaticCategory.js";
import ProductByCategoryId from "./components/ProductByCategoryId/ProductByCategoryId.js";
//  import StaticCategory from "../src/components/StaticCategory/StaticCategory.js"
export const ApplicationContext = createContext();
function App() {
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [productByCategory, setProductByCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [toggleHome, setToggleHome] = useState(true);
  console.log(products[0]?.category?.name[0]);
  const navigate = useNavigate();
  const getAllProduct = async () => {
    try {
      const result = await axios.get("http://localhost:5000/products/");
      const data = await result.data;
      console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCategory = async () => {
    try {
      const result = await axios.get("http://localhost:5000/category/all");
      const data = await result.data;
      setCategory(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProduct();
    getAllCategory();
  }, []);
  return (
    <ApplicationContext.Provider
      value={{
        category,
        products,
        setToggleHome,
        setCategoryId,
        productByCategory,
        setProductByCategory,
      }}
    >
      <Navbar />
      {toggleHome ? (
        <Home />
      ) : (
        <Routes>
          <Route path="/Category" element={<StaticCategory />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<LoginAndRegister />} />
          <Route
            path="/ProductByCategoryId"
            element={<ProductByCategoryId />}
          />
        </Routes>
      )}
    </ApplicationContext.Provider>
  );
}

export default App;
