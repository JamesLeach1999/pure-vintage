import React, { useState, useRef, useEffect } from "react";
// import { MenuItems } from "./MenuItems";
// import  Button  from "../Button";
import CartProduct from "./CartProduct";
import {
  Brow11serRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";

import "../css/Cart.css";
import { filter } from "lodash";
const Cart = () => {
  var [loggedIn, setLoggedIn] = useState("NOT_LOGGED_IN");
  var [user, setUser] = useState({});
  var [admin, setAdmin] = useState(false);
  var [auth, setAuth] = useState(false);
  var [cartClicked, setCartClicked] = useState(false);
  var [data, setData] = useState([]);
  var [price, setPrice] = useState(0);
  var refContainer = useRef(null);

  var getCart = async () => {
    console.log("numberwang");
    if (sessionStorage.getItem("user")) {
      const url = `/cart1?id=${sessionStorage.getItem("user")}`;

      try {
        // const test = await fetch("http://localhost:9000/store");
        // console.log(test);

        const response = await fetch(url);
        const json = await response.json();
        console.log(json);

        var notNull = [];
        json.cart.map((pro) => {
          if (pro !== null) {
            notNull.push(pro);
          }
        });
        console.log(notNull);

        setData([notNull]);
        var p = [];
        data.map((products) => {
          return products.map((product) => {
            p.push(product.price);
          });
        });
        console.log(p);

        var sum = p.reduce(function (a, b) {
          return a + b;
        }, 0);

        setPrice(sum);
        // var total = document.getElementById("total")
        // console.log(this.state.data.name.price);

        // var sum = total.reduce((a, b) => a + b, 0);

        // setTotal(sum);
      } catch (error) {
        console.log(error);
      }
    } else {
      var unAuthCart = JSON.parse(localStorage.getItem("unAuthCart"));
      console.log(unAuthCart);
      var cartArray = [];
      if (unAuthCart === null || unAuthCart.length === 0) {
        const response = await fetch(`/product?id=${unAuthCart}`);
        const json = await response.json();
        setData([json]);
      } else {
        for (var i = 0; unAuthCart.length > i; i++) {
          const response = await fetch(`/product?id=${unAuthCart[i]}`);
          const json = await response.json();
          console.log(json);
          cartArray.push(json.name);
        }
        console.log(cartArray);
        setData([cartArray]);
      }

      console.log(data);
      var pr = [];
      data.map((products) => {
        return products.map((product) => {
          pr.push(product.price);
        });
      });
      // console.log(pr);
      var sum1 = pr.reduce(function (a, b) {
        return a + b;
      }, 0);

      localStorage.setItem("unAuthCartPrice", sum1);
    }
  }

  var handleCartClick = () => {
    if (!cartClicked) {
      // attach/remove event handler
      console.log("c");
      document.addEventListener("click", handleCartOutsideClick, false);
    } else {
      console.log("l");

      document.removeEventListener("click", handleCartOutsideClick, false);
    }
  };

  var handleCartOutsideClick = (e) => {
    // ignore clicks on the component itself
    if (!refContainer.current.contains(e.target)) {
      console.log("thats numberwang");
      // console.log(this.node1);
      return;
    }

    handleCartClick();
  };

  var removeCart = async (id) => {
    var c = JSON.parse(localStorage.getItem("unAuthCart"));
    console.log(c);
    var filtered = c.filter(function (value) {
      return value !== id;
    });
    // console.log(filtered);

    localStorage.setItem("unAuthCart", JSON.stringify(filtered));

    const response = await fetch(`/product?id=${id}`);
    const json = await response.json();
    var cartPrice = parseInt(localStorage.getItem("unAuthCartPrice"));
    // console.log(cartPrice);
    var newPrice = cartPrice - json.name.price;
    // console.log(newPrice);
    localStorage.setItem("unAuthCartPrice", newPrice);
  }

  useEffect(() => {
    console.log("fucking work")
    getCart();
    console.log(data)
  });

  return (
    <div className="cartItems" ref={refContainer}>
      <div
        className="cart-menu-icon"
        onClick={() => {
          handleCartClick();
          setCartClicked((prevState) => {
            return !prevState;
          });
        }}
        style={{
          zIndex: "40000",
          color: "black",
          width: "75px",
          height: "75px",
          marginLeft: "40px",
        }}
      >
        <i
          className={
            cartClicked ? "fas fa-times" : "fas fa-shopping-cart"
          }
          style={{
            color: "black",
            width: "75px",
            height: "75px",
            marginLeft: "40px",
          }}
        ></i>
      </div>
      <ul
        id="MenuItems"
        className={cartClicked ? "cart-menu active" : "cart-menu"}
        style={{ maxWidth: "100vw" }}
      >
        <section className="center-text">
          <Link to="/order" style={{ fontSize: "40px" }}>
            Checkout
          </Link>

          {sessionStorage.getItem("auth") === "true" ? (
            <h3>£{price}</h3>
          ) : (
            <h3>£{localStorage.getItem("unAuthCartPrice")}</h3>
          )}
        </section>
        <table style={{ border: "none" }}>
          <tr style={{ borderBottom: "1px solid grey" }}>
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
                  <td id="total">£{product.price}.95</td>
                  <td>
                    {sessionStorage.getItem("auth") === "true" ? (
                      <form action="/cartProduct" method="POST">
                        <input
                          type="text"
                          value={product._id}
                          name="id"
                          hidden
                        />
                        <button type="submit">Remove?</button>
                      </form>
                    ) : (
                      <form>
                        <button
                          type="submit"
                          onClick={() => {
                            removeCart(product._id);
                          }}
                        >
                          Remove?
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            });
          })}
        </table>
      </ul>
    </div>
  );
};

export default Cart;
