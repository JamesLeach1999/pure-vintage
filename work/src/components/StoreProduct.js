import React from "react";
import defaultImage from "../assets/shoes1.jpg"
const StoreProduct = ({name, image, price, rating}) => {
  var img = "../assets/" + image
  

  return (
    
      <div class="col-4">
        <img src={defaultImage} alt="" />
        <h4>{name}</h4>
        <div class="rating">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star-o"></i>
        </div>
  <p>£{price}</p>
      </div>
  );
};

export default StoreProduct;
