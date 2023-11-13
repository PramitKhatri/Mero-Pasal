import axios from "axios"
import { useEffect, useState } from "react"

const Profile = () => {
    const [user,setUser]=useState({})

    const userdata=JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        axios.get('http://localhost:8000/profile/',{
            headers:{
                'Authorization': `Token ${userdata.token}`
            }
        })
        .then(response=>setUser(response.data))
        .catch(err=>console.log(err))
    },[userdata.token])
    console.log(user)
  return (
    <>

    </>
  )
}

export default Profile