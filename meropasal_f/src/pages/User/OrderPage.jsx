import axios from "axios"
import { useEffect, useState } from "react"

const OrderPage = (props) => {
  const userdata = JSON.parse(localStorage.getItem('user'))
  const [userid, setUserid] = useState()
  const [address, setAddress] = useState('')
  const [paymentmethod, setPaymentMethod] = useState('')
  const [selectedMethod, setSelectedMethod] = useState('')

  const productid = props.data.product.id  //do this things inside async function and loop over every element in cart
  console.log(props)
  console.log(productid)
  console.log(userdata.user.id)

  useEffect(() => {
    if (!paymentmethod) {
      axios.get('http://localhost:8000/api/viewpaymentmethod/')
        .then(res => {
          const PaymentMethodArray = (Object.values(res?.data))// Convert response object to array
          setPaymentMethod(PaymentMethodArray)
        })
        .catch(err => console.log(err))
    }

    //get the user id from the local storage
    const userdata = JSON.parse(localStorage.getItem('user')) || {}
    setUserid(userdata?.user?.id)
    console.log(`user  is ${userdata?.user?.id}`)
  }, [paymentmethod, userid])

  console.log(`length of product=${props.data.product.length}`)
  const OrderHandler = async (e) => {
    e.preventDefault()

    try {

      if (Array.isArray(props.data.product)) {  //check if the product is an  array (from the cart page we will send an array of multiple product objects)
        const orderdata = props.data.product.map(product => ({
          product: product.id,
          user: userid,
          seller: product.seller,
          quantity: product.quantity,
          address: address,
          paymentmethod: selectedMethod,
        }))

        console.log(`order data= ${orderdata}`)
        console.log(JSON.stringify(orderdata, null, 2));

        await axios.post(`http://localhost:8000/order/${userid}/`, { orders: orderdata }, { headers: { 'Content-Type': "application/json", "Authorization": `Token ${userdata.token}` } })
        localStorage.removeItem('MyCart')
        window.location.reload()


      } else if (props.data.product) {
        // If props.data.product is an object (from the product page)
        const orderData = {
          product: props.data.product.id,
          user: userid,
          seller: props.data.product.seller,
          quantity: props.data.product.quantity,
          address: address,
          paymentmethod: selectedMethod,
        }
        console.log(`order data= ${orderData}`)
        console.log(JSON.stringify(orderData, null, 2));

        await axios.post(`http://localhost:8000/order/${userid}/`, { orders: [orderData] }, { headers: { 'Content-Type': "application/json", "Authorization": `Token ${userdata.token}` } });

        window.location.reload()


      } else {
        // Handle the case where props.data.product is not defined
        console.error('No product data to place an order.');
      }
    }
    catch (err) {
      console.log(err)
    }

  }


  return (
    <>
      <div>
        <form className="order-form" onSubmit={OrderHandler}>
          <div className="order-input">
            <label htmlFor="Address">Address</label>
            <input type="text" id="Address" onChange={(event) => { setAddress(event.target.value) }} value={address} required />
          </div>
          <div>
            <label htmlFor="paymentmethod">Payment Method:</label>

            {paymentmethod.length > 0 ? (
              <select id="paymentmethod" onChange={(event) => setSelectedMethod(event.target.value)} value={selectedMethod} required>
                <option value="">Select an option</option>
                {
                  paymentmethod.map((paymentobj, index) => (
                    <option key={index} value={paymentobj.id}>{paymentobj.paymentmethod}</option>
                  ))
                }

              </select>
            ) : (
              <span>loading payment methods...</span>
            )
            }
          </div>

          <button>Order Now</button>

        </form>
      </div>

    </>
  )
}

export default OrderPage