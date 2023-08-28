import logo from '../images/logo2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const user = localStorage.getItem('user')
  return (
    <nav>
      <div class="logo"><img src={logo} alt="" /></div>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Shop all</a></li>
        <li><a href="#">New arrivals</a></li>
        <li><a href="#">Cart</a></li>
      </ul>

      <div className="nav-right">
        <form className='search'>
          <input type="search" placeholder='search' className='rounded' />
          <button><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} /></button>
        </form>
        <FontAwesomeIcon className='icon' icon={faUser} size='xl' />

      </div>

    </nav>
  )
}

export default Header