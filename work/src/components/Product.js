import React, { Component } from "react";
// import { Link, useParams } from "react-router-dom";

// function ID(id) {
//   return id;
// }
class Product extends Component {
  constructor() {
    super();
    this.state = { data: [], images: [] };
  }

  async componentDidMount() {
    try {
      const response = await fetch(`/product?id=${this.props.id}`);
      const json = await response.json();
      console.log(json);
      this.setState({ data: json.name, images: json.name.image });
      console.log(this.state.data);
      console.log(this.state.images);
    } catch (error) {
      console.log(this.props.id);
      console.log(error);
    }
  }

  render() {
    return (
      <div className="col-4">
        <img
          style={{ transitionDuration: "0.3s" }}
          src={`${this.state.images[0]}`}
          onMouseOver={(e) => {
            if (this.state.images.length > 0) {
              e.currentTarget.src = this.state.images[1];
            } else {
              return null
            }
          }}
          onMouseOut={(e) => {
            if (this.state.images.length > 0) {
              e.currentTarget.src = this.state.images[1];
            } else {
              return null
            }
          }}
          alt=""
        />
        <h4>{this.state.data.name}</h4>
        <div class="rating">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star-o"></i>
        </div>
        <p>{this.state.data.price}</p>
      </div>
    );
  }
}

export default Product;
