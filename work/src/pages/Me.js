import React, { useState, useEffect } from "react";
import Me from "../components/Me"

// for products need to use fetch
const People = (props) => {
  var [categories, setCategories] = useState([]);
  var [brands, setBrands] = useState([]);
  var [sizes, setSizes] = useState([]);

  console.log(sessionStorage);

  return (
    <div>
      <Me/>
    </div>
  );
};

export default People;
