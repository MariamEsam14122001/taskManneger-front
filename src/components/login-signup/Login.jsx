import React ,{useState}from "react";
import "./App.css"
function Login(props) {
    const[email,setEmail]=useState('');
    const[pass,setPass]=useState('');

    function handleSubmit(e){
        e.preventDefault();
        console.log(email);
    }
  
    return (
        <div className="formContainer">
                        <h2>Login</h2>

        <form className="loginForm" onSubmit={handleSubmit}> 
            <label htmlFor="email">Email</label>
            <input value={email} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="*******" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        <button className="linkBtn" onClick={() => props.onFormSwitch("register")}>Already have an account? Log in here</button>
        </div>
    );
}

export default Login;
