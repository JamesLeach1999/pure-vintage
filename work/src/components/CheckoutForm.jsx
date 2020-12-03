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

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  color: #d3d3d3;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  var [styles, setStyles] = useState({});

  if (window.innerWidth > 1000) {
    setStyles({
      width: "350px",
      margin: "30px auto",
      boxShadow:
        "0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #000000",
      borderRadius: "4px",
      border: "red",
      backgrounColor: "#ffffff",
      position: "relative",
    });
  }

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
    // disabe button whilst requesting
    setProcessingTo(true);

    // we get price from the input props

    // create payment intent on server
    // returns client_secret of payment intent

    const { data: clientSecret } = await axios.post("/payment_intents", {
      amount: price * 100,
      id: localStorage.getItem("user"),
      address: billingDetails.address.line1,
      city: billingDetails.address.city,
      postcode: billingDetails.address.postal_code,
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
    const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });
    await axios.post("/te", {
      test: confirmedCardPayment,
      id: localStorage.getItem("user"),
    });
    // redirect on checkout if no errors
    onSuccessfulCheckout("/pastOrders");
  };
  // to display errors, use a try catch and in the catch, set the checkoutError state object

  // again, just styling. full docs at stripe
  const cardElementOptions = {
    // way to inject styles into i frame. 3 different styles in different cases
    style: {
      base: {
        fontSize: "16px",
        color: "#fff",
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
    <form onSubmit={handleFormSubmit} style={styles}>
      <Row>
        <BillingDetailsFields />
      </Row>
      <Row>
        <CardElementContainer>
          {/* options jusv for styling */}
          <CardElement options={cardElementOptions} />
        </CardElementContainer>
      </Row>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      <Row>
        <SubmitButton disabled={isProcessing}>
          {isProcessing ? "Processing..." : `Pay £${price}`}
        </SubmitButton>
      </Row>
    </form>
  );
};

export default CheckoutForm;
