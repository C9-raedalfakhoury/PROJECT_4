/* eslint-disable no-unused-vars */
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import React, { createContext, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import StaticCategory from "./components/Navbar/StaticCategory/StaticCategory";
export const DataShare = createContext();
function App() {
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
    <DataShare.Provider value={{ categories }}>
      <div className="App">
        <Navbar />
        
      </div>
    </DataShare.Provider>
  );
}

export default App;
