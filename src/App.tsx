import React from 'react';
import './App.scss';
import Intro from './Pages/Introduction/intro';
import Login from './Pages/Login/login';
import logo from "./ps-logo.png";
import Register from './Pages/Registration/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/home/home.page';
import Info from './Pages/info/info.page';
import SetPassword from './Pages/setPassword/setPassword';
import UserProvider from './providers/user.provider';
import EmailSimulator from './Pages/email-simulator/email-simulator.page';
// import { Info } from 'Pages/info/info.page';

function App() {
  return (
    <div className="App">
      <div className="background-image">
        <img className="logo" src={logo} alt="Logo" />
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Intro />} />
              <Route path='/signin' element={<Login />} />
              <Route path='/signup' element={<Register />} />
              <Route path='/home' element={<Home />} />
              <Route path='/set-password' element={<SetPassword />} />
              <Route path='/info' element={<Info />} />
              <Route path='/email' element={<EmailSimulator />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </div>
    </div>
  );
}

export default App;
