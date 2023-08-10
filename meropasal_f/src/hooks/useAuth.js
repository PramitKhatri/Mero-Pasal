// this page will handle the global authentication and authorization so that we dont have to use if else statement in app.js to check if they are user, admin, seller
//thid is a custom hook  :0
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth=()=>{
    return useContext(AuthContext)
}

export default useAuth