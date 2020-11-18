import Head from 'next/head';
import styled from '@emotion/styled';
import GlobalStyles from './prebuilt/GlobalStyles';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// load the stripe functionality. dont call loadStripe in the render method of a conponent, only load once per page

// inject into rest of react components

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const Layout = ({ children, title }) => {
  return (
    <>
      <GlobalStyles />
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Elements stripe={stripePromise}>{children}</Elements>
    </>
  );
};

export default Layout;
