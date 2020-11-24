import React, { useState, useEffect, Component } from 'react';
import defaultImage from '../assets/shoes1.jpg';
import image from '../assets/cap1.jpg';
import { useFetch } from '../hooks/useFetch';
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';

class AddPage extends Component {
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
render(){

  return (
    <div>
      <div class="grid category">
        <form action="/products" method="post" enctype="multipart/form-data">
          <input type="text" placeholder="name" name="name" />
          <input type="text" placeholder="brand" name="brand" />
          <input type="text" placeholder="category" name="category" />
          <input type="text" placeholder="description" name="description" />
          <input type="text" placeholder="size" name="size" />

          <input
            type="file"
            placeholder="image"
            multiple="multiple"
            name="image"
          />
          <input type="number" placeholder="price" name="price" />
          <input
            type="submit"
            name="submit"
            value="submit"
            onClick={() =>
              window.location.replace(
                "https://cryptic-temple-54361.herokuapp.com/manage"
              )
            }
          />
        </form>
      </div>
    </div>
  );
}
    
};

export default AddPage;
