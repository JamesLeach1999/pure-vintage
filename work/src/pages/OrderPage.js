import React, { useState, useEffect } from 'react';
import defaultImage from '../assets/shoes1.jpg';
import image from '../assets/cap1.jpg';
import { useFetch } from '../hooks/useFetch';
import { Link, useParams } from 'react-router-dom';

const OrderPage = () => {
  const { id } = useParams();
  const url = `/orderProducts?id=${id}`;
  console.log(id);
  const [product, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("")
  const [p, setP] = useState([])
  const getProducts = async () => {

    const user = await fetch("/me")
    const userJson = await user.json()
    console.log(userJson)
    setName(userJson.userProfile.name)
    // this returns a promise. so need to extract data from response (generally in json)
    const response = await fetch(url);
    const products = await response.json();

      console.log(products.names.orderItems)
    
    const t = JSON.parse(products.names.orderItems)
    setProducts(t)
    console.log(name)
    // console.log(p);
    // var yyy = [];
    // await product.map((item) => {
    //   yyy.push(JSON.parse(item.orderItems));
    // });
    // setP(yyy);
    // console.log(p);
    // console.log(this.state.data);
    // then you want to set the state, set the empty array to an array of 30
  };

  // cant use async await on useEffect (can in callback funcions), need a seperate function
  // it looks for the cleanup function, not a promise. cant use promise in useEffect
  // no fucking clue
  useEffect(() => {
    // this returns all 30 users in an array using setState
    getProducts()
    // this means it only runs once
    // if you are triggering re render in your effect function, add the dependancy array
    
    // do this so no infinite loop
  }, []);
  console.log(product)
    console.log(p);

  return (
    <div>
      <div class="small-container">
        <div class="row product">
          {product.map((item, i) => {
            return (
              <div>
                <div className="col-4">
                  <img src={`/assets/${item.product.image[0]}`} alt="" />
                  <h4>{item.product.name}</h4>
                  <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-o"></i>
                  </div>
                  <p>{item.product.price}</p>
                </div>
                <form action="/reviews" method="post">
                  <input type="" name="id" value={item.product._id} hidden/>
                  <input type="text" name="name" value={name} hidden />
                  <input type="number" name="star" />
                  <input type="text" name="desc" />
                  <button type="submit" onClick={() => window.location.href("/store")}>submit review</button>
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