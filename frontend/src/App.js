/* eslint-disable no-unused-vars */
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import Home from "../src/components/Home/Home.js";
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister.js";
import About from "./components/ِAbout/About.js";
export const DataShare = createContext();
function App() {
  const [products, setProducts] = useState([]);
  console.log(products[0]?.category?.name[0]);
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
  useEffect(() => {
    getAllProduct();
  }, []);
  const categories = [
    {
      title: "FURNITURE",
      src: "https://uniqlo-8.myshopify.com/cdn/shop/products/6_3771d027-5361-4ae9-a469-3b7b699cb3c2_grande.jpg?v=1520307198",
    },
    {
      title: "ELECTRONICS",
      src: "https://uniqlo-9.myshopify.com/cdn/shop/products/14_384479f1-c308-4765-8bec-b517963de0ee_grande.jpg?v=1520324582",
    },
    {
      title: "JEWELRY",
      src: "https://uniqlo-10.myshopify.com/cdn/shop/products/28_a8d9ffe1-1e4b-4150-8895-16cdd567292d_grande.jpg?v=1520394209",
    },
    {
      title: "CLOTHES",
      src: "https://uniqlo-2.myshopify.com/cdn/shop/articles/30.jpg?v=1511411380",
    },
  ];
  return (
    <DataShare.Provider value={{ categories, products }}>
      <div className="App">
        <Navbar /> 
        <About/>
      </div>
    </DataShare.Provider>
  );
}

export default App;
