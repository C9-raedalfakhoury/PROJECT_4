/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import "./Cart.css";
import { ApplicationContext } from "../../App";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const {
    cartData,
    token,
    userInfo,
    setCartData,
    setCounter,
    cartId,
    setCartId,
  } = useContext(ApplicationContext);

  const calculateTotalPrice = () => {
    return cartData.cart?.reduce((total, item) => {
      return total + item.quantity * item.products.price;
    }, 0);
  };
  // !------
  const [totalPrice, setTotalPrice] = useState(0);
  // !------

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
      setCartId(
        resultCart.data.products.map((item) => {
          return item._id;
        })
      );
      console.log(cartId);
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
        localStorage.setItem("counter", newCounter);
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

              <div className="plusMinus">
                <button
                  class={`circular-button `}
                  style={{
                    pointerEvents: item.quantity === 1 ? "none" : "auto",
                    backgroundColor: item.quantity === 1 ? "gray" : "black",
                  }}
                  onClick={async () => {
                    setCounter((prevCounter) => {
                      const newCounter = prevCounter - 1;
                      localStorage.setItem("counter", newCounter);
                      return newCounter;
                    });
                    // setProduct({
                    //   price: item?.price,
                    //   quantity: counter,
                    //   product: item._id,
                    // });
                    const test = {
                      price: item?.price,
                      quantity: localStorage.getItem("counter"),
                      product: item._id,
                    };
                    try {
                      const response = await axios.post(
                        `http://localhost:5000/cart/${item.products._id}/decrease`,
                        { product: test },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      console.log(response.data);
                      const cartDataNew = cartData?.cart?.map((elem, i) => {
                        if (elem.products._id === item.products._id) {
                          elem.quantity -= 1;
                        }
                        return elem;
                      });
                      console.log(cartDataNew);
                      setCartData({ cart: cartDataNew });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  -
                </button>
                <p className="quantity">{item.quantity}</p>
                <button
                  class="circular-button"
                  onClick={async () => {
                    setCounter((prevCounter) => {
                      const newCounter = prevCounter + 1;
                      localStorage.setItem("counter", newCounter);
                      return newCounter;
                    });
                    // setProduct({
                    //   price: item?.price,
                    //   quantity: counter,
                    //   product: item._id,
                    // });
                    const test = {
                      price: item?.price,
                      quantity: localStorage.getItem("counter"),
                      product: item._id,
                    };
                    try {
                      const response = await axios.post(
                        `http://localhost:5000/cart/${item.products._id}/addtocart`,
                        { product: test },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      console.log(response.data);
                      const cartDataNew = cartData?.cart?.map((elem, i) => {
                        if (elem.products._id === item.products._id) {
                          elem.quantity += 1;
                        }
                        return elem;
                      });
                      console.log(cartDataNew);
                      // setCartData(cartDataNew)
                      setCartData({ cart: cartDataNew });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  +
                </button>
              </div>

              <p className="price">{item.products.price} $</p>
              <p className="totalPrice">
                {item.quantity * item.products.price} $
              </p>
              <MdDeleteForever
                className="iconRabesh"
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleDelete(item._id, item.quantity);
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1000,
                      });
                    }
                  });
                }}
              />
            </div>
          );
        })}
        <div className="totalSum">
          <p>Total Price: {calculateTotalPrice()} $</p>
          <p>Total Items: {cartData?.cart?.length}</p>
          <button
            className="orderBtn"
            onClick={async () => { 
              navigate("/Order");
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
// handleDelete(item._id, item.quantity)
