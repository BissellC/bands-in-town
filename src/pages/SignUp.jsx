import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const SignUp = props => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [userState, setUserState] = useState()
  const [id, setId] = useState()
  const [wasLoginSuccessful, setWasLoginSuccessful] = useState(false)

  const handleSignUp = async e => {
    e.preventDefault()
    const resp = await axios.post(
      'https://bands-in-town-api.herokuapp.com/auth/signup',
      {
        username: username,
        password: password,
        state: userState,
      }
    )
    if (resp.status === 200) {
      localStorage.setItem('userId', resp.data.userId)
      localStorage.setItem('token', resp.data.token)
      setId(resp.data.userId)
      props.setIsAuthed(true)
    }
  }

  useEffect(() => {
    if (id) {
      setWasLoginSuccessful(true)
    }
  }, [id])

  return wasLoginSuccessful ? (
    <Redirect to={'/'} />
  ) : (
    <>
      <section className="login-main-container">
        <p className="welcome-back">Sign Up</p>
        <main className="login-main">
          <form className="login-form" onSubmit={handleSignUp}>
            <input
              onChange={e => setUsername(e.target.value)}
              placeholder="username"
            ></input>
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
            ></input>
            <select
              value={userState}
              onChange={e => setUserState(e.target.value)}
            >
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            <button className="login-button">Sign Up</button>
          </form>
        </main>
      </section>
    </>
  )
}

export default SignUp
