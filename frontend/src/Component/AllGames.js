import React, { useEffect, useState } from 'react'
import { useHistory,Link } from 'react-router-dom';

function AllGames({handleCardClick,newGame}) {
    let history = useHistory();
    const [allGames,setAllGames] = useState([]);
    const handleNewGame=()=>{
      newGame();
        history.push('/game')
    }

    const getAllGames=async()=>{
      const response = await fetch(`https://tictactoebackend-7fjz.onrender.com/api/auth/allGames`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem("token")
           },
       });
      const json = await response.json();
      console.log(json,"allGames");
      setAllGames(json.games);
    }

    

    useEffect(()=>{
      getAllGames();
    },[])

  return (
    <>
     <Link to="/">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </Link>
    <h1>
        Your Games
    </h1>
    {
      allGames?.slice(0).reverse().map(ele=>{
        
        return <div className="card">
          <h2>Game with {ele?.opposite}</h2>
          {ele?.wonBy==""?
            ele?.turn?<p>Your turn</p>:<p>You've made your move waiting for there turn</p>
            :
            ele?.wonBy=="1"?<p>you won</p>:<p>you loss</p>
            }
            <p>{ele?.date}</p>
            <div className="playDiv" onClick={(e)=>{
              handleCardClick(ele)
              history.push('/tictactoe')
            }}>play game</div>
        </div>
      })
    }

    <div onClick={handleNewGame} className="newGame">
    <i class="fa fa-plus" aria-hidden="true" style={{marginRight:"10px"}}></i>   New Game
    </div>
    </>
  )
}

export default AllGames