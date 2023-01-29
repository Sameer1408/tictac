import React from 'react'
import { useHistory, useLocation } from 'react-router'
import {
  Link
} from "react-router-dom";
export default function Navabar() {
  let history = useHistory();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    history.push('/login')
  }

  let location = useLocation;
  return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <Link class="navbar-brand" to="/">Navbar</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to="/home">Home <span class="sr-only">(current)</span></Link>
      </li>
     
    </ul>
    {!localStorage.getItem('token')?<>
    <Link class="btn btn-outline-secondary mx-1" to="/login" role="button">Login</Link>
    <Link class="btn btn-outline-secondary" to="/signup" role="button">SignUp</Link></>
 :<button onClick={handleLogout} className="btn btn-outline-secondary">Logout</button>
    }
   
  </div>
</nav>
    )
}
