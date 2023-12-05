import React from 'react';
import './App.scss';
import Intro from './Pages/Introduction/intro';
import Login from './Pages/Login/login';
import logo from "./ps-logo.png";
import Register from './Pages/Registration/register';
import SetPassword from './Pages/setPassword/setPassword';

function App() {
  return (
    <div className="App">
      <div className="background-image">
      <img className="logo" src={logo} alt="Logo" />
      <Intro/>
      {/* <Login/> */}
      {/* <Register/> */}
      {/* <SetPassword/> */}

      
      </div>
      </div>
  );
}

export default App;
