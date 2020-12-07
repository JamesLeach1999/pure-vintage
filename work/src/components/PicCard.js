import React, {useState, useEffect} from "react";

const PicCard = ({ image }) => {
  
  return <img className="card" src={`${image}`} alt="shit"></img>;
};

export default PicCard;
