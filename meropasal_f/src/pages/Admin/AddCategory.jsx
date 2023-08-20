import axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddCategory = () => {
    const [category, setCategory] = useState('')
    const [errors,setErrors]=useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        const userdata = JSON.parse(localStorage.getItem('user')) || {}
        
        if (!category) {
            setErrors('Category cannot be null')
        } else {
            axios.post('http://localhost:8000/Category/', { category: category }, { headers: { "Content-Type": "application/json", "Authorization": `Token ${userdata.token}` } })
                .then(res => {
                    console.log(res.data)
                    toast.success(res.data.msg)
                    setCategory('')
                    setErrors('')
                })
                .catch(err => {
                    if (err) {
                        setErrors(err.response.data.category);  //checked the response using console.log(err) and found the error was comign in category key
                    } else {
                        setErrors('An error occurred. Please try again.');
                    }
                })
            setCategory('')

        }
        return
    }
useEffect(()=>{
    setErrors('')  //erros will disappear if any change is made in category input
},[category])

    return (
        <>
            <ToastContainer theme='colored' position='top-right' />
        <p>{errors}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="category" >Category</label>
                <input type="text" id="category" onChange={e => setCategory(e.target.value)} value={category} /> <br />
                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default AddCategory