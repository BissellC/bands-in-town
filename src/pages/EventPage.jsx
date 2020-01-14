import React from 'react'

const EventPage = () => {
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
              <p className="artist-name">Hello Joyce</p>
              <p className="date-venue">Jan 11th 2020 @ Hooch and Hive</p>
              <button className="track-artist">Track Artist</button>
            </section>
          </section>

          <section className="event-info">
            <div className="event-date-time">
              <i class="far fa-clock"></i>
              <div className="date-time">
                <p className="date">Date</p>
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
