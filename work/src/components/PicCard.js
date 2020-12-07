import React, {useState, useEffect} from "react";

const PicCard = ({ id, index }) => {
  const url = `/product?id=${id}`;
  const [images, setImages] = useState([]);

  const getProduct = async () => {
    // this returns a promise. so need to extract data from response (generally in json)
    const response = await fetch(url);
    const products = await response.json();

    setImages(products.name.image[index])
  };

  useEffect(() => {
    // this returns all 30 users in an array using setState
    getProduct();
    
    // this means it only runs once
    // if you are triggering re render in your effect function, add the dependancy array
    // do this so no infinite loop
  }, []);
  return <img src={`${images}`} alt="shit"></img>;
};

export default PicCard;
