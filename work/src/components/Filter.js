import React, {useState} from "react";
import { Link } from "react-router-dom";
import queryString from 'query-string';

const Filter = () => {

  var [categories, setCategories] = useState([])
  console.log(categories)
  return (
    <form
      action="/store"
      method="post"
      name="category"
      className="col-4 filter filter-container"
    >
      <h4 className="filter-title">Categories:</h4>
      <ul>
        <li>
          <label className="checkbox filter">
            <input
              type="checkbox"
              value="shirts"
              id="filter1"
              name="category"
            />
            shirts
          </label>
        </li>
        <li>
          <label className="checkbox filter">
            <input type="checkbox" value="coats" id="filter2" name="category" />
            coats
          </label>
        </li>
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
      </ul>
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
      {/* <Link to={{
        pathname: "/store",
        data: 
      }} */}
      <button type="submit" style={{ padding: "50px" }}>
        Submit
      </button>
    </form>
  );
};

export default Filter;
