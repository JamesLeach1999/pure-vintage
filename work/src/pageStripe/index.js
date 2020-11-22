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
      try {
        // const test = await fetch("http://localhost:9000/store");
        // console.log(test);

        const response = await fetch(`/cart`);
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
    };

    work();
  }, []);

  return (
    <Layout title="Donut Shop">
      <h1>{sum}</h1>
      <CheckoutForm
        price={sum}
        onSuccessfulCheckout={async () => {
          window.location.replace('/me');
        }}
      />
    </Layout>
  );
};

export default MainPage;
