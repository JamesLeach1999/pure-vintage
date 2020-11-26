import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios"
// function ID(id) {
//   return id;
// }
class Product extends Component {
  constructor() {
    super();
    this.state = { orders: [], images: [], data: [] };
  }

  async componentDidMount() {
    const profile = await Axios.get(`/me?id=${localStorage.getItem("user")}`);
    console.log(profile);
    if (!profile) {
      window.location.replace("/store");
    } else {
      try {
        console.log();
        const response = await fetch(`/orderProducts?id=${this.props.id}`);
        const json = await response.json();
        console.log(this.props.id);
        var allOrders = [];
        console.log(json);
        json.names.orderItems.map((order) => {
          console.log(order);
          if (order !== null) {
            allOrders.push(order);
          }
        });

        this.setState({ data: JSON.parse(allOrders) });
        console.log(this.state.data);

        var it = [];
        var sumPrice = [];
        var sum;
        this.state.data.map((items) => {
          it.push(JSON.parse(items.orderItems[0]));
          // console.log(it)
          it.map((price) => {
            console.log(price);
            var t = [];
            price.map((r) => {
              t.push(r.product.price);
              console.log(t);
            });
            sum = t.reduce(function (a, b) {
              return a + b;
            }, 0);
            console.log(sum);
            t = [];
          });
          sumPrice.push(sum);
        });
        this.setState({ orders: it });
        this.setState({ sum: sumPrice });
        console.log(this.state.data);
        console.log(this.state.orders);
      } catch (error) {
        console.log(this.props.id);
        console.log(error);
      }
    }
  }

  render() {
    return (
      <div className="testimonial">
        <div className="small-container">
          <div class="row">
            {/* <h1>{this.props.id}</h1> */}
            {this.state.data.map((product, i) => {
              return (
                <Link to={`/refundPage/${this.state.data[i]._id}`}>
                  <tr>
                    <td>
                      <img
                        src={`/assets/${this.state.data[i].image[0]}`}
                        alt=""
                      />
                      <p>{this.state.data[i].name}</p>
                    </td>
                    <td>
                      <ul>
                        <li>{this.state.data[i].shipping.address}</li>
                        <li>{this.state.data[i].shipping.city}</li>
                        <li>{this.state.data[i].shipping.postcode}</li>
                      </ul>
                    </td>
                    <td>{this.state.data[i].updatedAt}</td>
                    <td>£ {this.state.sum[i]}</td>
                  </tr>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Product;

