import React from 'react'
import defaultImage from "../assets/Logo_blue_text.jpg";
import { UncontrolledCarousel } from "reactstrap";
import Car from "./Car"
import AliceCarousel from "react-alice-carousel";
import "../css/alice-carousel.css";
const Welcome = () => {


    return (
      <>
        <div class="row header work">
          <AliceCarousel autoPlay autoPlayInterval="3000" style={{maxWidth: "1896px"}}>
            <img
              src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512799/img_lights_wide_hluzf8.jpg"
              className="sliderimg" alt=""
            />
            <img
              src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512795/img_snow_wide_ys9co2.jpg"
              className="sliderimg" alt=""
            />
            <img
              src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512786/img_nature_wide_q8vuhx.jpg"
              className="sliderimg" alt=""
            />
          </AliceCarousel>
        </div>
      </>
    );
}

export default Welcome
