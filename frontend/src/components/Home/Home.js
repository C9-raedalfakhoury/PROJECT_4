/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { DataShare } from "../../App";
import "../Home/Home.css";
const Home = () => {
  const { products } = useContext(DataShare);
  function shuffleProduct(products) {
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }
  }
  shuffleProduct(products);
  console.log(products);
  return ( 
    <div className="productCard">
      {products?.map((item, i) => {
        return (
          <div className="oneProductCard" key={i}>
            <img className="imgCard" alt="" src={item?.imageUrl[0]}></img>
            <p>{item?.name}</p>
            <div className="iconPrice">
            <p>{item?.price}</p>
            <p>{item?.rate}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
