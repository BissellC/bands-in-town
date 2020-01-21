import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/bands-in-town-logo.svg'
import axios from 'axios'

const NavBar = () => {
  const [results, setResults] = useState([])
  const [search, setSearch] = useState(0)
  const [render, setRender] = useState('')

  const handleSearch = async () => {
    const resp = await axios.get(
      'https://localhost:5001/api/Search/?searchTerm=' + search
    )
    setResults(resp.data)
    console.log(results)
    if (search.length === 1) {
      setResults([])
    }
  }

  useEffect(() => {
    handleSearch()
  }, [search])

  return (
    <nav>
      <div className="nav-top-container">
        <div className="nav-title-container">
          <Link to="/">
            <img className="logo" src={logo} />
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
                <div className="dropdown-item">
                  <Link to={'/artist/' + artist.id}>
                    <div className="dropdown-item-container">
                      <div className="search-img-container">
                        <img className="search-img" src={artist.artistPic} />
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
        <div className="auth-container">
          <a className="sign-up" href="#">
            Sign Up
          </a>
          <a className="log-in" href="/login">
            Log in
          </a>
        </div>
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
              <div className="dropdown-item">
                <Link to={'/artist/' + artist.id}>
                  <div className="dropdown-item-container">
                    <div className="search-img-container">
                      <img className="search-img" src={artist.artistPic} />
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
