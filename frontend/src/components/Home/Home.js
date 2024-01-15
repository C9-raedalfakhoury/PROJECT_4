/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../App";
import { BiCartAdd } from "react-icons/bi";
import "../Home/Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const Home = () => {
  let { filter, token, setToggleHome, setCounter, counter ,userInfo} =
    useContext(ApplicationContext); 

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  function shuffleProduct(products) {
    const productCopy = [...products];
    for (let i = productCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [productCopy[i], productCopy[j]] = [productCopy[j], productCopy[i]];
    }
    setProducts(productCopy);
  }

  const getAllProduct = async (filter) => {
    try {
      const result = await axios.get(`http://localhost:5000/products`, {
        params: { filter: filter?.productName || "" },
      });
      const data = await result.data;
      shuffleProduct(data.products);
    } catch (error) {
      console.log(error); 
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (filter?.productName) {
        await getAllProduct(filter);
      } else {
        await getAllProduct({ productName: "", categoryId: 0 });
      }
    }
    fetchData();
  }, [filter?.productName]);
  return (
    <div className="productCard">
      {products?.map((item, i) => {  
        return (
          <div className="oneProductCard" key={i}>
            <img
              className="imgCard"
              alt=""
              src={item?.imageUrl}
              onClick={() => {
                Swal.getProgressSteps();
                Swal.fire({
                  title: `${item.description}`,
                  imageUrl: `${item.imageUrl}`,
                  heightAuto: false,
                  imageWidth: "300px",
                  imageHeight: "300px",
                  color: "black",
                  padding: "0px",
                  showClass: {
                    popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `,
                  },
                  hideClass: {
                    popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `,
                  },
                });
              }}
            ></img>
            <p>{item?.name}</p>
            <p>{item?.price}</p>
            <div className="iconPrice">
              <p>{item?.rate}</p>
              <BiCartAdd
                className="addToCart"
                onClick={() => {
                  console.log(item);
                  if (!token) {
                    Swal.fire({
                      title: "Please Login?",
                      text: "You cannot add the product to the cart!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Login",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate("/Login");
                        setToggleHome(false);
                      }
                    });
                  } else {
                    console.log(item._id);
                    setCounter((counter += 1));
                    setProduct({
                      price: item?.price,
                      quantity: counter,
                      product: item._id,
                    });
                    const test = {
                      price: item?.price,
                      quantity: counter,
                      product: item._id,
                    }; 
                    axios
                      .post(
                        `http://localhost:5000/cart/${item._id}/addtocart`,
                        { product: test },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                      .then((result) => {
                        console.log(result);
                      })
                      .catch((err) => {
                        console.log(err); 
                      });
                  }
                  {
                  }
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
