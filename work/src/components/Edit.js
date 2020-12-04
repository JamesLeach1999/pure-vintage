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
    // const profile = await Axios(`/me?id=${sessionStorage.getItem("user")}`);
    // console.log(profile);
    // if (!profile) {
    //   window.location.replace("/store");
    // } else {
      try {
        console.log(this.props.id);
        const response = await fetch(`/product?id=${this.props.id}`);
        const json = await response.json();
        console.log(json);
        this.setState({ data: json.name, images: json.name.image[0] });
        console.log(this.state.data);
      } catch (error) {
        console.log(this.props.id);
        console.log(error);
      }
    }
  // }

  render() {
    return (
      <div className="col-4">
        <img src={`${this.state.images}`} alt="" />
        <h4>{this.state.data.name}</h4>
        <div class="rating">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star-o"></i>
        </div>
        <p>£{this.state.data.price}</p>
        
      </div>
    );
  }
}

export default EditPage;
