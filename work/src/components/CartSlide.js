import React, { Component } from "react";
// import { MenuItems } from "./MenuItems";
// import  Button  from "../Button";
import CartProduct from "./CartProduct";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "../css/Cart.css";
class Cart extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: "NOT_LOGGED_IN",
      user: {},
      admin: false,
      auth: false,
      clicked: false,
      cartClicked: false,
      data: [],
    };
    // updating state

    this.handleCartClick = this.handleCartClick.bind(this);
    this.handleCartOutsideClick = this.handleCartOutsideClick.bind(this);
  }

  getCart = async () => {
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
        // var total = document.getElementById("total")
        // console.log(this.state.data.name.price);

        // var sum = total.reduce((a, b) => a + b, 0);

        // setTotal(sum);
      } catch (error) {
        console.log(error);
      }
    }
  };
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

  async componentDidMount() {
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
        // var total = document.getElementById("total")
        // console.log(this.state.data.name.price);

        // var sum = total.reduce((a, b) => a + b, 0);

        // setTotal(sum);
      } catch (error) {
        console.log(error);
      }
    } else {
      
    }
  }

  render() {
    return (
      <nav className="cartItems" ref={(node1) => (this.node1 = node1)}>
        <div className="cart-menu-icon" onClick={this.handleCartClick}>
          <i
            className={this.state.cartClicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <ul
          id="MenuItems"
          className={this.state.cartClicked ? "cart-menu active" : "cart-menu"}
        >
          {this.state.data.map((products) => {
            return products.map((product) => {
              // var tota = product.price
              // setTotal(tota + tota)
              // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
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
                </tr>
              );
            });
          })}
        </ul>
      </nav>
    );
  }
}

export default Cart;
