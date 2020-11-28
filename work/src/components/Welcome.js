import React from 'react'
import defaultImage from "../assets/Logo_blue_text.jpg";
import { UncontrolledCarousel } from "reactstrap";
import Car from "./Car"
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
const Welcome = () => {


    return (
      <>
        <div class="row header">
          <AliceCarousel autoPlay autoPlayInterval="3000">
            <img
              src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512799/img_lights_wide_hluzf8.jpg"
              className="sliderimg"
            />
            <img
              src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512799/img_lights_wide_hluzf8.jpg"
              className="sliderimg"
            />
            <img
              src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512799/img_lights_wide_hluzf8.jpg"
              className="sliderimg"
            />
          </AliceCarousel>
        </div>
      </>
    );
}

export default Welcome
