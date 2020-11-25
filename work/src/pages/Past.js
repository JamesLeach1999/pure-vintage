import React, { Component, useState, useEffect } from "react";
import Product from "../components/Product";
import { useAxios } from "../hooks/useAxios";
import Rows from "../components/Rows";
import { Link, useParams } from "react-router-dom";
import OrderProducts from "../components/RefundProducts";
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
        const profile = await fetch(`/me`);
        const json = await profile.json();

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
        setSum(sumPrice);
        setOrders(it);
        setLoading(false);
        console.log(order)
        console.log(data)
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

              {orders.map((product, i) => {
                return (
                  <tr>
                    <Link to={`/refundProducts/${product._id}`}>
                      <OrderProducts id={product._id} />
                    </Link>
                    <br />

                    <td>{product.size}</td>
                    <td id="total">{product.price}</td>
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
                          value={data[i].intent}
                          hidden
                        />
                        {/* <input type="checkbox" /> */}
                        <button type="submit">Refund?</button>
                      </form>
                    </td>
                  </tr>
                  // <tr>
                  //   <div>
                  //     <Link to={`/refundProducts/${product._id}`}>
                  //       <OrderProducts id={data[i]._id} />
                  //     </Link>
                  //     <form action="/refund" methd="post">
                  //       <input type="" name="id" value={data[i]._id} hidden />
                  //       <input
                  //         type=""
                  //         name="intent"
                  //         value={data[i].intent}
                  //         hidden
                  //       />
                  //       <button type="submit">Refund?</button>
                  //     </form>
                  //   </div>
                  // // </tr>
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
