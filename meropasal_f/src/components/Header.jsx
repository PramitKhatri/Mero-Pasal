import logo from '../images/logo2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Header = () => {
  const user = localStorage.getItem('user')
  const logout=()=>{
    localStorage.removeItem('user')
    window.location.reload()  //this reloads the page to show changes.
  }
  return (
    <nav>
      <div class="logo"><a href="/"><img src={logo} alt="logo" /></a></div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="#">Shop all</a></li>
        <li><a href="#">New arrivals</a></li>
        <li><a href="/cart">Cart</a></li>
      </ul>

      <div className="nav-right">
        <form className='search'>
          <input type="search" placeholder='search' className='rounded' />
          <button><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} /></button>
        </form>
        {user ?
        <div>
        <FontAwesomeIcon className='icon' icon={faUser} size='xl' />/
        <button onClick={logout}>log-out</button>
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