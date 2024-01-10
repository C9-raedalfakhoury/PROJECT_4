import React from "react";
import "../ِAbout/About.css";
import { CiHeart } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { FiRefreshCw } from "react-icons/fi";
import { CiClock2 } from "react-icons/ci";
const About = () => {
  return (
    <div className="About">
      <div
        className="banner"
        style={{
          backgroundImage: `linear-gradient( rgba(9, 8, 37, 0.4), rgba(0, 15, 80, 0.7)),url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704672000&semt=sph)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <p>About</p>
      </div>
      <div className="content">
        <h1 style={{textAlign:"center"}}>Welcome To Creative Store</h1>
        <p style={{textAlign:"center"}} className="paragraph">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore gna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat.
        </p>
      </div>
      <div className="leftAndRight">
        <div className="left">
          <iframe
            src="https://www.youtube.com/embed/BVMsRltq2yU
      "
            title="E-Commerce Video"
            width="400"
            height="400"
          ></iframe>
        </div>
        <div className="right">
          <h2 style={{textAlign:"center"}}>Why Choose Us?</h2>

          <div className="first">
            <div className="firstOne">
              <CiHeart />
              <h4>Free Gift Box</h4>
            </div>
            <div className="firstOne">
              <CiDeliveryTruck />
              <h4>Free Delevery</h4>
            </div>
          </div>

          <div className="first">
            <div className="firstOne">
              <FiRefreshCw />
              <h4>Money Back</h4>
            </div>
            <div className="firstOne">
              <CiClock2 />
              <h4>Support 24/7</h4>
            </div>
          </div>
        </div>
      </div>
      <h2 className="partner">Our Clients</h2>
      <div className="logos">
        <img
          src="https://uniqlo-9.myshopify.com/cdn/shop/files/1_f17d72fc-507e-4c4e-9b09-8e0d4a4fe2c7_compact.png?v=1613507205"
          alt=""
        ></img>
        <img
          src="https://uniqlo-9.myshopify.com/cdn/shop/files/2_0d97dcf2-48ef-4d1c-84fb-75235e3931fe_compact.png?v=1613507205"
          alt=""
        ></img>
        <img
          src="https://uniqlo-9.myshopify.com/cdn/shop/files/3_8b6794b7-2092-4b0e-9776-19250fb423d2_compact.png?v=1613507205"
          alt=""
        ></img>
        <img
          src="https://uniqlo-9.myshopify.com/cdn/shop/files/5_compact.png?v=1613507205"
          alt=""
        ></img>
        
      </div>
    </div>
  );
};

export default About;
