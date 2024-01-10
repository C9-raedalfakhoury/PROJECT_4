/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "../StaticCategory/staticCategory.css";
import { ApplicationContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StaticCategory = () => {
  const navigate = useNavigate();

  const { category, setCategoryId, setToggleHome, setProductByCategory ,productByCategory} =
    useContext(ApplicationContext); 
  return (
    <div className="static">
      {category?.map((item, i) => {
        console.log(item._id);
        return (
          <button
            onClick={async (e) => {
              try {
                setCategoryId(item._id);
                navigate("/ProductByCategoryId");
                setToggleHome(false);
                const result = await axios.get(
                  `http://localhost:5000/products/${item._id}/products`
                );
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
