/* eslint-disable no-unused-vars */
import React from "react";
import { useSpring, animated } from "react-spring";
import Slider from "react-slick";
import "../../src/ImageSlider/ImageSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const [slideIndex, setSlideIndex] = React.useState(0);

  const fade = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    onRest: () => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
    },
  });

  const images = [
    "https://f.nooncdn.com/mpcms/EN0001/assets/0d94b53d-d471-4b05-96e0-d97c107d7035.gif?format=avif",
    "https://img.ltwebstatic.com/images3_ccc/2024/01/18/de/17055627739e932b3a0f52c891140116c3de1855c1_thumbnail_2000x.jpg",
    "https://f.nooncdn.com/mpcms/EN0001/assets/787f2e98-0d53-4f54-9574-9c01cc4e2948.png?format=avif",
    "https://f.nooncdn.com/mpcms/EN0001/assets/5955c2d4-2bf2-4eab-9c8c-31b38e2cfa92.png?format=avif",
    "https://f.nooncdn.com/mpcms/EN0001/assets/a28de961-be98-487c-9fa2-810bc1ed97e7.png?format=avif",
  
  ];

  const settings = {
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    beforeChange: (current, next) => setSlideIndex(next),
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <animated.div key={index} style={{ ...fade }}>
          <img src={image} alt={`slide-${index}`} />
        </animated.div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
