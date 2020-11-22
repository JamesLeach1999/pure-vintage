import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
// for products need to use fetch
const People = () => {
  const url = "/store"

    const [users, setUsers] = useState([]);


  const getUsers = async () => {
    // this returns a promise. so need to extract data from response (generally in json)
    const response = await fetch(url);
    const users = await response.json();

    // this will run 30 times because its after every re render. will be stuck in loop
    setUsers(users.names);
    // then you want to set the state, set the empty array to an array of 30
    console.log(users);
  };

  // cant use async await on useEffect (can in callback funcions), need a seperate function
  // it looks for the cleanup function, not a promise. cant use promise in useEffect
  useEffect(() => {
    // this returns all 30 users in an array using setState
    getUsers();
    // this means it only runs once
    // if you are triggering re render in your effect function, add the dependancy array
    // do this so no infinite loop
  }, []);
  return (
    <>
      <h3>github users</h3>
      <ul className="users">
        {users.map((user) => {
          // nice bit of destructuring
          const { id, name } = user;
          // when doing map you always have to return something. remember the key too for lists
          return (
            <li key={id}>
              <h1>{name}</h1>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default People;
