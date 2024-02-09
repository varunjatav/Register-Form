import { useState } from "react";
import "./App.module.css";

function App() {

  const [user,setUser] = useState({
    name:"", email:"", password:"",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/demo',{
      method:"POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json();
    console.log(data);
  }
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]: value})
  }

  return (
     <div className="formContainer">
     <form action="/register" onSubmit={handleSubmit}>
      <div>
        <input type="text" onChange={handleChange} value={user.name} name="name" placeholder="Enter Your Name" />
      </div>
      <div>
        <input type="email" onChange={handleChange} value={user.email} name="email" placeholder="Enter Your Email" />
      </div>
      <div>
        <input type="password" onChange={handleChange} value={user.password} name="password" placeholder="Enter Your Password" />
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
     </form>
     </div>
  )
}

export default App
