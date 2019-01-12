import React from 'react'
import HeroComponent from './hero-component'
import StaffPicks from './staff-picks'
import NewArrivals from './new-arrivals'
// import Routes from '/client/routes'

const LandingPage = () => {
  return (
    <div>
      <HeroComponent />
      <NewArrivals />
      {/* <Routes /> */}
      <StaffPicks />
    </div>
  )
}

export default LandingPage
