import { useState } from "react";
import App from "../App";
import { Appbar } from "../components/Appbar";
import {Balance} from "../components/Balance"
import { Users } from "../components/Users";

export const Dashboard = () => {
    const [amount,setAmount] = useState(0);

    return <>
       <Appbar></Appbar>
       <div className="m-8">
           
          <Balance value={amount}></Balance>
          <Users></Users>
       </div>
    </>
}