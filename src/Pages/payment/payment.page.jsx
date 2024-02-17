// BraintreeDropIn.js
import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";

const BraintreeDropIn = ({ onPaymentMethodNonce }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    // console.log("token: ", token);
  }, [token]);

  useEffect(() => {
    // Fetch a client token from your server
    // Make a server-side request to generate a client token
    // using your server-side language of choice (Node.js, Python, PHP, etc.)
    // The client token is used to authenticate requests from the client to Braintree
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/braintree/token`)
      .then((response) => response.json())
      .then((data) => setToken(data.clientToken))
      .catch((error) => console.error("Error fetching client token:", error));
  }, []);

  const handlePaymentMethodNonce = (payload) => {
    // Send the payment method nonce to your server
    // Handle the payment on your server-side logic
    console.log("payload nonce: ", payload.nonce);
    onPaymentMethodNonce(payload.nonce);
  };

  return (
    <>
      {token && (
        <DropIn
          onError={(error) => console.error("Error:", error)}
          options={{ authorization: token, paypal: { flow: "vault" } }}
          onInstance={(instance) => (window.dropinInstance = instance)}
          onPaymentMethodNonce={handlePaymentMethodNonce}
        />
      )}
    </>
  );
};

export default BraintreeDropIn;
