import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

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
      <main className="event-main">
        <div>
          <section className="artist-left">
            <section className="artist-card">
              <div className="main-img-container">
                <img className="artist-pic" src={artist.artistPic} />
              </div>
              <p className="artist-name">{artist.artistName}</p>
              <p className="date-venue">
                {event.month} {event.day}, {event.year} @ {venue.venueName}
              </p>

              <Link className="link-style" to={'/artist/' + artistId}>
                View all events by {artist.artistName}
              </Link>
            </section>
          </section>
        </div>

        <section className="event-info">
          <div className="event-date-time">
            <i class="far fa-clock"></i>
            <div className="date-time">
              <p className="date">
                {event.dayOfWeek}, {event.month} {event.day}, {event.year}
              </p>
              <p className="time">{event.time}</p>
            </div>
          </div>
          <div className="event-page-location">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              <p className="event-page-venue">{venue.venueName}</p>
              <p className="event-page-address">
                {venue.address} {venue.city}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default EventPage
