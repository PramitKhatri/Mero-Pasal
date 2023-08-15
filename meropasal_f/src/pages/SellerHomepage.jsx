import axios from "axios"
import { useEffect, useState } from "react"

const SellerHomepage = () => {
  const [sellerdata,setSellerdata]=useState({})
  const seller = JSON.parse(localStorage.getItem('user')) || []

  useEffect(() => {
    const getsellerinfo = () => {
      axios.get(`http://localhost:8000/api/seller/${seller.user.id}/`)
        .then(res => setSellerdata(res.data))
        .catch(err => console.log(err))
    }
    getsellerinfo()
    
    
  },[])
  console.log(sellerdata)
  return (
    <>
      <h1>seller email={seller.user.email}</h1>
      <img src={sellerdata.seller_image} alt="nope" height='100px'/>
    </>
  )
}

export default SellerHomepage