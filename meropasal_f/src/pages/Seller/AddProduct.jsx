import axios from "axios"
import { useEffect, useState } from "react"

const AddProduct = () => {
    const [product_name, SetProductName] = useState('')
    const [seller, SetSeller] = useState('')
    const [category, SetCategory] = useState('')
    const [description, SetDescription] = useState('')
    const [price, SetPrice] = useState(0)
    const [stock, SetStock] = useState(0)
    const [product_image, SetProductImage] = useState(null)

    const sellerdata = JSON.parse(localStorage.getItem('user')) || {}

    useEffect(() => {
        axios.get('http://localhost:8000/Category', {
            headers: {
                'Authorization': `Bearer ${sellerdata.token.accesstoken}`
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    })

    return (
        <>
            <div>
                <form onSubmit={SubmitHandler}>
                    <div>
                        <label htmlFor="name">Product Name</label>
                        <input type="text" id="name" value={product_name} onChange={e => SetProductName(e.target.value)} />
                    </div>
                    <input type="hidden" onChange={e => SetSeller(e.target.value)} value={seller.id} />
                    <div>
                        <label htmlFor="category"></label>
                        <select id="category" value={category} onChange={e => SetCategory(e.target.value)}>
                            <option value="category.category">category.category</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description"></label>
                        <textarea id="description" cols="30" rows="10" value={description} onChange={e => SetDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label htmlFor="price"></label>
                        <input type="number" id="price" onChange={e => SetPrice(e.target.value)} value={price} />
                    </div>
                    <div>
                        <label htmlFor="stock"></label>
                        <input type="number" id="stock" value={stock} onChange={e => SetStock(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="image"></label>
                        <input type="file" id="image" onChange={e => SetProductImage(e.target.files[0])} />
                    </div>
                </form>
            </div>

        </>
    )
}

export default AddProduct