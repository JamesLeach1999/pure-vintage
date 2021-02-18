import React, { Component, useState, useEffect, useReducer } from "react";
import Product from "../components/Product";
import { useAxios } from "../hooks/useAxios";
import Rows from "../components/Rows";
import { Link, useParams } from "react-router-dom";
import OrderProducts from "../pages/RefundPage";
import Axios from "axios";
import reducer from "../reducers/orderReducer"

var defaultState = {
  data: [],
  orders: [],
  sum: [],
  loading: true
}

const Me = () => {
  
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer( reducer, defaultState)

  const getOrders = async () => {
    
    const work = await Axios.post("/getAuth", {
      id: sessionStorage.getItem("user"),
    });

    console.log(work);
    if (
      !sessionStorage.getItem("admin") ||
      sessionStorage.getItem("admin") === "false" ||
      !work.data.isAdmin
    ) {
      window.location.replace("/store");
    } else {
      try {
        const order = await fetch("/allOrder");
        const orderJson = await order.json();
        var allOrders = [];
        console.log("past order data")
        console.log(orderJson);
        // console.log(orderJson);
        dispatch({type: "GET_ORDERS", payload: orderJson.names})
        // console.log(this.state.data);
        dispatch({type: "SET_SUMS", payload: state.data})
        var productData = []
        dispatch({type: "ORDER_ITEMS", payload: state.data})
        
        console.log("past order products")
        console.log(productData)
        console.log("state dta 51")
        console.log(state)
        
        setLoading(false);
        console.log(state);
        // console.log(JSON.parse(data[0].orderItems[0].product[0].image));
        console.log(state.orders);
        // console.log(this.state.orders);
      } catch (error) {
        console.log(state.data);
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

              {state.data.map((product, i) => {
                return (
                  <tr>
                    <Link to={`/refundProducts/${product._id}`}>
                      <td>
                        {/* <img
                          src={`/assets/${JSON.parse(product.orderItems[0].product[0].image)}`}
                          alt=""
                          /> */}
                        <h2>Refund individual</h2>
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
                      <td>£ {state.sum[i]}</td>
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
