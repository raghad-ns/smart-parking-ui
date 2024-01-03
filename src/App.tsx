import React from 'react';
import './App.scss';
import Intro from './Pages/Introduction/intro';
import Login from './Pages/Login/login';
import logo from "./ps-logo.png";
import Register from './Pages/Registration/register';
import Reflect from './Pages/Reflect/reflect';
import Charge from './Pages/Charge-Recharge/charge-recharge';
import Parking from './Pages/parking/parking';
import HistoryTable from './Pages/History-table/History-table';
function App() {
  return (
    <div className="App">
      <div className="background-image">
      <img className="logo" src={logo} alt="Logo" />
      {/* <Intro/> */}
      {/* <Login/> */}
      {/* <Register/> */}
      <Parking/>
      {/* <Reflect/> */}
      {/* <Charge/> */}
      {/* <HistoryTable/> */}

      </div>
      </div>
  );
}

export default App;
