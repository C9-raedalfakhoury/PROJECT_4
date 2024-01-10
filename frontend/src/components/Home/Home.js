/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { ApplicationContext } from "../../App";
import "../Home/Home.css";
import Swal from 'sweetalert2'
const Home = () => { 
  const { products } = useContext(ApplicationContext);
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
          <div onClick={(e)=>{ 
            Swal.getProgressSteps()	
            Swal.fire({
              title: `${item.description}`,
              imageUrl: `${item.imageUrl}`,
              heightAuto:false,
              color:"black", 
              padding:"0px",
              
              // timer: 1500,
              showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `
              },
              hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
              }
            });
          }} className="oneProductCard" key={i}>
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
