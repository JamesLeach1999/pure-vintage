import React, { useState, useEffect } from "react";

import Reviews from "./Reviews";
import { Link, useParams } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import Card from "./PicCard";
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

  const breakPoints = [{ width: 1, itemsToShow: 1 }];
  const getProducts = async () => {
    if (window.innerWidth > 600) {
      setStyle({ width: "60vw", height: "124px" });
      setVert(true);
    } else {
      setStyle({ width: "60px", height: "60px" });
      setVert(false);
    }

    // this returns a promise. so need to extract data from response (generally in json)
    const response = await fetch(url);
    const products = await response.json();

    //   console.log(products.name)
    console.log(products.name.image);
    // this will run 30 times because its after every re render. will be stuck in loop
    setProducts(products.name);
    setImages(products.name.image);

    if (images) {
      setSmall(images[0]);
    }

    // then you want to set the state, set the empty array to an array of 30
  };
  const setCart = (pID) => {
    // var cart = localStorage.getItem("unAuthCart") || [];
    if (localStorage.getItem("unAuthCart") === null) {
      var i = [pID, pID];
      console.log(i);
      localStorage.setItem("unAuthCart", JSON.stringify([pID]));
    } else {
      var cartJson = JSON.parse(localStorage.getItem("unAuthCart"));
      cartJson.push(pID);
      console.log(pID);
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
    <div>
      <div class="small-container single-product">
        <div class="row">
          <div class="col-2-pics">
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
            <p style={{ textTransform: "uppercase" }}>{product.category}</p>
            <h1>{product.name}</h1>
            <h4>£{product.price}</h4>

            {sessionStorage.getItem("auth") === "true" ? (
              <form action="/added" method="POST">
                <input type="text" value={id} name="id" hidden />
                <h3 style={{ justifyContent: "center" }}>
                  Add to cart:
                  <br />
                  <input type="checkbox" />
                </h3>
                <input
                  type="submit"
                  style={{ width: "150px", margin: "20px" }}
                  onClick={() => window.location.replace("/store")}
                />
              </form>
            ) : (
              <form>
                <h3 style={{ justifyContent: "center" }}>
                  Add to cart:
                  <br />
                  <input type="checkbox" />
                </h3>
                <input
                  type="submit"
                  style={{ width: "150px", margin: "20px" }}
                  onClick={() => setCart(id)}
                />
              </form>
            )}
            {/* <a href="" class="btn">Add to cart</a> */}
            <h3>
              Product details <i class="fa fa-indent"></i>
            </h3>
            <br />
            <p>{product.description}</p>
          </div>
        </div>
        <Reviews />
        {/* <OtherReviews/> */}
      </div>
    </div>
  );
};

export default ProductPage;
