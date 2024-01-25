import { useNavigate } from 'react-router-dom'
import './home.scss'
import { UserContext } from '../../providers/user.provider'
import React from 'react'

const Home = () => {
  const navigate = useNavigate()
  const user = React.useContext(UserContext);
  console.log(user.user?.role)
  return (
    <div >
      <div className='homeWrapper page-wrapper'>
        {(user.user?.role.roleName === 'Manager' || user.user?.role.roleName === 'Admin') &&
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