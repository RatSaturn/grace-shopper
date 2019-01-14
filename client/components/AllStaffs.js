import React, {Component} from 'react'
import StaffComponent from './StaffComponent'
import {connect} from 'react-redux'
import {getStaffsFromApi} from '../store'

export class AllStaffs extends Component {
  async componentDidMount() {
    try {
      await this.props.getStaffsFromApi()
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        <center>
          <h1> Staff Picks</h1>
        </center>
        <div className="allbookscontainer">
          {this.props.staffs.map(staff => (
            <StaffComponent
              className="singleBookContainer"
              key={staff.id}
              staff={staff}
            />
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  staffs: state.staffs
})

const mapDispatch = {
  getStaffsFromApi
}

export default connect(mapState, mapDispatch)(AllStaffs)
