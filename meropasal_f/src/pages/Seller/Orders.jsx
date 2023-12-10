import axios from "axios"
import { useEffect, useState } from "react"

const Orders = () => {
    const [orders, setOrders] = useState([])

    const userdata = JSON.parse(localStorage.getItem('user')) || {}

    useEffect(() => {
        axios.get(`http://localhost:8000/getordersforseller/${userdata.user.id}/`, {
            'headers': {
                'Authorization': `token ${userdata.token}`
            }
        })
            .then(res => setOrders(res.data))
            .catch(err => console.log(err))
    }, [])
    console.log("orders are: " + JSON.stringify(orders))

    const payment_status=(payment_status)=>{ //simple function to check if it is paid or not
        if(payment_status==true){
            return "paid"
        }else{
            return "Not paid"
        }
    }

    return (
        <>
            <div>
                <table>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Address</th>
                        <th>Payment Status</th>
                        <th>Delivery Status</th>
                    </tr>
                
                {orders.map((item,index)=>(
                    <tr key={index}>
                        <td><img src={item.product.product_image} alt={item.product.product_name} /></td>
                        <td>{item.product.product_name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.order.address},{item.order.city}</td>
                        <td>{payment_status(item.order.payment_status)}</td>
                        <td>{item.order.order_status}</td>
                    </tr>
                ))}
                </table>
            </div>

        </>
    )
}

export default Orders