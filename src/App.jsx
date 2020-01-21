import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import ArtistPage from './pages/ArtistPage'
import EventPage from './pages/EventPage'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import UserPage from './pages/UserPage'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/artist/:id" component={ArtistPage}></Route>
        <Route exact path="/event/:id" component={EventPage}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/user/:id" component={UserPage}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  )
}

export default App
