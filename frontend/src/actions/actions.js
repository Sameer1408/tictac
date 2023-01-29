import {LOGIN} from "../actionTypes/actionType";

const login = async(cred) => {
    
     const response = await fetch(`https://tictactoebackend-7fjz.onrender.com/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({ email: cred.email, password: cred.password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.jwtData);
    //   props.showAlret('logged in successfully', 'success')
    //   history.push("/")
    alert("action called");
    }
    else {
    //   props.showAlret('Please try with correct credentials', 'warrning')
    }
    console.log(json)
  return {
    type: LOGIN,
  };
};

export { login };