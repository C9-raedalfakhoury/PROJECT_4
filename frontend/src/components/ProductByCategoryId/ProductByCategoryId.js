/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { useContext, useState ,useEffect} from "react";
import { ApplicationContext } from "../../App";
import Swal from "sweetalert2";
import "../ProductByCategoryId/ProductByCategoryId.css";
import { BiCartAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ProductByCategoryId = () => {
  const navigate = useNavigate();
  const [tokenExpiration, setTokenExpiration] = useState(0);
  const [product, setProduct] = useState({});
  const { productByCategory, token, setToggleHome, setCounter, counter } =
    useContext(ApplicationContext);  
    useEffect(() => {
      setTokenExpiration(Date.now() + 60 * 60 * 1000); // اعتبارًا من الوقت الحالي + 60 دقيقة
    }, [token]);
  return (
    <div className="specificCategory">
      {productByCategory?.map((item, i) => {
        return (
          <div className="oneProductCard" key={i}>
            <img
              className="imgCard"
              alt=""
              src={item?.imageUrl}
              onClick={(e) => {
                Swal.getProgressSteps();
                Swal.fire({
                  title: `${item.description}`,
                  imageUrl: `${item.imageUrl}`,
                  heightAuto: false,
                  color: "black",
                  padding: "0px",

                  // timer: 1500,
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
            <p className="itemName">{item?.name}</p>
              <p className="itemPrice">{item?.price}</p>
            <div className="iconPrice">
              <p  className="itemRate">{item?.rate}</p>
              <BiCartAdd
                className="addToCart"
                onClick={async () => {
                  if (!token || Date.now() > tokenExpiration) {
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
                    setCounter((prevCounter) => {
                      const newCounter = prevCounter + 1;
                      sessionStorage.setItem("counter", newCounter);
                      return newCounter;
                    });
                    setProduct({
                      price: item?.price,
                      quantity: counter,
                      product: item._id,
                    });
                    const test = {
                      price: item?.price,
                      quantity: localStorage.getItem("counter"),
                      product: item._id,
                    };
                    try {
                      const response = await axios.post(
                        `http://localhost:5000/cart/${item._id}/addtocart`,
                        { product: test },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      console.log(response.data);
                    } catch (error) {
                      console.log(error);
                    }
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

export default ProductByCategoryId;
