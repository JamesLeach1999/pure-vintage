import React, { Component } from 'react';
import CartProduct from './CartProduct';
import { Link } from 'react-router-dom';
import { intersection } from 'lodash';
import Order from '../pageStripe/index';
import Axios from 'axios';

var auth = async () => {
  var user = await Axios.get("/me")
  console.log(user.data)
  return user.data
}
export default auth
