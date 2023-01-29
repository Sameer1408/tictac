import React,{useEffect, useState} from 'react'
import { Link } from "react-router-dom"
import { useHistory } from 'react-router-dom';

function Game({joinRoom,setOpponent}) {

    const [email,setEmail] = useState(" ");
    const [user,setUser] = useState({});
    
    let history = useHistory();
    // console.log(history,"history")


    const getOpponentName = async()=>{
      const response = await fetch(`https://tictactoebackend-7fjz.onrender.com/api/auth/getname`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem("token")
           },
           body: JSON.stringify({email})
       });
      const json = await response.json();
      console.log(json,"name")
      setOpponent(json?.name?.name);
    }

    const handleStartGame=async()=>{
       if(email!=" "){
        getOpponentName(email);
        var string = [email,user?.email];
        string.sort();
        var room = "";

        for(let i = 0;i<2;i++)
        {
          room=room+string[i];
        }        

        console.log(room,"String");
        history.push('/tictactoe');
        
        joinRoom(room,email);
      }
    }

    const getUser=async(token)=>{
      const response = await fetch(`https://tictactoebackend-7fjz.onrender.com/api/auth/getuser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':token
           },
       });
      const json = await response.json();
      // console.log(json,"user")
      setUser(json.user);
    }

    useEffect(()=>{
      let token = localStorage.getItem("token");
      // console.log(token,"token");
      if(token==null)
      {
        history.push('/');
      }
      getUser(token);
    },[localStorage.getItem("token")])


  return (
    <>
      <Link to="/allGames">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </Link>
        <p>Start a new game</p>
        <h2>Whom do you want to play with?</h2>
        <label htmlFor="email">Email </label>
          <input type="email" className="form-control inputStyle" id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}}
           value={email} aria-describedby="emailHelp" placeholder="Type your email here" />
       <div className="SubmitDiv" onClick={handleStartGame}>
        <p>Start game</p>
       </div>
    </>
  )
}
export default Game