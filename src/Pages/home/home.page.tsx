import { useNavigate } from 'react-router-dom'
import './home.scss'
import { UserContext } from '../../providers/user.provider'
import React from 'react'
import { ViewSideManContext } from '../../providers/view-side-man.provider'
import { WalletBalanceContext } from '../../providers/wallet-balance.provider'

const Home = () => {
  const navigate = useNavigate()
  const user = React.useContext(UserContext);
  console.log(user.user?.role)
  const viewSideManContext = React.useContext(ViewSideManContext)
  const walletBalanceContext = React.useContext(WalletBalanceContext)
  React.useEffect(() => {
    viewSideManContext.setViewSideMan && viewSideManContext.setViewSideMan(true)
    user.user?.role.roleName !== "Manager"
      && walletBalanceContext.updateWalletBalance
      && walletBalanceContext.updateWalletBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div >
      <div className='homeWrapper page-wrapper'>
        {(user.user?.role.roleName === 'Admin') &&
          <div className="user-buttons-wrapper form-wrapper" >
            <h1>Wellcome Admin</h1>
            <div className="button2" onClick={() => navigate('/manager-enrollment')}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Enroll new manager
            </div>
            <div className="button2" onClick={() => navigate('/reflect-enrollment')}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Add new reflect account
            </div>
            <div className="button2" onClick={() => navigate('/signup')}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Enroll new car
            </div>
            <div className="button2" onClick={() => navigate('/parking-enrollment')}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Enroll new parking
            </div>
          </div>
        }
        {(user.user?.role.roleName === 'Manager') &&
          <div className="user-buttons-wrapper form-wrapper" >
            <h1>Wellcome manager</h1>
            <div className="button2" onClick={() => navigate('/signup')}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Enroll new car
            </div>
            <div className="button2" onClick={() => navigate('/parking-enrollment')}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Enroll new parking
            </div>
          </div>
        }
        {(user.user?.role.roleName === 'User') &&
          <div className="user-buttons-wrapper form-wrapper">
            <h1>Wellcome Car owner</h1>
            <div className="button2" onClick={() => navigate('/parking')}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Use parking
            </div>
            <div className="button2" onClick={() => navigate('/charge-wallet')}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Charge car's wallet
            </div>
            <div className="button2" onClick={() => navigate('/history')}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              View car's parking history
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Home