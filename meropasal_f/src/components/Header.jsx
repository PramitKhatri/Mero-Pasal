import logo from '../images/logo2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const user = localStorage.getItem('user')
  const navigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload()  //this reloads the page to show changes.
  }
  return (
    <nav>
      <div class="logo"><a href="/"><img src={logo} alt="logo" /></a></div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="#">Shop all</a></li>
        <li><a href="#">New arrivals</a></li>
        
        <li><a href={user?'/cart':'/login'}>Cart</a></li>
        <li><a href={user?'/myorders':'/login'}>MyOrders</a></li>
      </ul>

      <div className="nav-right">
        <form className='search'>
          <input type="search" placeholder='search' className='rounded' />
          <button><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} /></button>
        </form>
        {user ?
        <div>
        <a href='/profile' className='hover:bg-slate-400'><FontAwesomeIcon className='icon' icon={faUser} size='xl' />Profile</a>/
        <button className='hover:bg-slate-400' onClick={logout}>log-out</button>
        </div>
        :
        <div>
        <a href="/signup">Sign Up</a>/
        <a href="/login">Sign In</a>
        </div>
}

      </div>

    </nav>
  )
}

export default Header