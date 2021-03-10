import React from "react";

export const productReducers =  (state, action) => {
  var { type, payload } = action;

  if (type === "FETCH_LOGIN_CART") {
    console.log(payload);

    var notNull = [];
    payload.cart.map((pro) => {
      if (pro !== null) {
        notNull.push(pro);
      }
    });
    console.log(notNull);

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
      ...state,
      data: [notNull],
      price: sum,
    };
  }

  if (type === "FETCH_UNAUTH_CART") {
    var cartArray = [];
    var data;
    console.log(payload);
    if (payload === null || payload.length === 0) {
      for (var j = 0; payload.length > j; j++) {
        fetch(`/product?id=${payload[j]}`)
          .then((response) => {
            return response.json();
          })
          .then((resJson0) => {
            // var cart0 = [resJson0];
            cartArray.push(resJson0.name);
          }).catch((error) => {
              console.log("promise chain error0")
              console.log(error)
          })
        // const json = await response.json();
        console.log("cart if statement");
      }
      data = cartArray;
    } else {
      for (var i = 0; payload.length > i; i++) {
        fetch(`/product?id=${payload[i]}`)
          .then((response) => {
            return response.json();
          })
          .then((resJson) => {
            console.log("cart for loop");

            console.log(resJson);
            cartArray.push(resJson.name);
          })
          .catch((error) => {
            console.log("promise chain error");
            console.log(error);
          });
      }
      console.log(cartArray);
      data = cartArray;
    }
    console.log("cart data");

    console.log(data);
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

    return {
      data: data,
      price: sum1,
    };
  }
};
