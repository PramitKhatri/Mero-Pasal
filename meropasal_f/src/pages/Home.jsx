import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Home = () => {
  const [products, SetProduct] = useState([])
  const [category, setCategory] = useState([])
  // console.log(localStorage.getItem('user'))
  console.log(products)
  console.log(products.id)
  console.log(JSON.stringify(category))


  useEffect(() => {
    axios.get('http://localhost:8000/api/productview/')
      .then(res => SetProduct(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/getcategory/')
      .then(res=>setCategory(res?.data))
      .catch(err => console.log(err))
      .then(res => console.log('category are' + res))
      
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
        <Link to='/admin'>Admin page</Link>
        <br />
        <Link to='/seller'>Seller Homepage</Link>
        <br />
        <Link to='/unauthorized'>Unauthorized</Link>
        <br />
        <Link to='/lounge'>Lounge</Link>
      </h1>
      <div className='home'>
        <div className='category_filter'>
          {category.map((item,index)=>(
            <a href={`product/${item.category}`} key={index}>{item.category}</a>
          ))}
        </div>
        <div className='filtered_product'>
          {products.map((product, index) => (
            <Card item={product} key={index} />
          ))}
        </div>

      </div>


    </>
  )
}

export default Home