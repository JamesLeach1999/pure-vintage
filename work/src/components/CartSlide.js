import React, { Component } from "react";
// import { MenuItems } from "./MenuItems";
// import  Button  from "../Button";
import CartProduct from "./CartProduct";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "../css/Cart.css";
import { filter } from "lodash";
class Cart extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: "NOT_LOGGED_IN",
      user: {},
      admin: false,
      auth: false,
      cartClicked: false,
      data: [],
      price: 0,
    };
    // updating state

    this.handleCartClick = this.handleCartClick.bind(this);
    this.handleCartOutsideClick = this.handleCartOutsideClick.bind(this);
  }

  async getCart() {
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

        this.setState({ data: [notNull] });
        var p = [];
        this.state.data.map((products) => {
          return products.map((product) => {
            p.push(product.price);
          });
        });
        console.log(p);

        var sum = p.reduce(function (a, b) {
          return a + b;
        }, 0);

        this.setState({ price: sum });
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
      if (unAuthCart.length === 0) {
        const response = await fetch(`/product?id=${unAuthCart}`);
        const json = await response.json();
        this.setState({ data: [json] });
      } else {
        for (var i = 0; unAuthCart.length > i; i++) {
          const response = await fetch(`/product?id=${unAuthCart[i]}`);
          const json = await response.json();
          console.log(json);
          cartArray.push(json.name);
        }
        console.log(cartArray);
        this.setState({ data: [cartArray] });
      }

      console.log(this.state.data);
      var pr = [];
      this.state.data.map((products) => {
        return products.map((product) => {
          pr.push(product.price);
        });
      });
      console.log(pr);
      var sum = pr.reduce(function (a, b) {
        return a + b;
      }, 0);

      localStorage.setItem("unAuthCartPrice", sum);
    }
  }

  handleCartClick() {
    if (!this.state.cartClicked) {
      // attach/remove event handler
      console.log("c");
      document.addEventListener("click", this.handleCartOutsideClick, false);
    } else {
      console.log("l");

      document.removeEventListener("click", this.handleCartOutsideClick, false);
    }

    this.setState((prevState) => ({
      cartClicked: !prevState.cartClicked,
    }));
  }

  handleCartOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node1.contains(e.target)) {
      console.log("thats numberwang");
      console.log(this.node1);
      return;
    }

    this.handleCartClick();
  }

  async removeCart(id) {
    var c = JSON.parse(localStorage.getItem("unAuthCart"));
    console.log(c);
    var filtered = c.filter(function (value) {
      return value !== id;
    });
    console.log(filtered);

    localStorage.setItem("unAuthCart", JSON.stringify(filtered));

    const response = await fetch(`/product?id=${id}`);
    const json = await response.json();
    var cartPrice = parseInt(localStorage.getItem("unAuthCartPrice"));
    console.log(cartPrice);
    var newPrice = cartPrice - json.name.price;
    console.log(newPrice);
    localStorage.setItem("unAuthCartPrice", newPrice);
  }

  componentDidMount() {
    this.getCart();
  }

  render() {
    return (
      <div className="cartItems" ref={(node1) => (this.node1 = node1)}>
        <div
          className="cart-menu-icon"
          onClick={this.handleCartClick}
          style={{ zIndex: "40000" }}
        >
          <i
            className={
              this.state.cartClicked ? "fas fa-times" : "fas fa-shopping-cart"
            }
            style={{ color: "black" }}
          ></i>
          
        </div>
        <ul
          id="MenuItems"
          className={this.state.cartClicked ? "cart-menu active" : "cart-menu"}
          style={{maxWidth: "100vw"}}
        >
          <section className="center-text">
            <Link
              to="/order"
              style={{ fontSize: "40px", backgroundColor: "white" }}
            >
              checkout
            </Link>
            {sessionStorage.getItem("auth") === "true" ? (
              <h3>£{this.state.price}</h3>
            ) : (
              <h3>£{localStorage.getItem("unAuthCartPrice")}</h3>
            )}
          </section>
          <table style={{border: "none"}} >
            <tr style={{borderBottom: "1px solid grey"}}>
              {/* <th style={{ textAlign: "left", paddingLeft: "20px" }}>
                Product
              </th>
              <th>Size</th>
              <th>Sub total</th>
              <th>Remove?</th> */}
            </tr>
            {this.state.data.map((products) => {
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
                            onClick={() => this.removeCart(product._id)}
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
  }
}

export default Cart;
