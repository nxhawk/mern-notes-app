import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Login = ({ setIsLogin }) => {
  const [user, setUser] = useState({
    name: '', email: '', password: ''
  })
  const [err, setErr] = useState("")

  const onChangeInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setErr('')
  }

  const [onLogin, setOnLogin] = useState(false)
  const style = {
    visibility: onLogin ? 'visible' : 'hidden',
    opacity: onLogin ? 1 : 0
  }
  const handleChange = () => {
    setOnLogin(!onLogin)
    setUser({ name: '', email: '', password: '' })
  }


  //Submit Form
  const registerSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/users/register', {
        username: user.name,
        email: user.email,
        password: user.password
      })
      setUser({ name: '', email: '', password: '' })
      setErr(res.data.msg)
    } catch (error) {
      error.response.data.msg && setErr(error.response.data.msg)
    }
  }
  const loginSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/users/login', {
        email: user.email,
        password: user.password
      })
      setUser({ name: '', password: '', email: '' })
      localStorage.setItem('tokenStore', res.data.token)
      setIsLogin(true)
    } catch (error) {
      error.response.data.msg && setErr(error.response.data.msg)
    }
  }

  return (
    <section className="login-page">
      <div className="login create-note">
        <h2>Login</h2>
        <form onSubmit={loginSubmit}>
          <input type="email" name='email' id='login-email'
            placeholder='Email' required
            value={user.email}
            onChange={onChangeInput}
          />

          <input type="password" name='password' id='login-password'
            placeholder='Password' required autoComplete='true'
            value={user.password}
            onChange={onChangeInput}
          />

          <button type='submit'>Login</button>
          <p>You don't have an account?
            <span onClick={handleChange}> Register Now</span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>
      <div className="register create-note" style={style}>
        <h2>Register</h2>
        <form onSubmit={registerSubmit}>
          <input type="text" name='name' id='register-name'
            placeholder='User Name' required
            value={user.name}
            onChange={onChangeInput}
          />

          <input type="email" name="email" id='register-email'
            placeholder='Email' required
            value={user.email}
            onChange={onChangeInput}
          />

          <input type="password" name='password' id='register-password'
            placeholder='Password' required autoComplete='true'
            value={user.password}
            onChange={onChangeInput}
          />

          <button type='submit'>Register</button>
          <p>You have an account?
            <span onClick={handleChange}> Login Now</span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>
    </section>
  )
}

export default Login