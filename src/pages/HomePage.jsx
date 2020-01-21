import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

const HomePage = () => {
  const [artists, setArtists] = useState([])
  const [genre, setGenre] = useState(
    'alternative, country, electronic, hiphop, metal, pop, punk, rb, reggae, rock'
  )
  const [user, setUser] = useState({})
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const getUser = async () => {
    const resp = await axios.get(
      'https://localhost:5001/api/User/' + userId,
      config
    )
    setUser(resp.data)
  }

  const getArtists = async () => {
    const resp = await axios.get('https://localhost:5001/api/Artist')
    console.log(resp.data)
    setArtists(resp.data)
  }

  useEffect(() => {
    getArtists()
    getUser()
  }, [])

  return (
    <>
      <header>
        Find tour dates and live music events for all your favorite bands and
        artists in your city.
      </header>

      <NavBar />
      <main className="homepage-main">
        <section className="popular-events">
          <h1>Popular Events In {user.state}</h1>
          <div className="popular-event-container">
            {artists.map(artist => {
              return (
                <>
                  {artist.events.map(event => {
                    {
                      if (event.venue.city.includes(user.state)) {
                        return (
                          <Link to={'/event/' + event.id}>
                            <section className="popular-event">
                              <div className="img-container">
                                <img
                                  className="popular-event-artist-pic"
                                  src={artist.artistPic}
                                />
                              </div>
                              <div className="popular-event-date">
                                <p className="popular-day-of-week">
                                  {event.dayOfWeek
                                    .substring(0, 3)
                                    .toUpperCase()}
                                </p>
                                <p className="popular-day">{event.day}</p>
                                <p className="popular-month">
                                  {event.month.substring(0, 3).toUpperCase()}
                                </p>
                              </div>
                              <div className="popular-event-info">
                                <Link
                                  className="artist-hover"
                                  to={'/artist/' + artist.id}
                                >
                                  <p className="popular-event-artist-name">
                                    {artist.artistName}
                                  </p>
                                </Link>
                                <p className="popular-event-venue">
                                  {event.venue.venueName}
                                </p>
                              </div>
                            </section>
                          </Link>
                        )
                      }
                    }
                  })}
                </>
              )
            })}
          </div>
        </section>

        {/*<section className="events-by-genre">
        /*Will map through genres
        <section className="genre-card">
          <img className="genre-pic" />
          <p className="genre-name">Rock</p>
        </section>
      </section>*/}

        <section className="events-near-you">
          <h1>All Events In {user.state} </h1>
          <section className="dropdowns">
            <select onChange={e => setGenre(e.target.value)}>
              <option value="alternative, country, electronic, hiphop, metal, pop, punk, rb, reggae, rock">
                All Genres
              </option>
              <option value="alternative">Alternative</option>
              <option value="country">Country</option>
              <option value="electronic">Electronic</option>
              <option value="hiphop">Hip Hop</option>
              <option value="metal">Metal</option>
              <option value="pop">Pop</option>
              <option value="punk">Punk</option>
              <option value="rb">R&B</option>
              <option value="reggae">Reggae</option>
              <option value="rock">Rock</option>
            </select>
          </section>
          {artists.length > 0 &&
            artists
              .filter(artist => {
                console.log({
                  artist: artist.mainGenre.toLowerCase(),
                  genre,
                  toInclude: genre.includes(artist.mainGenre.toLowerCase()),
                })
                return genre.includes(artist.mainGenre.toLowerCase())
              })
              .map(artist => {
                return (
                  <div className="event-near-container">
                    {artist.events.map(event => {
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
                                        src={artist.artistPic}
                                      />
                                    </div>
                                  </div>
                                  <div className="near-info">
                                    <Link
                                      className="artist-hover"
                                      to={'/artist/' + artist.id}
                                    >
                                      <p className="near-artist-name">
                                        {artist.artistName}
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
                )
              })}
        </section>
      </main>
    </>
  )
}

export default HomePage
