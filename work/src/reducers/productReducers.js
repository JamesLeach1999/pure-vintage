import React from "react";

const productReducers = (state, action) => {
  

  if (action.type === "FETCH_LOGIN_CART") {
    console.log(action.payload);

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
    console.log(p);

    var sum = p.reduce(function (a, b) {
      return a + b;
    }, 0);

    return {
      data: [notNull],
      price: sum,
    };
  }

  if (action.type === "FETCH_UNAUTH_CART") {
    var cartArray = [];
    var data;

    console.log(action.payload)
    if (action.payload === null || action.payload.length === 0) {
      fetch(`/product?id=${action.payload}`)
        .then((response) => 
           response.json()
        )
        .then((resJson0) =>
          data = [resJson0]
        )
        .catch((error) => {
          console.log("promise chain error0");
          console.log(error);
        });
      // const json = await response.json();
      console.log("cart if statement");
    } else {
      for (var i = 0; action.payload.length > i; i++) {
        fetch(`/product?id=${action.payload[i]}`)
          .then((response) => response.json())
          .then((resJson) => cartArray.push(resJson.name))
          .catch((error) => {
            console.log("promise chain error");
            console.log(error);
          });
      }
      data = cartArray;
    }
    console.log("cart data");

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
    console.log("dispatch unauth")
    console.log(data);
    console.log(sum1);

    return {
      data: data,
      price: sum1,
    };
  }

  throw new Error("no matching action")
};

export default productReducers