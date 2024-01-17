/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import "../Navbar/Navbar.css";
import { MdOutlinePerson3 } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../../App";
import axios from "axios";
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const { setToggleHome, setFilter, userInfo, counter, token, setCartData } =
    useContext(ApplicationContext);
  return (
    <div className="Navbar">
      <div className="logoText">
        <h2 data-text="Creative" className="creative">
          Creative
        </h2>
      </div>
      <div className="link">
        <input
          onClick={async () => {
            navigate("/Home");
            setToggleHome(true);
          }}
          type="button"
          value="Home"
        />
        <input
          onClick={() => {
            navigate("/Category");
            setToggleHome(false);
          }}
          type="button"
          value="Category"
        />
      
        <input
          onClick={() => {
            navigate("/About");
            setToggleHome(false);
          }}
          type="button"
          value="About"
        />
        <input
          onClick={() => {
            navigate("/Contact");
            setToggleHome(false);
          }}
          type="button"
          value="Contact"
        />
      </div>
      <div className="icon">
        <div class="searchBox">
          <input
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(value);
            }}
            class="searchInput"
            type="text"
            placeholder="Search Product"
          ></input>
          <button
            onClick={() => {
              setFilter((prevObject) => {
                return {
                  ...prevObject,
                  productName: searchTerm,
                };
              });
            }}
            class="searchButton"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 29 29"
              fill="none"
            >
              <g clip-path="url(#clip0_2_17)">
                <g filter="url(#filter0_d_2_17)">
                  <path
                    d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                    stroke="white"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    shape-rendering="crispEdges"
                  ></path>
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_2_17"
                  x="-0.318549"
                  y="2.70435"
                  width="50"
                  height="50"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood
                    flood-opacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  ></feColorMatrix>
                  <feOffset dy="4"></feOffset>
                  <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                  <feComposite in2="hardAlpha" operator="out"></feComposite>
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  ></feColorMatrix>
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_2_17"
                  ></feBlend>
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_2_17"
                    result="shape"
                  ></feBlend>
                </filter>
                <clipPath id="clip0_2_17">
                  <rect
                    width="28.0702"
                    height="28.0702"
                    fill="white"
                    transform="translate(0.403503 0.526367)"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>

        <MdOutlinePerson3
          onClick={() => {
            navigate("/Login");
            setToggleHome(false);
          }}
          className="personIcon"
        />
        <HiOutlineShoppingCart
          className="cartIcon"
          onClick={async () => {
            setToggleHome(false);
            navigate("/Cart");
            try {
              const resultCart = await axios.get(
                `http://localhost:5000/cart/${userInfo.result._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const cart = resultCart.data.products;
              setCartData((previos) => {
                return { ...previos, cart };
              });
            } catch (error) {
              console.log(error);
            }
          }}
        />
        <p className="counter">{counter}</p>
      </div>
    </div>
  );
};

export default Navbar;
/*
const getScore = (req, res) => {
  restarantsModel
    .find({ grades: { $elemMatch: { score: { $gte: 90 } } } })

    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
============
{
      "address": {
        "building": "1007",
        "coord": [
          -73.856077,
          40.848447
        ],
        "street": "Morris Park Ave",
        "zipcode": "10462"
      },
      "borough": "Bronx",
      "cuisine": "Bakery",
      "grades": [
        {
          "date": {
            "$date": 1393804800000
          },
          "grade": "A",
          "score": 2
        },
        {
          "date": {
            "$date": 1378857600000
          },
          "grade": "A",
          "score": 6
        },
        {
          "date": {
            "$date": 1358985600000
          },
          "grade": "A",
          "score": 10
        },
        {
          "date": {
            "$date": 1322006400000
          },
          "grade": "A",
          "score": 9
        },
        {
          "date": {
            "$date": 1299715200000
          },
          "grade": "B",
          "score": 14
        }
      ],
      "name": "Morris Park Bake Shop",
      "restaurant_id": "30075445"
    },
*/  
