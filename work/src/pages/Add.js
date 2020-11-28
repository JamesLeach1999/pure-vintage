import React, { useState, useEffect, Component } from 'react';
import defaultImage from '../assets/shoes1.jpg';
import image from '../assets/cap1.jpg';
import { useFetch } from '../hooks/useFetch';
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';

const Addpage = () => {

  const [name, setName] = useState()
  const [brand, setBrand] = useState()
  const [category, setCategory] = useState()
    const [description, setDescription] = useState()
  const [size, setSize] = useState()
    const [price, setPrice] = useState()
    const [image, setImage] = useState()


  const [loading, setLoading] = useState(true)

  const add = async () => {

    if (
      !localStorage.getItem("admin") ||
      localStorage.getItem("admin") === "false"
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
  }


  // useEffect(() => {
  //   add()
  // }, [loading])
return (
  <div>
    <div class="grid category">
      <br />
      <br />
      <br />
      <form action="/products" method="post" enctype="multipart/form-data">
        <ul>
          <li>
            <input
              type="text"
              placeholder="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <br />
          <br />
          <br />
          <li>
            Brand
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
            </select>
          </li>
          <br />
          <br />
          <br />
          <li>
            Category
            <select
              id="category"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="accessories">Accessories</option>
              <option value="jeans">Jeans</option>
              <option value="trousers">Trousers</option>
              <option value="puffer">Puffer jackets</option>
              <option value="fleeces">Fleeces</option>
              <option value="caps">Caps</option>
              <option value="shirts">Shirts</option>
              <option value="polos">Polos</option>
              <option value="tracksuits">Tracksuits</option>
              <option value="trackjack">Track jackets</option>
              <option value="tshirts">T shirts</option>
            </select>
          </li>
          <br />
          <br />
          <li>
            Description
            <input
              type="text"
              placeholder="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </li>
          <br />
          <br />
          <li>
            Size
            <input
              type="text"
              placeholder="size"
              name="size"
              onChange={(e) => setSize(e.target.value)}
            />
          </li>
          <br />
          <br />
          <li>
            Images
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
            Price
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
}
  



export default Addpage;
