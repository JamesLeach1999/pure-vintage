import React, { useState, useEffect } from 'react';
import defaultImage from '../assets/shoes1.jpg';
import image from '../assets/cap1.jpg';
import { useFetch } from '../hooks/useFetch';
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';

const OrderPage = () => {
  const { id } = useParams();
  const url = `/orderProducts?id=${id}`;
  console.log(id);
  const [product, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [p, setP] = useState([]);
  const getProducts = async () => {
    const profile = await Axios.get(`/me`);
console.log(profile)
    if (!profile || !profile.data.isAdmin) {
      window.location.replace('/store');
    } else {

      // this returns a promise. so need to extract data from response (generally in json)
      const response = await fetch(url);
      const products = await response.json();
  
      //   console.log(products.name)
      var allOrders = [];
      products.names.map((order) => {
        // console.log(order);
        if (order !== null) {
          allOrders.push(order);
        }
      });
      setProducts(allOrders);
      console.log(product);
      console.log(p);
      var yyy = [];
      await product.map((item) => {
        yyy.push(JSON.parse(item.orderItems));
      });
      setP(yyy);
      console.log(p);
      // console.log(this.state.data);
      // then you want to set the state, set the empty array to an array of 30
    }
  };

  // cant use async await on useEffect (can in callback funcions), need a seperate function
  // it looks for the cleanup function, not a promise. cant use promise in useEffect
  // no fucking clue
  useEffect(() => {
    // this returns all 30 users in an array using setState
    getProducts();
    // this means it only runs once
    // if you are triggering re render in your effect function, add the dependancy array

    // do this so no infinite loop
  }, []);
  console.log(product);
  console.log(p);

  return (
    <div>
      <div class="small-container">
        <div class="row product">
          {product.map((item, i) => {
            var y = JSON.parse(item.orderItems);
            return (
              <div className="col-4">
                <img src={`/assets/${y[i].product.image[0]}`} alt="" />
                <h4>{y[i].product.name}</h4>
                <div class="rating">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star-o"></i>
                </div>
                <p>{y[i].product.price}</p>
                <form action="/refundSingle" method="post">
                  <input type="" name="productId" value={y[i].product._id} hidden />
                  <input type="" name="id" value={item._id} hidden />
                  <input type="" name="amount" value={y[i].product.price} hidden />
                  <input type="" name="intent" value={item.intent} hidden />
                  <button type="submit">Refund Product?</button>
                </form>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
