import React,{useEffect, useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const {user, handleUserLogin}= useAuth()
  const navigate= useNavigate()

  const [credentials, setCredentials] =useState({
    email: "", 
    password: ""
  })



    useEffect(()=>{
        if(user){
            navigate('/')
        }
    }, [])

    const handleInputChange=(e)=>{
        let name=e.target.name
        let value=e.target.value

        setCredentials({...credentials, [name]: value})
    }

  return (
    <div className="auth--container">
        <div className='form--wrapper'>
          <form onSubmit={(e)=>{handleUserLogin(e, credentials)}}>
            <div className='field--wrapper'>
                <label>Email:</label>
                  <input type="email" required placeholder='Enter your email...' 
                  name='email' value={credentials.email}
                  onChange={(e)=>{handleInputChange(e)}}/>
            </div>

            <div className='field--wrapper'>
                <label>Password:</label>
                  <input type="password" required placeholder='Enter password...' 
                  name='password' value={credentials.password}
                  onChange={(e)=>{handleInputChange(e)}}/>
            </div>

            <div className='field--wrapper'>
              <input className="btn btn--lg btn--main" type="submit" value="Login" />
              </div>
          </form>
          <p>Don't have an accout? Register <Link to="/register">here</Link></p>
        </div>
    </div>
  )
}

export default LoginPage