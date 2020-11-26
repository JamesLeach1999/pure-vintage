import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Rows from "../components/Test";
import Filter from "../components/Filter";

// for products need to use fetch
const People = (props) => {
  var [categories, setCategories] = useState([]);
  var [brands, setBrands] = useState([]);
  var [sizes, setSizes] = useState([]);

  console.log(localStorage);

  return (
    <div className="filter-container">
      <form className="col-4 filter filter-container" action="/store">
        <h4 className="filter-title">Categories:</h4>

        <section>
          <section>
            <h5>Filters</h5>

            <section class="mb-4">
              <h6 class="font-weight-bold mb-3">Condition</h6>

              <div class="form-check pl-0 mb-3">
                <input
                  type="checkbox"
                  class="form-check-input filled-in"
                  id="new"
                />
                <label
                  class="form-check-label small text-uppercase card-link-secondary"
                  for="new"
                >
                  New
                </label>
              </div>
              <div class="form-check pl-0 mb-3">
                <input
                  type="checkbox"
                  class="form-check-input filled-in"
                  id="used"
                />
                <label
                  class="form-check-label small text-uppercase card-link-secondary"
                  for="used"
                >
                  Used
                </label>
              </div>
              <div class="form-check pl-0 mb-3">
                <input
                  type="checkbox"
                  class="form-check-input filled-in"
                  id="collectible"
                />
                <label
                  class="form-check-label small text-uppercase card-link-secondary"
                  for="collectible"
                >
                  Collectible
                </label>
              </div>
              <div class="form-check pl-0 mb-3 pb-1">
                <input
                  type="checkbox"
                  class="form-check-input filled-in"
                  id="renewed"
                />
                <label
                  class="form-check-label small text-uppercase card-link-secondary"
                  for="renewed"
                >
                  Renewed
                </label>
              </div>
            </section>

            <section class="mb-4">
              <h6 class="font-weight-bold mb-3">Price</h6>

              <div class="slider-price d-flex align-items-center my-4">
                <span class="font-weight-normal small text-muted mr-2">$0</span>
                <form class="multi-range-field w-100 mb-1">
                  <input id="multi" class="multi-range" type="range" />
                </form>
                <span class="font-weight-normal small text-muted ml-2">
                  $100
                </span>
              </div>
            </section>

            <section class="mb-4">
              <h6 class="font-weight-bold mb-3">Size</h6>

              <div class="form-check pl-0 mb-3">
                <input
                  type="checkbox"
                  class="form-check-input filled-in"
                  id="34"
                />
                <label
                  class="form-check-label small text-uppercase card-link-secondary"
                  for="34"
                >
                  34
                </label>
              </div>
              <div class="form-check pl-0 mb-3">
                <input
                  type="checkbox"
                  class="form-check-input filled-in"
                  value="jeans"
                  id="jeans"
                  name="category"
                />
                <label
                  class="form-check-label small text-uppercase card-link-secondary"
                  for="jeans"
                >
                  Jeans
                </label>
              </div>
              <div class="form-check pl-0 mb-3">
                <input
                  type="checkbox"
                  class="form-check-input filled-in"
                  value="trousers"
                  id="trousers"
                  name="category"
                />
                <label
                  class="form-check-label small text-uppercase card-link-secondary"
                  for="38"
                >
                  Trousers
                </label>
              </div>
              <div class="form-check pl-0 mb-3">
                <input
                  type="checkbox"
                  class="form-check-input filled-in"
                  value="puffer"
                  id="puffer"
                  name="category"
                />
                <label
                  class="form-check-label small text-uppercase card-link-secondary"
                  for="puffer"
                >
                  Puffer jackets
                </label>
              </div>
              <a
                class="btn btn-link text-muted p-0"
                data-toggle="collapse"
                href="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                More
              </a>
              <div class="collapse pt-3" id="collapseExample">
                <div class="form-check pl-0 mb-3">
                  <input
                    type="checkbox"
                    class="form-check-input filled-in"
                    value="hoodies"
                    id="hoodies"
                    name="category"
                  />
                  <label
                    class="form-check-label small text-uppercase card-link-secondary"
                    for="hoodies"
                  >
                    Hoodies
                  </label>
                </div>
                <div class="form-check pl-0 mb-3">
                  <input
                    type="checkbox"
                    class="form-check-input filled-in"
                    value="caps"
                    id="caps"
                    name="category"
                  />
                  <label
                    class="form-check-label small text-uppercase card-link-secondary"
                    for="caps"
                  >
                    Caps
                  </label>
                </div>
                <div class="form-check pl-0 mb-3">
                  <input
                    type="checkbox"
                    class="form-check-input filled-in"
                    value="coats"
                    id="coats"
                    name="category"
                  />
                  <label
                    class="form-check-label small text-uppercase card-link-secondary"
                    for="coats"
                  >
                    Coats
                  </label>
                </div>
                <div class="form-check pl-0 mb-3">
                  <input
                    type="checkbox"
                    class="form-check-input filled-in"
                    value="shirts"
                    id="shirts"
                    name="category"
                  />
                  <label
                    class="form-check-label small text-uppercase card-link-secondary"
                    for="shirts"
                  >
                    Shirts
                  </label>
                </div>
              </div>
            </section>
          </section>
        </section>
      </form>

      {/* </label> */}
      {/* <label className="checkbox filter">
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

        <button type="submit">
          btn
        </button> */}
      <Rows />
    </div>
  );
};

export default People;
