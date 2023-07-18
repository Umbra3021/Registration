import React,{useEffect, useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
const Reset = () =>{

        const nav = useNavigate();
    const[email,setemail]=useState(""); 

    const log = async (e) => {
        e.preventDefault();
        if(!email){
            window.alert("Fill details");
        }
        const res = await fetch("https://backend-nine-silk.vercel.app/reset",{
            method:"POST",
            mode: "no-cors",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
            })
        });

        const data =  res.json();
        console.log(data);
        if(res.status===400 || !data){
            window.alert("No email");
        }
        else{
            window.alert("Your OTP (only for demo alert is used)"+" "+data);
                        nav("../updatepass",{replace:true});
        }
    }

   


    return(
        <div>
            <div className="Parent">
            <div className="contain">
            
            <h1 >Reset</h1>
           
                <form method="POST">
                 
                    <input type="text" placeholder="Email" name="email" autoComplete="off" value={email} onChange={(e)=> setemail(e.target.value)}/>
                    <br />
                    <div className="button">
                            <button type="submit" className="signupbutton" value="registe" onClick={log}>Submit</button>
                    </div>
                    
                </form>
            </div>
        </div>
        </div>
    )
    
}

export default Reset;