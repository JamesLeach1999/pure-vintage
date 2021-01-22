import React, {useState, useEffect} from "react";

const PicCard = ({ image }) => {
  console.log(image)
  return <img className="cardPics" src={`${image}`}  alt="no load"></img>;
};

export default PicCard;
