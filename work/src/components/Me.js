import React, { Component, useState, useEffect } from "react";
// import Product from "../components/Product";
// import Rows from "../components/Rows";
import { Link, useParams } from "react-router-dom";
// import OrderProducts from "../components/OrderProducts";

const Me = () => {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState({});
  const [total, setSum] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    if (!localStorage.getItem("user")) {
      window.location.replace("/store");
    } else {
      try {
        const order = await fetch(
          `/pastOrders?id=${localStorage.getItem("user")}`
        );
        const orderJson = await order.json();
        var allOrders = [];
        console.log(orderJson);
        orderJson.names.map((order) => {
          // console.log(order);
          if (order !== null) {
            allOrders.push(order);
          }
        });
        setData(allOrders);
        var t
        allOrders.forEach((order) => {
            var m = JSON.parse(order.orderItems)
            console.log(m)
            t.push(m)
            
        })
        console.log(t)
        setLoading(false);
        console.log(data);
        
        // console.log(this.state.orders);
      } catch (error) {
        console.log(data);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getMe();
  }, [loading]);

  return (
    <>
      <div className="testimonial">
        <div className="small-container">
          <div class="row">
            <table>
              <tr>
                <th>Product details:</th>
                <th>Shipping details:</th>
                <th>Date ordered:</th>
                <th>Price:</th>
              </tr>
              {data.map((product, i) => {
                return (
                  <tr>
                    <td>
                      <Link to={`/orderProducts/${product._id}`}>
                        <h1>Review?</h1>
                      </Link>
                      {/* <img src={`/assets/${product.images[0]}`} alt="" /> */}
                      {/* <p>{this.state.orders.name}</p> */}
                    </td>
                    <td>
                      <ul>
                        <li>{product.shipping.address}</li>
                        <li>{product.shipping.city}</li>
                        <li>{product.shipping.postcode}</li>
                      </ul>
                    </td>
                    <td>{product.updatedAt}</td>
                    <td>{total}</td>
                    {/* </Link> */}
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Me;
