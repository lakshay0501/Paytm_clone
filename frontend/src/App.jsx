import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from './pages/Signup'
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/DashBoard";
import { SendMoney } from "./pages/SendMoney";
import './index.css'
import { Signout } from "./pages/Signout";

function App() {

  return (
    <>
 
      <BrowserRouter>

        <Routes>
           <Route path="/signup" element={<Signup/>}></Route>
           
           <Route path="/signin" element={<Signin/>}></Route>
           
           <Route path="/dashboard" element={<Dashboard/>}></Route>
           
           <Route path="/send" element={<SendMoney/>}></Route>

           <Route path="/signout" element={<Signout/>}></Route>
      
        </Routes>

        
      </BrowserRouter>
    </>
  )
}

export default App
