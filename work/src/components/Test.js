import React, { useState, useEffect } from "react";
import Product from "./Product";
import Filter from "./Filter";
import { Link, useParams } from "react-router-dom";
import queryString from "query-string";
import Axios from "axios";
import { parse } from "path";

const Test = () => {
  const cat = useParams("category");
  const brand = useParams("brand");
  const size = useParams("size");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [image, setImage] = useState(require("../assets/cap1.jpg"));
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    try {
      if (window.location.search === "") {
        const response = await fetch(`/store1`);
        console.log(window.location);
        const json = await response.json();
        setData([json.names]);
        setLoading(false)
      } else {
        console.log(window.location.search);
        const parsed = queryString.parse(window.location.search);
        if (parsed["skip"]) {
          this.setState({ page: parsed["skip"] });
          setPage(parsed["skip"]);
        } else if (!parsed["skip"]) {
          setPage(0);
        }
        console.log(parsed["skip"]);

        console.log(parsed["category"]);

        const response = await fetch(`/store1`);
        console.log(response);
        const json = await response.json();
        if(!parsed['skip']){
            var skip = 0
        } else {
            var skip = parseInt(parsed["skip"]);
        }
        const res = await Axios.get("/store1", {
          params: {
            category: parsed["category"],
            brand: parsed["brand"],
            size: parsed["size"],
            skip: skip
          },
        });
        console.log(res)
        setData([res.data.names]);
        console.log(data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("work");
    getData();
    // window.location.replace("http://localhost:5000/store")
  }, [loading]);
  return (
    <div className="small-container row filter-container">
      <div className="row product">
        {data.map((products) => {
          return products.slice(page, page + 4).map((product) => {
            // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
            return (
              <Link to={`/product/${product._id}`}>
                <Product id={product._id} />
                {/* <Product/> */}
              </Link>
            );
          });
        })}
      </div>
      <div className="row product">
        {data.map((products) => {
          return products.slice(page + 4, page + 8).map((product) => {
            // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
            return (
              <Link to={`/product/${product._id}`}>
                <Product id={product._id} />
                {/* <Product/> */}
              </Link>
            );
          });
        })}
      </div>
      <div className="row product">
        {data.map((products) => {
          return products.slice(page + 8, page + 12).map((product) => {
            // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
            return (
              <Link to={`/product/${product._id}`}>
                <Product id={product._id} />
                {/* <Product/> */}
              </Link>
            );
          });
        })}
      </div>
      <div className="row product">
        {data.map((products) => {
          return products.slice(page + 12, page + 16).map((product) => {
            // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
            return (
              <Link to={`/product/${product._id}`}>
                <Product id={product._id} />
                {/* <Product/> */}
              </Link>
            );
          });
        })}
      </div>

      {/* </div> */}
      <div className="pagination-div">
        <form action="/store" method="get">
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
};

export default Test;
