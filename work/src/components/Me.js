import { sum } from "lodash";
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
  const [id, setId] = useState("nuttn");
  const [nulll, setNull] = useState("c");

  function getID() {
    sessionStorage.setItem("id", sessionStorage.getItem("user"));
    console.log(sessionStorage.getItem("id"));
  }

  const getMe = async () => {
    if (sessionStorage.getItem("user")) {
      try {
        console.log(sessionStorage.getItem("id"));
        const order = await fetch(
          `/pastOrders?id=${sessionStorage.getItem("id")}`
        );
        const orderJson = await order.json();
        var allOrders = [];
        console.log(orderJson.orderInfo);
        var sum1 = []
        orderJson.orderInfo.map((order) => {
          order.map((item) => {
            sum1.push(item.price)
          } )
          var summed = sum1.reduce(function (a, b) {
            return a+b;
          }, 0)
          setSum(total => [...total, summed])
        })

        orderJson.names.map((order) => {
          // console.log(order);
          if (order !== null) {
            allOrders.push(order);
          }
        });
        var t = []
        setOrders(orderJson.orderInfo.reverse());
        if (orders) {
          setData(allOrders.reverse());
          
        }
        console.log(total)

        // console.log(orders[0][0].product.image[0]);

        setLoading(false);
        console.log(data);
        console.log(orders);
        // console.log(this.state.orders);
      } catch (error) {
        console.log(data);
        console.log(error);
      }
    } else {
      setNull("whoops");
      window.location.replace("/store");
    }
  };

  useEffect(() => {
    sessionStorage.setItem("id", sessionStorage.getItem("user"));
    console.log(sessionStorage.getItem("id"));
  }, []);

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
                        <img src={orders[i][0].product.image[0]} alt="" />
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
                    <td>tree fiddy</td>
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
