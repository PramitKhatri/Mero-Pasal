import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./hooks/RequireAuth";


import Layouts from "./pages/Layouts";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Notfound from "./pages/Notfound";
import Login from "./pages/Login";
import SellerRegister from "./pages/SellerRegister";
import SellerLogin from "./pages/SellerLogin";
import Admin from "./pages/Admin";
import SellerHomepage from "./pages/SellerHomepage";
import Unauthorized from "./pages/Unauthorized";
import Lounge from "./pages/Lounge";
import AddCategory from "./pages/Admin/AddCategory";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layouts />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route path='login' element={<Login />} />
          </Route>

          <Route path="sellerregister" element={<SellerRegister />} />
          <Route path="sellerlogin" element={<SellerLogin />} />

          {/* the below ones are protected routes which will check the roles that are given from the backend */}
          {/* <Route element={<RequireAuth allowedRoles={['admin']}/>}> */}
          <Route element={<RequireAuth allowedRoles={['admin']}/>}>
            <Route path='admin' element={<Admin />} />
            <Route path='AddCategory' element={<AddCategory />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={['seller']}/>}>
            <Route path="seller" element={<SellerHomepage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={['admin','seller']} />}>
            <Route path='lounge' element={<Lounge />} />  {/* lounge can be accessed both by admins and sellers */}
          </Route>

          {/* catch all 404 page  */}
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
