import {Link} from 'react-router-dom'

const Admin = () => {
  return (
    <>
    This is Admin page (only accessed to admins)

    <Link to="/AddCategory"> Add Category</Link>
    </>
  )
}

export default Admin