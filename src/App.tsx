import React from 'react';
import './App.scss';
import Intro from './Pages/Introduction/intro';
import Login from './Pages/Login/login';
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
import Header from './components/core/header/header';
import OTPForm from './Pages/OTP/OTP.page';
import OTPMessage from './Pages/otp-message/otp-message.page';
function App() {
  return (
    <div className="App">
      <div className="background-image">
        <UserProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/' element={<Intro />} />
              <Route path='/signin' element={<Login />} />
              <Route path='/signup' element={<RoleGuard allowedRoles={['Manager', 'Admin']}><Register /></RoleGuard>} />
              <Route path='/home' element={<RoleGuard><Home /></RoleGuard>} />
              <Route path='/set-password' element={<SetPassword />} />
              <Route path='/info' element={<Info />} />
              <Route path='/email' element={<EmailSimulator />} />
              <Route path='/otp-message' element={<OTPMessage />} />
              <Route path='/otp' element={<OTPForm />} />
              <Route path='/parking-enrollment' element={<RoleGuard allowedRoles={["Manager", "Admin"]}><Parking /></RoleGuard>} />
              <Route path='/reflect-enrollment' element={<RoleGuard allowedRoles={['Admin']}><Reflect /></RoleGuard>} />
              <Route path='/charge-wallet' element={<Charge />} />
              <Route path='/history' element={<RoleGuard><HistoryTable /></RoleGuard>} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </div>
    </div>
  );
}

export default App;
