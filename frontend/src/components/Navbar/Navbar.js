import React from "react";
import "../Navbar/Navbar.css";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePerson3 } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi2";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="logoText">
        <h2 data-text="Creative..." className="creative">
        Creative...
        </h2>
      </div>
      <div className="link">
        <input type="button" value="Home" />
        <input type="button" value="Category" />
        <input type="button" value="About" />
        <input type="button" value="Contact" />
      </div>
      <div className="icon">
        <CiSearch className="searchIcon" />
        <MdOutlinePerson3 className="personIcon" />
        <HiOutlineShoppingCart className="cartIcon" />
      </div>
    </div>
  );
};

export default Navbar;
