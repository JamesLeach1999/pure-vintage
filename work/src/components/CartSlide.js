import React, { Component } from "react";
// import { MenuItems } from "./MenuItems";
import { Button } from "../Button";
import "../css/Cart.css";
class Navbar extends Component {
  state = { clicked: false, data: [] };

  getCart = async () => {
    const url = `/cart1?id=${sessionStorage.getItem("user")}`;
    if (!sessionStorage.getItem("user")) {
      window.location.replace("/store");
    } else {
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
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  async componentDidMount() {
    this.getCart();
  }

  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          React<i className="fab fa-react"></i>
        </h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {this.state.data.map((item, index) => {
              return item.map((product) => {

                  return (
                    <li key={index}>
                      <h2 className={product.name}>
                        {item.name}
                      </h2>
                    </li>
                  );
              })
          })}
        </ul>
        <Button>Sign up</Button>
      </nav>
    );
  }
}

export default Navbar;
