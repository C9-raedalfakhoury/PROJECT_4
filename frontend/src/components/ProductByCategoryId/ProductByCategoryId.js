/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ApplicationContext } from "../../App";
import Swal from "sweetalert2";
import "../ProductByCategoryId/ProductByCategoryId.css";
const ProductByCategoryId = () => {
  const { productByCategory } = useContext(ApplicationContext);
  return (
    <div className="specificCategory">
      {productByCategory?.map((item, i) => {
        return (
          <div
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
            className="oneProductCard"
            key={i}
          >
            <img className="imgCard" alt="" src={item?.imageUrl[0]}></img>
            <p>{item?.name}</p>
            <div className="iconPrice">
              <p>{item?.price}</p>
              <p>{item?.rate}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductByCategoryId;
