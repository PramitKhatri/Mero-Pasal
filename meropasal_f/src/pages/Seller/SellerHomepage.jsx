import axios from "axios"
import { useEffect, useState } from "react"

const SellerHomepage = () => {
  const [sellerdata, setSellerdata] = useState({})
  const [products, setProduct] = useState({})


  const seller = JSON.parse(localStorage.getItem('user')) || []

  useEffect(() => {
    const getsellerinfo = () => {
      axios.get(`http://localhost:8000/api/seller/${seller.user.id}/`)
        .then(res => setSellerdata(res.data))
        .catch(err => console.log(err))
    }
    getsellerinfo()


  }, [seller.user.id])

  // useEffect(() => {
  //   const getProduct = () => {
  //     const product = axios.get(`http://localhost:8000/api/sellerproduct/${seller.user.id}/`, {
  //       headers: {
  //         'Authorization': `Token ${seller.token}`
  //       }
  //     })
  //     setProduct(product)
  //   }
    
  //     getProduct()
    

  // }, [seller.user.id, products, seller.token])


  console.log(sellerdata)
  console.log(`products are: ${JSON.stringify(products)}`)

  return (
    <>
      <h1>seller email={seller.user.email}</h1>
    </>
  )
}

export default SellerHomepage