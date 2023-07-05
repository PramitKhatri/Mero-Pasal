import React from 'react'
import Card from '../components/Card'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <>
    <Card/>

    <h1 className="text-3xl font-bold underline">
      Hello world!
      <br/>
      <Link to="/signup">signup</Link>
      <br />
      <Link to='/login'>Login</Link>
    </h1>
  

    </>
  )
}

export default Home