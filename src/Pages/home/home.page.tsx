import { Link } from 'react-router-dom'
import './home.scss'

const Home = () => {
  return (
    <div className='homeWrapper'>
      <Link to='/signup'>Add new car</Link>
    </div>
  )
}

export default Home