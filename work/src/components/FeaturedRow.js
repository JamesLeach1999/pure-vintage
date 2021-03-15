import React, { useState, useEffect, Component } from 'react';
import Product from './Product';
import Me from '../pages/Me';

import { Link } from 'react-router-dom';
import Axios from 'axios';
// import { useFetch } from "../hooks/useFetch";

class Rows extends Component {
  constructor() {
    super();
    this.state = { data: [], images: require('../assets/cap1.jpg') };
  }

  async componentDidMount() {
    try {
      const response = await Axios.get(`/featuredRows`);
      this.setState({ data: [response.data.cat1] });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="small-container">
        <br />
        <br />
        <br />
        <h1>Featured Products</h1>
        <div className="row">
          {this.state.data.map((products) => {
            return products.slice(0, 4).map((product) => {
              return (
                <Link to={`/product/${product._id}`}>
                  <Product id={product._id} />
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
