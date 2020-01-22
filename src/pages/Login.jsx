import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../components/NavBar'
import { Redirect } from 'react-router-dom'

const Login = props => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [id, setId] = useState()
  const [wasLoginSuccessful, setWasLoginSuccessful] = useState(false)

  const handleLogin = async e => {
    e.preventDefault()
    const resp = await axios.post('https://localhost:5001/auth/login', {
      username: username,
      password: password,
    })
    if (resp.status === 200) {
      localStorage.setItem('userId', resp.data.userId)
      localStorage.setItem('token', resp.data.token)
      setId(resp.data.userId)
      props.setIsAuthed(true)
    }
    console.log(resp.data)
  }

  useEffect(() => {
    if (id) {
      setWasLoginSuccessful(true)
    }
  }, [id])

  return wasLoginSuccessful ? (
    <Redirect to={`/user/${id}`} />
  ) : (
    <>
      <section className="login-main-container">
        <p className="welcome-back">Welcome back!</p>
        <main className="login-main">
          <form className="login-form" onSubmit={handleLogin}>
            <input
              onChange={e => setUsername(e.target.value)}
              placeholder="username"
            ></input>
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
            ></input>
            <button className="login-button">Login</button>
          </form>
        </main>
      </section>
    </>
  )
}

export default Login
