import { Link } from 'react-router-dom'
import './home.scss'
import { useContext } from 'react'
import { UserContext } from '../../providers/user.provider'

const Home = () => {
  const usercontext = useContext(UserContext)
  console.log('user context: ', usercontext.user)
  return (
    <div className='homeWrapper'>
      <Link to='/signup'>Add new car</Link>
    </div>
  )
}

export default Home