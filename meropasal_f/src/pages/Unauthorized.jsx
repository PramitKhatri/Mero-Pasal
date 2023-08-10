import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1) //this will send you to the page you came from
  
  return (
    <>
      You are  Unauthorized to view this page.
      <button onClick={goBack}>Go Back</button>
    </>
  )
}

export default Unauthorized