import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ArtistPage = props => {
  const [artist, setArtist] = useState({})
  const [events, setEvents] = useState([])

  const getArtist = async () => {
    const resp = await axios.get(
      'https://localhost:5001/api/Artist/' + props.match.params.id
    )
    setArtist(resp.data)
    setEvents(resp.data.events)
  }

  useEffect(() => {
    getArtist()
  }, [])

  return (
    <>
      <nav>
        <div className="nav-title-container">
          <img className="logo" />
          <p className="nav-title">bandsintown</p>
        </div>
        <input type="search" placeholder="Search for artists"></input>
        <a href="#">Sign Up</a>
      </nav>

      <main>
        <section className="artist-left">
          <section className="artist-card">
            <div className="main-img-container">
              <img className="artist-pic" src={artist.artistPic} />
            </div>
            <p className="artist-name">{artist.artistName}</p>
            <p className="tracker-count">{artist.followers} Trackers</p>
            <button className="track-artist">Track Artist</button>
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
            <a className="artist-site" href="#">
              <div className="link-style">{artist.website}</div>
            </a>
          </section>
        </section>

        <h2 className="about-title">Events in Your Area</h2>
        <section className="artist-right">
          <section className="events-in-area">
            {events.map(event => {
              {
                if (event.venue.city.includes('FL')) {
                  /* set FL to user state */
                  return (
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
                  )
                }
              }
            })}
          </section>

          <h2 className="about-title">Upcoming Events</h2>
          <section className="upcoming-events">
            {events.map(event => {
              return (
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
              )
            })}
          </section>
        </section>
      </main>
    </>
  )
}

export default ArtistPage
