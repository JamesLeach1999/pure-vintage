import { useState, useEffect } from "react";

import Layout from "../components/Layout";
import Nav from "../components/Nav";
import CheckoutForm from "../components/CheckoutForm";
import axios from "axios";
// import OrderSum from "../components/OrderSum"
// import getDonutPrice from "../stripe_functionality/utils/get-donut-price";

const MainPage = (props) => {
  const [sum, SetSum] = useState();

  useEffect(() => {
    const work = async () => {
      if (sessionStorage.getItem("user")) {
        const url = `/cart1?id=${sessionStorage.getItem("user")}`;
        try {

          const response = await fetch(url);
          const json = await response.json();

          var total = [];
          json.cart.map((pr) => {
            if (pr !== null) {
              return total.push(pr.price);
            }
          });
          var sum = total.reduce((a, b) => a + b, 0);

          SetSum(sum);
        } catch (error) {
          console.log(error);
        }
      } else {
        var items = JSON.parse(localStorage.getItem("unAuthCart"));
        var cartTotal = [];
        if (items.length === 1) {
          var res = await fetch(`/product?id=${items}`);
          var resJson = await res.json();


          cartTotal.push(resJson.name.price);
          SetSum(cartTotal);
        } else {
          items.map(async (item) => {
            var res = await fetch(`/product?id=${item}`);
            var resJson = await res.json();

            cartTotal.push(resJson.name.price);
          });
          var cartSum = cartTotal.reduce((a, b) => a + b, 0);

          SetSum(cartSum);
        }
      }
    };

    work();
  }, []);

  return (
    <Layout title="Donut Shop" className="store-container">
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>£{sum} total</h1>
      <CheckoutForm
        price={sum}
        onSuccessfulCheckout={async () => {
          localStorage.removeItem("unAuthCart");
          localStorage.removeItem("unAuthCartPrice");

          window.location.replace("https://cryptic-temple-54361.herokuapp.com");
        }}
      />
    </Layout>
  );
};

export default MainPage;
