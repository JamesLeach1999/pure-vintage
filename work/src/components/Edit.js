import React, { useState, useEffect, Component } from "react";
import defaultImage from "../assets/shoes1.jpg";
import image from "../assets/cap1.jpg";
import { useFetch } from "../hooks/useFetch";
import Reviews from "./Reviews";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import Product from "./Product";
class EditPage extends Component {
  constructor() {
    super();
    this.state = { data: [], images: [] };
  }

  async componentDidMount() {
    
    try {
      const response = await fetch(`/products?id=${this.props.id}`);
      const json = await response.json();
      this.setState({ data: json.name, images: json.name.image[0] });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="col-4">
        <img src={`${this.state.images}`} alt="" />
        <h4>{this.state.data.name}</h4>
        {this.state.data.gender ? <h1>Mens</h1> : <h1>Womens</h1>}
        {this.state.data.featured ? <h1>Featured</h1> : <h1>Not featured</h1>}
        {this.state.data.inStock ? <h1>In Stock</h1> : <h1>Out of stock</h1>}
        <p>£{this.state.data.price}</p>
      </div>
    );
  }
}

export default EditPage;
