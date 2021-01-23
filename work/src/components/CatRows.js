import React, { useState, useEffect, Component } from "react";
import Product from "./Product";
import Me from "../pages/Me";

import { Link } from "react-router-dom";
// import { useFetch } from "../hooks/useFetch";

class CatRows extends Component {
  constructor() {
    super();
    this.state = { data: [], images: require("../assets/cap1.jpg") };
  }

  async componentDidMount() {
    try {
      const response = await fetch(`/catRows`);
      console.log(response);
      const json = await response.json();
      this.setState({ data: [json.names] });
      console.log(this.state.data);

      console.log(this.state.images);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div
        className="small-container"
        style={{
          justifyContent: "center",
          position: "relative",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1>Categories</h1>
        <div className="row">
          <Link to="/store?category=sweatshirts">
            <div className="col-2">
              <img
                src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1609078658/Navy%20blue%20Nike%20sweatshirt%200.jpg.jpg"
                alt=""
              />
              <h1
                // className="cat-pic"
                style={{
                  textAlign: "center",
                  fontSize: "40px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                }}
              >
                Sweatshirts
              </h1>
            </div>
          </Link>
          <Link to="/store?category=puffer">
            <div className="col-2">
              <img
                src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1609184003/frontphone1_cltlbn.jpg"
                alt=""
              />
              <h1
                // className="cat-pic"
                style={{
                  textAlign: "center",
                  fontSize: "40px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                }}
              >
                Puffer jackets
              </h1>
            </div>
          </Link>
          <Link to="/store?category=fleeces">
            <div className="col-2">
              <img
                src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1609183452/Red%20Adidas%20sweatshirt%20spell%20out0.jpg.jpg"
                alt=""
              />
              <h1
                // className="cat-pic"
                style={{
                  textAlign: "center",
                  fontSize: "40px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                }}
              >
                Fleeces
              </h1>
            </div>
          </Link>
          <Link to="/store?category=trackjack">
            <div className="col-2">
              <img
                src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1609181682/Retro%20Black%20Blue%20Adidas%20Tracksuit%20top0.jpg.jpg"
                alt=""
              />
              <h1
                // className="cat-pic"
                style={{
                  textAlign: "center",
                  fontSize: "40px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                }}
              >
                Track jackets
              </h1>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default CatRows;
