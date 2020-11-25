import React, { Component, useState, useEffect } from "react";
import Product from "../components/Product";
import { useAxios } from "../hooks/useAxios";
import Rows from "../components/Rows";
import { Link, useParams } from "react-router-dom";
import OrderProducts from "../components/OrderProducts";

const Me = () => {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [total, setSum] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    const profile = await fetch(`/me?id=${localStorage.getItem("user")}`);
    console.log(profile);
    if (!profile) {
      window.location.replace("/store");
    } else {
      try {
        const order = await fetch("/pastOrders");
        const orderJson = await order.json();
        var allOrders = [];
        // console.log(orderJson);
        orderJson.names.map((order) => {
          // console.log(order);
          if (order !== null) {
            allOrders.push(order);
          }
        });
        setData(allOrders);
        // console.log(this.state.data);
        var it = [];
        var sumPrice = [];
        var sum;
        data.map((items) => {
          var m = JSON.parse(items.orderItems)
          // console.log(it)
          m.map((price) => {
            console.log(price);
            var t = [];
            price.map((r) => {
              t.push(r.product.price);
            });
            sum = t.reduce(function (a, b) {
              return a + b;
            }, 0);
            console.log(sum);
            t = [];
          });
          sumPrice.push(sum);
          console.log(m)
        });
        // console.log(sumPrice)
        setSum(sumPrice);
        setOrders(it);
        setLoading(false);
        console.log(data);
        console.log(orders);
        console.log(total)
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
              {orders.map((product, i) => {
                return (
                  <tr>
                    <Link to={`/orderProducts/${product._id}`}>
                      <td>
                        <img src={`/assets/${product.images[0]}`} alt="" />
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
                    </Link>
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
