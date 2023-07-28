import React from 'react';
import { useState } from 'react';
import { userPassData } from './User_Pass'
import firstpage from './firstpage.png';
import logo from '../images/logo.svg';
import Database from '../data/database';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [invalid, setInvalid] = useState(false)
  let valid = false

  function incorrectLogin(){
    if(!valid){
      setInvalid(true)
  
      setTimeout(() => {
        setInvalid(false)
      }, 3000)
    }
  }
  async function validateLogin() {
    try {
      const currUser = await Database.postUserSession({
        email: user,
        password: pass,
      });

      if (currUser !== undefined) {
        // alert("Success!");
        navigate('/banner', {state: {user: currUser}})
        console.log("This is the current User:", currUser);
        valid = true;
        const users = await Database.getAllUsers();
        for(let i=0; i<users.length;i++){
          console.log(users[i]);
        }
      } else {
        throw new Error("Invalid login credentials");
      }
    } catch (error) {
      // alert(error.message);
      console.error("ERROR LOGGING-:-:", error);
      incorrectLogin();
    }
  }
  
  const handleUserChange = event => {
    setUser(event.target.value)
  }
  const handlePassChange = event => {
    setPass(event.target.value)
  }

    return (
      <div className="split-container">
        <div className="left-side">
        </div>
        <div className="right-side">
            <h1 className="headerLogin">Hi, welcome back!</h1>
            <h4 className="subLogin">Sign in with your company email</h4>
            <input onChange={handleUserChange} className='email' placeholder='Email'></input>
            <input onChange={handlePassChange} className='pass' placeholder='Password'></input>
            <button className='forgetPass'>Forgot Password?</button>
            {invalid && 
              <div>
                <h5>Incorrect username or password</h5>
              </div>}
            <button onClick={validateLogin} className='loginBtn'>Login</button> 
        </div>
      </div>
    )
  }  
  
export default Login;
  //       <img src={logo} alt="Logo" />
      
  //         <div>
  //         <input className='Enter your email' placeholder='Email'></input>
  //         </div>
  //         <div>
  //         <input className='pass' placeholder='Password'></input>
  //         </div>
  //         <button className='loginBtn'>Login</button> 
  //       </div>
  //     </div>
  //   )
  // }
  // export default Login;


