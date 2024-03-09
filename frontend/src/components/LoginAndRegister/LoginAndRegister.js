/* eslint-disable no-whitespace-before-property */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import "../LoginAndRegister/LoginAndRegister.css";
import axios from "axios";
import Swal from "sweetalert2";
import { ApplicationContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const LoginAndRegister = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  const { setToken, setToggleHome, setUserInfo, login, setLogin } =
    useContext(ApplicationContext);
  const [register, setRegister] = useState({});

  return (
  <>
  <Navbar/>
  <div className="LoginAndRegister">
      <div className="title">
        <h1
          style={{
            color: toggle ? "red" : "black",
            padding: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            setToggle(true);
          }}
          className="h1"
        >
          Login
        </h1>
        <h1
          style={{
            color: !toggle ? "red" : "black",
            padding: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            setToggle(false);
          }}
          className="h1"
        >
          Register
        </h1>
      </div>
      {toggle ? (
        <div className="login">
          <input
            className="input"
            placeholder="Email"
            type="email"
            required
            onChange={(e) => {
              setLogin((prevObject) => {
                return { ...prevObject, email: e.target.value };
              });
            }}
          ></input>
          <input
            className="input"
            placeholder="Password"
            type="password"
            required
            onChange={(e) => {
              setLogin((prevObject) => {
                return { ...prevObject, password: e.target.value };
              });
            }}
          ></input>
          <button
            onClick={async () => {
              try {
                const result = await axios.post(
                  "https://smart-shopper-19vo.onrender.com/users/login",
                  login
                );
                setToken(result.data.token);
                localStorage.setItem("token", result.data.token);
                setUserInfo(result.data);
                localStorage.setItem("userInfo", JSON.stringify(result.data));
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Valid login credentials",
                  showConfirmButton: false,
                  timer: 1000,
                });
                setTimeout(() => {
                  if (login.email === "raed@gmail.com") {
                    navigate("/Admin");
                  } else {
                    navigate("/Home");
                    setToggleHome(true);
                  }
                }, 1500);
              } catch (error) {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: `${error?.response?.data?.message}`,
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            }}
            className="button"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="register">
          <form>
            <input
              onChange={(e) => {
                setRegister((prevObject) => {
                  return {
                    ...prevObject,
                    userName: e.target.value,
                  };
                });
              }}
              className="input"
              placeholder="User Name"
            ></input>

            <input
              onChange={(e) => {
                setRegister((prevObject) => {
                  return {
                    ...prevObject,
                    email: e.target.value,
                  };
                });
              }}
              className="input"
              placeholder="Email"
              type="email"
              required
            ></input>
            <input
              onChange={(e) => {
                setRegister((prevObject) => {
                  return {
                    ...prevObject,
                    password: e.target.value,
                  };
                });
              }}
              className="input"
              placeholder="Password"
              type="password"
              required
            ></input>
            <button
              type="reset"
              onClick={async (e) => {
                axios
                  .post("https://smart-shopper-19vo.onrender.com/users/register", register)
                  .then((result) => {
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Account Created Successfully",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    setTimeout(() => {
                      setToggle(true);
                      navigate("/Login");
                    }, 1500);
                  })
                  .catch((error) => {
                    Swal.fire({
                      position: "center",
                      icon: "error",
                      title: `${error?.response?.data?.message}`,
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  });
              }}
              className="button"
            >
              Create
            </button>
          </form>
        </div>
      )}
    </div>
  </>
  );
};

export default LoginAndRegister;
