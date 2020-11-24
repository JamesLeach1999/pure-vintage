import React, { useState, useEffect } from "react";
import defaultImage from "../assets/shoes1.jpg";
import image from "../assets/cap1.jpg";
import { useFetch } from "../hooks/useFetch";
import Reviews from "./Reviews";
import { Link, useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const url = `/product?id=${id}`;
  console.log(id);
  const [product, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const getProducts = async () => {
    // this returns a promise. so need to extract data from response (generally in json)
    const response = await fetch(url);
    const products = await response.json();

    //   console.log(products.name)
    console.log(products.name.image);
    // this will run 30 times because its after every re render. will be stuck in loop
    setProducts(products.name);
    setImages(products.name.image);
    // then you want to set the state, set the empty array to an array of 30
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
  console.log(images)
  return (
    <div>
      <div class="small-container single-product">
        <div class="row">
          <div class="col-2">
            {images.length > 0 ? (
              <img src={`/assets/${images[0]}`} alt="shit"></img>
            ) : (
              <img src={`/assets/${images}`} alt="shit"></img>
            )}
          </div>
          <div class="col-2">
            <p>Home / t shirt</p>
            <h1>{product.name}</h1>
            <h4>{product.price}</h4>

            <form
              action="/added"
              method="POST"
              onSubmit={() =>
                window.location.replace(
                  "/store"
                )
              }
            >
              <input type="text" value={product._id} name="id" hidden />
              <h3 style={{ justifyContent: "center" }}>
                Add to cart: <input type="checkbox" />
              </h3>
              <input type="submit" style={{ width: "150px", margin: "20px" }} />
            </form>
            {/* <a href="" class="btn">Add to cart</a> */}
            <h3>
              Product details <i class="fa fa-indent"></i>
            </h3>
            <br />
            <p>{product.description}</p>
          </div>
        </div>
        <Reviews />
      </div>
    </div>
  );
};

export default ProductPage;
