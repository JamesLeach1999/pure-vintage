import React, { useState, useEffect, Component } from "react";
import defaultImage from "../assets/shoes1.jpg";
import image from "../assets/cap1.jpg";
import { useFetch } from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";

const Addpage = () => {
  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [size, setSize] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();

  const [loading, setLoading] = useState(true);

  const add = async () => {
    const work = await Axios.post("/getAuth", {
      id: sessionStorage.getItem("user"),
    });

    console.log(work);
    if (
      !sessionStorage.getItem("admin") ||
      sessionStorage.getItem("admin") === "false" ||
      !work.data.isAdmin
    ) {
      window.location.replace("/store");
    } else {
      try {
        Axios({
          method: "POST",
          data: {
            name,
            brand,
            category,
            description,
            size,
            price,
            image,
          },
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,

          url: "/products",
        }).then((res) => {
          console.log(res.data);
          // props.handleLogin(res.data.passport);

          window.location.replace("/store");
        });
        // console.log(this.state.orders);
      } catch (error) {
        // console.log(data);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    add();
  }, [loading]);
  return (
    <div>
      <div
        class="grid category"
        className="small-container"
        style={{ alignContent: "left", textAlign: "left" }}
      >
        <br />
        <br />
        <br /> <br /> <br />
        <form action="/products" method="post" enctype="multipart/form-data">
          <ul>
            <li>
              <h3>Name:</h3>
              <br />

              <input
                type="text"
                placeholder="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </li>
            <br />
            <br />
            <li>
              <h3>Brand:</h3>
              <br />
              <select
                id="brand"
                name="brand"
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="none">N/A</option>
                <option value="fila">fila</option>
                <option value="nike">nike</option>
                <option value="levi">levi</option>
                <option value="champion">Champion</option>
                <option value="burberry">Burberry</option>
                <option value="ysl">YSL</option>
                <option value="kappa">Kappa</option>
                <option value="dior">Dior</option>
                <option value="ralph">Ralph lauren</option>
                <option value="lacoste">Lacoste</option>
                <option value="tommy">Tommy hilfiger</option>
                <option value="guess">Guess</option>
                <option value="reebok">Reebok</option>
                <option value="puma">Puma</option>
                <option value="adidas">Adidas</option>
                <option value="north">North Face</option>
                <option value="carhartt">Carhartt</option>
              </select>
            </li>
            <br />
            <br />
            <li>
              <h3>Category:</h3>
              <br />
              <select
                id="category"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="accessories">Accessories</option>
                <option value="jeans">Jeans</option>
                <option value="trousers">Trousers</option>
                <option value="puffer">Puffer jackets</option>
                <option value="sweatshirts">Sweatshirts</option>
                <option value="caps">Caps</option>
                <option value="shirts">Shirts</option>
                <option value="polos">Polos</option>
                <option value="tracksuits">Tracksuits</option>
                <option value="trackjack">Track jackets</option>
                <option value="windbreakers">Windbreakers</option>
                <option value="shorts">Shorts</option>
                <option value="hoodies">Hoodies</option>
                <option value="blazers">Blazers</option>
                <option value="football">Football shirts</option>
              </select>
            </li>
            <br />
            <br />
            <li>
              <h3>Description</h3>
              <br />
              <textarea
                type="text"
                placeholder="description"
                name="description"
                style={{ width: "300px", height: "200px" }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </li>
            <br />
            <br />
            <li>
              <h3>Size:</h3>
              <br />
              <select
                id="size"
                name="size"
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="none">none</option>
                <option value="26-30">26"-30"</option>
                <option value="31-34">31"-34"</option>
                <option value="35-38">35"-38"</option>

                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </li>
            <br />
            <br />
            <li>
              <h4>
                Images. Please drag images here or highlight multiple and upload
                them:
              </h4>
              <br />
              <input
                type="file"
                placeholder="image"
                name="image"
                multiple
                onChange={(e) => setImage(e.target.value)}
              />
            </li>
            <br />
            <br />
            <li>
              <h3>Price:</h3>
              <br />
              <input
                type="number"
                placeholder="price"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </li>
            <br />
            <br />
            <li>
              <input
                type="submit"
                name="submit"
                value="submit"
                onClick={() => add()}
              />
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Addpage;
