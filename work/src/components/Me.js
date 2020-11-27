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
    localStorage.setItem("id", localStorage.getItem("user"));
    console.log(localStorage.getItem("id"));
  }

  const getMe = async () => {
    if (localStorage.getItem("user")) {
      try {
        console.log(localStorage.getItem("id"));
        const order = await fetch(
          `/pastOrders?id=${localStorage.getItem("id")}`
        );
        const orderJson = await order.json();
        var allOrders = [];
        console.log(orderJson.orderInfo);
        orderJson.names.map((order) => {
          // console.log(order);
          if (order !== null) {
            allOrders.push(order);
          }
        });
        var t = []
        setOrders(orderJson.orderInfo);
        if (orders) {
          setData(allOrders.reverse());
          orders.forEach((items) => {
            items.forEach((item) => {
              t.push(item.price)
            })
          })
        }
        setSum(t)
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
    localStorage.setItem("id", localStorage.getItem("user"));
    console.log(localStorage.getItem("id"));
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
