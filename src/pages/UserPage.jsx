import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

const UserPage = props => {
  const [user, setUser] = useState([])
  const [artists, setArtists] = useState([])
  const [id, setId] = useState()
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const getUserInfo = async () => {
    const resp = await axios.get(
      'https://bands-in-town-api.herokuapp.com/api/User/' +
        props.match.params.id,
      config
    )
    setUser(resp.data)
  }

  const getUserArtists = async () => {
    const resp = await axios.get(
      'https://bands-in-town-api.herokuapp.com/api/TrackArtist/user/' + userId
    )
    setArtists(resp.data)
  }

  const removeArtist = async artist => {
    const resp = await axios.delete(
      'https://bands-in-town-api.herokuapp.com/api/TrackArtist/' + artist.id
    )
    setId(resp.data.id)
    updateTrackerCount(artist)
  }

  const updateTrackerCount = async artist => {
    await axios.put(
      'https://bands-in-town-api.herokuapp.com/api/Artist/' + artist.artist.id,
      {
        id: artist.artist.id,
        artistName: artist.artist.artistName,
        genres: artist.artist.genres,
        mainGenre: artist.artist.mainGenre,
        hometown: artist.artist.hometown,
        website: artist.artist.website,
        artistPic: artist.artist.artistPic,
        followers: artist.artist.followers - 1,
      }
    )
  }

  useEffect(() => {
    getUserInfo()
    getUserArtists()
  }, [id])

  return (
    <>
      <section className="main-container">
        <section className="user-events-near-you">
          <p className="user-message">
            Events for {user.username}'s tracked artists near {user.state}
          </p>
          {artists.map(artist => {
            return (
              <>
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
                                      alt={artist.artist.artistName}
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
                                  <p className="near-city">
                                    {event.venue.city}
                                  </p>
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

        <section className="artist-list">
          <h1>Tracked artists</h1>
          {artists.map(artist => {
            return (
              <section className="artist-list-item">
                <p>{artist.artist.artistName}</p>
                <button
                  onClick={() => removeArtist(artist)}
                  className="untrack-button"
                >
                  X
                </button>
              </section>
            )
          })}
        </section>
      </section>
    </>
  )
}

export default UserPage
