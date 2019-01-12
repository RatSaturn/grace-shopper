import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import LandingPage from './components/landing-page/landing-page'
import BottomAppBar from './components/footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <LandingPage />
      <BottomAppBar />
    </div>
  )
}

export default App
