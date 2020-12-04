import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios"
// function ID(id) {
//   return id;
// }
const Product = (props) => {
  const {id} = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState()

    const getOrderProducts = async () => {
      
    if (!sessionStorage.getItem("admin") || sessionStorage.getItem("admin") === "false") {
      window.location.replace("/store");
    } else {
      try {
        console.log();
        const response = await fetch(`/orderProducts?id=${props.id}`);
        const json = await response.json();
        console.log(id);
        var allOrders = [];
        console.log(json);
        setProducts(json.orderItems);
        setOrder(json.names);

        // console.log(this.state.data);

        // var it = [];
        // var sumPrice = [];
        // var sum;
        console.log(products);
        setLoading(false);
        // console.log(this.state.data);
        // console.log(this.state.orders);
      } catch (error) {
        // console.log(this.props.id);
        console.log(error);
      }
    }
    
  }

  useEffect(() => {
    getOrderProducts()
  }, [loading])

    return (
      <div className="testimonial">
        <div className="small-container">
          <div class="row">
            {/* <h1>{this.props.id}</h1> */}
            {products.map((product, i) => {
              return (
                <div className="col-4">
                  <img src={`${product.image}`} alt="" />
                  <h4>{product.name}</h4>
                  
                  <p>{product.price}</p>
                  <form action="/refundSingle" method="post">
                    <input
                      type=""
                      name="productId"
                      value={product._id}
                      hidden
                    />
                    <input type="" name="id" value={order._id} hidden />
                    <input
                      type=""
                      name="amount"
                      value={product.price}
                      hidden
                    />
                    <input type="" name="intent" value={order.intent} hidden />
                    <button type="submit">Refund Product?</button>
                  </form>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  
}

export default Product;

