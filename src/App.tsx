import React from 'react';
import './App.scss';
import Intro from './Pages/Introduction/intro';
import Login from './Pages/Login/login';
import logo from "./ps-logo.png";
import Register from './Pages/Registration/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/home/home.page';

function App() {
  return (
    <div className="App">
      <div className="background-image">
        <img className="logo" src={logo} alt="Logo" />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Intro />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
