import React, {useState, useEffect} from "react";

const PicCard = ({ image }) => {
  console.log(image)
  return <img className="cardPics" src={`${image}`} style={{width: "300px"}} alt="shit"></img>;
};

export default PicCard;
