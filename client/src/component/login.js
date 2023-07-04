import React,{useState} from "react";
import { Link } from "react-router-dom";
const Login = () =>{
    const[email,setemail]=useState("");
    const[pass,setpass] =useState("");
    

    const log = async (e) => {
        e.preventDefault();
        if(!email || !pass){
            window.alert("Fill details");
        }
        const res = await fetch("https://backend-nine-silk.vercel.app/login",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:pass,
            })
        });
        const data =res.json();

        if(res.status ===400 || !data){
            window.alert("Invalid");
        }
        else{
            window.alert("Succesfull");
         
        }
    }
 
    return(
        <div>
      
        <div className="Parent">
            <div className="contain">
            
            <h1 >SIGN-IN</h1>
            <Link to="/resetpass">Reset Password</Link>
                <form method="POST">
                 
                    <input type="text" placeholder="Email" name="email" autoComplete="off" value={email} onChange={(e)=> setemail(e.target.value)}/>
                    <br />
                  
                    <input type="password" placeholder="Password" name="password" autoComplete="off" value={pass} onChange={(e)=> setpass(e.target.value)}/>
                    <br/>
                    <br/>
                    <div className="button">
                            <button type="submit" className="signupbutton" value="registe" onClick={log}>Submit</button>
                    </div>
                    
                </form>
            </div>
        </div>
        </div>
    )
}

export default Login;
