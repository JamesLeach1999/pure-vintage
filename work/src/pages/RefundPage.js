import React, { useState, useEffect } from 'react';
import defaultImage from '../assets/shoes1.jpg';
import image from '../assets/cap1.jpg';
import { useFetch } from '../hooks/useFetch';
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';

const OrderPage = () => {
  const { id } = useParams();
  const [product, setProducts] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true)
  const [p, setP] = useState([]);
  const getProducts = async () => {

    const url = `/orderProducts?id=${id}&user=${sessionStorage.getItem("user")}`;
    if (
      !sessionStorage.getItem("admin") ||
      sessionStorage.getItem("admin") === "false"
    ) {
      window.location.replace("/store");
    } else {
      console.log(id);


      // this returns a promise. so need to extract data from response (generally in json)
      const response = await Axios.get(url);
      console.log(response);
      const products = response.data.names;

      console.log(products);
      var allOrders = [];

      setProducts(products);
      console.log(product);
      var yyy = [];
      var items = JSON.parse(products.orderItems);
      console.log(items);
      items.map((item) => {
        yyy.push(item);
      });
      setP(yyy);
      console.log(p);
      setLoading(false);
      console.log(product);
      // console.log(this.state.data);
      // then you want to set the state, set the empty array to an array of 30
    }
    
  };

  // cant use async await on useEffect (can in callback funcions), need a seperate function
  // it looks for the cleanup function, not a promise. cant use promise in useEffect
  // no  clue
  useEffect(() => {
    // this returns all 30 users in an array using setState
    getProducts();
    // this means it only runs once
    // if you are triggering re render in your effect function, add the dependancy array

    // do this so no infinite loop
  }, [loading]);
  

  return (
    <div>
      <div class="small-container">
        <div class="row product">
          {p.map((item, i) => {
            
            return (
              <div className="col-4">
                <img src={`${item.product.image[0]}`} alt="" />
                <br/>
                <h4>{item.product.name}</h4>
                <div class="rating">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star-o"></i>
                </div>
                <p>{item.product.price}</p>
                <br/>
                <form action="/refundSingle" method="post">
                  <input type="" name="productId" value={item.product._id} hidden />
                  <input type="" name="id" value={product._id} hidden />
                  <input type="" name="amount" value={item.product.price} hidden />
                  <input type="number" name="percent" max="100"/>
                  <br/>
                  <input type="" name="intent" value={product.intent} hidden />
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
