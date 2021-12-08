import { useRef, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";
import { Context } from '../../context/Context'
export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context)
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"})
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username:userRef.current.value,
        password:passwordRef.current.value
      });
      dispatch({type:"LOGIN_SUCESS", payload:res.data})
    } catch (err) {
      dispatch({type:"LOGIN_FAILURE"})
    }
  }
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" ref={userRef} type="text" placeholder="Enter your username..." />
        <label>Password</label>
        <input className="loginInput" ref={passwordRef} type="password" placeholder="Enter your password..." />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
        <Link to="/register" className="loginRegisterButton">Register</Link>
    </div>
  );
}