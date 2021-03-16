import React, { useState, useRef, useEffect, useReducer } from "react";

import CartProduct from "./CartProduct";
import {
  Link,
} from "react-router-dom";
import productReducers from "../reducers/productReducers";

import "../css/Cart.css";

const defaultState = {
  data: [],
  price: 0,
};

const Cart = () => {
  const [state, dispatch] = useReducer(productReducers);
  var [cartClicked, setCartClicked] = useState(false);
  var [data, setData] = useState([]);
  var [price, setPrice] = useState(0);
  var [load, setLoad] = useState(false);
  var refContainer = useRef(null);

  var handleCartClick = () => {
    if (!cartClicked) {
      // attach/remove event handler
      document.addEventListener("click", handleCartOutsideClick, false);
    } else {

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
    var filtered = c.filter(function (value) {
      return value !== id;
    });
    // console.log(filtered);

    localStorage.setItem("unAuthCart", JSON.stringify(filtered));

    const response = await fetch(`/product?id=${id}`);
    const json = await response.json();
    var cartPrice = parseInt(localStorage.getItem("unAuthCartPrice"));
    var newPrice = cartPrice - json.name.price;
    localStorage.setItem("unAuthCartPrice", newPrice);
  };

  console.log("use effect local");
  var getCart = async () => {
    if (sessionStorage.getItem("user")) {
      const url = `/cart1?id=${sessionStorage.getItem("user")}`;

      try {
        const response = await fetch(url);
        const json = await response.json();

        dispatch({ type: "FETCH_LOGIN_CART", payload: json });
        console.log(state)
        setData(json);
      } catch (error) {
        console.log("cart error catch");
        console.log(error);
      }
      setLoad(true);
    } else {
      var unAuthCart = JSON.parse(localStorage.getItem("unAuthCart"));

      var cartArray = [];
      var data;

      if (unAuthCart === null || unAuthCart.length === 0) {
        fetch(`/product?id=${unAuthCart}`)
          .then((response) => response.json())
          .then((resJson0) => (data = [resJson0]))
          .catch((error) => {
            console.log("promise chain error0");
            console.log(error);
          });
        // const json = await response.json();
        console.log("fetch cart data")
        console.log(data);
      } else {
        for (var i = 0; unAuthCart.length > i; i++) {
          fetch(`/product?id=${unAuthCart[i]}`)
            .then((response) => response.json())
            .then((resJson) => cartArray.push(resJson.name))
            .catch((error) => {
              console.log("promise chain error");
              console.log(error);
            });
        }
        data = cartArray;
      }
      console.log("cart data");

      var pr = [];
      data.map((products) => {
        return products.map((product) => {
          pr.push(product.price);
        });
      });
      // console.log(data);
      var sum1 = pr.reduce(function (a, b) {
        return a + b;
      }, 0);


      setPrice(sum1);
      setLoad(true);
    }
  };
  useEffect(() => {
    getCart();
    console.log(data)
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
            console.log("data map")
            console.log(products)
            return products.map((product) => {
              console.log("product map")
              console.log(product)
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
