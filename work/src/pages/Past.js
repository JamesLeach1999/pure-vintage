import React, { Component, useState, useEffect } from "react";
import Product from "../components/Product";
import { useAxios } from "../hooks/useAxios";
import Rows from "../components/Rows";
import { Link, useParams } from "react-router-dom";
import OrderProducts from "../pages/RefundPage";
import Axios from "axios";

const Me = () => {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sum, setSum] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    const profile = await Axios.get(`/me`);
    console.log(profile);
    if (!profile || !profile.data.isAdmin) {
      window.location.replace("/store");
    } else {
      try {
        // const profile = await fetch(`/me`);
        // const json = await profile.json();

        const order = await fetch("/allOrders");
        const orderJson = await order.json();
        var allOrders = [];
        console.log(orderJson)
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
        var sum1;
        var idk = []
        data.map((items) => {
          it.push(JSON.parse(items.orderItems));
          console.log(it)
          it.map((price) => {
            console.log(price);
            idk.push(price)
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
          });
          sumPrice.push(sum1);
        });
        // console.log(sumPrice)
        setSum(sumPrice);
        setOrders(idk);
        setLoading(false);
        console.log(sum);
        console.log(orders);
        console.log(data);
        // console.log(this.state.orders);
      } catch (error) {
        console.log(data);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getOrders();
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
                    <Link to={`/refundProducts/${product._id}`}>
                      <OrderProducts id={product._id} />
                      <td>
                        {/* <img
                          src={`/assets/${product.image[0]}`}
                          alt=""
                          /> */}
                        <p>{product.name}</p>
                      </td>
                          </Link>
                      <td>
                        <ul>
                          <li>{product.shipping.address}</li>
                          <li>{product.shipping.city}</li>
                          <li>{product.shipping.postcode}</li>
                        </ul>
                      </td>
                      <td>{product.updatedAt}</td>
                      <td>£ {sum[i]}</td>
                      <td>
                        <form action="/refund" method="POST">
                          <input
                            type="text"
                            value={product._id}
                            name="id"
                            hidden
                          />
                          <input
                            type=""
                            name="intent"
                            value={product.intent}
                            hidden
                          />
                          {/* <input type="checkbox" /> */}
                          <button type="submit">Refund?</button>
                        </form>
                      </td>
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
