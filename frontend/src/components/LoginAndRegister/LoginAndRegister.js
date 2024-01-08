/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../LoginAndRegister/LoginAndRegister.css";
const LoginAndRegister = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="LoginAndRegister">
      <div className="title">
        <h1  style={{ color:toggle?"red":"black", padding: '20px', cursor: 'pointer' }} onClick={() => {
            setToggle(true);
        }} className="h1">
          Login
        </h1>
        <h1 style={{ color:!toggle?"red":"black", padding: '20px', cursor: 'pointer' }}
          onClick={() => {
            setToggle(false);
          }}
          className="h1"
        >
          Register
        </h1>
      </div>
      {toggle ? (
        <div  className="login">
          
          <input className="input" placeholder="Email"></input>
          <input className="input" placeholder="Password"></input>
        </div>
      ) : (
        <div className="inputField">
          <input className="input" placeholder="First Name"></input>
          <input className="input" placeholder="Last Name"></input>
          <input className="input" placeholder="Email"></input>
          <input className="input" placeholder="Password"></input>
        </div>
      )}
      <button className="button">Create</button>
    </div>
  );
};

export default LoginAndRegister;
