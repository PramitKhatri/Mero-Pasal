import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {
    // const history=useHistory()
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [username, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signupsubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:8000/signup/`, { first_name, last_name, username, email, password })
            toast.success('Registration Successful')
            setFirstname('')
            setLastname('')
            setName('')
            setEmail('')
            setPassword('')
            // history.push('/')
        }
        catch (err) {
            toast.error(err.response.data.error)
        }
    }


    return (
        <>
            <ToastContainer theme='colored' position='top-center' />
            <div className="container">
                <div className="flex flex-wrap justify-center">
                    <div className="w1/2">
                        <form action="" className='p-5 shadow-xl'>
                            <div className="mb-2">
                                <label htmlFor="fname">firstName</label>
                                <input type="text" name="firstname" id="fname" className='form-input' onChange={(event) => setFirstname(event.target.value)} value={first_name} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="lname">lastName</label>
                                <input type="text" name="lastname" id="lname" className='form-input' onChange={(event) => setLastname(event.target.value)} value={last_name}/>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="uname">UserName</label>
                                <input type="text" name="username" id="uname" className='form-input' onChange={(event) => setName(event.target.value)} value={username} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" className='form-input' onChange={(event) => setEmail(event.target.value)} value={email} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="pwd">Password</label>
                                <input type="password" name="pwd" id="pwd" className='form-input' onChange={(event) => setPassword(event.target.value)} value={password} />
                            </div>
                            <button onClick={signupsubmit}>Signup</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Signup