import React from "react";
import "./intro.scss";
import { useNavigate } from "react-router-dom";
const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="content">
      <div className="text-container">
        <h1>Parking System</h1>
        <span>
          Are you tired of the parking hassle? Say goodbye to traditional
          parking problems with smart parking system the smart solution for
          modern drivers.
        </span>
        <p>
          🚗 <span className="title">Park with Confidence:</span> Tired of circling the block? SmartPark
          helps you find and reserve parking spaces effortlessly. Say goodbye to
          stress and hello to convenience. 
          <br/>
          <br/>
          💳 <span className="title">Secure Payment:</span>
          No more digging for change or worrying about overpayment. Our secure payment
          system ensures you only pay for the time you use.
          <br/>
          <br/>
          🕐 <span className="title">Flexibility at Your Fingertips</span>: With SmartPark, you have control. Park for as long
          as you need, and our system will automatically handle the payment when
          you're done.
          <br/>
          <br/>
          🔐 <span className="title">Your Security Matters</span>: Rest easy knowing that your data and transactions are
          protected by state-of-the-art security measures. SmartPark prioritizes
          your privacy .
        </p>
      </div>
      <div className="button2" onClick={() => navigate("/home")}>
        <span></span>
        Get Started
      </div>
    </div>
  );
};

export default Intro;
