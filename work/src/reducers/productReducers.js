import React from "react";

export const productReducers = async (state, action) => {
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

  if(type === "FETCH_UNAUTH_CART"){
      var cartArray = [];
      var data
      if (payload === null || payload.length === 0) {
        const response = await fetch(`/product?id=${payload}`);
        const json = await response.json();
                console.log("cart if statement");

         data = [json]
      } else {
        for (var i = 0; payload.length > i; i++) {
          const response = await fetch(`/product?id=${payload[i]}`);
          const json = await response.json();
                  console.log("cart for loop");

          console.log(json);
          cartArray.push(json.name);
        }
        console.log(cartArray);
        data = [cartArray];
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
          ...state,
        data,
        price: sum1
      }
  }
};
