import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellerLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setErrMsg('')  //thsi sets the error to empty when any changes to email or password occur. this is done so that the user has read the error and making adjustments so no need for previous error msg
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response=await axios.post('http://localhost:8000/sellerlogin/',JSON.stringify({email,password}),{headers:{"Content-Type":"application/json"}})  //the front email is from db and back is from this app
      console.log(JSON.stringify(response.data))
      localStorage.setItem("user",JSON.stringify(response.data)|| [])


      setEmail('')
      setPassword('')
      setSuccess(true)

    } catch (err) {
        if(!err?.response){  //if no response from server
          setErrMsg('No server response')
        } else if (err.response?.status===400){
          setErrMsg('Missing username or password')
        } else{
          setErrMsg('login failed')
        }

    }


  }

  useEffect(() => {
    if (success) {
      navigate('/seller')
    }
  },[success,navigate])

  return (
    <>

      <section>
        <p>{errMsg}</p>

        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="form" >
          <label htmlFor="email" >Email:</label>
          <input type="email" id="email" autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email} required /> <br />

          <label htmlFor="pwd">Password:</label>
          <input type="password" id="pwd" onChange={(e) => setPassword(e.target.value)} value={password} /> <br />

          <button className="flex-shrink-0  bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">Sign In</button> {/* you dont have to say type=submit since thsi is the only button in form */}
        </form><br />
        <p>Don't have an account? <span><a href="/sellerregister">SignUp</a></span></p>


      </section>

    </>
  )
}

export default SellerLogin
