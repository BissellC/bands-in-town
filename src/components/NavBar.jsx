import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/bands-in-town-logo.svg'
import axios from 'axios'

const NavBar = () => {
  const [results, setResults] = useState([])
  const [search, setSearch] = useState()

  const handleSearch = async () => {
    const resp = await axios.get(
      'https://localhost:5001/api/Search/?searchTerm=' + search
    )
    setResults(resp.data)
    console.log(results)
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
        <input
          onChange={e => setSearch(e.target.value)}
          className="non-mobile-search"
          type="search"
          placeholder="Search for artists"
          list="artists"
        ></input>
        <datalist id="artists">
          {results.map(artist => {
            return <img src={artist.artistPic} />
          })}
        </datalist>
        <div>
          <a className="sign-up" href="#">
            Sign Up
          </a>
        </div>
      </div>
      <div className="input-container">
        <input
          onChange={e => setSearch(e.target.value)}
          className="mobile-search"
          type="search"
          placeholder="Search for artists"
        ></input>
      </div>
    </nav>
  )
}

export default NavBar
