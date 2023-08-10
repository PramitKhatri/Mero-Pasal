import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";


//this function will protect all routes that are nested inside it
const RequireAuth = (allowedRoles) => {  //allowedRoles is a prop that comes from Routes
    const { authentication } = useAuth()
    
    const location = useLocation()

    return (
        authentication?.roles?.find(role=>allowedRoles?.includes(role))  //if the role we are sending exist as allowed role for that route or not  .. for example we get allowedRoles prop as admin, then we check if admin is included in the roles that are allowed
            ? <Outlet />
            : authentication?.user //this will check if the routes are not allowed for that user but the user is looged in then we send them to unauthorized
            ?  <Navigate to='/unauthorized'  state={{ from: location }} replace />
            //if there is no user logged in then go to login
            :<Navigate to='/login' state={{ from: location }} replace />  //to remember where the user came from and redirect them to login. if they try to go back we need from and replace for it to work

    )
}

export default RequireAuth