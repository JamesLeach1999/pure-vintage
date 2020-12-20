import { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

import Row from "./prebuilt/Row";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
import SubmitButton from "./prebuilt/SubmitButton";
import CheckoutError from "./prebuilt/CheckoutError";

import {
  CardElement,
  CartElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CardCvcElement } from "@stripe/react-stripe-js";
import { session } from "passport";

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  color: #000000;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  // so we load stripe, then we inject to checkout using elements, then use stripe is how to get back the stripe object
  const stripe = useStripe();
  // custom hook from stripe
  const elements = useElements();
  console.log();

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        postal_code: ev.target.zip.value,
      },
    };

    var cart = JSON.parse(localStorage.getItem("unAuthCart")) || "";

    // disabe button whilst requesting
    setProcessingTo(true);

    // we get price from the input props

    // create payment intent on server
    // returns client_secret of payment intent

    var id = sessionStorage.getItem("user") || billingDetails.email;

    const { data: clientSecret } = await axios.post("/payment_intents", {
      amount: price * 100,
      id: id,
      address: billingDetails.address.line1,
      city: billingDetails.address.city,
      postcode: billingDetails.address.postal_code,
      cart: cart
    });

    const cardElement = elements.getElement(CardElement);

    // billing associates the details we collect to the payment we're making
    // use payment method id to conirm payment
    // need reference to the cardElement we defined earlier
    // need stripe.js object
    // create payment method
    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails,
    });

    // confirm card payment
    // payment method id
    // client secret
    // get the payment intent back from this
    console.log(paymentMethodReq)
    const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });
    await axios.post("/te", {
      test: confirmedCardPayment,
      id: id,
      cart: cart,
    });
    // redirect on checkout if no errors
    onSuccessfulCheckout("/store");
  };
  // to display errors, use a try catch and in the catch, set the checkoutError state object

  // again, just styling. full docs at stripe
  const cardElementOptions = {
    // way to inject styles into i frame. 3 different styles in different cases
    style: {
      base: {
        fontSize: "16px",
        color: "#000000",
        "::placeholder": {
          color: "#87bbfd",
        },
      },
      invalid: {
        color: "#FFC7EE",
        iconColor: "#FFC7EE",
      },
      complete: {},
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleFormSubmit}>
      
      <Row>
        <BillingDetailsFields />
      </Row>
      <Row>
        <h4>Card number CVV/expiry</h4>
        <CardElementContainer>
          {/* options jusv for styling */}
          <CardElement options={cardElementOptions} />
        </CardElementContainer>
      </Row>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      <Row>
        <SubmitButton disabled={isProcessing} style={{backgroundColor: "white", color: "black", borderTop: "none"}}>
          {isProcessing ? "Processing..." : `Pay £${price}`}
        </SubmitButton>
      </Row>
    </form>
  );
};

export default CheckoutForm;
