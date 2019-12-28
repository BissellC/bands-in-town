import React from 'react'

const ArtistPage = () => {
  return (
    <>
      <nav>
        <div className="nav-title-container">
          <img className="logo" />
          <p className="nav-title">bandsintown</p>
        </div>
        <input type="search" placeholder="Search for artists"></input>
        <a href="#">Sign Up</a>
        <a href="#">Log In</a>
      </nav>

      <main>
        <section className="artist-left">
          <section className="artist-card">
            <img className="artist-pic" />
            <p className="artist-name">Hello Joyce</p>
            <p className="tracker-count">"number" Trackers</p>
            <button className="track-artist">Track Artist</button>
          </section>
          <section className="about">
            <h2>About "artist name"</h2>
            <p className="artist=genres">Genres:</p>
            <p className="artist-hometown">HomeTown:</p>
            <a className="artist-site" href="#">
              www.site.com
            </a>
          </section>
        </section>

        <section className="artist-right">
          <section className="events-in-area">
            <p>Events in Your Area</p>
            <div className="event-card">
              <div className="event-date">
                <p className="event-month">May</p>
                <p className="event-day">31</p>
              </div>
              <div className="event-location">
                <p className="event-city">Tampa,FL</p>
                <p className="event-venue">
                  MIDFLORIDA Credit Union Ampitheater
                </p>
              </div>
            </div>
          </section>
          <section className="upcoming-events">
            <p>Upcoming Events</p>
            <div className="event-card">
              <div className="event-date">
                <p className="event-month">May</p>
                <p className="event-day">31</p>
              </div>
              <div className="event-location">
                <p className="event-city">Tampa,FL</p>
                <p className="event-venue">
                  MIDFLORIDA Credit Union Ampitheater
                </p>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  )
}

export default ArtistPage
