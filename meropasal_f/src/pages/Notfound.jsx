import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Notfound = () => {
    const navigate=useNavigate()
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/')
        },2500)
    }, [navigate])
  return (
    <>
     404 Not found
     <p>you are being redirected to homepage</p>
     </>
  )
}

export default Notfound