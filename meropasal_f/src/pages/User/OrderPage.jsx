import { useState } from "react"

const OrderPage = (props) => {
    const userdata=JSON.parse(localStorage.getItem('user'))
    const [userid,setUserid]=useState()
    const [address,setAddress]=useState()
    const[paymentmethod,setPaymentMethod]=useState()

    const productid=props.data.product.id  //do this things inside async function and loop over every element in cart
    console.log(props)
    console.log(productid)
    console.log(userdata.user.id)

    //get the user id from the local storage
  return (
    <>
    <div className="order">
        <form>
            <label htmlFor="Address">Address</label>
            <input type="text" id="Address" onChange={(event)=>{setAddress(event.target.value)}} value={address} />
            
        </form>
    </div>

    </>
  )
}

export default OrderPage