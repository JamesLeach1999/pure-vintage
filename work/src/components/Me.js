import { sum } from "lodash";
import React, { Component, useState, useEffect, useReducer } from "react";
// import Product from "../components/Product";
// import row1s from "../components/row1s";
import { Link, useParams } from "react-router-dom";
import reducer from "../reducers/orderReducer";

var defaultState = {
  data: [],
  orders: [],
  total: [],
  images:[]
};
const Me = () => {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [total, setSum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState([]);
  const [id, setId] = useState("nuttn");
  const [error, setError] = useState(false);
  const [state, dispatch] = useReducer(reducer, defaultState);

  function getID() {
    sessionStorage.setItem("id", sessionStorage.getItem("user"));
    console.log(sessionStorage.getItem("id"));
  }

  const getMe = async () => {
    if (sessionStorage.getItem("user")) {
      try {
        // console.log(sessionStorage.getItem("id"));
        const order = await fetch(
          `/pastOrders?id=${sessionStorage.getItem("id")}`
        );
        const orderJson = await order.json();
        var allOrders = [];
        

        // orderJson.names.map((order) => {
        //   // console.log(order);
        //   if (order !== null) {
        //     allOrders.push(order);
        //   }
        // });

        dispatch({ type: "GET_ORDERS", payload: orderJson.names });
                dispatch({ type: "GET_IMAGES", payload: orderJson.names });

        var t = [];
        setOrders(orderJson.orderInfo);
        
        // console.log(total);

        var it = [];
        var sumPrice = [];
        var sum1;
        var idk = [];
        orderJson.orderInfo.map((items) => {
          items.map((item) => {
            idk.push(item.product.price);
          });
          sum1 = idk.reduce(function (a, b) {
            return a + b;
          }, 0);

          sumPrice.push(sum1);
        });

        setSum(sumPrice);

        // console.log(orders[0][0].product.image[0]);

        setLoading(false);
        

        // console.log(this.state.orders);
      } catch (error) {
        
        setError(true);
      }
    } else {
      setError(true);
      window.location.replace("/store");
    }
  };

  useEffect(() => {
    sessionStorage.setItem("id", sessionStorage.getItem("user"));
    // console.log(orders[1][0].product.image[0]);
    getMe();
  }, []);

  return (
    <>
      <div className="testimonial">
        <div className="small-container">
          <div class="row">
            <table>
              <tr style={{ fontSize: "200%", backgroundColor: "white" }}>
                <th>Product details:</th>
                <th>Shipping details:</th>
                <th>Date ordered:</th>
                <th>Price:</th>
              </tr>

              {state.data ? (
                state.data.map((product, i) => {
                  return (
                    <tr>
                      {/* <td>{i}</td> */}
                      <td>
                        <Link to={`/orderProducts/${product._id}`}>
                          <img src={state.images[i]} alt="" />
                        </Link>
                        {/* <img src={`/assets/${product.images[0]}`} alt="" />
                      <p>{this.state.orders.name}</p> */}
                      </td>
                      <td>
                        <ul>
                          <li>{product.shipping.address}</li>
                          <li>{product.shipping.city}</li>
                          <li>{product.shipping.postcode}</li>
                        </ul>
                      </td>
                      <td>{product.updatedAt.match(/^.+?(?=\T)/)}</td>
                      <td>£{total[i]}.95</td>
                      {/* </Link> */}
                      <br /> <br /> <br /> <br />
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>You havent made any orders yet!</td>
                </tr>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Me;
