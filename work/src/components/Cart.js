import React, { Component, useState, useEffect } from "react";
import CartProduct from "./CartProduct";
import { Link } from "react-router-dom";
import { intersection } from "lodash";
import Order from "../pageStripe/index";
const Cart = () => {
  const [data, setData] = useState([]);
  // const [images, setImages] = useState(require("../assets/cap1.jpg"));
  const [total, setTotal] = useState(0);
  // const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const url = `/cart1?id=${sessionStorage.getItem("user")}`;

  const getCart = async () => {
    if (!sessionStorage.getItem("user")) {
      window.location.replace("/store");
    } else {
      try {
        // const test = await fetch("http://localhost:9000/store");
        // console.log(test);

        const response = await fetch(url);
        const json = await response.json();

        var notNull = [];
        json.cart.map((pro) => {
          if (pro !== null) {
            notNull.push(pro);
          }
        });

        setData([notNull]);
        // var total = document.getElementById("total")
        // console.log(this.state.data.name.price);

        // var sum = total.reduce((a, b) => a + b, 0);
        setLoading(false);
        // setTotal(sum);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getCart();
  }, [loading]);

  return (
    <div className="small-container cart-page">
      <h1>Cart</h1>
      <table>
        <tr>
          <th style={{ textAlign: "left", paddingLeft: "20px" }}>Product</th>
          <th>Size</th>
          <th>Sub total</th>
          <th>Remove?</th>
        </tr>
       
        {data.map((products) => {
          return products.map((product) => {

            return (
              <tr>
                <Link to={`/product/${product._id}`}>
                  <CartProduct id={product._id} />
                </Link>
                <br />
                <td>{product.size}</td>
                <td id="total">{product.price}</td>
                <td>
                  <form action="/cartProduct" method="POST">
                    <input type="text" value={product._id} name="id" hidden />
                    <input type="checkbox" />
                    <button type="submit">Remove?</button>
                  </form>
                </td>
                <br />
                <br /> <br /> <br />
              </tr>
            );
          });
        })}
        
        <tr>
          <td></td>
          <td></td>
          <td>Total</td>
        </tr>
      </table>

      <div>
        <Link to="/order" style={{ textAlign: "right" }}>
          checkout
        </Link>
      </div>

      <table></table>
    </div>
  );
};

export default Cart;
