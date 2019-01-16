import React from 'react'
import HeroComponent from './hero-component'
import StaffPicks from './staff-picks'
import NewArrivals from './new-arrivals'

const LandingPage = () => {
  return (
    <div>
      <HeroComponent />
      <NewArrivals />
      <StaffPicks />
    </div>
  )
}

export default LandingPage
