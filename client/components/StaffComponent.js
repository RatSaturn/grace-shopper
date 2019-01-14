import React from 'react'
import {Link} from 'react-router-dom'

const StaffComponent = props => {
  const {id, name, imageUrl, contactUrl} = props.staff

  return (
    <div>
      <img src={imageUrl} height="150" width="150" />
      <p>
        <Link to={`/allStaffs/${id}`}>{name}</Link>
      </p>
    </div>
  )
}

export default StaffComponent
