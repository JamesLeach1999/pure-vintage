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
        // console.log(this.state.data);
        var it = [];
        var sum1;
        var m;
        var t = [];
        var sumPrice = [];
        data.map((items) => {
          m = JSON.parse(items.orderItems);
          it.push(m);
          console.log(m);
          console.log(it);

          m.product.map((price) => {
            console.log(price);
            it.push(price);
            var t = [];
            price.map((r) => {
              t.push(r.product.price);
              console.log(t);
            });
            sum1 = t.reduce(function (a, b) {
              return a + b;
            }, 0);
            console.log(sum1);
            t = [];
            sumPrice.push(sum1);
          });
          console.log(it.reverse());
        });
        console.log(typeof it);
        console.log(it.reverse());
        setSum(sumPrice.reverse());
        setOrders(it.reverse());
        setLoading(false);
        console.log(data);
        console.log(orders);
        console.log(total);
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
