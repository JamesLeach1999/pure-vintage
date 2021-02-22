import React, { useState, useEffect } from "react";
import defaultImage from "../assets/shoes1.jpg";
import image from "../assets/cap1.jpg";
import { useFetch } from "../hooks/useFetch";
import Reviews from "./Reviews";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
const ProductPage = () => {
  const { id } = useParams();
  const [product, setProducts] = useState([]);
  const [images, setImages] = useState([]);

  const getProducts = async () => {
    const url = `/product?id=${id}`;
    console.log(id);

    if (
      !sessionStorage.getItem("admin") ||
      sessionStorage.getItem("admin") === "false"
    ) {
      window.location.replace("/store");
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
      <br/><br/><br/><br/>
      <div class="small-container single-product">
        <div class="col-2">
          <img src={`${images[0]}`} alt="shit"></img>;
        </div>
        <div class="row1">
          <div class="col-2">
            <form action="/editPost" method="post">
              {/* <h4>{product.name}</h4> */}
              <br />
              <input type="text" name="id" value={product._id} hidden />
              <h4>Name: {product.name}</h4>
              <br />
              <input type="text" placeholder="name" name="edit" />
              <h4>Brand: {product.brand}</h4>
              <br />
              <input type="text" placeholder="brand" name="edit" />
              <h4>Category: {product.category}</h4>
              <br />
              <input type="text" placeholder="category" name="edit" />
              <h4>Description: {product.description.substring(0, 100)}</h4>
              <br />
              <input
                type="text"
                placeholder="description"
                name="edit"
                style={{ border: "1px solid black", borderRadius: "3px" }}
              />
              <br />
              <h4>Size: {product.size}</h4>

              <input type="text" placeholder="size" name="edit" />
              {/* <h4>{product.name}</h4> */}
              <br />
              <h4>Add images:</h4>
              <input
                type="file"
                placeholder="image"
                multiple="multiple"
                name="image"
                style={{
                  width:"100px",
                  height: "50px"
                }}
              />
              <br />
              <h4>Price: {product.price}</h4>

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
