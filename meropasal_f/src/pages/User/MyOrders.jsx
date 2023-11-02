import axios from "axios"
import { useEffect, useState } from "react"

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [product, setProduct] = useState([])
  const userdata = JSON.parse(localStorage.getItem('user'))
  console.log(userdata)
  console.log(orders)
  useEffect(() => {
    axios.get(`http://localhost:8000/order/${userdata.user.id}/`, {
      headers: {
        'Authorization': `Token ${userdata.token}`
      }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.log(err))

  }, [userdata.user.id, userdata.token])  //you should avoid using an object as a dependency because objects are reference types, and their reference changes every time the object is recreated, causing the useEffect to run repeatedly. To fix this issue, you should use a specific property from the userdata object as a dependency instead of the entire object. Assuming userdata.user.id 

  useEffect(() => {
    // Fetch product details for each order
    const getProductDetails = async () => {
      const productDetails = await Promise.all(
        orders.map(order => axios.get(`http://localhost:8000/api/productview/${order.product}/`))
      );

      setProduct(productDetails.map(response => response.data));
    };

    if (orders.length > 0) {
      getProductDetails();
    }
  }, [orders]);
  console.log(product)

  return (
    <>
      {orders.length === 0
        ?
        <div className="cart-empty">Your cart is empty. <a href="/" className="hover:text-red-500 underline">Shop Now</a></div>
        :
        <div>
          <div className="cart-container">
            <div className="cart-products">

              <div >
                {product.map((item, i) => (
                  <div className="cart-items" key={i}>
                    <img src={item.product_image} alt="" />
                    <p style={{ width: '30ch' }}>{item.product_name}</p>
                    {Array.isArray(orders)&& orders.length > 0 ? (
                      orders.map((order, i) => (
                        order.product===item.id && <p key={i}>Quantity: {order.quantity}</p>
                      ))
                    ) : (
                      <p>No orders available.</p>
                    )}
                    <p>${item.price}</p>
                    <button className='bg-amber-400 hover:bg-amber-600 cart-delete'  >Delete</button>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      }
    </>
  )
}

export default MyOrders