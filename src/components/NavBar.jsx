import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/bands-in-town-logo.svg'
import axios from 'axios'

const NavBar = props => {
  const [results, setResults] = useState([])
  const [search, setSearch] = useState('')
  const [user, setUser] = useState({})
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const handleSearch = async () => {
    const resp = await axios.get(
      'https://bands-in-town-api.herokuapp.com/api/Search/?searchTerm=' + search
    )
    if (search.length > 0) {
      setResults(resp.data)
    }
  }

  const getUserInfo = async () => {
    const resp = await axios.get(
      'https://bands-in-town-api.herokuapp.com/api/User/' + userId,
      config
    )
    setUser(resp.data)
  }

  useEffect(() => {
    handleSearch()
  }, [search])

  useEffect(() => {
    getUserInfo()
  }, [userId])

  return (
    <nav>
      <div className="nav-top-container">
        <div className="nav-title-container">
          <Link to="/">
            <img className="logo" src={logo} alt="rock hand sign logo" />
            <p className="nav-title">bandsintown</p>
          </Link>
        </div>
        <div className="search-container">
          <input
            onChange={e => setSearch(e.target.value)}
            className="non-mobile-search"
            type="search"
            placeholder="Search for artists"
            list="artists"
          ></input>
          <div className="results" id="artists">
            {results.map(artist => {
              return (
                <div onClick={() => setResults([])} className="dropdown-item">
                  <Link to={'/artist/' + artist.id}>
                    <div className="dropdown-item-container">
                      <div className="search-img-container">
                        <img
                          className="search-img"
                          src={artist.artistPic}
                          alt={artist.artistName}
                        />
                      </div>
                      <div className="search-info-container">
                        <p className="search-name">{artist.artistName}</p>
                        <p className="search-followers">
                          {artist.followers} trackers
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
        {props.isAuthed ? (
          <>
            <div className="auth-container">
              <Link className="sign-in" to={'/user/' + user.id}>
                {user.username}'s Profile
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="auth-container">
              <Link className="sign-up" to="/signup">
                Sign Up
              </Link>
              <Link className="log-in" to="/login">
                Log in
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="mobile-search-container">
        <input
          onChange={e => setSearch(e.target.value)}
          className="mobile-search"
          type="search"
          placeholder="Search for artists"
        ></input>
        <div className="mobile-results" id="artists">
          {results.map(artist => {
            return (
              <div onClick={() => setResults([])} className="dropdown-item">
                <Link to={'/artist/' + artist.id}>
                  <div className="dropdown-item-container">
                    <div className="search-img-container">
                      <img
                        className="search-img"
                        src={artist.artistPic}
                        alt={artist.artistName}
                      />
                    </div>
                    <div className="search-info-container">
                      <p className="search-name">{artist.artistName}</p>
                      <p className="search-followers">
                        {artist.followers} trackers
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
