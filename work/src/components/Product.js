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
      const response = await fetch(
        `/product?id=${this.props.id}`
      );
      const json = await response.json();
      console.log(json)
      this.setState({ data: json.name, images: json.name.image });
      console.log(this.state.data);
      
    } catch (error) {
      console.log(this.props.id);
      console.log(error);
    }
  }

  render() {
    return (
      <div className="col-4">
        <img className="pro" onMouseOver={() => {
          if(this.state.images.length > 1){
            console.log("works")
            var i = document.getElementsByClassName("pro")
            return i.src = this.state.images[1]
          }
        }} src={`${this.state.images[0]}`} alt="" />
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
