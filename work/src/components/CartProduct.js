import React, { Component } from "react";
import defaultImage from "../assets/shoes1.jpg";

class CartProduct extends Component {
  constructor() {
    super();
    this.state = { data: [], images: require("../assets/cap1.jpg") };
  }

  async componentDidMount() {
    try {
      // const test = await fetch("http://localhost:9000/store");
      // console.log(test);
      const response = await fetch(
        `/product?id=${this.props.id}`
      );
      const json = await response.json();
      console.log(json);
      this.setState({ data: json.name, image: json.name.image[0] });

      console.log(this.state.image);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      // <tr>
      <div>
        <td>
          <div class="cart-info">
            <img src={`${this.state.image}`} alt="" />
            <div>
              <p>{this.state.data.name}</p>
              {/* <small>Price: {this.state.data.price}</small> */}
              <br />
              {/* <form action="/cartProduct" method="POST">
                <input type="text" value={this.state.data._id} name="id" hidden />
                <input type="checkbox" />
                <input type="submit" />
              </form> */}
            </div>
          </div>
        </td>
      </div>
    );
  }
}

export default CartProduct;
