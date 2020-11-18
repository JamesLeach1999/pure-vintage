import React, { useState } from 'react';
// import "./App.css";
import Axios from 'axios';

function Order() {
  const [house, setHouse] = useState('');
  const [town, setTown] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');

  const order = () => {
    Axios({
      method: 'POST',
      data: {
        house: house,
        town: town,
        city: city,
        postcode: postcode
      },
      withCredentials: true,

      url: '/shipping',
    }).then((res) => console.log(res));
  };

  return (
    <div className="App">
      <div>
        <input placeholder="house" onChange={(e) => setHouse(e.target.value)} />
        <input placeholder="town" onChange={(e) => setTown(e.target.value)} />
        <input placeholder="city" onChange={(e) => setCity(e.target.value)} />
        <input placeholder="postcode" onChange={(e) => setPostcode(e.target.value)} />

        <button onClick={order}>Submit</button>
      </div>

      
    </div>
  );
}

export default Order;
