import React from 'react'
import HelloWorld from '../components/HelloWorld'
import artistPic from '../images/khaled.jpg'

const HomePage = () => {
  return (
    <>
      <header>
        Find tour dates and live music events for all your favorite bands and
        artists in your city. Get concert tickets, news and RSVP to shows with
        Bandsintown
      </header>
      <nav>
        <div className="nav-title-container">
          <img className="logo" />
          <p className="nav-title">bandsintown</p>
        </div>
        <input type="search" placeholder="Search for artists"></input>
        <div>
          <a href="#">Sign Up</a>
          <a href="#">Log In</a>
        </div>
      </nav>

      <section className="popular-events">
        <h1>Popular Events Near "your city"</h1>
        {/* eventually this will map through events */}
        <section className="popular-event">
          <img className="popular-event-artist-pic" src={artistPic} />
          <div className="popular-event-date">
            <p className="popular-day-of-week">TUE</p>
            <p className="popular-day">10</p>
            <p className="popular-month">MAR</p>
          </div>
          <div className="popular-event-info">
            <p className="popular-event-artist-name">Billie Eilish</p>
            <p className="popular-event-venue">Amway Center</p>
          </div>
        </section>
      </section>

      {/*<section className="events-by-genre">
        /*Will map through genres
        <section className="genre-card">
          <img className="genre-pic" />
          <p className="genre-name">Rock</p>
        </section>
      </section>*/}

      <section className="events-near-you">
        <h1>All Events Near "your city"</h1>
        <section className="dropdowns">
          <select>
            <option value="">All Dates</option>
            <option value="tonight">Tonight</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="weekend">This Weekend</option>
            <option value="week">Next Week</option>
            <option value="month">Next Month</option>
          </select>
          <select>
            <option value="">All Genres</option>
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
        <section className="event-near">
          <div className="near-main">
            <div>
              <img className="near-pic" src={artistPic} />
            </div>
            <div className="near-info">
              <p className="near-artist-name">Hello Joyce</p>
              <p className="near-venue">Hooch and Hive</p>
              <p className="near-city">Tampa, FL</p>
            </div>
          </div>
          <div className="near-date">
            <p className="near-month">DEC</p>
            <p className="near-day">20</p>
          </div>
        </section>
      </section>
    </>
  )
}

export default HomePage
