/* eslint-disable no-unused-vars */
import React,{useContext} from "react";
import "../Navbar/Navbar.css";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePerson3 } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../../App";
const Navbar = () => {
  const navigate = useNavigate();
  const { setToggleHome } = useContext(ApplicationContext);
  return (
    <div className="Navbar">
      <div className="logoText">
        <h2 data-text="Creative..." className="creative">
          Creative...
        </h2>
      </div>
      <div className="link">
        <input
          onClick={() => {
            navigate("/Home");
            setToggleHome(true)
          }}
          type="button"
          value="Home"
        />
        <input
          onClick={() => {
            navigate("/Category");
            setToggleHome(false)
          }}
          type="button"
          value="Category"
        />
        <input
          onClick={() => {
            navigate("/About");
            setToggleHome(false)
          }}
          type="button"
          value="About"
        />
        <input
          onClick={() => {
            navigate("/Contact");
            setToggleHome(false)
          }}
          type="button"
          value="Contact"
        />
      </div>
      <div className="icon">
        <CiSearch className="searchIcon" />
        <MdOutlinePerson3
          onClick={() => {
            navigate("/Login");
          }}
          className="personIcon"
        />
        <HiOutlineShoppingCart className="cartIcon" />
      </div>
    </div>
  );
};

export default Navbar;
