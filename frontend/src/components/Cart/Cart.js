/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "../Cart/Cart.css";
import { ApplicationContext } from "../../App";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

const Cart = () => {
  const { cartData, token, userInfo, setCartData, setCounter } =
    useContext(ApplicationContext);

  const calculateTotalPrice = () => {
    return cartData.cart?.reduce((total, item) => {
      return total + item.quantity * item.products.price;
    }, 0);
  };

  const getCart = async () => {
    try {
      const resultCart = await axios.get(
        `http://localhost:5000/cart/${userInfo.result._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartData({ cart: resultCart.data.products });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (itemId, quantity) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/cart/${itemId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result.data);

      setCounter((prevCounter) => {
        const newCounter = prevCounter - quantity;
        sessionStorage.setItem("counter", newCounter);
        return newCounter;
      });

      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="panel">
        <p className="products">Products</p>
        <p className="products">Quantity</p>
        <p className="products">Price</p>
        <p className="products">Total Price$</p>
        <p className="products">Remove</p>
      </div>
      <div className="product">
        {cartData.cart?.map((item, i) => {
          return (
            <div className="rowOfCart" key={item._id}>
              <img className="image" alt="" src={item.products.imageUrl}></img>
              <p className="quantity">{item.quantity}</p>
              <p className="price">{item.products.price} $</p>
              <p className="totalPrice">
                {item.quantity * item.products.price} $
              </p>
              <MdDeleteForever
                className="iconRabesh"
                onClick={() => handleDelete(item._id, item.quantity)}
              />
            </div>
          );
        })}
        <div className="totalSum">
          <p>Total Price: {calculateTotalPrice()} $</p>
          <p>Total Items: {cartData?.cart?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
