import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import ManageComponent from '../components/Manage';
import Filter from '../components/Filter';

// for products need to use fetch
const Manage = () => {
  var [categories, setCategories] = useState([]);
  var [brands, setBrands] = useState([]);
  var [sizes, setSizes] = useState([]);

  return (
    <div>
      <Filter/>
      <ManageComponent />
    </div>
  );
};

export default Manage;
