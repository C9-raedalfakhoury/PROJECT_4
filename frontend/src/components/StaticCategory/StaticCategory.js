/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "../StaticCategory/staticCategory.css";
import { ApplicationContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StaticCategory = () => {
   const [category, setCategory] = useState([]);
  const getAllCategory = async () => {
    try {
      const result = await axios.get("https://smart-shopper-19vo.onrender.com/category/all");
      const data = await result.data;
      setCategory(data.result);
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  const navigate = useNavigate();

  const { setCategoryId, setToggleHome, setProductByCategory } =
    useContext(ApplicationContext);
  return (
    <div className="static">
      {category?.map((item, i) => {
        return (
          <button
            onClick={async (e) => {
              try {
                setCategoryId(item._id);
                navigate("/ProductByCategoryId");
                setToggleHome(false);
                const result = await axios.get(
                  `https://smart-shopper-19vo.onrender.com/products/${item._id}/products`
                );
                console.log(result.data);
                setProductByCategory(result?.data?.result);
              } catch (error) {
                console.log(error?.response?.data?.message);
              }
            }}
            className="staticImg"
            key={i}
            style={{
              backgroundImage: `linear-gradient( rgba(9, 8, 37, 0.4), rgba(0, 15, 80, 0.7)),url(${item.imageUrl})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <p className="categoryName">{item.name}</p>
          </button>
        );
      })}
    </div>
  );
};

export default StaticCategory;
