import React from 'react'
import Card from '../components/Card'
import { Link } from 'react-router-dom'


const Home = () => {
  console.log(localStorage.getItem('user'))
  return (
    <>
    <Card/>

    <h1 className="text-3xl font-bold underline">
      Welcome!! 
      <br/>
      <Link to="/signup">signup</Link>
      <br />
      <Link to='/login'>Login</Link>
      <br/>
      <Link to='/sellerregister'>Seller register</Link>
      <br />
      <Link to='/sellerlogin'>Seller login</Link>
      <br />
      <Link to='/admin'>Admin page</Link>
      <br />
      <Link to='/seller'>Seller Homepage</Link>
      <br />
      <Link to='/unauthorized'>Unauthorized</Link>
      <br />
      <Link to='/lounge'>Lounge</Link>
    </h1>
  

    </>
  )
}

export default Home