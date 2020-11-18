import React, { Component } from 'react';
import Product from '../components/Product';
import { useAxios } from '../hooks/useAxios';
import Rows from '../components/Rows';
import { Link, useParams } from 'react-router-dom';
import OrderProducts from '../components/RefundProducts';
import Axios from 'axios';

class Me extends Component {
  constructor() {
    super();
    this.state = { data: [], orders: [], sum: [] };
  }

  async componentDidMount() {
    const profile = await Axios.get(`/me`);
console.log(profile)
    if (!profile || !profile.data.isAdmin) {
      window.location.replace('/store');
    } else {

      try {
        const profile = await fetch(`/me`);
        const json = await profile.json();
  
        const order = await fetch('/pastOrders');
        const orderJson = await order.json();
        var allOrders = [];
        // console.log(orderJson);
        orderJson.names.map((order) => {
          // console.log(order);
          if (order !== null) {
            allOrders.push(order);
          }
        });
        this.setState({ data: allOrders });
        // console.log(this.state.data);
        var it = [];
        var sumPrice = [];
        var sum;
        this.state.data.map((items) => {
          it.push(JSON.parse(items.orderItems));
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
        // console.log(sumPrice)
        this.setState({ sum: sumPrice });
        this.setState({ orders: it });
        // console.log(this.state.orders);
      } catch (error) {
        console.log(this.state.data);
        console.log(error);
      }
    }
  }

  render() {
    return (
      <>
        <div className="testimonial">
          <div className="small-container">
            <div class="row">
              <table>
                <tr>
                  <th>Product details:</th>
                  <th>Shipping details:</th>
                  <th>Date ordered:</th>
                  <th>Price:</th>
                </tr>

                {this.state.orders.map((product, i) => {
                  return (
                    <div>
                      <OrderProducts id={this.state.data[i]._id} />

                      <form action="/refund" methd="post">
                        <input type="" name="id" value={this.state.data[i]._id} hidden />
                        <input type="" name="intent" value={this.state.data[i].intent} hidden />
                        <button type="submit">Refund?</button>
                      </form>

                    </div>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Me;
