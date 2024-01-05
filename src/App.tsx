import React from 'react';
import './App.scss';
import Intro from './Pages/Introduction/intro';
import Login from './Pages/Login/login';
import logo from "./ps-logo.png";
import Register from './Pages/Registration/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/home/home.page';
import Info from './Pages/info/info.page';
import Reflect from './Pages/Reflect/reflect';
import Charge from './Pages/Charge-Recharge/charge-recharge';
import Parking from './Pages/parking/parking';
import HistoryTable from './Pages/History-table/History-table';
import SetPassword from './Pages/setPassword/setPassword';
import UserProvider from './providers/user.provider';
import EmailSimulator from './Pages/email-simulator/email-simulator.page';
import RoleGuard from './components/core/role-guard/role-guard.component';
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
              <Route path='/signup' element={<RoleGuard allowedRoles={['Manager', 'Admin']}><Register /></RoleGuard>} />
              <Route path='/home' element={<RoleGuard><Home /></RoleGuard>} />
              <Route path='/set-password' element={<SetPassword />} />
              <Route path='/info' element={<Info />} />
              <Route path='/email' element={<EmailSimulator />} />
              <Route path='/parking-enrollment' element={<Parking />} />
              <Route path='/reflect-enrollment' element={<Reflect />} />
              <Route path='/charge-wallet' element={<Charge />} />
              <Route path='/history' element={<HistoryTable />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </div>
    </div>
  );
}

export default App;
