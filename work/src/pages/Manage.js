import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import ManageComponent from '../components/Manage';
import Filter from '../components/Filter';
import FadeIn from 'react-fade-in';

// for products need to use fetch
const Manage = () => {
  var [clicked, setClicked] = useState(false);
  var [price, setPrice] = useState(0);
  const [size, setSize] = useState(window.innerWidth);
  const [style, setStyle] = useState({});
  const [animate, setAnimate] = useState(false);
  // this outputs 770px
  console.log(size);
  console.log(localStorage.getItem("unAuthCart"));
  console.log(localStorage);
  console.log(sessionStorage);

  const bigSize = {
    maxWidth: "350px",
    position: "relative",
    left: "40px",
    paddingLeft: "25px",
  };

  const smallSize = {
    maxWidth: "30%",
    position: "relative",
    fontSize: "15px",
    marginLeft: "-2px",
    paddingLeft: "25px",
  };
  console.log(sessionStorage);
  // this is the callback (can do it inline), uses the initial size for default
  // then everytime it changes, it is updated by passing inthe new FUNCTION
  // with window. anything is a function. everytime it changes it is stored in memory
  // this happens because everytime the size change, it triggers a re render, but not of the page
  // this is where the cleanup comes in. so it dosent take up all ur memory
  const checkSize = () => {
    setSize(window.innerWidth);
  };

  return (
    <FadeIn>
      <div
        style={{ border: "none" }}
        className={animate ? "fade-in-hello hello span" : "hello-span"}
      >
        <br />
        <br />
        <br/>
        <br/><br/><br/><br/><br/>
        <section className="p">
          <form
            className="f-col filter filter-container"
            action="/manage"
            style={style}
          >
            {window.innerWidth > 660 ? (
              <section style={{ height: "1500px" }}>
                <h5>Filters</h5>

                <section class="mb-4">
                  <h6
                    class="font-weight-bold mb-3"
                    style={{ padding: "10px", backgroundColor: "whitesmoke" }}
                  >
                    Size
                  </h6>

                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="XS"
                      id="XS"
                      name="size"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="XS"
                    >
                      XS
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3 pb-1">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="S"
                      id="S"
                      name="size"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="S"
                    >
                      S
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="M"
                      id="M"
                      name="size"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="M"
                    >
                      M
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="L"
                      id="L"
                      name="size"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="L"
                    >
                      L
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="XL"
                      id="XL"
                      name="size"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="XL"
                    >
                      XL
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3 pb-1">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="XXL"
                      id="XXL"
                      name="size"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="XXL"
                    >
                      XXL
                    </label>
                  </div>
                </section>

                <section class="mb-4">
                  <h6
                    class="font-weight-bold mb-3"
                    style={{ padding: "10px", backgroundColor: "whitesmoke" }}
                  >
                    Brand
                  </h6>

                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="nike"
                      id="nike"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="nike"
                    >
                      Nike
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="burberry"
                      id="burberry"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="burberry"
                    >
                      Burberry
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="tommy"
                      id="tommy"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="tommy"
                    >
                      Tommy Hilfiger
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="ralph"
                      id="ralph"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="ralph"
                    >
                      Ralph
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="adidas"
                      id="adidas"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="adidas"
                    >
                      Adidas
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="fila"
                      id="fila"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="fila"
                    >
                      Fila
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="reebok"
                      id="reebok"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="reebok"
                    >
                      Reebok
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="north"
                      id="north"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="north"
                    >
                      North face
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="tommy"
                      id="tommy"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="tommy"
                    >
                      Tommy Hilfiger
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="lacoste"
                      id="lacoste"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="lacoste"
                    >
                      Lacoste
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="kappa"
                      id="kappa"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="kappa"
                    >
                      Kappa
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="champion"
                      id="champion"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="champion"
                    >
                      Champion
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="lacoste"
                      id="lacoste"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="lacoste"
                    >
                      Lacoste
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="levi"
                      id="levi"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="levi"
                    >
                      Levi
                    </label>
                  </div>
                </section>

                <section class="mb-4">
                  <h6 class="font-weight-bold mb-3">Categories</h6>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="accessories"
                      id="accessories"
                      name="category"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="accessories"
                    >
                      Accessories
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
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="fleeces"
                      id="fleeces"
                      name="category"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="fleeces"
                    >
                      Fleeces
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
                      value="trackjack"
                      id="trackjack"
                      name="category"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="trackjack"
                    >
                      Track Jackets
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
                  Max price: £{price}
                  <input
                    type="range"
                    id="price"
                    name="price"
                    min="0"
                    max="1000"
                    default="1000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </section>
                <button type="submit">Search</button>
              </section>
            ) : (
              <section>
                <h5>Filters</h5>

                <section class="mb-4">
                  <h6
                    class="font-weight-bold mb-3"
                    style={{ padding: "10px", backgroundColor: "whitesmoke" }}
                  >
                    Size
                  </h6>

                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="XS"
                      id="XS"
                      name="size"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="XS"
                    >
                      XS
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3 pb-1">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="S"
                      id="S"
                      name="size"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="S"
                    >
                      S
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="M"
                      id="M"
                      name="size"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="M"
                    >
                      M
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="L"
                      id="L"
                      name="size"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="L"
                    >
                      L
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="XL"
                      id="XL"
                      name="size"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="XL"
                    >
                      XL
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3 pb-1">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="XXL"
                      id="XXL"
                      name="size"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="XXL"
                    >
                      XXL
                    </label>
                  </div>
                </section>

                <section class="mb-4">
                  <h6
                    class="font-weight-bold mb-3"
                    style={{ padding: "10px", backgroundColor: "whitesmoke" }}
                  >
                    Brand
                  </h6>

                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="nike"
                      id="nike"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="nike"
                    >
                      Nike
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="burberry"
                      id="burberry"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="burberry"
                    >
                      Burberry
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="tommy"
                      id="tommy"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="tommy"
                    >
                      Tommy Hilfiger
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="ralph"
                      id="ralph"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="ralph"
                    >
                      Ralph
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="adidas"
                      id="adidas"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="adidas"
                    >
                      Adidas
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="fila"
                      id="fila"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="fila"
                    >
                      Fila
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="reebok"
                      id="reebok"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="reebok"
                    >
                      Reebok
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="north"
                      id="north"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="north"
                    >
                      North face
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="tommy"
                      id="tommy"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="tommy"
                    >
                      Tommy Hilfiger
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="lacoste"
                      id="lacoste"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="lacoste"
                    >
                      Lacoste
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="kappa"
                      id="kappa"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="kappa"
                    >
                      Kappa
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="champion"
                      id="champion"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="champion"
                    >
                      Champion
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="lacoste"
                      id="lacoste"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="lacoste"
                    >
                      Lacoste
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="levi"
                      id="levi"
                      name="brand"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="levi"
                    >
                      Levi
                    </label>
                  </div>
                </section>

                <section class="mb-4">
                  <h6
                    class="font-weight-bold mb-3"
                    style={{ padding: "10px", backgroundColor: "whitesmoke" }}
                  >
                    Categories
                  </h6>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="accessories"
                      id="accessories"
                      name="category"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="accessories"
                    >
                      Accessories
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
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="fleeces"
                      id="fleeces"
                      name="category"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="fleeces"
                    >
                      Fleeces
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
                      value="trackjack"
                      id="trackjack"
                      name="category"
                    />
                    <label
                      class="form-check-label small text-uppercase card-link-secondary"
                      for="trackjack"
                    >
                      Track Jackets
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
                  {/* class="form-check-input filled-in" class="form-check-label small
                text-uppercase card-link-secondary" */}
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
                  <br />
                  Max price: £{price}
                  <input
                    style={{ fontSize: "15px" }}
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    max="1000"
                    // default="1000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </section>
                <button type="submit">Search</button>
              </section>
            )}
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
          <ManageComponent />
        </section>
      </div>
    </FadeIn>
  );
};

export default Manage;
