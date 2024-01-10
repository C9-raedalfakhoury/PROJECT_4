/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "../StaticCategory/staticCategory.css"
import { ApplicationContext } from "../../App";
const StaticCategory = () => {
  const { category } = useContext(ApplicationContext);
  return (
    <div className="static">
      {category?.map((item, i) => {
        console.log(item);
        return (
          <button onClick={(e)=>{
            console.log(e.target);
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
