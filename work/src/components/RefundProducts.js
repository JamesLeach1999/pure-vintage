import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';

// function ID(id) {
//   return id;
// }
class Product extends Component {
  constructor() {
    super();
    this.state = { orders: [], images: [], data: [] };
  }

  async componentDidMount() {
    const profile = await fetch(`/me`);
console.log(profile)
    if (!profile) {
      window.location.replace('/store');
    } else {

      try {
        console.log();
        const response = await fetch(`/orderProducts?id=${this.props.id}`);
        const json = await response.json();
        console.log(this.props.id);
        var allOrders = [];
        // console.log(orderJson);
        json.names.map((order) => {
          // console.log(order);
          if (order !== null) {
            allOrders.push(order);
          }
        });
  
        this.setState({ data: allOrders });
  
        var it = [];
        var sumPrice = [];
        var sum;
        this.state.data.map((items) => {
          it.push(JSON.parse(items.orderItems));
          // console.log(it)
          it.map((price) => {
            console.log(price);
            var t = [];
            price.map((r) => {
              t.push(r.product.price);
              console.log(t);
            });
            sum = t.reduce(function (a, b) {
              return a + b;
            }, 0);
            console.log(sum);
            t = [];
          });
          sumPrice.push(sum);
        });
        // console.log(sumPrice)
        this.setState({ sum: sumPrice });
        //   this.setState({ data: it });
        console.log(this.state.data);
      } catch (error) {
        console.log(this.props.id);
        console.log(error);
      }
    }
  }

  render() {
    return (
      <div className="testimonial">
        <div className="small-container">
          <div class="row">
            <h1>{this.props.id}</h1>
            {this.state.data.map((product, i) => {
              return (
                <Link to={`/refundProducts/${this.state.data[i]._id}`}>
                  <tr>
                    <td>
                      <h1>{this.state.data[i]._id}</h1>
                      <img src={`/assets/${this.state.data[i].image[0]}`} alt="" />
                      <p>{this.state.data[i].name}</p>
                    </td>
                    <td>
                      <ul>
                        <li>{this.state.data[i].shipping.address}</li>
                        <li>{this.state.data[i].shipping.city}</li>
                        <li>{this.state.data[i].shipping.postcode}</li>
                      </ul>
                    </td>
                    <td>{this.state.data[i].updatedAt}</td>
                    <td>£ {this.state.sum[i]}</td>
                  </tr>
                </Link>
              );
            })}
          </div>
        </div>
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
