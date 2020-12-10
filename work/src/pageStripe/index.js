import { useState, useEffect } from 'react';

import Layout from '../components/Layout';
import Nav from '../components/Nav';
import CheckoutForm from '../components/CheckoutForm';
import axios from 'axios';
// import OrderSum from "../components/OrderSum"
// import getDonutPrice from "../stripe_functionality/utils/get-donut-price";

const MainPage = (props) => {
  const [sum, SetSum] = useState();

  useEffect(() => {
    const work = async () => {
      if(sessionStorage.getItem("user")){
        const url = `/cart1?id=${sessionStorage.getItem("user")}`;
        try {
          // const test = await fetch("http://localhost:9000/store");
          // console.log(test);
  
          const response = await fetch(url);
          const json = await response.json();
          console.log(json);
  
          var total = [];
          json.cart.map((pr) => {
            if (pr !== null) {
              console.log(pr.price);
              return total.push(pr.price);
            }
          });
          var sum = total.reduce((a, b) => a + b, 0);
          console.log(sum);
  
          SetSum(sum);
        } catch (error) {
          console.log(error);
        }
      } else {
        var items = JSON.parse(localStorage.getItem("unAuthCart"))
        var cartTotal = []
        items.map( async (item) => {
          var res = await fetch(`/product?id=${item}`)
          var resJson = await res.json()

          cartTotal.push(resJson.name.price)
        })

        var cartSum = cartTotal.reduce((a, b) => a + b, 0);
        console.log(cartSum);

        SetSum(cartSum)


      }
    };

    work();
  }, []);

  return (
    <Layout title="Donut Shop" className="store-container">
      <h1>£{sum} total</h1>
      <CheckoutForm
        price={sum}
        onSuccessfulCheckout={async () => {
          localStorage.clear()
          window.location.replace(
            "https://cryptic-temple-54361.herokuapp.com"
          );
        }}
      />
    </Layout>
  );
};

export default MainPage;
