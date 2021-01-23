import React, { useState, useEffect, Component } from "react";
import Product from "./Product";
import Me from "../pages/Me";
import AliceCarousel from "react-alice-carousel";

import { Link } from "react-router-dom";
// import { useFetch } from "../hooks/useFetch";

class Rows extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      images: require("../assets/cap1.jpg"),
      size: window.innerWidth,
    };

    this.checkSize = this.checkSize.bind(this);
  }

  checkSize() {
    this.setState({ size: window.innerWidth });
  }

  async componentDidMount() {
    try {
      window.addEventListener("resize", this.checkSize);

      if (this.statesize < 600) {
        this.setState({ size: this.state.size + 13 });
      } else {
        this.setState({ size: this.state.size + 25 });
      }
      const response = await fetch(`/store1`);
      console.log(response);
      const json = await response.json();
      this.setState({ data: [json.names] });
      console.log(this.state.data);

      console.log(this.state.images);
      window.removeEventListener("resize", this.checkSize);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="small-container" style={{ justifyContent: "center" }}>
        <h1>A few of our products</h1>
        <div className="row">
          {this.state.data.map((products) => {
            return (
              <AliceCarousel autoPlay autoPlayInterval="3000">
                {products.slice(0, 4).map((product) => {
                  return (
                    <Link to={`/product/${product._id}`}>
                      <Product className="sliderImg" id={product._id} />
                      {/* <Product/> */}
                    </Link>
                  );
                })}
              </AliceCarousel>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Rows;
