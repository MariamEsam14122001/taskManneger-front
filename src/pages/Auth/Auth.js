import React, { useState } from "react";
import Login from "../../components/login-signup/Login"
import Register from "../../components/login-signup/Register";


function Auth() {
  const [currentForm, setCurrentForm] = useState('login');
function toggleForm(formName){
  setCurrentForm(formName);


}
  return (
    <div className="App">
      {currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>}
    </div>
  );
}

export default Auth;
