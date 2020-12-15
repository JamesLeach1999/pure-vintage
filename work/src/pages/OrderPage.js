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
      <div class="small-container">
        <div class="row product">
          {product.map((item, i) => {
            return (
              <div>
                <div className="col-4">
                  <img src={`${item.product.image[0]}`} alt="" />
                  <h4>{item.product.name}</h4>
                  <br />
                  <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-o"></i>
                  </div>
                  <p>{item.product.price}</p>
                </div>

                <div className="wrapper fadeInDown" syle={{float: "left"}}>
                  <br /> <br />
                  <br /> <br /> <br /> <br /> <br /> <br />
                  <div class="fadeIn first">
                    <div id="formContent">
                      <br />
                      <input
                        type="text"
                        id="login"
                        class="fadeIn second"
                        name="name"
                        placeholder="login"
                        value={name}
                        hidden
                        // onChange={(e) => setLoginUsername(e.target.value)}
                      />
                      <input
                        type="number"
                        id="password"
                        class="fadeIn third"
                        name="star"
                        max="5"
                        placeholder="password"
                        // onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <br />
                      <br />
                      <input
                        type="text"
                        id="password"
                        class="fadeIn third"
                        name="desc"
                        placeholder="password"
                        // onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <br />
                      <br />
                      <button
                        type="submit"
                        className="fadeIn fourth myButton"
                        style={{
                          borderRadius: "5%",
                          padding: "8px",
                          border: "none",
                        }}
                        onClick={() =>
                          window.location.replace(
                            "https://cryptic-temple-54361.herokuapp.com/store"
                          )
                        }
                        // onClick={login}
                      >
                        Submit review
                      </button>
                      <br />
                      <br />
                    </div>
                  </div>
                  <br />
                  <Link to="/register">
                    <button className="myButton">Create Account</button>
                  </Link>
                </div>
                {/* <form action="/reviews" method="post">
                  <input type="" name="id" value={item.product._id} hidden />
                  <input type="text" name="name" value={name} hidden />
                  <input type="number" name="star" max="5" />
                  <br />
                  <input type="text" name="desc" />
                  <br />
                  <button
                    type="submit"
                    onClick={() =>
                      window.location.replace(
                        "https://cryptic-temple-54361.herokuapp.com/store"
                      )
                    }
                  >
                    submit review
                  </button>
                </form> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
