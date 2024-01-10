/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/style-prop-object */
import React from "react";
import "../Contact/Contact.css";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { CiMail } from "react-icons/ci";
const Contact = () => {
  return (
    <div className="contact">
      <div
        className="banner"
        style={{
          backgroundImage: `linear-gradient( rgba(9, 8, 37, 0.4), rgba(0, 15, 80, 0.7)),url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704672000&semt=sph)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <p>Contact</p>
      </div>
      <div className="leftRightContact">
        <div className="left">
          <h3>CONTACT INFO</h3>
          <div className="phone">
            <MdOutlinePhoneAndroid />
            <p>Phone: 0780570194</p>
          </div>
          <div className="left">
            <div className="phone">
              <CiMail />
              <p>Mail: Creative@gmail.com</p>
            </div>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5178.73816152401!2d35.914383632313886!3d31.953792817927578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2sjo!4v1704735208205!5m2!1sar!2sjo"
          width="600"
          height="450" 
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
