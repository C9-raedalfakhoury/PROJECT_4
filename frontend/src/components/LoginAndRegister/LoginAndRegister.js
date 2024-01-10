/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../LoginAndRegister/LoginAndRegister.css";
import axios from "axios";
const LoginAndRegister = () => {
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isValidEmail: "",
    toggleEmail: false,
    togglePassword: false,
    isValidPassword: "",
  });
  console.log(register.isValidEmail);
  // const [isRegister, setIsRegister] = useState({ success: true, message: "" });
  const [toggle, setToggle] = useState(true);
  return (
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
          <input className="input" placeholder="Email"></input>
          <input className="input" placeholder="Password"></input>
          <button onClick={() => {}} className="button">
            Login
          </button>
        </div>
      ) : (
        <div className="register">
          <input
            onChange={(e) => {
              setRegister({ firstName: e.target.value });
            }}
            className="input"
            placeholder="First Name"
          ></input>
          <input
            onChange={(e) => {
              setRegister({ lastName: e.target.value });
            }}
            className="input"
            placeholder="Last Name"
          ></input>
          <input
            onChange={(e) => {
              setRegister({ email: e.target.value });
            }}
            className="input"
            placeholder="Email"
            type="email"
            required
          ></input>
          <input
            onChange={(e) => {
              setRegister({ password: e.target.value });
            }}
            className="input"
            placeholder="Password"
            type="password"
            required
          ></input>
          <button
            type="submit"
            onClick={() => {
              if (
                (!register.email?.includes("@") ||
                  !register.email?.includes(".com")) &&
                register.password?.length < 6
              ) {
                setRegister({ isValidEmail: "The Email Not Vaild" });
                setRegister({ toggleEmail: true }); 
                console.log(register.toggleEmail);
                setRegister({
                  isValidPassword: "Must Be More Than 6 Numers Or Words",
                });
                setRegister({ togglePassword: true });
              } 
              console.log(register.togglePassword);
            }}
            className="button"
          >
            Create
          </button>
          <>
            <div>{register?.email?.includes("@") ? `The Email Not Vaild` : ``}</div>
            <div>
              {register?.togglePassword ? `The Password Not Vaild` : ``}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default LoginAndRegister;
