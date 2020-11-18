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
      this.setState({ data: json.name, images: json.name.image[0] });
      console.log(this.state.data);

      
    } catch (error) {
      console.log(this.props.id);
      console.log(error);
    }
  }

  render() {
    return (
      <div className="col-4">
        <img src={`/assets/${this.state.images}`} alt="" />
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

// import React, { useState, useEffect, useCallback } from "react";

// import { useFetch } from "../hooks/useFetch";
// import ProductPage from "./ProductPage"
// import { Link, useParams } from "react-router-dom";
// import defaultImage from "../assets/cap1.jpg";

// const Product = (id) => {

// const url = `/product?id=${id.id}`;

// // const getProducts = async () => {
// //   // this returns a promise. so need to extract data from response (generally in json)
// //   const response = await fetch(url);
// //   const products = await response.json();
// //   setProducts(products.name);
// //   setImages(product.image);
// // };

// const [product, setProducts] = useState([]);
// // const [images, setImages] = useState("");

// const getProducts = useCallback(async () => {
//   const response = await fetch(url);
//   const products = await response.json();
//   setProducts(products.name);
// }, []);

//   useEffect(() => {
//     getProducts();
//   }, []);

//   // useEffect(() => {
//   //   getProducts();
//   // }, []);
//   // console.log(product.image)

//   console.log(product)

//   const fuckReact = () => {
//     return require(`../assets/${product.image}`);
//   }
//   // var g = require(`../assets/${images[0]}`)
//   return (
//     <div>
//       {/* <div className="small-container single-product"> */}
//       <div class="col-4">
//   {/* <h1>{images}</h1> */}

//     <img src="" alt=""/>
//         <h4>{product.name}</h4>
//         <div class="rating">
//           <i class="fa fa-star"></i>
//           <i class="fa fa-star"></i>
//           <i class="fa fa-star"></i>
//           <i class="fa fa-star"></i>
//           <i class="fa fa-star-o"></i>
//         </div>
//         <p>{product.price}</p>
//       </div>
//       {/* </div> */}
//     </div>
//   );
// };

// export default Product;
