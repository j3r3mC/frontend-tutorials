import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Register from '../register.component';
import { Link } from 'react-router-dom';
import "../../Login.css";

async function loginUser(credentials) {
  
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function Login({setToken}) {
  var isLog = false;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          email,
          password
        });
        isLog = true
        document.body.className = (isLog === true ? "active" : "normal");
        setToken(token);

        
      }

  return(
    <div className='containLog'>
      
      <form onSubmit={handleSubmit} className='formLog'>
     
      <h1 className='titleLog'>Sign in</h1>
        <label>
            <p>Email</p>
            <input type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
            <button type="submit" className="btn btn-outline-light">Submit</button>
        </div>
        <Link className='a' to={Register}>Sign up</Link>
      
        <div className='wave'></div>
        <div className='wave'></div>
      </form>
    </div>
  )
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

  /*---------------------------------------------------------------------------------------------------------------------------*/
  