import React, { useState } from "react";
import Login from "./login-signup";
import Register from "./register";
import "./App.css";

function App() {
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

export default App;
