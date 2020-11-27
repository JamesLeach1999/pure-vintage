import React, { useEffect } from "react";
import defaultImage from "../assets/Logo_blue_text.jpg";
import "../css/slide.css";
const Welcome = () => {


  useEffect(() => {
    
  })
  var slideIndex = 1;
  showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  // Thumbnail image controls
  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    var i;
    console.log(document.getElementsByClassName("mySlides"));
    var slides = document.getElementsByClassName("mySlides")[0];
    var dots = document.getElementsByClassName("dot")[0];
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }

  return (
    <>
      <div className="row header">
        {/* <!-- Slideshow container --> */}
        <div className="slideshow-container">
          {/* <!-- Full-width images with number and caption text --> */}
          <div className="mySlides fade">
            <div className="numbertext">1 / 3</div>
            <img
              src="http://res.cloudinary.com/dhey8vvcx/image/upload/v1606510442/img_lights_wide.jpg.jpg"
              alt="1"
              style={{ width: "100%" }}
            />
            <div className="text">Caption Text</div>
          </div>

          <div className="mySlides fade">
            <div className="numbertext">2 / 3</div>
            <img
              src="http://res.cloudinary.com/dhey8vvcx/image/upload/v1606510459/img_mountains_wide.jpg.jpg"
              alt="2"
              style={{ width: "100%" }}
            />
            <div className="text">Caption Two</div>
          </div>

          <div className="mySlides fade">
            <div className="numbertext">3 / 3</div>
            <img
              src="
http://res.cloudinary.com/dhey8vvcx/image/upload/v1606510424/img_nature_wide.jpg.jpg
"
              alt="3"
              style={{ width: "100%" }}
            />
            <div className="text">Caption Three</div>
          </div>

          <a className="prev" onClick={plusSlides(-1)}>
            &#10094;
          </a>
          <a className="next" onClick={plusSlides(1)}>
            &#10095;
          </a>
        </div>
        <br />

        {/* <!-- The dots/circles --> */}
        <div style={{ textAlign: "center" }}>
          <span className="dot" onClick={currentSlide(1)}></span>
          <span className="dot" onClick={currentSlide(2)}></span>
          <span className="dot" onClick={currentSlide(3)}></span>
        </div>
      </div>
    </>
  );
};

export default Welcome;
