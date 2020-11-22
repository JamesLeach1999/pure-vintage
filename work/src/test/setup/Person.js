import React, { useState, useEffect } from 'react';
import { useFetch } from "../../hooks/useFetch";
// useParams allows us to access the get, it returns an object so need specific value
import { Link, useParams } from 'react-router-dom';
// it will always return it as a string, so watch out for this
// wanna grap the value and find the person in the array
const Person = () => {
  // the key will always be the name after the : in the url. it just contains object of all params
  // console.log(useParams())

  const {products} = useFetch("/store")
  const [name, setName] = useState("name")
  const {id} = useParams()
// useEffect only happens on changes. with empty array only on initial render
// with values in array, one or all of them need to change to fire useEffect
  useEffect(() => {
    // remember the param is string, so parse into number
    // wtf ok so if you wrap it in brackets, it needs a return
    const newPerson = products.find((person) => {return person._id === parseInt(id)})
    console.log(newPerson)
    setName(newPerson.name)
  }, [])
  return (
    <div>
      <h1>{name}</h1>
      <Link to="/people">
        back to people
      </Link>
    </div>
  );
};

export default Person;
