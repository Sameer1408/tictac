import { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom"

function Tictactoe({ data,
  setData,
  handleBoxClick,
  winner,
  turn,
  opponent,
  room,
  submit
}) {

  let history = useHistory();

  const positionOfXO = (index) => {
    let k = index - 1;
    for (let i = 0; i < 9; i++) {
      if (i == k) {
        return data[i];
      }
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    // console.log(token,"token");
    if (token == null) {
      history.push('/');
    }
  }, [])

  const handleSubmitGame =async () => {
    data={
      opposite:opponent,
      wonBy:winner,
      tictac:localStorage.getItem("data"),
      roomPlayed:room,
      turn
    }
    const response = await fetch(`https://tictactoebackend-7fjz.onrender.com/api/auth/submitGame`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem("token")
           },
           body: JSON.stringify(data)
       });
      const json = await response.json();
      console.log(json,"name");
      history.push('/allGames');
      submit();
  }

  return (
    <>
      <Link to="/allGames">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </Link>
      <h1>
        Game with {opponent}
      </h1>
      <p>Your piece</p>
      <h1 style={{ color: "#2C8DFF", fontSize: "60px" }}>X</h1>
      <div>
        {winner == "" ?
          turn ?
            <p className="chanceDiv">Your move</p>
            :
            <p className="chanceDiv">Their move</p>
          : <>
            {
              winner == "1" ? <p className="chanceDiv" style={{backgroundColor:"#219653"}}>You Wn! </p>
                : <p className="chanceDiv" style={{backgroundColor:"#EB5757"}}>You Loss</p>
            }

          </>
        }
      </div>
      <div>
        <div style={{ textAlign: "center" }}>
          <div id="a1" onClick={(e) => { handleBoxClick(1, true) }} >
            {
              positionOfXO(1) != 0 ? <>
                {
                  positionOfXO(1) === 1 ? <h1 className="cross">X</h1> :
                    <h1 className="circle">O</h1>
                }
              </> : <h1></h1>
            }

          </div>
          <div id="a2" onClick={(e) => { handleBoxClick(2, true) }}>
            {
              positionOfXO(2) != 0 ? <>
                {
                  positionOfXO(2) === 1 ? <h1 className="cross">X</h1> :
                    <h1 className="circle">O</h1>
                }
              </> : <h1></h1>
            }
          </div>
          <div id="a3" onClick={(e) => { handleBoxClick(3, true) }}>
            {
              positionOfXO(3) != 0 ? <>
                {
                  positionOfXO(3) === 1 ? <h1 className="cross">X</h1> : <h1 className="circle">O</h1>
                }
              </> : <h1></h1>
            }
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div id="a4" onClick={(e) => { handleBoxClick(4, true) }}>
            {
              positionOfXO(4) != 0 ? <>
                {
                  positionOfXO(4) === 1 ? <h1 className="cross">X</h1> : <h1 className="circle">O</h1>
                }
              </> : <h1></h1>
            }
          </div>
          <div id="a5" onClick={(e) => { handleBoxClick(5, true) }}>
            {
              positionOfXO(5) != 0 ? <>
                {
                  positionOfXO(5) === 1 ? <h1 className="cross">X</h1> : <h1 className="circle">O</h1>
                }
              </> : <h1></h1>
            }
          </div>
          <div id="a6" onClick={(e) => { handleBoxClick(6, true) }}>
            {
              positionOfXO(6) != 0 ? <>
                {
                  positionOfXO(6) === 1 ? <h1 className="cross">X</h1> : <h1 className="circle">O</h1>
                }
              </> : <h1></h1>
            }
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div id="a7" onClick={(e) => { handleBoxClick(7, true) }} >
            {
              positionOfXO(7) != 0 ? <>
                {
                  positionOfXO(7) === 1 ? <h1 className="cross">X</h1> : <h1 className="circle">O</h1>
                }
              </> : <h1></h1>
            }
          </div>
          <div id="a8" onClick={(e) => { handleBoxClick(8, true) }}>
            {
              positionOfXO(8) != 0 ? <>
                {
                  positionOfXO(8) === 1 ? <h1 className="cross">X</h1> : <h1 className="circle">O</h1>
                }
              </> : <h1></h1>
            }
          </div>
          <div id="a9" onClick={(e) => { handleBoxClick(9, true) }}>
            {
              positionOfXO(9) != 0 ? <>
                {
                  positionOfXO(9) === 1 ? <h1 className="cross">X</h1> : <h1 className="circle">O</h1>
                }
              </> : <h1></h1>
            }
          </div>
        </div>
      </div>
     
      {
        winner!='1'?
        turn? <div className="SubmitDiv">
        <p onClick={handleSubmitGame} >Submit</p></div>:
        <div className="SubmitDiv">
        <p >waiting for {opponent}</p></div>: 
        <div className="SubmitDiv">
        <p onClick={handleSubmitGame} >Submit</p></div>
      }
 
    </>
  )
}
export default Tictactoe