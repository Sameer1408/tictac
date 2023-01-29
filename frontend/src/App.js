import { useState, useEffect } from 'react';
import './App.css';
import Home from './Component/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import Alert from './Component/Alert';
import io from "socket.io-client";
import Game from './Component/Game';
import Tictactoe from './Component/Tictactoe';
import AllGames from './Component/AllGames';
import { useNavigate } from "react-router-dom";


const socket = io.connect("https://tictactoebackend-7fjz.onrender.com");

function App() {

  const [alert, setAlert] = useState(null);
  const [room, setRoom] = useState("");
  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [turn, setTurn] = useState(true);
  const [winner, setWinner] = useState("")
  const [opponent,setOpponent] = useState("");


  useEffect(() => {
    localStorage.setItem("data", data);
  }, [])


  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data, "data");
    })
    socket.on("play", (index) => {

      handleBoxClick(index, false);
      console.log(index, "play", data)
    })

    socket.on("opSub",(data)=>{
      setTurn(true);
      showAlret("opponent has submited you can submit now","warning")
    })

  }, [socket])

  useEffect(()=>{
    console.log(winner,"winner")
  },[winner])

  useEffect(() => {
    // Checks for the win condition in rows 
    const checkRow = () => {

      if(data[0]==data[3] && data[0]==data[6] && data[0]!=0)
      {
        if(data[0]==1)
        {
          setWinner("1");
          console.log("player 1");
        }
        else{
          setWinner("2");
          console.log("player 2");
        }
        setTurn(false);
        return true;
      }      

      if(data[1]==data[4] && data[1]==data[7] && data[1]!=0)
      {
        if(data[1]==1)
        {
          setWinner("1");
          console.log("player 1");
        }
        else{
          setWinner("2");
          console.log("player 2");
        }
        setTurn(false);
        return true;
      }

      if(data[2]==data[5] && data[2]==data[8] && data[2]!=0)
      {
        if(data[2]==1)
        {
          setWinner("1");
          console.log("player 1");
        }
        else{
          setWinner("2");
          console.log("player 2");
        }
        setTurn(false);
        return true;
      }

      return false;
    }
    // Checks for the win condition in cols 
    const checkCol = () => {
     
      if(data[6]==data[7] && data[6]==data[8] && data[6]!=0)
      {
        if(data[6]==1)
        {
          setWinner("1");
          console.log("player 1");
          
        }
        else{
          setWinner("2");
          console.log("player 2");
        }
        setTurn(false);
        return true;

      }

      if(data[0]==data[1] && data[0]==data[2] && data[0]!=0)
      {
        if(data[0]==1)
        {
          setWinner("1");
          console.log("player 1");
        }
        else{
          setWinner("2");
          console.log("player 2");
        }
        setTurn(false);
        return true;
      }

      if(data[3]==data[4] && data[3]==data[5] && data[3]!=0)
      {
        if(data[3]==1)
        {
          setWinner("1");
          console.log("player 1");
        }
        else{
          setWinner("2");
          console.log("player 2");
        }
        setTurn(false);
        return true;
      }

      return false;
    }
    // Checks for the win condition in diagonals 
    const checkDiagonal = () => {
     if(data[0]==data[4] && data[0]==data[8] && data[0]!=0)
     {
      if(data[0]==1)
        {
          setWinner("1");
          console.log("player 1");
          
        }
        else{
          setWinner("2");
          console.log("player 2");
        }
        setTurn(false);
        return true;
     }

     if(data[2]==data[4] && data[2]==data[6] && data[2]!=0)
     {
      if(data[2]==1)
      {
        setWinner("1");
        console.log("player 1");
      }
      else{
        setWinner("2");
        console.log("player 2");
      }
      setTurn(false);
      return true;
     }


     return false;
    }

    const checkWin = () => {
      return (checkRow() || checkCol() || checkDiagonal());
    }

    const checkTie = () => {
      let count = 0;
      data.forEach((cell) => {
        if (cell !== '') {
          count++;
        }
      })
       return count === 9;  
    }
    
    // Setting the winner in case of a win 
    if (checkWin()) {
      // setWinner(turn === 0 ? "Player 2 Wins!" :
      // "Player 1 Wins!");
      // console.log(turn === 0 ? "Player 2 Wins!" : "Player 1 Wins!");
    } else if (checkTie()) {
      // Setting the winner to tie in case of a tie 
      // setWinner("It's a Tie!");
    }
  })

  const showAlret = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }

  const joinRoom = (roo,email) => {

    setRoom(roo);
    console.log(roo, "roo");
    if (roo !== "") {
      socket.emit("join_room", {roo,email});
    }
    if(email!="")
    {
      localStorage.setItem("data",[0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setData([0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setTurn(true);
      setWinner("");
    }
  }

  const handleBoxClick = async (index, flag) => {
    if (turn) {
      if (flag == true) {
        let s = localStorage.getItem("data");
        let arr = [];
        for (let i = 0; i < s.length; i++) {
          if (s[i] != ",") {
            arr.push(parseInt(s[i]));
          }
        }
        arr[index - 1] = 1;
        console.log(arr, "arr");
        setData(arr);
        localStorage.setItem("data", arr);
        socket.emit("played", { index, room });
        setTurn(false);
      }
      else {
        let s = localStorage.getItem("data");
        let arr = [];
        for (let i = 0; i < s.length; i++) {
          if (s[i] != ",") {
            arr.push(parseInt(s[i]));
          }
        }
        arr[index - 1] = 2;
        console.log(arr, "arr");
        setData(arr);
        localStorage.setItem("data", arr);
        // socket.emit("played", { index, room });
        setTurn(true);
      }

    }
  }


  const handleCardClick=(ele)=>{
    joinRoom(ele.roomPlayed,"");
    console.log(ele,"ele");
    localStorage.setItem("data",ele.tictac[0]);
    let s = localStorage.getItem("data");
    let arr = [];
    for (let i = 0; i < s.length; i++) {
      if (s[i] != ",") {
        arr.push(parseInt(s[i]));
      }
    }
    setData(arr);
    setTurn(ele.turn);
    setWinner(ele.wonBy);
    
  }

  const submit=()=>{
    socket.emit("sub",room);
  }

  const newGame=()=>{
    localStorage.setItem("data",[0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setData([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setTurn(true);
    setWinner("");
  }

  return (
    <>
      <Provider store={store}>
        <Router>
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login showAlret={showAlret} />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/game">
                <Game joinRoom={joinRoom}  setOpponent={setOpponent}/>
              </Route>
              <Route exact path="/tictactoe">
                <Tictactoe data={data}
                  setData={setData}
                  handleBoxClick={handleBoxClick}
                  winner={winner}
                  turn={turn}
                  opponent={opponent}
                  room={room}
                  submit={submit}
                   />
              </Route>
              <Route exact path="/allGames">
                <AllGames handleCardClick={handleCardClick} newGame={newGame}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    </>
  );
}

export default App;