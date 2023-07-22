import React, { useState } from 'react'
import './css_files/login.css'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const postData = await fetch('https://hotelhorizonserver.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await postData.json()
      if (data.success) {
        sessionStorage.setItem('token', data.message)
        if (data.isAdmin) {
          alert('Welcome Admin') 
          sessionStorage.setItem('isAdmin', true)
          navigate('/admin/mainadmin')
        }
        else{
          alert('Logged n Successfully Now You Can Book Rooms') 
          navigate('/rooms')
        }
      } else {
        alert(data.message)
        setEmail('')
        setPassword('')
      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleForgotPass = async(e)=>{
    e.preventDefault();
    try {
      const email = prompt('Enter your email address')
      if(!email){
        return
      }
      const response = await fetch('https://hotelhorizonserver.onrender.com/api/auth/forgot', {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({email})
      })
      const data = await response.json()
      if(data.success){
        sessionStorage.setItem('verification', email)
        alert(data.message)
        navigate('/forgotverify')
      }
      else{
        alert(data.message)
      }
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" onClick={handleSubmit} className="btn">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        <p><Link to="/changepassword">Change Password</Link></p>
        <p><Link onClick={handleForgotPass} to="/forgotverify">Forgot Password?</Link></p>
      </div>
    </>
  )
}

export default Login