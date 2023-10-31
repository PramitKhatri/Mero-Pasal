import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Home = () => {
  const [products, SetProduct] = useState([])
  // console.log(localStorage.getItem('user'))
  console.log(products)
  console.log(products.id)

  useEffect(() => {
    axios.get('http://localhost:8000/api/productview/')
      .then(res => SetProduct(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <>



      <h1 className="text-3xl font-bold underline">
        Welcome!!
        <br />
        <Link to="/signup">signup</Link>
        <br />
        <Link to='/login'>Login</Link>
        <br />
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
      <div>
        {products.map((product, index) => (
          <Card item={product} key={index} />
        ))}
      </div>


    </>
  )
}

export default Home