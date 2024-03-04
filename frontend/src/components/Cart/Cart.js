/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
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
   

  const getCart = async () => {
    try {
      const resultCart = await axios.get(
        `https://smart-shopper-19vo.onrender.com/cart/${userInfo.result._id}`,
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
        `https://smart-shopper-19vo.onrender.com/cart/${itemId}/delete`,
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
                        `https://smart-shopper-19vo.onrender.com/cart/${item.products._id}/decrease`,
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
                        `https://smart-shopper-19vo.onrender.com/cart/${item.products._id}/addtocart`,
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


/*

 
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GiPositionMarker } from "react-icons/gi";
import "../Weather/Weather.css";
import { UseDispatch, useDispatch, useSelector } from "react-redux";

import forecastSlice, { setForecast } from "../redux/reducers/weather";

function Weather() {
  const dispatch = useDispatch();
  const { forecast } = useSelector((state) => {
    return {
      forecast: state.forecast.forecast,
    };
  });
  const [loader, setLoader] = useState(true);
  // const [forecast, setForecast] = useState();

  const dayOfWeek = (date) => {
    const currentDate = new Date(date);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = days[currentDate.getDay()];
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${dayOfWeek}`;
    return formattedDate;
  };
  const getCoordinates = async () => {
    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };
  const getData = async (lat, lang) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lang}&appid=20df6ed2d3d499f39b1ec55b2f5a7406&units=metric`;

    try {
      const result = await axios.get(url);
      console.log(result.data);
      if (result.data) {
        setLoader(false);
      }
      getClimatePrediction(result?.data?.name);
    } catch (error) {
      console.log("ERROR ====> ", error);
    }
  };
  const currentDay = () => {
    const currentDate = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = days[currentDate.getDay()];
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${dayOfWeek}, ${day}-${month}-${year}`;
    console.log(formattedDate);
    return formattedDate;
  };
  const getClimatePrediction = (currentCity) => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=1612951226954bf0ada164306232012
        &q=${currentCity}&days=4&aqi=no&alerts=no`
      )
      .then((res) => {
        // setForecast(res?.data);
        dispatch(setForecast(res?.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getCoordinates()
      .then(async (result) => {
        await getData(result?.coords?.latitude, result?.coords?.longitude);
      })
      .catch((err) => {
        console.log("error from get coordinate ", err);
      });
  }, []);

  return (
    <>
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

        <div className="tempreture">
          <h1>{forecast?.current?.temp_c} </h1>°
        </div>
        <img id="img" alt="" src={forecast?.current?.condition?.icon}></img>
        <h3>{forecast?.current?.condition?.text}</h3>
        <div className="reelFeel">
          <p className="p">Real Feal : {forecast?.current?.feelslike_c} °</p>
          <p className="p">humidity : {forecast?.current?.humidity} %</p>
        </div>

        <div className="forThreeDays">
          {forecast?.forecast?.forecastday?.map((day, i) => {
            return (
              <div key={i} className="forOneDay">
                <h5>{dayOfWeek(day?.date).slice(0, 3)}</h5>
                <img alt="" src={day?.day?.condition?.icon}></img>
                <h5>{day?.day?.maxtemp_c}°</h5>
              </div>
            );
          })}
        </div>

        <h4>{currentDay()}</h4>
        <div className="position">
          <GiPositionMarker />
          <p>{forecast?.location?.country}</p> ,
          <p>{forecast?.location?.name}</p>
        </div>
      </div>
    </>
  );
}

export default Weather;








*/ 


/*
*{
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
}
.p{
    font-size: 20px;
}
svg{
    font-size: 25px;
    color: red;
}
.forThreeDays{
    display: flex;  
    background-color: #77abeb54;
    padding: 2px;
}
.forOneDay{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.tempreture{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
.reelFeel{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
@keyframes move {
    100% {
        transform: translate3d(0, 0, 1px) rotate(360deg);
    }
}
#img{
    width: 80px;
    height: 80px; 
}
.background {
    display: flex;
    flex-direction: column;
    position:  relative;
    width: fit-content;
    height: fit-content;
    top: 0;
    left: 0;
    background: #0a032a;
    overflow: hidden;
    color: white;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
    gap: 15px;
}
.position{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}
.background span {
    width: 1vmin;
    height: 1vmin;
    border-radius: 1vmin;
    backface-visibility: hidden;
    position: absolute;
    animation: move;
    animation-duration: 44;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}


.background span:nth-child(0) {
    color: #ffffff;
    top: 75%;
    left: 56%;
    animation-duration: 11s;
    animation-delay: -48s;
    transform-origin: -19vw -17vh;
    box-shadow: -2vmin 0 1.0100910343163383vmin currentColor;
}
.background span:nth-child(1) {
    color: #0027eb;
    top: 68%;
    left: 76%;
    animation-duration: 16s;
    animation-delay: -54s;
    transform-origin: 14vw 10vh;
    box-shadow: 2vmin 0 0.8305807112020127vmin currentColor;
}
.background span:nth-child(2) {
    color: #0027eb;
    top: 82%;
    left: 88%;
    animation-duration: 7s;
    animation-delay: -35s;
    transform-origin: -23vw -12vh;
    box-shadow: -2vmin 0 0.659628792527744vmin currentColor;
}
.background span:nth-child(3) {
    color: #ffffff;
    top: 82%;
    left: 42%;
    animation-duration: 38s;
    animation-delay: -4s;
    transform-origin: -18vw 24vh;
    box-shadow: -2vmin 0 0.9934502140316672vmin currentColor;
}
.background span:nth-child(4) {
    color: #ffffff;
    top: 1%;
    left: 55%;
    animation-duration: 41s;
    animation-delay: -34s;
    transform-origin: -23vw -20vh;
    box-shadow: 2vmin 0 0.27335966687568103vmin currentColor;
}
.background span:nth-child(5) {
    color: #f70202;
    top: 4%;
    left: 39%;
    animation-duration: 14s;
    animation-delay: -44s;
    transform-origin: 10vw 15vh;
    box-shadow: -2vmin 0 1.0662144028947116vmin currentColor;
}
.background span:nth-child(6) {
    color: #f70202;
    top: 32%;
    left: 90%;
    animation-duration: 52s;
    animation-delay: -13s;
    transform-origin: -2vw -22vh;
    box-shadow: -2vmin 0 0.6737367012403153vmin currentColor;
}
.background span:nth-child(7) {
    color: #ffffff;
    top: 74%;
    left: 12%;
    animation-duration: 64s;
    animation-delay: -26s;
    transform-origin: -11vw -7vh;
    box-shadow: 2vmin 0 1.1098757702633664vmin currentColor;
}
.background span:nth-child(8) {
    color: #f70202;
    top: 56%;
    left: 97%;
    animation-duration: 56s;
    animation-delay: -6s;
    transform-origin: 13vw -6vh;
    box-shadow: -2vmin 0 1.0896425597825987vmin currentColor;
}
.background span:nth-child(9) {
    color: #ffffff;
    top: 43%;
    left: 94%;
    animation-duration: 23s;
    animation-delay: -22s;
    transform-origin: 10vw -8vh;
    box-shadow: 2vmin 0 0.5261147792097245vmin currentColor;
}
.background span:nth-child(10) {
    color: #f70202;
    top: 55%;
    left: 96%;
    animation-duration: 32s;
    animation-delay: -39s;
    transform-origin: -22vw 8vh;
    box-shadow: 2vmin 0 1.0686246749674249vmin currentColor;
}
.background span:nth-child(11) {
    color: #f70202;
    top: 47%;
    left: 31%;
    animation-duration: 57s;
    animation-delay: -13s;
    transform-origin: 1vw -20vh;
    box-shadow: -2vmin 0 0.37052899937801165vmin currentColor;
}
.background span:nth-child(12) {
    color: #f70202;
    top: 1%;
    left: 91%;
    animation-duration: 53s;
    animation-delay: -21s;
    transform-origin: -17vw -20vh;
    box-shadow: 2vmin 0 0.4286749451141405vmin currentColor;
}
.background span:nth-child(13) {
    color: #0027eb;
    top: 79%;
    left: 14%;
    animation-duration: 49s;
    animation-delay: -27s;
    transform-origin: 0vw 22vh;
    box-shadow: 2vmin 0 0.48313721168776835vmin currentColor;
}
.background span:nth-child(14) {
    color: #f70202;
    top: 38%;
    left: 81%;
    animation-duration: 58s;
    animation-delay: -20s;
    transform-origin: 8vw -24vh;
    box-shadow: -2vmin 0 0.7299032059852142vmin currentColor;
}
.background span:nth-child(15) {
    color: #f70202;
    top: 81%;
    left: 34%;
    animation-duration: 29s;
    animation-delay: -31s;
    transform-origin: -24vw -11vh;
    box-shadow: -2vmin 0 0.8526691035713176vmin currentColor;
}
.background span:nth-child(16) {
    color: #f70202;
    top: 76%;
    left: 38%;
    animation-duration: 33s;
    animation-delay: -8s;
    transform-origin: -3vw 0vh;
    box-shadow: 2vmin 0 0.7954607724079938vmin currentColor;
}
.background span:nth-child(17) {
    color: #ffffff;
    top: 36%;
    left: 100%;
    animation-duration: 6s;
    animation-delay: -27s;
    transform-origin: -16vw 23vh;
    box-shadow: 2vmin 0 1.0426435559225598vmin currentColor;
}
.background span:nth-child(18) {
    color: #ffffff;
    top: 100%;
    left: 59%;
    animation-duration: 16s;
    animation-delay: -40s;
    transform-origin: -3vw 14vh;
    box-shadow: -2vmin 0 0.7155299034539011vmin currentColor;
}
.background span:nth-child(19) {
    color: #0027eb;
    top: 26%;
    left: 44%;
    animation-duration: 7s;
    animation-delay: -43s;
    transform-origin: 9vw 15vh;
    box-shadow: -2vmin 0 0.6525023005450554vmin currentColor;
}
.background span:nth-child(20) {
    color: #ffffff;
    top: 40%;
    left: 21%;
    animation-duration: 43s;
    animation-delay: -52s;
    transform-origin: 19vw -4vh;
    box-shadow: -2vmin 0 0.7484527579100078vmin currentColor;
}
.background span:nth-child(21) {
    color: #f70202;
    top: 22%;
    left: 91%;
    animation-duration: 54s;
    animation-delay: -57s;
    transform-origin: -17vw -14vh;
    box-shadow: 2vmin 0 0.5748384298724492vmin currentColor;
}
.background span:nth-child(22) {
    color: #ffffff;
    top: 65%;
    left: 53%;
    animation-duration: 54s;
    animation-delay: -35s;
    transform-origin: -21vw -11vh;
    box-shadow: -2vmin 0 0.96791719126197vmin currentColor;
}
.background span:nth-child(23) {
    color: #ffffff;
    top: 47%;
    left: 35%;
    animation-duration: 12s;
    animation-delay: -8s;
    transform-origin: -22vw 7vh;
    box-shadow: -2vmin 0 0.6769151683105146vmin currentColor;
}
.background span:nth-child(24) {
    color: #0027eb;
    top: 34%;
    left: 44%;
    animation-duration: 63s;
    animation-delay: -4s;
    transform-origin: -13vw 17vh;
    box-shadow: -2vmin 0 0.5675774506520006vmin currentColor;
}
.background span:nth-child(25) {
    color: #0027eb;
    top: 18%;
    left: 80%;
    animation-duration: 62s;
    animation-delay: -17s;
    transform-origin: -2vw 20vh;
    box-shadow: -2vmin 0 1.0806926795151814vmin currentColor;
}
.background span:nth-child(26) {
    color: #ffffff;
    top: 52%;
    left: 24%;
    animation-duration: 62s;
    animation-delay: -47s;
    transform-origin: -3vw -3vh;
    box-shadow: -2vmin 0 0.38572611045784777vmin currentColor;
}
.background span:nth-child(27) {
    color: #ffffff;
    top: 50%;
    left: 89%;
    animation-duration: 37s;
    animation-delay: -17s;
    transform-origin: -15vw -2vh;
    box-shadow: 2vmin 0 0.6673436351640927vmin currentColor;
}
.background span:nth-child(28) {
    color: #f70202;
    top: 61%;
    left: 51%;
    animation-duration: 36s;
    animation-delay: -43s;
    transform-origin: 0vw 9vh;
    box-shadow: -2vmin 0 0.8381491035059028vmin currentColor;
}
.background span:nth-child(29) {
    color: #f70202;
    top: 25%;
    left: 16%;
    animation-duration: 28s;
    animation-delay: -9s;
    transform-origin: -12vw -3vh;
    box-shadow: 2vmin 0 0.9518869652060193vmin currentColor;
}
.background span:nth-child(30) {
    color: #0027eb;
    top: 31%;
    left: 87%;
    animation-duration: 19s;
    animation-delay: -26s;
    transform-origin: 23vw 7vh;
    box-shadow: -2vmin 0 0.5447391416085814vmin currentColor;
}
.background span:nth-child(31) {
    color: #f70202;
    top: 98%;
    left: 53%;
    animation-duration: 40s;
    animation-delay: -4s;
    transform-origin: 4vw -15vh;
    box-shadow: -2vmin 0 1.156084223308359vmin currentColor;
}
.background span:nth-child(32) {
    color: #f70202;
    top: 46%;
    left: 58%;
    animation-duration: 37s;
    animation-delay: -38s;
    transform-origin: 21vw 10vh;
    box-shadow: 2vmin 0 0.4871397491324534vmin currentColor;
}
.background span:nth-child(33) {
    color: #0027eb;
    top: 77%;
    left: 18%;
    animation-duration: 46s;
    animation-delay: -37s;
    transform-origin: -24vw -10vh;
    box-shadow: 2vmin 0 0.3958514250177425vmin currentColor;
}
.background span:nth-child(34) {
    color: #ffffff;
    top: 18%;
    left: 37%;
    animation-duration: 24s;
    animation-delay: -13s;
    transform-origin: -16vw -2vh;
    box-shadow: 2vmin 0 0.7924985673324267vmin currentColor;
}
.background span:nth-child(35) {
    color: #f70202;
    top: 45%;
    left: 5%;
    animation-duration: 27s;
    animation-delay: -41s;
    transform-origin: -19vw 21vh;
    box-shadow: -2vmin 0 0.6456186279000202vmin currentColor;
}
.background span:nth-child(36) {
    color: #0027eb;
    top: 23%;
    left: 23%;
    animation-duration: 10s;
    animation-delay: -38s;
    transform-origin: 18vw -20vh;
    box-shadow: 2vmin 0 1.068980588956304vmin currentColor;
}
.background span:nth-child(37) {
    color: #0027eb;
    top: 70%;
    left: 70%;
    animation-duration: 18s;
    animation-delay: -32s;
    transform-origin: 1vw 6vh;
    box-shadow: 2vmin 0 0.4575078695794996vmin currentColor;
}
.background span:nth-child(38) {
    color: #ffffff;
    top: 44%;
    left: 93%;
    animation-duration: 56s;
    animation-delay: -17s;
    transform-origin: -4vw 12vh;
    box-shadow: -2vmin 0 0.7093215764539886vmin currentColor;
}
.background span:nth-child(39) {
    color: #0027eb;
    top: 74%;
    left: 8%;
    animation-duration: 61s;
    animation-delay: -54s;
    transform-origin: 7vw 10vh;
    box-shadow: -2vmin 0 1.1017846806456122vmin currentColor;
}
.background span:nth-child(40) {
    color: #f70202;
    top: 17%;
    left: 20%;
    animation-duration: 9s;
    animation-delay: -15s;
    transform-origin: -22vw 20vh;
    box-shadow: -2vmin 0 0.9360103929726338vmin currentColor;
}
.background span:nth-child(41) {
    color: #f70202;
    top: 42%;
    left: 99%;
    animation-duration: 53s;
    animation-delay: -59s;
    transform-origin: 19vw 12vh;
    box-shadow: 2vmin 0 0.2677116854777297vmin currentColor;
}
.background span:nth-child(42) {
    color: #f70202;
    top: 18%;
    left: 75%;
    animation-duration: 10s;
    animation-delay: -28s;
    transform-origin: -15vw -15vh;
    box-shadow: 2vmin 0 0.3842370667028798vmin currentColor;
}
.background span:nth-child(43) {
    color: #0027eb;
    top: 49%;
    left: 29%;
    animation-duration: 52s;
    animation-delay: -15s;
    transform-origin: -22vw 7vh;
    box-shadow: 2vmin 0 0.7416825077831168vmin currentColor;
}
.background span:nth-child(44) {
    color: #f70202;
    top: 99%;
    left: 73%;
    animation-duration: 28s;
    animation-delay: -46s;
    transform-origin: 16vw -11vh;
    box-shadow: -2vmin 0 0.8685843991481221vmin currentColor;
}
.background span:nth-child(45) {
    color: #ffffff;
    top: 36%;
    left: 38%;
    animation-duration: 9s;
    animation-delay: -11s;
    transform-origin: 2vw -18vh;
    box-shadow: 2vmin 0 0.9898680566828826vmin currentColor;
}
.background span:nth-child(46) {
    color: #ffffff;
    top: 3%;
    left: 80%;
    animation-duration: 60s;
    animation-delay: -34s;
    transform-origin: 25vw -14vh;
    box-shadow: -2vmin 0 0.31592462892535256vmin currentColor;
}
.background span:nth-child(47) {
    color: #0027eb;
    top: 5%;
    left: 14%;
    animation-duration: 27s;
    animation-delay: -47s;
    transform-origin: -14vw 24vh;
    box-shadow: 2vmin 0 1.2175927419294743vmin currentColor;
}
.background span:nth-child(48) {
    color: #0027eb;
    top: 9%;
    left: 91%;
    animation-duration: 6s;
    animation-delay: -18s;
    transform-origin: 11vw 21vh;
    box-shadow: 2vmin 0 0.7438608575519892vmin currentColor;
}
.background span:nth-child(49) {
    color: #0027eb;
    top: 66%;
    left: 54%;
    animation-duration: 52s;
    animation-delay: -42s;
    transform-origin: -13vw 25vh;
    box-shadow: 2vmin 0 1.0434695529268279vmin currentColor;
}

*/ 


/*
import { createSlice } from "@reduxjs/toolkit";

export const forecastSlice = createSlice({
  name: "forecast",
  initialState: {
    forecast: {},
  },
  reducers: {
    setForecast: (state, action) => {
      state.forecast = action.payload;
    },
  },
});

export const { setForecast } = forecastSlice.actions;

export default forecastSlice.reducer;

*/ 

/*
import { configureStore } from "@reduxjs/toolkit";

import forecastReducer from "./reducers/weather/index";

export default configureStore({
  reducer: {
    forecast: forecastReducer,
  },
});

*/ 