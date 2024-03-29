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
import ManagerEnrollment from './Pages/manager-enrollment/manager-enrollment';
import ParkingSimulationComponent from './simulationPages/parking-simulaion/parking-simulation'
import sideImage from './assets/auto.png'
import NotFound from './Pages/not-found/not-found';
import AccessDenied from './Pages/access-denied/access-denied.page';
import { ViewSideManContext } from './providers/view-side-man.provider';
import WalletBalanceProvider from './providers/wallet-balance.provider';
import Notification from './components/core/notification/notification.component';
// import BraintreeDropIn from './Pages/payment/payment.page';
function App() {
  const viewSideManContext = React.useContext(ViewSideManContext)
  const [paymentMethodNonce, setPaymentMethodNonce] = React.useState(null);

  // const handlePaymentSuccess = (nonce: any) => {
  // Handle the payment success, e.g., send the nonce to your server for further processing
  // setPaymentMethodNonce(nonce);
  // };
  React.useEffect(() => {
    console.log('nonce: ', paymentMethodNonce)
  }, [paymentMethodNonce])
  return (
    // <div>
    //   <h1>React Braintree Integration</h1>
    //   {paymentMethodNonce ? (
    //     <div>
    //       <h2>Payment Successful!</h2>
    //       <p>Nonce: {paymentMethodNonce}</p>
    //     </div>
    //   ) : (
    //     <BraintreeDropIn onPaymentMethodNonce={handlePaymentSuccess} />
    //   )}
    // </div>
    <div className="App">
      <div className="background-image"
        style={viewSideManContext.viewSideMan ? {} : { display: 'none' }}
      >
        <img src={sideImage} alt="side-man" className="side-man-image" />
      </div>
      <BrowserRouter>
        <UserProvider>
          <WalletBalanceProvider>
            <Header />
            <Routes>
              <Route path='/' element={<Intro />} />
              <Route path='/signin' element={<Login />} />
              <Route path='/signup' element={<RoleGuard allowedRoles={['Manager', 'Admin']}><Register /></RoleGuard>} />
              <Route path='/home' element={<RoleGuard><Home /></RoleGuard>} />
              <Route path='/set-password/:role/:id/:token' element={<SetPassword />} />
              <Route path='/info' element={<Info />} />
              <Route path='/email/:role/:id/:token' element={<EmailSimulator />} />
              <Route path='/otp-message' element={<OTPMessage />} />
              <Route path='/otp' element={<OTPForm />} />
              <Route path='/parking-enrollment' element={<RoleGuard allowedRoles={["Manager", 'Admin']}><Parking /></RoleGuard>} />
              <Route path='/reflect-enrollment' element={<RoleGuard allowedRoles={['Admin']}><Reflect /></RoleGuard>} />
              <Route path='/manager-enrollment' element={<RoleGuard allowedRoles={['Admin']}><ManagerEnrollment /></RoleGuard>} />
              <Route path='/charge-wallet' element={<Charge />} />
              <Route path='/history' element={<RoleGuard allowedRoles={['User']}><HistoryTable /></RoleGuard>} />
              <Route path='/parking' element={<RoleGuard allowedRoles={['User']}><ParkingSimulationComponent /></RoleGuard>} />
              <Route path='/no-access' element={<AccessDenied />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </WalletBalanceProvider>
        </UserProvider>
      </BrowserRouter>
      <Notification />
    </div>
  );
}

export default App;
