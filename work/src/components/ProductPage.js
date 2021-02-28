import React, { useState, useEffect } from "react";
import defaultImage from "../assets/shoes1.jpg";
import image from "../assets/cap1.jpg";
import { useFetch } from "../hooks/useFetch";
import Reviews from "./Reviews";
import { Link, useParams } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import OtherReviews from "./OtherReviews";
import Card from "./PicCard";
import styled from "styled-components";
const ProductPage = () => {
  const { id } = useParams();
  const url = `/product?id=${id}`;
  console.log(id);
  const [product, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [small, setSmall] = useState();
  const [style, setStyle] = useState();
  const [vert, setVert] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 }
    
  ];
  const getProducts = async () => {
    if (window.innerWidth > 600) {
      setVert(true);
    } else {
      setVert(false);
    }

    // this returns a promise. so need to extract data from response (generally in json)
    const response = await fetch(url);
    const products = await response.json();

    //   console.log(products.name)
    // console.log(products.name.image);
    // this will run 30 times because its after every re render. will be stuck in loop
    setProducts(products.name);
    setImages(products.name.image);

    if (images) {
      setSmall(images[0]);
    }

    // then you want to set the state, set the empty array to an array of 30
  };
  const setCart = (pID) => {
    console.log("do something")
    // var cart = localStorage.getItem("unAuthCart") || [];
    if (
      localStorage.getItem("unAuthCart") === null ||
      localStorage.getItem("unAuthCart") === undefined
    ) {
      console.log(pID);
      // console.log(i)
      localStorage.setItem("work already", "just work")
      localStorage.setItem("unAuthCart", JSON.stringify([pID]));
    } else {
      var cartJson = JSON.parse(localStorage.getItem("unAuthCart"));
      // cartJson.push(pID);
      // console.log(pID);
      localStorage.setItem("unAuthCart", JSON.stringify(cartJson));
      setCartProducts(localStorage.getItem("unAuthCart"));
      console.log(cartProducts);
      console.log(localStorage.getItem("unAuthCart"));
    }
  };
  // cant use async await on useEffect (can in callback funcions), need a seperate function
  // it looks for the cleanup function, not a promise. cant use promise in useEffect
  // no  clue
  useEffect(() => {
    // this returns all 30 users in an array using setState
    getProducts();
    
    if (images) {
      setSmall(images[0]);
    }
    // this means it only runs once
    // if you are triggering re render in your effect function, add the dependancy array
    // do this so no infinite loop
  }, []);

  
  return (
    <div style={{ width: "100%" }}>
      <br />
      <br />
      <br />
      <br />
      <div class="small-container single-product">
        <div class="row">
          <div
            class="col-2-pics"
            style={{ position: "relative", right: "40px", width: "100%" }}
          >
            <Carousel
              breakPoints={breakPoints}
              showArrows={vert}
              style={{ backgroundColor: "white", color: "white" }}
            >
              {images.map((i) => {
                return <Card image={i} />;
              })}
            </Carousel>
          </div>
          <div class="col-2 product">
            <h3 style={{ textTransform: "capitalize" }}>{product.category}</h3>
            <h1>{product.name}</h1>
            <h3>£{product.price}.95</h3>
            <h3>Size: {product.size}</h3>
            <h3 style={{ textTransform: "capitalize" }}>
              Brand: {product.brand}
            </h3>

            {/* <form>
              <h1>testform</h1>
            </form> */}

            {sessionStorage.getItem("auth") === "true" ? (
              <form action="/added" method="POST">
                <input type="text" value={id} name="id" hidden />
                <h3 style={{ justifyContent: "center" }}>
                  <button
                    style={{
                      width: "150px",
                      margin: "20px",
                      content: "Add to cart",
                    }}
                    type="submit"
                    value="Add to cart"
                    placeholder="add to cart"
                    onClick={() => window.location.replace("/store")}
                  >
                    Add to cart
                  </button>
                </h3>
              </form>
            ) : (
              <form>
                <input type="text" value={id} name="id" hidden />
                <h3 style={{ justifyContent: "center" }}>
                  <button
                    type="submit"
                    value="Add to cart"
                    style={{
                      width: "150px",
                      margin: "20px",
                      content: "Add to cart",
                      backgroundColor: "white",
                      borderRadius: "5%",
                    }}
                    onClick={() => setCart(id)}
                  >
                    Add to cart
                  </button>
                </h3>
              </form>
            )}
            <h3>
              Product details <i class="fa fa-indent"></i>
            </h3>
            <br />
            <p style={{ whiteSpace: "pre-line", fontSize: "1.5rem" }}>
              {product.description}
            </p>
          </div>
        </div>
        <Reviews />
      </div>
    </div>
  );
};

export default ProductPage;
