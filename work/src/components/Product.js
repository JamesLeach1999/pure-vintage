import React, { Component } from "react";
// import { Link, useParams } from "react-router-dom";
import FadeIn from "react-fade-in";
import "../css/fade.css";
// function ID(id) {
//   return id;
// }
class Product extends Component {
  constructor() {
    super();
    this.state = { data: [], images: [], hover: false };
  }

  async componentDidMount() {
    try {
      const response = await fetch(`/product?id=${this.props.id}`);
      const json = await response.json();
      // console.log(json);
      this.setState({ data: json.name, images: json.name.image });
      // console.log(JSON.stringify(this.state.data))
      // console.log(this.state.data);
      // console.log(this.state.images);
    } catch (error) {
      console.log(this.props.id);
      console.log(error);
    }
  }

  render() {
    return (
      <FadeIn className="col-4">
        <div style={{ backgroundImage: `url(${this.state.images[1]})`, width: "100%" }}>
          <img
            style={{ transition: "opacity 1s ease" }}
            src={`${this.state.images[0]}`}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = 0;
              // if (this.state.images[1]) {
              //   this.setState({ hover: true });
              //   e.currentTarget.src = this.state.images[1];
              // }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = 1;
            }}
            alt=""
          />
        </div>

        <h4>{this.state.data.name}</h4>

        <p>£{this.state.data.price}.95</p>
      </FadeIn>
    );
  }
}

export default Product;
