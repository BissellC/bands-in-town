import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'

const UserPage = props => {
  const [user, setUser] = useState([])
  const [artists, setArtists] = useState([])

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const getUserInfo = async () => {
    const resp = await axios.get(
      'https://localhost:5001/api/User/' + props.match.params.id,
      config
    )
    setUser(resp.data)
  }

  const getUserArtists = async () => {
    const resp = await axios.get(
      'https://localhost:5001/api/TrackArtist/user/' + userId
    )
    setArtists(resp.data)
    console.log(resp.data)
  }

  const removeArtist = async artistId => {
    const resp = await axios.delete(
      'https://localhost:5001/api/TrackArtist/' + artistId
    )
  }

  useEffect(() => {
    getUserInfo()
    getUserArtists()
  }, [])

  return (
    <>
      <NavBar />
      <p>{user.state}</p>
      <p>{user.id}</p>
      <section className="events-near-you">
        {artists.map(artist => {
          return (
            <>
              <p>Events for {artist.artist.artistName}</p>
              <button onClick={() => removeArtist(artist.id)}>
                Untrack Artist
              </button>
              <div className="event-near-container">
                {artist.artist.events.map(event => {
                  {
                    if (event.venue.city.includes(user.state)) {
                      return (
                        <Link to={'/event/' + event.id}>
                          <section className="event-near">
                            <div className="near-main">
                              <div className="near-img-container-container">
                                <div className="near-img-container">
                                  <img
                                    className="near-pic"
                                    src={artist.artist.artistPic}
                                  />
                                </div>
                              </div>
                              <div className="near-info">
                                <Link
                                  className="artist-hover"
                                  to={'/artist/' + artist.artist.id}
                                >
                                  <p className="near-artist-name">
                                    {artist.artist.artistName}
                                  </p>
                                </Link>
                                <p className="near-venue">
                                  {event.venue.venueName}
                                </p>
                                <p className="near-city">{event.venue.city}</p>
                              </div>
                            </div>
                            <div className="near-date">
                              <p className="near-month">
                                {event.month.substring(0, 3).toUpperCase()}
                              </p>
                              <p className="near-day">{event.day}</p>
                            </div>
                          </section>
                        </Link>
                      )
                    }
                  }
                })}
              </div>
            </>
          )
        })}
      </section>
    </>
  )
}

export default UserPage
