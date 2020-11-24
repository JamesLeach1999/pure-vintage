import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Product from "../components/Product"
import Rows from "../components/StoreRows"
import Filter from "../components/Filter"

// for products need to use fetch
const People = props => {

  var [categories, setCategories] = useState([])
    var [brands, setBrands] = useState([]);
  var [sizes, setSizes] = useState([]);

 
  return (
    <div className="filter-container">
      <form className="col-4 filter filter-container">
        <h4 className="filter-title">Categories:</h4>
        <label className="checkbox filter">
          <input
            type="checkbox"
            value="shirts"
            id="filter1"
            name="category"
            onClick={(e) => setCategories(e.target.value)}
          />
          shirts
        </label>
        <label className="checkbox filter">
          <input type="checkbox" value="coats" id="filter2" name="category" />
          coats
        </label>
        <label className="checkbox filter">
          <input type="checkbox" value="shoes" id="filter3" name="category" />
          shoes
        </label>
        <label className="checkbox filter">
          <input type="checkbox" value="hats" id="filter3" name="category" />
          hats
        </label>
        <label className="checkbox filter">
          <input type="checkbox" value="socks" id="filter3" name="category" />
          socks
        </label>
        <label className="checkbox filter">
          <input type="checkbox" value="jim" id="filter3" name="category" />
          jim
        </label>
        <br />
        <h4 className="filter-title">Brands:</h4>
        <label className="checkbox filter">
          <input type="checkbox" value="nike" id="filter1" name="brand" />
          nike
        </label>
        <label className="checkbox filter">
          <input type="checkbox" value="notrh" id="filter2" name="brand" />
          notrh
        </label>
        <label className="checkbox filter">
          <input type="checkbox" value="West" id="filter3" name="brand" />
          west
        </label>
        <label className="checkbox filter">
          <input type="checkbox" value="burberry" id="filter3" name="brand" />
          burberry
        </label>
        <br />
        <h4 className="filter-title">Sizes:</h4>
        <label className="checkbox filter">
          <input type="checkbox" value="S" id="filter1" name="size" />S
        </label>
        <label className="checkbox filter">
          <input type="checkbox" value="XXL" id="filter2" name="size" />
          XXL
        </label>
        <br />
        <br />

        <button type="submit" onClick={() => window.location.reload()}>
          btn
        </button>
      </form>
      <Rows />
    </div>
  );
};

export default People;
