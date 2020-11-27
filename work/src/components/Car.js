import React from 'react'
import Carousel from "react-elastic-carousel"
import Item from "./Item"
import "../css/slide.css"
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const Car = () => {
    return (
      <>
        <div className="car">
          <Carousel breakPoints={breakPoints}>
            <Item>
              <img
                src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512786/img_nature_wide_q8vuhx.jpg"
                alt=""
              />
            </Item>
            <Item>
              <img
                src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512795/img_snow_wide_ys9co2.jpg"
                alt=""
              />
            </Item>
            <Item>
              <img
                src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512799/img_lights_wide_hluzf8.jpg"
                alt=""
              />
            </Item>
          </Carousel>
        </div>
      </>
    );
}

export default Car
