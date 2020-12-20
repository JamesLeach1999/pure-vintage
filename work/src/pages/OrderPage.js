import React, { useState, useEffect } from "react";
import defaultImage from "../assets/shoes1.jpg";
import image from "../assets/cap1.jpg";
import { useFetch } from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";

const OrderPage = () => {
  const { id } = useParams();
  console.log(sessionStorage.getItem("user"));
  const url = `/orderProducts?id=${id}&user=${sessionStorage.getItem("user")}`;
  console.log(id);
  const [product, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [p, setP] = useState([]);
  const [loading, setLoading] = useState(true);
  const [star, setStar] = useState();

  const getProducts = async () => {
    // this returns a promise. so need to extract data from response (generally in json)
    const response = await fetch(url);
    const products = await response.json();

    console.log(products.names.orderItems);
    setName(products.user.name);

    const t = JSON.parse(products.names.orderItems);
    setProducts(t);
    console.log(name);
    // console.log(p);
    // var yyy = [];
    // await product.map((item) => {
    //   yyy.push(JSON.parse(item.orderItems));
    // });
    // setP(yyy);
    // console.log(p);
    setLoading(false);
    // console.log(this.state.data);
    // then you want to set the state, set the empty array to an array of 30
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
  console.log(product);
  console.log(p);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="small-container">
        <div className="row product">
          {product.map((item, i) => {
            localStorage.getItem(`${item.product._id}`) !== "true" ? (
              <div>
                <div className="col-4">
                  <img src={`${item.product.image[0]}`} alt="" />
                  <h4>{item.product.name}</h4>
                  <br />

                  <p>£{item.product.price}</p>
                </div>

                <div
                  classNameName="wrapper fadeInDown"
                  syle={{ float: "left" }}
                >
                  <div className="fadeIn first">
                    <div id="formContent">
                      <br />
                      <form method="post" action="/reviews">
                        <input
                          type="text"
                          id="login"
                          className="fadeIn second"
                          name="name"
                          placeholder="login"
                          value={name}
                          hidden
                          // onChange={(e) => setLoginUsername(e.target.value)}
                        />
                        <input
                          type="text"
                          id="id"
                          className="fadeIn second"
                          name="id"
                          placeholder="id"
                          value={item.product._id}
                          hidden
                          // onChange={(e) => setLoginUsername(e.target.value)}
                        />
                        <div className="rate fadeIn third">
                          <input
                            type="radio"
                            id="star5"
                            name="star"
                            value="5"
                            onClick={(e) => setStar(e.target.value)}
                          />
                          <label for="star5" title="text">
                            5 stars
                          </label>
                          <input
                            type="radio"
                            id="star4"
                            name="star"
                            value="4"
                            onClick={(e) => setStar(e.target.value)}
                          />
                          <label for="star4" title="text">
                            4 stars
                          </label>
                          <input
                            type="radio"
                            id="star3"
                            name="star"
                            value="3"
                            onClick={(e) => setStar(e.target.value)}
                          />
                          <label for="star3" title="text">
                            3 stars
                          </label>
                          <input
                            type="radio"
                            id="star2"
                            name="star"
                            value="2"
                            onClick={(e) => setStar(e.target.value)}
                          />
                          <label for="star2" title="text">
                            2 stars
                          </label>
                          <input
                            type="radio"
                            id="star1"
                            name="star"
                            value="1"
                            onClick={(e) => setStar(e.target.value)}
                          />
                          <label for="star1" title="text">
                            1 star
                          </label>
                        </div>
                        {/* <input
                          type="number"
                          id="star"
                          className="fadeIn third"
                          name="star"
                          max="5"
                          placeholder="star"
                          // style={{width: "40%", textAlign: "left"}}
                          // onChange={(e) => setLoginPassword(e.target.value)}
                        /> */}
                        <br />
                        <br />
                        <input
                          type="text"
                          id="password"
                          className="fadeIn third"
                          name="desc"
                          placeholder="Description"
                          // onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <br />
                        <br />
                        <button
                          type="submit"
                          classNameName="fadeIn fourth myButton"
                          style={{
                            borderRadius: "5%",
                            padding: "8px",
                            border: "none",
                          }}
                          onClick={() => {
                            localStorage.setItem(`${item.product._id}`, true);
                            window.location.replace(
                              "https://cryptic-temple-54361.herokuapp.com/store"
                            );
                          }}
                          // onClick={login}
                        >
                          Submit review
                        </button>
                        <br />
                        <br />
                      </form>
                    </div>
                  </div>
                  <br />
                </div>
                
              </div>
            ) : (
              <></>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
