import React from 'react'
import defaultImage from "../assets/Logo_blue_text.jpg";
import { UncontrolledCarousel } from "reactstrap";
import Car from "./Car"
const items = [
  {
    src:
      "https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512786/img_nature_wide_q8vuhx.jpg",
    altText: "Slide 1",
    caption: "Slide 1",
    header: "Slide 1 Header",
    key: "1",
  },
  {
    src:
      "https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512795/img_snow_wide_ys9co2.jpg",
    altText: "Slide 2",
    caption: "Slide 2",
    header: "Slide 2 Header",
    key: "2",
  },
  {
    src:
      "https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512799/img_lights_wide_hluzf8.jpg",
    altText: "Slide 3",
    caption: "Slide 3",
    header: "Slide 3 Header",
    key: "3",
  },
];
const Welcome = () => {


    return (
      <>
        <div class="row header">
          <Car/>
        </div>
      </>
    );
}

export default Welcome
