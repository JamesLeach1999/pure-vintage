import React, { useState, useEffect, Component } from "react";
import Product from "./Product";
import Me from '../pages/Me';

import { Link } from "react-router-dom";
// import { useFetch } from "../hooks/useFetch";

class Rows extends Component {
  constructor() {
    super();
    this.state = { data: [], images: require("../assets/cap1.jpg") };
  }

  async componentDidMount() {
    try {
      const response = await fetch(`/store1`);
      console.log(response)
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
      <div className="small-container" style={{ justifyContent: "center" }}>
        <h1>A few of our products</h1>
        <div className="row">
          {this.state.data.map((products) => {
            return products.slice(0, 4).map((product) => {
              // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
              return (
                <Link to={`/product/${product._id}`}>
                  <Product id={product._id} />
                  {/* <Product/> */}
                </Link>
              );
            });
          })}
        </div>
      </div>
    );
  }
}

export default Rows;
