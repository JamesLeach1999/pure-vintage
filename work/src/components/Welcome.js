import React, {useState, useEffect} from 'react'
import defaultImage from "../assets/Logo_blue_text.jpg";
import { UncontrolledCarousel } from "reactstrap";
import Car from "./Car"
import AliceCarousel from "react-alice-carousel";
import "../css/alice-carousel.css";
const Welcome = () => {

const [size, setSize] = useState(window.innerWidth);

// this outputs 770px
console.log(size);

// this is the callback (can do it inline), uses the initial size for default
// then everytime it changes, it is updated by passing inthe new FUNCTION
// with window. anything is a function. everytime it changes it is stored in memory
// this happens because everytime the size change, it triggers a re render, but not of the page
// this is where the cleanup comes in. so it dosent take up all ur memory
const checkSize = () => {
  setSize(window.innerWidth);
};

useEffect(() => {
  // we use a callback to run every time the event takes place
  // every time we call the callback function, it triggers a re render
  window.addEventListener("resize", checkSize);
  // everytime we use useEffect, we have the optionof returning
  // whatever we place in here will be invoked once we exit the use effect
  // before we trigger useEffect after the re render, we remove the listener
  return () => {
    console.log("clean up");
    window.removeEventListener("resize", checkSize);
    // cant just use console.log. needs to return something like useState does on update
    // everytime useEffect is called, it adds the listener and sets the state
    // everytime use effect called, it returns remove the listener
    // ok so everytime useEffect called, trigger checkSize to change the window size
    // but it dosent RETURN the addeventlistener, it returns remove
    // the checksize here just does the same thing. you just have to put in a call back
  };
}, []);
    return (
      <>
        <div class="row header work" style={{ width:size }}>
          <AliceCarousel autoPlay autoPlayInterval="3000">
            <img
              src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512799/img_lights_wide_hluzf8.jpg"
              className="sliderimg"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512795/img_snow_wide_ys9co2.jpg"
              className="sliderimg"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606512786/img_nature_wide_q8vuhx.jpg"
              className="sliderimg"
              alt=""
            />
          </AliceCarousel>
        </div>
      </>
    );
}

export default Welcome
