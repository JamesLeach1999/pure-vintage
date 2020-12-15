import React, { useState, useEffect, Component, Profiler } from 'react';
import Product from './Product';
import Filter from './Filter';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Axios from 'axios';
import Edit from "./Edit"
// import { useFetch } from "../hooks/useFetch";

const Manage = () => {

  const [data, setData] = useState([])
  const [images, setImages] = useState(require('../assets/cap1.jpg'))
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState()
  const getManage = async () => {

    Axios.post({
      method: "POST",
      data: {
        name: sessionStorage.getItem("user")
      },
      withCredentials: true,
      url: "/getAuth",
    }).then((data) => {
      setAdmin(data.isAdmin)
    });
    
    if (
      !sessionStorage.getItem("admin") ||
      sessionStorage.getItem("admin") === "false" || !admin
    ) {
      window.location.replace("/store");
    } else {
      try {
        if (window.location.search === "") {
          const response = await fetch(`/manage1`);
          console.log(window.location);
          const json = await response.json();
          setData([json.names]);
          setLoading(false);
        } else {
          console.log(window.location.search);
          const parsed = queryString.parse(window.location.search);

          console.log(parsed["skip"]);

          console.log(parsed["category"]);
          var skip;
          if (!parsed["skip"]) {
            skip = 0;
          } else {
            skip = parseInt(parsed["skip"]);
          }
          const res = await Axios.get("/manage1", {
            params: {
              category: parsed["category"],
              brand: parsed["brand"],
              size: parsed["size"],
              skip: skip,
              price: parsed['price']
            },
          });
          console.log(res)
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
        <Link to="/allOrders">

          Past orders
        </Link>
        <br/><br/>
        <Link to="/add">
          Add product
        </Link>
        <div className="row product">
          {data.map((products) => {
            return products.slice(page, page + 4).map((product) => {
              // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
              return (
                <>
                  <Link to={`/edit/${product._id}`}>
                    <Edit id={product._id} />
                    {/* <Product/> */}
                  </Link>
                  <br/>
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
                      deletr
                    </button>
                  </form>
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
                      deletr
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
                      deletr
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
                      deletr
                    </button>
                  </form>
                </>
              );
            });
          })}
        </div>

        <div className="pagination-div">
          <form action="/manage" method="get">
            <button name="skip" value={16}>
              Page 1
            </button>
            <button name="skip" value={32}>
              Page 2
            </button>
            <button name="skip" value={48}>
              Page 3
            </button>
          </form>
        </div>
      </div>
    );
  }


export default Manage;
