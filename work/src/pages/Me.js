import React, { Component, useState, useEffect } from "react";
import Product from "../components/Product";
import { useAxios } from "../hooks/useAxios";
import Rows from "../components/Rows";
import { Link, useParams } from "react-router-dom";
import OrderProducts from "../components/OrderProducts";

const Me = () => {

  const [data, setData] = useState([])
  const [orders, setOrders] = useState([])
  const [sum, setSum] = useState([])
  const [loading, setLoading] = useState(true)

    const getMe = async () => {
      const profile = await fetch(`/me`);
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
        setData(allOrders)
        // console.log(this.state.data);
        var it = [];
        var sumPrice = [];
        var sum;
        data.map((items) => {
          it.push(JSON.parse(items.orderItems));
          // console.log(it)
          it.map((price) => {
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
        });
        // console.log(sumPrice)
        setSum(sumPrice)
        setOrders(it)
        setLoading(false)
        // console.log(this.state.orders);
      } catch (error) {
        console.log(data);
        console.log(error);
      }
    }}

    useEffect(() => {
      getMe()
    },[loading])
  

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
                    // <Link to={`/orderProducts/${this.state.data[i]}`}>
                    <tr>
                      <OrderProducts id={data[i]._id} />
                    </tr>
                    // </Link>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }


export default Me;
