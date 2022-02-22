import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutPage from "./CheckoutPage";

interface CheckoutWrapperProps {}

const stripePromise = loadStripe(
  "pk_test_51KVc8NID6EEjTaXJsyXnkeaP7IVtymZhoO8E9g1Nh5SGXgZnOx85JpYl0DTojsafQSKfqClRRRFFyygLQgZhs2Of00MZe1cDnu"
);
const CheckoutWrapper: React.FC<CheckoutWrapperProps> = () => (
  <Elements stripe={stripePromise}>
    <CheckoutPage />
  </Elements>
);

export default CheckoutWrapper;
