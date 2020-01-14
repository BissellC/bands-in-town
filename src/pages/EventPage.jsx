import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EventPage = props => {
  const [event, setEvent] = useState({})
  const [venue, setVenue] = useState({})
  const [artistId, setArtistId] = useState()
  const [artist, setArtist] = useState({})

  const getEvent = async () => {
    const resp = await axios.get(
      'https://localhost:5001/api/Event/' + props.match.params.id
    )
    console.log(resp.data)
    setEvent(resp.data)
    setVenue(resp.data.venue)
    setArtistId(resp.data.artistId)
  }

  const getArtist = async () => {
    const resp = await axios.get(
      'https://localhost:5001/api/Artist/' + artistId
    )
    setArtist(resp.data)
  }

  useEffect(() => {
    getEvent()
  }, [])

  useEffect(() => {
    getArtist()
  }, [artistId])

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
        <div className="container">
          <section className="artist-left">
            <section className="artist-card">
              <img className="artist-pic" />
              <p className="artist-name">{artist.artistName}</p>
              <p className="date-venue">
                {event.month} {event.day}, {event.year} @ {venue.venueName}
              </p>
              <button className="track-artist">Track Artist</button>
            </section>
          </section>

          <section className="event-info">
            <div className="event-date-time">
              <i class="far fa-clock"></i>
              <div className="date-time">
                <p className="date">
                  {event.dayOfWeek}, {event.month} {event.day}, {event.year}
                </p>
                <p className="time">Time</p>
              </div>
            </div>
            <div className="event-page-location">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <p className="event-page-venue">Crowbar</p>
                <p className="event-page-address">
                  1001 W Cass St, Tampa, FL 33606
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default EventPage
