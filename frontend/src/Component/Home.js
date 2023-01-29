import React, { useContext, useState } from 'react'
import Alert from './Alert';
import { Link } from "react-router-dom"
export default function Home() {

    return (
        <>
            <h2 className="async">async</h2>
           <h1 className="heading">tic tac toe</h1>
            <Link to="/login">
                <div className="loginDiv">
                    <p >Login</p>
                </div>
            </Link>
            <Link to="/signup">
                <div className="SubmitDiv">
                    <p>Register</p>
                </div>
            </Link>

        </>
    )
}