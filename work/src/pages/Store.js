import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import StoreRows from "../components/Test";
import Filter from "../components/Filter";
import FadeIn from "react-fade-in";
import "../css/filter.css";
// for products need to use fetch
const People = (props) => {
  var [price, setPrice] = useState(0);
  const [size, setSize] = useState(window.innerWidth);
  const [style, setStyle] = useState({});
  const [animate, setAnimate] = useState(false);
  var [clicked, setClick] = useState(false);
  // this outputs 770px
  console.log(size);
  console.log(localStorage.getItem("unAuthCart"));
  console.log(localStorage);
  console.log(sessionStorage);
  console.log(clicked);
  const bigSize = {
    maxWidth: "350px",
    position: "relative",
    left: "40px",
    paddingLeft: "25px",
    textTransform: "capitalize",
  };

  const smallSize = {
    maxWidth: "30%",
    position: "relative",
    fontSize: "15px",
    marginLeft: "-2px",
    paddingLeft: "25px",
    textTransform: "none",
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

  useEffect(() => {
    if (window.innerWidth > 660) {
      setStyle(bigSize);
    } else {
      setStyle(smallSize);
    }
    if (sessionStorage.getItem("firstLoadDone") === null) {
      setAnimate(true);

      sessionStorage.setItem("firstLoadDone", 0);
    } else {
      setAnimate(false);
    }

    // we use a callback to run every time the event takes place
    // every time we call the callback function, it triggers a re render
    window.addEventListener("resize", checkSize);
    // everytime we use useEffect, we have the optionof returning
    // whatever we place in here will be invoked once we exit the use effect
    // before we trigger useEffect after the re render, we remove the listener
    return () => {
      console.log("clean up");
      window.removeEventListener("resize", checkSize);
      // cant just use console.log. needs to return something like useState does on update
      // everytime useEffect is called, it adds the listener and sets the state
      // everytime use effect called, it returns remove the listener
      // ok so everytime useEffect called, trigger checkSize to change the window size
      // but it dosent RETURN the addeventlistener, it returns remove
      // the checksize here just does the same thing. you just have to put in a call back
    };
  }, []);

  return (
    <FadeIn>
      <div
        style={{ border: "none", textTransform: "capitalize" }}
        className={animate ? "fade-in-hello hello span" : "hello-span"}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <section className="p">
          {window.innerWidth > 660 ? (
            <form
              className="f-col filter filter-container filterItems"
              action="/store"
              id="fcol"
              style={style}
            >
              <section style={{ height: "1500px", fontSize: "110%" }}>
                <h3
                  class="font-weight-bold mb-3"
                  style={{ padding: "10px", backgroundColor: "whitesmoke" }}
                >
                  Size
                </h3>
                <section className="mb-4">
                  <div class="form-check pl-0 mb-3 pb-1">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="26-30"
                      id="26-30"
                      name="size"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="26-30"
                    >
                      26"-30"
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3 pb-1">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="31-34"
                      id="31-34"
                      name="size"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="31-34"
                    >
                      31"-34"
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3 pb-1">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="35-38"
                      id="35-38"
                      name="size"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="35-38"
                    >
                      35"-38"
                    </label>
                  </div>

                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="XS"
                      id="XS"
                      name="size"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
                      for="XXL"
                    >
                      XXL
                    </label>
                  </div>
                </section>
                <h3
                  class="font-weight-bold mb-3"
                  style={{ padding: "10px", backgroundColor: "whitesmoke" }}
                >
                  Brand
                </h3>
                <section class="mb-4 listbox">
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="nike"
                      id="nike"
                      name="brand"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
                      for="burberry"
                    >
                      Burberry
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="guess"
                      id="guess"
                      name="brand"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="guess"
                    >
                      Guess
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
                      class="form-check-label small  card-link-secondary"
                      for="kappa"
                    >
                      Kappa
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="dior"
                      id="dior"
                      name="brand"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="dior"
                    >
                      Dior
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
                      for="ralph"
                    >
                      Ralph lauren
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
                      class="form-check-label small  card-link-secondary"
                      for="adidas"
                    >
                      Adidas
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="berghaus"
                      id="berghaus"
                      name="brand"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="berghaus"
                    >
                      Berghaus
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
                      for="north"
                    >
                      North face
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="ysl"
                      id="ysl"
                      name="brand"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="ysl"
                    >
                      YSL
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
                      for="champion"
                    >
                      Champion
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="umbro"
                      id="umbro"
                      name="brand"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="umbro"
                    >
                      Umbro
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
                      class="form-check-label small  card-link-secondary"
                      for="levi"
                    >
                      Levi
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="puma"
                      id="puma"
                      name="brand"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="puma"
                    >
                      Puma
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="valentino"
                      id="valentino"
                      name="brand"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="valentino"
                    >
                      Valentino
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="carhartt"
                      id="carhartt"
                      name="brand"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="carhartt"
                    >
                      Carhartt
                    </label>
                  </div>

                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="helly"
                      id="helly"
                      name="brand"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="helly"
                    >
                      Helly Hansen
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="calvin"
                      id="calvin"
                      name="brand"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="calvin"
                    >
                      Calvin Klein
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="gap"
                      id="gap"
                      name="brand"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="gap"
                    >
                      Gap
                    </label>
                  </div>
                </section>
                <h3
                  class="font-weight-bold mb-3"
                  style={{ padding: "10px", backgroundColor: "whitesmoke" }}
                >
                  Categories
                </h3>
                <section class="mb-4 listbox" style={{ fontSize: "80%" }}>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="accessories"
                      id="accessories"
                      name="category"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
                      for="trackjack"
                    >
                      Track Jackets
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="tracksuits"
                      id="tracksuits"
                      name="category"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="tracksuits"
                    >
                      Tracksuits
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="harrington"
                      id="harrington"
                      name="category"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="harrington"
                    >
                      Harrington Jackets
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
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
                      class="form-check-label small  card-link-secondary"
                      for="shirts"
                    >
                      Shirts
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="sweatshirts"
                      id="sweatshirts"
                      name="category"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="sweatshirts"
                    >
                      Sweatshirts
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="t-shirts"
                      id="t-shirts"
                      name="category"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="t-shirts"
                    >
                      T-shirts
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="blazers"
                      id="blazers"
                      name="category"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="blazers"
                    >
                      Blazers
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="football"
                      id="football"
                      name="category"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="football"
                    >
                      Football shirts
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="joggers"
                      id="joggers"
                      name="category"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="joggers"
                    >
                      Joggers
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="necklaces"
                      id="necklaces"
                      name="category"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="necklaces"
                    >
                      Necklaces
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="polos"
                      id="polos"
                      name="category"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="polos"
                    >
                      Polos
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="shorts"
                      id="shorts"
                      name="category"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="shorts"
                    >
                      Shorts
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="hoodies"
                      id="hoodies"
                      name="category"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="hoodies"
                    >
                      Hoodies
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="windbreakers"
                      id="windbreakers"
                      name="category"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="windbreakers"
                    >
                      Windbreakers
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="padded"
                      id="padded"
                      name="category"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="padded"
                    >
                      Padded jackets
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
                      class="form-check-label small  card-link-secondary"
                      for="trousers"
                    >
                      Trousers
                    </label>
                  </div>
                </section>
                <section class="mb-4 listbox">
                  <h5
                    class="font-weight-bold mb-3"
                    style={{
                      padding: "10px",
                      backgroundColor: "whitesmoke",height:"200px"
                    }}
                  >
                    Shop by gender
                  </h5>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="true"
                      id="mens"
                      name="gender"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="mens"
                    >
                      Mens
                    </label>
                  </div>
                  <div class="form-check pl-0 mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in"
                      value="false"
                      id="womens"
                      name="gender"
                    />
                    <label
                      class="form-check-label small  card-link-secondary"
                      for="womens"
                    >
                      Womens
                    </label>
                  </div>
                </section>
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
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#4CAF50",
                    border: "none",
                    color: "black",
                    padding: "16px 32px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "16px",
                    margin: "4px 2px",
                    cursor: "pointer",
                    transitionDuration: "0.4s",
                  }}
                  // onMouseOver={(e) => {
                  //   e.target.style = {
                      
                  //     backgroundColor: "blue",
                  //     border: "none",
                  //     color: "white",
                  //     padding: "16px 32px",
                  //     textAlign: "center",
                  //     textDecoration: "none",
                  //     display: "inline-block",
                  //     fontSize: "16px",
                  //     margin: "4px 2px",
                  //     cursor: "pointer",
                  //     transitionDuration: "0.4s",
                  //   };
                  // }}
                >
                  Search
                </button>
              </section>
            </form>
          ) : (
            <>
              <h1
                className="filter-logo"
                onClick={() => setClick(!clicked)}
                style={{
                  left: "0",
                  marginLeft: "-25px",
                  marginRight: "500px",
                  backgroundColor: "whitesmoke",
                  borderRadius: "7%",
                  transform: "rotate(-90deg)",
                  top: "150px",
                  padding: "5px",
                  width: "100px",
                  position: "fixed",
                }}
              >
                Filters
              </h1>
              <section
                className="filterItems"
                style={clicked ? { fontSize: "65%" } : { display: "none" }}
              >
                <form
                  className="f-col filter filter-container filterItems"
                  action="/store"
                  // style={style}
                >
                  {/* <h5>Filters</h5> */}
                  <ul
                    className={clicked ? "filter-menu active" : "filter-menu"}
                    style={{
                      height: "70%",
                      zIndex: "29292929",
                    }}
                  >
                    <h5
                      className="font-weight-bold mb-3"
                      style={{
                        padding: "10px",
                        backgroundColor: "whitesmoke",
                      }}
                    >
                      Size
                    </h5>
                    <section class="mb-4 listbox">
                      <div class="form-check pl-0 mb-3 pb-1">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="26-30"
                          id="26-30"
                          name="size"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="26-30"
                        >
                          26"-30"
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3 pb-1">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="31-34"
                          id="31-34"
                          name="size"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="31-34"
                        >
                          31"-34"
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3 pb-1">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="35-38"
                          id="35-38"
                          name="size"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="35-38"
                        >
                          35"-38"
                        </label>
                      </div>

                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="XS"
                          id="XS"
                          name="size"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
                          for="XXL"
                        >
                          XXL
                        </label>
                      </div>
                    </section>

                    <h5
                      class="font-weight-bold mb-3"
                      style={{
                        padding: "10px",
                        backgroundColor: "whitesmoke",
                      }}
                    >
                      Brand
                    </h5>
                    <section class="mb-4 listbox">
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="nike"
                          id="nike"
                          name="brand"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
                          for="burberry"
                        >
                          Burberry
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="guess"
                          id="guess"
                          name="brand"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="guess"
                        >
                          Guess
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
                          class="form-check-label small  card-link-secondary"
                          for="kappa"
                        >
                          Kappa
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="dior"
                          id="dior"
                          name="brand"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="dior"
                        >
                          Dior
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
                          for="ralph"
                        >
                          Ralph lauren
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="berghaus"
                          id="berghaus"
                          name="brand"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="berghaus"
                        >
                          Berghaus
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
                          for="north"
                        >
                          North face
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="ysl"
                          id="ysl"
                          name="brand"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="ysl"
                        >
                          YSL
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
                          for="champion"
                        >
                          Champion
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="umbro"
                          id="umbro"
                          name="brand"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="umbro"
                        >
                          Umbro
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
                          class="form-check-label small  card-link-secondary"
                          for="levi"
                        >
                          Levi
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="puma"
                          id="puma"
                          name="brand"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="puma"
                        >
                          Puma
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="valentino"
                          id="valentino"
                          name="brand"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="valentino"
                        >
                          Valentino
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="carhartt"
                          id="carhartt"
                          name="brand"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="carhartt"
                        >
                          Carhartt
                        </label>
                      </div>

                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="helly"
                          id="helly"
                          name="brand"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="helly"
                        >
                          Helly Hansen
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="calvin"
                          id="calvin"
                          name="brand"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="calvin"
                        >
                          Calvin Klein
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="gap"
                          id="gap"
                          name="brand"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="gap"
                        >
                          Gap
                        </label>
                      </div>
                    </section>

                    <h5
                      class="font-weight-bold mb-3"
                      style={{
                        padding: "10px",
                        backgroundColor: "whitesmoke",
                      }}
                    >
                      Categories
                    </h5>
                    <section class="mb-4 listbox">
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="accessories"
                          id="accessories"
                          name="category"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
                          for="trackjack"
                        >
                          Track Jackets
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="tracksuits"
                          id="tracksuits"
                          name="category"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="tracksuits"
                        >
                          Tracksuits
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="harrington"
                          id="harrington"
                          name="category"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="harrington"
                        >
                          Harrington Jackets
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
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
                          class="form-check-label small  card-link-secondary"
                          for="shirts"
                        >
                          Shirts
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="sweatshirts"
                          id="sweatshirts"
                          name="category"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="sweatshirts"
                        >
                          Sweatshirts
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="t-shirts"
                          id="t-shirts"
                          name="category"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="t-shirts"
                        >
                          T-shirts
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="blazers"
                          id="blazers"
                          name="category"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="blazers"
                        >
                          Blazers
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="football"
                          id="football"
                          name="category"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="football"
                        >
                          Football shirts
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="joggers"
                          id="joggers"
                          name="category"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="joggers"
                        >
                          Joggers
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="necklaces"
                          id="necklaces"
                          name="category"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="necklaces"
                        >
                          Necklaces
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="polos"
                          id="polos"
                          name="category"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="polos"
                        >
                          Polos
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="shorts"
                          id="shorts"
                          name="category"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="shorts"
                        >
                          Shorts
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="hoodies"
                          id="hoodies"
                          name="category"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="hoodies"
                        >
                          Hoodies
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="windbreakers"
                          id="windbreakers"
                          name="category"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="windbreakers"
                        >
                          Windbreakers
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="padded"
                          id="padded"
                          name="category"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="padded"
                        >
                          Padded jackets
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
                          class="form-check-label small  card-link-secondary"
                          for="trousers"
                        >
                          Trousers
                        </label>
                      </div>
                      <br />
                    </section>

                    <section class="mb-4 listbox">
                      <h5
                        class="font-weight-bold mb-3"
                        style={{
                          padding: "10px",
                          backgroundColor: "whitesmoke",
                        }}
                      >
                        Shop by gender
                      </h5>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="true"
                          id="mens"
                          name="gender"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="mens"
                        >
                          Mens
                        </label>
                      </div>
                      <div class="form-check pl-0 mb-3">
                        <input
                          type="checkbox"
                          class="form-check-input filled-in"
                          value="false"
                          id="womens"
                          name="gender"
                        />
                        <label
                          class="form-check-label small  card-link-secondary"
                          for="womens"
                        >
                          Womens
                        </label>
                      </div>
                    </section>

                    <h5>Max price: £{price}</h5>

                    <input
                      style={{ fontSize: "15px" }}
                      type="number"
                      id="price"
                      name="price"
                      min="0"
                      max="1000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></input>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#e7e7e7",
                        border: "none",
                        color: "black",
                        padding: "8px 32px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "16px",
                        margin: "4px 2px",
                        cursor: " pointer",
                      }}
                    >
                      Search
                    </button>
                  </ul>
                </form>
              </section>
            </>
          )}
          {/* </form> */}

          <StoreRows style={{ width: "100%" }} />

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </section>
      </div>
    </FadeIn>
  );
};

export default People;
