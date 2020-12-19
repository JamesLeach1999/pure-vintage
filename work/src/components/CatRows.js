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
      <div className="small-container">
        <h1>Categories</h1>
        <div className="row">
          <Link to="/store?category=shirts">
            <div className="col-4-cat" style={{ width: "50%", height: "50%" }}>
              <img
                src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606404193/P0_1_n_jxsyb0.jpg"
                alt=""
              />
              <h1 style={{ textAlign: "center", fontSize: "40px" }}>Shirts</h1>
            </div>
          </Link>
          <Link to="/store?category=puffer">
            <div className="col-4-cat" style={{ width: "50%", height: "50%" }}>
              <img
                src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606404250/P0_1_m_en9ggm.jpg"
                alt=""
              />
              <h1 style={{ textAlign: "center", fontSize: "40px" }}>
                Puffer jackets
              </h1>
            </div>
          </Link>
          <Link to="/store?category=fleeces">
            <div className="col-4-cat" style={{ width: "50%", height: "50%" }}>
              <img
                src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606574995/P0_1_a_jn2c3w.jpg"
                alt=""
              />
              <h1 style={{ textAlign: "center", fontSize: "40px" }}>Fleeces</h1>
            </div>
          </Link>
          <Link to="/store?category=trackjack">
            <div className="col-4-cat" style={{ width: "50%", height: "50%" }}>
              <img
                src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1608132498/greyad2.jpg.jpg"
                alt=""
              />
              <h1 style={{ textAlign: "center", fontSize: "40px" }}>
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
