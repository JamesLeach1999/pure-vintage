import React from "react";

const productReducers = (state, action) => {
  if (action.type === "FETCH_LOGIN_CART") {

    var notNull = [];
    action.payload.cart.map((pro) => {
      if (pro !== null) {
        notNull.push(pro);
      }
    });

    var cartData = [notNull];
    var p = [];
    cartData.map((products) => {
      return products.map((product) => {
        p.push(product.price);
      });
    });

    var sum = p.reduce(function (a, b) {
      return a + b;
    }, 0);
    console.log(notNull)
    return {
      data: notNull,
      price: sum,
    };
  }

  if (action.type === "FETCH_UNAUTH_CART") {
    var cartArray = [];
    var data;

    if (action.payload === null || action.payload.length === 0) {
      fetch(`/products?id=${action.payload}`)
        .then((response) => response.json())
        .then((resJson0) => (data = [resJson0]))
        .catch((error) => {
          console.log("promise chain error0");
          console.log(error);
        });
      // const json = await response.json();
      console.log("cart if statement");
    } else {
      for (var i = 0; action.payload.length > i; i++) {
        fetch(`/products?id=${action.payload[i]}`)
          .then((response) => response.json())
          .then((resJson) => cartArray.push(resJson.name))
          .catch((error) => {
            console.log("promise chain error");
            console.log(error);
          });
      }
      data = cartArray;
    }

    var pr = [];
    data.map((products) => {
      return products.map((product) => {
        pr.push(product.price);
      });
    });
    // console.log(pr);
    var sum1 = pr.reduce(function (a, b) {
      return a + b;
    }, 0);

    localStorage.setItem("payloadPrice", sum1);
    

    state.data = data;
    state.price = sum1;
    return state;
  }

  throw new Error("no matching action");
};

export default productReducers;
