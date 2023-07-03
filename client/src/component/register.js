import React,{ useState } from "react";
import { Link } from "react-router-dom";

const Register = () =>{

   
    const [user,set]=useState({
        name:"",email:"",password:"",password2:""
    });
    let name,value;
    const events=(e)=>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;
        set({...user,[name]:value});
    }


    const validate =async (e) =>{
        if(user.password!==user.password2){
            window.alert("Password Mismatch")
        }
    }


    const pass =async (e) =>{
        e.preventDefault();

        const {name,email,password,password2} =user;
        const res = await fetch("/register",{
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
            window.alert("Invalid");
            console.log("Invalid");
        }
        else{
            window.alert("Completely Successfully");
            console.log("Done");

         

        }
    }



    return(
        <div className="Parent">
            <div className="contain">
                <h1>REGISTRATION</h1>
                <h4><Link to="/signin">Login </Link></h4>
                    <form className="forms" method="POST">
                      
                        <input type="text" placeholder="Name" name="name"autoComplete="off" value={user.name} onChange={events}/>
                        <br />
                       
                        <input type="text" placeholder="Email" name="email"autoComplete="off" value={user.email} onChange={events}/>
                        <br />
                     
                        <input type="password" placeholder="Password" name="password" autoComplete="off" value={user.password} onChange={events} />
                        <br />
                  
                        <input type="password" placeholder="Confirm Password" name="password2" autoComplete="off" value={user.password2} onChange={events} onBlur={validate}/>
                        <br />
                        <br />
                        <div className="button">
                            <button type="submit" className="signupbutton" value="registe" onClick={pass}>Submit</button>
                        </div>
                       
                    </form>
                </div>
        </div>
    )
}

export default Register;

