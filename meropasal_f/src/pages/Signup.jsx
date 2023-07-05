import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)   //this states of the user submitted or not and is useful for navigate

    const navigate = useNavigate()

    const signupsubmit = async (e) => {
        e.preventDefault()
        const errors = validate()
        setFormErrors(errors)    //this takes the errors object from below and pushes it to usestate()
        if (Object.keys(errors).length === 0) {
            try {
                await axios.post('http://localhost:8000/signup/', {
                    first_name,
                    last_name,
                    username,
                    email,
                    password,
                });
                toast.success('Registration Successful')
                setFirstname('')
                setLastname('')
                setUsername('')
                setEmail('')
                setPassword('')
            } catch (err) {
                toast.error(err.response.data.error)
            }
        }
        setIsSubmit(true)
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {  //this checks if the keys of formerrors object is empty
            navigate('/')
        }
    }, [formErrors])



    const validate = () => {
        const errors = {}  //errors contain objects which is initially empty and is set by the if else function below. the values are stored as errors={ username: 'usernamis is required',}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!first_name) {
            errors.first_name = 'First Name is required!'  //this sets the error for firstname
        }
        if (!last_name) {
            errors.last_name = 'Last Name is required!'
        }
        if (!username) {
            errors.username = 'Username is required!'
        }
        if (!email) {
            errors.email = 'Email is required!'
        } else if (!regex.test(email)) {
            errors.email = 'This is not a valid email format!'
        }
        if (!password) {
            errors.password = 'Password is required'
        } else if (password.length < 7) {
            errors.password = 'Password must be more than 7 characters'
        }
        return errors
    }

    return (
        <>
            <ToastContainer theme="colored" position="top-right" />
            <div className="container">
                <div className="flex flex-wrap justify-center">
                    <div className="w-72">
                        <form action="" className="p-5 shadow-xl" onSubmit={signupsubmit}>
                            <div className="mb-2">
                                <label htmlFor="fname" className="m-1 block">
                                    firstName
                                </label>
                                <input
                                    type="text"
                                    name="firstname"
                                    id="fname"
                                    className="form-input border-4 h-10 w-40 ml-5"
                                    onChange={(event) => setFirstname(event.target.value)}
                                    value={first_name}
                                />
                                {formErrors.first_name && (
                                    <p className="text-red-500">{formErrors.first_name}</p>
                                )}
                            </div>
                            <div className="mb-2">
                                <label htmlFor="lname" className="m-1 block">
                                    lastName
                                </label>
                                <input
                                    type="text"
                                    name="lastname"
                                    id="lname"
                                    className="form-input border-4 h-10 w-40 ml-5"
                                    onChange={(event) => setLastname(event.target.value)}
                                    value={last_name}
                                />
                                {formErrors.last_name && (
                                    <p className="text-red-500">{formErrors.last_name}</p>
                                )}
                            </div>
                            <div className="mb-2">
                                <label htmlFor="uname" className="m-1 block">
                                    UserName
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="uname"
                                    className="form-input border-4 h-10 w-40 ml-5"
                                    onChange={(event) => setUsername(event.target.value)}
                                    value={username}
                                />
                                {formErrors.username && (
                                    <p className="text-red-500">{formErrors.username}</p>
                                )}
                            </div>
                            <div className="mb-2">
                                <label htmlFor="email" className="m-1 block">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-input border-4 h-10 w-40 ml-5"
                                    onChange={(event) => setEmail(event.target.value)}
                                    value={email}
                                />
                                {formErrors.email && (
                                    <p className="text-red-500">{formErrors.email}</p>
                                )}
                            </div>
                            <div className="mb-2">
                                <label htmlFor="pwd" className="m-1 block">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="pwd"
                                    id="pwd"
                                    className="form-input border-4 h-10 w-40 ml-5"
                                    onChange={(event) => setPassword(event.target.value)}
                                    value={password}
                                />
                                {formErrors.password && (
                                    <p className="text-red-500">{formErrors.password}</p>
                                )}
                            </div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">Signup</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
