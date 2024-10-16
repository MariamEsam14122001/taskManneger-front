import React, { useState } from "react";
import "./App.css"

function Register(props) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="formContainer">
            <h2>Register</h2>
            <form className="registerForm" onSubmit={handleSubmit}> 
                <label htmlFor="fullname">Fullname</label>
                <input 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)}
                    type="text" 
                    placeholder="Fullname" 
                    id="fullname" 
                    name="fullname" 
                />
                <label htmlFor="email">Email</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    placeholder="youremail@gmail.com" 
                    id="email" 
                    name="email" 
                />
                <label htmlFor="password">Password</label>
                <input 
                    value={pass} 
                    onChange={(e) => setPass(e.target.value)}
                    type="password" 
                    placeholder="*******" 
                    id="password" 
                    name="password" 
                />
                <button type="submit">Register</button>
            </form>
            <button onClick={() => props.onFormSwitch("login")}>Already have an account? Log in here</button>
        </div>
    );
}

export default Register;
