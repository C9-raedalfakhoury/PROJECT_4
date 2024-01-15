/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "../Cart/Cart.css";
import { ApplicationContext } from "../../App";
const Cart = () => {
  const {cartData} = useContext(ApplicationContext);  
   return (
    <div className="main">
      <div className="panel">
        <p className="products">Products</p>
        <p className="products">Quantity</p>
        <p className="products">Price</p>
        <p className="products">Remove</p>
      </div>
      <div className="product">
        {cartData.cart?.map((item,i)=>{ 
          return ( <>
          <img key={item?._id} alt="" src={item?.products.imageUrl}></img>
          <p>Q{item?.quantity}</p>
          <p>p{item?.products.price}</p>
          </>
          )
        })}
      </div>
    </div>
  );
};

export default Cart;
