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

    // const profile = await Axios.get(`/me`);
    const profile = await Axios.get(`/me?id=${localStorage.getItem("user")}`);
  console.log(profile)
    if (!profile || !profile.data.isAdmin) {
      window.location.replace('/store');
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
            image
          },
          withCredentials: true,

          url: "/products",
        }).then((res) => {
            console.log(res.data)
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
      <form action="/products" method="post" enctype="multipart/form-data">
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="brand"
          name="brand"
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="category"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="size"
          name="size"
          onChange={(e) => setSize(e.target.value)}
        />

        <input
          type="file"
          placeholder="image"
          name="image"
          multiple
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          placeholder="price"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="submit"
          name="submit"
          value="submit"
          onClick={() => add()}
        />
      </form>
    </div>
  </div>
);
}
  



export default Addpage;
