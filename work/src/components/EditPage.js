import React, { useState, useEffect } from 'react';
import defaultImage from '../assets/shoes1.jpg';
import image from '../assets/cap1.jpg';
import { useFetch } from '../hooks/useFetch';
import Reviews from './Reviews';
import { Link, useParams } from 'react-router-dom';
import Axios from "axios"
const ProductPage = () => {
  const { id } = useParams();
  const [product, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  
  const getProducts = async () => {
    const url = `/product?id=${id}`;
    console.log(id);
    const profile = await Axios(`/me?id=${localStorage.getItem("user")}`);
console.log(profile)
    if (!profile) {
      window.location.replace('/store');
    } else {
      // this returns a promise. so need to extract data from response (generally in json)
      const response = await fetch(url);
      const products = await response.json();
  
      //   console.log(products.name)
      console.log(products.name.image);
      // this will run 30 times because its after every re render. will be stuck in loop
      setProducts(products.name);
      setImages(products.name.image);
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
  }, []);

  console.log(product);
  return (
    <div>
      <div class="small-container single-product">
        <div class="row">
          <div class="col-2">
              <img src={`${images}`} alt="shit"></img>;
          </div>
          <div class="col-2">
            <form action="/editPost" method="post">
              <h4>{product.name}</h4>
              <input type="text" name="id" value={product._id} hidden />
              <h4>{product.name}</h4>

              <input type="text" placeholder="name" name="edit" />
              <h4>{product.brand}</h4>

              <input type="text" placeholder="brand" name="edit" />
              <h4>{product.category}</h4>

              <input type="text" placeholder="category" name="edit" />
              <h4>{product.description}</h4>

              <input type="text" placeholder="description" name="edit" />
              <h4>{product.size}</h4>

              <input type="text" placeholder="size" name="edit" />
              {/* <h4>{product.name}</h4> */}

              <input type="file" placeholder="image" multiple="multiple" name="image" />
              <h4>{product.price}</h4>

              <input type="number" placeholder="price" name="edit" />
              <input type="submit" />
            </form>
          </div>
        </div>
        <Reviews />
      </div>
    </div>
  );
};

export default ProductPage;
