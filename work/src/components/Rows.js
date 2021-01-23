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
  }

  async componentDidMount() {
    try {
      const response = await fetch(`/store1`);
      window.addEventListener(
        "resize",
        this.setState({ size: window.innerWidth })
      );
      console.log(response);
      const json = await response.json();
      this.setState({ data: [json.names] });
      console.log(this.state.data);

      console.log(this.state.images);
      window.removeEventListener(
        "resize",
        this.setState({ size: window.innerWidth })
      );
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="small-container" style={{ justifyContent: "center", minWidth: "250px", maxWidth: "400px" }}>
        <h1>A few of our products</h1>
        <div className="row">
          {this.state.size > 600
            ? this.state.data.map((products) => {
                return products.slice(0, 4).map((product) => {
                  // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
                  return (
                    <Link to={`/product/${product._id}`}>
                      <Product id={product._id} />
                      {/* <Product/> */}
                    </Link>
                  );
                });
              })
            : this.state.data.map((products) => {
                return (
                  <AliceCarousel autoPlay autoPlayInterval="3000">
                    {products.slice(0, 4).map((product) => {
                      return (
                        <Link to={`/product/${product._id}`}>
                          <Product
                            className="sliderImg"
                            id={product._id}
                            // style={{ width: "100%" }}
                          />
                          {/* <Product/> */}
                        </Link>
                      );
                    })}
                  </AliceCarousel>
                );
                // );
              })}
        </div>
      </div>
    );
  }
}

export default Rows;
