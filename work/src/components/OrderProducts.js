import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';

// function ID(id) {
//   return id;
// }
class Product extends Component {
  constructor() {
    super();
    this.state = { orders: [], shipping: [], data: [], images: [], name: '' };
  }

  async componentDidMount() {
    const profile = await fetch(`/me`);
    console.log(profile);
    if (!profile) {
      window.location.replace('/store');
    } else {
      try {
        const user = await fetch('/me');
        const userJson = user.json();

        this.setState({ name: userJson.name });
        const response = await fetch(`/orderProducts?id=${this.props.id}`);
        const json = await response.json();
        console.log(this.props.id);
        var p = [];
        // console.log(orderJson);

        this.setState({ data: json.names });
        console.log(this.state.data[0]);

        var product = JSON.parse(this.state.data.orderItems);
        console.log(product);
        product.forEach((pro) => {
          p.push(pro.product);
        });
        console.log(p);
        this.setState({ orders: p[0] });
        this.setState({ images: this.state.orders.image[0] });
        // console.log(this.state.orders[0].image[0]);

        this.setState({ shipping: this.state.data.shipping });

        // //   this.setState({ data: it });
        //       console.log(p);
      } catch (error) {
        console.log(this.props.id);
        console.log(error);
      }
    }
  }

  render() {
    return (
      <tr>
        <Link to={`/orderProducts/${this.state.data._id}`}>
          <td>
            <img src={`/assets/${this.state.images}`} alt="" />
            <p>{this.state.orders.name}</p>
          </td>
          <td>
            <ul>
              <li>{this.state.shipping.address}</li>
              <li>{this.state.shipping.city}</li>
              <li>{this.state.shipping.postcode}</li>
            </ul>
          </td>
          <td>{this.state.data.updatedAt}</td>
        </Link>
      </tr>
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
