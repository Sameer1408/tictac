import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom"

export default function SignUp() {

  const [cred, setCred] = useState({ name: "", email: "", password: "" ,username:""})
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://tictactoebackend-7fjz.onrender.com/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3NTQyMmJhNTliYzkwMDA2ZGE3MTVjIn0sImlhdCI6MTYzNTA3NDcxNX0.dGgMjnKsL7r5JR9KNwFYwRMzxKe5Mxtn1sgScJHT7nY"
      },
      body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password,username:cred.username})
    });
  const json = await response.json();
    if (json.success) {
      alert("done credentials")
      localStorage.setItem('token', json.authtoken);
      history.push("/allGames");
    }
    else {
      alert("Invalid credentials")
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
      <p style={{fontWeight:"600",position:"relative",top:"20px",fontSize:"20px"}}>Create account</p>
      <h2 className="subHead">Let's get to know you better!</h2>
      <form >

        <div className="form-group">
          <label htmlFor="name" className="labels">Your name</label>
          <input type="text" className="form-control inputStyle" id="name" name="name" onChange={onChange} value={cred.name} aria-describedby="emailHelp" placeholder="Type your name here" />
        </div>

        <div className="form-group">
          <label htmlFor="name" className="labels">Username</label>
          <input type="text" className="form-control  inputStyle" id="username" name="username" onChange={onChange} value={cred.username} aria-describedby="emailHelp" placeholder="Type your username here" />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="labels">Email address</label>
          <input type="email" className="form-control   inputStyle" id="email" name="email" onChange={onChange} value={cred.email} aria-describedby="emailHelp" placeholder="Type your email here" />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="labels">Password</label>
          <input type="text" className="form-control    inputStyle" name="password" onChange={onChange} value={cred.password} id="password" placeholder="Type your password here" />
        </div>
    <div onClick={handleSubmit}>
        <p  className="SubmitDiv">Register</p>
        </div>
      </form>
    </>
  )
}