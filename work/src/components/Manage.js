import React, { useState, useEffect, Component, Profiler } from 'react';
import Product from './Product';
import Filter from './Filter';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Axios from 'axios';
import Edit from "./Edit"
import { words } from 'lodash';
// import { useFetch } from "../hooks/useFetch";

const Manage = () => {

  const [data, setData] = useState([])
  const [images, setImages] = useState(require('../assets/cap1.jpg'))
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState()
  const getManage = async () => {

    const work = await Axios.post("/getAuth", {
      id: sessionStorage.getItem("user"),
    });

    if (
      !sessionStorage.getItem("admin") ||
      sessionStorage.getItem("admin") === "false" || !work.data.isAdmin
    ) {
      window.location.replace("/store");
    } else {
      try {
        if (window.location.search === "") {
          const response = await fetch(`/manage/items`);
          const json = await response.json();
          setData([json.names]);
          setLoading(false);
        } else {
          console.log(window.location.search);
          const parsed = queryString.parse(window.location.search);

          
          var skip;
          if (!parsed["skip"]) {
            skip = 0;
          } else {
            skip = parseInt(parsed["skip"]);
          }
          const res = await Axios.get("/manage/items", {
            params: {
              category: parsed["category"],
              brand: parsed["brand"],
              size: parsed["size"],
              skip: skip,
              price: parsed['price']
            },
          });
          setData([res.data.names]);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getManage()
  }, [loading])

  

    return (
      <div className="store-container">
        <Link to="/allOrders" style={{ fontSize: "28px" }}>
          Past orders
        </Link>
        <br />
        <br />
        <Link to="/add" style={{ fontSize: "28px" }}>
          Add product
        </Link>
        <div className="row product" >
          {data.map((products) => {
            return products.slice(page, page + 4).map((product) => {
              // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
              return (
                <>
                  <div
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      height: "200px",
                    }}
                  >
                    <form action="/featured" method="post">
                      <input
                        type="text"
                        name="featured"
                        value={product._id}
                        onClick={(e) => e.preventDefault()}
                        hidden
                      />
                      <button
                        type="submit"
                        // onClick={() => window.location.reload()}
                      >
                        Featured
                      </button>
                    </form>
                    <br /> <br />
                    <br />
                    <form action="/gender" method="post">
                      <input
                        type="text"
                        name="gender"
                        value={product._id}
                        onClick={(e) => e.preventDefault()}
                        hidden
                      />
                      <button
                        type="submit"
                        // onClick={() => window.location.reload()}
                      >
                        Gender
                      </button>
                    </form>
                    <br /> <br /> <br />
                    <form action="/inStock" method="post">
                      <input
                        type="text"
                        name="inStock"
                        value={product._id}
                        onClick={(e) => e.preventDefault()}
                        hidden
                      />
                      <button
                        type="submit"
                        // onClick={() => window.location.reload()}
                      >
                        In stock
                      </button>
                    </form>
                    <br /> <br /> <br />
                    <form action="/delete" method="post">
                      <input
                        type="text"
                        name="delete"
                        value={product._id}
                        hidden
                      />
                      <button
                        type="submit"
                        // onClick={() => window.location.reload()}
                      >
                        delete
                      </button>
                    </form>
                  </div>

                  <br />
                  <Link to={`/edit/${product._id}`}>
                    <Edit id={product._id} />
                    {/* <Product/> */}
                  </Link>
                  <br />
                </>
              );
            });
          })}
        </div>
        <div className="row product">
          {data.map((products) => {
            return products.slice(page + 4, page + 8).map((product) => {
              // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
              return (
                <>
                  <Link to={`/edit/${product._id}`}>
                    <Edit id={product._id} />
                    {/* <Product/> */}
                  </Link>
                  <br />

                  <form action="/featured" method="post">
                    <input
                      type="text"
                      name="featured"
                      value={product._id}
                      onClick={(e) => e.preventDefault()}
                      hidden
                    />
                    <button
                      type="submit"
                      // onClick={() => window.location.reload()}
                    >
                      Featured
                    </button>
                  </form>
                  <br/>
                  <form action="/inStock" method="post">
                    <input
                      type="text"
                      name="inStock"
                      value={product._id}
                      onClick={(e) => e.preventDefault()}
                      hidden
                    />
                    <button
                      type="submit"
                      // onClick={() => window.location.reload()}
                    >
                      In stock
                    </button>
                  </form>
                  <br/>
                  <form action="/delete" method="post">
                    <input
                      type="text"
                      name="delete"
                      value={product._id}
                      hidden
                    />
                    <button
                      type="submit"
                      // onClick={() => window.location.reload()}
                    >
                      delete
                    </button>
                  </form>
                </>
              );
            });
          })}
        </div>
        <div className="row product">
          {data.map((products) => {
            return products.slice(page + 8, page + 12).map((product) => {
              // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
              return (
                <>
                  <Link to={`/edit/${product._id}`}>
                    <Edit id={product._id} />
                    {/* <Product/> */}
                  </Link>
                  <br />

                  <form action="/featured" method="post">
                    <input
                      type="text"
                      name="featured"
                      value={product._id}
                      onClick={(e) => e.preventDefault()}
                      hidden
                    />
                    <button
                      type="submit"
                      // onClick={() => window.location.reload()}
                    >
                      Featured
                    </button>
                  </form>
                  <br />
                  <form action="/inStock" method="post">
                    <input
                      type="text"
                      name="inStock"
                      value={product._id}
                      onClick={(e) => e.preventDefault()}
                      hidden
                    />
                    <button
                      type="submit"
                      // onClick={() => window.location.reload()}
                    >
                      In stock
                    </button>
                  </form>
                  <br/>
                  <form action="/delete" method="post">
                    <input
                      type="text"
                      name="delete"
                      value={product._id}
                      hidden
                    />
                    <button
                      type="submit"
                      // onClick={() => window.location.reload()}
                    >
                      delete
                    </button>
                  </form>
                </>
              );
            });
          })}
        </div>
        <div className="row product">
          {data.map((products) => {
            return products.slice(page + 12, page + 16).map((product) => {
              // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
              return (
                <>
                  <Link to={`/edit/${product._id}`}>
                    <Edit id={product._id} />
                    {/* <Product/> */}
                  </Link>
                  <br />

                  <form action="/featured" method="post">
                    <input
                      type="text"
                      name="featured"
                      value={product._id}
                      onClick={(e) => e.preventDefault()}
                      hidden
                    />
                    <button
                      type="submit"
                      // onClick={() => window.location.reload()}
                    >
                      Featured
                    </button>
                  </form>
                  <br />
                  <form action="/inStock" method="post">
                    <input
                      type="text"
                      name="inStock"
                      value={product._id}
                      onClick={(e) => e.preventDefault()}
                      hidden
                    />
                    <button
                      type="submit"
                      // onClick={() => window.location.reload()}
                    >
                      In stock
                    </button>
                  </form>
                  <form action="/gender" method="post">
                    <input
                      type="text"
                      name="gender"
                      value={product._id}
                      onClick={(e) => e.preventDefault()}
                      hidden
                    />
                    <button
                      type="submit"
                      // onClick={() => window.location.reload()}
                    >
                      Change gender
                    </button>
                  </form>
                  <br />
                  <form action="/delete" method="post">
                    <input
                      type="text"
                      name="delete"
                      value={product._id}
                      hidden
                    />
                    <button
                      type="submit"
                      // onClick={() => window.location.reload()}
                    >
                      delete
                    </button>
                  </form>
                </>
              );
            });
          })}
        </div>

        <div className="pagination-div">
          <form>
            {/* <input type="submit" name="skip" value={16} /> */}
            <button
              type="submit"
              name="skip"
              value={0}
              style={{
                backgroundColor: "#e7e7e7" /* Green */,
                border: "none",
                color: "black",
                padding: "15px 32px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "16px",
                margin: "4px 2px",
                cursor: " pointer",
              }}
            >
              1
            </button>

            <button
              type="submit"
              name="skip"
              value={16}
              style={{
                backgroundColor: "#e7e7e7" /* Green */,
                border: "none",
                color: "black",
                padding: "15px 32px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "16px",
                margin: "4px 2px",
                cursor: " pointer",
              }}
            >
              2
            </button>

            <button
              type="submit"
              name="skip"
              value={32}
              style={{
                backgroundColor: "#e7e7e7" /* Green */,
                border: "none",
                color: "black",
                padding: "15px 32px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "16px",
                margin: "4px 2px",
                cursor: " pointer",
              }}
            >
              3
            </button>
            <button
              type="submit"
              name="skip"
              value={48}
              style={{
                backgroundColor: "#e7e7e7" /* Green */,
                border: "none",
                color: "black",
                padding: "15px 32px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "16px",
                margin: "4px 2px",
                cursor: " pointer",
              }}
            >
              4
            </button>
          </form>
        </div>
      </div>
    );
  }


export default Manage;
