import { Link } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import "./Register.css"

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    try{
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password
      })
      res.data && window.location.replace("/login")
      console.log(res)
    }catch (err){
      setError(true)
      console.log(err)
    }
  }
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" onChange={e => setUsername(e.target.value)} type="text" placeholder="Enter your username..." />
        <label>Email</label>
        <input className="registerInput" onChange={e => setEmail(e.target.value)} type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="registerInput" onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter your password..." />
        <button className="registerButton" type="submit">Register</button>
      </form>
        <Link to="/login" className="registerLoginButton">Login</Link>
        {error && (<span style={{color:'red',  marginTop:10}}>Something went wrong</span>)}
    </div>
    )
}