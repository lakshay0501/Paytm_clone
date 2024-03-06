import { useEffect, useState } from "react";
import App from "../App";
import { Appbar } from "../components/Appbar";
import {Balance} from "../components/Balance"
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
    const [amount,setAmount] = useState(0);
    
    useEffect(()=>{
       
        async function fetchData(){
             const response = await axios.get("http://localhost:3900/api/v1/account/balance",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            const {balance} = response.data;
            setAmount(balance)
        }
        fetchData()
    },[amount])

    return <>
       <Appbar></Appbar>
       <div className="m-8">
           
          <Balance value={amount}></Balance>
          <Users></Users>
       </div>
    </>
}