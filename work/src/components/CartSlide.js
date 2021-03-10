import React, { useState, useRef, useEffect, useReducer } from "react";
// import { MenuItems } from "./MenuItems";
// import  Button  from "../Button";
import CartProduct from "./CartProduct";
import {
  Brow11serRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import  productReducers  from "../reducers/productReducers";

import "../css/Cart.css";
import { filter } from "lodash";

const defaultState = {
  data: [],
  price: 0,
};

const Cart = () => {
  const [state, dispatch] = useReducer(productReducers, defaultState);
  var [cartClicked, setCartClicked] = useState(false);
  var refContainer = useRef(null);

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
  };

  useEffect(() => {
    console.log("use effect local")
    console.log(localStorage)
    var getCart = async () => {
      console.log("numberwang");
      if (sessionStorage.getItem("user")) {
        const url = `/cart1?id=${sessionStorage.getItem("user")}`;

        try {
          const response = await fetch(url);
          const json = await response.json();

          await dispatch({ type: "FETCH_LOGIN_CART", payload: json });
          console.log(state);
        } catch (error) {
          console.log("cart error catch");
          console.log(error);
        }
      } else {
        var unAuthCart = JSON.parse(localStorage.getItem("unAuthCart"));
        console.log(unAuthCart);

        await dispatch({ type: "FETCH_UNAUTH_CART", payload: unAuthCart });
        console.log(state);
      }
    };
    getCart();
    console.log(state.data);
  }, []);

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
        <i class="fas fa fa-shopping-cart fa-lg"></i>
        <span class="cart-basket d-flex align-items-center justify-content-center">
          3
        </span>
        <i
          className={cartClicked ? "fas fa-times" : "fas fa-shopping-cart"}
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
            <h3>£{state.price}</h3>
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
          {state.data.map((products) => {
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
