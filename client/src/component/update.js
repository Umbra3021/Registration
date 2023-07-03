import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
const Update = () =>{

    const nav=useNavigate();
    const [user,set]=useState({
        email:"",password:"",otp:""
    });
    let name,value;
    const events=(e)=>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;
        set({...user,[name]:value});
    }

    const pass =async (e) =>{
        e.preventDefault();

        const {name,email,password,password2} =user;
        const res = await fetch("/reset",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                email:email,
                password:password,
                password2:password2
            })
        });
        const data= await res.json();

        if(data.status ===422 || !data){
            window.alert("Invalid OTP or Email");
            console.log("Invalid");
        }
        else{
            window.alert("Completely Successfully");
            console.log("Done");
            nav("../signin",{replace:true});
         

        }
    }
            return(
                <div>
                <div className="Parent">
                <div className="contain">
                
                <h1 >Reset</h1>
            
                    <form method="POST">
                    
                        <input type="text" placeholder="Email" name="email" autoComplete="off" value={user.email} onChange={events}/>
                        <br />
                        <input type="text" placeholder="New Password" name="password" autoComplete="off" value={user.password} onChange={events}/>
                        <br />
                        <input type="text" placeholder="OTP" name="otp" autoComplete="off" value={user.otp} onChange={events}/>
                        <br/>
                        <div className="button">
                                <button type="submit" className="signupbutton" value="registe" onClick={pass}>Submit</button>
                        </div>
                        
                    </form>
                </div>
            </div>
            </div>
)
}

export default Update;