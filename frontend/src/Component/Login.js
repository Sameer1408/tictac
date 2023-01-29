import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { login } from '../actions/actions';

export default function Login(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(state, "State");
  let history = useHistory();
  const [cred, setCred] = useState({ username: "", password: "" })

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://tictactoebackend-7fjz.onrender.com/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         },
      body: JSON.stringify({ username: cred.username, password: cred.password })
    });
    const json = await response.json();
    console.log(json,"json")
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      props.showAlret('logged in successfully', 'success')
      history.push("/allGames")
    }
    else {
      props.showAlret('Please try with correct credentials', 'warrning')
    }
    console.log(json)
  }
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Link to="/">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </Link>
      <p style={{fontWeight:"600",position:"relative",top:"20px",fontSize:"20px"}}>Login</p>
      <h2 className="subHead">Please enter your details</h2>

      <form >
        <div className="form-group">
          <label htmlFor="email" style={{fontWeight:"600",fontSize:"20px"}}>Username</label>
          <input type="text" className="form-control inputStyle" id="username" name="username" onChange={onChange} value={cred.username} aria-describedby="emailHelp" placeholder="Type your username here" />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{fontWeight:"600",fontSize:"20px"}}>Password</label>
          <input type="text" className="form-control inputStyle" name="password" onChange={onChange} value={cred.password} id="password" placeholder="Type your password here" />
        </div>
       <div onClick={handleLogin} >
        <p className="SubmitDiv">Login</p>
       </div>
      </form>
    </>
  )
}
