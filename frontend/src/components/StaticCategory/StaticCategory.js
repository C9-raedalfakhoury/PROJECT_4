/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { DataShare } from "../../../App";
import "../StaticCategory/staticCategory.css"
const StaticCategory = () => {
  const { categories } = useContext(DataShare);
  return (
    <div className="static">
      {categories?.map((item, i) => {
        return (
          <button
            className="staticImg"
            key={i}
            style={{
              backgroundImage: `linear-gradient( rgba(9, 8, 37, 0.4), rgba(0, 15, 80, 0.7)),url(${item.src})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <p className="categoryName">{item.title}</p>
          </button>
        );
      })}
    </div>
  );
};

export default StaticCategory;
