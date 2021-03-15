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
  const [loading, setLoading] = useState(true);
  var [pag, setPag] = useState([]);

  const getData = async () => {
    try {
      if (window.location.search === "") {
        const response = await fetch(`/store1`);
        const json = await response.json();
        setData([json.names]);
        setLoading(false);
        if (json.names.length > 80) {
          setPag([0, 16, 32, 48, 64, 80]);
        } else if (json.names.length > 64) {
          setPag([0, 16, 32, 48, 64]);
        } else if (json.names.length > 48) {
          setPag([0, 16, 32, 48]);
        } else if (json.names.length > 32) {
          setPag([0, 16, 32]);
        } else if (json.names.length > 16) {
          setPag([0, 16]);
        } else {
          setPag([0]);
        }
      } else {
        const parsed = queryString.parse(window.location.search);

        // const response = await fetch(`/store1`);
        // console.log(response);
        // const json = await response.json();
        var skip;
        if (!parsed["skip"]) {
          skip = 0;
        } else {
          skip = parseInt(parsed["skip"]);
        }
        const res = await Axios.get("/store1", {
          params: {
            category: parsed["category"],
            brand: parsed["brand"],
            size: parsed["size"],
            price: parsed["price"],
            gender: parsed["gender"],

            skip: skip,
          },
        });
        // console.log(res);
        setData([res.data.names]);
        // console.log(data[0].length);

        if (res.data.names.length > 80) {
          setPag([0, 16, 32, 48, 64, 80]);
        } else if (res.data.names.length > 64) {
          setPag([0, 16, 32, 48, 64]);
        } else if (res.data.names.length > 48) {
          setPag([0, 16, 32, 48]);
        } else if (res.data.names.length > 32) {
          setPag([0, 16, 32]);
        } else if (res.data.names.length > 16) {
          setPag([0, 16]);
        } else {
          setPag([0]);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addSkip = (num) => {
    var searchParams = new URL(window.location);
    var params = new URLSearchParams(searchParams.search.slice(1))

    params.append("skip", num);
    window.location.search = params.toString();
  };

  useEffect(() => {

    getData();
  }, [loading]);
  return (
    <div className="store-container">
      <br />
      <br />
      <br />
      <br />
      <br />

      <br />
      <div className="row product">
        {data.map((products) => {
          return products.slice(page, page + 4).map((product) => {
            return (
              <Link to={`/product/${product._id}`}>
                <Product id={product._id} />
              </Link>
            );
          });
        })}
      </div>
      <div className="row product">
        {data.map((products) => {
          return products.slice(page + 4, page + 8).map((product) => {
            return (
              <Link to={`/product/${product._id}`}>
                <Product id={product._id} />
              </Link>
            );
          });
        })}
      </div>
      <div className="row product">
        {data.map((products) => {
          return products.slice(page + 8, page + 12).map((product) => {
            return (
              <Link to={`/product/${product._id}`}>
                <Product id={product._id} />
              </Link>
            );
          });
        })}
      </div>
      <div className="row product">
        {data.map((products) => {
          return products.slice(page + 12, page + 16).map((product) => {
            return (
              <Link to={`/product/${product._id}`}>
                <Product id={product._id} />
              </Link>
            );
          });
        })}
      </div>

      <div className="pagination-div carousel" aria-label="Gallery">
        <form>
          <ol className="carousel_viewport">
            <button
              type="submit"
              name="skip"
              value={0}
              onClick={(e) => addSkip(e.target.value)}
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
              {0}
            </button>
            {pag.map((pageNumber, index) => {
              console.log(pageNumber);
              return (
                <button
                  type="submit"
                  name="skip"
                  value={pageNumber + 16}
                  onClick={(e) => addSkip(e.target.value)}
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
                  {index + 1}
                </button>
              );
            })}
          </ol>
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Test;
