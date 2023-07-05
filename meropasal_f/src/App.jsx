import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layouts from "./pages/Layouts";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Notfound from "./pages/Notfound";
import Login from "./pages/Login";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layouts />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<Signup/>}/>
            <Route path='login' element={<Login/>}/>
          </Route>
          <Route path="*" element={<Notfound/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
