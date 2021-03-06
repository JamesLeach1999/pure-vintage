import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';

// function ID(id) {
//   return id;
// }
class Product extends Component {
  constructor() {
    super();
    this.state = { orders: [], shipping: [], data: [], images: [], name: '' };
  }

  async componentDidMount() {
    
    if (!sessionStorage.getItem("user")) {
      window.location.replace('/store');
    } else {
      try {
        
        const response = await fetch(`/orderProducts?id=${this.props.id}&user=${sessionStorage.getItem("user")}`);
        const json = await response.json();
        var p = [];

        this.setState({ data: json.names });
        console.log(this.state.data[0]);

        var product = JSON.parse(this.state.data.orderItems);
        product.forEach((pro) => {
          p.push(pro.product);
        });
        this.setState({ orders: p[0] });
        this.setState({ images: this.state.orders.image[0] });

        this.setState({ shipping: this.state.data.shipping });

        
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
      <tr>
        <Link to={`/orderProducts/${this.state.data._id}`}>
          <td>
            <img src={`/assets/${this.state.images}`} alt="" />
            <p>{this.state.orders.name}</p>
          </td>
          <td>
            <ul>
              <li>{this.state.shipping.address}</li>
              <li>{this.state.shipping.city}</li>
              <li>{this.state.shipping.postcode}</li>
            </ul>
          </td>
          <td>{this.state.data.updatedAt}</td>
        </Link>
      </tr>
    );
  }
}

export default Product;

