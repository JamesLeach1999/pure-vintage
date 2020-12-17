import React, { useState, useEffect } from "react";
import Product from "./Product";
import Filter from "./Filter";
import { Link, useParams } from "react-router-dom";
import queryString from "query-string";
import Axios from "axios";

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
        console.log("bfrwoeiuoviueafsnv8orsenylvfshgfilvyesuhwkefajgcjsrebyf")
        const response = await fetch(`/store1`);
        console.log(response)
        console.log(window.location);
        const json = await response.json();
        setData([json.names]);
        this.setState({ data: [json.names] });
        console.log(this.state.data);
        console.log(this.state.page);

        console.log(this.state.images);
      } else {
        console.log(this.state.page);
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
        setData([json.names]);

        setLoading(false)
        // await Axios({
        //   method: "GET",
        //   data: {
        //     category: parsed["category"],
        //     brand: parsed["brand"],
        //     size: parsed["size"],
        //     skip: parseInt(parsed["skip"]),
        //   },
        //   withCredentials: true,

        //   url: "/store",
        // }).then((res) => {
        //     console.log(res.data.names);
        //   setData(res.data.names)
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData()
    // window.location.replace("http://localhost:5000");
  }, [loading]);
  return (
    <div className="small-container row1 filter-container">
      <div className="row1 product">
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
      <div className="row1 product">
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
      <div className="row1 product">
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
      <div className="row1 product">
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
