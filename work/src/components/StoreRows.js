import React, { useState, useEffect, Component } from 'react';
import Product from './Product';
import Filter from './Filter';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Axios from "axios"
// import { useFetch } from "../hooks/useFetch";

class Rows extends Component {
  constructor() {
    super();
    this.state = { data: [], images: require('../assets/cap1.jpg'), page: 0 };
  }

  async componentDidMount() {
    try {
      if(!window.location.search){
        const response = await fetch(`/store`);
        console.log(window.location);
        const json = await response.json();
        this.setState({ data: [json.names] });
        console.log(this.state.data);
                console.log(this.state.page);

        console.log(this.state.images);
      } else {
        console.log(this.state.page)
        console.log(window.location.search)
        const parsed = queryString.parse(window.location.search)
        if(parsed['skip']){
          this.setState({page: parsed['skip']})
        } else if (!parsed['skip']){
          this.setState({ page: 0 });
        }
        console.log(parsed['skip'])
          
        console.log(parsed['category'])
        Axios({
          method: 'GET',
          query: {
            category: parsed['category'],
            brand: parsed['brand'],
            size: parsed['size'],
            skip: parseInt(parsed['skip'])
          },
          withCredentials: true,

          url: '/store',
        }).then((res) => {
          this.setState({data: [res.data.names]})
          console.log(this.state.data)
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="small-container row filter-container">
        <div className="row product">
          {this.state.data.map((products) => {
            return products.slice(this.state.page, this.state.page + 4).map((product) => {
              // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
              return (
                <Link to={`/product/${product._id}`}>
                  <Product id={product._id} />
                  {/* <Product/> */}
                </Link>
              );
            });
          })}
        </div>
        <div className="row product">
          {this.state.data.map((products) => {
            return products.slice(this.state.page + 4, this.state.page + 8).map((product) => {
              // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
              return (
                <Link to={`/product/${product._id}`}>
                  <Product id={product._id} />
                  {/* <Product/> */}
                </Link>
              );
            });
          })}
        </div>
        <div className="row product">
          {this.state.data.map((products) => {
            return products.slice(this.state.page + 8, this.state.page + 12).map((product) => {
              // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
              return (
                <Link to={`/product/${product._id}`}>
                  <Product id={product._id} />
                  {/* <Product/> */}
                </Link>
              );
            });
          })}
        </div>
        <div className="row product">
          {this.state.data.map((products) => {
            return products.slice(this.state.page + 12, this.state.page + 16).map((product) => {
              // const image = <img alt="" src={require(`./assets/${n.image}`)}/>
              return (
                <Link to={`/product/${product._id}`}>
                  <Product id={product._id} />
                  {/* <Product/> */}
                </Link>
              );
            });
          })}
        </div>

        <div className="pagination-div">
          <form action="/store" method="get">
            <button name="skip" value={16}>
              Page 1
            </button>
            <button name="skip" value={32}>
              Page 2
            </button>
            <button name="skip" value={48}>
              Page 3
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Rows;
