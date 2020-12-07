import React, { useState, useEffect } from "react";
import defaultImage from "../assets/shoes1.jpg";
import image from "../assets/cap1.jpg";
import { useFetch } from "../hooks/useFetch";
import Reviews from "./Reviews";
import { Link, useParams } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import OtherReviews from "./OtherReviews";
import Card from "./PicCard";
const ProductPage = () => {
  const { id } = useParams();
  const url = `/product?id=${id}`;
  console.log(id);
  const [product, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [small, setSmall] = useState();
  const [style, setStyle] = useState();

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 680, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
  ];
  const getProducts = async () => {
    if (window.innerWidth > 600) {
      setStyle({ width: "124px", height: "124px" });
    } else {
      setStyle({ width: "60px", height: "60px" });
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

  console.log(product);
  console.log(images);
  return (
    <div>
      <div class="small-container single-product">
        <div class="row">
          <div class="col-2-pics">
            <Carousel breakPoints={breakPoints}>
              <Card image={images[0]} />
              <Card image={images[1]} />
              <Card image={images[2]} />
              <Card image={images[3]} />
              <Card image={images[4]} />
            </Carousel>
            {/* <img
              src={`${small||images[0]}`}
              alt="shit"
            ></img>
            <div class="small-img-row">
              <div class="small-img-col">
                {images[1] !== undefined && images !== undefined ? (
                  <img
                    src={`${images[1]}`}
                    onClick={() => setSmall(images[1])}
                    alt=""
                    style={style}
                    width="100%"
                    class="smallImg"
                  />
                ) : (
                  ""
                )}
              </div>
              <div class="small-img-col">
                {images[2] !== undefined && images !== undefined ? (
                  <img
                    src={`${images[2]}`}
                    onClick={() => setSmall(images[2])}
                    alt=""
                    style={style}
                    width="100%"
                    class="smallImg"
                  />
                ) : (
                  ""
                )}
              </div>
              <div class="small-img-col">
                {images[3] !== undefined && images !== undefined ? (
                  <img
                    src={`${images[3]}`}
                    onClick={() => setSmall(images[3])}
                    alt=""
                    style={style}
                    width="100%"
                    class="smallImg"
                  />
                ) : (
                  ""
                )}
              </div>
              <div class="small-img-col">
                {images[4] !== undefined && images !== undefined ? (
                  <img
                    src={`${images[4]}`}
                    onClick={() => setSmall(images[4])}
                    alt=""
                    style={style}
                    width="100%"
                    class="smallImg"
                  />
                ) : (
                  ""
                )}
              </div>
                </div> */}
          </div>
          <div class="col-2 product">
            <p style={{ textTransform: "uppercase" }}>{product.category}</p>
            <h1>{product.name}</h1>
            <h4>£{product.price}</h4>

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
