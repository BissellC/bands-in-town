import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/bands-in-town-logo.svg'

const NavBar = () => {
  return (
    <nav>
      <div className="nav-title-container">
        <Link to="/">
          <img className="logo" src={logo} />
          <p className="nav-title">bandsintown</p>
        </Link>
      </div>
      <input type="search" placeholder="Search for artists"></input>
      <div>
        <a href="#">Sign Up</a>
      </div>
    </nav>
  )
}

export default NavBar
