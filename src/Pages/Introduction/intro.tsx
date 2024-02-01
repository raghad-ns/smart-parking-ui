import React from "react";
import "./intro.scss";
import { useNavigate } from "react-router-dom";
const Intro = () => {
  const navigate = useNavigate()

  return (
    <div className="content">
      <div className="text-container">
        <h1>Parking System</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </p>
      </div>
      <div className="button2" onClick={() => navigate('/home')}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Get Started
      </div>
    </div>

  );
};

export default Intro;
