import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'

const ArtistPage = props => {
  const [artist, setArtist] = useState({})
  const [events, setEvents] = useState([])
  const [user, setUser] = useState({})
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const getUserInfo = async () => {
    const resp = await axios.get(
      'https://localhost:5001/api/User/' + userId,
      config
    )
    setUser(resp.data)
  }

  const getArtist = async () => {
    const resp = await axios.get(
      'https://localhost:5001/api/Artist/' + props.match.params.id
    )
    setArtist(resp.data)
    setEvents(resp.data.events)
  }

  const trackArtist = async () => {
    console.log(userId)
    const resp = await axios.post('https://localhost:5001/api/TrackArtist/', {
      id: 0,
      userId: parseInt(userId),
      artistId: artist.id,
    })
    if (resp.status === 201) {
      updateTrackerCount()
    }
  }

  const updateTrackerCount = async () => {
    const resp = await axios.put(
      'https://localhost:5001/api/Artist/' + props.match.params.id,
      {
        id: artist.id,
        artistName: artist.artistName,
        genres: artist.genres,
        mainGenre: artist.mainGenre,
        hometown: artist.hometown,
        website: artist.website,
        artistPic: artist.artistPic,
        followers: artist.followers + 1,
      }
    )
    getArtist()
  }

  useEffect(() => {
    getArtist()
    getUserInfo()
  }, [props.match.params.id])

  return (
    <>
      <main className="artist-main">
        <section className="artist-left">
          <section className="artist-card">
            <div className="main-img-container">
              <img className="artist-pic" src={artist.artistPic} />
            </div>
            <p className="artist-name">{artist.artistName}</p>
            <p className="tracker-count">{artist.followers} Trackers</p>
            <button onClick={trackArtist} className="track-artist">
              Track Artist
            </button>
          </section>

          <h2 className="about-title">About {artist.artistName}</h2>
          <section className="about">
            <p className="artist-genres">
              Genres:&nbsp;<div className="normal-text">{artist.genres}</div>
            </p>
            <p className="artist-hometown">
              Hometown:&nbsp;
              <div className="normal-text">{artist.hometown}</div>
            </p>
            <a className="artist-site" href={artist.website}>
              <div className="link-style">{artist.website}</div>
            </a>
          </section>
        </section>

        <h2 className="about-title">Events in Your Area</h2>
        <section className="artist-right">
          <section className="events-in-area">
            {events.map(event => {
              {
                if (event.venue.city.includes(user.state)) {
                  /* set FL to user state */
                  return (
                    <Link to={'/event/' + event.id}>
                      <div className="event-card">
                        <div className="event-card-left">
                          <div className="event-date">
                            <p className="event-month">
                              {event.month.substring(0, 3).toUpperCase()}
                            </p>
                            <p className="event-day">{event.day}</p>
                            <p className="event-year">{event.year}</p>
                          </div>
                          <p className="event-venue">{event.venue.venueName}</p>
                        </div>
                        <p className="event-city">{event.venue.city}</p>
                      </div>
                    </Link>
                  )
                }
              }
            })}
          </section>

          <h2 className="about-title">All Upcoming Events</h2>
          <section className="upcoming-events">
            {events.map(event => {
              return (
                <Link to={'/event/' + event.id}>
                  <div className="event-card">
                    <div className="event-card-left">
                      <div className="event-date">
                        <p className="event-month">
                          {event.month.substring(0, 3).toUpperCase()}
                        </p>
                        <p className="event-day">{event.day}</p>
                        <p className="event-year">{event.year}</p>
                      </div>
                      <p className="event-venue">{event.venue.venueName}</p>
                    </div>
                    <p className="event-city">{event.venue.city}</p>
                  </div>
                </Link>
              )
            })}
          </section>
        </section>
      </main>
    </>
  )
}

export default ArtistPage
