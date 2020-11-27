import React, { Component, useState, useEffect } from "react";
// import Product from "../components/Product";
// import Rows from "../components/Rows";
import { Link, useParams } from "react-router-dom";
// import OrderProducts from "../components/OrderProducts";

const Me = () => {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [total, setSum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState()

  const getMe = async () => {
    if (!localStorage.getItem("user")) {
      window.location.replace("/store");
    } else {
      try {
        console.log(localStorage.getItem("user"))
        var i = localStorage.getItem("user");
        console.log(i)
        setId(i)
        console.log(id)
        const order = await fetch(
          `/pastOrders?id=${i}`
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
        console.log(allOrders.reverse());
        var iter = allOrders.reverse();
        var t = [];
        iter.forEach((order) => {
          var m = JSON.parse(order.orderItems);
          console.log(m[0]);
          t.push(m[0].product);
        });
        setOrders(t);
        if (orders) {
          setData(allOrders.reverse());
        }
        setLoading(false);
        console.log(data);
        console.log(orders);
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
                        <img src={orders[i].image[0]} alt="" />
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
