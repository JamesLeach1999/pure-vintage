import React, { useState, useEffect, Component } from 'react';
import Product from './Product';
import Me from '../pages/Me';

import { Link } from 'react-router-dom';
// import { useFetch } from "../hooks/useFetch";

class CatRows extends Component {
  constructor() {
    super();
    this.state = { data: [], images: require('../assets/cap1.jpg') };
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
          <div className="col-2">
            <img src="/assets/coat1.jpg" alt="" />
            <h2 style={{ textAlign: 'center' }}>Coats</h2>
          </div>
          <div className="col-2">
            <img src="/assets/P0.jpg" alt="" />
            <h2 style={{ textAlign: 'center' }}>Coats</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default CatRows;
