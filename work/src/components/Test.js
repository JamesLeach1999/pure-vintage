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
        console.log(window.location);
        const json = await response.json();
        setData([json.names]);
        setLoading(false);
      } else {
        console.log(window.location.search);
        const parsed = queryString.parse(window.location.search);

        console.log(parsed["skip"]);

        console.log(parsed["category"]);

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
        console.log(data.length)
                console.log(data[0].length);

        if (data.length > 0) {
          setPag([0]);
        } else if (data.length > 16) {
          setPag([0, 16]);
        } else if (data.length > 32) {
          setPag([0, 16, 32]);
        } else if (data.length > 48) {
          setPag([0, 16, 32, 48]);
        } else if (data.length > 64) {
          setPag([0, 16, 32, 48, 64]);
        } else if (data.length > 80) {
          setPag([0, 16, 32, 48, 64, 80]);
        }
        // console.log(data);
        setLoading(false);
        console.log(pag)

        // data.map((products) => {
        //   products.map((product) => {
        //     console.log(JSON.stringify(product))
        //   })
        // })
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
      <div className="pagination-div carousel" aria-label="Gallery">
        <form>
          <ol className="carousel_viewport">
            {pag.map((pageNumber, index) => {
              console.log(pageNumber)
              return (
                <button
                  type="submit"
                  name="skip"
                  value={pageNumber}
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
                  {index}
                </button>
              );
            })}
            {/* <input type="submit" name="skip" value={16} /> */}
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
