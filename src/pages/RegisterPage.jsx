
import React, {useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
     
        const {handleUserRegister}= useAuth()

      const [credentials, setCredentials] =useState({
        name: "",
        email: "", 
        password1: "",
        password2: ""
      })

      const handleInputChange=(e)=>{
        let name=e.target.name
        let value=e.target.value

        setCredentials({...credentials, [name]: value})
    }
  return (
    <div className="auth--container">
    <div className='form--wrapper'>
      <form onSubmit={(e)=>{handleUserRegister(e, credentials)}}>
      <div className='field--wrapper'>
            <label>Name:</label>
              <input type="text" required placeholder='Enter your name...' 
              name='name' value={credentials.name}
              onChange={(e)=>{handleInputChange(e)}}/>
        </div>

        <div className='field--wrapper'>
            <label>Email:</label>
              <input type="email" required placeholder='Enter your email...' 
              name='email' value={credentials.email}
              onChange={(e)=>{handleInputChange(e)}}/>
        </div>

        <div className='field--wrapper'>
            <label>Password:</label>
              <input type="password" required placeholder='Enter password...' 
              name='password1' value={credentials.password1}
              onChange={(e)=>{handleInputChange(e)}}/>
        </div>

        <div className='field--wrapper'>
            <label>Confirm Password:</label>
              <input type="password" required placeholder='Enter password...' 
              name='password2' value={credentials.password2}
              onChange={(e)=>{handleInputChange(e)}}/>
        </div>

        <div className='field--wrapper'>
          <input className="btn btn--lg btn--main" type="submit" value="Login" />
          </div>
      </form>
      <p>Already have an accout? Login <Link to="/login">here</Link></p>
    </div>
</div>
)
}
export default RegisterPage