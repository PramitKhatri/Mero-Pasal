import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const [seller, setSeller] = useState({})
    const [quantity, setQuantity] = useState(1)
    const params = useParams()
    console.log(product)
    // console.log(seller)
    console.log(quantity)
    if (typeof product === 'object') {
        console.log('product is an object');
    }
    useEffect(() => {
        const productid = params.productid
        axios.get(`http://localhost:8000/api/productview/${productid}/`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))

        if (product.seller) {
            axios.get(`http://localhost:8000/api/seller/${product.seller}/`)
                .then(sellerdata => setSeller(sellerdata.data))
                .catch(err => console.log(err))
        }
    }, [params.productid, product.seller])

    const decreasequantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    const increasequantity = () => {
        setQuantity(quantity + 1)
    }

    const AddtoCart = () => {
        // fetching data from local storage of exists otherwise it will assign empty array
        const MyCart = JSON.parse(localStorage.getItem('MyCart')) || []

        //we already have an object => product which contains everything we need except quantity so ...
        product.quantity = quantity

        const existingItem = MyCart.find((item) => item.id === product.id)
        if (existingItem) {
            if (existingItem.quantity !== product.quantity) {
                existingItem.quantity = product.quantity
                toast.success(`${product.product_name} quantity updated to ${product.quantity}`)
            } else {
                toast.error('product is already in the cart')
            }
        }
        else {
            MyCart.push(product)
            toast.success(`${product.product_name} is added to cart`)
        }
        localStorage.setItem('MyCart', JSON.stringify(MyCart)) //this function is not inside else above because if the quantity changes , local storage needs to be refreshed and updated 

    }


    return (
        <>
            <ToastContainer theme='colored' position='top-center' />
            <div className='product-details'>
                <div className='product-image'><img src={product.product_image} alt="" /></div>
                <div className="product-desc">
                    <div style={{ padding: '1rem 3rem' }}>
                        <p className="product-name">{product.product_name}</p>
                        <div className="product-seller hover:text-red-600">
                            <img src={seller.seller_image} alt="img" />
                            <span>{seller.first_name}  {seller.last_name}</span>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <p className="product-price">$ {product.price}</p>
                            <p className='product-rating'>this is rating</p>
                        </div>
                        <p className='product-description'>{product.description}</p>
                        <p className='product-category'>category:<a style={{ textDecoration: 'underline' }} className='hover:text-red-700'>{product.category}</a></p>
                        <div className="product-quantity">
                            <button className='hover:bg-slate-400' onClick={decreasequantity}>-</button>
                            <input type="number" readOnly value={quantity} />
                            <button className='hover:bg-slate-400' onClick={increasequantity}>+</button>
                        </div>
                    </div>
                    <button className='product-addtocart' onClick={AddtoCart}>Add to Cart</button>
                    <button className='product-order'>Order Now</button>
                </div>
            </div>
        </>
    )
}

export default ProductDetails